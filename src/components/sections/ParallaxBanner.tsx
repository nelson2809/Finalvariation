"use client";

import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { bannerImage, bannerStats } from "@/lib/data";

export function ParallaxBanner() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Parallax background */}
      <ParallaxImage
        src={bannerImage}
        alt="Global shipping containers at port — importing into Türkiye"
        strength={90}
        zoom
        rounded={false}
        sizes="100vw"
        className="absolute inset-0 h-full w-full rounded-none"
      />
      <div className="absolute inset-0 -z-0 bg-navy-900/80" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="container-px relative z-10 py-16 sm:py-20 lg:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="gold-rule" />
            <span className="eyebrow text-gold-300">The Opportunity</span>
          </div>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.1] text-white sm:text-4xl lg:text-[2.7rem]">
            A high-potential market, ready for your brand
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Türkiye pairs a large, young and digitally active population with one
            of the region&apos;s fastest-growing e-commerce sectors.
          </p>
        </Reveal>

        <RevealStagger className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {bannerStats.map((s) => (
            <RevealItem key={s.label}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-8 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/[0.09]">
                <p className="font-heading text-4xl font-semibold text-gold lg:text-5xl">
                  <CountUp value={s.value} />
                </p>
                <p className="mt-2 text-sm text-white/70">{s.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
