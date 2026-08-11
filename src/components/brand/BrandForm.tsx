"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { productCategoryOptions } from "@/lib/data";
import { cn } from "@/lib/utils";

type Props = {
  /** compact = tighter spacing for the modal */
  compact?: boolean;
  onSuccess?: () => void;
};

const inputBase =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] text-ink " +
  "placeholder:text-muted/70 font-body transition-colors " +
  "focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

const labelBase = "block text-sm font-heading font-medium text-ink mb-1.5";

export function BrandForm({ compact = false, onSuccess }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    // NOTE: Demo only — wire this to your email/CRM endpoint (API route,
    // Resend, Formspree, etc.) before launch.
    setTimeout(() => {
      setStatus("sent");
      onSuccess?.();
    }, 900);
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-sand-100 px-6 py-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-xl text-ink">Thank you — your brand is in.</h3>
        <p className="mt-2 max-w-sm text-body">
          We&apos;ll review your brand for Türkiye distribution and get back to
          you shortly to discuss a potential cooperation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("grid gap-5", compact ? "sm:grid-cols-2" : "sm:grid-cols-2")}
      noValidate
    >
      <div>
        <label htmlFor="name" className={labelBase}>
          Name <span className="text-gold-600">*</span>
        </label>
        <input id="name" name="name" required className={inputBase} placeholder="Your full name" />
      </div>
      <div>
        <label htmlFor="company" className={labelBase}>
          Company
        </label>
        <input id="company" name="company" className={inputBase} placeholder="Company name" />
      </div>
      <div>
        <label htmlFor="brand" className={labelBase}>
          Brand Name <span className="text-gold-600">*</span>
        </label>
        <input id="brand" name="brand" required className={inputBase} placeholder="Your brand" />
      </div>
      <div>
        <label htmlFor="website" className={labelBase}>
          Website
        </label>
        <input
          id="website"
          name="website"
          type="url"
          className={inputBase}
          placeholder="https://"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="store" className={labelBase}>
          Amazon / Marketplace Store Link
        </label>
        <input
          id="store"
          name="store"
          type="url"
          className={inputBase}
          placeholder="https://"
        />
      </div>
      <div>
        <label htmlFor="category" className={labelBase}>
          Product Category
        </label>
        <select id="category" name="category" className={cn(inputBase, "appearance-none")}>
          <option value="">Select a category</option>
          {productCategoryOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="markets" className={labelBase}>
          Current Markets
        </label>
        <input
          id="markets"
          name="markets"
          className={inputBase}
          placeholder="e.g. US, UK, EU"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={labelBase}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 3 : 4}
          className={cn(inputBase, "resize-none")}
          placeholder="Tell us about your products and goals for Türkiye."
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "group inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-8 py-4",
            "font-heading font-medium text-white shadow-soft transition-all duration-300",
            "hover:-translate-y-0.5 hover:bg-navy-600 hover:shadow-lift",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
            "disabled:opacity-70",
          )}
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Submitting…
            </>
          ) : (
            <>
              Submit Your Brand for Turkish Market Fit Assessment
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
        <p className="mt-3 text-center text-xs text-muted">
          By submitting you agree to be contacted about a potential
          distribution partnership.
        </p>
      </div>
    </form>
  );
}
