import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PartnershipTimeline } from "./PartnershipTimeline";

export function PartnershipModel() {
  return (
    <Section id="partnership-model" bg="navy" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-steel/20 blur-3xl" />
      <div className="relative">
        <SectionHeading
          eyebrow="Partnership Model"
          title="A clear, five-step path into the Turkish market"
          description="Simple, structured and execution-driven — here's exactly how we take your brand from first conversation to long-term growth."
          tone="dark"
        />
        <PartnershipTimeline />
      </div>
    </Section>
  );
}
