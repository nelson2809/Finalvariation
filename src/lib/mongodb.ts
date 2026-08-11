import { MongoClient, type Db, type MongoClientOptions } from "mongodb";

/**
 * Shared MongoDB client.
 *
 * The driver keeps a TCP connection pool, so a new client per request would
 * exhaust the cluster's connection limit under serverless load. The connect
 * promise is cached on `globalThis` so it survives both Next's dev hot-reload
 * (which re-evaluates modules) and warm serverless invocations.
 *
 * Caching the *promise* rather than the client also means concurrent requests
 * during a cold start all await the same handshake instead of each opening one.
 */

const options: MongoClientOptions = {
  // Serverless instances are many and short-lived; a big pool per instance
  // just burns the cluster's connection budget.
  maxPoolSize: 10,
  minPoolSize: 0,
  // Fail fast instead of hanging the request if the cluster is unreachable.
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 8000,
  // Close idle sockets so frozen instances don't hold connections open.
  maxIdleTimeMS: 60_000,
  retryWrites: true,
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI);
}

/**
 * Works out which database to use, in priority order:
 *   1. MONGODB_DB
 *   2. the path segment of the connection string
 *   3. "agonis"
 *
 * Without this, a URI with no database path silently lands everything in
 * MongoDB's default "test" database.
 */
export function resolveDbName(uri: string): string {
  if (process.env.MONGODB_DB) return process.env.MONGODB_DB;
  try {
    // URL can't parse mongodb:// schemes, so borrow https:// just for the path.
    const asHttp = uri.replace(/^mongodb(\+srv)?:/i, "https:");
    const path = new URL(asHttp).pathname.replace(/^\//, "");
    if (path) return decodeURIComponent(path);
  } catch {
    /* fall through to the default */
  }
  return "agonis";
}

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");

  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri, options)
      .connect()
      .catch((err) => {
        // Clear the cache so the next request retries instead of forever
        // re-awaiting a promise that already rejected.
        global._mongoClientPromise = undefined;
        throw err;
      });
  }
  return global._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(resolveDbName(process.env.MONGODB_URI as string));
}
