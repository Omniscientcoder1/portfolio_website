"use client";

import { motion } from "framer-motion";
import { Code2, Rocket, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/IconBox";
import { SectionHeading } from "@/components/ui/SectionHeading";

const VALUES = [
  {
    icon: Code2,
    tone: "accent" as const,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and efficient code following industry best practices",
  },
  {
    icon: Rocket,
    tone: "tertiary" as const,
    title: "Performance",
    description: "Optimizing applications for speed, scalability, and excellent user experience",
  },
  {
    icon: Lightbulb,
    tone: "secondary" as const,
    title: "Innovation",
    description: "Constantly learning and implementing cutting-edge technologies",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen px-4 sm:px-6 py-16 md:py-24">
      <div aria-hidden className="absolute inset-x-0 top-0 h-96 cyber-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading
          as="h1"
          label="~/about"
          title="About Me"
          description="Passionate about building exceptional digital experiences"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-16 cyber-glow-wrap"
        >
          <Card variant="terminal" terminalTitle="guest@portfolio: ~/about" className="px-6 md:px-8">
            <p className="font-mono text-sm text-muted-foreground -mb-2">
              <span className="text-accent">guest@portfolio</span>:<span className="text-accent-tertiary">~</span>$ cat about.txt
            </p>
            <div className="space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed">
              <p>
                I&apos;m a results-driven <span className="text-accent">Software Engineer</span> with hands-on experience in full-stack
                development using JavaScript, React, and Node.js. I specialize in designing
                secure, high-performance web applications with REST APIs, MySQL/MongoDB databases,
                and Docker-based deployments.
              </p>
              <p>
                Currently working as a Software Developer (Officer Grade-1) at <span className="text-accent-tertiary">Bangladesh Finance PLC.</span>,
                where I have built and deployed 4 production-grade corporate websites, developed a
                mobile eKYC app that cut manual verification time by 60%, and architected
                a QR code–based file archiving system that reduced document access time by 70%.
              </p>
              <p>
                I hold a B.Sc in Computer Science &amp; Engineering from UITS and am currently
                pursuing an M.Sc in <span className="text-accent-secondary">Information Systems Security</span> at Bangladesh University of
                Professionals. I&apos;m passionate about secure software design, continuous learning,
                and building things that create real-world impact.
              </p>
            </div>
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-accent">guest@portfolio</span>:<span className="text-accent-tertiary">~</span>$ <span className="cyber-cursor" />
            </p>
          </Card>
        </motion.div>

        <h2 className="font-label text-xs uppercase tracking-[0.3em] text-accent-tertiary mb-6">{"// "}core_directives</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
              className={index === 1 ? "md:translate-y-6 cyber-glow-wrap" : "cyber-glow-wrap"}
            >
              <Card hoverEffect className="h-full px-6">
                <div className="flex items-center justify-between">
                  <IconBox tone={value.tone} size="lg">
                    <value.icon strokeWidth={1.5} />
                  </IconBox>
                  <span aria-hidden className="font-label text-xs tracking-[0.25em] text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-lg text-foreground">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
