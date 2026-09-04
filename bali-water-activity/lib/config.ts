export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://baliwateractivity.com";

// Digits only, international format without "+" — wa.me rejects anything else.
export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? "628XXXXXXXXXX";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

export const IS_WA_CONFIGURED = /^\d{8,15}$/.test(WA_NUMBER);

export const BUSINESS = {
  name: "Bali Water Activity",
  openHour: "09:00",
  closeHour: "16:00",
  timezone: "WITA",
  closedDays: ["Nyepi (Balinese Day of Silence)", "Galungan"],
  recommendedWindow: "09:00 – 12:00",
  recommendedReason:
    "Morning sessions follow the incoming tide, which gives the calmest water and the best visibility.",
} as const;

export const WHAT_TO_BRING = [
  "Swimwear (worn under your clothes)",
  "A change of clothes and a towel",
  "Sunscreen and sunglasses",
  "Waterproof phone case or camera",
  "Small amount of cash for personal expenses",
] as const;

export const WHAT_NOT_TO_BRING = [
  "Jewellery or watches",
  "Your original passport — a photo on your phone is enough",
  "Valuables without waterproof protection",
] as const;

export const MEDICAL_RESTRICTIONS = [
  "Heart disease",
  "Severe asthma",
  "Uncontrolled hypertension",
  "Epilepsy",
  "Pregnancy",
] as const;

export const AGE_LIMITS = {
  watersport: { min: 8, max: 65 },
  seaWalker: { min: 9, max: 60 },
} as const;

export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
