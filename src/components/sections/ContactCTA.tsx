import { MessageCircle, Mail, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BrandCTAButton } from "@/components/brand/BrandCTAButton";
import { contact } from "@/lib/data";

export function ContactCTA() {
  return (
    <section id="contact-cta" className="bg-white py-20 lg:py-28">
      <div className="container-px">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-sand px-8 py-16 text-center sm:px-12 lg:px-16 lg:py-24">
            <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 animate-float-slow rounded-full bg-gold-300/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 animate-float-slower rounded-full bg-steel-200/30 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <div className="flex items-center justify-center gap-5">
                <span aria-hidden className="hairline hidden w-14 sm:block" />
                <span className="kicker-edit">Become a Partner Brand</span>
                <span aria-hidden className="hairline hidden w-14 sm:block" />
              </div>
              <h2 className="mt-6 text-4xl leading-[1.08] text-ink sm:text-5xl">
                Ready to bring your brand to{" "}
                <em className="italic text-gold-600">Türkiye</em>?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-body">
                Tell us about your products and current markets. We&apos;ll
                review the fit and show you how we&apos;d import, launch and grow
                your brand locally.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <BrandCTAButton variant="primary" size="lg">
                  Submit Your Brand
                  <ArrowRight className="h-4 w-4" />
                </BrandCTAButton>
                <Button
                  href="/contact"
                  variant="outline"
                  size="lg"
                  className="border-line bg-white/70"
                >
                  Contact Us
                </Button>
              </div>

              <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-line pt-8 text-sm text-body sm:flex-row sm:gap-10">
                <a
                  href={contact.emailHref}
                  className="inline-flex items-center gap-2 transition-colors hover:text-navy"
                >
                  <Mail className="h-4 w-4 text-gold-600" />
                  {contact.email}
                </a>
                <a
                  href={contact.whatsappHref}
                  className="inline-flex items-center gap-2 transition-colors hover:text-navy"
                >
                  <MessageCircle className="h-4 w-4 text-gold-600" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
