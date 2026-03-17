import { Suspense } from "react";
import { getGitHubRepos, getFeaturedRepos } from "@/lib/github";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";

export const revalidate = 3600;

export default async function ProjectsPage() {
  let repos: import("@/types").GitHubRepo[] = [];
  let error: string | null = null;

  try {
    repos = await getGitHubRepos();
  } catch (e) {
    error = "Could not load repositories. Please try again later.";
  }

  const featuredRepos = getFeaturedRepos(repos);
  const otherRepos = repos.filter((r) => !featuredRepos.find((f) => f.id === r.id));

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong border border-blue-400/30 text-blue-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live from GitHub
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 text-transparent bg-clip-text">
              Projects
            </span>
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Open-source work and personal projects — pulled live from GitHub
          </p>
        </div>

        {error ? (
          <div className="text-center py-20">
            <div className="glass-card rounded-2xl p-12 max-w-md mx-auto">
              <p className="text-foreground/60 text-lg">{error}</p>
            </div>
          </div>
        ) : (
          <ProjectsGrid featuredRepos={featuredRepos} otherRepos={otherRepos} />
        )}
      </div>
    </div>
  );
}


