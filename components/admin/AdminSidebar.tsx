"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FaHome, FaEnvelope, FaProjectDiagram, FaBriefcase,
  FaGraduationCap, FaCertificate, FaQuoteLeft, FaShare, FaSignOutAlt, FaExternalLinkAlt,
} from "react-icons/fa";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: FaHome },
  { href: "/admin/messages", label: "Messages", icon: FaEnvelope },
  { href: "/admin/projects", label: "Projects", icon: FaProjectDiagram },
  { href: "/admin/experience", label: "Experience", icon: FaBriefcase },
  { href: "/admin/education", label: "Education", icon: FaGraduationCap },
  { href: "/admin/certifications", label: "Certifications", icon: FaCertificate },
  { href: "/admin/testimonials", label: "Testimonials", icon: FaQuoteLeft },
  { href: "/admin/social", label: "Social Links", icon: FaShare },
];

const itemClasses =
  "relative flex items-center gap-3 px-3 min-h-11 font-label text-xs uppercase tracking-[0.18em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent-tertiary";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin");
  };

  return (
    <aside className="w-60 shrink-0 min-h-screen bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/admin/dashboard" className="font-heading text-base font-black uppercase tracking-[0.2em] text-accent text-glow">
          Admin_Panel
        </Link>
        <p className="font-label text-[11px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
          <span className="text-accent">●</span> root access
        </p>
      </div>
      <nav aria-label="Admin" className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                itemClasses,
                active
                  ? "bg-accent/10 text-accent before:absolute before:left-0 before:inset-y-1 before:w-0.5 before:bg-accent before:shadow-neon"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="text-sm shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-border space-y-0.5">
        <Link
          href="/"
          target="_blank"
          className={cn(itemClasses, "text-muted-foreground hover:bg-muted hover:text-accent-tertiary")}
        >
          <FaExternalLinkAlt className="text-sm shrink-0" />
          View Website
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className={cn(itemClasses, "w-full text-destructive hover:bg-destructive/10")}
        >
          <FaSignOutAlt className="text-sm shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
