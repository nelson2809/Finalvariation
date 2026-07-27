import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { BrandCTAButton } from "@/components/brand/BrandCTAButton";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { categories, pageHeroImages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Categories — Consumer Focus Areas for Türkiye",
  description:
    "Our focus consumer categories with strong e-commerce potential: pet products, home & living, consumer electronics, small appliances, personal care, baby & family, health & wellness and smart home.",
};

export default function CategoriesPage() {
  return (
    <>
      <PageHero
        image={pageHeroImages.categories}
        imageAlt="Consumer products on retail shelves"
        eyebrow="Categories"
        title="Consumer categories with e-commerce potential"
        description="These are our focus areas — presented as a direction, not a closed list. If your products fit the Turkish market, we'd like to evaluate them."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Categories" }]}
      />

      <Section bg="white">
        <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <RevealItem key={c.name}>
              <article className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/65 to-transparent" />
                  <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-navy shadow-soft backdrop-blur">
                    <c.icon className="h-5 w-5" />
                  </span>
                  {c.badge && (
                    <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-medium text-ink shadow-soft">
                      {c.badge}
                    </span>
                  )}
                  <h2 className="absolute bottom-3 left-4 right-4 font-heading text-lg font-semibold text-white">
                    {c.name}
                  </h2>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.95rem] leading-relaxed text-body">
                    {c.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-sm text-ink">
                    <Check className="h-4 w-4 text-success" />
                    Open to new partner brands
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-14">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-line bg-sand px-8 py-10 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="font-heading text-xl font-semibold text-ink sm:text-2xl">
                Don&apos;t see your category?
              </h2>
              <p className="mt-2 max-w-xl text-body">
                Our categories are a starting point. If your consumer product has
                strong potential for Türkiye, submit it and we&apos;ll evaluate
                the fit.
              </p>
            </div>
            <BrandCTAButton variant="primary" size="lg" className="shrink-0">
              Submit Your Brand
            </BrandCTAButton>
          </div>
        </Reveal>
      </Section>

      <ContactCTA />
    </>
  );
}
