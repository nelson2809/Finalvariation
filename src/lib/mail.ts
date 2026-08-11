import nodemailer, { type Transporter } from "nodemailer";
import type { BrandSubmissionInput } from "./brand-submission";

/**
 * Gmail SMTP delivery via Nodemailer.
 *
 * Requires a Google App Password (not the account password) — see
 * SETUP-BACKEND.md. This module only runs on the Node.js runtime; Nodemailer
 * opens a TCP socket and cannot run on the Edge runtime.
 */

const NAVY = "#102a4c";
const NAVY_DARK = "#07111f";
const GOLD = "#c7a45a";
const INK = "#0b1a30";
const BODY = "#475569";
const LINE = "#e7e1d5";
const SAND = "#faf7f1";

export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || "xaviernelson121@gmail.com";

const FROM_NAME = process.env.MAIL_FROM_NAME || "Agonis Partners";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agonispartners.com";

export function isMailConfigured(): boolean {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

let transporter: Transporter | null = null;

function getTransport(): Transporter {
  if (!transporter) {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!user || !pass) {
      throw new Error(
        "GMAIL_USER and GMAIL_APP_PASSWORD must be set to send email",
      );
    }
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      // Port 465 is implicit TLS; 587 upgrades via STARTTLS.
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: { user, pass },
      pool: true,
      maxConnections: 3,
      maxMessages: 50,
    });
  }
  return transporter;
}

/** Escapes user input before it goes anywhere near an HTML email body. */
function esc(v: string | undefined | null): string {
  if (!v) return "";
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strips CR/LF so user input can never inject extra SMTP headers. */
function headerSafe(v: string): string {
  return v.replace(/[\r\n]+/g, " ").trim();
}

function row(label: string, value?: string, isLink = false): string {
  if (!value) return "";
  const shown = isLink
    ? `<a href="${esc(value)}" style="color:${NAVY};text-decoration:underline;">${esc(value)}</a>`
    : esc(value).replace(/\n/g, "<br>");
  return `
    <tr>
      <td style="padding:11px 0;border-bottom:1px solid ${LINE};vertical-align:top;width:170px;
                 font:600 13px/1.5 Helvetica,Arial,sans-serif;color:${INK};letter-spacing:.02em;">
        ${esc(label)}
      </td>
      <td style="padding:11px 0;border-bottom:1px solid ${LINE};vertical-align:top;
                 font:400 14px/1.6 Helvetica,Arial,sans-serif;color:${BODY};">
        ${shown}
      </td>
    </tr>`;
}

function shell(headline: string, intro: string, inner: string): string {
  return `<!doctype html>
<html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(headline)}</title></head>
<body style="margin:0;padding:0;background:${SAND};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SAND};padding:28px 12px;">
<tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0"
         style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${LINE};border-radius:14px;overflow:hidden;">

    <tr><td style="background:${NAVY_DARK};padding:26px 32px;border-bottom:3px solid ${GOLD};">
      <div style="font:700 21px/1.2 Helvetica,Arial,sans-serif;color:#ffffff;letter-spacing:.06em;">
        AGONIS <span style="color:${GOLD};font-weight:500;">PARTNERS</span>
      </div>
      <div style="margin-top:6px;font:500 10px/1.4 Helvetica,Arial,sans-serif;color:rgba(255,255,255,.62);letter-spacing:.22em;">
        IMPORT &amp; DISTRIBUTION
      </div>
    </td></tr>

    <tr><td style="padding:32px;">
      <h1 style="margin:0 0 12px;font:600 22px/1.3 Helvetica,Arial,sans-serif;color:${INK};">
        ${esc(headline)}
      </h1>
      <p style="margin:0 0 24px;font:400 15px/1.65 Helvetica,Arial,sans-serif;color:${BODY};">
        ${intro}
      </p>
      ${inner}
    </td></tr>

    <tr><td style="background:${SAND};padding:20px 32px;border-top:1px solid ${LINE};">
      <p style="margin:0;font:400 12px/1.6 Helvetica,Arial,sans-serif;color:#64748b;">
        Agonis Partners · Göztepe Mah. Tepegöz Sk. Ikar Is Merkezi No: 1, Kadıköy / Istanbul<br>
        <a href="${SITE_URL}" style="color:${NAVY};text-decoration:none;">${esc(
          SITE_URL.replace(/^https?:\/\//, ""),
        )}</a>
      </p>
    </td></tr>

  </table>
</td></tr></table>
</body></html>`;
}

/* ---------------------------------------------------------------- */
/* Confirmation → the person who submitted                          */
/* ---------------------------------------------------------------- */

function confirmationHtml(s: BrandSubmissionInput): string {
  const summary = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="border-top:1px solid ${LINE};margin-bottom:26px;">
      ${row("Brand", s.brand)}
      ${row("Company", s.company)}
      ${row("Category", s.category)}
      ${row("Current markets", s.markets)}
      ${row("Website", s.website, true)}
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr><td style="background:${GOLD};border-radius:999px;">
        <a href="${SITE_URL}/what-we-do"
           style="display:inline-block;padding:13px 26px;font:600 14px/1 Helvetica,Arial,sans-serif;
                  color:${INK};text-decoration:none;">
          See how we work &rarr;
        </a>
      </td></tr>
    </table>`;

  return shell(
    // Not pre-escaped: shell() escapes the headline itself.
    `Thank you, ${s.name.split(" ")[0] || s.name}.`,
    `We've received your submission for <strong style="color:${INK};">${esc(
      s.brand,
    )}</strong> and our Istanbul team will review it for the Turkish market.
     We typically respond within <strong style="color:${INK};">two business days</strong>.
     Here's what you sent us:`,
    summary,
  );
}

