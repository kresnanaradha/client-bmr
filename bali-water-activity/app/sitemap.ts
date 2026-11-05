import type { MetadataRoute } from "next";
import { watersportActivities } from "@/lib/activities";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/watersport", priority: 0.9, changeFrequency: "weekly" },
    { path: "/rafting", priority: 0.9, changeFrequency: "monthly" },
    { path: "/nusa-penida", priority: 0.9, changeFrequency: "monthly" },
    { path: "/labuan-bajo", priority: 0.9, changeFrequency: "monthly" },
    ...watersportActivities.map((a) => ({ path: `/activity/${a.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/credits", priority: 0.2, changeFrequency: "yearly" },
  ];

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));
}
