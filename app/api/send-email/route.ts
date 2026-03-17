import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

/** Escape HTML special characters to prevent injection in email body */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { name, email, subject, message } = body as Record<string, unknown>;

    // Type checks
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json({ error: "All fields must be strings." }, { status: 400 });
    }

    const n = name.trim();
    const e = email.trim();
    const s = subject.trim();
    const m = message.trim();

    // Presence
    if (!n || !e || !s || !m) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Length limits
    if (n.length > 80)
      return NextResponse.json({ error: "Name is too long." }, { status: 400 });
    if (e.length > 254)
      return NextResponse.json({ error: "Email is too long." }, { status: 400 });
    if (s.length > 120)
      return NextResponse.json({ error: "Subject is too long." }, { status: 400 });
    if (m.length < 20)
      return NextResponse.json({ error: "Message is too short." }, { status: 400 });
    if (m.length > 3000)
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });

    // Email format
    if (!EMAIL_REGEX.test(e)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Build email with escaped content (prevent HTML injection)
    const safeN = escapeHtml(n);
    const safeE = escapeHtml(e);
    const safeS = escapeHtml(s);
    const safeM = escapeHtml(m).replace(/\n/g, "<br>");

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["tahmid8017@gmail.com"],
      subject: `Portfolio Contact: ${safeS}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeN}</p>
        <p><strong>Email:</strong> ${safeE}</p>
        <p><strong>Subject:</strong> ${safeS}</p>
        <h3>Message:</h3>
        <p>${safeM}</p>
      `,
      replyTo: e,
    });

    // Save message to database regardless of email result
    await prisma.message.create({ data: { name: n, email: e, subject: s, message: m } });

    return NextResponse.json({ message: "Email sent successfully", data }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
