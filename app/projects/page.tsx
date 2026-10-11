import { prisma } from "@/lib/prisma";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";

type ProjectRow = Awaited<ReturnType<typeof prisma.project.findMany>>[number];

export const revalidate = 60;

export default async function ProjectsPage() {
  const raw = await prisma.project.findMany({ orderBy: { order: "asc" } });
  const projects: Project[] = raw.map((p: ProjectRow) => ({
    ...p,
    techStack: JSON.parse(p.techStack) as string[],
    githubLink: p.githubLink ?? undefined,
    liveLink: p.liveLink ?? undefined,
    status: (p.status as Project["status"]) ?? "completed",
  }));

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="relative min-h-screen px-4 sm:px-6 py-16 md:py-24">
      <div aria-hidden className="absolute inset-x-0 top-0 h-96 cyber-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative max-w-7xl mx-auto">
        <Badge className="mb-6">
          <span className="size-1.5 bg-accent animate-flicker" />
          Managed from Admin Panel
        </Badge>
        <SectionHeading
          as="h1"
          label="~/projects"
          title="My Projects"
          description="Projects and case studies curated directly from the admin dashboard"
        />

        <ProjectsGrid featuredProjects={featuredProjects} otherProjects={otherProjects} />
      </div>
    </div>
  );
}
