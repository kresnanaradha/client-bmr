/*
 * Placeholder imagery until the client's own photos are delivered.
 * Seeded so a given activity keeps the same picture across reloads and builds.
 * ponytail: swap this one function out for the real CDN paths later.
 */
export const dummyImage = (seed: string, w = 1200, h = 900) =>
  `https://picsum.photos/seed/bwa-${seed}/${w}/${h}`;
