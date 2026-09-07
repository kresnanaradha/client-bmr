"use client";

import { useState, useEffect, useCallback } from "react";

interface FilterBarProps {
  onFilter: (filters: { maxPrice: number; minRating: number; sortBy: string }) => void;
}

export default function FilterBar({ onFilter }: FilterBarProps) {
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular");

  // Prevent infinite re-renders by wrapping onFilter or using dependency array checks
  useEffect(() => {
    onFilter({ maxPrice, minRating, sortBy });
  }, [maxPrice, minRating, sortBy, onFilter]);

  const handleReset = useCallback(() => {
    setMaxPrice(1000000);
    setMinRating(0);
    setSortBy("popular");
  }, []);

  return (
    <div className="aq-panel space-y-8 p-7 lg:sticky lg:top-28">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <h3 className="text-[16px] font-semibold text-[#EAF4F8]">Filters</h3>
        <button
          onClick={handleReset}
          className="cursor-pointer text-[12px] text-[#6E90A4] transition-colors hover:text-[#FFC48A]"
        >
          Reset All
        </button>
      </div>

      {/* Price Range */}
      <div>
        <label className="aq-label">Price Limit</label>
        <input
          type="range"
          min="50000"
          max="1000000"
          step="50000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/12 accent-[#F9913E]"
        />
        <div className="mt-3 flex justify-between text-[12px] text-[#6E90A4]">
          <span>IDR 50k</span>
          <span className="font-semibold text-[#FFC48A]">Under IDR {maxPrice.toLocaleString("en-US")}</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="aq-label">Minimum Rating</label>
        <div className="flex flex-wrap gap-2">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-all duration-200 ${
                minRating === r
                  ? "border-transparent bg-gradient-to-br from-[#FFC48A] to-[#F9913E] text-[#1B0E02]"
                  : "border-white/12 bg-white/4 text-[#8FB0C2] hover:border-white/25 hover:text-white"
              }`}
            >
              {r === 0 ? "Any" : `${r}★+`}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <label className="aq-label">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="aq-input cursor-pointer"
        >
          {[
            { v: "popular", l: "Most Popular" },
            { v: "price-low", l: "Price: Low to High" },
            { v: "price-high", l: "Price: High to Low" },
            { v: "rating", l: "Highest Rated" },
          ].map((o) => (
            <option key={o.v} value={o.v} className="bg-[#072334]">{o.l}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
