"use client";

import { motion } from "framer-motion";
import { FaCode, FaRocket, FaLightbulb } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Me</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Passionate about building exceptional digital experiences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="glass-strong">
            <CardContent className="pt-8">
              <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
                <p>
                  I'm a results-driven Software Engineer with hands-on experience in full-stack
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
                  Professionals. I'm passionate about secure software design, continuous learning,
                  and building things that create real-world impact.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
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
          ].map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <Card className="glass-strong text-center h-full">
                <CardContent className="pt-8">
                  <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-foreground/70">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
