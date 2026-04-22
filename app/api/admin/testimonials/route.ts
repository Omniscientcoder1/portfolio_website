import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role, company, content, imageUrl, order } = body;
    const item = await prisma.testimonial.create({
      data: {
        name: String(name ?? ""),
        role: String(role ?? ""),
        company: String(company ?? ""),
        content: String(content ?? ""),
        imageUrl: imageUrl ? String(imageUrl) : null,
        order: Number(order) || 0,
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/testimonials:", err);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
