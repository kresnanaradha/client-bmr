import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { labuanBajoPackages } from "@/lib/activities";
import { CheckCircle, X, Clock, Star, Fish, Sailboat, Mountain, Waves } from "lucide-react";

export const metadata: Metadata = {
  title: "Labuan Bajo Tour – Komodo Dragons, Pink Beach & Island Hopping",
  description:
    "Book Labuan Bajo tours from Bali: Komodo National Park, Komodo Dragons, Pink Beach, Padar Island & snorkeling. 2D1N and 3D2N packages available.",
};

const WA_NUMBER = "628XXXXXXXXXX";

const features = [
  { icon: Mountain, label: "Komodo Dragons", desc: "World's largest lizard" },
  { icon: Waves, label: "Pink Beach", desc: "Rare pink-sand paradise" },
  { icon: Sailboat, label: "Island Hopping", desc: "17,000+ islands nearby" },
  { icon: Fish, label: "Snorkeling", desc: "World-class marine life" },
];

export default function LabuanBajoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=85"
          alt="Labuan Bajo"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-14 w-full">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5A623] mb-3">
            <span className="w-5 h-px bg-[#F5A623]" /> Komodo National Park
          </span>
          <h1 className="font-display text-display-lg text-white mb-3">Labuan Bajo Tours</h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">
            Encounter legendary Komodo Dragons, discover Pink Beach, and sail through the world&apos;s most stunning archipelago.
          </p>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E2E8F0]">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-3 py-5 px-6 first:pl-0 last:pr-0">
                <div className="w-10 h-10 rounded-xl gradient-card flex items-center justify-center shrink-0">
                  <f.icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#0C1A4A]">{f.label}</p>
                  <p className="text-xs text-[#94A3B8]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-gap" style={{ background: "var(--smoke)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Tour Packages"
            title="Choose Your Labuan Bajo Experience"
            subtitle="From a quick 2-day escape to a deep 3-day exploration — we have the perfect package for every traveler."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {labuanBajoPackages.map((pkg, i) => (
              <div key={pkg.slug} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-xl hover:shadow-blue-50/60 transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 to-transparent" />
                  {i === 1 && (
                    <span className="absolute top-4 left-4 bg-[#F5A623] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                      <Star size={10} fill="white" /> Best Value
                    </span>
                  )}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                    <Clock size={10} /> {pkg.duration}
                  </div>
                </div>

                <div className="p-7">
                  <h2 className="font-display text-xl text-[#0C1A4A] mb-2">{pkg.title}</h2>
                  <p className="text-[#64748B] text-sm mb-5 leading-relaxed">{pkg.description}</p>

                  {/* Highlights */}
                  <div className="mb-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#94A3B8] mb-2.5">Highlights</p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.highlights.map((h) => (
                        <span key={h} className="text-xs bg-blue-50 text-[#1A2FB0] px-3 py-1 rounded-full font-medium">{h}</span>
                      ))}
                    </div>
                  </div>

                  {/* Includes / Excludes */}
                  <div className="grid grid-cols-2 gap-4 mb-6 pt-5 border-t border-[#F1F5F9] text-xs">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#94A3B8] mb-2.5">Includes</p>
                      <ul className="space-y-2 text-[#64748B]">
                        {pkg.includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-1.5">
                            <CheckCircle size={12} className="text-green-500 mt-0.5 shrink-0" /> {inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#94A3B8] mb-2.5">Excludes</p>
                      <ul className="space-y-2 text-[#64748B]">
                        {pkg.excludes.map((ex) => (
                          <li key={ex} className="flex items-start gap-1.5">
                            <X size={12} className="text-red-400 mt-0.5 shrink-0" /> {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-[#F1F5F9]">
                    <div>
                      <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Starting from</p>
                      <p className="font-display text-2xl text-[#0C1A4A]">{pkg.price}</p>
                      <p className="text-xs text-[#94A3B8]">per person</p>
                    </div>
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in the ${pkg.title}. Can you share availability and pricing?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 gradient-sunset text-white font-bold px-6 py-3 rounded-full cursor-pointer hover:shadow-xl hover:shadow-orange-500/25 hover:scale-105 transition-all duration-200 text-sm"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — bento grid */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader eyebrow="Gallery" title="Labuan Bajo in Photos" />
          <div className="grid grid-cols-3 gap-3 h-[400px]">
            <div className="col-span-2 rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80" alt="Labuan Bajo 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex-1 rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=600&q=80" alt="Labuan Bajo 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="flex-1 rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80" alt="Labuan Bajo 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
