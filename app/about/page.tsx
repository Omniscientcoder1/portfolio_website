"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaCode, FaRocket, FaLightbulb } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { TiltCard } from "@/components/ui/TiltCard";

const STATS = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 4, suffix: "", label: "Production Apps" },
  { value: 60, suffix: "%", label: "Verification Time Saved" },
  { value: 70, suffix: "%", label: "Faster Doc Access" },
];

const SKILLS = [
  {
    category: "Frontend",
    color: "from-blue-500/10 to-cyan-500/5",
    border: "border-blue-400/20",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    color: "from-cyan-500/10 to-blue-500/5",
    border: "border-cyan-400/20",
    tags: ["Node.js", "Express", "REST APIs", "MySQL", "MongoDB", "PostgreSQL"],
  },
  {
    category: "DevOps",
    color: "from-purple-500/10 to-blue-500/5",
    border: "border-purple-400/20",
    tags: ["Docker", "Nginx", "Linux", "Git", "CI/CD"],
  },
  {
    category: "Security",
    color: "from-green-500/10 to-cyan-500/5",
    border: "border-green-400/20",
    tags: ["eKYC", "JWT", "OAuth", "OWASP", "Secure APIs"],
  },
];

const VALUES = [
  {
    icon: FaCode,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and efficient code following industry best practices",
  },
  {
    icon: FaRocket,
    title: "Performance",
    description: "Optimizing applications for speed, scalability, and excellent user experience",
  },
  {
    icon: FaLightbulb,
    title: "Innovation",
    description: "Constantly learning and implementing cutting-edge technologies",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25 } },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-5xl mx-auto space-y-20">

        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-foreground/60">
            Passionate about building exceptional digital experiences
          </p>
        </motion.div>

        {/* Block 1 — Avatar + Bio split */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start"
        >
          {/* Avatar */}
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <motion.div
              whileHover={{ rotate: 3, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="relative w-52 h-52 md:w-64 md:h-64"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 blur-md opacity-40" />
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 flex items-center justify-center shadow-2xl shadow-blue-500/30 border border-blue-400/30">
                <span className="text-6xl md:text-7xl font-black text-white/90 select-none">TR</span>
              </div>
            </motion.div>
          </div>

          {/* Bio */}
          <div className="md:col-span-3">
            <Card className="glass-strong">
              <CardContent className="pt-8">
                <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed">
                  <p>
                    I&apos;m a results-driven Software Engineer with hands-on experience in full-stack
                    development using JavaScript, React, and Node.js. I specialize in designing
                    secure, high-performance web applications with REST APIs, MySQL/MongoDB databases,
                    and Docker-based deployments.
                  </p>
                  <p>
                    Currently working as a Software Developer (Officer Grade-1) at Bangladesh Finance PLC.,
                    where I have built and deployed 4 production-grade corporate websites, developed a
                    mobile eKYC app that cut manual verification time by 60%, and architected
                    a QR code–based file archiving system that reduced document access time by 70%.
                  </p>
                  <p>
                    I hold a B.Sc in Computer Science & Engineering from UITS and am currently
                    pursuing an M.Sc in Information Systems Security at Bangladesh University of
                    Professionals. I&apos;m passionate about secure software design, continuous learning,
                    and building things that create real-world impact.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Block 2 — Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
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

        {/* Block 3 — Skills bento grid */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Technical Skills
          </motion.h2>
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
                <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
                  {group.category}
                </h3>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: gi * 0.08 } } }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {group.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      variants={tagVariants}
                      whileHover={{ scale: 1.08, backgroundColor: "rgba(59,130,246,0.18)" }}
                      className="px-3 py-1.5 rounded-lg glass-strong text-xs font-medium text-foreground/80 border border-blue-400/15 cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Block 4 — Value cards */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            How I Work
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <TiltCard intensity={5} className="h-full">
                  <Card className="glass-strong text-center h-full">
                    <CardContent className="pt-8">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="inline-block mb-4"
                      >
                        <value.icon className="w-12 h-12 text-primary" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-foreground/70">{value.description}</p>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
