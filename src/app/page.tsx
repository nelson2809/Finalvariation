import { Hero } from "@/components/sections/Hero";
// Hidden for now — re-enable once partner references are available.
// import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { MarketShowcase } from "@/components/sections/MarketShowcase";
import { WhyTurkiye } from "@/components/sections/WhyTurkiye";
import { FocusCategories } from "@/components/sections/FocusCategories";
import { ParallaxBanner } from "@/components/sections/ParallaxBanner";
import { WhyAgonis } from "@/components/sections/WhyAgonis";
import { PartnershipModel } from "@/components/sections/PartnershipModel";
import { Channels } from "@/components/sections/Channels";
import { Compliance } from "@/components/sections/Compliance";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <PartnersMarquee /> — hidden until partner references are ready */}
      <WhatWeDo />
      <MarketShowcase />
      <WhyTurkiye />
      <FocusCategories />
      <ParallaxBanner />
      <WhyAgonis />
      <PartnershipModel />
      <Channels />
      <Compliance />
      <Testimonials />
      <FAQ />
      <ContactCTA />
    </>
  );
}
