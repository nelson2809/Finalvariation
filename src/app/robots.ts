import type { MetadataRoute } from "next";

const siteUrl = "https://www.agonispartners.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The submission endpoint has nothing to index and shouldn't be crawled.
      disallow: ["/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
