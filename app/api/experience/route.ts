import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type ExpRow = Awaited<ReturnType<typeof prisma.experience.findMany>>[number];

export const revalidate = 60;

export async function GET() {
  const items = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(
    items.map((e: ExpRow) => ({
      ...e,
      responsibilities: JSON.parse(e.responsibilities),
      achievements: JSON.parse(e.achievements),
    }))
  );
}
