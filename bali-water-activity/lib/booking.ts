import { waLink } from "./config";

export interface BookingItem {
  name: string;
  pax: number;
  unitPrice: number;
}

export interface BookingDetails {
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  date: string;
  timeSlot: string;
  hotel: string;
  notes: string;
  items: BookingItem[];
}

export const TIME_SLOTS = [
  "09:00 – 10:00",
  "10:00 – 11:00",
  "11:00 – 12:00",
  "12:00 – 13:00",
  "13:00 – 14:00",
  "14:00 – 15:00",
  "15:00 – 16:00",
] as const;

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID").format(amount);
}

/**
 * Parses the display price strings used in lib/activities.ts ("Rp350K", "Rp1,500K")
 * into rupiah. Returns 0 when a price is not machine-readable so the estimate is
 * omitted rather than shown as a wrong number.
 */
export function parsePrice(price: string): number {
  const match = price.match(/([\d,.]+)\s*K/i);
  if (!match) return 0;
  const base = Number(match[1].replace(/[,.]/g, ""));
  return Number.isFinite(base) ? base * 1000 : 0;
}

export function bookingTotal(items: BookingItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.pax, 0);
}

export function bookingReference(now: Date = new Date()): string {
  const stamp = now
    .toISOString()
    .replace(/[-:T]/g, "")
    .slice(0, 12);
  return `BWA-${stamp}`;
}

export function buildBookingMessage(details: BookingDetails, reference: string): string {
  const total = bookingTotal(details.items);

  const lines = [
    "Hello Bali Water Activities! 🌊",
    "I would like to book the following activity:",
    "",
    `*Booking Reference:* ${reference}`,
    `*Lead Guest:* ${details.guestName}`,
    `*Contact:* ${details.guestPhone}${details.guestEmail ? ` / ${details.guestEmail}` : ""}`,
    `*Date of Activity:* ${details.date}`,
    `*Preferred Time:* ${details.timeSlot}`,
    "",
    "*Selected Activities:*",
    ...details.items.map((item) =>
      item.unitPrice > 0
        ? `- ${item.name} (${item.pax} Pax) - Est. IDR ${formatIDR(item.unitPrice * item.pax)}`
        : `- ${item.name} (${item.pax} Pax)`
    ),
    "",
    ...(total > 0 ? [`*Estimated Total:* IDR ${formatIDR(total)}`] : []),
    `*Hotel / Pickup:* ${details.hotel || "None"}`,
    `*Notes:* ${details.notes || "-"}`,
    "",
    "Please confirm availability and payment details. Thank you!",
  ];

  return lines.join("\n");
}

export function buildBookingLink(details: BookingDetails, reference: string): string {
  return waLink(buildBookingMessage(details, reference));
}

/**
 * Same-day bookings are only accepted before 11:00 local time, per the operator's
 * cut-off. Beyond that the earliest selectable date is tomorrow.
 */
export function minimumBookingDate(now: Date = new Date()): string {
  const earliest = new Date(now);
  if (now.getHours() >= 11) {
    earliest.setDate(earliest.getDate() + 1);
  }
  return toDateInput(earliest);
}

export function toDateInput(date: Date): string {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof BookingDetails, string>>;
}

export function validateBooking(details: BookingDetails, now: Date = new Date()): ValidationResult {
  const errors: Partial<Record<keyof BookingDetails, string>> = {};

  if (details.guestName.trim().length < 2) {
    errors.guestName = "Please enter your full name.";
  }

  // Accepts "+62 812 3456 7890", "6281234567890", "+65 9123 4567".
  const digits = details.guestPhone.replace(/[\s()-]/g, "");
  if (!/^\+?\d{8,15}$/.test(digits)) {
    errors.guestPhone = "Enter a valid WhatsApp number including country code.";
  }

  if (details.guestEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(details.guestEmail)) {
    errors.guestEmail = "Enter a valid email address, or leave it blank.";
  }

  if (!details.date) {
    errors.date = "Choose a date for your activity.";
  } else if (details.date < minimumBookingDate(now)) {
    errors.date =
      now.getHours() >= 11
        ? "Same-day bookings close at 11:00 WITA. Please choose tomorrow or later."
        : "Please choose today or a later date.";
  }

  if (!details.timeSlot) {
    errors.timeSlot = "Choose a preferred time slot.";
  }

  if (details.items.length === 0 || details.items.some((item) => item.pax < 1)) {
    errors.items = "Select at least one participant.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
