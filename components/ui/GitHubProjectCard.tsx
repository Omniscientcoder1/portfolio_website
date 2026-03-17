"use client";

import { motion } from "framer-motion";
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt } from "react-icons/fa";
import { GitHubRepo } from "@/types";
import { getLanguageColor } from "@/lib/language-colors";
import { formatUpdatedAt } from "@/lib/github";
import { cn } from "@/lib/utils";
import { TiltCard } from "@/components/ui/TiltCard";

interface GitHubProjectCardProps {
  repo: GitHubRepo;
  index: number;
  featured?: boolean;
}

export function GitHubProjectCard({ repo, index, featured = false }: GitHubProjectCardProps) {
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
        className={cn(
          "group h-full flex flex-col rounded-2xl glass-card border transition-all duration-300",
          "hover:shadow-2xl hover:shadow-blue-500/25",
          featured && "ring-2 ring-blue-400/40"
        )}
      >
        {/* Card Header */}
        <div className="p-6 flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-400/30 shrink-0">
                <FaGithub className="w-5 h-5 text-blue-400" />
              </div>
              <h3
                className={cn(
                  "font-bold truncate text-foreground group-hover:text-blue-400 transition-colors",
                  featured ? "text-xl" : "text-lg"
                )}
              >
                {repo.name}
              </h3>
            </div>
            {featured && (
              <span className="shrink-0 ml-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400/20 to-amber-400/20 text-amber-400 border border-amber-400/30">
                ★ Featured
              </span>
            )}
          </div>

          <p className="text-foreground/60 text-sm leading-relaxed line-clamp-3 mb-4 min-h-[3.75rem]">
            {repo.description ?? "No description provided."}
          </p>

          {/* Topics */}
          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {repo.topics.slice(0, 4).map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-0.5 rounded-md text-xs bg-blue-500/15 text-blue-400 border border-blue-400/20"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="px-6 pb-6 border-t border-blue-400/10 pt-4 mt-auto">
          <div className="flex items-center justify-between">
            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-foreground/50">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  />
                  <span className="text-foreground/70">{repo.language}</span>
                </span>
              )}
              <span className="flex items-center gap-1">
                <FaStar className="w-3.5 h-3.5 text-yellow-400" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <FaCodeBranch className="w-3.5 h-3.5" />
                {repo.forks_count}
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground/40">
                {formatUpdatedAt(repo.updated_at)}
              </span>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg glass-strong text-foreground/50 hover:text-blue-400 hover:shadow-md hover:shadow-blue-500/20 transition-all"
                  aria-label="Live demo"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaExternalLinkAlt className="w-3.5 h-3.5" />
                </a>
              )}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg glass-strong text-foreground/50 hover:text-blue-400 hover:shadow-md hover:shadow-blue-500/20 transition-all"
                aria-label="GitHub repository"
              >
                <FaGithub className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      </TiltCard>
    </motion.div>
  );
}
