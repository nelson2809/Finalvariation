import type { Metadata, Viewport } from "next";
import { Poppins, Lora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ModalProvider } from "@/components/brand/ModalProvider";

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
    default: "Agonis Partners — Bringing Global Consumer Brands to Türkiye",
    template: "%s | Agonis Partners",
  },
  description:
    "Agonis Partners is an Istanbul-based import & distribution company that brings high-potential international consumer brands to the Turkish market and grows them through leading e-commerce and marketplace channels — Amazon Türkiye, Trendyol, Hepsiburada and N11.",
  keywords: [
    "Türkiye distribution partner",
    "import consumer brands Turkey",
    "Trendyol distribution",
    "Amazon Türkiye distributor",
    "Hepsiburada marketplace partner",
    "international brand distribution Türkiye",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Agonis Partners",
    title: "Bringing Global Consumer Brands to Türkiye",
    description:
      "We import, distribute and grow international consumer products through Türkiye's leading e-commerce and sales channels.",
  },
  robots: { index: true, follow: true },
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
