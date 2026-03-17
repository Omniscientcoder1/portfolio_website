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
  { key: "messages" as const, label: "Messages", icon: FaEnvelope, href: "/admin/messages", color: "text-blue-500" },
  { key: "projects" as const, label: "Projects", icon: FaProjectDiagram, href: "/admin/projects", color: "text-purple-500" },
  { key: "experience" as const, label: "Experience", icon: FaBriefcase, href: "/admin/experience", color: "text-orange-500" },
  { key: "education" as const, label: "Education", icon: FaGraduationCap, href: "/admin/education", color: "text-green-500" },
  { key: "certifications" as const, label: "Certifications", icon: FaCertificate, href: "/admin/certifications", color: "text-yellow-500" },
  { key: "testimonials" as const, label: "Testimonials", icon: FaQuoteLeft, href: "/admin/testimonials", color: "text-pink-500" },
  { key: "social" as const, label: "Social Links", icon: FaShare, href: "/admin/social", color: "text-cyan-500" },
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
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-foreground/60 mt-1">Manage all your portfolio content from here.</p>
      </div>

      {stats?.unreadMessages && stats.unreadMessages > 0 ? (
        <Link href="/admin/messages">
          <div className="mb-6 flex items-center gap-3 bg-blue-500/10 border border-blue-500/30 rounded-xl px-4 py-3 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors">
            <FaBell />
            <span className="text-sm font-medium">
              You have <strong>{stats.unreadMessages}</strong> unread message{stats.unreadMessages !== 1 ? "s" : ""}
            </span>
          </div>
        </Link>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statCards.map(({ key, label, icon: Icon, href, color }) => (
          <Link key={key} href={href}>
            <Card className="glass hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-foreground/70">{label}</CardTitle>
                <Icon className={`text-xl ${color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {stats ? stats[key] : <span className="text-foreground/30">…</span>}
                </div>
                {key === "messages" && stats && stats.unreadMessages > 0 && (
                  <p className="text-xs text-blue-500 mt-1">{stats.unreadMessages} unread</p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { href: "/admin/projects", label: "＋ Add New Project" },
              { href: "/admin/experience", label: "＋ Add Experience" },
              { href: "/admin/education", label: "＋ Add Education" },
              { href: "/admin/certifications", label: "＋ Add Certification" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="block text-sm text-primary hover:underline">
                {label}
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base">Database Info</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-foreground/70 space-y-1">
            <p>Provider: SQLite (local file)</p>
            <p>File: <code className="text-xs bg-foreground/10 px-1 rounded">prisma/dev.db</code></p>
            <p className="text-xs mt-2 text-foreground/50">
              For production, migrate to PostgreSQL (Neon, Supabase, or PlanetScale) by changing DATABASE_URL in .env
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
