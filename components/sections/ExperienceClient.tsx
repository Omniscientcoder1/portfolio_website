"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Experience } from "@/types";

export function ExperienceClient({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Experience</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            My professional journey in software development
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated SVG timeline line */}
          <svg
            className="absolute left-0 md:left-1/2 top-0 h-full hidden md:block overflow-visible"
            width="2"
            style={{ transform: "translateX(-1px)" }}
            preserveAspectRatio="none"
          >
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-blue-400/40"
              pathLength="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </svg>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="flex-1 w-full">
                  <Card className="glass-strong">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <CardTitle className="text-2xl">{exp.role}</CardTitle>
                          <p className="text-primary font-semibold mt-1 text-lg">{exp.company}</p>
                        </div>
                        <span className="text-sm text-foreground/60 bg-secondary px-3 py-1 rounded-full shrink-0">
                          {exp.duration}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Responsibilities:</h4>
                          <ul className="space-y-1">
                            {exp.responsibilities.map((resp, i) => (
                              <li key={i} className="text-foreground/70 flex items-start">
                                <span className="text-primary mr-2 mt-0.5">•</span>
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Achievements:</h4>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="text-foreground/70 flex items-start">
                                <span className="text-primary mr-2 mt-0.5">★</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Pulsing timeline dot */}
                <div className="hidden md:flex items-center justify-center z-10">
                  <div className="relative w-7 h-7">
                    <motion.div
                      animate={{ scale: [1, 1.9, 1], opacity: [0.45, 0, 0.45] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
                      className="absolute inset-0 rounded-full bg-blue-400/40"
                    />
                    <div className="relative w-7 h-7 rounded-full bg-blue-500 border-4 border-background shadow-lg shadow-blue-500/40 z-10" />
                  </div>
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
