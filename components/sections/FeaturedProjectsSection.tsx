"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/TiltCard";
import { Project } from "@/types";

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Subtle section background depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          style={{ transformStyle: "preserve-3d", perspective: "800px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            A selection of projects curated directly from the admin panel
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.08, type: "spring", stiffness: 90 }}
              className="h-full"
              style={{ perspective: "800px" }}
            >
              <TiltCard intensity={6} className="h-full">
                <div className="group h-full flex flex-col rounded-2xl glass-card border transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 ring-2 ring-blue-400/40">
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-3 gap-3">
                      <h3 className="font-bold text-xl text-foreground group-hover:text-blue-400 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <span className="shrink-0 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400/20 to-amber-400/20 text-amber-400 border border-amber-400/30">
                        Featured
                      </span>
                    </div>

                    <p className="text-foreground/60 text-sm leading-relaxed line-clamp-3 mb-4 min-h-[3.75rem]">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md text-xs bg-blue-500/15 text-blue-400 border border-blue-400/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="px-6 pb-6 border-t border-blue-400/10 pt-4 mt-auto flex items-center justify-between">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View details
                    </Link>
                    <div className="flex items-center gap-2">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg glass-strong text-foreground/50 hover:text-blue-400 hover:shadow-md hover:shadow-blue-500/20 transition-all"
                          aria-label="Live demo"
                        >
                          <FaExternalLinkAlt className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg glass-strong text-foreground/50 hover:text-blue-400 hover:shadow-md hover:shadow-blue-500/20 transition-all"
                          aria-label="GitHub repository"
                        >
                          <FaGithub className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {projects.length === 0 && (
          <p className="text-center text-foreground/50 mt-8">
            No featured projects are configured yet.
          </p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/projects">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" variant="outline">
                View All Projects
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

