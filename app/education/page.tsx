import { prisma } from "@/lib/prisma";
import { EducationClient } from "@/components/sections/EducationClient";
import type { Education, Certification } from "@/types";

export const revalidate = 60;

export default async function EducationPage() {
  const [education, certifications] = await Promise.all([
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.certification.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <EducationClient
      education={education as Education[]}
      certifications={certifications as Certification[]}
    />
  );
}
