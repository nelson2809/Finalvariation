import type { Metadata, Viewport } from "next";
import { Poppins, Lora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ModalProvider } from "@/components/brand/ModalProvider";
import {
  OrganizationJsonLd,
  ServiceJsonLd,
  WebSiteJsonLd,
} from "@/components/seo/JsonLd";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-lora",
  display: "swap",
});

const siteUrl = "https://www.agonispartners.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Import & Distribution Company Türkiye | Agonis Partners",
    template: "%s | Agonis Partners",
  },
  description:
    "Agonis Partners is an Istanbul-based import and distribution company for international consumer brands entering Turkey. We handle import, customs and marketplace growth across Amazon Türkiye, Trendyol, Hepsiburada and N11.",
  keywords: [
    "import and distribution company Turkey",
    "international brand distribution Türkiye",
    "import consumer brands Turkey",
    "Turkey market entry partner",
    "e-commerce distribution Türkiye",
    "bring brand to Turkey",
    "Amazon Türkiye distributor",
    "Trendyol distribution partner",
    "Hepsiburada marketplace partner",
    "consumer brand expansion Turkey",
    "local distribution partner Istanbul",
    "Europe Asia gateway market",
    "Turkish marketplace growth",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Agonis Partners",
    title: "Import & Distribution Company in Türkiye for Global Brands",
    description:
      "We import, distribute and grow international consumer products through Türkiye's leading e-commerce and marketplace channels.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Import & Distribution Company Türkiye | Agonis Partners",
    description:
      "Bringing international consumer brands to the Turkish market — import, distribution and marketplace growth.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#102a4c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${lora.variable}`}>
      <body>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <ServiceJsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <ModalProvider>
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop />
          <WhatsAppFloat />
        </ModalProvider>
      </body>
    </html>
  );
}
