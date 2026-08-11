"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useBrandModal } from "@/components/brand/ModalProvider";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

const EASE = [0.22, 1, 0.36, 1] as const;

const coverImage =
  "https://images.pexels.com/photos/14801547/pexels-photo-14801547.jpeg";

const trust = ["Amazon Türkiye", "Trendyol", "Hepsiburada", "N11"];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

export function Hero() {
  const { open } = useBrandModal();

  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-navy-900 text-white">
      {/* Full-bleed background image — slow Ken Burns drift */}
      <div className="absolute inset-0 animate-kenburns will-change-transform">
        <Image
          src={coverImage}
          alt="Istanbul skyline at golden hour — the gateway between Europe and Asia"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* Gradient color grade for legibility + warmth */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/75 via-navy-900/50 to-navy-900/90" />
      <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/60 via-transparent to-gold/15" />

      <div className="container-px relative z-10 w-full pb-16 pt-32 lg:pb-20 lg:pt-40">
        {/* Editorial masthead */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            {...fade(0)}
            className="flex items-center justify-center gap-5"
          >
            <span aria-hidden className="hidden h-px w-16 bg-white/30 sm:block" />
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">
              Import &amp; Distribution · Türkiye
            </p>
            <span aria-hidden className="hidden h-px w-16 bg-white/30 sm:block" />
          </motion.div>

          <motion.h1
            {...fade(0.1)}
            className="display-edit mt-9 text-white"
          >
            Global consumer brands, brought gracefully to{" "}
            <em className="italic text-gold-300">Türkiye</em>.
          </motion.h1>

          <motion.p
            {...fade(0.2)}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white lg:text-xl"
          >
            We import, distribute and grow international consumer products
            through Türkiye&apos;s leading e-commerce channels — so your brand
            enters the market without building a local operation.
          </motion.p>

          <motion.div
            {...fade(0.3)}
            className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Magnetic>
              <button
                onClick={open}
                className="group btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-gold px-9 py-4 font-heading text-base font-medium text-ink shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
              >
                Partner With Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Magnetic>
            <Button
              href="/what-we-do"
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/5 text-white backdrop-blur-sm hover:border-gold hover:text-white"
            >
              Explore What We Do
            </Button>
          </motion.div>
        </div>

        {/* Trust row — editorial wordmarks */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mx-auto mt-20 max-w-4xl border-t border-white/15 pt-8"
        >
          <p className="text-center text-xs uppercase tracking-[0.24em] text-white/50">
            We sell &amp; grow brands on
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-12 gap-y-3">
            {trust.map((t) => (
              <span
                key={t}
                className="font-body text-xl italic text-white/60 transition-colors duration-300 hover:text-gold-300 sm:text-2xl"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        aria-hidden
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/30 p-1.5">
          <span className="h-2 w-1 animate-scroll-cue rounded-full bg-gold-300" />
        </span>
      </motion.div>
    </section>
  );
}
