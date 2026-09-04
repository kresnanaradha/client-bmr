"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import BookingModal from "./BookingModal";
import { trackBeginCheckout } from "@/lib/analytics";
import { parsePrice } from "@/lib/booking";

interface BookNowButtonProps {
  activity: { slug: string; title: string; price: string; category?: string };
  className?: string;
  label?: string;
  iconSize?: number;
}

export default function BookNowButton({
  activity,
  className = "",
  label = "Book Now",
  iconSize = 16,
}: BookNowButtonProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    trackBeginCheckout({
      id: activity.slug,
      name: activity.title,
      price: parsePrice(activity.price),
      category: activity.category,
    });
    setOpen(true);
  };

  return (
    <>
      <button type="button" onClick={handleOpen} className={className}>
        <MessageCircle size={iconSize} />
        {label}
      </button>
      <BookingModal open={open} onClose={() => setOpen(false)} activity={activity} />
    </>
  );
}
