import { prisma } from "@/lib/prisma";
import { ExperienceClient } from "@/components/sections/ExperienceClient";
import type { Experience } from "@/types";

type ExpRow = Awaited<ReturnType<typeof prisma.experience.findMany>>[number];

export const revalidate = 60;

export default async function ExperiencePage() {
  const raw = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  const experiences: Experience[] = raw.map((e: ExpRow) => ({
    ...e,
    logo: e.logo ?? undefined,
    responsibilities: JSON.parse(e.responsibilities),
    achievements: JSON.parse(e.achievements),
  }));

  return <ExperienceClient experiences={experiences} />;
}
