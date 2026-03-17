import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function parseExp(e: ReturnType<typeof Object.assign>) {
  return {
    ...e,
    responsibilities: JSON.parse(e.responsibilities),
    achievements: JSON.parse(e.achievements),
  };
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.experience.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(parseExp(item));
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const item = await prisma.experience.update({
    where: { id },
    data: {
      ...body,
      responsibilities: JSON.stringify(Array.isArray(body.responsibilities) ? body.responsibilities : []),
      achievements: JSON.stringify(Array.isArray(body.achievements) ? body.achievements : []),
    },
  });
  return NextResponse.json(parseExp(item));
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.experience.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
