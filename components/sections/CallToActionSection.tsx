"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaEnvelope, FaFolderOpen } from "react-icons/fa";

export function CallToActionSection() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-cyan-500/10 to-blue-800/15 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Decorative blurred orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-strong border border-blue-400/30 text-blue-400 text-sm font-medium mb-8"
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-400 inline-block"
            />
            Available for opportunities
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Exceptional
            </span>{" "}
            Together
          </h2>

          <p className="text-lg md:text-xl text-foreground/65 max-w-2xl mx-auto mb-12 leading-relaxed">
            Whether you have a project in mind, need a full-stack engineer, or just want to
            connect — I&apos;m always open to new challenges and conversations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-base transition-colors duration-200 shadow-xl shadow-blue-500/35 hover:shadow-blue-500/55"
              >
                <FaEnvelope className="w-4 h-4" />
                Get In Touch
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full glass-strong border border-blue-400/40 hover:border-blue-400/70 text-foreground/85 hover:text-blue-400 font-bold text-base transition-all duration-200"
              >
                <FaFolderOpen className="w-4 h-4" />
                View My Work
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
