import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
}

/**
 * Chromatic-aberration text with an occasional glitch burst.
 * The pseudo-element copies come from `data-text`, so `text` must be a plain string.
 */
export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <span className={cn("cyber-glitch", className)} data-text={text}>
      {text}
    </span>
  );
}
