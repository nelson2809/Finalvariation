import Image from "next/image";
import Link from "next/link";
import { Store, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { channels } from "@/lib/data";

const image =
  "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200";

export function Channels() {
  return (
    <Section id="channels" bg="white" className="overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Editorial image */}
        <Reveal className="relative">
          <div className="relative h-[22rem] overflow-hidden rounded-3xl shadow-lift sm:h-[26rem] lg:h-[30rem]">
            <Image
              src={image}
              alt="Retail storefront open for business — Türkiye's online marketplaces"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-ink/10" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 right-6 flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 shadow-lift">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-gold">
              <Store className="h-5 w-5" />
            </span>
            <div>
              <p className="font-heading text-sm font-semibold leading-none text-ink">
                4+ marketplaces
              </p>
              <p className="mt-1 text-xs text-muted">Full channel coverage</p>
            </div>
          </div>
        </Reveal>

        {/* Channel list */}
        <div>
          <div className="flex items-center gap-4">
            <span aria-hidden className="hairline w-12" />
            <span className="kicker-edit">Sales Channels</span>
          </div>
          <h2 className="mt-5 text-3xl leading-[1.08] sm:text-4xl lg:text-[2.7rem]">
            We grow your brand on Türkiye&apos;s{" "}
            <em className="italic text-gold-600">leading</em> marketplaces
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-body">
            Our initial focus is e-commerce and marketplace channels — chosen
            by what fits your category best.
          </p>

          <RevealStagger className="mt-9 border-b border-line">
            {channels.map((c, i) => {
              const isExternal = /^https?:/.test(c.href);
              const rowContent = (
                <>
                  <span className="w-10 shrink-0 font-body text-2xl italic leading-none text-gold-600">
                    0{i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-body text-lg font-medium text-ink transition-colors duration-300 group-hover:text-navy">
                      {c.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-body">{c.note}</p>
                  </div>
                  <span className="hidden shrink-0 items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-gold-600 sm:inline-flex">
                    <span className="underline-grow">Channel ready</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </>
              );
              const rowClass =
                "group flex items-center gap-5 border-t border-line py-5 transition-colors duration-300 hover:bg-gold-100/30";
              return (
                <RevealItem key={c.name}>
                  {isExternal ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${c.name} — opens in a new tab`}
                      className={rowClass}
                    >
                      {rowContent}
                    </a>
                  ) : (
                    <Link href={c.href} className={rowClass}>
                      {rowContent}
                    </Link>
                  )}
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </div>
    </Section>
  );
}
