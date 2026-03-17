"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FaHome, FaEnvelope, FaProjectDiagram, FaBriefcase,
  FaGraduationCap, FaCertificate, FaQuoteLeft, FaShare, FaSignOutAlt,
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
        <Link href="/admin/dashboard" className="text-lg font-bold text-primary">
          ⚡ Admin Panel
        </Link>
        <p className="text-xs text-foreground/50 mt-1">Portfolio Manager</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
              pathname.startsWith(href)
                ? "bg-primary/10 text-primary font-medium"
                : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
            )}
          >
            <Icon className="text-base shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-border space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground/70 hover:bg-foreground/5 hover:text-foreground transition-colors"
        >
          <FaHome className="text-base shrink-0" />
          View Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <FaSignOutAlt className="text-base shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
