import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function parseExp(e: ReturnType<typeof Object.assign>) {
  return {
    ...e,
    responsibilities: JSON.parse(e.responsibilities),
    achievements: JSON.parse(e.achievements),
  };
}

export async function GET() {
  const items = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items.map(parseExp));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const item = await prisma.experience.create({
    data: {
      ...body,
      responsibilities: JSON.stringify(Array.isArray(body.responsibilities) ? body.responsibilities : []),
      achievements: JSON.stringify(Array.isArray(body.achievements) ? body.achievements : []),
    },
  });
  return NextResponse.json(parseExp(item), { status: 201 });
}
