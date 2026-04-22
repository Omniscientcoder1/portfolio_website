import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.testimonial.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, role, company, content, imageUrl, order } = body;
    const item = await prisma.testimonial.update({
      where: { id },
      data: {
        name: String(name ?? ""),
        role: String(role ?? ""),
        company: String(company ?? ""),
        content: String(content ?? ""),
        imageUrl: imageUrl ? String(imageUrl) : null,
        order: Number(order) || 0,
      },
    });
    return NextResponse.json(item);
  } catch (err) {
    console.error("PUT /api/admin/testimonials/[id]:", err);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
