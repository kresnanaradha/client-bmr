import type { DashboardData, DateRange } from "./ga4";

/**
 * Shape-only fixture so the dashboard can be demonstrated before the GA4
 * property exists. Never served unless DASHBOARD_SAMPLE_DATA is explicitly
 * enabled, and the UI renders a permanent banner when it is.
 */
export const IS_SAMPLE_MODE = process.env.DASHBOARD_SAMPLE_DATA === "true";

const SCALE: Record<DateRange, number> = { "7d": 1, "28d": 3.6, "90d": 10.2 };

export function sampleDashboardData(range: DateRange): DashboardData {
  const k = SCALE[range];
  const n = (base: number) => Math.round(base * k);

  return {
    totals: {
      users: n(412),
      sessions: n(538),
      views: n(690),
      checkouts: n(96),
      leads: n(31),
    },
    countries: [
      { label: "Singapore", value: n(131), secondary: n(174) },
      { label: "Australia", value: n(118), secondary: n(152) },
      { label: "India", value: n(47), secondary: n(58) },
      { label: "Japan", value: n(33), secondary: n(41) },
      { label: "South Korea", value: n(29), secondary: n(36) },
      { label: "Indonesia", value: n(26), secondary: n(39) },
      { label: "United Kingdom", value: n(18), secondary: n(22) },
    ],
    cities: [
      { label: "Singapore", value: n(131) },
      { label: "Sydney", value: n(48) },
      { label: "Melbourne", value: n(37) },
      { label: "Denpasar", value: n(24) },
      { label: "Perth", value: n(21) },
      { label: "Mumbai", value: n(19) },
    ],
    devices: [
      { label: "mobile", value: n(347) },
      { label: "desktop", value: n(52) },
      { label: "tablet", value: n(13) },
    ],
    languages: [
      { label: "en-gb", value: n(168) },
      { label: "en-us", value: n(121) },
      { label: "en-au", value: n(63) },
      { label: "ja-jp", value: n(31) },
      { label: "ko-kr", value: n(29) },
    ],
    age: [
      { label: "25-34", value: n(142) },
      { label: "35-44", value: n(118) },
      { label: "18-24", value: n(71) },
      { label: "45-54", value: n(52) },
      { label: "55-64", value: n(21) },
    ],
    gender: [
      { label: "female", value: n(214) },
      { label: "male", value: n(190) },
    ],
    activities: [
      { label: "Parasailing", value: n(174) },
      { label: "Sea Walker", value: n(139) },
      { label: "Banana Boat", value: n(96) },
      { label: "Jet Ski", value: n(88) },
      { label: "Fly Board", value: n(61) },
      { label: "Fly Fish", value: n(48) },
    ],
    demographicsUnavailable: false,
  };
}
