import {
  Handshake,
  Ship,
  ShoppingCart,
  TrendingUp,
  PawPrint,
  Sofa,
  Smartphone,
  CookingPot,
  Baby,
  HeartPulse,
  Home,
  ClipboardCheck,
  MessagesSquare,
  PackageCheck,
  Rocket,
  RefreshCcw,
  ShieldCheck,
  BadgeCheck,
  FileCheck2,
  BarChart3,
  Globe2,
  Truck,
  Users,
  Store,
  type LucideIcon,
} from "lucide-react";

/* Helper for tuned Unsplash source URLs (re-optimised again by next/image). */
const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "For Brands", href: "/for-brands" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Categories", href: "/categories" },
  { label: "Partnership Model", href: "/partnership-model" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/*  What We Do — 4 core areas                                          */
/* ------------------------------------------------------------------ */
export type Service = {
  icon: LucideIcon;
  title: string;
  short: string;
  points: string[];
  /** Optional override shown on the What We Do detail page. */
  detailPoints?: string[];
};

export const services: Service[] = [
  {
    icon: Handshake,
    title: "Brand Partnerships",
    short:
      "We partner with selected international consumer brands that have strong product potential and a clear fit for the Turkish market.",
    points: [
      "Category, pricing & differentiation review",
      "Market-potential & demand assessment",
      "Go-to-market planning",
      "Long-term growth opportunity evaluation",
    ],
    detailPoints: [
      "Market-potential & demand assessment",
      "Category, pricing & differentiation review",
      "Initial meetings and opportunity assessment",
      "Long-term growth opportunity evaluation",
    ],
  },
  {
    icon: Ship,
    title: "Import & Distribution",
    short:
      "We import products into Türkiye and manage the full local distribution process end to end.",
    points: [
      "Commercial coordination & import preparation",
      "Customs-related coordination",
      "Local requirements & labeling",
      "Stock planning & channel readiness",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Marketplace & E-Commerce Sales",
    short:
      "We sell and grow products through Türkiye's leading online sales channels.",
    points: [
      "Amazon Türkiye, Trendyol, Hepsiburada, N11",
      "Product listings & content localization",
      "Pricing, campaigns & promotions",
      "Stock monitoring & performance tracking",
    ],
  },
  {
    icon: TrendingUp,
    title: "Local Brand Growth",
    short:
      "We don't just import — we build long-term growth for partner brands in Türkiye.",
    points: [
      "Pricing & product positioning",
      "Campaign planning & marketplace visibility",
      "Customer feedback & support management",
      "Reorder planning & range expansion",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Focus Categories                                                   */
/* ------------------------------------------------------------------ */
export type Category = {
  icon: LucideIcon;
  name: string;
  description: string;
  image: string;
  badge?: string;
};

export const categories: Category[] = [
  {
    icon: PawPrint,
    name: "Pet Products",
    description:
      "Food accessories, grooming, smart feeders and lifestyle products for a fast-growing pet-owner market.",
    image: img("1450778869180-41d0601e046e"),
    badge: "High demand",
  },
  {
    icon: Sofa,
    name: "Home & Living",
    description:
      "Décor, organization, kitchenware and everyday home products with strong online repeat-purchase potential.",
    image: img("1586023492125-27b2c045efd7"),
    badge: "Popular",
  },
  {
    icon: Smartphone,
    name: "Consumer Electronics",
    description:
      "Audio, mobile accessories and gadgets that perform well across Turkish marketplaces.",
    image: img("1505740420928-5e560c06d30e"),
  },
  {
    icon: CookingPot,
    name: "Small Home Appliances",
    description:
      "Compact kitchen and household appliances built for modern Turkish homes.",
    image: img("1574269909862-7e1d70bb8078"),
  },
  {
    icon: Baby,
    name: "Baby & Family Products",
    description:
      "Trusted baby and family essentials where quality and authenticity drive loyalty.",
    image: img("1555252333-9f8e92e65df9"),
  },
  {
    icon: HeartPulse,
    name: "Health & Wellness Accessories",
    description:
      "Fitness, recovery and wellness accessories aligned with rising health-conscious demand.",
    image: img("1571019613454-1cb2f99b2d8b"),
    badge: "Growing",
  },
  {
    icon: Home,
    name: "Smart Home Accessories",
    description:
      "Connected lighting, sensors and smart devices for the expanding smart-home segment.",
    image: img("1558002038-1055907df827"),
  },
];

/* ------------------------------------------------------------------ */
/*  Partnership Model — 5 steps                                        */
/* ------------------------------------------------------------------ */
export type Step = {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
};

export const partnershipSteps: Step[] = [
  {
    icon: ClipboardCheck,
    step: "01",
    title: "Brand & Product Evaluation",
    description:
      "We review your brand, product range, price level, sales performance, customer reviews, category potential and fit for the Turkish market.",
  },
  {
    icon: MessagesSquare,
    step: "02",
    title: "Commercial Discussion",
    description:
      "We agree the most suitable cooperation model — purchasing, distribution, exclusivity, pricing, minimum order quantity and channel strategy.",
  },
  {
    icon: PackageCheck,
    step: "03",
    title: "Import Preparation",
    description:
      "We coordinate product classification, customs preparation, labeling, local requirements, logistics and stock planning.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Marketplace Launch",
    description:
      "We launch on relevant Turkish channels with listings, pricing, campaign setup, stock monitoring and performance tracking.",
  },
  {
    icon: RefreshCcw,
    step: "05",
    title: "Growth & Reorder",
    description:
      "We monitor performance, manage reorders, optimize marketplace visibility and expand the product range over time.",
  },
];

/* ------------------------------------------------------------------ */
/*  Sales channels / marketplaces                                      */
/* ------------------------------------------------------------------ */
export type Channel = {
  name: string;
  note: string;
  href: string;
};

export const channels: Channel[] = [
  {
    name: "Amazon Türkiye",
    note: "Global marketplace presence",
    href: "https://www.amazon.com.tr",
  },
  {
    name: "Trendyol",
    note: "Türkiye's leading marketplace",
    href: "https://www.trendyol.com",
  },
  {
    name: "Hepsiburada",
    note: "Major local e-commerce platform",
    href: "https://www.hepsiburada.com",
  },
  {
    name: "N11",
    note: "Established online marketplace",
    href: "https://www.n11.com",
  },
  {
    name: "+ Category channels",
    note: "Selected by product fit",
    href: "/categories",
  },
];

/* ------------------------------------------------------------------ */
/*  Why Agonis Partners                                                */
/* ------------------------------------------------------------------ */
export type Feature = { icon: LucideIcon; title: string; description: string };

export const whyAgonis: Feature[] = [
  {
    icon: Globe2,
    title: "International Business Experience",
    description:
      "A team that understands how global brands operate and what export and sales directors need from a local partner.",
  },
  {
    icon: Store,
    title: "Marketplace Expertise",
    description:
      "Hands-on knowledge of Amazon Türkiye, Trendyol, Hepsiburada and N11 — listings, pricing and campaigns.",
  },
  {
    icon: Truck,
    title: "Operational Execution",
    description:
      "Import coordination, customs preparation, labeling and stock planning handled end to end.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Local Partner",
    description:
      "A structured, commercially focused approach so you can enter Türkiye without building a local operation.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Growth",
    description:
      "Pricing, positioning, visibility and reorder planning driven by real marketplace performance.",
  },
  {
    icon: Users,
    title: "Long-Term Partnership",
    description:
      "We invest in building your brand in Türkiye, not just placing a single order.",
  },
];

/* ------------------------------------------------------------------ */
/*  Why Türkiye                                                        */
/* ------------------------------------------------------------------ */
export const whyTurkiye: { value: string; label: string; sub: string }[] = [
  {
    value: "85M+",
    label: "Consumers",
    sub: "A large, young and digitally active population.",
  },
  {
    value: "1st in Europe",
    label: "E-commerce growth",
    sub: "4th in the World",
  },
  {
    value: "4+",
    label: "Major marketplaces",
    sub: "Trendyol, Hepsiburada, Amazon Türkiye and N11 with national reach.",
  },
  {
    value: "Bridge",
    label: "Europe ↔ Asia",
    sub: "A strategic gateway market connecting two continents.",
  },
];

/* ------------------------------------------------------------------ */
/*  Compliance & standards (trust)                                     */
/* ------------------------------------------------------------------ */
export const compliance: Feature[] = [
  {
    icon: FileCheck2,
    title: "Customs & Import Compliance",
    description:
      "Product classification and customs-related coordination handled to local requirements.",
  },
  {
    icon: BadgeCheck,
    title: "Authorized Distribution",
    description:
      "Clear commercial agreements that protect your brand and pricing in-market.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Authenticity",
    description:
      "Genuine products, correct labeling and brand-safe presentation across channels.",
  },
  {
    icon: BarChart3,
    title: "Transparent Reporting",
    description:
      "Clear visibility on stock, pricing, sales performance and reorder planning.",
  },
];

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/*  NOTE: illustrative placeholders — replace with real partner        */
/*  quotes before launch.                                              */
/* ------------------------------------------------------------------ */
export type Testimonial = {
  quote: string;
  role: string;
  region: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We wanted to enter Türkiye without setting up our own operation. Agonis Partners handled import, listings and marketplace launch — we just supplied the product.",
    role: "Export Manager, Home & Living brand",
    region: "United Kingdom",
    initials: "HL",
  },
  {
    quote:
      "Their understanding of Trendyol and Hepsiburada pricing and campaigns made the difference. The launch felt structured and commercial from day one.",
    role: "Founder, Pet Products brand",
    region: "United States",
    initials: "PP",
  },
  {
    quote:
      "Clear reporting, reliable communication and a real focus on long-term growth rather than a one-off order. Exactly the local partner we were looking for.",
    role: "Sales Director, Personal Care brand",
    region: "European Union",
    initials: "PC",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
export const faqs: { q: string; a: string }[] = [
  {
    q: "What does Agonis Partners actually do?",
    a: "We are a Türkiye-based import and distribution partner. We bring high-potential international consumer brands into Türkiye, handle import and local requirements, and grow them through leading e-commerce and marketplace channels such as Amazon Türkiye, Trendyol, Hepsiburada and N11.",
  },
  {
    q: "Which brands are a good fit?",
    a: "Brands that already sell in the US, UK, EU or other international markets, with strong customer reviews, proven sales performance and a differentiated consumer product that is not yet widely available in Türkiye.",
  },
  {
    q: "Do we need to set up a company or operation in Türkiye?",
    a: "No. The point of working with Agonis Partners is that you can enter and grow in Türkiye without building your own local operation. We act as your local import, distribution and sales partner.",
  },
  {
    q: "What cooperation models do you offer?",
    a: "We discuss the most suitable model together — including purchasing, distribution, exclusivity, pricing, minimum order quantity and channel strategy — based on your category and goals.",
  },
  {
    q: "Which sales channels do you use?",
    a: "Our initial focus is e-commerce and marketplaces: Amazon Türkiye, Trendyol, Hepsiburada, N11 and other relevant online channels depending on the product category.",
  },
  {
    q: "How do we get started?",
    a: "Submit your brand through our contact form with your website, marketplace links, product category and current markets. We review the fit and come back to you to discuss a potential cooperation.",
  },
];

/* ------------------------------------------------------------------ */
/*  Contact details                                                    */
/* ------------------------------------------------------------------ */
export const contact = {
  company: "Agonis Partners",
  tagline: "Import & Distribution",
  address:
    "Göztepe Mah. Tepegöz Sk. İkar İş Merkezi No: 1 İç Kapı No: 8, Kadıköy / İstanbul, Türkiye",
  phone: "+90 505 9095007",
  phoneHref: "tel:+905059095007",
  email: "info@agonispartners.com",
  emailHref: "mailto:info@agonispartners.com",
  whatsapp: "+90 505 9095007",
  whatsappHref: "https://wa.me/+905059095007",
  hours: "Mon – Fri · 09:00 – 18:00 (GMT+3)",
  mapEmbed:
    "https://www.google.com/maps?q=Ikar%20Is%20Merkezi%20Tepeg%C3%B6z%20Sk.%20G%C3%B6ztepe%20Kad%C4%B1k%C3%B6y%20Istanbul&output=embed",
};

export const productCategoryOptions = [
  "Pet Products",
  "Home & Living",
  "Consumer Electronics",
  "Small Home Appliances",
  "Personal Care",
  "Baby & Family Products",
  "Health & Wellness Accessories",
  "Smart Home Accessories",
  "Other",
];

export const heroImage = img("1586528116311-ad8dd3c8310d", 1800);

/* Editorial collage (MarketShowcase) */
export const showcaseImages = {
  tall: img("1586528116311-ad8dd3c8310d", 1000), // warehouse / fulfilment
  topRight: img("1607083206968-13611e3d76db", 900), // e-commerce parcels
  bottomRight: img("1600880292203-757bb62b4baf", 900), // team / meeting
};

/* Full-width parallax stats banner */
export const bannerImage = img("1605902711622-cfb43c4437b5", 1800); // shipping containers

/* Why Agonis — step carousel images (one per feature, same order) */
export const whyAgonisImages: { src: string; alt: string }[] = [
  {
    src: img("1522071820081-009f0129c71c", 1200),
    alt: "International business team planning a Türkiye market entry",
  },
  {
    src: img("1607083206968-13611e3d76db", 1200),
    alt: "E-commerce parcels prepared for Türkiye's marketplaces",
  },
  {
    src: img("1586528116311-ad8dd3c8310d", 1200),
    alt: "Fulfilment warehouse operations handled end to end",
  },
  {
    src: img("1521791136064-7986c2920216", 1200),
    alt: "A reliable local partnership, sealed with a handshake",
  },
  {
    src: img("1551288049-bebda4e38f71", 1200),
    alt: "Marketplace performance data driving growth decisions",
  },
  {
    src: img("1600880292203-757bb62b4baf", 1200),
    alt: "A long-term partnership working session",
  },
];

/* Inner-page hero backgrounds (PageHero) */
export const pageHeroImages = {
  about: img("1541432901042-2d8bd64b4a9b", 1800), // Istanbul — where we're based
  whatWeDo: img("1586528116311-ad8dd3c8310d", 1800), // fulfilment warehouse
  categories: img("1441986300917-64674bd600d8", 1800), // retail products
  forBrands: img("1521791136064-7986c2920216", 1800), // partnership handshake
  partnershipModel: img("1600880292203-757bb62b4baf", 1800), // working session
  contact: img("1497366216548-37526070297c", 1800), // Istanbul office
};

export const bannerStats: { value: string; label: string }[] = [
  { value: "85M+", label: "Consumers reachable" },
  { value: "4+", label: "Leading marketplaces" },
  { value: "100%", label: "Local execution" },
];
