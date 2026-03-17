import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signAdminToken, COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body.username !== "string" || typeof body.password !== "string") {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { username: body.username.trim() } });
    if (!admin) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const valid = await bcrypt.compare(body.password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const token = await signAdminToken(admin.username);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
