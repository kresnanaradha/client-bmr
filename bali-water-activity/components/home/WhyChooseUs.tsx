import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { Shield, MessageCircle, CreditCard, Star, Clock, Award } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Safety First",
    desc: "All activities comply with international safety standards. Certified instructors and full insurance coverage included.",
  },
  {
    icon: MessageCircle,
    title: "Instant WhatsApp Booking",
    desc: "No complicated forms. Just message us on WhatsApp and your booking is confirmed within minutes.",
  },
  {
    icon: CreditCard,
    title: "Pay on Arrival",
    desc: "No upfront payment required. Pay cash on the day of your activity — zero financial risk for you.",
  },
  {
    icon: Star,
    title: "Top-Rated Experience",
    desc: "Consistently rated 4.9/5 by international tourists from Australia, Europe, Singapore, and beyond.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    desc: "Activities available daily from 8AM to 5PM. Easy rescheduling with 24-hour notice.",
  },
  {
    icon: Award,
    title: "Trusted Partner Network",
    desc: "We work only with certified, experienced operators to ensure a premium and safe experience.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-gap relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="The Smart Way to Book Bali Adventures"
          subtitle="We handle everything so you can focus on making memories."
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r, i) => (
            <Reveal
              key={r.title}
              delay={(i % 3) * 0.08}
              className="aq-panel aq-panel-hover group relative flex h-full flex-col overflow-hidden p-7"
            >
              {/* Oversized index number, barely there */}
              <span className="pointer-events-none absolute -top-3 right-4 font-display text-[86px] font-bold leading-none text-white/[0.035] transition-colors duration-500 group-hover:text-[#F9913E]/10">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#3ED6E0]/25 bg-[#3ED6E0]/10 text-[#3ED6E0] transition-colors duration-300 group-hover:border-[#F9913E]/40 group-hover:bg-[#F9913E]/12 group-hover:text-[#FFC48A]">
                <r.icon size={20} strokeWidth={1.6} />
              </div>

              <h3 className="relative mb-2.5 text-[17px] font-semibold text-[#EAF4F8]">{r.title}</h3>
              <p className="relative flex-1 text-[13px] leading-[1.75] text-[#8FB0C2]">{r.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
