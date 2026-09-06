import { labuanBajoPackages, nusaPenidaPackages, raftingPackages } from "./activities";

export type TourCategory = "rafting" | "nusa-penida" | "labuan-bajo";

export interface TourPackage {
  slug: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  includes: string[];
  excludes: string[];
  category: TourCategory;
  /** Back-link to the category listing page. */
  categoryPath: string;
  categoryLabel: string;
  /** The one list each package type carries, with a heading that suits it. */
  detailListTitle: string;
  detailList: string[];
  /** Rafting only. */
  level?: string;
  distance?: string;
}

const CATEGORY_META: Record<TourCategory, { label: string; path: string }> = {
  rafting: { label: "Rafting", path: "/rafting" },
  "nusa-penida": { label: "Nusa Penida", path: "/nusa-penida" },
  "labuan-bajo": { label: "Labuan Bajo", path: "/labuan-bajo" },
};

function base(pkg: {
  slug: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  includes: string[];
  excludes: string[];
}, category: TourCategory) {
  return {
    ...pkg,
    category,
    categoryLabel: CATEGORY_META[category].label,
    categoryPath: CATEGORY_META[category].path,
  };
}

export const tourPackages: TourPackage[] = [
  ...raftingPackages.map((pkg) => ({
    ...base(pkg, "rafting"),
    detailListTitle: "Itinerary",
    detailList: pkg.itinerary,
    level: pkg.level,
    distance: pkg.distance,
  })),
  ...nusaPenidaPackages.map((pkg) => ({
    ...base(pkg, "nusa-penida"),
    detailListTitle: "Destinations",
    detailList: pkg.destinations,
  })),
  ...labuanBajoPackages.map((pkg) => ({
    ...base(pkg, "labuan-bajo"),
    detailListTitle: "Highlights",
    detailList: pkg.highlights,
  })),
];

export function getTourBySlug(slug: string): TourPackage | undefined {
  return tourPackages.find((pkg) => pkg.slug === slug);
}

export function getRelatedTours(pkg: TourPackage, limit = 3): TourPackage[] {
  const sameCategory = tourPackages.filter(
    (other) => other.slug !== pkg.slug && other.category === pkg.category
  );
  const others = tourPackages.filter(
    (other) => other.slug !== pkg.slug && other.category !== pkg.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}
