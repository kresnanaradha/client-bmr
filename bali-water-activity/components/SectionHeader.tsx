interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
  size?: "md" | "lg";
}

export default function SectionHeader({
  eyebrow, title, subtitle, center = true, light = false, size = "md",
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 max-w-3xl mx-auto ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F5A623] mb-4">
          <span className="w-7 h-px bg-[#F5A623]" />
          {eyebrow}
          <span className="w-7 h-px bg-[#F5A623]" />
        </span>
      )}
      <h2
        className={`font-display leading-[1.08] tracking-[-0.02em] mb-5 ${
          size === "lg" ? "text-display-lg" : "text-display-md"
        } ${light ? "text-white" : "text-[#0C1A4A]"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base md:text-lg leading-relaxed max-w-2xl font-light ${
            center ? "mx-auto" : ""
          } ${light ? "text-blue-200" : "text-[#64748B]"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
