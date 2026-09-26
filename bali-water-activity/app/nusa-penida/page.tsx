import { WA_NUMBER } from "@/lib/site";
import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { nusaPenidaPackages } from "@/lib/activities";
import { CheckCircle, X, Clock, MapPin, Waves, Camera } from "lucide-react";
import { dummyImage } from "@/lib/dummyImage";

export const metadata: Metadata = {
  title: "Nusa Penida Tour – Kelingking Beach, Angel's Billabong & Manta Ray",
  description:
    "Explore Nusa Penida with guided day tours: Kelingking Beach, Angel's Billabong, Broken Beach, Crystal Bay, and Manta Ray snorkeling. Book via WhatsApp!",
};


const highlights = [
  { icon: MapPin, label: "Kelingking Beach", desc: "Iconic T-Rex cliff" },
  { icon: Waves, label: "Crystal Bay", desc: "Pristine snorkeling" },
  { icon: Camera, label: "Angel's Billabong", desc: "Natural infinity pool" },
  { icon: Waves, label: "Manta Ray Point", desc: "Swim with mantas" },
];

const spots = ["Kelingking Beach", "Angel's Billabong", "Broken Beach", "Crystal Bay", "Manta Ray Point", "Diamond Beach"];

const gallery = [
  dummyImage("penida-1"),
  dummyImage("penida-2"),
  dummyImage("penida-3"),
  dummyImage("penida-4"),
];

export default function NusaPenidaPage() {
  return (
    <div className="ocean-page">
      {/* Hero — full viewport cinematic */}
      <section className="aq-page-hero h-[70vh] min-h-[480px]">
        <img
          src={dummyImage("penida-hero", 1920, 1080)}
          alt="Nusa Penida"
          className="absolute inset-0 h-full w-full scale-105 object-cover"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-8">
          <span className="aq-eyebrow mb-5">Bali&apos;s Hidden Island</span>
          <h1 className="aq-display mb-5 text-display-lg text-white">Nusa Penida Tours</h1>
          <p className="mb-8 max-w-xl text-[16px] leading-[1.8] text-white/65">
            Discover Bali&apos;s most dramatic island — iconic cliffs, turquoise waters, Manta Rays, and untouched beaches.
          </p>
          <div className="flex flex-wrap gap-2">
            {spots.map((s) => (
              <span key={s} className="aq-chip">
                <MapPin size={10} className="text-[#FFC48A]" /> {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-white/10">
            {highlights.map((h) => (
              <div key={h.label} className="flex items-center gap-3.5 px-2 py-7 md:px-7 md:first:pl-0 md:last:pr-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#3ED6E0]/25 bg-[#3ED6E0]/10 text-[#3ED6E0]">
                  <h.icon size={17} strokeWidth={1.7} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#EAF4F8]">{h.label}</p>
                  <p className="text-[11px] text-[#6E90A4]">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-gap">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Tour Packages"
            title="Explore Nusa Penida"
            subtitle="Three curated day tours covering the best of Nusa Penida — from dramatic sea cliffs to Manta Rays."
            light
          />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {nusaPenidaPackages.map((pkg, i) => (
              <div key={pkg.slug} className="aq-panel aq-panel-hover flex flex-col overflow-hidden !rounded-[28px] p-0">
                <div className="relative shrink-0 p-2.5">
                  <div className="relative h-52 overflow-hidden rounded-[20px]">
                    <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04131F] via-[#04131F]/20 to-transparent" />
                    {i === 0 && (
                      <span className="absolute left-3 top-3 rounded-full bg-gradient-to-br from-[#FFC48A] to-[#F9913E] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1B0E02]">
                        Most Popular
                      </span>
                    )}
                    <span className="aq-chip absolute bottom-3 left-3 !text-[10px]">
                      <Clock size={10} className="text-[#FFC48A]" /> {pkg.duration}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-1">
                  <h2 className="aq-display mb-2 text-[20px] font-medium text-[#EAF4F8]">{pkg.title}</h2>
                  <p className="mb-6 flex-1 text-[13px] leading-[1.75] text-[#8FB0C2]">{pkg.description}</p>

                  {/* Destinations */}
                  <div className="mb-6">
                    <p className="aq-label">Destinations</p>
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.destinations.map((d) => (
                        <span key={d} className="aq-chip !text-[10px]">
                          <MapPin size={9} className="text-[#3ED6E0]" /> {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Includes / Excludes */}
                  <div className="mb-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                    <div>
                      <p className="aq-label">Includes</p>
                      <ul className="space-y-1.5">
                        {pkg.includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-1.5 text-[11px] leading-[1.6] text-[#8FB0C2]">
                            <CheckCircle size={11} strokeWidth={1.9} className="mt-0.5 shrink-0 text-[#3ED6E0]" /> {inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="aq-label">Excludes</p>
                      <ul className="space-y-1.5">
                        {pkg.excludes.map((ex) => (
                          <li key={ex} className="flex items-start gap-1.5 text-[11px] leading-[1.6] text-[#5C7D91]">
                            <X size={11} strokeWidth={1.9} className="mt-0.5 shrink-0" /> {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-5">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#6E90A4]">Per person</p>
                      <p className="aq-accent-text font-display text-[22px] font-semibold leading-none">{pkg.price}</p>
                    </div>
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi! I want to book the ${pkg.title}. What are the available dates?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aq-btn !px-6 !py-2.5 text-[13px]"
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

      {/* Gallery */}
      <section className="section-gap">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader eyebrow="Gallery" title="Nusa Penida in Photos" light />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {gallery.map((src, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-[20px] border border-white/10 ${
                  i === 0 ? "row-span-2 h-full min-h-[280px]" : "h-40 md:h-[134px]"
                }`}
              >
                <img
                  src={src}
                  alt={`Nusa Penida ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
