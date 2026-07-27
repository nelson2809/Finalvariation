import Image from "next/image";
import { Ship, ShoppingCart, TrendingUp, PackageCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { showcaseImages } from "@/lib/data";

const steps = [
  {
    icon: Ship,
    image: showcaseImages.tall,
    imageAlt: "Modern fulfilment warehouse in Türkiye",
    title: "We import",
    description:
      "We buy your products and handle import, customs coordination, labeling and local requirements — end to end.",
  },
  {
    icon: ShoppingCart,
    image: showcaseImages.topRight,
    imageAlt: "E-commerce parcels ready for delivery",
    title: "We sell",
    description:
      "We list, price and run campaigns across Amazon Türkiye, Trendyol, Hepsiburada and N11 — with localized content.",
  },
  {
    icon: TrendingUp,
    image: showcaseImages.bottomRight,
    imageAlt: "Team reviewing marketplace growth performance",
    title: "We grow",
    description:
      "We hold stock, monitor performance, manage reorders and expand your range as your brand takes hold locally.",
  },
];

export function MarketShowcase() {
  return (
    <Section bg="white" className="overflow-hidden">
      {/* Centered editorial header */}
      <Reveal className="mx-auto max-w-2xl text-center">
        <div className="flex items-center justify-center gap-5">
          <span aria-hidden className="hairline hidden w-14 sm:block" />
          <span className="kicker-edit">How It Works</span>
          <span aria-hidden className="hairline hidden w-14 sm:block" />
        </div>
        <h2 className="mt-5 text-3xl leading-[1.08] sm:text-4xl lg:text-[2.9rem]">
          From your warehouse to the{" "}
          <em className="italic text-gold-600">Turkish</em> customer
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-body">
          You supply the products. We handle rest of everything.
        </p>
      </Reveal>

      {/* Three-step image cards */}
      <RevealStagger className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
        {steps.map((s, i) => (
          <RevealItem key={s.title}>
            <article className="group relative h-full">
              <div className="card-hover relative h-56 overflow-hidden rounded-3xl shadow-soft sm:h-64">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-ink/10" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/45 via-transparent to-transparent" />
                {/* Step numeral */}
                <span className="absolute left-4 top-4 flex h-11 min-w-11 items-center justify-center rounded-full border border-white/40 bg-white/90 px-3 font-body text-lg italic text-navy shadow-soft backdrop-blur">
                  0{i + 1}
                </span>
                <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-xl bg-navy/85 text-gold backdrop-blur">
                  <s.icon className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-6 px-1 text-center md:text-left">
                <h3 className="font-body text-2xl font-medium text-ink">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[0.97rem] leading-relaxed text-body">
                  {s.description}
                </p>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealStagger>

      {/* Closing note */}
      <Reveal className="mt-14 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-sand px-5 py-2.5 text-sm italic text-navy">
          <PackageCheck className="h-4 w-4 text-gold-600" />
          End-to-end, transparent and commercially focused
        </span>
      </Reveal>
    </Section>
  );
}
