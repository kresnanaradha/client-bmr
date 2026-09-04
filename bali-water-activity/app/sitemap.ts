import { MetadataRoute } from "next";
import { watersportActivities, raftingPackages, nusaPenidaPackages, labuanBajoPackages } from "@/lib/activities";

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

  // Package pages have no detail routes yet; surface them via their category page
  // anchors so the entries below stay valid until dedicated routes exist.
  const packageRoutes = [
    ...raftingPackages.map((p) => `${BASE_URL}/rafting#${p.slug}`),
    ...nusaPenidaPackages.map((p) => `${BASE_URL}/nusa-penida#${p.slug}`),
    ...labuanBajoPackages.map((p) => `${BASE_URL}/labuan-bajo#${p.slug}`),
  ].map((url) => ({ url, changeFrequency: "monthly" as const, priority: 0.7 }));

  return [...staticRoutes, ...activityRoutes, ...packageRoutes];
}
