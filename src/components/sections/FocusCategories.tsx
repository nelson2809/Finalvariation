import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { categories } from "@/lib/data";

export function FocusCategories() {
  return (
    <Section id="categories" bg="sand" className="overflow-hidden">
      {/* Editorial header */}
      <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
        <Reveal>
          <div className="flex items-center gap-4">
            <span aria-hidden className="hairline w-12" />
            <span className="kicker-edit">Focus Categories</span>
          </div>
          <h2 className="mt-5 text-3xl leading-[1.08] sm:text-4xl lg:text-[2.9rem]">
            Consumer categories with{" "}
            <em className="italic text-gold-600">real</em> e-commerce potential
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:justify-self-end">
          <p className="max-w-md text-lg leading-relaxed text-body">
            Focus areas, not a closed list. If your products fit the Turkish
            market, we want to hear from you.
          </p>
          <Link
            href="/categories"
            className="group mt-5 inline-flex items-center gap-2 font-heading text-sm font-medium text-navy"
          >
            <span className="underline-grow">View all categories</span>
            <ArrowRight className="h-4 w-4 text-gold-600 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      {/* Portrait gallery cards — image above, editorial caption below */}
      <RevealStagger className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
        {categories.map((c) => (
          <RevealItem key={c.name}>
            <Link href="/categories" className="group block h-full">
              <div className="card-hover relative h-48 overflow-hidden rounded-3xl shadow-soft sm:h-60 lg:h-64">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 1023px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-ink/10" />
                {c.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-navy shadow-soft backdrop-blur">
                    {c.badge}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 shadow-soft backdrop-blur transition-all duration-300 group-hover:bg-gold group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-2 px-0.5 sm:flex-row sm:items-start sm:gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-navy shadow-soft">
                  <c.icon className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-body text-lg font-medium leading-snug text-ink break-words">
                    {c.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-body">
                    {c.description}
                  </p>
                </div>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealStagger>
    </Section>
  );
}
