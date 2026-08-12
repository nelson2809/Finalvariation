import type { Metadata } from "next";
import Image from "next/image";
import {
  Target,
  Eye,
  ShieldCheck,
  Briefcase,
  Zap,
  Globe2,
  HeartHandshake,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { WhyAgonis } from "@/components/sections/WhyAgonis";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { pageHeroImages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Istanbul-Based Import & Distribution Company",
  description:
    "Who is Agonis Partners? An Istanbul-based import and distribution company and reliable local partner in Türkiye for international consumer brands — global mindset, local execution, across the Europe–Asia trade bridge.",
  keywords: [
    "Istanbul-based import and distribution company",
    "who is Agonis Partners",
    "reliable local partner Türkiye",
    "international consumer brand partner Istanbul",
    "Turkey market entry expertise",
    "long-term brand partnership",
    "Europe-Asia trade bridge",
    "commercial focus and transparency",
    "mission and vision distribution company",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: "Istanbul-Based Import & Distribution Company | Agonis Partners",
    description:
      "An Istanbul-based import and distribution company and long-term local partner for international consumer brands entering Turkey.",
  },
};

const values = [
  { icon: ShieldCheck, title: "Reliability", text: "A dependable local partner brands can build on." },
  { icon: Briefcase, title: "Commercial Focus", text: "Every decision is grounded in real sales and margins." },
  { icon: Zap, title: "Execution", text: "We turn plans into shipments, listings and growth." },
  { icon: Eye, title: "Transparency", text: "Clear reporting on stock, pricing and performance." },
  { icon: HeartHandshake, title: "Long-Term Partnership", text: "We invest in growth, not one-off orders." },
  { icon: Globe2, title: "Global Mindset", text: "International experience, applied locally." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        image={pageHeroImages.about}
        imageAlt="Istanbul — home of Agonis Partners"
        eyebrow="About Us"
        title="Connecting global consumer brands with the Turkish market"
        description="An Istanbul-based import and distribution company built to help international brands enter and grow in Türkiye with a structured, commercial and execution-driven approach."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* Story */}
      <Section bg="white">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line shadow-lift">
              <Image
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1200"
                alt="Istanbul — gateway between Europe and Asia"
                width={1100}
                height={860}
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-5 py-3 shadow-soft backdrop-blur">
                <p className="font-heading text-sm font-semibold text-ink">
                  Istanbul, Türkiye
                </p>
                <p className="text-xs text-muted">Europe ↔ Asia gateway</p>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="A reliable, commercially focused local partner"
            />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-body">
              <p>
                Agonis Partners is an Istanbul-based import and distribution
                company focused on bringing high-potential international
                consumer brands to Türkiye. We partner with selected global
                brands, import their products, and grow them through local
                e-commerce and sales channels.
              </p>
              <p>
                Our team combines international business experience, marketplace
                knowledge, and operational execution capability to help brands
                enter Türkiye with a reliable and commercially focused approach.
              </p>
              <p>
                In simple terms, we connect global consumer brands with the
                Turkish market — and act as the local partner that makes growth
                here practical and low-risk.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section bg="cloud">
        <RevealStagger className="grid gap-6 lg:grid-cols-2">
          <RevealItem>
            <div className="card-hover flex h-full flex-col rounded-3xl border border-line bg-white p-9">
              <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-navy text-gold">
                <Target className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-heading text-2xl text-ink">Our Mission</h3>
              <p className="mt-3 text-lg leading-relaxed text-body">
                To be the most reliable local partner for international consumer
                brands entering Türkiye — turning market potential into real,
                sustainable sales through structured execution.
              </p>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="card-hover flex h-full flex-col rounded-3xl border border-line bg-white p-9">
              <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gold text-ink">
                <Eye className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-heading text-2xl text-ink">Our Vision</h3>
              <p className="mt-3 text-lg leading-relaxed text-body">
                To become the go-to bridge between global consumer brands and the
                Turkish market — the first name brands think of when they plan to
                grow in Türkiye.
              </p>
            </div>
          </RevealItem>
        </RevealStagger>
      </Section>

      {/* Values */}
      <Section bg="white">
        <SectionHeading
          eyebrow="Our Values"
          title="What guides the way we work"
        />
        <RevealStagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <RevealItem key={v.title}>
              <article className="card-hover flex h-full gap-4 rounded-2xl border border-line bg-sand p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy">
                  <v.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">
                    {v.text}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </Section>

      <WhyAgonis />
      <ContactCTA />
    </>
  );
}
