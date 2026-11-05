import Image from "next/image";
import { Check, X } from "lucide-react";
import { waLink } from "@/lib/site";

export interface TourPackageProps {
  id: string;
  kicker: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  stopsLabel?: string;
  stops?: string[];
  itinerary?: string[];
  includes: string[];
  excludes: string[];
  price: string;
  wasPrice?: string;
  badge?: string;
  reverse?: boolean;
}

export default function TourPackage(props: TourPackageProps) {
  const { id, kicker, title, description, image, imageAlt, stopsLabel, stops, itinerary, includes, excludes, price, wasPrice, badge, reverse } = props;

  return (
    <article id={id} aria-labelledby={`${id}-title`} className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
      <div className={`relative lg:sticky lg:top-28 ${reverse ? "lg:order-2" : ""}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-paper-2 lg:aspect-[4/5]">
          <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        {badge && <p className="eyebrow absolute left-4 top-4 rounded-sm bg-sun px-3 py-1.5 text-ink">{badge}</p>}
      </div>

      <div>
        <p className="eyebrow mb-3 text-muted">{kicker}</p>
        <h2 id={`${id}-title`} className="t-section">
          {title}
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed">{description}</p>

        {stops && stops.length > 0 && (
          <div className="mt-10 border-t border-[var(--line)] pt-6">
            <h3 className="mb-3 text-sm font-semibold">{stopsLabel}</h3>
            <p className="text-muted">{stops.join(" · ")}</p>
          </div>
        )}

        {itinerary && (
          <div className="mt-10 border-t border-[var(--line)] pt-6">
            <h3 className="mb-4 text-sm font-semibold">The day</h3>
            <ol className="space-y-2.5">
              {itinerary.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="w-5 shrink-0 text-sm tabular-nums text-muted">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-8 grid gap-8 border-t border-[var(--line)] pt-6 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold">Included</h3>
            <ul className="space-y-2">
              {includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check size={18} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0 text-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Not included</h3>
            <ul className="space-y-2">
              {excludes.map((item) => (
                <li key={item} className="flex gap-3 text-muted">
                  <X size={18} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-ink pt-6">
          <p>
            <span className="block text-sm text-muted">Per person</span>
            <span className="flex items-baseline gap-3">
              <span className="font-serif text-5xl leading-none">{price}</span>
              {wasPrice && <span className="text-muted line-through">{wasPrice}</span>}
            </span>
          </p>
          <a href={waLink(`Hi! I'd like to book the ${title}. Is it available on [date] for [number] people?`)} className="btn btn-whatsapp">
            Book on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

interface GalleryProps {
  title: React.ReactNode;
  photos: { src: string; alt: string }[];
}

/** One large photo, then the rest stacked beside it; holds its height after the photos load. */
export function TourGallery({ title, photos }: GalleryProps) {
  const [lead, ...rest] = photos;
  return (
    <section aria-label="Photos" className="gutter pb-24 md:pb-28">
      <h2 className="t-section mb-10">{title}</h2>
      <div className="grid grid-cols-2 gap-3 md:h-[560px] md:grid-cols-3 md:grid-rows-[repeat(var(--rows),minmax(0,1fr))]" style={{ ["--rows" as string]: rest.length }}>
        <div className="relative col-span-2 aspect-[4/3] min-h-0 overflow-hidden rounded-sm md:row-span-full md:aspect-auto">
          <Image src={lead.src} alt={lead.alt} fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
        </div>
        {rest.map((photo) => (
          <div key={photo.src} className="relative aspect-square min-h-0 overflow-hidden rounded-sm max-md:[&:last-child:nth-child(even)]:col-span-2 max-md:[&:last-child:nth-child(even)]:aspect-[2/1] md:aspect-auto">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
