import type { Row } from "@/lib/ga4";

interface BarListProps {
  title: string;
  subtitle?: string;
  rows: Row[];
  unit?: string;
  emptyMessage?: string;
  formatLabel?: (label: string) => string;
}

/** Ranked horizontal bars: one series, so a single hue and the value printed beside each bar. */
export default function BarList({
  title,
  subtitle,
  rows,
  unit = "visitors",
  emptyMessage = "No data for this period yet.",
  formatLabel,
}: BarListProps) {
  const max = rows.reduce((peak, row) => Math.max(peak, row.value), 0);
  const total = rows.reduce((sum, row) => sum + row.value, 0);

  return (
    <section className="rounded-2xl border border-[var(--aq-line)] bg-[var(--aq-glass)] p-5">
      <header className="mb-4">
        <h2 className="text-sm font-semibold text-[var(--aq-text)]">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-[var(--aq-muted)]">{subtitle}</p>}
      </header>

      {rows.length === 0 ? (
        <p className="py-6 text-center text-xs leading-relaxed text-[var(--aq-muted)]">{emptyMessage}</p>
      ) : (
        <ol className="space-y-1">
          {rows.map((row) => {
            const label = formatLabel ? formatLabel(row.label) : row.label;
            const width = max > 0 ? Math.max(1.5, (row.value / max) * 100) : 0;
            const share = total > 0 ? Math.round((row.value / total) * 100) : 0;
            return (
              <li
                key={row.label}
                title={`${label}: ${row.value.toLocaleString("en-US")} ${unit} (${share}%)`}
                className="-mx-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/[0.04]"
              >
                <div className="mb-1.5 flex items-baseline justify-between gap-3 text-xs">
                  <span className="truncate text-[var(--aq-text)]">{label}</span>
                  <span className="shrink-0 tabular-nums text-[var(--aq-muted)]">
                    <span className="font-semibold text-[var(--aq-text)]">{row.value.toLocaleString("en-US")}</span>
                    <span className="ml-1.5 inline-block w-8 text-right">{share}%</span>
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full rounded-full bg-[var(--aq-aqua)]" style={{ width: `${width}%` }} />
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
