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
    <div className={`mb-14 md:mb-20 max-w-3xl ${center ? "text-center mx-auto items-center" : ""} flex flex-col`}>
      {eyebrow && (
        <span className={`aq-eyebrow mb-6 ${light ? "" : "text-[#B4661C]"}`}>{eyebrow}</span>
      )}
      <h2
        className={`aq-display mb-5 ${
          size === "lg" ? "text-display-lg" : "text-display-md"
        } ${light ? "text-[color:var(--aq-text)]" : "text-[#0C1A4A]"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base md:text-[17px] leading-[1.75] max-w-2xl font-light ${
            center ? "mx-auto" : ""
          } ${light ? "text-[color:var(--aq-muted)]" : "text-[#64748B]"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
