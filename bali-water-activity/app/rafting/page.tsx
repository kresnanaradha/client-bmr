import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { raftingPackages } from "@/lib/activities";
import { CheckCircle, X, Clock, MapPin, Shield, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Bali Rafting – Ayung & Telaga Waja River Adventure",
  description:
    "Experience thrilling white water rafting in Bali on the Ayung and Telaga Waja rivers. All skill levels welcome. Includes lunch, insurance & guide. Book via WhatsApp!",
};

const WA_NUMBER = "628XXXXXXXXXX";

export default function RaftingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-80 md:h-[28rem] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1527004013197-933b2ba98694?w=1920&q=85"
          alt="Bali Rafting"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B5E]/90 to-[#2196C4]/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <span className="text-[#F5A623] text-xs font-semibold uppercase tracking-widest">Bali River Adventure</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mt-1">Rafting in Bali</h1>
          <p className="text-blue-200 mt-2 max-w-xl">Navigate stunning rivers through Bali&apos;s lush jungles and rice terraces. Suitable for beginners and thrill-seekers alike.</p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-[#F0F9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Choose Your River"
            title="Rafting Packages"
            subtitle="Two epic rivers, two unforgettable experiences. Pick your level of adventure."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {raftingPackages.map((pkg, i) => (
              <div key={pkg.slug} className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100">
                <div className="relative h-56 overflow-hidden">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {i === 1 && (
                    <span className="absolute top-4 left-4 gradient-sunset text-white text-xs font-bold px-3 py-1 rounded-full">
                      For Thrill Seekers
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h2 className="font-bold text-xl text-[#0C1A4A] mb-2">{pkg.title}</h2>
                  <p className="text-[#475569] text-sm mb-4">{pkg.description}</p>

                  <div className="flex flex-wrap gap-3 mb-5 text-xs text-[#475569]">
                    <span className="flex items-center gap-1.5 bg-[#F0F9FF] px-3 py-1.5 rounded-full">
                      <Clock size={12} className="text-[#1A2FB0]" /> {pkg.duration}
                    </span>
                    <span className="flex items-center gap-1.5 bg-[#F0F9FF] px-3 py-1.5 rounded-full">
                      <MapPin size={12} className="text-[#1A2FB0]" /> {pkg.distance}
                    </span>
                    <span className="flex items-center gap-1.5 bg-[#F0F9FF] px-3 py-1.5 rounded-full">
                      <Users size={12} className="text-[#1A2FB0]" /> {pkg.level}
                    </span>
                  </div>

                  {/* Itinerary */}
                  <div className="mb-5">
                    <p className="font-semibold text-sm text-[#0C1A4A] mb-3">Itinerary</p>
                    <ol className="space-y-2">
                      {pkg.itinerary.map((step, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#475569]">
                          <span className="w-5 h-5 rounded-full gradient-card flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">{j + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Includes / Excludes */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <p className="font-semibold text-xs text-[#0C1A4A] uppercase tracking-widest mb-2">Includes</p>
                      <ul className="space-y-1">
                        {pkg.includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-1.5 text-xs text-[#475569]">
                            <CheckCircle size={12} className="text-green-500 mt-0.5 shrink-0" /> {inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-[#0C1A4A] uppercase tracking-widest mb-2">Excludes</p>
                      <ul className="space-y-1">
                        {pkg.excludes.map((ex) => (
                          <li key={ex} className="flex items-start gap-1.5 text-xs text-[#475569]">
                            <X size={12} className="text-red-400 mt-0.5 shrink-0" /> {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-[#475569]">Per person</p>
                      <p className="text-2xl font-bold text-[#1A2FB0]">{pkg.price}</p>
                    </div>
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi! I want to book ${pkg.title}. How many slots are available?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gradient-sunset text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer text-sm"
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
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gradient-card rounded-2xl p-6 flex items-center gap-4">
            <Shield size={40} className="text-white shrink-0" />
            <div>
              <p className="text-white font-bold text-lg">Safety Briefing Included</p>
              <p className="text-blue-200 text-sm">All participants receive a full safety briefing before entering the water. Helmets, life jackets, and certified guides are always provided.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
