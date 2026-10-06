import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Clock, MessageCircle, UserPlus, Users } from "lucide-react";
import { DATE_RANGES, IS_GA4_CONFIGURED, fetchDashboardData, type DashboardData, type DateRange } from "@/lib/ga4";
import { IS_SAMPLE_MODE, sampleDashboardData } from "@/lib/ga4-sample";
import BarList from "@/components/dashboard/BarList";
import Funnel from "@/components/dashboard/Funnel";
import TrendChart from "@/components/dashboard/TrendChart";

export const metadata: Metadata = {
  title: "Visitor Dashboard",
  robots: { index: false, follow: false },
};

// Traffic figures must not be frozen into the static build.
export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ range?: string }>;
}

const LANGUAGE_NAMES = new Intl.DisplayNames(["en"], { type: "language" });

function languageName(tag: string): string {
  try {
    return LANGUAGE_NAMES.of(tag) ?? tag;
  } catch {
    return tag;
  }
}

const capitalise = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const sourceName = (value: string) =>
  value === "(direct)" ? "Direct (typed the address or a bookmark)" : value === "(not set)" ? "Unknown" : value;

function duration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

interface StatProps {
  icon: typeof Users;
  label: string;
  value: string;
  hint: string;
}

function Stat({ icon: Icon, label, value, hint }: StatProps) {
  return (
    <div className="rounded-2xl border border-[var(--aq-line)] bg-[var(--aq-glass)] p-5">
      <div className="mb-3 flex items-center gap-2 text-xs text-[var(--aq-muted)]">
        <Icon size={14} className="text-[var(--aq-aqua)]" />
        {label}
      </div>
      <p className="text-3xl font-light tabular-nums leading-none text-[var(--aq-text)]">{value}</p>
      <p className="mt-2 text-xs text-[var(--aq-muted)]">{hint}</p>
    </div>
  );
}

function SectionTitle({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div className="mb-3 mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--aq-sand)]">{children}</h2>
      {note && <p className="text-xs text-[var(--aq-muted)]">{note}</p>}
    </div>
  );
}

function SetupNotice() {
  return (
    <div className="rounded-2xl border border-[var(--aq-line)] bg-[var(--aq-glass)] p-6">
      <div className="mb-3 flex items-center gap-2">
        <AlertTriangle size={18} className="text-[var(--aq-sand)]" />
        <h2 className="font-semibold text-[var(--aq-text)]">Analytics not connected yet</h2>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-[var(--aq-muted)]">
        This dashboard shows live data from Google Analytics 4. It needs two things:
      </p>
      <ol className="space-y-2 text-sm leading-relaxed text-[var(--aq-muted)]">
        <li>
          1. A GA4 property. Put its measurement ID in{" "}
          <code className="rounded bg-white/10 px-1 text-[var(--aq-text)]">NEXT_PUBLIC_GA_ID</code> so the site starts
          collecting visits.
        </li>
        <li>
          2. A read-only Google Cloud service account added to that property as a Viewer, set in{" "}
          <code className="rounded bg-white/10 px-1 text-[var(--aq-text)]">GA4_PROPERTY_ID</code>,{" "}
          <code className="rounded bg-white/10 px-1 text-[var(--aq-text)]">GA4_CLIENT_EMAIL</code> and{" "}
          <code className="rounded bg-white/10 px-1 text-[var(--aq-text)]">GA4_PRIVATE_KEY</code>.
        </li>
      </ol>
    </div>
  );
}

