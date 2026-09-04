import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Users, MousePointerClick, MessageCircle, Globe } from "lucide-react";
import {
  DATE_RANGES,
  IS_GA4_CONFIGURED,
  fetchDashboardData,
  type DashboardData,
  type DateRange,
} from "@/lib/ga4";
import { IS_SAMPLE_MODE, sampleDashboardData } from "@/lib/ga4-sample";
import BarList from "@/components/dashboard/BarList";
import Funnel from "@/components/dashboard/Funnel";

export const metadata: Metadata = {
  title: "Visitor Dashboard",
  robots: { index: false, follow: false },
};

// Traffic figures should not be frozen into the static build.
export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ range?: string }>;
}

const LANGUAGE_NAMES = new Intl.DisplayNames(["en"], { type: "language" });

function prettyLanguage(tag: string): string {
  try {
    return LANGUAGE_NAMES.of(tag) ?? tag;
  } catch {
    return tag;
  }
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Users;
  label: string;
  value: number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#1A2FB0]/10">
        <Icon size={16} className="text-[#1A2FB0]" />
      </div>
      <p className="text-2xl font-bold leading-none text-slate-900 tabular-nums">
        {value.toLocaleString("en-US")}
      </p>
      <p className="mt-1.5 text-xs font-medium text-slate-600">{label}</p>
      {hint && <p className="mt-0.5 text-[11px] text-slate-400">{hint}</p>}
    </div>
  );
}

function SetupNotice() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
      <div className="mb-3 flex items-center gap-2">
        <AlertTriangle size={18} className="text-amber-600" />
        <h2 className="font-bold text-amber-900">Analytics not connected yet</h2>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-amber-900">
        This dashboard reads live visitor data from Google Analytics 4. It needs a GA4 property and a
        read-only service account before it can show anything.
      </p>
      <ol className="space-y-2 text-sm text-amber-900">
        <li>1. Create a GA4 property and put its Measurement ID in a Google Tag Manager container.</li>
        <li>
          2. Set <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_GTM_ID</code> so the site
          starts sending events.
        </li>
        <li>
          3. Create a Google Cloud service account, give it <em>Viewer</em> on the GA4 property, and
          set <code className="rounded bg-amber-100 px-1">GA4_PROPERTY_ID</code>,{" "}
          <code className="rounded bg-amber-100 px-1">GA4_CLIENT_EMAIL</code> and{" "}
          <code className="rounded bg-amber-100 px-1">GA4_PRIVATE_KEY</code>.
        </li>
      </ol>
      <p className="mt-4 text-xs leading-relaxed text-amber-800">
        Country, city, language and device data appear as soon as traffic arrives. Age and gender
        additionally require Google Signals, and stay hidden until the audience is large enough for
        Google&apos;s privacy threshold — neither needs a Google Ads account.
      </p>
    </div>
  );
}

export default async function DashboardPage({ searchParams }: Props) {
  const params = await searchParams;
  const range: DateRange =
    params.range === "28d" || params.range === "90d" ? params.range : "7d";

  let data: DashboardData | null = null;
  let error: string | null = null;

  if (IS_SAMPLE_MODE) {
    data = sampleDashboardData(range);
  } else if (IS_GA4_CONFIGURED) {
    try {
      data = await fetchDashboardData(range);
    } catch (cause: unknown) {
      error = cause instanceof Error ? cause.message : "Could not reach Google Analytics.";
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Bali Water Activity
            </p>
            <h1 className="font-display text-3xl leading-tight text-slate-900">Visitor Dashboard</h1>
            <p className="mt-1 text-sm text-slate-600">
              Where your visitors come from, and how many of them start a booking.
            </p>
          </div>
          <Link href="/" className="text-xs font-medium text-[#1A2FB0] hover:underline">
            ← Back to site
          </Link>
        </header>

        <nav className="mb-6 flex gap-2">
          {(Object.keys(DATE_RANGES) as DateRange[]).map((key) => (
            <Link
              key={key}
              href={`/dashboard?range=${key}`}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                range === key
                  ? "border-[#1A2FB0] bg-[#1A2FB0] text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              {DATE_RANGES[key].label}
            </Link>
          ))}
        </nav>

        {IS_SAMPLE_MODE && (
          <div className="mb-6 flex items-start gap-2.5 rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50 p-4">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-orange-600" />
            <div>
              <p className="text-sm font-bold text-orange-900">
                Sample data — these are not real visitors
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-orange-800">
                Every number below is invented to demonstrate the layout. Unset{" "}
                <code className="rounded bg-orange-100 px-1">DASHBOARD_SAMPLE_DATA</code> to show
                real Google Analytics data.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">
            <h2 className="mb-1 font-bold text-red-900">Could not load analytics</h2>
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {!data && !error && <SetupNotice />}

        {data && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={Users} label="Visitors" value={data.totals.users} hint="Unique people" />
              <StatCard icon={Globe} label="Sessions" value={data.totals.sessions} hint="Total visits" />
              <StatCard
                icon={MousePointerClick}
                label="Booking forms opened"
                value={data.totals.checkouts}
              />
              <StatCard
                icon={MessageCircle}
                label="WhatsApp bookings"
                value={data.totals.leads}
                hint="Sent to the operator"
              />
            </div>

            <Funnel
              views={data.totals.views}
              checkouts={data.totals.checkouts}
              leads={data.totals.leads}
            />

            <div className="grid gap-5 lg:grid-cols-2">
              <BarList
                title="Countries"
                subtitle="Where your visitors are browsing from."
                rows={data.countries}
              />
              <BarList title="Cities" subtitle="Top locations by visitor count." rows={data.cities} />
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <BarList
                title="Devices"
                subtitle="Mobile share matters for the booking button."
                rows={data.devices}
                formatLabel={(l) => l.charAt(0).toUpperCase() + l.slice(1)}
              />
              <BarList
                title="Languages"
                subtitle="Browser language of your visitors."
                rows={data.languages}
                formatLabel={prettyLanguage}
              />
            </div>

            {data.activities.length > 0 && (
              <BarList
                title="Most viewed activities"
                subtitle="Which activities people open most."
                rows={data.activities}
                unit="views"
              />
            )}

            <div className="grid gap-5 lg:grid-cols-2">
              <BarList
                title="Age"
                subtitle="Requires Google Signals."
                rows={data.age}
                emptyMessage="Not available yet — needs Google Signals enabled and enough traffic to pass Google's privacy threshold."
              />
              <BarList
                title="Gender"
                subtitle="Requires Google Signals."
                rows={data.gender}
                emptyMessage="Not available yet — needs Google Signals enabled and enough traffic to pass Google's privacy threshold."
              />
            </div>

            {data.demographicsUnavailable && !IS_SAMPLE_MODE && (
              <p className="rounded-2xl border border-slate-200 bg-white p-4 text-xs leading-relaxed text-slate-500">
                <strong className="text-slate-700">About age and gender:</strong> Google only reports
                these for signed-in users who allow ad personalisation, and hides the rows entirely
                until the audience is large enough to keep individuals anonymous. Country, city,
                language and device data above are unaffected and always available.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
