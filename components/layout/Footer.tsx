import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSocialIcon } from "@/lib/social-icons";
import { IconBox } from "@/components/ui/IconBox";

type SocialRow = Awaited<ReturnType<typeof prisma.socialLink.findMany>>[number];

const footerLinks = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Education", href: "/education" },
  { name: "Contact", href: "/contact" },
];

const headingClasses = "font-label text-xs uppercase tracking-[0.3em] text-accent-tertiary mb-5";

export async function Footer() {
  const socialLinks = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-border bg-card/60 cyber-grid">
      <div aria-hidden className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-secondary/70 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <p className="font-heading text-xl font-black uppercase tracking-[0.2em] text-foreground mb-4">
            Tahmidur<span className="text-accent text-glow">_</span>
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
            Building exceptional digital experiences with modern technologies — full-stack
            engineering with a focus on secure software design.
          </p>
          <p className="mt-6 font-mono text-xs text-muted-foreground">
            <span className="text-accent">guest@portfolio</span>
            <span className="text-foreground">:</span>
            <span className="text-accent-tertiary">~</span>$ <span className="cyber-cursor">uptime --since {year}</span>
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer">
          <h2 className={headingClasses}>{"// "}Navigate</h2>
          <ul className="space-y-1">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-2 min-h-9 font-label text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-accent transition-colors duration-150"
                >
                  <span aria-hidden className="text-border group-hover:text-accent">&gt;</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social */}
        <div>
          <h2 className={headingClasses}>{"// "}Uplink</h2>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((social: SocialRow) => {
              const Icon = getSocialIcon(social.icon);
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="focus-visible:outline-2 focus-visible:outline-accent-tertiary"
                >
                  <IconBox interactive>
                    <Icon />
                  </IconBox>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 font-label text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <p>&copy; {year} Tahmidur Rahman // All rights reserved</p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 bg-accent shadow-neon-sm" />
            Signal stable
          </p>
        </div>
      </div>
    </footer>
  );
}
