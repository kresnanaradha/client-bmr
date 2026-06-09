import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { Shield, MessageCircle, CreditCard, Star, Clock, Award } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Safety First",
    desc: "All activities comply with international safety standards. Certified instructors and full insurance coverage included.",
    accent: "from-blue-500 to-[#2196C4]",
  },
  {
    icon: MessageCircle,
    title: "Instant WhatsApp Booking",
    desc: "No complicated forms. Just message us on WhatsApp and your booking is confirmed within minutes.",
    accent: "from-green-500 to-emerald-400",
  },
  {
    icon: CreditCard,
    title: "Pay on Arrival",
    desc: "No upfront payment required. Pay cash on the day of your activity — zero financial risk for you.",
    accent: "from-[#F5A623] to-[#E8701A]",
  },
  {
    icon: Star,
    title: "Top-Rated Experience",
    desc: "Consistently rated 4.9/5 by international tourists from Australia, Europe, Singapore, and beyond.",
    accent: "from-purple-500 to-violet-400",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    desc: "Activities available daily from 8AM to 5PM. Easy rescheduling with 24-hour notice.",
    accent: "from-sky-500 to-cyan-400",
  },
  {
    icon: Award,
    title: "Trusted Partner Network",
    desc: "We work only with certified, experienced operators to ensure a premium and safe experience.",
    accent: "from-rose-500 to-pink-400",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-gap relative overflow-hidden bg-gradient-to-b from-[#0F1419] via-[#1A3D8C] to-[#0F1419]">
      {/* Subtle radial glow behind header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-15 bg-[#0052CC] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="The Smart Way to Book Bali Adventures"
          subtitle="We handle everything so you can focus on making memories."
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <Reveal
              key={r.title}
              delay={(i % 3) * 0.08}
              className="glass-card group relative p-6 border border-white/10 overflow-hidden cursor-pointer flex flex-col h-full hover:border-[#FFD700]/30 hover:bg-white/12 transition-all duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255, 215, 0, 0.05) 0%, transparent 70%)" }} />

              <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${r.accent} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <r.icon size={20} className="text-white" />
              </div>
              <h3 className="text-white font-bold text-base mb-2 relative">{r.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed relative flex-1">{r.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
