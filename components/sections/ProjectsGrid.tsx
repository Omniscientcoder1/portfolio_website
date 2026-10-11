"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import { getLanguageColor } from "@/lib/language-colors";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/utils";

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
      {/* Stats bar */}
      <dl className="grid grid-cols-3 divide-x divide-border border border-border bg-card/60 mb-10">
        {[
          { label: "Projects", value: allProjects.length },
          { label: "Featured", value: featuredProjects.length },
          { label: "Technologies", value: allTechnologies.length },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse items-center sm:items-start px-3 sm:px-6 py-5">
            <dt className="font-label text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
              {stat.label}
            </dt>
            <dd className="font-heading text-2xl sm:text-3xl font-black text-accent text-glow">
              {String(stat.value).padStart(2, "0")}
            </dd>
          </div>
        ))}
      </dl>

      {/* Technology filter */}
      {allTechnologies.length > 0 && (
        <div className="mb-14">
          <p className="font-mono text-sm text-muted-foreground mb-4">
            <span className="text-accent-tertiary">$</span> filter --tech=
            <span className="text-accent">{activeTechnology ?? "*"}</span>
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
            <FilterChip active={activeTechnology === null} onClick={() => setActiveTechnology(null)}>
              All
            </FilterChip>
            {allTechnologies.map((tech) => (
              <FilterChip
                key={tech}
                active={activeTechnology === tech}
                onClick={() => setActiveTechnology(tech === activeTechnology ? null : tech)}
              >
                <span aria-hidden className="size-2" style={{ backgroundColor: getLanguageColor(tech) }} />
                {tech}
              </FilterChip>
            ))}
          </div>
        </div>
      )}

      {/* Featured */}
      <AnimatePresence mode="wait">
        {filteredFeatured.length > 0 && (
          <motion.section
            key="featured"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="mb-16"
          >
            <GroupHeading>Featured</GroupHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFeatured.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} featured />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* All */}
      <AnimatePresence mode="wait">
        {filteredOtherProjects.length > 0 && (
          <motion.section
            key="other"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {filteredFeatured.length > 0 && <GroupHeading>All Projects</GroupHeading>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOtherProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {filteredFeatured.length === 0 && filteredOtherProjects.length === 0 && (
        <p className="text-center py-16 font-mono text-muted-foreground">
          <span className="text-destructive">ERR 404:</span> No projects found for this technology.
        </p>
      )}
    </div>
  );
}

function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h2 className="text-xl md:text-2xl text-foreground">
        <span className="text-accent mr-2" aria-hidden>{"//"}</span>
        {children}
      </h2>
      <div aria-hidden className="h-px flex-1 bg-gradient-to-r from-accent/60 via-border to-transparent" />
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative inline-flex items-center gap-2 min-h-11 px-4 cyber-chamfer-tab font-label text-xs uppercase tracking-[0.15em]",
        "transition-all duration-150 ease-digital",
        "focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--accent-tertiary)]",
        active
          ? "bg-accent text-background shadow-[inset_0_0_12px_rgba(0,0,0,0.25)]"
          : "bg-card text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)] hover:text-accent hover:shadow-[inset_0_0_0_1px_var(--accent)]"
      )}
    >
      {children}
    </button>
  );
}
