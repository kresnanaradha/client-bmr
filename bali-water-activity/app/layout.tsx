import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LenisProvider from "@/app/providers/LenisProvider";
import SiteChrome from "@/components/SiteChrome";
import Analytics from "@/components/Analytics";
import JsonLd, { businessSchema } from "@/components/JsonLd";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/site";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const DESCRIPTION =
  "Jet ski, parasailing, sea walker, banana boat and more at Tanjung Benoa, Bali, plus Ayung River rafting, Nusa Penida day tours and Labuan Bajo trips. Book on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bali Water Activity | Watersports at Tanjung Benoa, Bali",
    template: "%s | Bali Water Activity",
  },
  description: DESCRIPTION,
  applicationName: "Bali Water Activity",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Bali Water Activity",
    title: "Bali Water Activity | Watersports at Tanjung Benoa, Bali",
    description: DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Parasailing over Tanjung Benoa, Bali" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bali Water Activity | Watersports at Tanjung Benoa, Bali",
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: { index: ALLOW_INDEXING, follow: ALLOW_INDEXING },
};

export const viewport: Viewport = {
  themeColor: "#0e1f4d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${instrument.variable}`}>
      <body>
        <SiteChrome>
          <JsonLd data={businessSchema()} />
          <LenisProvider />
          <Navbar />
        </SiteChrome>
        <main>{children}</main>
        <SiteChrome>
          <Footer />
          <WhatsAppButton />
          <Analytics />
        </SiteChrome>
      </body>
    </html>
  );
}
