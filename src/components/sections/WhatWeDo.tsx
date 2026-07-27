import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { services } from "@/lib/data";

export function WhatWeDo() {
  return (
    <Section id="what-we-do" bg="white">
      <SectionHeading
        eyebrow="What We Do"
        title="The full journey, from brand partnership to local sales"
        description="We cover everything required to bring an international consumer brand into Türkiye and grow it — under one accountable local partner."
      />

      <RevealStagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map((s) => (
          <RevealItem key={s.title}>
            <article className="card-hover group flex h-full flex-col rounded-2xl border border-line bg-gradient-to-b from-sand to-white p-7">
              <span className="flex h-13 w-13 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-600 text-white shadow-soft transition-colors group-hover:from-gold group-hover:to-gold-600 group-hover:text-ink">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-heading text-xl text-ink">{s.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-body">
                {s.short}
              </p>
              <ul className="mt-5 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-body">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href="/what-we-do"
                className="mt-6 inline-flex items-center gap-1 font-heading text-sm font-medium text-navy transition-colors group-hover:text-gold-600"
              >
                Learn more
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          </RevealItem>
        ))}
      </RevealStagger>
    </Section>
  );
}
