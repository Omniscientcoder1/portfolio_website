"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/TiltCard";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import type { Testimonial } from "@/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const update = () => setDragWidth(el.scrollWidth - el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [testimonials]);

  const useCarousel = testimonials.length > 2;

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/4 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <AnimatedHeading text="Testimonials" className="text-4xl md:text-5xl font-bold mb-4" />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-foreground/60 max-w-2xl mx-auto"
          >
            Feedback from colleagues and collaborators
          </motion.p>
        </div>

        {useCarousel ? (
          <>
            {/* Drag hint */}
            {!hasInteracted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm text-foreground/40 mb-6 select-none"
              >
                ← drag to explore →
              </motion.p>
            )}

            {/* Carousel */}
            <div
              ref={carouselRef}
              className="overflow-hidden cursor-grab active:cursor-grabbing"
            >
              <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -dragWidth }}
                dragElastic={0.08}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                onDragStart={() => { setIsDragging(true); setHasInteracted(true); }}
                onDragEnd={() => setIsDragging(false)}
                className="flex gap-6 pb-4"
                style={{ width: "max-content" }}
              >
                {testimonials.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="w-[300px] sm:w-[360px] flex-shrink-0"
                  >
                    <TiltCard intensity={isDragging ? 0 : 7} className="h-full">
                      <div className="glass-card rounded-2xl p-6 h-full flex flex-col select-none">
                        <p className="text-foreground/75 leading-relaxed mb-5 flex-1">
                          &ldquo;{item.content}&rdquo;
                        </p>
                        <div className="pt-4 border-t border-blue-400/20">
                          <h3 className="font-bold text-lg">{item.name}</h3>
                          <p className="text-sm text-blue-400/90 mt-1">
                            {item.role}{item.company ? ` at ${item.company}` : ""}
                          </p>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </>
        ) : (
          /* Fallback grid for 0–2 testimonials */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, rotateY: -30, scale: 0.95 }}
                whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.12, type: "spring", stiffness: 100 }}
                style={{ perspective: "800px" }}
              >
                <TiltCard intensity={7}>
                  <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
                    <p className="text-foreground/75 leading-relaxed mb-5 flex-1">
                      &ldquo;{item.content}&rdquo;
                    </p>
                    <div className="pt-4 border-t border-blue-400/20">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-sm text-blue-400/90 mt-1">
                        {item.role}{item.company ? ` at ${item.company}` : ""}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        )}

        {testimonials.length === 0 && (
          <p className="text-center text-foreground/50 mt-6">
            No testimonials have been added yet.
          </p>
        )}
      </div>
    </section>
  );
}
