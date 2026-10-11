import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlitchText } from "@/components/ui/GlitchText";
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
    <div className="relative min-h-screen px-4 sm:px-6 py-12 md:py-20">
      <div className="max-w-5xl mx-auto">
        <Button asChild variant="ghost" className="mb-8 -ml-3">
          <Link href="/projects">
            <ArrowLeft strokeWidth={1.5} />
            cd ../projects
          </Link>
        </Button>

        {/* Visual banner */}
        <div className="relative h-56 md:h-80 cyber-chamfer cyber-frame bg-card cyber-grid overflow-hidden mb-10 grid place-items-center">
          <div aria-hidden className="absolute inset-0 cyber-circuit opacity-70" />
          <span aria-hidden className="relative font-heading font-black text-[8rem] md:text-[12rem] leading-none text-accent/80 drop-glow">
            <GlitchText text={project.title.charAt(0).toUpperCase()} />
          </span>
          <span className="absolute top-4 left-5 font-label text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {"// "}project.preview
          </span>
          {project.featured && (
            <Badge variant="secondary" className="absolute top-4 right-5">★ Featured</Badge>
          )}
        </div>

        <header className="mb-10">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-accent mb-3">~/projects/{project.slug}</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-5">
            <GlitchText text={project.title} />
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">{project.description}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card variant="terminal" terminalTitle="readme.md" className="lg:col-span-2 px-6">
            <h2 className="text-xl text-foreground">
              <span className="text-accent mr-2" aria-hidden>#</span>About This Project
            </h2>
            <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{project.longDescription}</p>
          </Card>

          <div className="space-y-8">
            <Card className="px-6">
              <h2 className="text-base text-foreground">
                <span className="text-accent-tertiary mr-2" aria-hidden>{"//"}</span>Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech: string) => (
                  <Badge key={tech} variant="tertiary">{tech}</Badge>
                ))}
              </div>
            </Card>

            <div className="flex flex-col gap-3">
              {project.githubLink && (
                <Button asChild variant="glitch" size="lg" className="w-full">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                    View Code
                  </a>
                </Button>
              )}
              {project.liveLink && (
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink strokeWidth={1.5} />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
