"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div aria-hidden className="absolute inset-0 cyber-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />

      <div className="relative max-w-7xl mx-auto">
        <SectionHeading
          label="03 // incoming_transmissions"
          title="Testimonials"
          description="Feedback managed through the admin panel"
        />

        {testimonials.length === 0 ? (
          <p className="font-mono text-muted-foreground">
            <span className="text-destructive">ERR:</span> No testimonials have been added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:pb-12">
            {testimonials.map((item, index) => (
              <motion.figure
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
                className={cn("cyber-glow-wrap", index % 3 === 1 && "lg:translate-y-12")}
              >
                <Card hoverEffect className="h-full px-6 gap-5">
                  <span aria-hidden className="font-mono text-3xl leading-none text-accent-secondary text-glow">
                    {"/*"}
                  </span>
                  <blockquote className="flex-1 text-foreground/80 leading-relaxed">
                    {item.content}
                  </blockquote>
                  <figcaption className="pt-4 border-t border-border flex items-center gap-3">
                    <span
                      aria-hidden
                      className="cyber-chamfer-sm size-10 grid place-items-center bg-accent/10 text-accent font-heading font-bold"
                    >
                      {item.name.charAt(0)}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-heading text-sm uppercase tracking-wide text-foreground truncate">
                        {item.name}
                      </span>
                      <span className="block font-label text-xs uppercase tracking-[0.15em] text-accent-tertiary truncate">
                        {item.role}
                        {item.company ? ` @ ${item.company}` : ""}
                      </span>
                    </span>
                  </figcaption>
                </Card>
              </motion.figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
