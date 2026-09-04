import HeroSection from "@/components/home/HeroSection";
import ActivitiesSection from "@/components/home/ActivitiesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import DestinationsSection from "@/components/home/DestinationsSection";
import OperationalInfo from "@/components/home/OperationalInfo";
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
      <SafetySection />
      <OperationalInfo />
      <FaqSection />
      <CtaSection />
    </>
  );
}
