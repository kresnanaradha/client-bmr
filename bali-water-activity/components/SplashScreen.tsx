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
        "bg-[linear-gradient(160deg,#E56E42_0%,#0052CC_100%)]",
        "transition-opacity duration-700 ease-out",
        isClosing ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
      aria-hidden="true"
    >
      <div className="animate-fade-in-up relative grid justify-items-center gap-6 px-8 py-8 text-center text-white">
        <div className="w-60">
          <Image
            src="/logo.png"
            alt="Bali Water Activity"
            width={160}
            height={160}
            priority
            className="h-auto w-full object-contain"
          />
        </div>
        <p className="m-0 font-display text-[clamp(2rem,4vw,3.25rem)] leading-none">Bali Water Activity</p>
        <p className="m-0 max-w-md text-[clamp(0.95rem,2vw,1.1rem)] tracking-[0.08em] text-white/78">Watersport, rafting, and island escapes</p>
        <div
          className="mt-3 h-2 w-[min(22rem,78vw)] overflow-hidden rounded-full bg-white/16 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#ffd700_0%,#ff9500_35%,#7ce7f0_100%)] shadow-[0_0_24px_rgba(255,215,0,0.35)] transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
