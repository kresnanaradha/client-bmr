import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { BeforeYouGo, ClosingCta, PageHeader, SectionHead } from "@/components/sections/Sections";
import { watersportActivities } from "@/lib/activities";
import { shortDuration } from "@/lib/format";
import { pageMeta } from "@/lib/seo";
import { waLink } from "@/lib/site";

export const metadata = pageMeta({
  title: "Watersports in Tanjung Benoa, Bali",
  description:
    "Eight watersports at Tanjung Benoa, Bali: jet ski, parasailing, sea walker, banana boat, donut boat, fly fish, disco boat and fly board. Prices from Rp125K. Book on WhatsApp.",
  path: "/watersport",
  image: "/activities/parasailing.webp",
  imageAlt: "Tandem parasailing over Tanjung Benoa",
});

const COMBOS = [
  { name: "Fun Starter Pack", activities: ["Banana Boat", "Donut Boat"], price: "IDR 275,000", original: "IDR 306,000", tag: "Save 10%" },
  { name: "Thrill Seeker Pack", activities: ["Jet Ski", "Parasailing", "Fly Fish"], price: "IDR 850,000", original: "IDR 971,500", tag: "Save 12.5%" },
  { name: "Ultimate Pack", activities: ["Banana Boat", "Jet Ski", "Parasailing", "Snorkeling"], price: "IDR 1,000,000", original: "IDR 1,150,000", tag: "Save 14%" },
];

export default function WatersportPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Watersports", path: "/watersport" }])} />
      <PageHeader
        image="/activities/parasailing-2.webp"
        imageAlt="Parasailing above the bay at Tanjung Benoa"
        eyebrow="Tanjung Benoa · Nusa Dua"
        title={
          <>
            Watersports <em>in Bali</em>
          </>
        }
        intro="Eight activities from one beach, from a gentle banana boat ride to the fly board. Instructor, life jacket and insurance included."
      />

      <section aria-labelledby="all-title" className="gutter py-24 md:py-28">
        <SectionHead
          id="all-title"
          eyebrow="All eight"
          title={
            <>
              Choose <em>your water</em>
            </>
          }
          intro="Prices per person. Tap an activity for times, what is included and health notes."
        />
        <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {watersportActivities.map((activity) => (
            <li key={activity.slug}>
              <Link href={`/activity/${activity.slug}`} className="group block">
                <div className="zoom-media relative aspect-[4/5] overflow-hidden rounded-sm bg-paper-2">
                  <Image
                    src={activity.image}
                    alt={`${activity.title} at Tanjung Benoa`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-[28px] leading-tight group-hover:italic">{activity.title}</h3>
                  <span className="whitespace-nowrap text-lg font-semibold">{activity.netPrice}</span>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {shortDuration(activity.duration)} · ages {activity.ageRange} ·{" "}
                  <span className="line-through">{activity.publishPrice}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="combo-title" className="gutter bg-paper-2 py-24 md:py-28">
        <SectionHead
          id="combo-title"
          eyebrow="Combo packages"
          title={
            <>
              Do more, <em>pay less</em>
            </>
          }
          intro="Book several activities together. Ask us on WhatsApp if you want a different mix."
        />
        <ul className="grid border-t border-ink md:grid-cols-3">
          {COMBOS.map((combo) => (
            <li
              key={combo.name}
              className="flex flex-col border-b border-[var(--line)] py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <p className="eyebrow mb-3 text-muted">{combo.tag}</p>
              <h3 className="t-item">{combo.name}</h3>
              <ul className="mt-5 space-y-2">
                {combo.activities.map((name) => (
                  <li key={name} className="flex items-center gap-2.5">
                    <Check size={16} strokeWidth={2} aria-hidden="true" className="text-blue" />
                    {name}
                  </li>
                ))}
              </ul>
              <p className="mt-8 flex items-baseline gap-3">
                <span className="text-2xl font-semibold">{combo.price}</span>
                <span className="text-sm text-muted line-through">{combo.original}</span>
              </p>
              <a
                href={waLink(`Hi! I'd like to book the ${combo.name} (${combo.price}).`)}
                className="btn btn-line mt-6 self-start"
              >
                Book this package
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="pt-24 md:pt-28">
        <BeforeYouGo />
      </div>
      <ClosingCta
        title={
          <>
            Not sure which one?
            <br />
            <em className="text-sun">Ask us, we&apos;ll suggest one.</em>
          </>
        }
        message="Hi Bali Water Activity! Can you help me choose a watersport?"
      />
    </>
  );
}
