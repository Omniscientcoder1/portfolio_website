"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

export function TiltCard({ children, className, intensity = 8, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateY = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateX = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), {
    stiffness: 300,
    damping: 30,
  });

  const glareGradient = useTransform(
    [mx, my],
    ([cx, cy]: number[]) =>
      `radial-gradient(circle at ${cx * 100}% ${cy * 100}%, rgba(147,197,253,0.18) 0%, transparent 65%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div style={{ perspective: "1000px" }} className={cn("h-full", className)}>
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full"
      >
        <div style={{ transform: "translateZ(0px)" }} className="h-full">
          {children}
        </div>
        {glare && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
            style={{ background: glareGradient }}
          />
        )}
      </motion.div>
    </div>
  );
}
