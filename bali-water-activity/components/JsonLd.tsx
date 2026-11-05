import { BUSINESS, SITE_URL, WA_NUMBER, rupiah } from "@/lib/site";

type Json = Record<string, unknown>;

export default function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      // Structured data must be raw JSON; "<" is escaped so content can't close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const BUSINESS_ID = `${SITE_URL}/#business`;

export function businessSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: `+${WA_NUMBER}`,
    email: BUSINESS.email,
    priceRange: "Rp125K to Rp2,500K",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    areaServed: ["Tanjung Benoa", "Nusa Dua", "Bali", "Nusa Penida", "Labuan Bajo"],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

interface OfferInput {
  name: string;
  description: string;
  path: string;
  image: string;
  price: string;
}

export function offerSchema({ name, description, path, image, price }: OfferInput): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: `${SITE_URL}${image}`,
    brand: { "@type": "Brand", name: BUSINESS.name },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}${path}`,
      priceCurrency: "IDR",
      price: rupiah(price),
      availability: "https://schema.org/InStock",
      seller: { "@id": BUSINESS_ID },
    },
  };
}

export function faqSchema(items: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
