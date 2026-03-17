import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [messages, unreadMessages, projects, experience, education, certifications, testimonials, social] =
    await Promise.all([
      prisma.message.count(),
      prisma.message.count({ where: { read: false } }),
      prisma.project.count(),
      prisma.experience.count(),
      prisma.education.count(),
      prisma.certification.count(),
      prisma.testimonial.count(),
      prisma.socialLink.count(),
    ]);

  return NextResponse.json({
    messages,
    unreadMessages,
    projects,
    experience,
    education,
    certifications,
    testimonials,
    social,
  });
}
