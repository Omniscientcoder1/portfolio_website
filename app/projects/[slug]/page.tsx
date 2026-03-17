import { notFound } from "next/navigation";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

type ProjSlugRow = { slug: string };

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({ select: { slug: true } });
  return projects.map((p: ProjSlugRow) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const raw = await prisma.project.findUnique({ where: { slug } });

  if (!raw) notFound();

  const project = {
    ...raw,
    techStack: JSON.parse(raw.techStack) as string[],
    githubLink: raw.githubLink ?? undefined,
    liveLink: raw.liveLink ?? undefined,
  };

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <Link href="/projects">
          <Button variant="ghost" className="mb-8">
            <FaArrowLeft className="mr-2" />
            Back to Projects
          </Button>
        </Link>

        <Card className="glass-strong">
          <div className="relative h-96 bg-secondary/20 rounded-t-xl">
            <div className="w-full h-full flex items-center justify-center text-foreground/20 font-bold text-9xl">
              {project.title[0]}
            </div>
          </div>

          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-4xl mb-4">{project.title}</CardTitle>
            </div>
            <p className="text-xl text-foreground/70">{project.description}</p>
          </CardHeader>

          <CardContent className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">About This Project</h3>
              <p className="text-foreground/80 leading-relaxed">{project.longDescription}</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="glass-strong">
                  <FaGithub className="mr-2" />
                  View Code
                </Button>
              </a>
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="glass-strong">
                    <FaExternalLinkAlt className="mr-2" />
                    Live Demo
                  </Button>
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
