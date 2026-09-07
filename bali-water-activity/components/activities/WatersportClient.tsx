"use client";

import { useState, useMemo } from "react";
import { Activity } from "@/lib/activities";
import ActivityCard from "@/components/ActivityCard";
import FilterBar from "./FilterBar";

interface WatersportClientProps {
  initialActivities: Activity[];
}

export default function WatersportClient({ initialActivities }: WatersportClientProps) {
  const [filters, setFilters] = useState({
    maxPrice: 1000000,
    minRating: 0,
    sortBy: "popular",
  });

  // Enrich initialActivities with mock rating & reviews & parsed numerical price
  const enrichedActivities = useMemo(() => {
    return initialActivities.map((act) => {
      let rating = 4.7;
      let reviews = 120;
      let isPopular = false;

      // Assign realistic values based on slug
      if (act.slug === "banana-boat") {
        rating = 4.8;
        reviews = 245;
        isPopular = true;
      } else if (act.slug === "jet-ski") {
        rating = 4.9;
        reviews = 412;
        isPopular = true;
      } else if (act.slug === "parasailing") {
        rating = 4.9;
        reviews = 388;
        isPopular = true;
      } else if (act.slug === "fly-board") {
        rating = 4.9;
        reviews = 152;
      } else if (act.slug === "sea-walker") {
        rating = 4.8;
        reviews = 294;
        isPopular = true;
      } else if (act.slug === "donut-boat") {
        rating = 4.7;
        reviews = 134;
      } else if (act.slug === "disco-boat") {
        rating = 4.6;
        reviews = 85;
      } else if (act.slug === "fly-fish") {
        rating = 4.7;
        reviews = 98;
      }

      const numericPrice = parseInt(act.price.replace(/[^0-9]/g, "")) || 0;

      return {
        ...act,
        rating,
        reviews,
        isPopular,
        numericPrice,
      };
    });
  }, [initialActivities]);

  const filteredAndSortedActivities = useMemo(() => {
    // 1. Filter
    const result = enrichedActivities.filter((act) => {
      const matchesPrice = act.numericPrice <= filters.maxPrice;
      const matchesRating = act.rating >= filters.minRating;
      return matchesPrice && matchesRating;
    });

    // 2. Sort
    result.sort((a, b) => {
      if (filters.sortBy === "price-low") {
        return a.numericPrice - b.numericPrice;
      }
      if (filters.sortBy === "price-high") {
        return b.numericPrice - a.numericPrice;
      }
      if (filters.sortBy === "rating") {
        return b.rating - a.rating;
      }
      // "popular": sort by reviews desc
      return b.reviews - a.reviews;
    });

    return result;
  }, [enrichedActivities, filters]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      {/* Sidebar Filters */}
      <div className="lg:col-span-1">
        <FilterBar onFilter={setFilters} />
      </div>

      {/* Grid List */}
      <div className="lg:col-span-3">
        {filteredAndSortedActivities.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredAndSortedActivities.map((act) => (
              <ActivityCard
                key={act.slug}
                title={act.title}
                description={act.description}
                price={act.price}
                duration={act.duration}
                ageRange={act.ageRange}
                image={act.image}
                slug={act.slug}
                badge={act.badge}
              />
            ))}
          </div>
        ) : (
          <div className="aq-panel p-16 text-center">
            <p className="aq-display mb-3 text-[22px] text-[#EAF4F8]">No Activities Found</p>
            <p className="text-[14px] text-[#8FB0C2]">Try adjusting your filters to find your perfect adventure.</p>
          </div>
        )}
      </div>
    </div>
  );
}
