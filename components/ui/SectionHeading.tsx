import { cn } from "@/lib/utils";
import { GlitchText } from "@/components/ui/GlitchText";

interface SectionHeadingProps {
  /** Small HUD label above the title, e.g. "01 // projects" */
  label: string;
  title: string;
  description?: string;
  /** h1 for page headers, h2 for in-page sections */
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
}

/**
 * Consistent section/page header: terminal-path label, glitched title,
 * and a description that trails off with a blinking cursor.
 */
export function SectionHeading({
  label,
  title,
  description,
  as: Tag = "h2",
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <header className={cn("mb-14", centered && "text-center", className)}>
      <p
        className={cn(
          "font-label text-xs uppercase tracking-[0.3em] text-accent mb-4 flex items-center gap-3",
          centered && "justify-center"
        )}
      >
        <span aria-hidden className="h-px w-8 bg-accent shadow-neon-sm" />
        {label}
      </p>

      <Tag
        className={cn(
          "text-foreground leading-[1.05] [overflow-wrap:anywhere]",
          Tag === "h1" ? "text-3xl sm:text-5xl md:text-6xl" : "text-3xl sm:text-4xl md:text-5xl"
        )}
      >
        <GlitchText text={title} />
      </Tag>

      {description && (
        <p
          className={cn(
            "mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl cyber-cursor",
            centered && "mx-auto"
          )}
        >
          <span className="text-accent-tertiary">$ </span>
          {description}
        </p>
      )}
    </header>
  );
}
