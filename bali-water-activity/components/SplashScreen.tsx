"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isPageLoaded = document.readyState === "complete";
    let hideTimer: number | undefined;

    const progressTimer = window.setInterval(() => {
      setProgress((currentProgress) => {
        if (isPageLoaded) {
          window.clearInterval(progressTimer);
          return 100;
        }

        const nextProgress = currentProgress + (currentProgress < 70 ? 7 : 2);
        return Math.min(nextProgress, 94);
      });
    }, 140);

    const finishSplash = () => {
      isPageLoaded = true;
      setProgress(100);
      setIsClosing(true);

      hideTimer = window.setTimeout(() => {
        setIsVisible(false);
      }, 700);
    };

    if (isPageLoaded) {
      finishSplash();
    } else {
      window.addEventListener("load", finishSplash, { once: true });
    }

    return () => {
      window.clearInterval(progressTimer);
      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }
      window.removeEventListener("load", finishSplash);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={[
        "fixed inset-0 z-100 flex items-center justify-center overflow-hidden",
        "ocean-page",
        "transition-opacity duration-700 ease-out",
        isClosing ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
      aria-hidden="true"
    >
      {/* Warm light rising from the deep — the same note the page ends on */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[760px] max-w-[140%] -translate-x-1/2 rounded-full bg-[#F9913E]/14 blur-[110px]" />

      <div className="animate-fade-in-up relative grid justify-items-center gap-7 px-8 py-8 text-center">
        <div className="w-52">
          <Image
            src="/logo.png"
            alt="Bali Water Activity"
            width={160}
            height={160}
            priority
            className="h-auto w-full object-contain"
          />
        </div>

        <p className="aq-display m-0 text-[clamp(2rem,4vw,3.25rem)] text-[#EAF4F8]">Bali Water Activity</p>
        <p className="m-0 max-w-md text-[clamp(0.9rem,2vw,1.05rem)] tracking-[0.06em] text-[#8FB0C2]">
          Watersport, rafting, and island escapes
        </p>

        <div
          className="mt-2 h-[3px] w-[min(20rem,72vw)] overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#3ED6E0_0%,#FFC48A_60%,#F9913E_100%)] shadow-[0_0_20px_rgba(249,145,62,0.45)] transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
