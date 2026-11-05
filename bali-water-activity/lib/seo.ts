import type { Metadata } from "next";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}

/** Title, description, canonical link and share preview for one page. */
export function pageMeta({ title, description, path, image = "/og-image.jpg", imageAlt }: PageMetaInput): Metadata {
  const images = [{ url: image, alt: imageAlt ?? title }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: "Bali Water Activity", locale: "en_US", url: path, title, description, images },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
