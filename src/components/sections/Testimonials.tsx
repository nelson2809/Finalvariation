import { Quote, Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <Section id="testimonials" bg="cloud">
      <SectionHeading
        eyebrow="Partner Stories"
        title="What international brands expect from a Türkiye partner"
        description="A structured, commercial and execution-driven approach — here's the experience we build for the brands we represent."
      />

      <RevealStagger className="mt-14 grid gap-6 lg:grid-cols-3">
        {testimonials.map((t) => (
          <RevealItem key={t.role}>
            <figure className="card-luxe group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 sm:p-8">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold to-gold-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <Quote className="h-9 w-9 text-gold/50" />
              <div className="mt-4 flex gap-1" aria-label="5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-ink/85">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy to-steel font-heading text-sm font-semibold text-white">
                  {t.initials}
                </span>
                <span>
                  <span className="block font-heading text-sm font-medium text-ink">
                    {t.role}
                  </span>
                  <span className="block text-xs text-muted">{t.region}</span>
                </span>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealStagger>

      <p className="mt-8 text-center text-xs text-muted">
        Illustrative partner profiles. Real references available on request.
      </p>
    </Section>
  );
}
