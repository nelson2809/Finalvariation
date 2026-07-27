import Link from "next/link";
import { cn } from "@/lib/utils";

/** Agonis Partners wordmark + monogram. `light` for use on dark backgrounds. */
export function Logo({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Agonis Partners — home"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy shadow-soft ring-1 ring-white/10">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          aria-hidden="true"
        >
          {/* Stylised "A" formed by two ascending strokes — import/growth motif */}
          <path
            d="M6 19L12 5l6 14"
            stroke="#ffffff"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.6 13.4h6.8"
            stroke="#c7a45a"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-white" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-[1.15rem] font-semibold tracking-tight",
            light ? "text-white" : "text-ink",
          )}
        >
          Agonis Partners
        </span>
        <span
          className={cn(
            "mt-1 font-heading text-[0.62rem] font-medium uppercase tracking-[0.22em]",
            light ? "text-gold-300" : "text-gold-600",
          )}
        >
          Import &amp; Distribution
        </span>
      </span>
    </Link>
  );
}
