"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitHubProjectCard } from "@/components/ui/GitHubProjectCard";
import { GitHubRepo } from "@/types";
import { FaGithub } from "react-icons/fa";
import { getLanguageColor } from "@/lib/language-colors";

interface ProjectsGridProps {
  featuredRepos: GitHubRepo[];
  otherRepos: GitHubRepo[];
}

export function ProjectsGrid({ featuredRepos, otherRepos }: ProjectsGridProps) {
  const allRepos = [...featuredRepos, ...otherRepos];
  const allLanguages = Array.from(
    new Set(allRepos.map((r) => r.language).filter(Boolean) as string[])
  );

  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);

  const filteredOtherRepos = activeLanguage
    ? otherRepos.filter((r) => r.language === activeLanguage)
    : otherRepos;

  const filteredFeatured = activeLanguage
    ? featuredRepos.filter((r) => r.language === activeLanguage)
    : featuredRepos;

  const totalStars = allRepos.reduce((acc, r) => acc + r.stargazers_count, 0);
  const totalForks = allRepos.reduce((acc, r) => acc + r.forks_count, 0);

  return (
    <div>
      {/* GitHub Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap justify-center gap-6 mb-12"
      >
        {[
          { label: "Repositories", value: allRepos.length },
          { label: "Total Stars", value: totalStars },
          { label: "Total Forks", value: totalForks },
          { label: "Languages", value: allLanguages.length },
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

      {/* Language Filter */}
      {allLanguages.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          <button
            onClick={() => setActiveLanguage(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
              activeLanguage === null
                ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/30"
                : "glass-strong border-blue-400/20 text-foreground/60 hover:text-blue-400"
            }`}
          >
            All
          </button>
          {allLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLanguage(lang === activeLanguage ? null : lang)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                activeLanguage === lang
                  ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/30"
                  : "glass-strong border-blue-400/20 text-foreground/60 hover:text-blue-400"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getLanguageColor(lang) }}
              />
              {lang}
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
              {filteredFeatured.map((repo, i) => (
                <GitHubProjectCard key={repo.id} repo={repo} index={i} featured />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Repos */}
      <AnimatePresence mode="wait">
        {filteredOtherRepos.length > 0 && (
          <motion.div key="other" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {filteredFeatured.length > 0 && (
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold">All Projects</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOtherRepos.map((repo, i) => (
                <GitHubProjectCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredFeatured.length === 0 && filteredOtherRepos.length === 0 && (
        <div className="text-center py-16 text-foreground/40">
          No repositories found for this language.
        </div>
      )}

      {/* GitHub Profile Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-16"
      >
        <a
          href="https://github.com/Omniscientcoder1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-3 rounded-2xl glass-strong border border-blue-400/30 text-blue-400 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105"
        >
          <FaGithub className="w-5 h-5" />
          View full profile on GitHub
        </a>
      </motion.div>
    </div>
  );
}
