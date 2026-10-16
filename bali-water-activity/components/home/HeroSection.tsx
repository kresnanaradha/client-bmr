import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import HeroContent from "./HeroContent";

/*
 * Using real client photography — aerial banana boat at Bali sunset.
 * Video: assets-watersport.mp4 (same location footage)
 * This is the $10K move: imagery that feels commissioned, not stock.
 */
export default function HeroSection() {
  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc="/assets/hero-parasailing.mp4"
      posterSrc="/assets/hero-poster.jpg"
      bgImageSrc={[
        "/activities/banana-boat.webp",
        "/activities/jet-ski.webp",
        "/activities/parasailing.webp",
        "/activities/sea-walker.webp",
      ]}
      title="Bali Water Activity"
      location="Tanjung Benoa · Bali"
      scrollToExpand="Scroll to explore"
      textBlend={false}
    >
      <HeroContent />
    </ScrollExpandMedia>
  );
}
