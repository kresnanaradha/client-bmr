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
    <section className="section-gap relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Testimonials"
          title="What Our Adventurers Say"
          subtitle="Real reviews from real travelers who trusted Bali Water Activity for their Bali experience."
          light
        />

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={(i % 3) * 0.08}
              className="aq-panel aq-panel-hover relative flex h-full flex-col p-7"
            >
              {/* Oversized quote mark instead of a border-heavy header */}
              <span className="pointer-events-none absolute right-6 top-2 font-display text-[76px] leading-none text-white/[0.05]">
                &rdquo;
              </span>

              <div className="relative mb-5 flex items-center gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} className="fill-[#F9913E] text-[#F9913E]" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-[#6E90A4]">{t.activity}</span>
              </div>

              <p className="relative mb-8 flex-1 text-[14px] leading-[1.8] text-[#B7CEDB]">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="relative flex items-center gap-3 border-t border-white/10 pt-5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-white/15"
                  loading="lazy"
                />
                <div>
                  <p className="text-[13px] font-semibold text-[#EAF4F8]">{t.name}</p>
                  <p className="text-[11px] text-[#6E90A4]">{t.flag} · {t.country}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Overall score bar */}
        <div className="aq-panel flex flex-col items-center justify-between gap-10 p-8 sm:flex-row md:p-10">
          <div className="text-center sm:text-left">
            <p className="aq-accent-text font-display text-[64px] font-semibold leading-none">4.9</p>
            <div className="mt-3 flex justify-center gap-0.5 sm:justify-start">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} className="fill-[#F9913E] text-[#F9913E]" />
              ))}
            </div>
            <p className="mt-3 text-[11px] text-[#6E90A4]">Based on 3,500+ reviews</p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-6 sm:flex sm:gap-12">
            {[
              { label: "Safety", pct: 99 },
              { label: "Value", pct: 97 },
              { label: "Service", pct: 98 },
              { label: "Fun", pct: 100 },
            ].map((r) => (
              <div key={r.label} className="text-center">
                <p className="font-display text-[28px] font-light text-[#EAF4F8]">{r.pct}%</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#6E90A4]">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
