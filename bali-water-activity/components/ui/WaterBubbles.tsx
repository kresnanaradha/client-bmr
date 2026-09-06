interface Bubble {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
}

// Deterministic so the server and client markup match; Math.random() here would
// either desync hydration or force a post-mount setState.
function pseudoRandom(seed: number): number {
  return (Math.sin(seed * 12.9898) * 43758.5453) % 1;
}

const BUBBLES: Bubble[] = Array.from({ length: 12 }, (_, i) => {
  const a = Math.abs(pseudoRandom(i + 1));
  const b = Math.abs(pseudoRandom(i + 100));
  const c = Math.abs(pseudoRandom(i + 200));
  const d = Math.abs(pseudoRandom(i + 300));
  // Rounded: React serializes inline styles to limited precision on the server,
  // so full-precision floats hydrate as a mismatch.
  const round = (n: number) => Math.round(n * 100) / 100;
  return {
    id: i,
    size: round(a * 30 + 10),
    left: round(b * 100),
    delay: round(c * 6),
    duration: round(d * 6 + 6),
  };
});

export default function WaterBubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none z-0">
      {BUBBLES.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-br from-white to-blue-200 animate-float-bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: "-50px",
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
