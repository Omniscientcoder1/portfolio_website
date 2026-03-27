"use client";

import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/TiltCard";
import type { Testimonial } from "@/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/4 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          style={{ transformStyle: "preserve-3d", perspective: "800px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Testimonials</h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Feedback managed through the admin panel
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      {item.role} {item.company ? `at ${item.company}` : ""}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <p className="text-center text-foreground/50 mt-6">
            No testimonials have been added yet.
          </p>
        )}
      </div>
    </section>
  );
}

