import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import type { Experience } from "@/types";

export function ExperienceClient({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="relative min-h-screen px-4 sm:px-6 py-16 md:py-24">
      <div aria-hidden className="absolute inset-x-0 top-0 h-96 cyber-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading
          as="h1"
          label="~/experience"
          title="Experience"
          description="My professional journey in software development"
        />
        <ExperienceTimeline experiences={experiences} detailed />
      </div>
    </div>
  );
}
