import { Clock, Sun, Backpack, Ban, CalendarX, Users } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import {
  AGE_LIMITS,
  BUSINESS,
  MEDICAL_RESTRICTIONS,
  WHAT_NOT_TO_BRING,
  WHAT_TO_BRING,
} from "@/lib/config";

export default function OperationalInfo() {
  return (
    <section className="section-gap bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Before you come"
          title="Opening Hours & What to Prepare"
          subtitle="Everything you need to know before your session at Tanjung Benoa."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A2FB0]/10">
                <Clock size={17} className="text-[#1A2FB0]" />
              </span>
              <h3 className="font-bold text-[#0C1A4A]">Operating Hours</h3>
            </div>
            <p className="text-3xl font-bold leading-none text-[#0C1A4A]">
              {BUSINESS.openHour} – {BUSINESS.closeHour}
            </p>
            <p className="mt-1.5 text-sm text-[#64748B]">Open daily · {BUSINESS.timezone}</p>

            <div className="mt-5 flex items-start gap-2 rounded-xl bg-amber-50 p-3">
              <CalendarX size={15} className="mt-0.5 shrink-0 text-amber-600" />
              <p className="text-xs leading-relaxed text-amber-900">
                Closed on {BUSINESS.closedDays.join(" and ")}.
              </p>
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-xl bg-teal-50 p-3">
              <Sun size={15} className="mt-0.5 shrink-0 text-teal-600" />
              <p className="text-xs leading-relaxed text-teal-900">
                <span className="font-semibold">Best time: {BUSINESS.recommendedWindow}.</span>{" "}
                {BUSINESS.recommendedReason}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/10">
                <Backpack size={17} className="text-green-600" />
              </span>
              <h3 className="font-bold text-[#0C1A4A]">What to Bring</h3>
            </div>
            <ul className="space-y-2.5">
              {WHAT_TO_BRING.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-[#475569]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/10">
                <Ban size={17} className="text-red-600" />
              </span>
              <h3 className="font-bold text-[#0C1A4A]">Please Leave Behind</h3>
            </div>
            <ul className="space-y-2.5">
              {WHAT_NOT_TO_BRING.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-[#475569]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A2FB0]/10">
                <Users size={17} className="text-[#1A2FB0]" />
              </span>
              <h3 className="font-bold text-[#0C1A4A]">Age Requirements</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold leading-none text-[#0C1A4A]">
                  {AGE_LIMITS.watersport.min}–{AGE_LIMITS.watersport.max}
                </p>
                <p className="mt-1 text-xs text-[#64748B]">years · all watersports</p>
              </div>
              <div>
                <p className="text-2xl font-bold leading-none text-[#0C1A4A]">
                  {AGE_LIMITS.seaWalker.min}–{AGE_LIMITS.seaWalker.max}
                </p>
                <p className="mt-1 text-xs text-[#64748B]">years · Sea Walker</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-red-200 bg-red-50/50 p-6">
            <h3 className="mb-2 font-bold text-[#0C1A4A]">Medical Restrictions</h3>
            <p className="mb-3 text-sm leading-relaxed text-[#475569]">
              For your safety, participants must be in good health. Activities are not permitted for guests with:
            </p>
            <div className="flex flex-wrap gap-2">
              {MEDICAL_RESTRICTIONS.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-medium text-red-700"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#64748B]">
              All participants are covered by the operator&apos;s official accident insurance for the duration of
              the activity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
