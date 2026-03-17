import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const message = await prisma.message.update({
    where: { id: parseInt(id, 10) },
    data: { read: body.read ?? true },
  });
  return NextResponse.json(message);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.message.delete({ where: { id: parseInt(id, 10) } });
  return NextResponse.json({ ok: true });
}
