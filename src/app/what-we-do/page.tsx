import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Channels } from "@/components/sections/Channels";
import { Compliance } from "@/components/sections/Compliance";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { services, pageHeroImages } from "@/lib/data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "What We Do — Import, Distribution & Marketplace Growth",
  description:
    "From brand partnership to local sales execution: Agonis Partners handles brand partnerships, import & distribution, marketplace e-commerce sales and long-term brand growth in Türkiye.",
};

const serviceImages = [
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
];

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        image={pageHeroImages.whatWeDo}
        imageAlt="Modern fulfilment operations in Türkiye"
        eyebrow="What We Do"
        title="From brand partnership to local sales execution"
        description="Our business covers the full journey of bringing an international consumer brand into Türkiye and growing it through local e-commerce and sales channels."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "What We Do" }]}
      />

      <Section bg="white">
        <div className="space-y-20 lg:space-y-28">
          {services.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={s.title}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal className={cn(reverse && "lg:order-2")}>
                  <div className="relative overflow-hidden rounded-3xl border border-line shadow-lift">
                    <Image
                      src={serviceImages[i]}
                      alt={s.title}
                      width={1100}
                      height={760}
                      sizes="(max-width: 1024px) 90vw, 45vw"
                      className="h-72 w-full object-cover lg:h-[26rem]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 to-transparent" />
                    <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 text-navy shadow-soft backdrop-blur">
                      <s.icon className="h-6 w-6" />
                    </span>
                  </div>
                </Reveal>

                <Reveal className={cn(reverse && "lg:order-1")}>
                  <span className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-gold-600">
                    0{i + 1}
                  </span>
                  <h2 className="mt-3 text-2xl text-ink sm:text-3xl lg:text-[2.1rem]">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-body">
                    {s.short}
                  </p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2.5 rounded-xl border border-line bg-sand px-4 py-3 text-sm text-ink"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            );
          })}
        </div>
      </Section>

      <Channels />
      <Compliance />
      <ContactCTA />
    </>
  );
}
