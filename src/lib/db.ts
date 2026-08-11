import type { Collection } from "mongodb";
import { getDb } from "./mongodb";
import type { BrandSubmissionInput } from "./brand-submission";

/**
 * Brand submission storage (MongoDB).
 *
 * Storage is treated as OPTIONAL: if MONGODB_URI is missing the API route
 * still sends the emails rather than rejecting the visitor's submission.
 */

export { isDatabaseConfigured } from "./mongodb";

export const COLLECTION = "brand_submissions";

export type StoredSubmission = BrandSubmissionInput & {
  ip?: string;
  userAgent?: string;
};

export type SubmissionDoc = {
  name: string;
  email: string;
  company: string | null;
  brand: string;
  website: string | null;
  storeUrl: string | null;
  category: string | null;
  markets: string | null;
  message: string | null;
  source: string | null;
  ip: string | null;
  userAgent: string | null;
  createdAt: Date;
};

/**
 * Ensures indexes exist, once per warm instance.
 *
 * `createIndex` is idempotent, but it's still a round-trip — so the promise is
 * memoised and shared by concurrent requests. Reset on failure so a transient
 * error doesn't permanently poison the instance.
 */
let indexesReady: Promise<void> | null = null;

async function collection(): Promise<Collection<SubmissionDoc>> {
  const db = await getDb();
  const col = db.collection<SubmissionDoc>(COLLECTION);

  if (!indexesReady) {
    indexesReady = (async () => {
      await col.createIndex({ createdAt: -1 }, { name: "createdAt_desc" });
      await col.createIndex({ email: 1 }, { name: "email_asc" });
    })().catch((err) => {
      indexesReady = null; // allow a retry on the next request
      throw err;
    });
  }
  // Index creation must not block the write itself — a missing index is a
  // performance problem, a failed insert is a lost lead.
  await indexesReady.catch(() => {});

  return col;
}

/** Inserts one submission and returns its new document id as a string. */
export async function saveSubmission(s: StoredSubmission): Promise<string> {
  const col = await collection();
  const doc: SubmissionDoc = {
    name: s.name,
    email: s.email,
    company: s.company || null,
    brand: s.brand,
    website: s.website || null,
    storeUrl: s.store || null,
    category: s.category || null,
    markets: s.markets || null,
    message: s.message || null,
    source: s.source || null,
    ip: s.ip || null,
    userAgent: s.userAgent || null,
    createdAt: new Date(),
  };
  const res = await col.insertOne(doc);
  return res.insertedId.toString();
}

/**
 * Counts submissions from one email in the last N minutes.
 * Used to throttle repeat submissions without an extra Redis dependency.
 */
export async function countRecentByEmail(
  email: string,
  minutes: number,
): Promise<number> {
  const col = await collection();
  const since = new Date(Date.now() - minutes * 60_000);
  return col.countDocuments({ email, createdAt: { $gt: since } });
}
