import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ActivityIndex from "@/components/home/ActivityIndex";
import FaqSection from "@/components/home/FaqSection";
import { BeforeYouGo, BeyondSection, BookingSteps, ClosingCta, SectionHead } from "@/components/sections/Sections";
import { watersportActivities } from "@/lib/activities";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section aria-labelledby="watersports-title" className="gutter py-24 md:py-32">
        <SectionHead
          id="watersports-title"
          eyebrow="The bay, by the minute"
          title={
            <>
              Watersports at <em>Tanjung Benoa</em>
            </>
          }
          intro="Prices per person. Instructor, life jacket and activity insurance are included."
        />
        <ActivityIndex activities={watersportActivities} />
      </section>

      <BeyondSection />
      <BookingSteps />
      <BeforeYouGo />
      <FaqSection />
      <ClosingCta />
    </>
  );
}
