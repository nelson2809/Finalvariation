import { Reveal } from "@/components/ui/Reveal";

const platforms = [
  "Amazon",
  "Walmart",
  "Shopify",
  "TikTok Shop",
  "Trendyol",
  "Hepsiburada",
  "Amazon Türkiye",
  "N11",
  "eBay",
  "Etsy",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-14 pr-14">
      {platforms.map((p) => (
        <span
          key={p}
          className="whitespace-nowrap font-body text-xl italic text-ink/35 transition-colors hover:text-navy sm:text-2xl"
        >
          {p}
        </span>
      ))}
    </div>
  );
}

export function PartnersMarquee() {
  return (
    <section className="border-y border-line bg-white py-12" aria-label="Partner platforms">
      <div className="container-px">
        <Reveal className="text-center">
          <p className="eyebrow">Our Partners &amp; Brands</p>
          <p className="mx-auto mt-3 max-w-2xl text-body">
            We partner with brands proven on the world&apos;s leading platforms —
            and grow them on Türkiye&apos;s biggest marketplaces.
          </p>
        </Reveal>
      </div>
      <div className="relative mt-9 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}
