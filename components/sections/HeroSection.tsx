"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconBox } from "@/components/ui/IconBox";
import { GlitchText } from "@/components/ui/GlitchText";
import { Typewriter } from "@/components/ui/Typewriter";
import { getSocialIcon } from "@/lib/social-icons";
import type { SocialLink } from "@/types";

const TECH_STACK = ["React.js", "Next.js", "TypeScript", "Node.js", "MongoDB", "Docker"];

const STATS = [
  { value: "04", label: "Production sites shipped" },
  { value: "60%", label: "Faster eKYC verification" },
  { value: "70%", label: "Faster document access" },
];

const SUBTITLE =
  "Software Engineer specializing in full-stack development with React, Next.js & Node.js — building secure, high-performance web applications.";

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay, ease: [0.4, 0, 0.2, 1] as const },
});

export function HeroSection({ socialLinks }: { socialLinks: SocialLink[] }) {
  return (
    <section className="relative overflow-hidden">
      {/* Grid + circuit backdrop, faded at the edges */}
      <div
        aria-hidden
        className="absolute inset-0 cyber-grid [mask-image:radial-gradient(ellipse_80%_70%_at_40%_40%,black_30%,transparent_100%)]"
      />
      <div aria-hidden className="absolute inset-0 cyber-circuit opacity-60 [mask-image:linear-gradient(to_left,black,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20 lg:pt-20 lg:pb-28 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-10 items-center min-h-[calc(100vh-6rem)]">
        {/* ── Left 60%: identity ─────────────────────────── */}
        <div className="lg:col-span-3">
          <motion.p
            {...enter(0)}
            className="font-label text-xs sm:text-sm uppercase tracking-[0.3em] text-accent mb-6 flex items-center gap-3"
          >
            <span aria-hidden className="h-px w-10 bg-accent shadow-neon-sm" />
            <span>
              <span className="text-accent-tertiary">$</span> whoami
            </span>
          </motion.p>

          <motion.h1
            {...enter(0.1)}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-wider sm:tracking-widest mb-8"
          >
            <GlitchText text="Tahmidur" className="text-foreground" />
            <br />
            <GlitchText text="Rahman" className="text-accent drop-glow" />
          </motion.h1>

          <motion.p
            {...enter(0.2)}
            className="text-base md:text-lg xl:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10 min-h-[5.5em] md:min-h-[4.5em]"
          >
            <span aria-hidden className="text-accent-secondary mr-2">&gt;</span>
            <Typewriter text={SUBTITLE} delay={600} />
          </motion.p>

          <motion.div {...enter(0.3)} className="flex flex-wrap gap-4 mb-10">
            <Button asChild variant="glitch" size="lg">
              <Link href="/contact">Get In Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/images/Tahmidur_Rahman_Resume_FieldNation.pdf" download>
                <Download strokeWidth={1.5} />
                Download CV
              </a>
            </Button>
          </motion.div>

          <motion.ul {...enter(0.4)} className="flex flex-wrap gap-2" aria-label="Social links">
            {socialLinks.map((social) => {
              const Icon = getSocialIcon(social.icon);
              return (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="block focus-visible:outline-2 focus-visible:outline-accent-tertiary"
                  >
                    <IconBox interactive>
                      <Icon />
                    </IconBox>
                  </a>
                </li>
              );
            })}
          </motion.ul>
        </div>

        {/* ── Right 40%: HUD panel (desktop only) ───────── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="hidden lg:block lg:col-span-2 relative"
          aria-hidden
        >
          <Card variant="holographic" className="px-6 gap-5 rotate-1">
            <div className="flex items-center justify-between font-label text-[11px] uppercase tracking-[0.25em]">
              <span className="text-accent">{"// "}operator.profile</span>
              <span className="text-muted-foreground">id:0x7A3F</span>
            </div>

            <dl className="font-mono text-sm space-y-2.5">
              {[
                ["name", "Tahmidur Rahman"],
                ["role", "Software Engineer"],
                ["focus", "full-stack // infosec"],
                ["status", "building_secure_systems"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <dt className="text-accent-tertiary w-16 shrink-0">{k}:</dt>
                  <dd className="text-foreground truncate">{v}</dd>
                </div>
              ))}
            </dl>

            <div>
              <p className="font-label text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                Loaded modules [{TECH_STACK.length}]
              </p>
              <div className="flex flex-wrap gap-1.5">
                {TECH_STACK.map((t, i) => (
                  <Badge key={t} variant={i % 3 === 0 ? "default" : i % 3 === 1 ? "tertiary" : "secondary"}>
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Signal meter (decorative) */}
            <div className="flex items-end gap-1 h-10 pt-2 border-t border-accent/20">
              {Array.from({ length: 28 }).map((_, i) => (
                <span
                  key={i}
                  className="flex-1 bg-accent/60 animate-flicker"
                  style={{ height: `${25 + ((i * 37) % 75)}%`, animationDelay: `${(i % 7) * 0.4}s` }}
                />
              ))}
            </div>
          </Card>

          {/* Overlapping terminal — breaks the grid on purpose */}
          <div className="absolute -bottom-16 -left-12 w-72 -rotate-2 [filter:drop-shadow(0_0_6px_rgba(255,0,255,0.5))_drop-shadow(0_0_18px_rgba(255,0,255,0.2))]">
            <Card
              variant="terminal"
              terminalTitle="build.log"
              className="py-4 pt-12 px-4 [--frame-color:rgba(255,0,255,0.6)]"
            >
              <pre className="font-mono text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap">
                <span className="text-accent-tertiary">$</span> npm run build{"\n"}
                <span className="text-accent">✓</span> compiled successfully{"\n"}
                <span className="text-accent">✓</span> 0 vulnerabilities{"\n"}
                <span className="text-accent-secondary">→</span> <span className="cyber-cursor">deploying</span>
              </pre>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* ── Stats band ───────────────────────────────────── */}
      <div className="relative border-y border-border bg-card/70 backdrop-blur-sm">
        <dl className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 sm:divide-x divide-border">
          {STATS.map((s) => (
            <div key={s.label} className="py-6 sm:px-8 first:sm:pl-0 flex items-baseline gap-4 border-b sm:border-b-0 border-border last:border-b-0">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-heading text-3xl md:text-4xl font-black text-accent text-glow">{s.value}</dd>
              <dd className="font-label text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Scroll cue */}
      <div aria-hidden className="hidden lg:flex absolute bottom-32 right-6 flex-col items-center gap-2 font-label text-[10px] uppercase tracking-[0.3em] text-muted-foreground [writing-mode:vertical-rl]">
        scroll_down
        <ChevronDown className="size-4 text-accent animate-blink" strokeWidth={1.5} />
      </div>
    </section>
  );
}
