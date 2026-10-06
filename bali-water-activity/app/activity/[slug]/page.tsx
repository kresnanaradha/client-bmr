import { WA_NUMBER } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { watersportActivities } from "@/lib/activities";
import {
  Clock, Users, Shield, CheckCircle, X, AlertTriangle,
  Heart, ThumbsUp, ArrowLeft,
} from "lucide-react";
import Link from "next/link";


interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return watersportActivities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = watersportActivities.find((a) => a.slug === slug);
  if (!activity) return {};
  return {
    title: `${activity.title} Bali – Book via WhatsApp`,
    description: `${activity.description} Price: ${activity.price}. Age: ${activity.ageRange} years. Book instantly via WhatsApp with Bali Water Activity.`,
  };
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params;
  const activity = watersportActivities.find((a) => a.slug === slug);
  if (!activity) notFound();

  const waMsg = `Hi! I want to book ${activity.title} in Bali. Can you confirm availability and provide details?`;

  return (
    <div className="ocean-page">
      {/* Hero */}
      <section className="aq-page-hero h-[46vh] min-h-[340px]">
        <img
          src={activity.image}
          alt={activity.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Link
            href="/watersport"
            className="mb-5 inline-flex cursor-pointer items-center gap-1.5 text-[13px] text-white/60 transition-colors hover:text-[#FFC48A]"
          >
            <ArrowLeft size={14} /> Back to Watersport
          </Link>

          {activity.badge && (
            <span className="mb-4 block w-fit rounded-full bg-gradient-to-br from-[#FFC48A] to-[#F9913E] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1B0E02]">
              {activity.badge}
            </span>
          )}

          <h1 className="aq-display mb-2 text-display-lg text-white">{activity.title}</h1>
          <p className="text-[14px] text-white/55">Watersport · Tanjung Benoa, Bali</p>
        </div>
      </section>

      {/* Quick info bar */}
      <div className="sticky top-16 z-30 border-b border-white/10 bg-[#04131F]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-5 text-[13px] text-[#8FB0C2]">
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#3ED6E0]" /> {activity.duration}</span>
            <span className="flex items-center gap-1.5"><Users size={14} className="text-[#3ED6E0]" /> Age {activity.ageRange}</span>
            <span className="flex items-center gap-1.5"><Shield size={14} className="text-[#3ED6E0]" /> Insured</span>
            <span className="aq-accent-text font-display text-[18px] font-semibold">{activity.price}</span>
          </div>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="aq-btn !px-6 !py-2.5 text-[13px]"
          >
            Book via WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-4 lg:col-span-2">
            {/* Overview */}
            <section className="aq-panel p-8">
              <h2 className="aq-display mb-4 text-[22px] text-[#EAF4F8]">Overview</h2>
              <p className="text-[14px] leading-[1.9] text-[#8FB0C2]">{activity.longDescription}</p>
            </section>

            {/* Operating Hours */}
            <section className="aq-panel p-8">
              <h2 className="aq-display mb-6 text-[22px] text-[#EAF4F8]">Operating Hours</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  { label: "Opens", value: activity.openHour },
                  { label: "Closes", value: activity.closeHour },
                ].map((t) => (
                  <div key={t.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-center">
                    <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#6E90A4]">{t.label}</p>
                    <p className="font-display text-[24px] font-semibold text-[#3ED6E0]">{t.value}</p>
                  </div>
                ))}
                <div className="col-span-2 rounded-2xl border border-[#F9913E]/25 bg-[#F9913E]/8 p-5 text-center sm:col-span-1">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#FFC48A]">Check-in</p>
                  <p className="text-[13px] leading-[1.6] text-[#EAF4F8]">{activity.checkInNote}</p>
                </div>
              </div>
            </section>

            {/* Health Requirements */}
            <section className="aq-panel border-[#F9913E]/25 bg-[#F9913E]/[0.06] p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#F9913E]/30 bg-[#F9913E]/12 text-[#FFC48A]">
                  <AlertTriangle size={18} strokeWidth={1.7} />
                </div>
                <h2 className="text-[19px] font-semibold text-[#EAF4F8]">Health Requirements</h2>
              </div>
              <p className="mb-5 text-[13px] leading-[1.75] text-[#8FB0C2]">
                For safety, participants with the following conditions are advised NOT to join this activity:
              </p>
              <ul className="space-y-3">
                {activity.healthRestrictions.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-[13px] text-[#8FB0C2]">
                    <Heart size={14} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[#FFC48A]" /> {r}
                  </li>
                ))}
              </ul>
            </section>

            {/* Do's and Don'ts */}
            <section className="aq-panel p-8">
              <h2 className="aq-display mb-7 text-[22px] text-[#EAF4F8]">Do&apos;s and Don&apos;ts</h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <p className="aq-label flex items-center gap-2 !text-[#3ED6E0]">
                    <ThumbsUp size={14} /> Do
                  </p>
                  <ul className="space-y-3">
                    {activity.dos.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-[13px] leading-[1.7] text-[#8FB0C2]">
                        <CheckCircle size={14} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[#3ED6E0]" /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="aq-label flex items-center gap-2 !text-[#FFC48A]">
                    <X size={14} /> Don&apos;t
                  </p>
                  <ul className="space-y-3">
                    {activity.donts.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-[13px] leading-[1.7] text-[#8FB0C2]">
                        <X size={14} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[#FFC48A]" /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Insurance */}
            <section className="aq-panel flex items-start gap-4 p-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#3ED6E0]/25 bg-[#3ED6E0]/10 text-[#3ED6E0]">
                <Shield size={19} strokeWidth={1.6} />
              </div>
              <div>
                <h2 className="mb-2.5 text-[19px] font-semibold text-[#EAF4F8]">Insurance Coverage</h2>
                <p className="text-[13px] leading-[1.8] text-[#8FB0C2]">{activity.insuranceInfo}</p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div>
            <div className="aq-panel sticky top-32 p-7">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#6E90A4]">Starting from</p>
              <p className="aq-accent-text my-2 font-display text-[38px] font-semibold leading-none">{activity.price}</p>
              <p className="mb-7 text-[12px] text-[#6E90A4]">per person · pay on arrival</p>

              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="aq-btn !w-full"
              >
                Book via WhatsApp
              </a>
              <p className="mt-3.5 text-center text-[11px] text-[#6E90A4]">
                No upfront payment · Instant confirmation
              </p>

              <div className="mt-7 border-t border-white/10 pt-6">
                <p className="aq-label">Includes</p>
                <ul className="space-y-2.5">
                  {activity.includes.map((inc) => (
                    <li key={inc} className="flex items-center gap-2 text-[13px] text-[#8FB0C2]">
                      <CheckCircle size={13} strokeWidth={1.9} className="shrink-0 text-[#3ED6E0]" /> {inc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="aq-label">Not Included</p>
                <ul className="space-y-2.5">
                  {activity.excludes.map((ex) => (
                    <li key={ex} className="flex items-center gap-2 text-[13px] text-[#5C7D91]">
                      <X size={13} strokeWidth={1.9} className="shrink-0" /> {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related activities */}
      <section className="section-gap border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="aq-display mb-8 text-display-md text-[#EAF4F8]">Other Activities You May Like</h2>
          <div className="flex gap-4 overflow-x-auto pb-3">
            {watersportActivities
              .filter((a) => a.slug !== slug)
              .slice(0, 4)
              .map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/activity/${rel.slug}`}
                  className="aq-panel aq-panel-hover w-56 shrink-0 overflow-hidden !rounded-[24px] p-2.5"
                >
                  <div className="h-32 overflow-hidden rounded-[16px]">
                    <img src={rel.image} alt={rel.title} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-3.5">
                    <p className="text-[14px] font-semibold text-[#EAF4F8]">{rel.title}</p>
                    <p className="aq-accent-text mt-1 font-display text-[16px] font-semibold">{rel.price}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
