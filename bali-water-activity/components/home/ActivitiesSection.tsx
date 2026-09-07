import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ActivityCard from "@/components/ActivityCard";
import Reveal from "@/components/Reveal";
import { watersportActivities } from "@/lib/activities";
import { ArrowRight } from "lucide-react";

export default function ActivitiesSection() {
  const featured = watersportActivities.slice(0, 4);

  return (
    <section id="activities" className="section-gap relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Popular Activities"
          title="Thrill Starts Here"
          subtitle="From adrenaline-pumping rides to serene underwater walks — we have the perfect Bali water activity for every traveler."
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((act, i) => (
            <Reveal key={act.slug} delay={(i % 4) * 0.08} className="h-full">
              <ActivityCard
                title={act.title}
                description={act.description}
                price={act.price}
                duration={act.duration}
                ageRange={act.ageRange}
                image={act.image}
                slug={act.slug}
              />
            </Reveal>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link href="/watersport" className="aq-btn-ghost">
            View All Activities <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
