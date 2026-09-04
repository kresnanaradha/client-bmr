import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { watersportActivities } from "@/lib/activities";
import {
  Clock, Users, Shield, CheckCircle, X, AlertTriangle,
  Heart, ThumbsUp, ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BookNowButton from "@/components/BookNowButton";
import ViewItemTracker from "@/components/ViewItemTracker";

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

  const bookingActivity = {
    slug: activity.slug,
    title: activity.title,
    price: activity.price,
    category: activity.category,
  };

  return (
    <>
      <ViewItemTracker activity={bookingActivity} />
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden">
        <Image
          src={activity.image}
          alt={activity.title}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B5E]/85 to-[#2196C4]/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
          <Link href="/watersport" className="inline-flex items-center gap-1 text-blue-200 text-sm mb-3 hover:text-white cursor-pointer">
            <ArrowLeft size={14} /> Back to Watersport
          </Link>
          {activity.badge && (
            <span className="block gradient-sunset text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-2">
              {activity.badge}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-white">{activity.title}</h1>
          <p className="text-blue-200 mt-1">Watersport · Tanjung Benoa, Bali</p>
        </div>
      </section>

      {/* Quick info bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-5 items-center justify-between">
          <div className="flex flex-wrap gap-5 text-sm text-[#475569]">
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#1A2FB0]" /> {activity.duration}</span>
            <span className="flex items-center gap-1.5"><Users size={14} className="text-[#1A2FB0]" /> Age {activity.ageRange}</span>
            <span className="flex items-center gap-1.5"><Shield size={14} className="text-[#1A2FB0]" /> Insured</span>
            <span className="font-bold text-[#1A2FB0]">{activity.price}</span>
          </div>
          <BookNowButton
            activity={bookingActivity}
            label="Book via WhatsApp"
            iconSize={14}
            className="flex items-center gap-2 gradient-sunset text-white font-semibold px-6 py-2.5 rounded-full text-sm cursor-pointer hover:shadow-lg transition-all duration-200"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Overview */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-lg text-[#0C1A4A] mb-3">Overview</h2>
              <p className="text-[#475569] leading-relaxed">{activity.longDescription}</p>
            </section>

            {/* Operating Hours */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-lg text-[#0C1A4A] mb-4">Operating Hours</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-[#F0F9FF] rounded-xl p-4 text-center">
                  <p className="text-xs text-[#475569] uppercase tracking-widest mb-1">Opens</p>
                  <p className="text-xl font-bold text-[#1A2FB0]">{activity.openHour}</p>
                </div>
                <div className="bg-[#F0F9FF] rounded-xl p-4 text-center">
                  <p className="text-xs text-[#475569] uppercase tracking-widest mb-1">Closes</p>
                  <p className="text-xl font-bold text-[#1A2FB0]">{activity.closeHour}</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center col-span-2 sm:col-span-1">
                  <p className="text-xs text-amber-600 uppercase tracking-widest mb-1">Check-in</p>
                  <p className="text-sm font-medium text-amber-700">{activity.checkInNote}</p>
                </div>
              </div>
            </section>

            {/* Health Requirements */}
            <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={18} className="text-amber-600" />
                <h2 className="font-bold text-lg text-[#0C1A4A]">Health Requirements</h2>
              </div>
              <p className="text-[#475569] text-sm mb-3">For safety, participants with the following conditions are advised NOT to join this activity:</p>
              <ul className="space-y-2">
                {activity.healthRestrictions.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-[#475569]">
                    <Heart size={14} className="text-amber-500 mt-0.5 shrink-0" /> {r}
                  </li>
                ))}
              </ul>
            </section>

            {/* Do's and Don'ts */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-lg text-[#0C1A4A] mb-4">Do&apos;s and Don&apos;ts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="flex items-center gap-2 font-semibold text-green-600 text-sm mb-3">
                    <ThumbsUp size={15} /> Do
                  </p>
                  <ul className="space-y-2">
                    {activity.dos.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-[#475569]">
                        <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="flex items-center gap-2 font-semibold text-red-500 text-sm mb-3">
                    <X size={15} /> Don&apos;t
                  </p>
                  <ul className="space-y-2">
                    {activity.donts.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-[#475569]">
                        <X size={14} className="text-red-400 mt-0.5 shrink-0" /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Insurance */}
            <section className="gradient-card rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Shield size={24} className="text-white shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-bold text-lg text-white mb-2">Insurance Coverage</h2>
                  <p className="text-blue-200 text-sm leading-relaxed">{activity.insuranceInfo}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Booking card */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 sticky top-32">
              <p className="text-xs text-[#475569] uppercase tracking-widest mb-1">Starting from</p>
              <p className="text-3xl font-bold text-[#1A2FB0] mb-4">{activity.price}</p>
              <p className="text-sm text-[#475569] mb-5">per person · pay on arrival</p>

              <BookNowButton
                activity={bookingActivity}
                label="Book via WhatsApp"
                className="flex w-full items-center justify-center gap-2 gradient-sunset text-white font-semibold py-3.5 rounded-full text-center cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-200 mb-3"
              />
              <p className="text-xs text-[#475569] text-center">No upfront payment · we confirm on WhatsApp</p>

              {/* Includes */}
              <div className="mt-5 pt-5 border-t border-gray-100">
                <p className="font-semibold text-sm text-[#0C1A4A] mb-3">Includes</p>
                <ul className="space-y-2">
                  {activity.includes.map((inc) => (
                    <li key={inc} className="flex items-center gap-2 text-sm text-[#475569]">
                      <CheckCircle size={13} className="text-green-500 shrink-0" /> {inc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excludes */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="font-semibold text-sm text-[#0C1A4A] mb-3">Not Included</p>
                <ul className="space-y-2">
                  {activity.excludes.map((ex) => (
                    <li key={ex} className="flex items-center gap-2 text-sm text-[#475569]">
                      <X size={13} className="text-red-400 shrink-0" /> {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related activities */}
      <section className="py-12 bg-[#F0F9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-xl text-[#0C1A4A] mb-6">Other Activities You May Like</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {watersportActivities
              .filter((a) => a.slug !== slug)
              .slice(0, 4)
              .map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/activity/${rel.slug}`}
                  className="shrink-0 w-52 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover cursor-pointer"
                >
                  <div className="relative h-32 overflow-hidden">
                    <Image src={rel.image} alt={rel.title} fill sizes="208px" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-sm text-[#0C1A4A]">{rel.title}</p>
                    <p className="text-[#1A2FB0] font-bold text-sm mt-0.5">{rel.price}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
