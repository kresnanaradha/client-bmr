import { MetadataRoute } from "next";
import { watersportActivities, raftingPackages, nusaPenidaPackages, labuanBajoPackages } from "@/lib/activities";

const BASE_URL = "https://baliwateractivity.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: BASE_URL, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/watersport`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/rafting`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/nusa-penida`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/labuan-bajo`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const activityRoutes = watersportActivities.map((a) => ({
    url: `${BASE_URL}/activity/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...activityRoutes];
}
