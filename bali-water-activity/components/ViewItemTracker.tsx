"use client";

import { useEffect } from "react";
import { trackViewItem } from "@/lib/analytics";
import { parsePrice } from "@/lib/booking";

interface ViewItemTrackerProps {
  activity: { slug: string; title: string; price: string; category?: string };
}

export default function ViewItemTracker({ activity }: ViewItemTrackerProps) {
  useEffect(() => {
    trackViewItem({
      id: activity.slug,
      name: activity.title,
      price: parsePrice(activity.price),
      category: activity.category,
    });
  }, [activity.slug, activity.title, activity.price, activity.category]);

  return null;
}
