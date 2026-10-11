"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Experience } from "@/types";

interface ExperienceTimelineProps {
  experiences: Experience[];
  /** Full view lists every responsibility + achievement; preview shows the top 2 achievements. */
  detailed?: boolean;
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

export function ExperienceTimeline({ experiences, detailed = false }: ExperienceTimelineProps) {
  if (experiences.length === 0) {
    return (
      <p className="font-mono text-muted-foreground">
        <span className="text-destructive">ERR:</span> No experience entries found.
      </p>
    );
  }

  return (
    <ol className="relative pl-8 md:pl-12">
      {/* Neon data line */}
      <motion.span
        aria-hidden
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "linear" }}
        style={{ originY: 0 }}
        className="absolute left-2 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-accent via-accent-tertiary to-accent-secondary shadow-neon-sm"
      />

      {experiences.map((exp, index) => (
        <motion.li
          key={exp.id}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.3, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
          className="relative mb-10 last:mb-0"
        >
          {/* Node marker */}
          <span
            aria-hidden
            className="absolute -left-8 md:-left-12 top-12 translate-x-[3px] md:translate-x-[11px] size-3 rotate-45 bg-background border-2 border-accent shadow-neon"
          />

          <div className="cyber-glow-wrap">
            <Card variant="terminal" terminalTitle={`~/career/${slug(exp.company)}.log`} hoverEffect className="px-6 gap-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h3 className="text-xl md:text-2xl text-foreground">{exp.role}</h3>
                  <p className="font-label uppercase tracking-[0.15em] text-accent-tertiary mt-1">@ {exp.company}</p>
                </div>
                <Badge variant="secondary" className="self-start">{exp.duration}</Badge>
              </div>

              {detailed && exp.responsibilities.length > 0 && (
                <LogList heading="responsibilities" items={exp.responsibilities} marker=">" markerClass="text-accent" />
              )}

              <LogList
                heading={detailed ? "achievements" : undefined}
                items={detailed ? exp.achievements : exp.achievements.slice(0, 2)}
                marker="★"
                markerClass="text-warning"
              />
            </Card>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

function LogList({
  heading,
  items,
  marker,
  markerClass,
}: {
  heading?: string;
  items: string[];
  marker: string;
  markerClass: string;
}) {
  if (items.length === 0) return null;
  return (
    <div>
      {heading && (
        <h4 className="font-label text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
          {"// "}{heading}
        </h4>
      )}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm md:text-base text-foreground/80 leading-relaxed">
            <span aria-hidden className={`${markerClass} font-mono shrink-0`}>{marker}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
