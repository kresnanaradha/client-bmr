"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Activity } from "@/lib/activities";
import { shortDuration } from "@/lib/format";

interface ActivityIndexProps {
  activities: Activity[];
  /** Heading level for each activity name: h3 under a section heading, h2 on a page of its own. */
  itemHeading?: "h2" | "h3";
}

export default function ActivityIndex({ activities, itemHeading: ItemHeading = "h3" }: ActivityIndexProps) {
  const [active, setActive] = useState(0);
  const current = activities[active];

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
      <ol className="border-t border-ink">
        {activities.map((activity, index) => (
          <li key={activity.slug} className="border-b border-[var(--line)]">
            <Link
              href={`/activity/${activity.slug}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className="group grid grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-4 py-4 sm:grid-cols-[40px_minmax(0,1fr)_auto_auto] sm:gap-6 sm:py-5"
            >
              <span className="relative h-14 w-14 overflow-hidden rounded-sm sm:hidden">
                <Image src={activity.image} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span className="hidden text-sm tabular-nums text-muted sm:block">{String(index + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <ItemHeading className="t-item group-hover:italic">{activity.title}</ItemHeading>
                <span className="mt-1 block text-sm text-muted sm:hidden">
                  {shortDuration(activity.duration)} · ages {activity.ageRange}
                </span>
              </span>
              <span className="hidden whitespace-nowrap text-sm text-muted sm:block">
                {shortDuration(activity.duration)} · ages {activity.ageRange}
              </span>
              <span className="whitespace-nowrap text-right">
                <span className="mr-2 hidden text-sm text-muted line-through sm:inline">{activity.publishPrice}</span>
                <span className="text-lg font-semibold sm:text-xl">{activity.netPrice}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <figure className="hidden lg:block">
        <div className="sticky top-28">
          <Link href={`/activity/${current.slug}`} className="zoom-media relative block aspect-[4/5] overflow-hidden rounded-sm bg-paper-2">
            <Image
              key={current.slug}
              src={current.image}
              alt={`${current.title} at Tanjung Benoa`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </Link>
          <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-sm text-muted">
            <span>
              {String(active + 1).padStart(2, "0")} · {current.title}
            </span>
            <Link href={`/activity/${current.slug}`} className="inline-flex items-center gap-1 font-medium text-ink hover:text-blue">
              Details <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </figcaption>
        </div>
      </figure>
    </div>
  );
}
