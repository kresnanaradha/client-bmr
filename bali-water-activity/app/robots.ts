import { MetadataRoute } from "next";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/dashboard" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
