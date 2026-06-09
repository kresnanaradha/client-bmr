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
  title, description, price, duration, ageRange, image, slug, badge,
}: ActivityCardProps) {
  const waMsg = `Hi! I want to book ${title}. Please send me more information.`;

  return (
    <div className="glass-card group relative overflow-hidden cursor-pointer flex flex-col h-full">
      {/* Full-bleed image with cinematic overlay */}
      <div className="relative h-64 overflow-hidden rounded-t-2xl shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-90"
          loading="lazy"
        />
        {/* Cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Badge */}
        {badge && (
          <span className="absolute top-4 left-4 glass bg-black/40 text-[#FFD700] border-white/10 text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full">
            ⭐ {badge}
          </span>
        )}

        {/* Meta pills */}
        <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10">
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md border border-white/10 text-white/90 text-[10px] font-semibold px-2.5 py-1 rounded-full">
            <Clock size={10} className="text-[#FFD700]" /> {duration}
          </span>
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md border border-white/10 text-white/90 text-[10px] font-semibold px-2.5 py-1 rounded-full">
            <Users size={10} className="text-[#FFD700]" /> {ageRange} yrs
          </span>
        </div>

        {/* Content over image */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <h3 className="font-display text-xl text-white mb-1 leading-tight group-hover:text-[#FFD700] transition-colors">{title}</h3>
        </div>
      </div>

      {/* Card Body & Action Strip */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-black/10">
        <p className="text-white/70 text-sm leading-relaxed mb-5 line-clamp-2">{description}</p>
        
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <div>
            <p className="text-white/40 text-[9px] uppercase tracking-wider">From</p>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FF9500] font-display text-xl font-bold leading-none">{price}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Link
              href={`/activity/${slug}`}
              className="w-9 h-9 rounded-full border border-white/20 hover:border-white/60 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 cursor-pointer bg-white/5"
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
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-gradient-to-br from-white/30 to-transparent transition-opacity duration-500" />
    </div>
  );
}
