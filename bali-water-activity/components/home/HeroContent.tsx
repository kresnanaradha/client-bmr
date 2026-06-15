import Link from "next/link";
import {
  ArrowRight, Shield, Star, Users, MessageCircle,
  Banana, Ship, Zap, Wind, Waves, Anchor, MapPin, Mountain,
} from "lucide-react";

const WA_NUMBER = "628XXXXXXXXXX";
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
      <div className="glass border-white/20 inline-block mb-6 px-4 py-2 rounded-full shadow-lg">
        <div className="flex items-center gap-2 text-white text-xs font-semibold uppercase tracking-wider">
          <span className="text-golden animate-pulse">✨</span>
          <span>Trusted by 10,000+ tourists worldwide</span>
        </div>
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
        Experience Bali&apos;s
        <br />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-golden via-[#FFA500] to-golden animate-pulse">
          Best Water Adventures
        </span>
      </h1>

      {/* Description */}
      <p className="text-blue-100 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
        From heart-pumping Jet Ski rides to serene Sea Walker adventures — book Bali&apos;s best water activities instantly via WhatsApp. Pay on arrival.
      </p>

      {/* Stats */}
      <div className="flex justify-center gap-8 md:gap-12 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <s.icon size={16} className="text-golden drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]" />
              <span className="text-xl md:text-2xl font-extrabold text-white">{s.value}</span>
            </div>
            <p className="text-xs text-blue-200 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 max-w-md mx-auto sm:max-w-none">
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-sunset text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-orange-500/35 hover:scale-105 transition-all duration-200 cursor-pointer text-base"
        >
          <MessageCircle size={18} />
          Book via WhatsApp
          <ArrowRight size={16} />
        </a>
        <Link
          href="/watersport"
          className="glass border-white/20 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/40 hover:scale-105 transition-all duration-200 cursor-pointer text-base"
        >
          View All Activities
        </Link>
      </div>

      {/* Activity grid with Lucide icons */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-5">
          8 Activities Available
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {activities.map((act) => (
            <Link
              key={act.href}
              href={act.href}
              className="glass border-white/10 rounded-2xl p-4 flex flex-col items-center gap-3 hover:border-white/30 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer text-white"
            >
              <act.icon size={22} strokeWidth={1.75} className="text-golden drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]" />
              <span className="text-[11px] font-bold text-center leading-tight">{act.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Trust note */}
      <p className="text-xs text-blue-200/80 mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
        <span className="flex items-center gap-1.5"><Shield size={13} className="text-green-400" /> No upfront payment</span>
        <span className="flex items-center gap-1.5"><Shield size={13} className="text-green-400" /> Pay on arrival</span>
        <span className="flex items-center gap-1.5"><Shield size={13} className="text-green-400" /> Instant confirmation</span>
        <span className="flex items-center gap-1.5"><Shield size={13} className="text-green-400" /> Insurance included</span>
      </p>
    </div>
  );
}
