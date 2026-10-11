import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Project } from "@/types";

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Skewed circuit band — tilts the section off the page grid */}
      <div aria-hidden className="absolute inset-x-0 top-40 bottom-24 -skew-y-2 bg-card/40 border-y border-border cyber-circuit" />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            label="01 // featured_projects"
            title="Featured Projects"
            description="A selection of projects curated directly from the admin panel"
          />
          <Button asChild variant="outline" className="mb-14 self-start md:self-auto">
            <Link href="/projects">
              View All Projects <ArrowRight strokeWidth={1.5} />
            </Link>
          </Button>
        </div>

        {projects.length === 0 ? (
          <p className="font-mono text-muted-foreground">
            <span className="text-destructive">ERR:</span> No featured projects are configured yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:pb-10">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                featured
                maxTech={4}
                className={index % 3 === 1 ? "lg:translate-y-10" : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
