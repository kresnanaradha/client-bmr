import SectionHeader from "@/components/SectionHeader";
import { Shield, CheckCircle, AlertTriangle, Heart, Hospital } from "lucide-react";

const safetyPoints = [
  "All activities comply with Indonesian Ministry of Tourism safety regulations",
  "Certified and experienced instructors for every activity",
  "Regular equipment inspection and maintenance",
  "Activity insurance included for all participants",
  "Comprehensive pre-activity safety briefing",
  "Emergency response protocols in place at all locations",
];

const healthRestrictions = [
  "Heart disease or cardiovascular conditions",
  "Hypertension (high blood pressure)",
  "Pregnancy",
  "Serious congenital illnesses",
  "Recent surgeries or injuries",
];

export default function SafetySection() {
  return (
    <section className="section-gap relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Safety Commitment"
          title="Your Safety is Our Priority"
          subtitle="We never compromise on safety. Every activity is conducted with the highest standards of care and professionalism."
          light
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Safety standards */}
          <div className="aq-panel p-8 lg:col-span-7">
            <div className="mb-7 flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#3ED6E0]/25 bg-[#3ED6E0]/10 text-[#3ED6E0]">
                <Shield size={19} strokeWidth={1.6} />
              </div>
              <h3 className="text-[19px] font-semibold text-[#EAF4F8]">Our Safety Standards</h3>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {safetyPoints.map((p) => (
                <div key={p} className="flex items-start gap-2.5">
                  <CheckCircle size={15} strokeWidth={1.8} className="mt-1 shrink-0 text-[#3ED6E0]" />
                  <p className="text-[13px] leading-[1.7] text-[#8FB0C2]">{p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Health restrictions */}
          <div className="aq-panel p-8 lg:col-span-5">
            <div className="mb-7 flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#F9913E]/30 bg-[#F9913E]/12 text-[#FFC48A]">
                <AlertTriangle size={19} strokeWidth={1.6} />
              </div>
              <h3 className="text-[19px] font-semibold text-[#EAF4F8]">Health Advisory</h3>
            </div>
            <p className="mb-5 text-[13px] leading-[1.7] text-[#8FB0C2]">
              For your safety, participants with the following conditions should consult a doctor before participating:
            </p>
            <div className="space-y-3">
              {healthRestrictions.map((r) => (
                <div key={r} className="flex items-start gap-2.5">
                  <Heart size={14} strokeWidth={1.8} className="mt-1 shrink-0 text-[#FFC48A]" />
                  <p className="text-[13px] text-[#8FB0C2]">{r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance — full-width strip so the row never leaves a ragged gap */}
          <div className="aq-panel flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center lg:col-span-12">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#3ED6E0]/25 bg-[#3ED6E0]/10 text-[#3ED6E0]">
              <Hospital size={19} strokeWidth={1.6} />
            </div>
            <h3 className="text-[19px] font-semibold text-[#EAF4F8] sm:shrink-0">Activity Insurance Included</h3>
            <p className="text-[13px] leading-[1.7] text-[#8FB0C2]">
              All participants are covered for the duration of their activity. No extra cost.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
