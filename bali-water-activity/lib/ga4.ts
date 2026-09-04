import "server-only";
import { BetaAnalyticsDataClient, protos } from "@google-analytics/data";

type RunReportResponse = protos.google.analytics.data.v1beta.IRunReportResponse;

export const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID ?? "";
const GA4_CLIENT_EMAIL = process.env.GA4_CLIENT_EMAIL ?? "";
const GA4_PRIVATE_KEY = process.env.GA4_PRIVATE_KEY ?? "";

export const IS_GA4_CONFIGURED = Boolean(GA4_PROPERTY_ID && GA4_CLIENT_EMAIL && GA4_PRIVATE_KEY);

export type DateRange = "7d" | "28d" | "90d";

export const DATE_RANGES: Record<DateRange, { label: string; startDate: string }> = {
  "7d": { label: "Last 7 days", startDate: "7daysAgo" },
  "28d": { label: "Last 28 days", startDate: "28daysAgo" },
  "90d": { label: "Last 90 days", startDate: "90daysAgo" },
};

export interface Row {
  label: string;
  value: number;
  secondary?: number;
}

export interface DashboardData {
  totals: { users: number; sessions: number; leads: number; checkouts: number; views: number };
  countries: Row[];
  cities: Row[];
  devices: Row[];
  languages: Row[];
  age: Row[];
  gender: Row[];
  activities: Row[];
  /** True when GA4 returned no age/gender rows — usually Google Signals off or below threshold. */
  demographicsUnavailable: boolean;
}

let client: BetaAnalyticsDataClient | null = null;

function getClient(): BetaAnalyticsDataClient {
  if (!client) {
    client = new BetaAnalyticsDataClient({
      credentials: {
        client_email: GA4_CLIENT_EMAIL,
        // Vercel and most dashboards store the key with literal \n sequences.
        private_key: GA4_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
    });
  }
  return client;
}

const property = () => `properties/${GA4_PROPERTY_ID}`;

function toRows(response: RunReportResponse | undefined): Row[] {
  return (response?.rows ?? []).map((row) => ({
    label: row.dimensionValues?.[0]?.value || "(not set)",
    value: Number(row.metricValues?.[0]?.value ?? 0),
    secondary: row.metricValues?.[1] ? Number(row.metricValues[1].value ?? 0) : undefined,
  }));
}

async function runReport(
  startDate: string,
  dimension: string | null,
  metrics: string[],
  limit = 10
) {
  const [response] = await getClient().runReport({
    property: property(),
    dateRanges: [{ startDate, endDate: "today" }],
    dimensions: dimension ? [{ name: dimension }] : undefined,
    metrics: metrics.map((name) => ({ name })),
    limit,
    orderBys: dimension ? [{ metric: { metricName: metrics[0] }, desc: true }] : undefined,
  });
  return response;
}

async function runEventReport(startDate: string) {
  const [response] = await getClient().runReport({
    property: property(),
    dateRanges: [{ startDate, endDate: "today" }],
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        inListFilter: { values: ["view_item", "begin_checkout", "generate_lead"] },
      },
    },
    limit: 10,
  });
  const counts: Record<string, number> = {};
  for (const row of response.rows ?? []) {
    counts[row.dimensionValues?.[0]?.value ?? ""] = Number(row.metricValues?.[0]?.value ?? 0);
  }
  return counts;
}

async function runActivityReport(startDate: string) {
  const [response] = await getClient().runReport({
    property: property(),
    dateRanges: [{ startDate, endDate: "today" }],
    dimensions: [{ name: "itemName" }],
    metrics: [{ name: "itemsViewed" }],
    limit: 10,
    orderBys: [{ metric: { metricName: "itemsViewed" }, desc: true }],
  });
  return toRows(response);
}

export async function fetchDashboardData(range: DateRange): Promise<DashboardData> {
  const { startDate } = DATE_RANGES[range];

  const [totals, countries, cities, devices, languages, events, activities] = await Promise.all([
    runReport(startDate, null, ["totalUsers", "sessions"]),
    runReport(startDate, "country", ["totalUsers", "sessions"]),
    runReport(startDate, "city", ["totalUsers"]),
    runReport(startDate, "deviceCategory", ["totalUsers"]),
    runReport(startDate, "language", ["totalUsers"], 6),
    runEventReport(startDate),
    runActivityReport(startDate).catch(() => [] as Row[]),
  ]);

  // Age and gender need Google Signals; GA4 returns nothing (or throws) otherwise.
  const [age, gender] = await Promise.all([
    runReport(startDate, "userAgeBracket", ["totalUsers"]).then(toRows).catch(() => [] as Row[]),
    runReport(startDate, "userGender", ["totalUsers"]).then(toRows).catch(() => [] as Row[]),
  ]);

  const totalRow = totals.rows?.[0]?.metricValues ?? [];

  return {
    totals: {
      users: Number(totalRow[0]?.value ?? 0),
      sessions: Number(totalRow[1]?.value ?? 0),
      views: events.view_item ?? 0,
      checkouts: events.begin_checkout ?? 0,
      leads: events.generate_lead ?? 0,
    },
    countries: toRows(countries),
    cities: toRows(cities),
    devices: toRows(devices),
    languages: toRows(languages),
    age,
    gender,
    activities,
    demographicsUnavailable: age.length === 0 && gender.length === 0,
  };
}
