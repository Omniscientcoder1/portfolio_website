import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export async function GET() {
  const items = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}
