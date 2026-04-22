"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaYoutube, FaInstagram, FaFacebook, FaExternalLinkAlt, FaDownload } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { SocialLink } from "@/types";

const TECH_BADGES = [
  { label: "React.js",    pos: "top-28 left-[6%]" },
  { label: "Next.js",     pos: "bottom-32 left-[5%]" },
  { label: "TypeScript",  pos: "top-1/3 right-[4%]" },
  { label: "Node.js",     pos: "bottom-1/4 right-[6%]" },
  { label: "MongoDB",     pos: "top-20 right-[18%]" },
  { label: "Docker",      pos: "bottom-40 left-[15%]" },
];

const SUBTITLE_WORDS = [
  { text: "Software", className: "" },
  { text: "Engineer", className: "" },
  { text: "specializing", className: "" },
  { text: "in", className: "" },
  { text: "full-stack", className: "" },
  { text: "development", className: "" },
  { text: "with", className: "" },
  { text: "React,", className: "text-blue-400 font-medium" },
  { text: "Next.js", className: "text-cyan-400 font-medium" },
  { text: "&", className: "" },
  { text: "Node.js", className: "text-blue-400 font-medium" },
  { text: "—", className: "" },
  { text: "building", className: "" },
  { text: "secure,", className: "" },
  { text: "high-performance", className: "" },
  { text: "web", className: "" },
  { text: "applications", className: "" },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaYoutube,
  FaInstagram,
  FaFacebook,
};

export function HeroSection({ socialLinks }: { socialLinks: SocialLink[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });

  const x1 = useTransform(sx, [0, 1], [-28, 28]);
  const y1 = useTransform(sy, [0, 1], [-14, 14]);
  const x2 = useTransform(sx, [0, 1], [-14, 14]);
  const y2 = useTransform(sy, [0, 1], [-7, 7]);
  const x3 = useTransform(sx, [0, 1], [-5, 5]);
  const y3 = useTransform(sy, [0, 1], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
      style={{ perspective: "1200px" }}
      className="min-h-[95vh] flex items-center justify-center px-6 overflow-hidden relative"
    >
      {/* Background dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(59,130,246,0.25) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Rotating 3D ring (back layer) */}
      <motion.div
        style={{ x: x3, y: y3 }}
        className="absolute right-[8%] top-[18%] w-72 h-72 pointer-events-none hidden lg:block"
      >
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
          className="w-full h-full"
        >
          <div className="absolute inset-0 rounded-full border border-blue-500/20" />
          <div
            className="absolute inset-6 rounded-full border border-cyan-400/15"
            style={{ transform: "rotateX(65deg)" }}
          />
          <div
            className="absolute inset-14 rounded-full border-2 border-blue-400/10"
            style={{ transform: "rotateX(65deg) rotateZ(60deg)" }}
          />
        </motion.div>
      </motion.div>

      {/* Pulsing orb (mid layer) */}
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute left-[4%] bottom-[22%] w-52 h-52 pointer-events-none hidden lg:block"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.1, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/25 to-cyan-500/10 blur-2xl"
        />
        <div className="absolute inset-10 rounded-full border border-blue-400/20" />
      </motion.div>

      {/* Floating tech badges (front layer) */}
      {TECH_BADGES.map(({ label, pos }, i) => (
        <motion.div
          key={label}
          style={{ x: i < 3 ? x1 : x2, y: i < 3 ? y1 : y2 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
          className={`absolute pointer-events-none hidden xl:block ${pos}`}
        >
          <div className="px-3 py-1.5 rounded-full glass-strong border border-blue-400/25 text-xs text-blue-400/80 font-mono shadow-md shadow-blue-500/10">
            {label}
          </div>
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        style={{ x: x2, y: y2 }}
        className="max-w-4xl mx-auto w-full text-center relative z-10"
      >
        {/* Available for work badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-strong border border-green-400/30 text-green-400 text-sm font-medium mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          Available for opportunities
        </motion.div>

        {/* Name heading */}
        <div className="mb-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-2xl md:text-3xl text-foreground/50 font-light mb-3"
          >
            Hi, I&apos;m
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, rotateX: -30, y: 40 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 80 }}
            style={{ transformStyle: "preserve-3d" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 text-transparent bg-clip-text animate-gradient">
              Tahmidur Rahman
            </span>
          </motion.h1>
        </div>

        {/* Word-stagger subtitle */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.45 } } }}
          className="text-lg md:text-xl text-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {SUBTITLE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
              }}
              className={`inline-block mr-[0.3em] ${word.className}`}
            >
              {word.text}
            </motion.span>
          ))}
        </motion.p>

        {/* CTA Buttons with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <MagneticButton>
            <Link href="/contact">
              <Button
                size="lg"
                className="shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300"
              >
                Get In Touch
              </Button>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <a href="/images/Tahmidur_Rahman_Resume_FieldNation.pdf" download>
              <Button
                size="lg"
                variant="outline"
                className="hover:-translate-y-1 transition-all duration-300"
              >
                <FaDownload className="mr-2" />
                Download CV
              </Button>
            </a>
          </MagneticButton>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="flex gap-4 justify-center"
        >
          {socialLinks.map((social) => {
            const Icon = iconMap[social.icon] ?? FaExternalLinkAlt;
            return (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-xl glass-strong shadow-md hover:shadow-blue-500/40 transition-shadow duration-300"
              >
                <Icon className="w-6 h-6 text-blue-400" />
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30 text-xs pointer-events-none"
      >
        <span className="tracking-widest uppercase text-[10px]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-foreground/15 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-blue-400/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
