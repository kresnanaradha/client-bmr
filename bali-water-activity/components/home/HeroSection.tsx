"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const MOSAIC = [
  { src: "/activities/banana-boat.webp", alt: "Friends on a banana boat at Tanjung Benoa" },
  { src: "/activities/jet-ski.webp", alt: "Two riders on a jet ski with an instructor" },
  { src: "/activities/parasailing.webp", alt: "Tandem parasailing over the bay" },
  { src: "/activities/sea-walker.webp", alt: "Sea Walker guest surrounded by fish underwater" },
];

const smoothstep = (t: number) => t * t * (3 - 2 * t);

/**
 * Two screens tall: the first stays pinned while scrolling through the second,
 * and the framed video grows from a portrait card to the full viewport.
 */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const travel = Math.max(window.innerHeight, 1);
      const traveled = Math.min(Math.max(-section.getBoundingClientRect().top, 0), travel);
      setProgress(traveled / travel);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const e = smoothstep(progress);

  return (
    <section ref={sectionRef} aria-label="Introduction" className="relative h-[200vh] bg-ink">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2" style={{ opacity: 1 - e }} aria-hidden={e > 0.95}>
          {MOSAIC.map((photo, index) => (
            <div key={photo.src} className="relative min-h-0 overflow-hidden">
              <Image src={photo.src} alt={photo.alt} fill priority={index < 2} sizes="50vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0" style={{ backgroundColor: `rgba(11, 23, 54, ${0.6 - 0.22 * e})` }} />

        <div
          className="absolute left-1/2 overflow-hidden [--fh:320px] [--fw:240px] md:[--fh:480px] md:[--fw:360px]"
          style={{
            top: `calc(46% + ${4 * e}%)`,
            width: `calc(var(--fw) + (100vw - var(--fw)) * ${e})`,
            height: `calc(var(--fh) + (100vh - var(--fh)) * ${e})`,
            transform: "translate(-50%, -50%)",
            borderRadius: `${2 * (1 - e)}px`,
            outline: `1px solid rgba(255, 255, 255, ${0.4 * (1 - e)})`,
            outlineOffset: "10px",
          }}
        >
          <video
            src="/assets/hero-parasailing.mp4"
            poster="/assets/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Parasailing over Tanjung Benoa"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0" style={{ backgroundColor: `rgba(11, 23, 54, ${0.35 * e})` }} />
        </div>

        <div className="gutter absolute inset-x-0 bottom-0 pb-10 text-white md:pb-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
            <h1 className="t-hero">
              Bali Water
              <br />
              Activity
            </h1>
            <div className="max-w-sm md:pb-3">
              <p className="eyebrow mb-2 text-sun">Tanjung Benoa · Bali</p>
              <p className="text-[17px] leading-relaxed text-white/90">
                Jet ski, parasailing, sea walker and five more on the water, then the rivers, Nusa Penida and Komodo
                when you want to go further.
              </p>
            </div>
          </div>
        </div>

        <p
          className="eyebrow pointer-events-none absolute left-1/2 top-[calc(46%+260px)] hidden -translate-x-1/2 text-white/80 md:block"
          style={{ opacity: Math.max(1 - progress * 6, 0) }}
          aria-hidden="true"
        >
          Scroll
        </p>
      </div>
    </section>
  );
}
