import { WA_NUMBER } from "@/lib/site";
import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { raftingPackages } from "@/lib/activities";
import { CheckCircle, X, Clock, MapPin, Shield, Users } from "lucide-react";
import { dummyImage } from "@/lib/dummyImage";

export const metadata: Metadata = {
  title: "Bali Rafting – Ayung & Telaga Waja River Adventure",
  description:
    "Experience thrilling white water rafting in Bali on the Ayung and Telaga Waja rivers. All skill levels welcome. Includes lunch, insurance & guide. Book via WhatsApp!",
};


export default function RaftingPage() {
  return (
    <div className="ocean-page">
      {/* Hero */}
      <section className="aq-page-hero h-[52vh] min-h-[360px]">
        <img
          src={dummyImage("rafting-hero")}
          alt="Bali Rafting"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <span className="aq-eyebrow mb-4">Bali River Adventure</span>
          <h1 className="aq-display mb-4 text-display-lg text-white">Rafting in Bali</h1>
          <p className="max-w-xl text-[15px] leading-[1.8] text-white/65">
            Navigate stunning rivers through Bali&apos;s lush jungles and rice terraces. Suitable for beginners and thrill-seekers alike.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="section-gap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Choose Your River"
            title="Rafting Packages"
            subtitle="Two epic rivers, two unforgettable experiences. Pick your level of adventure."
            light
          />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {raftingPackages.map((pkg, i) => (
              <div key={pkg.slug} className="aq-panel overflow-hidden !rounded-[28px] p-0">
                <div className="relative h-60 overflow-hidden p-2.5 pb-0">
                  <div className="relative h-full overflow-hidden rounded-[20px]">
                    <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04131F] via-[#04131F]/20 to-transparent" />
                    {i === 1 && (
                      <span className="absolute left-4 top-4 rounded-full bg-gradient-to-br from-[#FFC48A] to-[#F9913E] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1B0E02]">
                        For Thrill Seekers
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-7">
                  <h2 className="aq-display mb-3 text-[24px] text-[#EAF4F8]">{pkg.title}</h2>
                  <p className="mb-6 text-[14px] leading-[1.8] text-[#8FB0C2]">{pkg.description}</p>

                  <div className="mb-8 flex flex-wrap gap-2">
                    <span className="aq-chip"><Clock size={12} className="text-[#3ED6E0]" /> {pkg.duration}</span>
                    <span className="aq-chip"><MapPin size={12} className="text-[#3ED6E0]" /> {pkg.distance}</span>
                    <span className="aq-chip"><Users size={12} className="text-[#3ED6E0]" /> {pkg.level}</span>
                  </div>

                  {/* Itinerary */}
                  <div className="mb-8">
                    <p className="aq-label">Itinerary</p>
                    <ol className="space-y-3">
                      {pkg.itinerary.map((step, j) => (
                        <li key={j} className="flex items-start gap-3 text-[13px] leading-[1.7] text-[#8FB0C2]">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#3ED6E0]/25 bg-[#3ED6E0]/10 text-[10px] font-bold text-[#3ED6E0]">
                            {j + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Includes / Excludes */}
                  <div className="mb-8 grid grid-cols-2 gap-6">
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
                            <X size={12} strokeWidth={1.9} className="mt-1 shrink-0 text-[#5C7D91]" /> {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#6E90A4]">Per person</p>
                      <p className="aq-accent-text font-display text-[26px] font-semibold leading-none">{pkg.price}</p>
                    </div>
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi! I want to book ${pkg.title}. How many slots are available?`)}`}
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

      {/* Safety */}
      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="aq-panel flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#3ED6E0]/25 bg-[#3ED6E0]/10 text-[#3ED6E0]">
              <Shield size={21} strokeWidth={1.6} />
            </div>
            <div>
              <p className="mb-1.5 text-[17px] font-semibold text-[#EAF4F8]">Safety Briefing Included</p>
              <p className="text-[13px] leading-[1.75] text-[#8FB0C2]">
                All participants receive a full safety briefing before entering the water. Helmets, life jackets, and certified guides are always provided.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
