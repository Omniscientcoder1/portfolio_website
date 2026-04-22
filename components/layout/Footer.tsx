import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaYoutube, FaInstagram, FaFacebook, FaArrowRight } from "react-icons/fa";
import { prisma } from "@/lib/prisma";

type SocialRow = Awaited<ReturnType<typeof prisma.socialLink.findMany>>[number];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaYoutube, FaInstagram, FaFacebook,
};

const quickLinks = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Education", href: "/education" },
  { name: "Contact", href: "/contact" },
];

export async function Footer() {
  const socialLinks = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });

  return (
    <footer className="glass-strong mt-20 border-t border-blue-400/30 backdrop-blur-xl shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text mb-3">
              Tahmidur Rahman
            </h3>
            <p className="text-foreground/65 text-sm leading-relaxed mb-3">
              Building exceptional digital experiences.
            </p>
            <p className="text-xs text-foreground/35 font-mono tracking-wide">
              Next.js · React · TypeScript · Node.js
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mb-5">Quick Links</h4>
            <div className="flex flex-col space-y-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-1.5 text-sm text-foreground/65 hover:text-blue-400 transition-colors duration-200"
                >
                  <FaArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mb-5">Connect</h4>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((social: SocialRow) => {
                const Icon = iconMap[social.icon] ?? FaEnvelope;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-foreground/65 hover:text-blue-400 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-blue-400/15 text-center text-xs text-foreground/45">
          <p>
            &copy; {new Date().getFullYear()} Tahmidur Rahman.&nbsp;
            Built with Next.js, TypeScript &amp; Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
