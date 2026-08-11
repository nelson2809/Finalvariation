import { NextResponse } from "next/server";
import { validateBrandSubmission } from "@/lib/brand-submission";
import {
  countRecentByEmail,
  isDatabaseConfigured,
  saveSubmission,
} from "@/lib/db";
import {
  isMailConfigured,
  sendAdminNotification,
  sendConfirmationEmail,
} from "@/lib/mail";

/**
 * POST /api/brand-submission
 *
 * Nodemailer needs a TCP socket, so this must run on the Node.js runtime.
 * `force-dynamic` keeps Next from trying to statically evaluate the handler.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Max submissions from one email address within the window. */
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_MINUTES = 10;

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "";
}

export async function POST(req: Request) {
  // ---- Parse -----------------------------------------------------------
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  // ---- Validate --------------------------------------------------------
  const { data, errors, isSpam } = validateBrandSubmission(raw);

  // Honeypot tripped. Return 200 so bots can't distinguish a block from a
  // success and start probing for the trigger.
  if (isSpam) {
    return NextResponse.json({ ok: true, stored: false, emailed: false });
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", errors },
      { status: 400 },
    );
  }

  // ---- Throttle repeat submissions ------------------------------------
  if (isDatabaseConfigured()) {
    try {
      const recent = await countRecentByEmail(data.email, RATE_LIMIT_MINUTES);
      if (recent >= RATE_LIMIT_MAX) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "We've already received a few submissions from this address. Please give us a little time to respond.",
          },
          { status: 429 },
        );
      }
    } catch (err) {
      // A throttle-check failure must never block a genuine submission.
      console.error("[brand-submission] rate-limit check failed:", err);
    }
  }

  // ---- Persist ---------------------------------------------------------
  // Saved first so a mail outage can't lose the lead.
  let id: string | null = null;
  let stored = false;
  if (isDatabaseConfigured()) {
    try {
      id = await saveSubmission({
        ...data,
        ip: clientIp(req),
        userAgent: req.headers.get("user-agent") || "",
      });
      stored = true;
    } catch (err) {
      console.error("[brand-submission] database write failed:", err);
    }
  } else {
    console.warn("[brand-submission] MONGODB_URI not set — skipping storage.");
  }

  // ---- Email -----------------------------------------------------------
  let adminEmailed = false;
  let userEmailed = false;

  if (isMailConfigured()) {
    // Settled, not all: a bounced confirmation must not suppress the
    // admin notification, and vice versa.
    const [adminResult, userResult] = await Promise.allSettled([
      sendAdminNotification(data, id),
      sendConfirmationEmail(data),
    ]);

    if (adminResult.status === "fulfilled") adminEmailed = true;
    else console.error("[brand-submission] admin email failed:", adminResult.reason);

    if (userResult.status === "fulfilled") userEmailed = true;
    else console.error("[brand-submission] confirmation email failed:", userResult.reason);
  } else {
    console.warn(
      "[brand-submission] GMAIL_USER / GMAIL_APP_PASSWORD not set — skipping email.",
    );
  }

  // ---- Respond ---------------------------------------------------------
  // The submission is only genuinely lost if nothing captured it.
  if (!stored && !adminEmailed) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't record your submission right now. Please email us at info@agonispartners.com and we'll pick it up.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    id,
    stored,
    emailed: { admin: adminEmailed, user: userEmailed },
  });
}

/** Anything other than POST is a client error, not a crash. */
export function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed. Use POST." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
