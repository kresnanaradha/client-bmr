import { WA_NUMBER } from "@/lib/site";
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

const WA_MSG = "Hi! I want to book a watersport package in Bali. Can you give me more information?";

const combos = [
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
];

export default function WatersportPage() {
  return (
    <div className="ocean-page">
      {/* Hero */}
      <section className="aq-page-hero h-[62vh] min-h-[420px]">
        <img
          src="/assets/hero-poster.jpg"
          alt="Bali Watersport"
          className="absolute inset-0 h-full w-full scale-105 object-cover"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-8">
          <span className="aq-eyebrow mb-5">Tanjung Benoa, Bali</span>
          <h1 className="aq-display mb-5 text-display-lg text-white">Watersport Activities</h1>
          <p className="mb-8 max-w-xl text-[16px] leading-[1.8] text-white/65">
            8 thrilling activities for all ages — from first-timers to adrenaline junkies.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {[
              { icon: Clock, text: "Open daily 8:00 – 17:00" },
              { icon: MapPin, text: "Tanjung Benoa, Nusa Dua" },
              { icon: Shield, text: "Insurance included" },
            ].map((item) => (
              <span key={item.text} className="aq-chip">
                <item.icon size={12} className="text-[#FFC48A]" /> {item.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="section-gap">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="8 Activities Available"
            title="Choose Your Adventure"
            subtitle="From gentle banana boat rides to extreme flyboarding — there's something for everyone at Bali Water Activity."
            light
          />
          <WatersportClient initialActivities={watersportActivities} />
        </div>
      </section>

      {/* Combo Packages */}
      <section className="section-gap">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Save More"
            title="Combo Packages"
            subtitle="Book multiple activities and get the best value. Ask us on WhatsApp for custom packages!"
            light
          />

          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
            {combos.map((pkg) => (
              <div
                key={pkg.name}
                className={`aq-panel relative overflow-hidden p-8 ${
                  pkg.highlight ? "border-[#F9913E]/35 bg-white/[0.07] md:-mt-4 md:pb-12" : "aq-panel-hover"
                }`}
              >
                {pkg.highlight && (
                  <div className="pointer-events-none absolute -bottom-28 left-1/2 h-[240px] w-[420px] max-w-[140%] -translate-x-1/2 rounded-full bg-[#F9913E]/16 blur-[80px]" />
                )}

                <div className="relative z-10">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                      pkg.highlight
                        ? "bg-gradient-to-br from-[#FFC48A] to-[#F9913E] text-[#1B0E02]"
                        : "border border-white/12 bg-white/5 text-[#8FB0C2]"
                    }`}
                  >
                    {pkg.tag}
                  </span>

                  <h3 className="aq-display mb-6 mt-5 text-[24px] text-[#EAF4F8]">{pkg.name}</h3>

                  <ul className="mb-8 space-y-2.5 text-[13px] text-[#8FB0C2]">
                    {pkg.activities.map((a) => (
                      <li key={a} className="flex items-center gap-2.5">
                        <CheckCircle size={14} strokeWidth={1.8} className="shrink-0 text-[#3ED6E0]" /> {a}
                      </li>
                    ))}
                  </ul>

                  <div className="mb-7">
                    <p className="aq-accent-text font-display text-[30px] font-semibold leading-none">{pkg.price}</p>
                    <p className="mt-1.5 text-[13px] text-[#5C7D91] line-through">{pkg.original}</p>
                  </div>

                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi! I want to book the ${pkg.name} combo package.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={pkg.highlight ? "aq-btn !w-full !py-3.5" : "aq-btn-ghost !w-full !py-3.5"}
                  >
                    Book This Package
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="aq-panel relative overflow-hidden px-8 py-20 text-center md:px-16">
            <div className="pointer-events-none absolute -bottom-24 left-1/2 h-[300px] w-[600px] max-w-[130%] -translate-x-1/2 rounded-full bg-[#F9913E]/16 blur-[90px]" />
            <div className="relative z-10">
              <span className="aq-eyebrow mb-7">Need Help Choosing?</span>
              <h2 className="aq-display mb-6 text-display-md text-[#EAF4F8]">
                We&apos;ll Find the Perfect Activity for You
              </h2>
              <p className="mx-auto mb-10 max-w-lg text-[15px] leading-[1.8] text-[#8FB0C2]">
                Our team is ready to help you pick the perfect activity. Chat with us on WhatsApp!
              </p>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="aq-btn"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
