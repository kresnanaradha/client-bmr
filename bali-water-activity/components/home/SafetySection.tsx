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
    <section className="section-gap bg-linear-to-b from-[#F8FAFC] to-[#eef6ff] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Safety Commitment"
          title="Your Safety is Our Priority"
          subtitle="We never compromise on safety. Every activity is conducted with the highest standards of care and professionalism."
        />

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Safety standards */}
          <div className="lg:col-span-3 glass-card p-6 border border-white/50 shadow-lg hover:shadow-xl hover:border-blue-300/30 transition-all duration-300 relative overflow-hidden bg-white/60 backdrop-blur-md rounded-3xl">
            <div className="flex items-center gap-3 mb-5 lg:flex-col">
              <div className="w-10 h-10 gradient-card rounded-xl flex items-center justify-center">
                <Shield size={18} className="text-white" />
              </div>
              <h3 className="font-bold text-lg text-[#0F1419] lg:text-center">Our Safety Standards</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {safetyPoints.map((p) => (
                <div key={p} className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-primary-blue mt-0.5 shrink-0" />
                  <p className="text-[#64748B] text-sm leading-relaxed">{p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Health restrictions */}
          <div className="lg:col-span-2 glass-card p-6 border border-amber-200/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-amber-50/45 backdrop-blur-md rounded-3xl">
            <div className="flex items-center gap-3 mb-5 lg:flex-col">
              <div className="w-10 h-10 bg-amber-200 rounded-xl flex items-center justify-center">
                <AlertTriangle size={18} className="text-amber-700" />
              </div>
              <h3 className="font-bold text-lg text-[#0F1419] lg:text-center">Health Advisory</h3>
            </div>
            <p className="text-[#64748B] text-sm mb-4 leading-relaxed">
              For your safety, participants with the following conditions should consult a doctor before participating:
            </p>
            <div className="space-y-2.5">
              {healthRestrictions.map((r) => (
                <div key={r} className="flex items-start gap-2">
                  <Heart size={14} className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-[#64748B] text-sm">{r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance banner */}
          <div className="glass-card p-6 border border-amber-200/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-amber-50/45 backdrop-blur-md rounded-3xl">
            <div className="flex items-center gap-3 mb-5 lg:flex-col">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Hospital size={18} className="text-red-600" />
              </div>
              <h3 className="font-bold text-lg text-[#0F1419] lg:text-center">Activity Insurance Included</h3>
            </div>
            <p className="text-[#64748B] text-sm mb-4 leading-relaxed">
              All participants are covered for the duration of their activity. No extra cost.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
