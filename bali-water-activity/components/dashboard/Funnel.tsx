interface FunnelProps {
  visitors: number;
  activityViewers: number;
  whatsappVisitors: number;
}

/** Visitors -> looked at something bookable -> contacted on WhatsApp. */
export default function Funnel({ visitors, activityViewers, whatsappVisitors }: FunnelProps) {
  const steps = [
    { label: "Visited the website", value: visitors },
    { label: "Looked at an activity or tour", value: activityViewers },
    { label: "Contacted you on WhatsApp", value: whatsappVisitors },
  ];
  const max = Math.max(visitors, 1);

  return (
    <section className="rounded-2xl border border-[var(--aq-line)] bg-[var(--aq-glass)] p-5">
      <header className="mb-4">
        <h2 className="text-sm font-semibold text-[var(--aq-text)]">From visit to WhatsApp</h2>
        <p className="mt-0.5 text-xs text-[var(--aq-muted)]">
          How many visitors move from browsing to messaging you. Counted as people, not clicks.
        </p>
      </header>

      <ol className="space-y-3">
        {steps.map((step, i) => {
          const previous = i > 0 ? steps[i - 1].value : null;
          const kept = previous ? Math.round((step.value / previous) * 100) : null;
          return (
            <li key={step.label}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3 text-xs">
                <span className="text-[var(--aq-text)]">{step.label}</span>
                <span className="tabular-nums text-[var(--aq-muted)]">
                  <span className="font-semibold text-[var(--aq-text)]">{step.value.toLocaleString("en-US")}</span>
                  {kept !== null && <span className="ml-2">{kept}% of previous step</span>}
                </span>
              </div>
              <div className="h-5 w-full overflow-hidden rounded-md bg-white/[0.06]">
                <div
                  className="h-full rounded-md bg-[var(--aq-aqua)]"
                  style={{ width: `${Math.max(1, (step.value / max) * 100)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ol>

      {visitors > 0 && (
        <p className="mt-4 border-t border-[var(--aq-line)] pt-3 text-xs text-[var(--aq-muted)]">
          <span className="font-semibold text-[var(--aq-text)]">
            {((whatsappVisitors / visitors) * 100).toFixed(1)}%
          </span>{" "}
          of all visitors contacted you on WhatsApp.
        </p>
      )}
    </section>
  );
}
