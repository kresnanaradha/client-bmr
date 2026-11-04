"use client";

import { useState } from "react";
import type { TrendPoint } from "@/lib/ga4";

const W = 800;
const H = 180;

function niceMax(value: number): number {
  if (value <= 0) return 10;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step = [1, 2, 2.5, 5, 10].find((s) => s * magnitude >= value) ?? 10;
  return step * magnitude;
}

const formatDay = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

export default function TrendChart({ points }: { points: TrendPoint[] }) {
  const [hover, setHover] = useState<number | null>(null);

  if (points.length < 2) {
    return (
      <section className="rounded-2xl border border-[var(--aq-line)] bg-[var(--aq-glass)] p-5">
        <h2 className="text-sm font-semibold text-[var(--aq-text)]">Visitors per day</h2>
        <p className="py-10 text-center text-xs text-[var(--aq-muted)]">Not enough days of data yet.</p>
      </section>
    );
  }

  const yMax = niceMax(Math.max(...points.map((p) => p.visitors)));
  const x = (i: number) => (i / (points.length - 1)) * W;
  const y = (v: number) => H - (v / yMax) * H;
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.visitors).toFixed(1)}`).join(" ");
  const area = `${line} L${W},${H} L0,${H} Z`;
  const active = hover === null ? null : points[hover];
  const activeLeft = hover === null ? 0 : (hover / (points.length - 1)) * 100;

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    setHover(Math.round(ratio * (points.length - 1)));
  };

  return (
    <section className="rounded-2xl border border-[var(--aq-line)] bg-[var(--aq-glass)] p-5">
      <header className="mb-4">
        <h2 className="text-sm font-semibold text-[var(--aq-text)]">Visitors per day</h2>
        <p className="mt-0.5 text-xs text-[var(--aq-muted)]">Unique people visiting the website each day.</p>
      </header>

      <div className="flex gap-3">
        <div className="flex h-[180px] flex-col justify-between text-right text-[10px] tabular-nums text-[var(--aq-muted)]">
          <span>{yMax}</span>
          <span>{yMax / 2}</span>
          <span>0</span>
        </div>

        <div className="min-w-0 flex-1">
          <div
            className="relative h-[180px] cursor-crosshair touch-none"
            onPointerMove={onMove}
            onPointerLeave={() => setHover(null)}
          >
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
              {[0, 0.5, 1].map((t) => (
                <line
                  key={t}
                  x1={0}
                  x2={W}
                  y1={H * t}
                  y2={H * t}
                  stroke="var(--aq-line)"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <path d={area} fill="var(--aq-aqua)" opacity={0.12} />
              <path
                d={line}
                fill="none"
                stroke="var(--aq-aqua)"
                strokeWidth={2}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {active && (
              <>
                <div className="pointer-events-none absolute inset-y-0 w-px bg-white/30" style={{ left: `${activeLeft}%` }} />
                <div
                  className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--aq-deep)] bg-[var(--aq-aqua)]"
                  style={{ left: `${activeLeft}%`, top: `${(y(active.visitors) / H) * 100}%` }}
                />
                <div
                  className="pointer-events-none absolute top-0 z-10 whitespace-nowrap rounded-lg border border-[var(--aq-line)] bg-[var(--aq-abyss)] px-2.5 py-1.5 text-xs shadow-lg"
                  style={{
                    left: `${activeLeft}%`,
                    transform: `translate(${activeLeft > 80 ? "-100%" : activeLeft < 20 ? "0" : "-50%"}, -110%)`,
                  }}
                >
                  <span className="text-[var(--aq-muted)]">{formatDay(active.date)}</span>
                  <span className="ml-2 font-semibold text-[var(--aq-text)]">
                    {active.visitors.toLocaleString("en-US")} visitors
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="mt-2 flex justify-between text-[10px] text-[var(--aq-muted)]">
            <span>{formatDay(points[0].date)}</span>
            <span>{formatDay(points[Math.floor(points.length / 2)].date)}</span>
            <span>{formatDay(points[points.length - 1].date)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
