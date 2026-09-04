import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const destinations = [
  {
    title: "Tanjung Benoa",
    subtitle: "Watersport Paradise",
    description: "Bali's premier watersport hub — home to banana boats, jet skis, parasailing, and more.",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80",
    href: "/watersport",
    activities: ["Banana Boat", "Jet Ski", "Parasailing", "Sea Walker"],
  },
  {
    title: "Ayung & Telaga Waja River",
    subtitle: "Rafting Adventure",
    description: "Navigate wild rivers through Bali's lush jungle and stunning rice terraces.",
    image: "https://images.unsplash.com/photo-1527004013197-933b2ba98694?w=800&q=80",
    href: "/rafting",
    activities: ["River Rafting", "Jungle Trekking", "Waterfall Views"],
  },
  {
    title: "Nusa Penida",
    subtitle: "Hidden Island Gem",
    description: "Iconic Kelingking Beach, Manta Ray snorkeling, and untouched natural beauty.",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80",
    href: "/nusa-penida",
    activities: ["Kelingking Beach", "Angel's Billabong", "Snorkeling", "Manta Rays"],
  },
  {
    title: "Labuan Bajo",
    subtitle: "Komodo Gateway",
    description: "Meet the legendary Komodo Dragons and explore breathtaking Pink Beach.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    href: "/labuan-bajo",
    activities: ["Komodo Dragons", "Pink Beach", "Padar Island", "Island Hopping"],
  },
];

export default function DestinationsSection() {
  return (
    <section className="section-gap bg-gradient-to-b from-[#F8FAFC] to-[#eef6ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Featured Destinations"
          title="Explore Bali & Beyond"
          subtitle="From world-class watersports to remote island adventures — every destination tells a different story."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {destinations.map((d, i) => (
            <Link
              key={d.href}
              href={d.href}
              className={`relative overflow-hidden rounded-3xl group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${i === 0 ? "md:row-span-1" : ""}`}
            >
              <div className={`relative ${i < 2 ? "h-72" : "h-64"}`}>
                <Image
          src={d.image}
          alt={d.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419]/90 via-[#0F1419]/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <span className="text-[#FF9500] text-xs font-bold uppercase tracking-wider">{d.subtitle}</span>
                  <h3 className="text-white font-bold text-xl mt-1 mb-1">{d.title}</h3>
                  <p className="text-blue-100 text-sm mb-3 line-clamp-2">{d.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {d.activities.slice(0, 3).map((a) => (
                      <span key={a} className="glass bg-white/10 border-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full">{a}</span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1.5 text-white text-sm font-semibold group-hover:gap-2.5 transition-all duration-200">
                    Explore <ArrowRight size={15} className="text-[#FFD700]" />
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
