"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconBox } from "@/components/ui/IconBox";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

const STATUS_BADGE: Record<NonNullable<Project["status"]>, { label: string; variant: "default" | "warning" | "tertiary" }> = {
  live: { label: "Live", variant: "default" },
  "in-development": { label: "In Dev", variant: "warning" },
  completed: { label: "Shipped", variant: "tertiary" },
};

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
  maxTech?: number;
  className?: string;
}

export function ProjectCard({ project, index, featured = false, maxTech = 5, className }: ProjectCardProps) {
  const status = project.status ? STATUS_BADGE[project.status] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      className={cn("h-full cyber-glow-wrap", className)}
    >
      <Card hoverEffect className="group h-full gap-0 py-0">
        {/* HUD header strip */}
        <div className="flex items-center justify-between gap-3 px-6 pt-5 pb-3 border-b border-border/70">
          <span className="font-label text-xs tracking-[0.25em] text-muted-foreground">
            #{String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            {status && <Badge variant={status.variant}>{status.label}</Badge>}
            {featured && <Badge variant="secondary">★ Featured</Badge>}
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg text-foreground transition-colors duration-150 group-hover:text-accent group-hover:text-chromatic line-clamp-2 mb-3">
            {project.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-5 min-h-[3.75rem]">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.techStack.slice(0, maxTech).map((tech) => (
              <Badge key={tech} variant="muted">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border/70 flex items-center justify-between">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 min-h-11 font-label text-xs uppercase tracking-[0.2em] text-accent hover:text-glow focus-visible:outline-none focus-visible:underline"
          >
            <span aria-hidden>&gt;</span> View details
            <ArrowUpRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
          </Link>
          <div className="flex items-center gap-2">
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`} className="inline-flex p-1 focus-visible:outline-2 focus-visible:outline-accent-tertiary">
                <IconBox size="sm" tone="tertiary" interactive>
                  <ExternalLink strokeWidth={1.5} />
                </IconBox>
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} GitHub repository`} className="inline-flex p-1 focus-visible:outline-2 focus-visible:outline-accent-tertiary">
                <IconBox size="sm" interactive>
                  <FaGithub />
                </IconBox>
              </a>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
