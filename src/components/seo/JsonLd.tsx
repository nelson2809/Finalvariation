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
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Agonis Partners",
        alternateName: "Agonis Partners Import & Distribution",
        url: siteUrl,
        logo: `${siteUrl}/agonis-logo.png`,
        description:
          "Istanbul-based import and distribution company bringing international consumer brands to Turkey and growing them across Amazon Türkiye, Trendyol, Hepsiburada and N11.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Göztepe Mah. Tepegöz Sk. Ikar Is Merkezi No: 1, Iç Kapı No: 8",
          addressLocality: "Kadıköy",
          addressRegion: "Istanbul",
          addressCountry: "TR",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: contact.phone,
            email: contact.email,
            contactType: "business partnerships",
            areaServed: ["TR", "GB", "US", "EU"],
            availableLanguage: ["en", "tr"],
          },
        ],
        areaServed: {
          "@type": "Country",
          name: "Turkey",
        },
        knowsAbout: [
          "import and distribution Turkey",
          "international brand distribution Türkiye",
          "marketplace e-commerce sales Türkiye",
          "Amazon Türkiye distribution",
          "Trendyol distribution partner",
          "Hepsiburada marketplace partner",
          "customs and import coordination Turkey",
          "consumer brand expansion Turkey",
        ],
      }}
    />
  );
}

/** WebSite entity — enables the sitelinks search box treatment. */
export function WebSiteJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Agonis Partners",
        description:
          "Import and distribution company in Turkey for international consumer brands.",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en",
      }}
    />
  );
}

/**
 * Professional service listing — this is what surfaces for commercial
 * queries like "import and distribution company Turkey".
 */
export function ServiceJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Agonis Partners — Import & Distribution",
        url: siteUrl,
        image: `${siteUrl}/agonis-logo.png`,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kadıköy",
          addressRegion: "Istanbul",
          addressCountry: "TR",
        },
        areaServed: { "@type": "Country", name: "Turkey" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Import and distribution services in Turkey",
          itemListElement: [
            "Brand partnership and representation in Türkiye",
            "Import and customs coordination Turkey",
            "Marketplace e-commerce sales Türkiye",
            "Sales channel management and pricing",
            "Stock monitoring and reorder planning",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      }}
    />
  );
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
