"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Globe2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { whyAgonis, whyAgonisImages } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Seconds each step stays active — carousel and progress line share this. */
const STEP_DURATION = 5;

export function WhyAgonis() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const next = () => setActive((i) => (i + 1) % whyAgonis.length);

  // Reduced motion: the CSS progress line is disabled, so advance on a timer.
  useEffect(() => {
    if (!reduce || paused) return;
    const t = setTimeout(next, STEP_DURATION * 1000);
    return () => clearTimeout(t);
  }, [active, paused, reduce]);

  const image = whyAgonisImages[active] ?? whyAgonisImages[0];

  return (
    <Section id="why-agonis" bg="sand" className="overflow-x-clip">
      <div
        className="grid gap-12 lg:grid-cols-2 lg:gap-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        // Touch devices fire neither mouse event, so without these the
        // carousel keeps advancing while someone is reading it on a phone.
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        onTouchCancel={() => setPaused(false)}
      >
        {/* Left — step-synced image carousel */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative">
            <div className="relative h-[24rem] overflow-hidden rounded-3xl shadow-lift lg:h-[32rem]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-ink/10" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" />

              {/* Step counter */}
              <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-navy-900/50 px-4 py-1.5 font-body text-sm italic text-white backdrop-blur">
                0{active + 1} / 0{whyAgonis.length}
              </span>

              {/* Dots — click to jump */}
              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-4">
                {whyAgonis.map((f, i) => (
                  <button
                    key={f.title}
                    onClick={() => setActive(i)}
                    aria-label={`Show step ${i + 1}: ${f.title}`}
                    className={cn(
                      "relative h-1.5 rounded-full transition-all duration-300 before:absolute before:-inset-x-2 before:-inset-y-4 before:content-['']",
                      i === active
                        ? "w-7 bg-gold"
                        : "w-1.5 bg-white/50 hover:bg-white/80",
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 shadow-lift">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-gold">
                <Globe2 className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading text-sm font-semibold leading-none text-ink">
                  Global experience
                </p>
                <p className="mt-1 text-xs text-muted">
                  Applied locally in Türkiye
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right — numbered steps with timed progress lines */}
        <div>
          <div className="flex items-center gap-4">
            <span aria-hidden className="hairline w-12" />
            <span className="kicker-edit">Why Agonis Partners</span>
          </div>
          <h2 className="mt-5 text-3xl leading-[1.08] sm:text-4xl lg:text-[2.7rem]">
            A reliable local partner, built for{" "}
            <em className="italic text-gold-600">international</em> brands
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-body">
            We combine international business experience, marketplace knowledge
            and operational execution — so entering Türkiye feels structured
            and low-risk.
          </p>

          <div className="mt-9 border-b border-line">
            {whyAgonis.map((f, i) => {
              const isActive = i === active;
              return (
                <button
                  key={f.title}
                  onClick={() => setActive(i)}
                  aria-current={isActive || undefined}
                  className="group relative block w-full text-left"
                >
                  {/* Track + timed progress line */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-line"
                  />
                  {isActive &&
                    (reduce ? (
                      <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-gold to-gold-300"
                      />
                    ) : (
                      /* CSS-driven line: onAnimationEnd advances the carousel,
                         so the timing can never drift. Hover pauses both. */
                      <span
                        key={`progress-${active}`}
                        aria-hidden
                        onAnimationEnd={next}
                        style={{
                          animation: `progressGrow ${STEP_DURATION}s linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-300"
                      />
                    ))}

                  <div
                    className={cn(
                      "flex items-start gap-5 py-6 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-60 hover:opacity-90",
                    )}
                  >
                    <span
                      className={cn(
                        "w-10 shrink-0 font-body text-2xl italic leading-none transition-colors duration-300",
                        isActive ? "text-gold-600" : "text-ink/40",
                      )}
                    >
                      0{i + 1}
                    </span>
                    <span>
                      <span className="block font-body text-lg font-medium text-ink">
                        {f.title}
                      </span>
                      <span className="mt-1.5 block text-[0.95rem] leading-relaxed text-body">
                        {f.description}
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
