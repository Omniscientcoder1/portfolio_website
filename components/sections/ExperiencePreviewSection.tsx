import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import type { Experience } from "@/types";

interface Props {
  experiences: Experience[];
}

export function ExperiencePreviewSection({ experiences }: Props) {
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
          <SectionHeading
            label="02 // career.log"
            title="Experience"
            description="My professional journey in software development"
          />
          <Button asChild variant="secondary" className="-mt-4">
            <Link href="/experience">
              Full log <ArrowRight strokeWidth={1.5} />
            </Link>
          </Button>
        </div>

        <div className="lg:col-span-8">
          <ExperienceTimeline experiences={experiences.slice(0, 2)} />
        </div>
      </div>
    </section>
  );
}
