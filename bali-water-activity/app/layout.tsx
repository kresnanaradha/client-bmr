import type { Metadata } from "next";
import { Nunito, Pacifico } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LenisProvider from "@/app/providers/LenisProvider";
import SplashScreen from "@/components/SplashScreen";
import SiteChrome from "@/components/SiteChrome";
import { ALLOW_INDEXING, GTM_ID, SITE_URL } from "@/lib/config";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bali Water Activity – Watersport, Rafting & Tour Packages",
    template: "%s | Bali Water Activity",
  },
  description:
    "Book premium water activities in Bali: Banana Boat, Jet Ski, Parasailing, Sea Walker, Rafting, Nusa Penida & Labuan Bajo tours. Safe, fun, and affordable. Book via WhatsApp!",
  keywords: [
    "Bali Watersport",
    "Bali Water Activity",
    "Bali Rafting",
    "Nusa Penida Tour",
    "Labuan Bajo Tour",
    "Sea Walker Bali",
    "Jet Ski Bali",
    "Parasailing Bali",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Bali Water Activity",
    title: "Bali Water Activity – Premium Watersport & Tours in Bali",
    description:
      "Experience the best water activities in Bali. Jet Ski, Parasailing, Sea Walker, Rafting, Nusa Penida & Labuan Bajo tours. Book now via WhatsApp!",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bali Water Activity – Watersport & Tours",
    description: "Premium water activities in Bali. Book via WhatsApp!",
  },
  robots: { index: ALLOW_INDEXING, follow: ALLOW_INDEXING },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${pacifico.variable}`}>
      <body className={nunito.className}>
        {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
        <SiteChrome>
          <SplashScreen />
          <LenisProvider />
          <Navbar />
        </SiteChrome>
        <main>{children}</main>
        <SiteChrome>
          <Footer />
          <WhatsAppButton />
        </SiteChrome>
      </body>
    </html>
  );
}
