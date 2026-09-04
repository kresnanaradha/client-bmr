import type { Row } from "@/lib/ga4";

interface BarListProps {
  title: string;
  subtitle?: string;
  rows: Row[];
  unit?: string;
  emptyMessage?: string;
  formatLabel?: (label: string) => string;
}

export default function BarList({
  title,
  subtitle,
  rows,
  unit = "visitors",
  emptyMessage = "No data for this period yet.",
  formatLabel,
}: BarListProps) {
  const max = rows.reduce((peak, row) => Math.max(peak, row.value), 0);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <header className="mb-4">
        <h2 className="text-sm font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
      </header>

      {rows.length === 0 ? (
        <p className="py-6 text-center text-xs text-slate-400">{emptyMessage}</p>
      ) : (
        <ol className="space-y-2.5">
          {rows.map((row) => {
            const pct = max > 0 ? Math.max(2, (row.value / max) * 100) : 0;
            return (
              <li key={row.label}>
                <div className="mb-1 flex items-baseline justify-between gap-3">
                  <span className="truncate text-xs font-medium text-slate-700">
                    {formatLabel ? formatLabel(row.label) : row.label}
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-slate-500">
                    {row.value.toLocaleString("en-US")}
                    <span className="ml-1 text-slate-400">{unit}</span>
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#1A2FB0] to-[#2196C4]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
