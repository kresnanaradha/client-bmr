import { WA_NUMBER } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, MessageCircle, ArrowUpRight } from "lucide-react";

interface ActivityCardProps {
  title: string;
  description: string;
  publishPrice: string;
  netPrice: string;
  duration: string;
  ageRange: string;
  image: string;
  slug: string;
  badge?: string;
}

export default function ActivityCard({
  title,
  description,
  publishPrice,
  netPrice,
  duration,
  ageRange,
  image,
  slug,
}: ActivityCardProps) {
  const waMsg = `Hi! I want to book ${title}. Please send me more information.`;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[#10245E]/10 bg-white shadow-[0_18px_50px_-24px_rgba(23,59,77,0.2)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#FF9B28]/35">
      {/* Image sits inset inside the card, like a porthole into the water */}
      <div className="relative shrink-0 p-2.5">
        <div className="relative h-56 overflow-hidden rounded-[20px]">
          <Image
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-900 ease-out group-hover:scale-[1.07]"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#04131F] via-[#04131F]/25 to-transparent" />

          {/* Meta pills */}
          <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
            <span className="aq-chip text-[10px]">
              <Clock size={10} className="text-[#FF9B28]" /> {duration}
            </span>
            <span className="aq-chip text-[10px]">
              <Users size={10} className="text-[#FF9B28]" /> {ageRange} yrs
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-1">
        <h3 className="aq-display mb-2 text-[21px] font-bold text-[#10245E] transition-colors group-hover:text-[#FF9B28]">
          {title}
        </h3>
        <p className="mb-6 line-clamp-2 text-[13px] leading-relaxed text-[#10245E]">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#10245E]/10 pt-4">
          <div>
            <p className="text-[9px] uppercase tracking-[0.18em] text-[#10245E]">
              Price per person
            </p>
            <div className="mt-1 flex flex-wrap items-baseline gap-2">
              <span className="text-xs text-[#10245E] line-through">
                {publishPrice}
              </span>
              <span className="aq-accent-text text-xl font-bold leading-none">
                {netPrice}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Link
              href={`/activity/${slug}`}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#10245E]/12 text-[#10245E] transition-all duration-200 hover:border-[#10245E]/30 hover:bg-[#10245E]/5 hover:text-[#10245E]"
              aria-label={`Details for ${title}`}
            >
              <ArrowUpRight size={14} />
            </Link>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2.5 text-[11px] font-bold text-white transition-all duration-200 hover:bg-[#1EBE59] hover:shadow-[0_10px_28px_-6px_rgba(37,211,102,0.4)]"
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
