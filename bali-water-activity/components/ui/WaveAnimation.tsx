"use client";

interface WaveAnimationProps {
  className?: string;
}

export default function WaveAnimation({ className = "w-full h-24 text-blue-400/30" }: WaveAnimationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
        fill="currentColor"
        opacity="0.3"
        className="animate-wave"
      />
      <path
        d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
        fill="currentColor"
        opacity="0.5"
        className="animate-wave-slow"
      />
      <path
        d="M0,70 Q300,40 600,70 T1200,70 L1200,120 L0,120 Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}
