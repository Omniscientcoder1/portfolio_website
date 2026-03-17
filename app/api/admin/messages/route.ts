import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(messages);
}

export async function DELETE() {
  await prisma.message.deleteMany({ where: { read: true } });
  return NextResponse.json({ ok: true });
}
