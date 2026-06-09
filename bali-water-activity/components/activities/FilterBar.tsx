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
    <div className="glass-card p-6 space-y-6 text-white border border-white/12">
      <div className="flex justify-between items-center pb-4 border-b border-white/10">
        <h3 className="text-lg font-bold">Filters</h3>
        <button
          onClick={handleReset}
          className="text-xs text-blue-200 hover:text-white transition-colors cursor-pointer"
        >
          Reset All
        </button>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm text-blue-200 font-semibold mb-3">Price Limit</label>
        <div className="space-y-3">
          <input
            type="range"
            min="50000"
            max="1000000"
            step="50000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
          />
          <div className="flex justify-between text-xs text-blue-200/80">
            <span>IDR 50k</span>
            <span className="font-bold text-[#FFD700]">Under IDR {maxPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="block text-sm text-blue-200 font-semibold mb-3">Minimum Rating</label>
        <div className="flex gap-1.5 flex-wrap">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`glass px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                minRating === r
                  ? "bg-[#FFD700] border-[#FFD700] text-black shadow-lg shadow-yellow-500/25 animate-pulse"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
              }`}
            >
              {r === 0 ? "Any" : `${r}★+`}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <label className="block text-sm text-blue-200 font-semibold mb-3">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="glass-input w-full bg-black/35 border-white/10 text-white rounded-xl py-2.5 px-3 focus:border-white/30"
        >
          <option value="popular" className="bg-[#0F1419] text-white">Most Popular</option>
          <option value="price-low" className="bg-[#0F1419] text-white">Price: Low to High</option>
          <option value="price-high" className="bg-[#0F1419] text-white">Price: High to Low</option>
          <option value="rating" className="bg-[#0F1419] text-white">Highest Rated</option>
        </select>
      </div>
    </div>
  );
}
