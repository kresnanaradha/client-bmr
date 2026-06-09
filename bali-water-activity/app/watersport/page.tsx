import type { Metadata } from "next";
import WatersportClient from "@/components/activities/WatersportClient";
import SectionHeader from "@/components/SectionHeader";
import { watersportActivities } from "@/lib/activities";
import { Shield, Clock, MapPin, CheckCircle, MessageCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Watersport Bali – Banana Boat, Jet Ski, Parasailing & More",
  description:
    "Book the best watersport activities in Bali: Banana Boat, Jet Ski, Parasailing, Fly Board, Sea Walker & more at Tanjung Benoa. Safe, fun, pay on arrival.",
};

const WA_NUMBER = "628XXXXXXXXXX";
const WA_MSG = "Hi! I want to book a watersport package in Bali. Can you give me more information?";

export default function WatersportPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[420px] flex items-end overflow-hidden">
        <img
          src="/assets/watersport-hero.jpg"
          alt="Bali Watersport"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-[#0F1419]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1419]/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-14 w-full">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FFD700] mb-3">
            <span className="w-5 h-px bg-[#FFD700]" /> Tanjung Benoa, Bali
          </span>
          <h1 className="font-display text-display-lg text-white mb-3">Watersport Activities</h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed mb-6">
            8 thrilling activities for all ages — from first-timers to adrenaline junkies.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: Clock, text: "Open daily 8:00 – 17:00" },
              { icon: MapPin, text: "Tanjung Benoa, Nusa Dua" },
              { icon: Shield, text: "Insurance included" },
            ].map((item) => (
              <span key={item.text} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full">
                <item.icon size={11} className="text-[#FFD700]" /> {item.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="section-gap" style={{ background: "var(--smoke)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="8 Activities Available"
            title="Choose Your Adventure"
            subtitle="From gentle banana boat rides to extreme flyboarding — there's something for everyone at Bali Water Activity."
          />
          <WatersportClient initialActivities={watersportActivities} />
        </div>
      </section>

      {/* Combo Packages */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Save More"
            title="Combo Packages"
            subtitle="Book multiple activities and get the best value. Ask us on WhatsApp for custom packages!"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Fun Starter Pack",
                activities: ["Banana Boat", "Donut Boat"],
                price: "IDR 90,000",
                original: "IDR 100,000",
                tag: "Save 10%",
                highlight: false,
              },
              {
                name: "Thrill Seeker Pack",
                activities: ["Jet Ski", "Parasailing", "Fly Fish"],
                price: "IDR 350,000",
                original: "IDR 400,000",
                tag: "Save 12.5%",
                highlight: true,
              },
              {
                name: "Ultimate Pack",
                activities: ["Banana Boat", "Jet Ski", "Parasailing", "Fly Board"],
                price: "IDR 600,000",
                original: "IDR 700,000",
                tag: "Save 14%",
                highlight: false,
              },
            ].map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-3xl p-7 border transition-all duration-300 ${
                  pkg.highlight
                    ? "gradient-dark text-white border-transparent shadow-2xl shadow-blue-900/30 scale-105"
                    : "bg-white border-[#E2E8F0] hover:border-[#1A2FB0]/30 hover:shadow-lg"
                }`}
              >
                <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full ${
                  pkg.highlight ? "bg-[#F5A623] text-white" : "bg-blue-50 text-[#1A2FB0]"
                }`}>{pkg.tag}</span>

                <h3 className={`font-display text-xl mt-4 mb-3 ${pkg.highlight ? "text-white" : "text-[#0C1A4A]"}`}>{pkg.name}</h3>

                <ul className={`text-sm space-y-2 mb-6 ${pkg.highlight ? "text-white/70" : "text-[#64748B]"}`}>
                  {pkg.activities.map((a) => (
                    <li key={a} className="flex items-center gap-2">
                      <CheckCircle size={14} className={pkg.highlight ? "text-[#F5A623]" : "text-green-500"} /> {a}
                    </li>
                  ))}
                </ul>

                <div className="mb-5">
                  <p className={`font-display text-2xl ${pkg.highlight ? "text-white" : "text-[#0C1A4A]"}`}>{pkg.price}</p>
                  <p className={`text-sm line-through mt-0.5 ${pkg.highlight ? "text-white/40" : "text-[#94A3B8]"}`}>{pkg.original}</p>
                </div>

                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi! I want to book the ${pkg.name} combo package.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-full font-bold text-sm cursor-pointer transition-all duration-200 ${
                    pkg.highlight
                      ? "bg-[#F5A623] hover:bg-[#E8701A] text-white shadow-lg shadow-orange-500/25"
                      : "gradient-sunset text-white hover:shadow-md"
                  }`}
                >
                  Book This Package
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA dark */}
      <section className="section-gap relative overflow-hidden" style={{ background: "var(--navy)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #1A2FB0 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5A623] mb-4">
            <span className="w-5 h-px bg-[#F5A623]" /> Need Help Choosing? <span className="w-5 h-px bg-[#F5A623]" />
          </span>
          <h2 className="font-display text-display-md text-white mb-4">We&apos;ll Find the Perfect Activity for You</h2>
          <p className="text-white/50 mb-8 leading-relaxed">Our team is ready to help you pick the perfect activity. Chat with us on WhatsApp!</p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 gradient-sunset text-white font-bold px-8 py-4 rounded-full hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
