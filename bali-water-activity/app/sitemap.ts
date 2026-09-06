import { MetadataRoute } from "next";
import { watersportActivities } from "@/lib/activities";
import { tourPackages } from "@/lib/tours";

import { SITE_URL } from "@/lib/config";

const BASE_URL = SITE_URL;

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

  const packageRoutes = tourPackages.map((pkg) => ({
    url: `${BASE_URL}/tour/${pkg.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...activityRoutes, ...packageRoutes];
}
