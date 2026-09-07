"use client";
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
      <span aria-label={`${country} flag`} className="mx-auto mb-3 flex w-10 items-center justify-center overflow-hidden rounded-[3px] ring-1 ring-white/15">
        <Flag className="h-auto w-full" />
      </span>
    );
  }

  return (
    <span className="mx-auto mb-3 flex h-[27px] w-10 items-center justify-center rounded-[3px] bg-white/[0.06] text-[10px] font-bold uppercase tracking-[0.14em] text-[#8FB0C2] ring-1 ring-white/15">
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
    <section className="section-gap relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Numbers"
          title="Trusted by Thousands of Travelers"
          subtitle="Real results from real adventurers — from Australia to Europe to Southeast Asia."
          light
        />

        {/* Numbers read as one band split by hairlines, not six floating boxes */}
        <div className="aq-panel mb-4 grid grid-cols-2 gap-px overflow-hidden bg-white/[0.07] md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={(i % 6) * 0.06}
              className="bg-[#072334] px-5 py-9 text-center transition-colors duration-300 hover:bg-[#0A3247]"
            >
              <p className="aq-accent-text font-display text-[34px] font-semibold leading-none">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-[13px] font-semibold text-[#EAF4F8]">{s.label}</p>
              <p className="mt-1 text-[11px] text-[#6E90A4]">{s.sublabel}</p>
            </Reveal>
          ))}
        </div>

        {/* Country distribution */}
        <div className="aq-panel p-7 md:p-10">
          <p className="mb-8 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#6E90A4]">
            Visitors by Country
          </p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
            {countries.map((c) => (
              <div key={c.country} className="text-center">
                <CountryBadge code={c.code} country={c.country} Flag={c.Flag} />
                <p className="mb-3 text-[13px] font-semibold text-[#EAF4F8]">{c.country}</p>
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#3ED6E0] to-[#F9913E]"
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
                <p className="mt-2 text-[13px] font-bold text-[#FFC48A]">{c.pct}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
