import { WA_NUMBER } from "@/lib/site";
import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { labuanBajoPackages } from "@/lib/activities";
import { CheckCircle, X, Clock, Star, Fish, Sailboat, Mountain, Waves } from "lucide-react";
import { dummyImage } from "@/lib/dummyImage";

export const metadata: Metadata = {
  title: "Labuan Bajo Tour – Komodo Dragons, Pink Beach & Island Hopping",
  description:
    "Book Labuan Bajo tours from Bali: Komodo National Park, Komodo Dragons, Pink Beach, Padar Island & snorkeling. 2D1N and 3D2N packages available.",
};


const features = [
  { icon: Mountain, label: "Komodo Dragons", desc: "World's largest lizard" },
  { icon: Waves, label: "Pink Beach", desc: "Rare pink-sand paradise" },
  { icon: Sailboat, label: "Island Hopping", desc: "17,000+ islands nearby" },
  { icon: Fish, label: "Snorkeling", desc: "World-class marine life" },
];

export default function LabuanBajoPage() {
  return (
    <div className="ocean-page">
      {/* Hero */}
      <section className="aq-page-hero h-[70vh] min-h-[480px]">
        <img
          src={dummyImage("labuan-hero")}
          alt="Labuan Bajo"
          className="absolute inset-0 h-full w-full scale-105 object-cover"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-8">
          <span className="aq-eyebrow mb-5">Komodo National Park</span>
          <h1 className="aq-display mb-5 text-display-lg text-white">Labuan Bajo Tours</h1>
          <p className="max-w-xl text-[16px] leading-[1.8] text-white/65">
            Encounter legendary Komodo Dragons, discover Pink Beach, and sail through the world&apos;s most stunning archipelago.
          </p>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-white/10">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-3.5 px-2 py-7 md:px-7 md:first:pl-0 md:last:pr-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#3ED6E0]/25 bg-[#3ED6E0]/10 text-[#3ED6E0]">
                  <f.icon size={17} strokeWidth={1.7} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#EAF4F8]">{f.label}</p>
                  <p className="text-[11px] text-[#6E90A4]">{f.desc}</p>
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
            title="Choose Your Labuan Bajo Experience"
            subtitle="From a quick 2-day escape to a deep 3-day exploration — we have the perfect package for every traveler."
            light
          />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {labuanBajoPackages.map((pkg, i) => (
              <div key={pkg.slug} className="aq-panel aq-panel-hover overflow-hidden !rounded-[28px] p-0">
                <div className="relative p-2.5">
                  <div className="relative h-64 overflow-hidden rounded-[20px]">
                    <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04131F] via-[#04131F]/20 to-transparent" />
                    {i === 1 && (
                      <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-gradient-to-br from-[#FFC48A] to-[#F9913E] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1B0E02]">
                        <Star size={10} fill="currentColor" /> Best Value
                      </span>
                    )}
                    <span className="aq-chip absolute bottom-3 left-3 !text-[10px]">
                      <Clock size={10} className="text-[#FFC48A]" /> {pkg.duration}
                    </span>
                  </div>
                </div>

                <div className="px-7 pb-7 pt-1">
                  <h2 className="aq-display mb-3 text-[22px] font-medium text-[#EAF4F8]">{pkg.title}</h2>
                  <p className="mb-7 text-[14px] leading-[1.8] text-[#8FB0C2]">{pkg.description}</p>

                  {/* Highlights */}
                  <div className="mb-7">
                    <p className="aq-label">Highlights</p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.highlights.map((h) => (
                        <span key={h} className="aq-chip">{h}</span>
                      ))}
                    </div>
                  </div>

                  {/* Includes / Excludes */}
                  <div className="mb-7 grid grid-cols-2 gap-5 border-t border-white/10 pt-6">
                    <div>
                      <p className="aq-label">Includes</p>
                      <ul className="space-y-2">
                        {pkg.includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-2 text-[12px] leading-[1.6] text-[#8FB0C2]">
                            <CheckCircle size={12} strokeWidth={1.9} className="mt-1 shrink-0 text-[#3ED6E0]" /> {inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="aq-label">Excludes</p>
                      <ul className="space-y-2">
                        {pkg.excludes.map((ex) => (
                          <li key={ex} className="flex items-start gap-2 text-[12px] leading-[1.6] text-[#5C7D91]">
                            <X size={12} strokeWidth={1.9} className="mt-1 shrink-0" /> {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#6E90A4]">Starting from</p>
                      <p className="aq-accent-text font-display text-[26px] font-semibold leading-none">{pkg.price}</p>
                      <p className="mt-1 text-[11px] text-[#6E90A4]">per person</p>
                    </div>
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in the ${pkg.title}. Can you share availability and pricing?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aq-btn !px-7 !py-3 text-[14px]"
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
      <section className="section-gap">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader eyebrow="Gallery" title="Labuan Bajo in Photos" light />
          <div className="grid h-[420px] grid-cols-3 gap-3">
            <div className="col-span-2 overflow-hidden rounded-[20px] border border-white/10">
              <img src={dummyImage("labuan-1")} alt="Labuan Bajo 1" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex-1 overflow-hidden rounded-[20px] border border-white/10">
                <img src={dummyImage("labuan-2")} alt="Labuan Bajo 2" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
              </div>
              <div className="flex-1 overflow-hidden rounded-[20px] border border-white/10">
                <img src={dummyImage("labuan-3")} alt="Labuan Bajo 3" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
