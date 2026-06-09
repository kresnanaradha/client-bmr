import HeroSection from "@/components/home/HeroSection";
import ActivitiesSection from "@/components/home/ActivitiesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import DestinationsSection from "@/components/home/DestinationsSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import SafetySection from "@/components/home/SafetySection";
import FaqSection from "@/components/home/FaqSection";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ActivitiesSection />
      <WhyChooseUs />
      <DestinationsSection />
      <StatsSection />
      <TestimonialsSection />
      <SafetySection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
