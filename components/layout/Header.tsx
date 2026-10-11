"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GlitchText } from "@/components/ui/GlitchText";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Education", href: "/education" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/85 backdrop-blur-md"
    >
      {/* Neon hairline along the bottom edge */}
      <div aria-hidden className="absolute -bottom-px inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

      <nav aria-label="Primary" className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 min-h-11 focus-visible:outline-2 focus-visible:outline-accent-tertiary"
        >
          <span
            aria-hidden
            className="cyber-chamfer-sm cyber-frame relative size-9 grid place-items-center [--frame-color:var(--accent)] font-heading text-sm font-black text-accent text-glow"
          >
            TR
          </span>
          <span className="font-heading text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-foreground group-hover:text-accent transition-colors duration-150">
            <GlitchText text="Tahmidur" />
            <span className="text-accent">_</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, i) => {
            const active = isActive(link.href);
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex items-center gap-1.5 px-3 h-11 font-label text-xs uppercase tracking-[0.2em] transition-colors duration-150",
                    "focus-visible:outline-2 focus-visible:outline-accent-tertiary",
                    active ? "text-accent text-glow" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className={cn("text-[10px]", active ? "text-accent-secondary" : "text-border")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.name}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden
                      className="absolute inset-x-3 -bottom-[11px] h-0.5 bg-accent shadow-neon"
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="size-1.5 bg-accent shadow-neon-sm animate-flicker" />
            Online
          </span>

          <Link href="/contact" className={cn(buttonVariants({ size: "sm" }), "hidden md:inline-flex")}>
            Hire_me
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="lg:hidden relative size-11 grid place-items-center cyber-chamfer-sm cyber-frame text-accent focus-visible:[--frame-color:var(--accent-tertiary)]"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="lg:hidden overflow-hidden border-t border-border bg-background/95 cyber-grid"
          >
            <ul className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col">
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 min-h-12 font-label text-sm uppercase tracking-[0.2em] border-b border-border/50",
                        active ? "text-accent" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span className="text-accent-secondary text-xs">{String(i + 1).padStart(2, "0")}</span>
                      <span aria-hidden>{active ? ">" : " "}</span>
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
