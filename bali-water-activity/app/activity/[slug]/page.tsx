import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, X } from "lucide-react";
import JsonLd, { breadcrumbSchema, offerSchema } from "@/components/JsonLd";
import { PageHeader } from "@/components/sections/Sections";
import { watersportActivities, type Activity } from "@/lib/activities";
import { shortDuration } from "@/lib/format";
import { pageMeta } from "@/lib/seo";
import { waLink } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

const findActivity = (slug: string) => watersportActivities.find((a) => a.slug === slug);

export async function generateStaticParams() {
  return watersportActivities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const activity = findActivity((await params).slug);
  if (!activity) return {};
  const name = activity.title.replace(" with Instructor", "");
  return pageMeta({
    title: `${name} in Tanjung Benoa, Bali from ${activity.netPrice}`,
    description: `${activity.description} ${shortDuration(activity.duration)}, ages ${activity.ageRange}. Book on WhatsApp with Bali Water Activity.`,
    path: `/activity/${activity.slug}`,
    image: activity.image,
    imageAlt: `${activity.title} at Tanjung Benoa`,
  });
}

function List({ items, kind }: { items: string[]; kind: "yes" | "no" }) {
  const Icon = kind === "yes" ? Check : X;
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon size={18} strokeWidth={2} aria-hidden="true" className={`mt-0.5 shrink-0 ${kind === "yes" ? "text-blue" : "text-muted"}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[var(--line)] pt-8">
      <h2 className="eyebrow mb-5 text-muted">{title}</h2>
      {children}
    </section>
  );
}

function BookingCard({ activity, waMessage }: { activity: Activity; waMessage: string }) {
  return (
    <div className="border border-ink bg-white p-7">
      <p className="text-sm text-muted">Per person</p>
      <p className="mt-1 flex items-baseline gap-3">
        <span className="font-serif text-6xl leading-none">{activity.netPrice}</span>
        <span className="text-muted line-through">{activity.publishPrice}</span>
      </p>
      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--line)] pt-5 text-sm">
        <div>
          <dt className="text-muted">Duration</dt>
          <dd className="font-medium">{shortDuration(activity.duration)}</dd>
        </div>
        <div>
          <dt className="text-muted">Ages</dt>
          <dd className="font-medium">{activity.ageRange}</dd>
        </div>
      </dl>
      <a href={waLink(waMessage)} className="btn btn-whatsapp mt-7 w-full">
        Book on WhatsApp
      </a>
      <p className="mt-3 text-center text-sm text-muted">No upfront payment. Pay on arrival.</p>
    </div>
  );
}

export default async function ActivityDetailPage({ params }: Props) {
  const activity = findActivity((await params).slug);
  if (!activity) notFound();

  const path = `/activity/${activity.slug}`;
  const waMessage = `Hi! I'd like to book ${activity.title}. Is it available on [date] for [number] people?`;
  const others = watersportActivities.filter((a) => a.slug !== activity.slug).slice(0, 4);

  return (
    <>
      <JsonLd
        data={[
          offerSchema({ name: activity.title, description: activity.longDescription, path, image: activity.image, price: activity.netPrice }),
          breadcrumbSchema([
            { name: "Watersports", path: "/watersport" },
            { name: activity.title, path },
          ]),
        ]}
      />
      <PageHeader
        image={activity.image}
        imageAlt={`${activity.title} at Tanjung Benoa`}
        eyebrow="Watersport · Tanjung Benoa"
        title={activity.title}
        intro={activity.description}
      >
        <Link href="/watersport" className="mt-8 inline-flex items-center gap-2 text-sm text-white/85 hover:text-sun">
          <ArrowLeft size={16} aria-hidden="true" /> All watersports
        </Link>
      </PageHeader>

      <div className="gutter grid gap-14 py-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20 md:py-24">
        <div className="space-y-12">
          <section>
            <h2 className="t-section mb-6">
              What to <em>expect</em>
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed">{activity.longDescription}</p>
          </section>

          <div className="lg:hidden">
            <BookingCard activity={activity} waMessage={waMessage} />
          </div>

          <Block title="Times">
            <dl className="grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-sm text-muted">First session</dt>
                <dd className="font-serif text-4xl">{activity.openHour}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Last session</dt>
                <dd className="font-serif text-4xl">{activity.closeHour}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Check-in</dt>
                <dd>{activity.checkInNote}</dd>
              </div>
            </dl>
          </Block>

          <Block title="What's included">
            <div className="grid gap-8 sm:grid-cols-2">
              <List items={activity.includes} kind="yes" />
              <div>
                <h3 className="mb-3 text-sm font-semibold">Not included</h3>
                <List items={activity.excludes} kind="no" />
              </div>
            </div>
          </Block>

          <Block title="On the water">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mb-3 text-sm font-semibold">Do</h3>
                <List items={activity.dos} kind="yes" />
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold">Don&apos;t</h3>
                <List items={activity.donts} kind="no" />
              </div>
            </div>
          </Block>

          <Block title="Health and insurance">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mb-3 text-sm font-semibold">Not advised if you have</h3>
                <ul className="list-disc space-y-1.5 pl-5">
                  {activity.healthRestrictions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold">Insurance</h3>
                <p>{activity.insuranceInfo}</p>
              </div>
            </div>
          </Block>
        </div>

        <aside className="hidden lg:block" aria-label="Booking">
          <div className="sticky top-28">
            <BookingCard activity={activity} waMessage={waMessage} />
          </div>
        </aside>
      </div>

      <section aria-labelledby="more-title" className="gutter border-t border-[var(--line)] py-20 md:py-24">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 id="more-title" className="t-section">
            More <em>on the water</em>
          </h2>
          <Link href="/watersport" className="link hidden shrink-0 sm:inline">
            See all eight
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {others.map((other) => (
            <li key={other.slug}>
              <Link href={`/activity/${other.slug}`} className="group block">
                <div className="zoom-media relative aspect-[4/5] overflow-hidden rounded-sm bg-paper-2">
                  <Image src={other.image} alt={`${other.title} at Tanjung Benoa`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                </div>
                <h3 className="mt-3 font-serif text-2xl leading-tight group-hover:italic">{other.title}</h3>
                <p className="text-sm text-muted">
                  {other.netPrice} · {shortDuration(other.duration)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