function confirmationText(s: BrandSubmissionInput): string {
  return [
    `Thank you, ${s.name}.`,
    ``,
    `We've received your submission for ${s.brand} and our Istanbul team will`,
    `review it for the Turkish market. We typically respond within two business days.`,
    ``,
    `What you sent us:`,
    `  Brand:           ${s.brand}`,
    s.company ? `  Company:         ${s.company}` : "",
    s.category ? `  Category:        ${s.category}` : "",
    s.markets ? `  Current markets: ${s.markets}` : "",
    s.website ? `  Website:         ${s.website}` : "",
    ``,
    `— Agonis Partners`,
    `${SITE_URL}`,
  ]
    .filter(Boolean)
    .join("\n");
}

/* ---------------------------------------------------------------- */
/* Notification → the admin inbox                                   */
/* ---------------------------------------------------------------- */

function adminHtml(s: BrandSubmissionInput, id: string | null): string {
  const details = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="border-top:1px solid ${LINE};margin-bottom:26px;">
      ${row("Name", s.name)}
      ${row("Email", s.email)}
      ${row("Company", s.company)}
      ${row("Brand", s.brand)}
      ${row("Website", s.website, true)}
      ${row("Marketplace store", s.store, true)}
      ${row("Category", s.category)}
      ${row("Current markets", s.markets)}
      ${row("Message", s.message)}
      ${row("Source", s.source)}
      ${row("Record ID", id ? `#${id}` : "not stored")}
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr><td style="background:${NAVY};border-radius:999px;">
        <a href="mailto:${esc(s.email)}?subject=${encodeURIComponent(
          `Re: ${s.brand} — Türkiye distribution`,
        )}"
           style="display:inline-block;padding:13px 26px;font:600 14px/1 Helvetica,Arial,sans-serif;
                  color:#ffffff;text-decoration:none;">
          Reply to ${esc(s.name)} &rarr;
        </a>
      </td></tr>
    </table>`;

  return shell(
    // Not pre-escaped: shell() escapes the headline itself.
    `New brand submission — ${s.brand}`,
    `Submitted by <strong style="color:${INK};">${esc(s.name)}</strong>${
      // Trim a trailing "." so names like "Lumina A.Ş." don't render "A.Ş..".
      s.company ? ` at ${esc(s.company.replace(/\.\s*$/, ""))}` : ""
    }. Reply directly to this email to reach them.`,
    details,
  );
}

function adminText(s: BrandSubmissionInput, id: string | null): string {
  return [
    `NEW BRAND SUBMISSION`,
    `====================`,
    ``,
    `Name:             ${s.name}`,
    `Email:            ${s.email}`,
    s.company ? `Company:          ${s.company}` : "",
    `Brand:            ${s.brand}`,
    s.website ? `Website:          ${s.website}` : "",
    s.store ? `Store:            ${s.store}` : "",
    s.category ? `Category:         ${s.category}` : "",
    s.markets ? `Current markets:  ${s.markets}` : "",
    ``,
    s.message ? `Message:\n${s.message}` : "(no message)",
    ``,
    `Source:           ${s.source || "unknown"}`,
    `Record ID:        ${id ? `#${id}` : "not stored"}`,
  ]
    .filter(Boolean)
    .join("\n");
}

/* ---------------------------------------------------------------- */

export async function sendConfirmationEmail(
  s: BrandSubmissionInput,
): Promise<void> {
  await getTransport().sendMail({
    from: `"${FROM_NAME}" <${process.env.GMAIL_USER}>`,
    to: headerSafe(s.email),
    replyTo: ADMIN_EMAIL,
    subject: `We've received your brand submission — ${headerSafe(s.brand)}`,
    text: confirmationText(s),
    html: confirmationHtml(s),
  });
}

export async function sendAdminNotification(
  s: BrandSubmissionInput,
  id: string | null,
): Promise<void> {
  await getTransport().sendMail({
    from: `"${FROM_NAME} — Website" <${process.env.GMAIL_USER}>`,
    to: ADMIN_EMAIL,
    // Lets the admin hit Reply and land in the submitter's inbox.
    replyTo: `"${headerSafe(s.name)}" <${headerSafe(s.email)}>`,
    subject: `New brand submission: ${headerSafe(s.brand)}${
      s.company ? ` (${headerSafe(s.company)})` : ""
    }`,
    text: adminText(s, id),
    html: adminHtml(s, id),
  });
}
