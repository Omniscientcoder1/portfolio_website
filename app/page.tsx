import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { ExperiencePreviewSection } from "@/components/sections/ExperiencePreviewSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { prisma } from "@/lib/prisma";
import type { Experience, Project, Testimonial, SocialLink } from "@/types";

type ExpRow = Awaited<ReturnType<typeof prisma.experience.findMany>>[number];
type ProjectRow = Awaited<ReturnType<typeof prisma.project.findMany>>[number];

export const revalidate = 60;

export default async function Home() {
  const [expRaw, projectsRaw, testimonials, socialLinks] = await Promise.all([
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ where: { featured: true }, orderBy: { order: "asc" }, take: 6 }),
    prisma.testimonial.findMany({ orderBy: { order: "asc" }, take: 6 }),
    prisma.socialLink.findMany({ orderBy: { order: "asc" } }),
  ]);

  const experiences: Experience[] = expRaw.map((e: ExpRow) => ({
    ...e,
    logo: e.logo ?? undefined,
    responsibilities: JSON.parse(e.responsibilities),
    achievements: JSON.parse(e.achievements),
  }));

  const featuredProjects: Project[] = projectsRaw.map((p: ProjectRow) => ({
    ...p,
    techStack: JSON.parse(p.techStack) as string[],
    githubLink: p.githubLink ?? undefined,
    liveLink: p.liveLink ?? undefined,
    status: (p.status as Project["status"]) ?? "completed",
  }));

  return (
    <>
      <HeroSection socialLinks={socialLinks as SocialLink[]} />
      <FeaturedProjectsSection projects={featuredProjects} />
      <ExperiencePreviewSection experiences={experiences} />
      <TestimonialsSection testimonials={testimonials as Testimonial[]} />
    </>
  );
}

