import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BUSINESS, waLink } from "@/lib/site";

export function SectionHead({
  eyebrow,
  title,
  intro,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
}) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
      <div>
        {eyebrow && <p className="eyebrow mb-3 text-muted">{eyebrow}</p>}
        <h2 id={id} className="t-section max-w-4xl">
          {title}
        </h2>
      </div>
      {intro && <p className="max-w-sm text-muted">{intro}</p>}
    </div>
  );
}

interface PageHeaderProps {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  tall?: boolean;
}

/** Full-bleed photo with the title set at the bottom left, like the home hero. */
export function PageHeader({ image, imageAlt, eyebrow, title, intro, children, tall }: PageHeaderProps) {
  return (
    <section className={`relative flex items-end overflow-hidden bg-ink text-white ${tall ? "min-h-[86vh]" : "min-h-[72vh]"}`}>
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,23,54,0.88)_0%,rgba(11,23,54,0.45)_45%,rgba(11,23,54,0.35)_100%)]" />
      <div className="gutter relative w-full pb-12 pt-36 md:pb-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <p className="eyebrow mb-4 text-sun">{eyebrow}</p>
            <h1 className="t-page max-w-5xl">{title}</h1>
          </div>
          {intro && <p className="max-w-sm text-[17px] leading-relaxed text-white/90 md:pb-2">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

const TOURS = [
  {
    href: "/nusa-penida",
    name: "Nusa Penida",
    image: "/images/stock/penida-kelingking-1.webp",
    alt: "Kelingking Beach cliffs on Nusa Penida",
    line: "Kelingking, Angel's Billabong, Crystal Bay or manta rays · full day",
    from: "Rp450K",
  },
  {
    href: "/rafting",
    name: "River rafting",
    image: "/images/stock/rafting-ayung-1.webp",
    alt: "Rafting on the Ayung River",
    line: "Ayung or Telaga Waja · 2 to 2.5 hours on the water",
    from: "Rp300K",
  },
  {
    href: "/labuan-bajo",
    name: "Labuan Bajo",
    image: "/images/stock/komodo-padar-1.webp",
    alt: "Padar Island viewpoint in Komodo National Park",
    line: "Komodo, Padar, Pink Beach · 2D1N or 3D2N",
    from: "Rp1,500K",
  },
];

function TourCaption({ name, line, from, big }: { name: string; line: string; from: string; big?: boolean }) {
  return (
    <figcaption className="mt-4">
      <h3 className={big ? "t-item" : "font-serif text-[28px] leading-tight"}>{name}</h3>
      <p className="mt-1 text-muted">
        {line} · from <strong className="font-semibold text-ink">{from}</strong>
      </p>
    </figcaption>
  );
}

export function BeyondSection() {
  const [lead, ...rest] = TOURS;
  return (
    <section aria-labelledby="beyond-title" className="gutter bg-paper-2 py-24 md:py-28">
      <SectionHead
        id="beyond-title"
        eyebrow="Tours"
        title={
          <>
            Beyond <em>the bay</em>
          </>
        }
        intro="Day trips and short escapes run with our partner operators. Hotel pick-up is available on most tours."
      />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-6">
        <Link href={lead.href} className="block">
          <figure>
            <div className="zoom-media relative aspect-[4/3] overflow-hidden rounded-sm lg:aspect-auto lg:h-[620px]">
              <Image src={lead.image} alt={lead.alt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
            </div>
            <TourCaption {...lead} big />
          </figure>
        </Link>
        <div className="flex flex-col gap-10 lg:gap-6">
          {rest.map((tour) => (
            <Link key={tour.href} href={tour.href} className="block">
              <figure>
                <div className="zoom-media relative aspect-[4/3] overflow-hidden rounded-sm lg:aspect-auto lg:h-[280px]">
                  <Image src={tour.image} alt={tour.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                </div>
                <TourCaption {...tour} />
              </figure>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { title: "Pick what you want to do", body: "One activity or a few. Combo packages cost less than booking each one." },
  { title: "Send us the date and group size", body: "On WhatsApp. Mention ages, or anything else we should know." },
  { title: "We confirm, you show up", body: "We send the meeting point and time. You pay on arrival." },
];

export function BookingSteps({ title }: { title?: ReactNode }) {
  return (
    <section aria-labelledby="booking-title" className="gutter py-24 md:py-28">
      <SectionHead
        id="booking-title"
        eyebrow="Booking"
        title={
          title ?? (
            <>
              No forms. <em>Just a message.</em>
            </>
          )
        }
      />
      <ol className="grid gap-10 border-t border-ink pt-8 md:grid-cols-3 md:gap-12">
        {STEPS.map((step, index) => (
          <li key={step.title}>
            <span className="font-serif text-6xl leading-none" aria-hidden="true">
              {index + 1}
            </span>
            <h3 className="mb-2 mt-4 text-xl font-semibold">{step.title}</h3>
            <p className="text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
      <a href={waLink("Hi Bali Water Activity! I'd like to book an activity.")} className="btn btn-whatsapp mt-12">
        Book on WhatsApp
      </a>
    </section>
  );
}

const FACTS = [
  { title: "Ages", body: "8 to 65 for most activities. Sea Walker is 9 to 60." },
  { title: "Health", body: "Not advised with heart conditions, high blood pressure, pregnancy or recent surgery." },
  { title: "Bring", body: "Swimwear, a change of clothes, a towel, sunscreen and photo ID for the jet ski." },
  { title: "Hours", body: "Most activities run from 08:00 to 17:00. Each activity page lists its own times." },
];

export function BeforeYouGo() {
  return (
    <section aria-labelledby="before-title" className="gutter pb-24 md:pb-28">
      <h2 id="before-title" className="eyebrow mb-6 text-muted">
        Before you go
      </h2>
      <dl className="grid gap-8 border-t border-[var(--line)] pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {FACTS.map((fact) => (
          <div key={fact.title}>
            <dt className="mb-2 text-lg font-semibold">{fact.title}</dt>
            <dd>{fact.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function ClosingCta({
  image = "/activities/sea-walker.webp",
  title,
  message = "Hi Bali Water Activity! I'd like to book an activity.",
}: {
  /** null for a plain navy band, when every photo of the subject is already on the page. */
  image?: string | null;
  title?: ReactNode;
  message?: string;
}) {
  return (
    <section className={`relative flex items-end overflow-hidden bg-ink text-white ${image ? "min-h-[560px]" : ""}`}>
      {image && (
        <>
          <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,23,54,0.9),rgba(11,23,54,0.25))]" />
        </>
      )}
      <div className="gutter relative flex w-full flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between md:py-20">
        <h2 className="t-section max-w-3xl">
          {title ?? (
            <>
              Tell us the date.
              <br />
              <em className="text-sun">We&apos;ll handle the rest.</em>
            </>
          )}
        </h2>
        <a href={waLink(message)} className="btn btn-sun text-[17px]">
          WhatsApp {BUSINESS.phoneDisplay}
        </a>
      </div>
    </section>
  );
}
