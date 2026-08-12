import type { Metadata } from "next";
import {
  ShoppingBag,
  ShieldCheck,
  BadgePercent,
  Network,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { PartnershipModel } from "@/components/sections/PartnershipModel";
import { Compliance } from "@/components/sections/Compliance";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { pageHeroImages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Türkiye Distribution Partnership Model",
  description:
    "Our Türkiye distribution partnership model in five steps: brand and product evaluation, commercial discussion, import preparation in Turkey, marketplace launch strategy, and growth and reorder planning — with transparent reporting throughout.",
  keywords: [
    "Türkiye distribution partnership model",
    "brand and product evaluation process",
    "import preparation Turkey",
    "marketplace launch strategy",
    "exclusivity distribution agreement Turkey",
    "commercial discussion distribution",
    "pricing and MOQ agreement",
    "channel strategy Türkiye",
    "transparent reporting distribution",
    "growth and reorder planning",
    "five-step market entry process",
  ],
  alternates: { canonical: "/partnership-model" },
  openGraph: {
    type: "website",
    url: "/partnership-model",
    title: "Türkiye Distribution Partnership Model | Agonis Partners",
    description:
      "A five-step market entry process — evaluation, commercial terms, import preparation, marketplace launch, and growth planning.",
  },
};

const cooperation = [
  {
    icon: ShoppingBag,
    title: "Purchasing & Distribution",
    text: "We buy and import your products, then own the local distribution across channels.",
  },
  {
    icon: ShieldCheck,
    title: "Exclusivity",
    text: "Exclusive or selective arrangements that protect your brand and pricing in Türkiye.",
  },
  {
    icon: BadgePercent,
    title: "Pricing & MOQ",
    text: "Agreed pricing, margins and minimum order quantities aligned to your category.",
  },
  {
    icon: Network,
    title: "Channel Strategy",
    text: "The right mix of marketplaces and channels for your product and goals.",
  },
];

export default function PartnershipModelPage() {
  return (
    <>
      <PageHero
        image={pageHeroImages.partnershipModel}
        imageAlt="A structured partnership working session"
        eyebrow="Partnership Model"
        title="A simple, clear way to work together"
        description="We keep the process transparent and execution-driven — from first evaluation to long-term growth in the Turkish market."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Partnership Model" },
        ]}
      />

      <PartnershipModel />

      <Section bg="white">
        <SectionHeading
          eyebrow="Commercial Discussion"
          title="Flexible cooperation models that fit your brand"
          description="In our commercial discussion we agree the model that works best for your category, margins and growth ambitions."
        />
        <RevealStagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cooperation.map((c) => (
            <RevealItem key={c.title}>
              <article className="card-hover flex h-full flex-col rounded-2xl border border-line bg-sand p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
                  <c.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-heading text-base font-semibold text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {c.text}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </Section>

      <Compliance />
      <ContactCTA />
    </>
  );
}
