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
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#1239C8]/25 bg-[#1239C8]/10 text-[#1239C8]">
                <Shield size={19} strokeWidth={1.6} />
              </div>
              <h3 className="text-[19px] font-semibold text-[#10245E]">Our Safety Standards</h3>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {safetyPoints.map((p) => (
                <div key={p} className="flex items-start gap-2.5">
                  <CheckCircle size={15} strokeWidth={1.8} className="mt-1 shrink-0 text-[#1239C8]" />
                  <p className="text-[13px] leading-[1.7] text-[#34436C]">{p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Health restrictions */}
          <div className="aq-panel p-8 lg:col-span-5">
            <div className="mb-7 flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#FF9B28]/30 bg-[#FF9B28]/12 text-[#FF9B28]">
                <AlertTriangle size={19} strokeWidth={1.6} />
              </div>
              <h3 className="text-[19px] font-semibold text-[#10245E]">Health Advisory</h3>
            </div>
            <p className="mb-5 text-[13px] leading-[1.7] text-[#34436C]">
              For your safety, participants with the following conditions should consult a doctor before participating:
            </p>
            <div className="space-y-3">
              {healthRestrictions.map((r) => (
                <div key={r} className="flex items-start gap-2.5">
                  <Heart size={14} strokeWidth={1.8} className="mt-1 shrink-0 text-[#FF9B28]" />
                  <p className="text-[13px] text-[#34436C]">{r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance — full-width strip so the row never leaves a ragged gap */}
          <div className="aq-panel flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center lg:col-span-12">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#1239C8]/25 bg-[#1239C8]/10 text-[#1239C8]">
              <Hospital size={19} strokeWidth={1.6} />
            </div>
            <h3 className="text-[19px] font-semibold text-[#10245E] sm:shrink-0">Activity Insurance Included</h3>
            <p className="text-[13px] leading-[1.7] text-[#34436C]">
              All participants are covered for the duration of their activity. No extra cost.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
