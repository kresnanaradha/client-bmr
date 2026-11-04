import { WA_NUMBER } from "@/lib/site";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Star,
  Users,
  MessageCircle,
  Banana,
  Ship,
  Zap,
  Wind,
  Waves,
  Anchor,
  MapPin,
  Mountain,
} from "lucide-react";

const WA_MSG =
  "Hi Bali Water Activity! I want to explore your activities and make a booking.";

const activities = [
  { label: "Banana Boat", href: "/activity/banana-boat", icon: Banana },
  { label: "Jet Ski", href: "/activity/jet-ski", icon: Zap },
  { label: "Parasailing", href: "/activity/parasailing", icon: Wind },
  { label: "Fly Board", href: "/activity/fly-board", icon: Anchor },
  { label: "Sea Walker", href: "/activity/sea-walker", icon: Waves },
  { label: "Rafting", href: "/rafting", icon: Ship },
  { label: "Nusa Penida", href: "/nusa-penida", icon: MapPin },
  { label: "Labuan Bajo", href: "/labuan-bajo", icon: Mountain },
];

const stats = [
  { icon: Users, value: "3,500+", label: "Customers" },
  { icon: Star, value: "4.9/5", label: "Rating" },
  { icon: Shield, value: "100%", label: "Insured" },
];

export default function HeroContent() {
  return (
    <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
      {/* Badge */}
      <span className="aq-chip mb-8 px-4 py-2 text-[10px] tracking-[0.2em] uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF9B28]" />
        Trusted by 10,000+ travellers worldwide
      </span>

      {/* Headline */}
      <h1 className="aq-display mb-7 text-[clamp(2.5rem,7vw,5rem)] text-[#10245E]">
        Every Bali Story
        <br />
        <span className="aq-accent-text font-semibold">
          Starts in the Water
        </span>
      </h1>

      {/* Description */}
      <p className="mx-auto mb-12 max-w-2xl text-[15px] leading-[1.85] text-[#34436C] md:text-[17px]">
        Jet ski, parasailing, sea walker, rafting and island crossings — all in
        one place. One WhatsApp message books it. You pay when you arrive.
      </p>

      {/* Stats */}
      <div className="mb-12 flex justify-center gap-10 md:gap-16">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="mb-1.5 flex items-center justify-center gap-2">
              <s.icon size={15} strokeWidth={1.8} className="text-[#1239C8]" />
              <span className="font-display text-2xl font-semibold text-[#10245E] md:text-[28px]">
                {s.value}
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#58658C]">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="mx-auto mb-16 flex max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row">
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="aq-btn aq-btn-whatsapp"
        >
          <MessageCircle size={18} />
          Book via WhatsApp
          <ArrowRight size={16} />
        </a>
        <Link
          href="/watersport"
          className="aq-btn-ghost backdrop-blur-md"
        >
          View All Activities
        </Link>
      </div>

      {/* Activity grid */}
      <div>
        <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#58658C]">
          8 Activities Available
        </p>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:grid-cols-8">
          {activities.map((act) => (
            <Link
              key={act.href}
              href={act.href}
              className="group flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-[#10245E]/12 bg-white/75 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FF9B28]/40 hover:bg-white"
            >
              <act.icon
                size={21}
                strokeWidth={1.6}
                className="text-[#1239C8] transition-colors duration-300 group-hover:text-[#FF9B28]"
              />
              <span className="text-center text-[11px] font-semibold leading-tight text-[#10245E]">
                {act.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Trust note */}
      <p className="mt-12 flex flex-wrap justify-center gap-x-7 gap-y-2.5 text-[12px] text-[#34436C]">
        {[
          "No upfront payment",
          "Pay on arrival",
          "Instant confirmation",
          "Insurance included",
        ].map((t) => (
          <span key={t} className="flex items-center gap-1.5">
            <Shield size={12} className="text-[#1239C8]" /> {t}
          </span>
        ))}
      </p>
    </div>
  );
}
