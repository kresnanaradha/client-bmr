import Link from "next/link";
import {
  ArrowRight, Shield, Star, Users, MessageCircle,
  Banana, Ship, Zap, Wind, Waves, Anchor, MapPin, Mountain,
} from "lucide-react";
import WhatsAppLink from "@/components/WhatsAppLink";

const WA_MSG = "Hi Bali Water Activity! I want to explore your activities and make a booking.";

const activities = [
  { label: "Banana Boat", href: "/activity/banana-boat", icon: Banana, color: "bg-yellow-50 text-yellow-600 border-yellow-200" },
  { label: "Jet Ski", href: "/activity/jet-ski", icon: Zap, color: "bg-blue-50 text-[#1A2FB0] border-blue-200" },
  { label: "Parasailing", href: "/activity/parasailing", icon: Wind, color: "bg-sky-50 text-sky-600 border-sky-200" },
  { label: "Fly Board", href: "/activity/fly-board", icon: Anchor, color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
  { label: "Sea Walker", href: "/activity/sea-walker", icon: Waves, color: "bg-teal-50 text-teal-600 border-teal-200" },
  { label: "Rafting", href: "/rafting", icon: Ship, color: "bg-green-50 text-green-600 border-green-200" },
  { label: "Nusa Penida", href: "/nusa-penida", icon: MapPin, color: "bg-purple-50 text-purple-600 border-purple-200" },
  { label: "Labuan Bajo", href: "/labuan-bajo", icon: Mountain, color: "bg-orange-50 text-orange-600 border-orange-200" },
];

const stats = [
  { icon: Users, value: "3,500+", label: "Customers" },
  { icon: Star, value: "4.9/5", label: "Rating" },
  { icon: Shield, value: "100%", label: "Insured" },
];

export default function HeroContent() {
  return (
    <div className="max-w-5xl mx-auto text-center relative z-10 px-4">
      {/* Badge */}
      <div className="inline-block mb-6 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700">
          <span className="text-golden animate-pulse">✨</span>
          <span>Trusted by 10,000+ tourists worldwide</span>
        </div>
      </div>

      {/* Headline */}
      <h1 className="mb-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
        Experience Bali&apos;s
        <br />
        <span className="bg-linear-to-r from-golden to-orange bg-clip-text text-transparent">
          Best Water Adventures
        </span>
      </h1>

      {/* Description */}
      <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-700 md:text-lg">
        From heart-pumping Jet Ski rides to serene Sea Walker adventures — book Bali&apos;s best water activities instantly via WhatsApp. Pay on arrival.
      </p>

      {/* Stats */}
      <div className="flex justify-center gap-8 md:gap-12 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <s.icon size={16} className="text-[#0f6d8c]" />
              <span className="text-xl md:text-2xl font-extrabold text-slate-900">{s.value}</span>
            </div>
            <p className="text-xs font-medium text-slate-600">{s.label}</p>
          </div>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 max-w-md mx-auto sm:max-w-none">
        <WhatsAppLink
          message={WA_MSG}
          source="hero"
          className="gradient-sunset text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-orange-500/35 hover:scale-105 transition-all duration-200 cursor-pointer text-base"
        >
          <MessageCircle size={18} />
          Book via WhatsApp
          <ArrowRight size={16} />
        </WhatsAppLink>
        <Link
          href="/watersport"
          className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/85 px-8 py-4 text-base font-semibold text-slate-800 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-slate-300 hover:bg-white"
        >
          View All Activities
        </Link>
      </div>

      {/* Activity grid with Lucide icons */}
      <div>
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-600">
          8 Activities Available
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {activities.map((act) => (
            <Link
              key={act.href}
              href={act.href}
              className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/78 p-4 text-slate-800 shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-slate-300 hover:bg-white/92"
            >
              <act.icon size={22} strokeWidth={1.75} className="text-[#0f6d8c]" />
              <span className="text-[11px] font-bold text-center leading-tight">{act.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Trust note */}
      <p className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-600">
        <span className="flex items-center gap-1.5"><Shield size={13} className="text-green-400" /> No upfront payment</span>
        <span className="flex items-center gap-1.5"><Shield size={13} className="text-green-400" /> Pay on arrival</span>
        <span className="flex items-center gap-1.5"><Shield size={13} className="text-green-400" /> Instant confirmation</span>
        <span className="flex items-center gap-1.5"><Shield size={13} className="text-green-400" /> Insurance included</span>
      </p>
    </div>
  );
}
