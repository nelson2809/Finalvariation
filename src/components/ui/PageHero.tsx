import Image from "next/image";
import { Breadcrumb } from "./Breadcrumb";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  image,
  imageAlt = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumb: { label: string; href?: string }[];
  /** Optional full-bleed background image (navy-graded for legibility). */
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 pb-16 pt-32 text-white lg:pb-20 lg:pt-44">
      {image ? (
        <>
          {/* Full-bleed background image — slow Ken Burns drift */}
          <div className="absolute inset-0 animate-kenburns will-change-transform">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          {/* Navy color grade for legibility — same treatment as home hero */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/85 via-navy-900/70 to-navy-900/90" />
          <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/60 via-transparent to-gold/15" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy" />
      )}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -right-20 top-6 h-72 w-72 animate-float-slow rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 animate-float-slower rounded-full bg-steel/25 blur-3xl" />

      <div className="container-px relative">
        <Breadcrumb items={breadcrumb} tone="dark" />
        <Reveal className="mt-6 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="gold-rule" />
            <span className="eyebrow text-gold-300">{eyebrow}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
