"use client";

import { Section } from "@/components/ui/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { whyTurkiye } from "@/lib/data";

export function WhyTurkiye() {
  return (
    <Section id="why-turkiye" bg="cloud">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="gold-rule" />
            <span className="eyebrow">Why Türkiye</span>
          </div>
          <h2 className="mt-4 text-3xl leading-[1.1] sm:text-4xl lg:text-[2.6rem]">
            A large, fast-growing market at the crossroads of Europe and Asia
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-body">
            Türkiye combines a young, digitally active population with one of
            the region&apos;s fastest-growing e-commerce sectors. For
            international brands, it&apos;s a high-potential market — but one
            that rewards local execution, marketplace know-how and a partner
            who understands both sides.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-body">
            That&apos;s where Agonis Partners comes in: we turn market potential
            into real, measurable sales.
          </p>
        </Reveal>

        <RevealStagger className="grid grid-cols-2 gap-x-10 gap-y-12">
          {whyTurkiye.map((s) => (
            <RevealItem key={s.label}>
              <div className="border-t border-ink/15 pt-5">
                <p className="font-body text-4xl font-medium text-ink lg:text-5xl">
                  <CountUp value={s.value} />
                </p>
                <p className="mt-2.5 font-heading text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">
                  {s.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-body">{s.sub}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </Section>
  );
}
