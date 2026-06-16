import Image from "next/image";
import Link from "next/link";
import { Clock, Users, MessageCircle, ArrowUpRight } from "lucide-react";

interface ActivityCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  ageRange: string;
  image: string;
  slug: string;
  badge?: string;
}

const WA_NUMBER = "628XXXXXXXXXX";

export default function ActivityCard({
  title, description, price, duration, ageRange, image, slug,
}: ActivityCardProps) {
  const waMsg = `Hi! I want to book ${title}. Please send me more information.`;

  return (
    <div className="glass-card group relative overflow-hidden flex flex-col h-full">
      {/* Full-bleed image with cinematic overlay */}
      <div className="relative h-64 overflow-hidden rounded-t-2xl shrink-0">
        <Image
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-90"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Cinematic gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        {/* Meta pills */}
        <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10">
          <span className="flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white/90 backdrop-blur-md">
            <Clock size={10} className="text-golden" /> {duration}
          </span>
          <span className="flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white/90 backdrop-blur-md">
            <Users size={10} className="text-golden" /> {ageRange} yrs
          </span>
        </div>

        {/* Content over image */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <h3 className="mb-1 font-display text-xl leading-tight text-white transition-colors group-hover:text-golden">{title}</h3>
        </div>
      </div>

      {/* Card Body & Action Strip */}
      <div className="flex flex-1 flex-col justify-between bg-white/80 p-5">
        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-slate-700">{description}</p>
        
        <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-slate-500">From</p>
            <p className="bg-linear-to-r from-dark-navy to-teal bg-clip-text text-xl font-bold leading-none text-transparent">{price}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Link
              href={`/activity/${slug}`}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:border-slate-300 hover:text-slate-900"
              aria-label={`Details for ${title}`}
            >
              <ArrowUpRight size={14} />
            </Link>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 gradient-sunset text-white text-[11px] font-bold px-4 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 cursor-pointer"
            >
              <MessageCircle size={12} />
              Book
            </a>
          </div>
        </div>
      </div>

      {/* Hover shine effect */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
    </div>
  );
}
