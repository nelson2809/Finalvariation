import { contact, faqs } from "@/lib/data";

/**
 * JSON-LD structured data.
 *
 * These are server components emitting plain <script> tags — no client JS.
 * Google reads them to build rich results: the organisation panel, the
 * sitelinks search box, and expandable FAQ entries under the home listing.
 *
 * Note on spelling: schema.org fields use "Turkey" alongside "Türkiye"
 * because search volume for the anglicised form remains substantially
 * higher, while all visible page copy keeps "Türkiye".
 */

const siteUrl = "https://www.agonispartners.com";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is generated from our own constants, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organisation + local business identity. Render once, in the root layout. */
export function OrganizationJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
            name: "Agonis Partners",
            alternateName: "Agonis Partners Import & Distribution",
            url: siteUrl,
            logo: {
              "@type": "ImageObject",
              "@id": `${siteUrl}/#logo`,
              url: `${siteUrl}/agonis-logo.png`,
              contentUrl: `${siteUrl}/agonis-logo.png`,
              caption: "Agonis Partners logo",
              inLanguage: "en",
              width: "682",
              height: "227",
            },
            image: {
              "@id": `${siteUrl}/#logo`,
            },
            description:
              "Agonis Partners is an Istanbul-based import and distribution company that helps international consumer brands enter, grow and scale in the Turkish market through local distribution and e-commerce marketplaces including Amazon Türkiye, Trendyol, Hepsiburada and N11.",
            telephone: "+905059095007",
            email: contact.email,
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "Göztepe Mah. Tepegöz Sk. Ikar Is Merkezi No: 1, Iç Kapı No: 8",
              addressLocality: "Kadıköy",
              addressRegion: "Istanbul",
              addressCountry: "TR",
            },
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+905059095007",
                email: contact.email,
                contactType: "customer service",
                areaServed: [
                  { "@type": "Country", name: "Turkey" },
                  { "@type": "Country", name: "United Kingdom" },
                  { "@type": "Country", name: "United States" },
                ],
                availableLanguage: ["English", "Turkish"],
              },
            ],
            areaServed: {
              "@type": "Country",
              name: "Turkey",
            },
            knowsAbout: [
              "Import and distribution in Turkey",
              "International consumer brand distribution in Türkiye",
              "Marketplace e-commerce sales in Türkiye",
              "Amazon Türkiye distribution",
              "Trendyol marketplace distribution",
              "Hepsiburada marketplace distribution",
              "N11 marketplace distribution",
              "Customs and import coordination in Turkey",
              "Consumer brand market entry into Turkey",
              "Brand partnerships",
              "Product localization",
              "Sales channel management",
              "Pricing and promotions",
              "Stock and reorder planning",
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Import and distribution services in Turkey",
              itemListElement: [
                {
                  "@type": "OfferCatalog",
                  name: "Brand Partnership & Representation",
                  itemListElement: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Brand partnership and representation in Türkiye",
                        description:
                          "We partner with selected international consumer brands that have strong product potential and a clear fit for the Turkish market.",
                      },
                    },
                  ],
                },
                {
                  "@type": "OfferCatalog",
                  name: "Import & Customs Coordination",
                  itemListElement: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Import and customs coordination in Turkey",
                        description:
                          "Commercial coordination, import preparation, customs-related coordination, local requirements and labeling.",
                      },
                    },
                  ],
                },
                {
                  "@type": "OfferCatalog",
                  name: "Marketplace & E-Commerce Sales",
                  itemListElement: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Marketplace e-commerce sales in Türkiye",
                        description:
                          "Product listings, content localization, pricing, campaigns and promotions across Amazon Türkiye, Trendyol, Hepsiburada and N11.",
                      },
                    },
                  ],
                },
                {
                  "@type": "OfferCatalog",
                  name: "Sales Channel Management",
                  itemListElement: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Sales channel management and pricing",
                        description:
                          "Pricing and product positioning, campaign planning and marketplace visibility.",
                      },
                    },
                  ],
                },
                {
                  "@type": "OfferCatalog",
                  name: "Stock & Reorder Planning",
                  itemListElement: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Stock monitoring and reorder planning",
                        description:
                          "Stock monitoring, performance tracking, reorder planning and range expansion.",
                      },
                    },
                  ],
                },
              ],
            },
          },
          {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            url: siteUrl,
            name: "Agonis Partners",
            description:
              "Import and distribution company in Turkey for international consumer brands.",
            publisher: { "@id": `${siteUrl}/#organization` },
            inLanguage: "en",
          },
        ],
      }}
    />
  );
}

/** WebSite entity — enables the sitelinks search box treatment. */
export function WebSiteJsonLd() {
  return null;
}

/**
 * Professional service listing — this is what surfaces for commercial
 * queries like "import and distribution company Turkey".
 */
export function ServiceJsonLd() {
  return null;
}

/**
 * FAQ rich result. Pulled from the same `faqs` constant the visible
 * accordion renders, so the two can never drift apart — Google penalises
 * FAQ markup that doesn't match on-page content.
 */
export function FaqJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }}
    />
  );
}

/** Breadcrumb trail for interior pages. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${siteUrl}${item.path}`,
        })),
      }}
    />
  );
}
