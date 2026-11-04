import "server-only";
import { BetaAnalyticsDataClient, protos } from "@google-analytics/data";

type RunReportRequest = protos.google.analytics.data.v1beta.IRunReportRequest;
type RunReportResponse = protos.google.analytics.data.v1beta.IRunReportResponse;
type FilterExpression = protos.google.analytics.data.v1beta.IFilterExpression;

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID ?? "";
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
}

export interface TrendPoint {
  /** ISO date, YYYY-MM-DD. */
  date: string;
  visitors: number;
}

export interface DashboardData {
  totals: {
    visitors: number;
    newVisitors: number;
    sessions: number;
    pageViews: number;
    /** Average engaged time per active visitor, in seconds. */
    avgEngagementSeconds: number;
    activityViewers: number;
    whatsappVisitors: number;
    whatsappClicks: number;
  };
  trend: TrendPoint[];
  countries: Row[];
  cities: Row[];
  age: Row[];
  gender: Row[];
  devices: Row[];
  operatingSystems: Row[];
  languages: Row[];
  channels: Row[];
  sources: Row[];
  pages: Row[];
  whatsappByPage: Row[];
  whatsappByCountry: Row[];
  /** True when GA4 returned no age/gender rows: Google Signals off or below the privacy threshold. */
  demographicsUnavailable: boolean;
}

const WHATSAPP_EVENT: FilterExpression = {
  filter: { fieldName: "eventName", stringFilter: { matchType: "EXACT", value: "whatsapp_click" } },
};

// Pages where someone is looking at something they could book.
const PRODUCT_PAGES: FilterExpression = {
  orGroup: {
    expressions: [
      { filter: { fieldName: "pagePath", stringFilter: { matchType: "BEGINS_WITH", value: "/activity/" } } },
      {
        filter: {
          fieldName: "pagePath",
          inListFilter: { values: ["/watersport", "/rafting", "/nusa-penida", "/labuan-bajo"] },
        },
      },
    ],
  },
};

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

async function report(startDate: string, request: Omit<RunReportRequest, "property" | "dateRanges">) {
  const [response] = await getClient().runReport({
    property: `properties/${GA4_PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate: "today" }],
    ...request,
  });
  return response;
}

function toRows(response: RunReportResponse): Row[] {
  return (response.rows ?? []).map((row) => ({
    label: row.dimensionValues?.[0]?.value || "(not set)",
    value: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}

function firstMetrics(response: RunReportResponse): number[] {
  return (response.rows?.[0]?.metricValues ?? []).map((m) => Number(m.value ?? 0));
}

/** Top values of one dimension, ranked by a metric. */
function breakdown(startDate: string, dimension: string, metric = "totalUsers", limit = 8, filter?: FilterExpression) {
  return report(startDate, {
    dimensions: [{ name: dimension }],
    metrics: [{ name: metric }],
    dimensionFilter: filter,
    orderBys: [{ metric: { metricName: metric }, desc: true }],
    limit,
  }).then(toRows);
}

// GA4 quotas are per property per day; a short cache stops refreshes from burning them.
const CACHE_TTL_MS = 10 * 60 * 1000;
const cache = new Map<DateRange, { at: number; data: DashboardData }>();

export async function fetchDashboardData(range: DateRange): Promise<DashboardData> {
  const cached = cache.get(range);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.data;

  const { startDate } = DATE_RANGES[range];

  const [
    totals,
    activityViewers,
    whatsapp,
    trend,
    countries,
    cities,
    devices,
    operatingSystems,
    languages,
    channels,
    sources,
    pages,
    whatsappByPage,
    whatsappByCountry,
  ] = await Promise.all([
    report(startDate, {
      metrics: [
        { name: "totalUsers" },
        { name: "newUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "userEngagementDuration" },
        { name: "activeUsers" },
      ],
    }).then(firstMetrics),
    report(startDate, { metrics: [{ name: "totalUsers" }], dimensionFilter: PRODUCT_PAGES }).then(firstMetrics),
    report(startDate, {
      metrics: [{ name: "totalUsers" }, { name: "eventCount" }],
      dimensionFilter: WHATSAPP_EVENT,
    }).then(firstMetrics),
    report(startDate, {
      dimensions: [{ name: "date" }],
      metrics: [{ name: "totalUsers" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
      limit: 100,
    }).then((response) =>
      toRows(response).map(({ label, value }) => ({
        date: `${label.slice(0, 4)}-${label.slice(4, 6)}-${label.slice(6, 8)}`,
        visitors: value,
      }))
    ),
    breakdown(startDate, "country"),
    breakdown(startDate, "city"),
    breakdown(startDate, "deviceCategory", "totalUsers", 4),
    breakdown(startDate, "operatingSystem", "totalUsers", 6),
    breakdown(startDate, "language", "totalUsers", 6),
    breakdown(startDate, "sessionDefaultChannelGroup", "sessions", 6),
    breakdown(startDate, "sessionSource", "sessions", 8),
    breakdown(startDate, "pageTitle", "screenPageViews", 8),
    breakdown(startDate, "pageTitle", "eventCount", 8, WHATSAPP_EVENT),
    breakdown(startDate, "country", "eventCount", 8, WHATSAPP_EVENT),
  ]);

  // Age and gender need Google Signals; GA4 returns nothing (or errors) without it.
  const [age, gender] = await Promise.all([
    breakdown(startDate, "userAgeBracket").catch(() => [] as Row[]),
    breakdown(startDate, "userGender").catch(() => [] as Row[]),
  ]);

  const [visitors = 0, newVisitors = 0, sessions = 0, pageViews = 0, engagement = 0, activeUsers = 0] = totals;

  const data: DashboardData = {
    totals: {
      visitors,
      newVisitors,
      sessions,
      pageViews,
      avgEngagementSeconds: activeUsers > 0 ? engagement / activeUsers : 0,
      activityViewers: activityViewers[0] ?? 0,
      whatsappVisitors: whatsapp[0] ?? 0,
      whatsappClicks: whatsapp[1] ?? 0,
    },
    trend,
    countries,
    cities,
    // Age brackets read naturally in age order ("18-24" ... "65+"), not ranked by count.
    age: age.filter((row) => row.label !== "unknown").sort((a, b) => a.label.localeCompare(b.label)),
    gender: gender.filter((row) => row.label !== "unknown"),
    devices,
    operatingSystems,
    languages,
    channels,
    sources,
    pages,
    whatsappByPage,
    whatsappByCountry,
    demographicsUnavailable: false,
  };
  data.demographicsUnavailable = data.age.length === 0 && data.gender.length === 0;

  cache.set(range, { at: Date.now(), data });
  return data;
}
