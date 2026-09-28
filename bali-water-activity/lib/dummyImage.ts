/*
 * Curated imagery per slot. Watersports use the client's own photos; tours and
 * destinations use Wikimedia Commons photos of the actual places until the
 * client supplies their own (credited on /credits, required by their licences).
 *
 * Previously every seed resolved to a random picsum.photos image, which is how
 * a football pitch ended up on a Nusa Penida gallery. Seeds must be listed here.
 */
const CLIENT = "/activities";
const STOCK = "/images/stock";

const IMAGES: Record<string, string> = {
  // Watersports — client photos
  "banana-boat": `${CLIENT}/banana-boat.webp`,
  "donut-boat": `${CLIENT}/donut-boat.webp`,
  "jet-ski": `${CLIENT}/jet-ski.webp`,
  parasailing: `${CLIENT}/parasailing.webp`,
  "disco-boat": `${CLIENT}/disco-boat.webp`,
  "fly-fish": `${CLIENT}/fly-fish.webp`,
  "fly-board": `${CLIENT}/fly-board.webp`,
  "sea-walker": `${CLIENT}/sea-walker.webp`,
  "tanjung-benoa": `${CLIENT}/parasailing-2.webp`,
  "about-hero": `${CLIENT}/fly-board.webp`,

  // Rafting
  "rafting-hero": `${STOCK}/rafting-ayung-valley-1.webp`,
  "ayung-river": `${STOCK}/rafting-ayung-valley-1.webp`,
  "ayung-river-rafting": `${STOCK}/rafting-ayung-1.webp`,
  "telaga-waja-rafting": `${STOCK}/rafting-ayung-valley-2.webp`,

  // Nusa Penida
  "penida-hero": `${STOCK}/penida-kelingking-1.webp`,
  "nusa-penida": `${STOCK}/penida-diamond-aerial.webp`,
  "nusa-penida-west-tour": `${STOCK}/penida-kelingking-2.webp`,
  "nusa-penida-east-tour": `${STOCK}/penida-atuh-beach.webp`,
  "nusa-penida-snorkeling": `${STOCK}/penida-manta-ray.webp`,
  "penida-1": `${STOCK}/penida-angels-billabong.webp`,
  "penida-2": `${STOCK}/penida-broken-beach.webp`,
  "penida-3": `${STOCK}/penida-diamond-beach.webp`,
  "penida-4": `${STOCK}/penida-crystal-bay.webp`,

  // Labuan Bajo / Komodo
  "labuan-hero": `${STOCK}/komodo-padar-1.webp`,
  "labuan-bajo": `${STOCK}/komodo-padar-2.webp`,
  "labuan-bajo-2d1n": `${STOCK}/komodo-dragon-1.webp`,
  "labuan-bajo-3d2n": `${STOCK}/komodo-phinisi-2.webp`,
  "labuan-1": `${STOCK}/komodo-pink-beach.webp`,
  "labuan-2": `${STOCK}/komodo-dragon-2.webp`,
  "labuan-3": `${STOCK}/komodo-phinisi-1.webp`,
};

// A neutral underwater frame beats a random stranger's photo if a seed is missing.
const FALLBACK = "/assets/hero-poster.jpg";

export const dummyImage = (seed: string): string => IMAGES[seed] ?? FALLBACK;
