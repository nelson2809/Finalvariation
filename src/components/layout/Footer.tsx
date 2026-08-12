import Link from "next/link";
import {
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { categories, contact } from "@/lib/data";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "For Brands", href: "/for-brands" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Partnership Model", href: "/partnership-model" },
  { label: "About Us", href: "/about" },
];

const supportLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Submit Your Brand", href: "/contact" },
  { label: "FAQ", href: "/#faq" },
  { label: "Categories", href: "/categories" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/contact" },
  { label: "Terms of Use", href: "/contact" },
  { label: "Cookie Policy", href: "/contact" },
];

const socials = [
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "X", href: "#", Icon: Twitter },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-navy-900 text-white">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
      <div className="container-px pb-28 pt-16 sm:pb-16 lg:pb-20 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-white/60">
              An Istanbul-based import and distribution company bringing
              high-potential international consumer brands to Türkiye — and
              growing them through local e-commerce and sales channels.
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-white/65">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {contact.address}
              </p>
              <a
                href={contact.emailHref}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                {contact.email}
              </a>
              <a
                href={contact.phoneHref}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                {contact.phone}
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Company
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Focus Categories
            </h3>
            <ul className="mt-5 grid grid-cols-1 gap-3 text-sm text-white/60 sm:grid-cols-2">
              {categories.map((c) => (
                <li key={c.name}>
                  <Link
                    href="/categories"
                    className="transition-colors hover:text-gold"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support + newsletter */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Support
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              {supportLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Newsletter
            </h3>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/45">
            © {year} Agonis Partners. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/45">
            {legalLinks.map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
