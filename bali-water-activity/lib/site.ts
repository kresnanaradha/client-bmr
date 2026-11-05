// Set in .env.local locally and in the Vercel project settings; never committed,
// because the repository is public.
export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? "628124600378";

// Off unless explicitly enabled: demo deployments carry sample reviews and
// unconfirmed prices that must not show up in search results.
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

// Google Analytics 4 measurement ID ("G-XXXXXXXXXX"). Blank disables tracking.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

// Canonical origin for metadata, the sitemap and structured data. Set it to the
// real domain at launch.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://bali-water-activity.vercel.app").replace(/\/$/, "");

export const BUSINESS = {
  name: "Bali Water Activity",
  phoneDisplay: "+62 812-4600-378",
  email: "hello@baliwateractivity.com",
  street: "Tropic Residence C/7, Jimbaran",
  locality: "Kuta Selatan",
  region: "Bali",
  postalCode: "80363",
  country: "ID",
  activityArea: "Tanjung Benoa, Nusa Dua, Bali",
} as const;

export function waLink(message?: string): string {
  const base = `https://wa.me/${WA_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** "Rp1,500K" or "IDR 275,000" to a plain rupiah amount, for structured data. */
export function rupiah(price: string): number {
  const digits = Number(price.replace(/[^\d.]/g, ""));
  return /k$/i.test(price.trim()) ? digits * 1000 : digits;
}
