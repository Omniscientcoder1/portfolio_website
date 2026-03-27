"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Project } from "@/types";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { getLanguageColor } from "@/lib/language-colors";
import { TiltCard } from "@/components/ui/TiltCard";

interface ProjectsGridProps {
  featuredProjects: Project[];
  otherProjects: Project[];
}

export function ProjectsGrid({ featuredProjects, otherProjects }: ProjectsGridProps) {
  const allProjects = [...featuredProjects, ...otherProjects];
  const allTechnologies = Array.from(
    new Set(allProjects.flatMap((project) => project.techStack))
  );

  const [activeTechnology, setActiveTechnology] = useState<string | null>(null);

  const filteredOtherProjects = activeTechnology
    ? otherProjects.filter((project) => project.techStack.includes(activeTechnology))
    : otherProjects;

  const filteredFeatured = activeTechnology
    ? featuredProjects.filter((project) => project.techStack.includes(activeTechnology))
    : featuredProjects;

  return (
    <div>
      {/* Project Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap justify-center gap-6 mb-12"
      >
        {[
          { label: "Projects", value: allProjects.length },
          { label: "Featured", value: featuredProjects.length },
          { label: "Technologies", value: allTechnologies.length },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center px-6 py-4 rounded-2xl glass-strong border border-blue-400/20 min-w-[120px]"
          >
            <span className="text-2xl font-bold text-blue-400">{stat.value}</span>
            <span className="text-xs text-foreground/50 mt-1">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Technology Filter */}
      {allTechnologies.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          <button
            onClick={() => setActiveTechnology(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
              activeTechnology === null
                ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/30"
                : "glass-strong border-blue-400/20 text-foreground/60 hover:text-blue-400"
            }`}
          >
            All
          </button>
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveTechnology(tech === activeTechnology ? null : tech)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                activeTechnology === tech
                  ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/30"
                  : "glass-strong border-blue-400/20 text-foreground/60 hover:text-blue-400"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getLanguageColor(tech) }}
              />
              {tech}
            </button>
          ))}
        </motion.div>
      )}

      {/* Featured Section */}
      <AnimatePresence mode="wait">
        {filteredFeatured.length > 0 && (
          <motion.div
            key="featured"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold">Featured</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFeatured.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} featured />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Repos */}
      <AnimatePresence mode="wait">
        {filteredOtherProjects.length > 0 && (
          <motion.div key="other" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {filteredFeatured.length > 0 && (
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold">All Projects</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOtherProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredFeatured.length === 0 && filteredOtherProjects.length === 0 && (
        <div className="text-center py-16 text-foreground/40">
          No projects found for this technology.
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, type: "spring", stiffness: 90 }}
      className="h-full"
      style={{ perspective: "800px" }}
    >
      <TiltCard intensity={6} className="h-full">
        <div
          className={`group h-full flex flex-col rounded-2xl glass-card border transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 ${
            featured ? "ring-2 ring-blue-400/40" : ""
          }`}
        >
          <div className="p-6 flex-1">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="font-bold text-lg text-foreground group-hover:text-blue-400 transition-colors line-clamp-1">
                {project.title}
              </h3>
              {featured && (
                <span className="shrink-0 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400/20 to-amber-400/20 text-amber-400 border border-amber-400/30">
                  Featured
                </span>
              )}
            </div>

            <p className="text-foreground/60 text-sm leading-relaxed line-clamp-3 mb-4 min-h-[3.75rem]">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 5).map((tech) => (
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
  );
}
