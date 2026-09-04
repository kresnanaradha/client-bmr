interface FunnelProps {
  views: number;
  checkouts: number;
  leads: number;
}

export default function Funnel({ views, checkouts, leads }: FunnelProps) {
  const steps = [
    { label: "Viewed an activity", value: views, hint: "view_item" },
    { label: "Opened the booking form", value: checkouts, hint: "begin_checkout" },
    { label: "Sent a WhatsApp booking", value: leads, hint: "generate_lead" },
  ];
  const max = Math.max(views, 1);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <header className="mb-4">
        <h2 className="text-sm font-bold text-slate-900">Booking Funnel</h2>
        <p className="mt-0.5 text-xs text-slate-500">
          How many visitors get from browsing to a WhatsApp message.
        </p>
      </header>

      <ol className="space-y-3">
        {steps.map((step, i) => {
          const pct = (step.value / max) * 100;
          const previous = i === 0 ? null : steps[i - 1].value;
          const conversion = previous && previous > 0 ? (step.value / previous) * 100 : null;

          return (
            <li key={step.label}>
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <span className="text-xs font-medium text-slate-700">
                  {step.label}
                  <code className="ml-1.5 rounded bg-slate-100 px-1 py-0.5 text-[10px] text-slate-500">
                    {step.hint}
                  </code>
                </span>
                <span className="shrink-0 text-xs tabular-nums text-slate-500">
                  {step.value.toLocaleString("en-US")}
                  {conversion !== null && (
                    <span className="ml-1.5 font-semibold text-[#1A2FB0]">
                      {conversion.toFixed(0)}%
                    </span>
                  )}
                </span>
              </div>
              <div className="h-6 w-full overflow-hidden rounded-lg bg-slate-100">
                <div
                  className="flex h-full items-center rounded-lg bg-gradient-to-r from-[#1A2FB0] to-[#2196C4]"
                  style={{ width: `${Math.max(pct, 1.5)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ol>

      {views > 0 && (
        <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
          Overall, {((leads / views) * 100).toFixed(1)}% of activity views turn into a WhatsApp
          booking request.
        </p>
      )}
    </section>
  );
}
