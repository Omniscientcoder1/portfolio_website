import { prisma } from "@/lib/prisma";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
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
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong border border-blue-400/30 text-blue-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Managed from Admin Panel
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 text-transparent bg-clip-text">
              Projects
            </span>
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Projects and case studies curated directly from the admin dashboard
          </p>
        </div>

        <ProjectsGrid featuredProjects={featuredProjects} otherProjects={otherProjects} />
      </div>
    </div>
  );
}


