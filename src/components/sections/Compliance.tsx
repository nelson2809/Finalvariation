import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { compliance } from "@/lib/data";

const image =
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200";

export function Compliance() {
  return (
    <Section id="compliance" bg="sand" className="overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Copy + 2x2 items */}
        <div>
          <div className="flex items-center gap-4">
            <span aria-hidden className="hairline w-12" />
            <span className="kicker-edit">Compliance &amp; Standards</span>
          </div>
          <h2 className="mt-5 text-3xl leading-[1.08] sm:text-4xl lg:text-[2.7rem]">
            Brand-safe, compliant and{" "}
            <em className="italic text-gold-600">transparent</em> — by default
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
            We protect your brand at every step, from correct import
            classification to authentic listings and clear reporting.
          </p>

          <RevealStagger className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {compliance.map((c) => (
              <RevealItem key={c.title}>
                <div className="border-t border-ink/15 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-gold">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-body text-lg font-medium text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {c.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>

        {/* Editorial image */}
        <Reveal className="relative">
          <div className="relative h-[24rem] overflow-hidden rounded-3xl shadow-lift lg:h-[34rem]">
            <Image
              src={image}
              alt="Business partners shaking hands over a clear distribution agreement"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-ink/10" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/35 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 shadow-lift">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-gold">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="font-heading text-sm font-semibold leading-none text-ink">
                Authorized &amp; brand-safe
              </p>
              <p className="mt-1 text-xs text-muted">
                Clear agreements, real reporting
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
