import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { ArrowRight } from "lucide-react";
import { dummyImage } from "@/lib/dummyImage";

const destinations = [
  {
    title: "Tanjung Benoa",
    subtitle: "Watersport Paradise",
    description: "Bali's premier watersport hub — home to banana boats, jet skis, parasailing, and more.",
    image: dummyImage("tanjung-benoa"),
    href: "/watersport",
    activities: ["Banana Boat", "Jet Ski", "Parasailing", "Sea Walker"],
  },
  {
    title: "Ayung & Telaga Waja River",
    subtitle: "Rafting Adventure",
    description: "Navigate wild rivers through Bali's lush jungle and stunning rice terraces.",
    image: dummyImage("ayung-river"),
    href: "/rafting",
    activities: ["River Rafting", "Jungle Trekking", "Waterfall Views"],
  },
  {
    title: "Nusa Penida",
    subtitle: "Hidden Island Gem",
    description: "Iconic Kelingking Beach, Manta Ray snorkeling, and untouched natural beauty.",
    image: dummyImage("nusa-penida"),
    href: "/nusa-penida",
    activities: ["Kelingking Beach", "Angel's Billabong", "Snorkeling", "Manta Rays"],
  },
  {
    title: "Labuan Bajo",
    subtitle: "Komodo Gateway",
    description: "Meet the legendary Komodo Dragons and explore breathtaking Pink Beach.",
    image: dummyImage("labuan-bajo"),
    href: "/labuan-bajo",
    activities: ["Komodo Dragons", "Pink Beach", "Padar Island", "Island Hopping"],
  },
];

/* Editorial 4-3 / 3-4 rhythm rather than a flat 2x2 block. */
const span = ["lg:col-span-4", "lg:col-span-3", "lg:col-span-3", "lg:col-span-4"];

export default function DestinationsSection() {
  return (
    <section className="section-gap relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Featured Destinations"
          title="Explore Bali & Beyond"
          subtitle="From world-class watersports to remote island adventures — every destination tells a different story."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {destinations.map((d, i) => (
            <Link
              key={d.href}
              href={d.href}
              className={`group relative overflow-hidden rounded-[28px] border border-white/10 transition-all duration-500 hover:border-[#F9913E]/35 ${span[i]}`}
            >
              <div className="relative h-[380px] lg:h-[420px]">
                <img
                  src={d.image}
                  alt={d.title}
                  className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                />
                {/* Deep-water wash so every image lands in the same palette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#04131F] via-[#04131F]/55 to-[#04131F]/10" />
                <div className="absolute inset-0 bg-[#072334]/25 mix-blend-multiply" />

                <div className="absolute inset-x-0 bottom-0 z-10 p-7">
                  <span className="aq-eyebrow mb-3">{d.subtitle}</span>
                  <h3 className="aq-display mb-2 text-[26px] font-medium text-white">{d.title}</h3>
                  <p className="mb-5 max-w-md text-[13px] leading-relaxed text-[#B7CEDB]">{d.description}</p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {d.activities.slice(0, 3).map((a) => (
                      <span key={a} className="aq-chip">{a}</span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#FFC48A] transition-all duration-300 group-hover:gap-3.5">
                    Explore <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
