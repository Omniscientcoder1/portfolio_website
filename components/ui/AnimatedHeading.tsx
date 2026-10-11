"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.45, type: "spring" as const, stiffness: 110 },
  },
};

interface AnimatedHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function AnimatedHeading({ text, as: Tag = "h2", className }: AnimatedHeadingProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ perspective: "600px" }}
      className={className}
    >
      <Tag className="inline">
        {text.split(" ").map((word, i) => (
          <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25em]">
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
