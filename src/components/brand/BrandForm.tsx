"use client";

import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { productCategoryOptions } from "@/lib/data";
import type { FieldErrors } from "@/lib/brand-submission";
import { cn } from "@/lib/utils";

type Props = {
  /** compact = tighter spacing for the modal */
  compact?: boolean;
  onSuccess?: () => void;
};

const inputBase =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-base sm:text-[0.95rem] text-ink " +
  "placeholder:text-muted/70 font-body transition-colors " +
  "focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

const inputError =
  "border-red-400 focus:border-red-400 focus:ring-red-200";

const labelBase = "block text-sm font-heading font-medium text-ink mb-1.5";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-start gap-1.5 text-xs text-red-600">
      <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" />
      {msg}
    </p>
  );
}

export function BrandForm({ compact = false, onSuccess }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrors({});
    setFormError(null);

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    payload.source = compact ? "modal" : "contact-page";

    try {
      const res = await fetch("/api/brand-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.ok) {
        setErrors(json?.errors ?? {});
        setFormError(
          json?.error ??
            "Something went wrong on our end. Please try again, or email info@agonispartners.com.",
        );
        setStatus("idle");
        // Bring the first problem into view rather than leaving the user
        // staring at an unchanged form.
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      setStatus("sent");
      onSuccess?.();
    } catch {
      setFormError(
        "We couldn't reach the server. Please check your connection and try again.",
      );
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-sand-100 px-6 py-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-xl text-ink">Thank you — your brand is in.</h3>
        <p className="mt-2 max-w-sm text-body">
          We&apos;ve sent a confirmation to your inbox. Our Istanbul team will
          review your brand for Türkiye distribution and get back to you within
          two business days.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn("grid gap-5", compact ? "sm:grid-cols-2" : "sm:grid-cols-2")}
      noValidate
    >
      {formError && (
        <div
          role="alert"
          className="sm:col-span-2 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {formError}
        </div>
      )}

      <div>
        <label htmlFor="name" className={labelBase}>
          Name <span className="text-gold-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          aria-invalid={!!errors.name}
          className={cn(inputBase, errors.name && inputError)}
          placeholder="Your full name"
        />
        <FieldError msg={errors.name} />
      </div>

      <div>
        <label htmlFor="email" className={labelBase}>
          Email <span className="text-gold-600">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={!!errors.email}
          className={cn(inputBase, errors.email && inputError)}
          placeholder="you@company.com"
        />
        <FieldError msg={errors.email} />
      </div>

      <div>
        <label htmlFor="company" className={labelBase}>
          Company
        </label>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          aria-invalid={!!errors.company}
          className={cn(inputBase, errors.company && inputError)}
          placeholder="Company name"
        />
        <FieldError msg={errors.company} />
      </div>

      <div>
        <label htmlFor="brand" className={labelBase}>
          Brand Name <span className="text-gold-600">*</span>
        </label>
        <input
          id="brand"
          name="brand"
          required
          aria-invalid={!!errors.brand}
          className={cn(inputBase, errors.brand && inputError)}
          placeholder="Your brand"
        />
        <FieldError msg={errors.brand} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="website" className={labelBase}>
          Website
        </label>
        <input
          id="website"
          name="website"
          type="url"
          inputMode="url"
          aria-invalid={!!errors.website}
          className={cn(inputBase, errors.website && inputError)}
          placeholder="https://"
        />
        <FieldError msg={errors.website} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="store" className={labelBase}>
          Amazon / Marketplace Store Link
        </label>
        <input
          id="store"
          name="store"
          type="url"
          inputMode="url"
          aria-invalid={!!errors.store}
          className={cn(inputBase, errors.store && inputError)}
          placeholder="https://"
        />
        <FieldError msg={errors.store} />
      </div>

      <div>
        <label htmlFor="category" className={labelBase}>
          Product Category
        </label>
        <select
          id="category"
          name="category"
          className={cn(inputBase, "appearance-none")}
        >
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
          aria-invalid={!!errors.markets}
          className={cn(inputBase, errors.markets && inputError)}
          placeholder="e.g. US, UK, EU"
        />
        <FieldError msg={errors.markets} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className={labelBase}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 3 : 4}
          aria-invalid={!!errors.message}
          className={cn(inputBase, "resize-none", errors.message && inputError)}
          placeholder="Tell us about your products and goals for Türkiye."
        />
        <FieldError msg={errors.message} />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Do not fill this in</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
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
            "disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0",
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
