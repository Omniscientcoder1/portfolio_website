import { GitHubRepo } from "@/types";

const GITHUB_USERNAME = "Omniscientcoder1";
const FEATURED_REPOS = [
  "ecommerce-platform",
  "ai-chat-app",
  "project-dashboard",
];

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    {
      next: { revalidate: 3600 }, // cache for 1 hour
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const repos: GitHubRepo[] = await res.json();

  return repos
    .filter((r) => !r.fork && r.visibility === "public")
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 8);
}

export function getFeaturedRepos(repos: GitHubRepo[]): GitHubRepo[] {
  const featured = repos.filter((r) => FEATURED_REPOS.includes(r.name));
  // If no explicit matches, use top 3 by stars
  if (featured.length === 0) {
    return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3);
  }
  return featured;
}

export function formatUpdatedAt(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 30) return `${diffDays}d ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}
