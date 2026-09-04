// NOT RENDERED. Every figure below is placeholder data invented during the draft
// build. Re-enable in app/page.tsx only after real numbers are supplied — visitor
// and country splits can come from GA4 once NEXT_PUBLIC_GTM_ID is live.
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    country: "Australia",
    flag: "AU",
    avatar: "https://i.pravatar.cc/80?img=1",
    rating: 5,
    activity: "Parasailing & Jet Ski",
    text: "Absolutely incredible experience! The team was super professional and safety was top priority. The parasailing views of Bali from above were breathtaking. Booking via WhatsApp was so easy — confirmed in 5 minutes!",
  },
  {
    name: "Marcus van der Berg",
    country: "Netherlands",
    flag: "NL",
    avatar: "https://i.pravatar.cc/80?img=3",
    rating: 5,
    activity: "Sea Walker",
    text: "Sea Walker was a life-changing experience! I was nervous at first but the guides made me feel completely safe. Walking among the fish and corals was magical. Definitely the highlight of our Bali trip.",
  },
  {
    name: "Jessica Tan",
    country: "Singapore",
    flag: "SG",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 5,
    activity: "Nusa Penida Tour",
    text: "The Nusa Penida West Tour was everything I dreamed of. Kelingking Beach is truly stunning in person. Our guide was knowledgeable and friendly. Great value for money — will book again on my next visit!",
  },
  {
    name: "David Chen",
    country: "United States",
    flag: "US",
    avatar: "https://i.pravatar.cc/80?img=7",
    rating: 5,
    activity: "Flyboard",
    text: "Tried the Flyboard for the first time and it was EPIC! The instructor was patient and got me flying within 10 minutes. The whole experience was well-organized and the pay-on-arrival policy made it stress-free.",
  },
  {
    name: "Priya Sharma",
    country: "Malaysia",
    flag: "MY",
    avatar: "https://i.pravatar.cc/80?img=9",
    rating: 5,
    activity: "Banana Boat",
    text: "Brought my whole family including kids aged 9 and 12 — everyone loved it! The staff was so caring with the children and made sure everyone felt safe. Great experience for families, highly recommended!",
  },
  {
    name: "Thomas Müller",
    country: "Germany",
    flag: "DE",
    avatar: "https://i.pravatar.cc/80?img=11",
    rating: 5,
    activity: "Labuan Bajo 3D2N Tour",
    text: "The Labuan Bajo tour exceeded all expectations. Seeing the Komodo Dragons up close was awe-inspiring, and Pink Beach was genuinely pink! The entire logistics were handled perfectly. Worth every rupiah!",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-gap bg-gradient-to-b from-[#0F1419] via-[#1A3D8C] to-[#0F1419] relative overflow-hidden text-white">
      {/* Decorative glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Testimonials"
          title="What Our Adventurers Say"
          subtitle="Real reviews from real travelers who trusted Bali Water Activity for their Bali experience."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={(i % 3) * 0.08}
              className="glass-card flex flex-col h-full hover:border-[#FFD700]/30 hover:bg-white/12 p-6"
            >
              {/* Stars + activity */}
              <div className="flex items-center justify-between mb-4 shrink-0">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} className="text-[#FFD700] fill-[#FFD700]" />
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFD700] bg-white/10 px-2.5 py-1 rounded-full border border-white/5">
                  {t.activity}
                </span>
              </div>

              {/* Quote */}
              <p className="text-white/80 text-sm leading-relaxed flex-1 mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10 shrink-0">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#FFD700]/30"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-blue-200">{t.flag} · {t.country}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Overall score bar */}
        <div className="glass border-white/10 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 pointer-events-none" />
          <div className="text-center sm:text-left relative z-10">
            <p className="font-display text-6xl text-[#FFD700] leading-none drop-shadow-[0_0_12px_rgba(255,215,0,0.2)]">4.9</p>
            <div className="flex gap-0.5 mt-2 justify-center sm:justify-start">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="text-[#FFD700] fill-[#FFD700]" />
              ))}
            </div>
            <p className="text-xs text-blue-200 mt-2">Based on 3,500+ reviews</p>
          </div>
          <div className="flex gap-8 md:gap-12 relative z-10">
            {[
              { label: "Safety", pct: 99 },
              { label: "Value", pct: 97 },
              { label: "Service", pct: 98 },
              { label: "Fun", pct: 100 },
            ].map((r) => (
              <div key={r.label} className="text-center">
                <p className="font-display text-2xl text-white">{r.pct}%</p>
                <p className="text-[10px] uppercase tracking-wider text-blue-200 mt-1">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
