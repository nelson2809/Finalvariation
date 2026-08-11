import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { BrandForm } from "@/components/brand/BrandForm";
import { contact, pageHeroImages } from "@/lib/data";


export const metadata: Metadata = {
  title: "Contact — Submit Your Brand for Türkiye Distribution",
  description:
    "Get in touch with Agonis Partners in Istanbul. Submit your brand for Türkiye distribution, or reach us by email, phone or WhatsApp.",
};

const details = [
  { icon: MapPin, label: "Office", value: contact.address },
  { icon: Phone, label: "Phone", value: contact.phone, href: contact.phoneHref },
  { icon: Mail, label: "Email", value: contact.email, href: contact.emailHref },
  { icon: Clock, label: "Business Hours", value: contact.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        image={pageHeroImages.contact}
        imageAlt="The Agonis Partners office in Istanbul"
        eyebrow="Contact"
        title="Let's talk about your brand in Türkiye"
        description="Submit your brand for distribution, or reach our Istanbul team directly. We typically respond within two business days."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section bg="white">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Details */}
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="gold-rule" />
              <span className="eyebrow">Get In Touch</span>
            </div>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Reach the Agonis Partners team
            </h2>
            <p className="mt-4 text-body">
              Whether you&apos;re an export manager, founder or sales director,
              we&apos;re happy to discuss how we can bring your brand to Türkiye.
            </p>

            <div className="mt-8 space-y-4">
              {details.map((d) => (
                <div
                  key={d.label}
                  className="flex items-start gap-4 rounded-2xl border border-line bg-sand p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-medium text-ink">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="mt-0.5 block text-body transition-colors hover:text-gold-600"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-body">{d.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-heading font-medium text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <MessageCircle className="h-5 w-5" />
              Chat with us on WhatsApp
            </a>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-9">
              <span className="eyebrow">Become a Partner Brand</span>
              <h2 className="mt-3 text-2xl text-ink sm:text-3xl">
                Submit your brand
              </h2>
              <p className="mt-2 text-body">
                Tell us about your products and current markets — we&apos;ll
                review the fit for Türkiye.
              </p>
              <div className="mt-7">
                <BrandForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Map */}
      <section aria-label="Our location" className="bg-cloud">
        <div className="container-px py-16 lg:py-20">
          <Reveal className="overflow-hidden rounded-3xl border border-line shadow-soft">
            <iframe
              title="Agonis Partners office location"
              src={contact.mapEmbed}
              className="h-[24rem] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
