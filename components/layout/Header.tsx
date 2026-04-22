"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, useScroll } from "framer-motion";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Education", href: "/education" },
  { name: "Contact", href: "/contact" },
];

function isActiveLink(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 origin-left z-[60]"
      />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
      >
        <nav className="glass-solid-nav rounded-2xl shadow-2xl shadow-blue-500/20 max-w-7xl mx-auto px-6 py-4 border border-blue-400/20">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">
              Tahmidur Rahman
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const active = isActiveLink(link.href, pathname);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative pb-0.5 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? "text-blue-500 dark:text-blue-400"
                        : "text-foreground/80 hover:text-blue-500 dark:hover:text-blue-400"
                    }`}
                  >
                    {link.name}
                    {active && (
                      <motion.span
                        layoutId="nav-active-indicator"
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-blue-400 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Theme Toggle + Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg glass-strong hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {mounted ? (
                  theme === "dark" ? (
                    <FaSun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <FaMoon className="w-5 h-5 text-blue-600" />
                  )
                ) : (
                  <div className="w-5 h-5" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg glass-strong"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-border"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const active = isActiveLink(link.href, pathname);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        active
                          ? "border-l-2 border-blue-400 pl-3 text-blue-400 bg-blue-500/5"
                          : "text-foreground/80 hover:text-blue-400 hover:bg-blue-500/5"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </nav>
      </motion.header>
    </>
  );
}
