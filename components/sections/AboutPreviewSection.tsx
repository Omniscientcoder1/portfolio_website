"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaCode, FaRocket, FaLightbulb } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

const STATS = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 4, suffix: "", label: "Production Apps" },
  { value: 60, suffix: "%", label: "Verification Time Saved" },
  { value: 70, suffix: "%", label: "Faster Doc Access" },
];

const SKILLS = [
  { category: "Frontend", color: "from-blue-500/10 to-cyan-500/5", border: "border-blue-400/20", tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", color: "from-cyan-500/10 to-blue-500/5", border: "border-cyan-400/20", tags: ["Node.js", "Express", "REST APIs", "PostgreSQL"] },
  { category: "DevOps", color: "from-purple-500/10 to-blue-500/5", border: "border-purple-400/20", tags: ["Docker", "Nginx", "Linux", "CI/CD"] },
  { category: "Security", color: "from-green-500/10 to-cyan-500/5", border: "border-green-400/20", tags: ["eKYC", "JWT", "OAuth", "OWASP"] },
];

const VALUES = [
  { icon: FaCode, title: "Clean Code", description: "Maintainable, scalable code following industry best practices" },
  { icon: FaRocket, title: "Performance", description: "Optimizing for speed, scalability, and excellent UX" },
  { icon: FaLightbulb, title: "Innovation", description: "Implementing cutting-edge technologies and solutions" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function AboutPreviewSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          style={{ transformStyle: "preserve-3d", perspective: "800px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Passionate engineer building secure, high-performance web applications
          </p>
        </motion.div>

        {/* Avatar + Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start mb-16"
        >
          {/* Avatar */}
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <motion.div
              whileHover={{ rotate: 3, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="relative w-48 h-48 md:w-60 md:h-60"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 blur-md opacity-40" />
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 flex items-center justify-center shadow-2xl shadow-blue-500/30 border border-blue-400/30">
                <span className="text-5xl md:text-6xl font-black text-white/90 select-none">TR</span>
              </div>
            </motion.div>
          </div>

          {/* Bio */}
          <div className="md:col-span-3">
            <Card className="glass-strong">
              <CardContent className="pt-8">
                <div className="space-y-4 text-base md:text-lg text-foreground/80 leading-relaxed">
                  <p>
                    I&apos;m a results-driven Software Engineer with hands-on experience in full-stack
                    development using JavaScript, React, and Node.js. I specialize in designing
                    secure, high-performance web applications with REST APIs and Docker-based deployments.
                  </p>
                  <p>
                    Currently working as a Software Developer (Officer Grade-1) at Bangladesh Finance PLC,
                    I&apos;ve built 4 production-grade corporate websites, a mobile eKYC app cutting
                    verification time by 60%, and a QR code–based archiving system reducing document access time by 70%.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 group"
                  >
                    Read my full story
                    <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center border border-blue-400/15"
            >
              <div className="text-3xl md:text-4xl font-black text-blue-400 mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs md:text-sm text-foreground/60 leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-bold mb-8 text-center"
          >
            Technical Skills
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SKILLS.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: gi * 0.1 }}
                className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${group.color} border ${group.border}`}
              >
                <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg glass-strong text-xs font-medium text-foreground/80 border border-blue-400/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-10">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-bold mb-8 text-center"
          >
            How I Work
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <Card className="glass-strong text-center h-full">
                  <CardContent className="pt-8">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="inline-block mb-4"
                    >
                      <value.icon className="w-10 h-10 text-primary" />
                    </motion.div>
                    <h4 className="text-lg font-bold mb-2">{value.title}</h4>
                    <p className="text-sm text-foreground/70">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 group"
          >
            Learn More About Me
            <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
