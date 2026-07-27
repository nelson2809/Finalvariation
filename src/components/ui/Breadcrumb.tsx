import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({
  items,
  tone = "light",
}: {
  items: { label: string; href?: string }[];
  tone?: "light" | "dark";
}) {
  const base = tone === "dark" ? "text-white/60" : "text-muted";
  const current = tone === "dark" ? "text-white" : "text-ink";
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={`${base} transition-colors hover:text-gold-600`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={`${current} font-medium`}>{item.label}</span>
              )}
              {!last && <ChevronRight className={`h-3.5 w-3.5 ${base}`} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
