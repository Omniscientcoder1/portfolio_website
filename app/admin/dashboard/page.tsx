"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FaEnvelope, FaProjectDiagram, FaBriefcase, FaGraduationCap,
  FaCertificate, FaQuoteLeft, FaShare, FaBell,
} from "react-icons/fa";
import Link from "next/link";

interface Stats {
  messages: number;
  unreadMessages: number;
  projects: number;
  experience: number;
  education: number;
  certifications: number;
  testimonials: number;
  social: number;
}

const statCards = [
  { key: "messages" as const, label: "Messages", icon: FaEnvelope, href: "/admin/messages", color: "text-accent" },
  { key: "projects" as const, label: "Projects", icon: FaProjectDiagram, href: "/admin/projects", color: "text-accent-secondary" },
  { key: "experience" as const, label: "Experience", icon: FaBriefcase, href: "/admin/experience", color: "text-warning" },
  { key: "education" as const, label: "Education", icon: FaGraduationCap, href: "/admin/education", color: "text-accent" },
  { key: "certifications" as const, label: "Certifications", icon: FaCertificate, href: "/admin/certifications", color: "text-warning" },
  { key: "testimonials" as const, label: "Testimonials", icon: FaQuoteLeft, href: "/admin/testimonials", color: "text-accent-secondary" },
  { key: "social" as const, label: "Social Links", icon: FaShare, href: "/admin/social", color: "text-accent-tertiary" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl text-foreground">Dashboard</h1>
        <p className="font-label text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">Manage all your portfolio content from here.</p>
      </div>

      {stats?.unreadMessages && stats.unreadMessages > 0 ? (
        <Link href="/admin/messages">
          <div className="mb-6 flex items-center gap-3 border-l-2 border-accent-secondary bg-accent-secondary/10 px-4 py-3 font-mono text-accent-secondary hover:bg-accent-secondary/20 transition-colors">
            <FaBell />
            <span className="text-sm font-medium">
              You have <strong>{stats.unreadMessages}</strong> unread message{stats.unreadMessages !== 1 ? "s" : ""}
            </span>
          </div>
        </Link>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statCards.map(({ key, label, icon: Icon, href, color }) => (
          <Link key={key} href={href} className="cyber-glow-wrap focus-visible:outline-2 focus-visible:outline-accent-tertiary">
            <Card hoverEffect className="cursor-pointer gap-3">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="font-label font-normal text-xs tracking-[0.2em] text-muted-foreground">{label}</CardTitle>
                <Icon className={`text-xl ${color}`} />
              </CardHeader>
              <CardContent>
                <div className="font-heading text-3xl font-black text-foreground">
                  {stats ? stats[key] : <span className="text-muted-foreground animate-blink">_</span>}
                </div>
                {key === "messages" && stats && stats.unreadMessages > 0 && (
                  <p className="font-label text-xs uppercase tracking-[0.15em] text-accent-secondary mt-1">{stats.unreadMessages} unread</p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="terminal" terminalTitle="dashboard.sh">
          <CardHeader>
            <CardTitle className="text-sm text-accent-tertiary">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { href: "/admin/projects", label: "＋ Add New Project" },
              { href: "/admin/experience", label: "＋ Add Experience" },
              { href: "/admin/education", label: "＋ Add Education" },
              { href: "/admin/certifications", label: "＋ Add Certification" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="flex items-center min-h-9 font-label text-sm uppercase tracking-[0.15em] text-accent hover:text-glow">
                {label}
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card variant="terminal" terminalTitle="dashboard.sh">
          <CardHeader>
            <CardTitle className="text-sm text-accent-tertiary">Database Info</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm text-foreground/80 space-y-1">
            <p>Provider: SQLite (local file)</p>
            <p>File: <code className="text-xs bg-muted text-accent px-1">prisma/dev.db</code></p>
            <p className="text-xs mt-2 text-muted-foreground">
              For production, migrate to PostgreSQL (Neon, Supabase, or PlanetScale) by changing DATABASE_URL in .env
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
