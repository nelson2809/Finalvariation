import type { Metadata } from "next";
import {
  ShoppingBag,
  Store,
  ShoppingCart,
  FileCheck2,
  Tag,
  Boxes,
  TrendingUp,
  ArrowRight,
  ArrowDown,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { WhyAgonis } from "@/components/sections/WhyAgonis";
import { PartnershipModel } from "@/components/sections/PartnershipModel";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { pageHeroImages } from "@/lib/data";

export const metadata: Metadata = {
  title: "For Brands — Your Türkiye Import & Distribution Partner",
  description:
    "If you're looking to enter the Turkish market, Agonis Partners can be your local import and distribution partner — handling import, marketplace sales, pricing and long-term growth.",
};

/* Ordered flow — step 1 → 7, flowing left to right */
const handled = [
  { icon: ShoppingBag, title: "Purchase & import products", text: "We buy and import your products into Türkiye under clear commercial terms." },
  { icon: FileCheck2, title: "Import & local requirements", text: "Product classification, customs coordination, labeling and local compliance." },
  { icon: TrendingUp, title: "Long-term brand growth", text: "Visibility, campaigns and range expansion to grow your brand over time." },
  { icon: Store, title: "Manage local sales channels", text: "We operate and own your presence across Türkiye's sales channels." },
  { icon: Tag, title: "Pricing & positioning", text: "Competitive, brand-safe pricing and positioning tuned to the local market." },
  { icon: ShoppingCart, title: "Marketplace & e-commerce sales", text: "Listings, content, pricing and campaigns on Amazon Türkiye, Trendyol, Hepsiburada and N11." },
  { icon: Boxes, title: "Stock & reorder planning", text: "Demand-based stock planning and reorders so you never miss sales." },
];

function StepCard({
  step,
  icon: Icon,
  title,
  text,
}: {
  step: number;
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <article className="card-hover relative flex h-full flex-col rounded-2xl border border-line bg-sand p-6">
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-gold">
          <Icon className="h-5 w-5" />
        </span>
        <span className="font-body text-2xl italic leading-none text-gold-600">
          0{step}
        </span>
      </div>
      <h3 className="mt-4 font-heading text-base font-semibold text-ink">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-body">{text}</p>
    </article>
  );
}

/** Small gold arrow chip between cards (desktop snake flow). */
function FlowArrow() {
  return (
    <span
      aria-hidden
      className="absolute -right-[26px] top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-white text-gold-600 shadow-soft"
    >
      <ArrowRight className="h-3.5 w-3.5" />
    </span>
  );
}

export default function ForBrandsPage() {
  const row1 = handled.slice(0, 4);
  const row2 = handled.slice(4);

  return (
    <>
      <PageHero
        image={pageHeroImages.forBrands}
        imageAlt="A partnership handshake between brands"
        eyebrow="For Brands"
        title="Your local partner for the Turkish market"
        description="If you're looking to enter Türkiye, Agonis Partners can be your local import and distribution partner — so you can grow here without building your own operation from day one."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "For Brands" }]}
      />

      {/* What we handle — snake flow, step 1 → 7 */}
      <Section bg="white">
        <SectionHeading
          eyebrow="What We Handle"
          title="We take care of everything between your warehouse and the Turkish customer"
          description="You supply products. We buy your products, handle the import, manage sales, the channels and the growth."
        />

        {/* Desktop: snake flow — 4 across, curve down, 3 across */}
        <div className="mt-14 hidden lg:block">
          <RevealStagger className="grid grid-cols-4 gap-x-[52px] gap-y-0">
            {row1.map((h, i) => (
              <RevealItem key={h.title} className="relative">
                <StepCard step={i + 1} {...h} />
                {i < row1.length - 1 && <FlowArrow />}
              </RevealItem>
            ))}
          </RevealStagger>

          {/* Curved connector: end of row 1 → start of row 2 */}
          <svg
            aria-hidden
            viewBox="0 0 1000 90"
            preserveAspectRatio="none"
            className="h-[72px] w-full text-gold-600"
            fill="none"
          >
            <path
              d="M 875 4 C 875 70, 125 8, 125 74"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M 117 64 L 125 78 L 133 64"
              stroke="currentColor"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <RevealStagger className="grid grid-cols-4 gap-x-[52px] gap-y-0">
            {row2.map((h, i) => (
              <RevealItem key={h.title} className="relative">
                <StepCard step={i + 5} {...h} />
                {i < row2.length - 1 && <FlowArrow />}
              </RevealItem>
            ))}
          </RevealStagger>
        </div>

        {/* Mobile / tablet: vertical flow with down arrows */}
        <RevealStagger className="mt-12 grid gap-0 lg:hidden">
          {handled.map((h, i) => (
            <RevealItem key={h.title}>
              <StepCard step={i + 1} {...h} />
              {i < handled.length - 1 && (
                <div aria-hidden className="flex justify-center py-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 bg-white text-gold-600 shadow-soft">
                    <ArrowDown className="h-3.5 w-3.5" />
                  </span>
                </div>
              )}
            </RevealItem>
          ))}
        </RevealStagger>
      </Section>

      <WhyAgonis />
      <PartnershipModel />
      <ContactCTA />
    </>
  );
}
