"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GitHubProjectCard } from "@/components/ui/GitHubProjectCard";
import { GitHubRepo } from "@/types";

interface FeaturedProjectsSectionProps {
  repos: GitHubRepo[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export function FeaturedProjectsSection({ repos }: FeaturedProjectsSectionProps) {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Subtle section background depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          style={{ transformStyle: "preserve-3d", perspective: "800px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            A selection of my recent open-source work on GitHub
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {repos.map((repo, index) => (
            <GitHubProjectCard key={repo.id} repo={repo} index={index} featured />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/projects">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" variant="outline">
                View All Projects
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

