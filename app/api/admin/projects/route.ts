import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(projects.map(p => ({ ...p, techStack: JSON.parse(p.techStack) })));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const project = await prisma.project.create({
    data: {
      ...body,
      techStack: JSON.stringify(Array.isArray(body.techStack) ? body.techStack : []),
    },
  });
  return NextResponse.json({ ...project, techStack: JSON.parse(project.techStack) }, { status: 201 });
}
