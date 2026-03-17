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
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
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
                        <span className="text-sm text-foreground/60 bg-secondary px-3 py-1 rounded-full">
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
                                <span className="text-primary mr-2">•</span>
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
                                <span className="text-primary mr-2">★</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="hidden md:block">
                  <div className="w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg"></div>
                </div>

                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
