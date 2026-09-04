"use client";

// NOT RENDERED. Every figure below is placeholder data invented during the draft
// build. Re-enable in app/page.tsx only after real numbers are supplied — visitor
// and country splits can come from GA4 once NEXT_PUBLIC_GTM_ID is live.
import { useEffect, useRef, useState } from "react";
import { AU, EU, ID, SG } from "country-flag-icons/react/3x2";
import type { FlagComponent } from "country-flag-icons/react/3x2";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

const stats = [
  { value: 25000, suffix: "+", label: "Total Visitors", sublabel: "Since launch" },
  { value: 3500, suffix: "+", label: "Happy Customers", sublabel: "Worldwide" },
  { value: 4.9, suffix: "/5", label: "Average Rating", sublabel: "Customer reviews" },
  { value: 98, suffix: "%", label: "Satisfaction Rate", sublabel: "Would recommend" },
  { value: 8, suffix: "+", label: "Activities", sublabel: "To choose from" },
  { value: 4, suffix: "", label: "Destinations", sublabel: "Bali & beyond" },
];

const countries = [
  { country: "Australia", pct: 35, code: "AU", Flag: AU },
  { country: "Indonesia", pct: 25, code: "ID", Flag: ID },
  { country: "Singapore", pct: 15, code: "SG", Flag: SG },
  { country: "Europe", pct: 15, code: "EU", Flag: EU },
  { country: "Others", pct: 10, code: "OT" },
];

function CountryBadge({ code, country, Flag }: { code: string; country: string; Flag?: FlagComponent }) {
  if (Flag) {
    return (
      <span aria-label={`${country} flag`} className="mx-auto mb-2 flex  items-center justify-center overflow-hidden">
        <Flag className="h-auto w-10" />
      </span>
    );
  }

  return (
    <span className="mx-auto mb-2 flex h-7 min-w-10 items-center justify-center px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7b8da6]">
      {code}
    </span>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const isDecimal = value % 1 !== 0;
          const steps = 60;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const eased = 1 - Math.pow(1 - step / steps, 3);
            setCount(isDecimal ? parseFloat((eased * value).toFixed(1)) : Math.round(eased * value));
            if (step >= steps) clearInterval(timer);
          }, 25);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const display = value % 1 !== 0 ? count : count.toLocaleString("en-US");
  return <span ref={ref} className="tabular-nums">{display}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="section-gap bg-linear-to-b from-[#eef6ff] to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Numbers"
          title="Trusted by Thousands of Travelers"
          subtitle="Real results from real adventurers — from Australia to Europe to Southeast Asia."
        />

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={(i % 6) * 0.06}
              className="glass-card hover:bg-white/40 hover:border-golden/30 rounded-2xl p-5 text-center border border-gray-200/50 shadow-md transition-all duration-300"
            >
              <p className="font-display text-3xl text-[#0F1419] mb-1 font-bold">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-[#0F1419] font-bold text-sm">{s.label}</p>
              <p className="text-[#64748B] text-xs mt-0.5">{s.sublabel}</p>
            </Reveal>
          ))}
        </div>

        {/* Country distribution */}
        <div className="glass-card p-6 md:p-8 border border-[#d7e6f7] relative overflow-hidden bg-linear-to-b from-white to-[#eaf4ff] text-[#10233f] rounded-3xl shadow-xl shadow-sky-100/80">
          <p className="text-[#5f738d] text-[10px] font-bold uppercase tracking-[0.16em] text-center mb-6">
            Visitors by Country
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-5 relative z-10">
            {countries.map((c) => (
              <div key={c.country} className="text-center">
                <CountryBadge code={c.code} country={c.country} Flag={c.Flag} />
                <p className="text-[#10233f] text-sm font-semibold mb-2 mt-4">{c.country}</p>
                <div className="w-full bg-[#dbe8f5] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-golden to-orange"
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
                <p className="text-[#c67a00] text-sm font-bold mt-1.5">{c.pct}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
