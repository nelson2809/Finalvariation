/**
 * Shared types + validation for the "Submit Your Brand" form.
 *
 * The same rules run on the client (for instant feedback) and on the server
 * (as the real gate). Never trust the client copy — the API route always
 * re-validates.
 */

export type BrandSubmissionInput = {
  name: string;
  email: string;
  company?: string;
  brand: string;
  website?: string;
  store?: string;
  category?: string;
  markets?: string;
  message?: string;
  /** Which form instance sent this — "contact-page" or "modal". */
  source?: string;
  /** Honeypot. Real users never fill this; bots usually do. */
  companyWebsite?: string;
};

export type FieldErrors = Partial<
  Record<keyof BrandSubmissionInput, string>
>;

export const MAX_LENGTHS = {
  name: 120,
  email: 200,
  company: 160,
  brand: 160,
  website: 500,
  store: 500,
  category: 80,
  markets: 240,
  message: 4000,
} as const;

/**
 * Deliberately permissive. Over-strict email regexes reject valid addresses;
 * the real proof of validity is that the confirmation email arrives.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function clean(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/** Accepts "example.com" and upgrades it to a real URL. Returns "" if unusable. */
export function normaliseUrl(raw: string): string {
  const v = clean(raw);
  if (!v) return "";
  const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const u = new URL(withScheme);
    if (!u.hostname.includes(".")) return "";
    return u.toString();
  } catch {
    return "";
  }
}

/**
 * Validates and normalises raw form data.
 *
 * Returns the cleaned payload plus any field errors. Optional URL fields that
 * are present but unparseable produce an error rather than being silently
 * dropped, so the user can correct a typo instead of losing the value.
 */
export function validateBrandSubmission(raw: Record<string, unknown>): {
  data: Required<Omit<BrandSubmissionInput, "companyWebsite">>;
  errors: FieldErrors;
  isSpam: boolean;
} {
  const errors: FieldErrors = {};

  const name = clean(raw.name);
  const email = clean(raw.email).toLowerCase();
  const brand = clean(raw.brand);
  const company = clean(raw.company);
  const category = clean(raw.category);
  const markets = clean(raw.markets);
  const message = clean(raw.message);
  const source = clean(raw.source) || "contact-page";

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > MAX_LENGTHS.name) errors.name = "That name is too long.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email))
    errors.email = "That doesn't look like a valid email address.";
  else if (email.length > MAX_LENGTHS.email)
    errors.email = "That email address is too long.";

  if (!brand) errors.brand = "Please enter your brand name.";
  else if (brand.length > MAX_LENGTHS.brand)
    errors.brand = "That brand name is too long.";

  if (company.length > MAX_LENGTHS.company)
    errors.company = "That company name is too long.";
  if (markets.length > MAX_LENGTHS.markets)
    errors.markets = "Please keep this under 240 characters.";
  if (message.length > MAX_LENGTHS.message)
    errors.message = "Please keep your message under 4000 characters.";

  // Optional URLs: blank is fine, malformed is not.
  const rawWebsite = clean(raw.website);
  const website = normaliseUrl(rawWebsite);
  if (rawWebsite && !website) errors.website = "Please enter a valid URL.";

  const rawStore = clean(raw.store);
  const store = normaliseUrl(rawStore);
  if (rawStore && !store) errors.store = "Please enter a valid URL.";

  // Honeypot: a hidden field only a bot would populate.
  const isSpam = clean(raw.companyWebsite).length > 0;

  return {
    data: {
      name,
      email,
      company,
      brand,
      website,
      store,
      category,
      markets,
      message,
      source,
    },
    errors,
    isSpam,
  };
}
