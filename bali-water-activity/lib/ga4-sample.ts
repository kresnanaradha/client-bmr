import type { DashboardData, DateRange, Row } from "./ga4";

/**
 * Invented numbers so the dashboard can be shown before the GA4 property has
 * real traffic. Only served when DASHBOARD_SAMPLE_DATA=true, and the page shows
 * a permanent banner saying so.
 */
export const IS_SAMPLE_MODE = process.env.DASHBOARD_SAMPLE_DATA === "true";

const DAYS: Record<DateRange, number> = { "7d": 7, "28d": 28, "90d": 90 };

function scaled(rows: [string, number][], k: number): Row[] {
  return rows
    .map(([label, value]) => ({ label, value: Math.round(value * k) }))
    .sort((a, b) => b.value - a.value);
}

export function sampleDashboardData(range: DateRange): DashboardData {
  const days = DAYS[range];
  const k = days / 7;

  // Deterministic weekly rhythm with weekend peaks, so the chart is stable across reloads.
  const today = new Date();
  const trend = Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (days - 1 - i));
    const weekday = d.getDay();
    const weekend = weekday === 0 || weekday === 6 ? 1.35 : 1;
    const wave = 1 + 0.18 * Math.sin(i / 3.1);
    return { date: d.toISOString().slice(0, 10), visitors: Math.round(54 * weekend * wave) };
  });
  const visitors = trend.reduce((sum, p) => sum + p.visitors, 0);

  return {
    totals: {
      visitors,
      newVisitors: Math.round(visitors * 0.82),
      sessions: Math.round(visitors * 1.31),
      pageViews: Math.round(visitors * 3.6),
      avgEngagementSeconds: 94,
      activityViewers: Math.round(visitors * 0.58),
      whatsappVisitors: Math.round(visitors * 0.071),
      whatsappClicks: Math.round(visitors * 0.094),
    },
    trend,
    countries: scaled(
      [["Australia", 118], ["Singapore", 96], ["Indonesia", 61], ["India", 38], ["Japan", 24], ["South Korea", 21], ["United Kingdom", 15], ["United States", 12]],
      k
    ),
    cities: scaled(
      [["Denpasar", 74], ["Singapore", 96], ["Sydney", 41], ["Melbourne", 33], ["Perth", 27], ["Jakarta", 19], ["Mumbai", 14], ["Tokyo", 11]],
      k
    ),
    age: scaled([["18-24", 61], ["25-34", 142], ["35-44", 98], ["45-54", 47], ["55-64", 19], ["65+", 6]], k).sort((a, b) =>
      a.label.localeCompare(b.label)
    ),
    gender: scaled([["female", 207], ["male", 166]], k),
    devices: scaled([["mobile", 318], ["desktop", 74], ["tablet", 13]], k),
    operatingSystems: scaled([["iOS", 182], ["Android", 136], ["Windows", 48], ["Macintosh", 31], ["Linux", 4]], k),
    languages: scaled([["en-au", 109], ["en-us", 87], ["en-gb", 52], ["id-id", 58], ["ja-jp", 22], ["ko-kr", 19]], k),
    channels: scaled([["Organic Search", 214], ["Direct", 131], ["Organic Social", 102], ["Referral", 38], ["Unassigned", 9]], k),
    sources: scaled([["google", 206], ["(direct)", 131], ["instagram.com", 71], ["tripadvisor.com", 24], ["facebook.com", 23], ["l.wl.co", 14], ["bing", 8]], k),
    pages: scaled(
      [["Bali Water Activity – Watersport, Rafting & Tour Packages", 402], ["Watersport Bali", 233], ["Sea Walker Bali", 141], ["Parasailing Bali", 118], ["Nusa Penida Tours", 97], ["Jet Ski Bali", 84], ["Rafting in Bali", 66], ["Labuan Bajo Tours", 41]],
      k
    ),
    whatsappByPage: scaled(
      [["Sea Walker Bali", 11], ["Parasailing Bali", 9], ["Bali Water Activity – Watersport, Rafting & Tour Packages", 8], ["Nusa Penida Tours", 6], ["Jet Ski Bali", 5], ["Contact Us", 3]],
      k
    ),
    whatsappByCountry: scaled([["Australia", 13], ["Singapore", 11], ["Indonesia", 7], ["India", 4], ["Japan", 2]], k),
    demographicsUnavailable: false,
  };
}
