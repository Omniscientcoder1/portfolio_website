"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TiltCard } from "@/components/ui/TiltCard";
import type { Experience } from "@/types";

interface Props {
  experiences: Experience[];
}

export function ExperiencePreviewSection({ experiences }: Props) {
  const recentExperience = experiences.slice(0, 2);

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          style={{ transformStyle: "preserve-3d", perspective: "800px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            My professional journey in software development
          </p>
        </motion.div>

        <div className="relative" style={{ perspective: "1200px" }}>
          {/* Animated timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-500 hidden md:block shadow-lg shadow-blue-500/50"
          />

          <div className="space-y-16">
            {recentExperience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -60 : 60,
                  rotateY: index % 2 === 0 ? -18 : 18,
                }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.15, type: "spring", stiffness: 90 }}
                style={{ transformStyle: "preserve-3d" }}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="flex-1 w-full">
                  <TiltCard intensity={5}>
                    <Card className="glass-card shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                          <div>
                            <CardTitle className="text-2xl">{exp.role}</CardTitle>
                            <p className="text-blue-500 dark:text-blue-400 font-semibold mt-1">{exp.company}</p>
                          </div>
                          <span className="text-sm text-foreground/80 bg-blue-500/20 border border-blue-400/30 px-3 py-1 rounded-full backdrop-blur-sm">
                            {exp.duration}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {exp.achievements.slice(0, 2).map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                              className="text-foreground/70 flex items-start"
                            >
                              <span className="text-blue-500 dark:text-blue-400 mr-2 mt-0.5">▸</span>
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:flex items-center justify-center shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3, type: "spring" }}
                    className="relative"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-blue-500/50"
                    />
                    <div className="w-5 h-5 rounded-full bg-blue-500 border-4 border-background shadow-lg shadow-blue-500/60 relative z-10" />
                  </motion.div>
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
