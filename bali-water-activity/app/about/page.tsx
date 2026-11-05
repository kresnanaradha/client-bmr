import Image from "next/image";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { BookingSteps, ClosingCta, PageHeader } from "@/components/sections/Sections";
import { dummyImage } from "@/lib/dummyImage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Us",
  description:
    "Bali Water Activity books watersports at Tanjung Benoa, river rafting, Nusa Penida tours and Labuan Bajo trips with certified partner operators. One WhatsApp chat handles it all.",
  path: "/about",
  image: dummyImage("about-hero"),
  imageAlt: "Fly board rider above the water at Tanjung Benoa",
});

const PARTNERS = [
  { place: "Tanjung Benoa", what: "Watersports" },
  { place: "Ayung and Telaga Waja", what: "River rafting" },
  { place: "Nusa Penida", what: "Day tours and snorkeling" },
  { place: "Labuan Bajo", what: "Komodo trips" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about" }])} />
      <PageHeader
        image={dummyImage("about-hero")}
        imageAlt="Fly board rider above the water at Tanjung Benoa"
        eyebrow="About us"
        title={
          <>
            One chat, <em>every activity</em>
          </>
        }
        intro="We book water adventures in Bali and beyond, and stay with you from the first message to the meeting point."
      />

      <section aria-labelledby="story-title" className="gutter py-24 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <p className="eyebrow mb-3 text-muted">Who we are</p>
            <h2 id="story-title" className="t-section">
              Your contact <em>in Bali</em>
            </h2>
          </div>
          <div className="max-w-2xl space-y-6 text-lg leading-relaxed">
            <p>
              Bali Water Activity is one place to book water adventures in Bali and beyond. Think of us as a concierge
              rather than a booking site: you tell us what you want to do, and we arrange it.
            </p>
            <p>
              We work with a network of certified, experienced operators across Bali. They run the activities on the
              ground. We handle every message, booking and question, so your experience feels the same from start to finish.
            </p>
            <p>
              Adventure seekers, families on holiday, couples after a sunset parasail: there is something here for
              everyone. Our aim is simple. Make your Bali adventure safe, easy and worth remembering.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="partners-title" className="gutter bg-paper-2 py-24 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image src={dummyImage("tanjung-benoa")} alt="Parasailing above the bay at Tanjung Benoa" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow mb-3 text-muted">Partner network</p>
            <h2 id="partners-title" className="t-section">
              Licensed operators, <em>one brand</em>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed">
              We only work with certified, licensed operators who meet our safety and quality standards. They run the
              activities; every booking and every question stays with Bali Water Activity.
            </p>
            <dl className="mt-10 border-t border-ink">
              {PARTNERS.map((partner) => (
                <div key={partner.place} className="flex justify-between gap-6 border-b border-[var(--line)] py-4">
                  <dt className="font-serif text-2xl">{partner.place}</dt>
                  <dd className="text-muted">{partner.what}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <BookingSteps
        title={
          <>
            How booking <em>works</em>
          </>
        }
      />
      <ClosingCta />
    </>
  );
}
