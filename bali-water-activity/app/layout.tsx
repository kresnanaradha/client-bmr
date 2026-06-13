import type { Metadata } from "next";
import { Nunito, Pacifico } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LenisProvider from "@/app/providers/LenisProvider";

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
  metadataBase: new URL("https://baliwateractivity.com"),
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
    url: "https://baliwateractivity.com",
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
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${pacifico.variable}`}>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');`,
          }}
        />
      </head>
      <body className={nunito.className}>
        <LenisProvider />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
