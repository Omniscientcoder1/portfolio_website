"use client";

import { motion } from "framer-motion";
import { FaCode, FaServer, FaTools, FaShieldAlt, FaTrophy, FaRocket } from "react-icons/fa";
import { TiltCard } from "@/components/ui/TiltCard";

const skills = [
  {
    category: "Languages",
    icon: FaCode,
    items: ["JavaScript (ES6+)", "TypeScript", "PHP", "Python", "C", "C++"],
  },
  {
    category: "Frameworks & Libraries",
    icon: FaServer,
    items: ["React.js", "Next.js", "Node.js", "Express.js", "Django", "Flutter", "FastAPI"],
  },
  {
    category: "Databases",
    icon: FaTools,
    items: ["MySQL", "MongoDB", "PostgreSQL"],
  },
  {
    category: "DevOps & Tools",
    icon: FaShieldAlt,
    items: ["Docker", "nginx", "Git", "GitHub", "Linux (Ubuntu)"],
  },
];

const achievements = [
  {
    icon: FaTrophy,
    title: "4 Production Websites",
    description: "Built and deployed 4 full-scale corporate websites for Bangladesh Finance PLC. within 6 months",
  },
  {
    icon: FaRocket,
    title: "60% Faster Onboarding",
    description: "Developed a mobile eKYC app that cut manual verification time by 60%",
  },
  {
    icon: FaShieldAlt,
    title: "70% Faster File Access",
    description: "Architected a QR code–based archiving system reducing file retrieval time by 70%",
  },
  {
    icon: FaCode,
    title: "Promoted in 3 Months",
    description: "Selected as top-performing intern and promoted to Officer Grade-1 within 3 months",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/4 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          style={{ transformStyle: "preserve-3d", perspective: "800px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills &amp; Achievements</h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Technologies I work with and milestones I&apos;ve reached
          </p>
        </motion.div>

        {/* Achievements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, rotateY: -60, scale: 0.85 }}
              whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.12, type: "spring", stiffness: 100 }}
              style={{ perspective: "800px" }}
            >
              <TiltCard intensity={7}>
                <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center h-full">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="p-3 rounded-xl bg-blue-500/20 border border-blue-400/30 mb-4"
                  >
                    <item.icon className="w-7 h-7 text-blue-400" />
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{item.description}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40, rotateX: -12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 90 }}
              style={{ perspective: "800px" }}
            >
              <TiltCard intensity={6}>
                <div className="glass-card rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30">
                      <group.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="font-bold text-foreground">{group.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {group.items.map((skill, i) => (
                      <motion.li
                        key={skill}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                        className="flex items-center gap-2 text-sm text-foreground/70"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

