import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";
import { prisma } from "@/lib/prisma";

type SocialRow = Awaited<ReturnType<typeof prisma.socialLink.findMany>>[number];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaYoutube, FaInstagram, FaFacebook,
};

export async function Footer() {
  const socialLinks = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });
  return (
    <footer className="glass-strong mt-20 border-t border-blue-400/30 backdrop-blur-xl shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text mb-4">Portfolio</h3>
            <p className="text-foreground/70">
              Building exceptional digital experiences with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="text-foreground/70 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="text-foreground/70 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/contact"
                className="text-foreground/70 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social: SocialRow) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg glass-strong hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-400/20 text-center text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
