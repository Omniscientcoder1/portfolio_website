import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { ExperiencePreviewSection } from "@/components/sections/ExperiencePreviewSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { getGitHubRepos, getFeaturedRepos } from "@/lib/github";
import { prisma } from "@/lib/prisma";
import type { Experience } from "@/types";

type ExpRow = Awaited<ReturnType<typeof prisma.experience.findMany>>[number];

export const revalidate = 60;

export default async function Home() {
  let featuredRepos: import("@/types").GitHubRepo[] = [];
  try {
    const repos = await getGitHubRepos();
    featuredRepos = getFeaturedRepos(repos);
  } catch {
    // silently fall back to empty — section handles it gracefully
  }

  const expRaw = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  const experiences: Experience[] = expRaw.map((e: ExpRow) => ({
    ...e,
    logo: e.logo ?? undefined,
    responsibilities: JSON.parse(e.responsibilities),
    achievements: JSON.parse(e.achievements),
  }));

  return (
    <>
      <HeroSection />
      <FeaturedProjectsSection repos={featuredRepos} />
      <ExperiencePreviewSection experiences={experiences} />
      <TestimonialsSection />
    </>
  );
}

