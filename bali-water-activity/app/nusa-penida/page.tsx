import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { nusaPenidaPackages } from "@/lib/activities";
import { CheckCircle, X, Clock, MapPin, Waves, Camera } from "lucide-react";
import Image from "next/image";
import BookNowButton from "@/components/BookNowButton";

export const metadata: Metadata = {
  title: "Nusa Penida Tour – Kelingking Beach, Angel's Billabong & Manta Ray",
  description:
    "Explore Nusa Penida with guided day tours: Kelingking Beach, Angel's Billabong, Broken Beach, Crystal Bay, and Manta Ray snorkeling. Book via WhatsApp!",
};

const WA_NUMBER = "628XXXXXXXXXX";

const highlights = [
  { icon: MapPin, label: "Kelingking Beach", desc: "Iconic T-Rex cliff" },
  { icon: Waves, label: "Crystal Bay", desc: "Pristine snorkeling" },
  { icon: Camera, label: "Angel's Billabong", desc: "Natural infinity pool" },
  { icon: Waves, label: "Manta Ray Point", desc: "Swim with mantas" },
];

const spots = ["Kelingking Beach", "Angel's Billabong", "Broken Beach", "Crystal Bay", "Manta Ray Point", "Diamond Beach"];

export default function NusaPenidaPage() {
  return (
    <>
      {/* Hero — full viewport cinematic */}
      <section className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1920&q=85"
          alt="Nusa Penida"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-14 w-full">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5A623] mb-3">
            <span className="w-5 h-px bg-[#F5A623]" /> Bali&apos;s Hidden Island
          </span>
          <h1 className="font-display text-display-lg text-white mb-3">Nusa Penida Tours</h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed mb-6">
            Discover Bali&apos;s most dramatic island — iconic cliffs, turquoise waters, Manta Rays, and untouched beaches.
          </p>
          {/* Spot pills */}
          <div className="flex flex-wrap gap-2">
            {spots.map((s) => (
              <span key={s} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full">
                <MapPin size={10} className="text-[#F5A623]" /> {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E2E8F0]">
            {highlights.map((h) => (
              <div key={h.label} className="flex items-center gap-3 py-5 px-6 first:pl-0 last:pr-0">
                <div className="w-10 h-10 rounded-xl gradient-card flex items-center justify-center shrink-0">
                  <h.icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#0C1A4A]">{h.label}</p>
                  <p className="text-xs text-[#94A3B8]">{h.desc}</p>
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
            title="Explore Nusa Penida"
            subtitle="Three curated day tours covering the best of Nusa Penida — from dramatic sea cliffs to Manta Rays."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {nusaPenidaPackages.map((pkg, i) => (
              <div key={pkg.slug} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E2E8F0] flex flex-col hover:shadow-xl hover:shadow-blue-50/60 transition-all duration-300">
                <div className="relative h-52 overflow-hidden">
                  <Image src={pkg.image} alt={pkg.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 to-transparent" />
                  {i === 0 && (
                    <span className="absolute top-4 left-4 gradient-sunset text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">Most Popular</span>
                  )}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                    <Clock size={10} /> {pkg.duration}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="font-display text-lg text-[#0C1A4A] mb-1">{pkg.title}</h2>
                  <p className="text-[#64748B] text-sm mb-4 flex-1 leading-relaxed">{pkg.description}</p>

                  {/* Destinations */}
                  <div className="mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#94A3B8] mb-2">Destinations</p>
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.destinations.map((d) => (
                        <span key={d} className="flex items-center gap-1 text-xs bg-blue-50 text-[#1A2FB0] px-2.5 py-1 rounded-full">
                          <MapPin size={9} /> {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Includes / Excludes */}
                  <div className="grid grid-cols-2 gap-3 mb-5 text-xs border-t border-[#F1F5F9] pt-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#94A3B8] mb-2">Includes</p>
                      <ul className="space-y-1.5 text-[#64748B]">
                        {pkg.includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-1.5">
                            <CheckCircle size={11} className="text-green-500 mt-0.5 shrink-0" /> {inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#94A3B8] mb-2">Excludes</p>
                      <ul className="space-y-1.5 text-[#64748B]">
                        {pkg.excludes.map((ex) => (
                          <li key={ex} className="flex items-start gap-1.5">
                            <X size={11} className="text-red-400 mt-0.5 shrink-0" /> {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] mt-auto">
                    <div>
                      <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Per person</p>
                      <p className="font-display text-xl text-[#0C1A4A]">{pkg.price}</p>
                    </div>
                    <BookNowButton
                      activity={{ slug: pkg.slug, title: pkg.title, price: pkg.price, category: "nusa-penida" }}
                      label="Book Now"
                      iconSize={14}
                      className="flex items-center gap-1.5 gradient-sunset text-white font-bold px-5 py-2.5 rounded-full cursor-pointer hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader eyebrow="Gallery" title="Nusa Penida in Photos" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&q=80",
              "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80",
              "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=600&q=80",
              "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
            ].map((src, i) => (
              <div key={i} className={`relative rounded-2xl overflow-hidden ${i === 0 ? "row-span-2 h-full min-h-[260px]" : "h-40 md:h-[126px]"}`}>
                <Image src={src} alt={`Nusa Penida ${i + 1}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
