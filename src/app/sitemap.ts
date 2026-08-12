import type { MetadataRoute } from "next";

const siteUrl = "https://www.agonispartners.com";

/**
 * Static sitemap for the seven marketing routes.
 *
 * `priority` reflects commercial intent rather than importance to us:
 * the two pages a prospective brand converts on (/contact, /for-brands)
 * rank above the explanatory pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/for-brands", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/what-we-do", priority: 0.8, changeFrequency: "monthly" },
    { path: "/partnership-model", priority: 0.8, changeFrequency: "monthly" },
    { path: "/categories", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