export default async function DashboardPage({ searchParams }: Props) {
  const params = await searchParams;
  const range: DateRange = params.range === "28d" || params.range === "90d" ? params.range : "7d";

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

  const t = data?.totals;

  return (
    <div className="ocean-page min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--aq-sand)]">
              Bali Water Activity · Admin
            </p>
            <h1 className="mt-1 text-3xl font-light text-[var(--aq-text)]">Visitor Dashboard</h1>
            <p className="mt-1 text-sm text-[var(--aq-muted)]">
              Who visits the website, where they come from, and who contacts you.
            </p>
          </div>
          <Link href="/" className="text-xs text-[var(--aq-muted)] hover:text-[var(--aq-text)]">
            ← Back to website
          </Link>
        </header>

        <nav className="mb-6 flex flex-wrap gap-2" aria-label="Date range">
          {(Object.keys(DATE_RANGES) as DateRange[]).map((key) => (
            <Link
              key={key}
              href={`/dashboard?range=${key}`}
              aria-current={range === key ? "page" : undefined}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                range === key
                  ? "border-[var(--aq-aqua)] bg-[var(--aq-aqua)] text-[var(--aq-abyss)]"
                  : "border-[var(--aq-line)] text-[var(--aq-muted)] hover:text-[var(--aq-text)]"
              }`}
            >
              {DATE_RANGES[key].label}
            </Link>
          ))}
        </nav>

        {IS_SAMPLE_MODE && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border-2 border-dashed border-[var(--aq-coral)]/60 bg-[var(--aq-coral)]/10 p-4">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-[var(--aq-coral)]" />
            <div>
              <p className="text-sm font-semibold text-[var(--aq-text)]">Sample data: these are not real visitors</p>
              <p className="mt-0.5 text-xs leading-relaxed text-[var(--aq-muted)]">
                Every number below is invented to show the layout. Real numbers appear once Google Analytics is
                connected.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-5">
            <h2 className="mb-1 font-semibold text-[var(--aq-text)]">Could not load analytics</h2>
            <p className="text-sm text-[var(--aq-muted)]">{error}</p>
          </div>
        )}

        {!data && !error && <SetupNotice />}

        {data && t && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Stat icon={Users} label="Visitors" value={t.visitors.toLocaleString("en-US")} hint={`${t.sessions.toLocaleString("en-US")} visits, ${t.pageViews.toLocaleString("en-US")} pages viewed`} />
              <Stat
                icon={UserPlus}
                label="New visitors"
                value={`${t.visitors ? Math.round((t.newVisitors / t.visitors) * 100) : 0}%`}
                hint={`${t.newVisitors.toLocaleString("en-US")} first-time, the rest came back`}
              />
              <Stat icon={Clock} label="Time on site" value={duration(t.avgEngagementSeconds)} hint="Average actively spent per visitor" />
              <Stat
                icon={MessageCircle}
                label="WhatsApp contacts"
                value={t.whatsappVisitors.toLocaleString("en-US")}
                hint={`${t.whatsappClicks.toLocaleString("en-US")} WhatsApp button clicks in total`}
              />
            </div>

            <div className="mt-4">
              <TrendChart points={data.trend} />
            </div>

            <SectionTitle>Who they are</SectionTitle>
            <div className="grid gap-4 lg:grid-cols-2">
              <BarList title="Country" subtitle="Where visitors are browsing from." rows={data.countries} />
              <BarList title="City" subtitle="Many visitors already in Bali show as Denpasar." rows={data.cities} />
              <BarList
                title="Age"
                subtitle="Estimated by Google for signed-in visitors."
                rows={data.age}
                emptyMessage="Not available yet. Needs Google Signals turned on and enough visitors to pass Google's privacy threshold."
              />
              <BarList
                title="Gender"
                subtitle="Estimated by Google for signed-in visitors."
                rows={data.gender}
                formatLabel={capitalise}
                emptyMessage="Not available yet. Needs Google Signals turned on and enough visitors to pass Google's privacy threshold."
              />
            </div>
            {data.demographicsUnavailable && !IS_SAMPLE_MODE && (
              <p className="mt-3 text-xs leading-relaxed text-[var(--aq-muted)]">
                Google only estimates age and gender for visitors signed into a Google account who allow
                personalisation, and hides them until there are enough visitors to keep people anonymous. Every
                other section is unaffected.
              </p>
            )}

            <SectionTitle note="Counted as visits.">How they find you</SectionTitle>
            <div className="grid gap-4 lg:grid-cols-2">
              <BarList title="Channel" subtitle="Search, social media, direct, or a link on another site." rows={data.channels} unit="visits" />
              <BarList title="Source" subtitle="The exact site or app they came from." rows={data.sources} unit="visits" formatLabel={sourceName} />
            </div>

            <SectionTitle>What they look at</SectionTitle>
            <div className="grid gap-4 lg:grid-cols-2">
              <BarList title="Most viewed pages" rows={data.pages} unit="views" />
              <Funnel visitors={t.visitors} activityViewers={t.activityViewers} whatsappVisitors={t.whatsappVisitors} />
            </div>

            <SectionTitle note="WhatsApp button clicks.">Who contacts you</SectionTitle>
            <div className="grid gap-4 lg:grid-cols-2">
              <BarList title="Page they clicked from" subtitle="Which pages turn visitors into conversations." rows={data.whatsappByPage} unit="clicks" />
              <BarList title="Country of those who clicked" rows={data.whatsappByCountry} unit="clicks" />
            </div>

            <SectionTitle>Devices</SectionTitle>
            <div className="grid gap-4 lg:grid-cols-3">
              <BarList title="Device" rows={data.devices} formatLabel={capitalise} />
              <BarList title="Operating system" rows={data.operatingSystems} />
              <BarList title="Browser language" rows={data.languages} formatLabel={languageName} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
