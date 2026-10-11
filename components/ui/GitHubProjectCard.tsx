"use client";

import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { GitHubRepo } from "@/types";
import { getLanguageColor } from "@/lib/language-colors";
import { formatUpdatedAt } from "@/lib/github";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconBox } from "@/components/ui/IconBox";

interface GitHubProjectCardProps {
  repo: GitHubRepo;
  index: number;
  featured?: boolean;
}

export function GitHubProjectCard({ repo, index, featured = false }: GitHubProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      className="h-full cyber-glow-wrap"
    >
      <Card variant="terminal" terminalTitle={repo.full_name} hoverEffect className="group h-full gap-0 pb-0">
        <div className="px-6 flex-1">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3
              className={cn(
                "truncate text-foreground transition-colors duration-150 group-hover:text-accent",
                featured ? "text-xl" : "text-lg"
              )}
            >
              {repo.name}
            </h3>
            {featured && <Badge variant="secondary">★ Featured</Badge>}
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4 min-h-[3.75rem]">
            {repo.description ?? "No description provided."}
          </p>

          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {repo.topics.slice(0, 4).map((topic) => (
                <Badge key={topic} variant="muted">{topic}</Badge>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-border/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
            {repo.language && (
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 shrink-0" style={{ backgroundColor: getLanguageColor(repo.language) }} />
                <span className="text-foreground/80">{repo.language}</span>
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="size-3.5 text-warning" strokeWidth={1.5} />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="size-3.5" strokeWidth={1.5} />
              {repo.forks_count}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline font-mono text-[11px] text-muted-foreground">
              {formatUpdatedAt(repo.updated_at)}
            </span>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${repo.name} live demo`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex p-1 focus-visible:outline-2 focus-visible:outline-accent-tertiary"
              >
                <IconBox size="sm" tone="tertiary" interactive>
                  <ExternalLink strokeWidth={1.5} />
                </IconBox>
              </a>
            )}
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${repo.name} GitHub repository`}
              className="inline-flex p-1 focus-visible:outline-2 focus-visible:outline-accent-tertiary"
            >
              <IconBox size="sm" interactive>
                <FaGithub />
              </IconBox>
            </a>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
