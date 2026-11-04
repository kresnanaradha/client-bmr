"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the marketing chrome (splash, navbar, footer, floating WhatsApp button)
 * on the operator-facing dashboard, which is not part of the public site.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard")) return null;
  return <>{children}</>;
}
