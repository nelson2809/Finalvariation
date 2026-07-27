"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="mt-4"
    >
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-4 focus-within:border-gold/60">
        <input
          type="email"
          required
          aria-label="Email address"
          placeholder="Your work email"
          className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-ink transition-colors hover:bg-gold-600 hover:text-white"
        >
          {done ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
      <p className="mt-2 text-xs text-white/45">
        {done
          ? "Thanks — you're on the list."
          : "Market insights for international brands. No spam."}
      </p>
    </form>
  );
}
