import { WA_NUMBER } from "@/lib/site";
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


export default function ActivityCard({
  title, description, price, duration, ageRange, image, slug,
}: ActivityCardProps) {
  const waMsg = `Hi! I want to book ${title}. Please send me more information.`;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#072334] shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#F9913E]/35">
      {/* Image sits inset inside the card, like a porthole into the water */}
      <div className="relative shrink-0 p-2.5">
        <div className="relative h-56 overflow-hidden rounded-[20px]">
          <Image
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04131F] via-[#04131F]/25 to-transparent" />

          {/* Meta pills */}
          <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
            <span className="aq-chip !text-[10px]">
              <Clock size={10} className="text-[#FFC48A]" /> {duration}
            </span>
            <span className="aq-chip !text-[10px]">
              <Users size={10} className="text-[#FFC48A]" /> {ageRange} yrs
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-1">
        <h3 className="aq-display mb-2 text-[21px] font-medium text-[#EAF4F8] transition-colors group-hover:text-[#FFC48A]">
          {title}
        </h3>
        <p className="mb-6 line-clamp-2 text-[13px] leading-relaxed text-[#8FB0C2]">{description}</p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <div>
            <p className="text-[9px] uppercase tracking-[0.18em] text-[#6E90A4]">From</p>
            <p className="aq-accent-text text-xl font-bold leading-none">{price}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Link
              href={`/activity/${slug}`}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/12 text-[#8FB0C2] transition-all duration-200 hover:border-white/30 hover:bg-white/5 hover:text-white"
              aria-label={`Details for ${title}`}
            >
              <ArrowUpRight size={14} />
            </Link>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer items-center gap-1.5 rounded-full bg-gradient-to-br from-[#FFC48A] to-[#F9913E] px-4 py-2.5 text-[11px] font-bold text-[#1B0E02] transition-all duration-200 hover:shadow-[0_10px_28px_-6px_rgba(249,145,62,0.6)]"
            >
              <MessageCircle size={12} />
              Book
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
