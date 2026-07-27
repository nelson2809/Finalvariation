"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { partnershipSteps } from "@/lib/data";
import { useBrandModal } from "@/components/brand/ModalProvider";
import { cn } from "@/lib/utils";

/** Seconds each step stays active — underline fill and panel share this. */
const STEP_DURATION = 5;

export function PartnershipTimeline() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { open } = useBrandModal();
  const reduce = useReducedMotion();
  const step = partnershipSteps[active];

  const next = () => setActive((i) => (i + 1) % partnershipSteps.length);

  // Reduced motion: the CSS underline is disabled, so advance on a timer.
  useEffect(() => {
    if (!reduce || paused) return;
    const t = setTimeout(next, STEP_DURATION * 1000);
    return () => clearTimeout(t);
  }, [active, paused, reduce]);

  return (
    <div
      className="mt-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stepper */}
      <div className="relative">
        {/* connecting line */}
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-white/15 lg:block" />
        <div
          className="absolute left-0 top-7 hidden h-px bg-gold transition-all duration-500 lg:block"
          style={{ width: `${(active / (partnershipSteps.length - 1)) * 100}%` }}
        />
        <ol className="grid gap-4 lg:grid-cols-5">
          {partnershipSteps.map((s, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <li key={s.step}>
                <button
                  onClick={() => setActive(i)}
                  aria-current={isActive ? "step" : undefined}
                  className="group relative flex w-full items-center gap-4 pb-3 text-left lg:flex-col lg:items-start lg:gap-3"
                >
                  <span
                    className={cn(
                      "relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border font-heading text-lg font-semibold transition-all duration-300",
                      isActive
                        ? "border-gold bg-gold text-ink shadow-gold"
                        : isDone
                          ? "border-gold/40 bg-navy-800 text-gold"
                          : "border-white/15 bg-navy-800 text-white/60 group-hover:border-white/40",
                    )}
                  >
                    <s.icon className="h-6 w-6" />
                  </span>
                  <span className="lg:mt-1">
                    <span
                      className={cn(
                        "block font-heading text-xs uppercase tracking-[0.16em]",
                        isActive ? "text-gold" : "text-white/40",
                      )}
                    >
                      Step {s.step}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block font-heading text-sm font-medium leading-snug transition-colors",
                        isActive ? "text-white" : "text-white/65",
                      )}
                    >
                      {s.title}
                    </span>
                  </span>

                  {/* Timed underline — track + gold fill on the active step */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-white/10"
                  />
                  {isActive &&
                    (reduce ? (
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-gold to-gold-300"
                      />
                    ) : (
                      /* CSS-driven fill: onAnimationEnd advances the stepper,
                         so underline and panel can never drift. Hover pauses. */
                      <span
                        key={`underline-${active}`}
                        aria-hidden
                        onAnimationEnd={next}
                        style={{
                          animation: `progressGrow ${STEP_DURATION}s linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-gold to-gold-300"
                      />
                    ))}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Detail panel */}
      <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-center gap-8 lg:grid-cols-[auto_1fr_auto]"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gold/15 text-gold">
              <step.icon className="h-9 w-9" />
            </span>
            <div>
              <p className="font-heading text-sm uppercase tracking-[0.16em] text-gold">
                Step {step.step} of 0{partnershipSteps.length}
              </p>
              <h3 className="mt-2 font-heading text-2xl text-white sm:text-3xl">
                {step.title}
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">
                {step.description}
              </p>
            </div>
            {active === partnershipSteps.length - 1 && (
              <button
                onClick={open}
                className="group btn-shine inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-heading font-medium text-ink transition-all hover:-translate-y-0.5 hover:bg-gold-600 hover:text-white"
              >
                Start now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
