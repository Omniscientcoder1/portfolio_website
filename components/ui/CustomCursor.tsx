"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const blobX = useSpring(dotX, { stiffness: 150, damping: 20, mass: 0.5 });
  const blobY = useSpring(dotY, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    // Only show on non-touch, non-reduced-motion devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReduced) return;

    document.body.classList.add("custom-cursor-active");
    setIsVisible(true);

    const onMove = (e: PointerEvent) => {
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      setIsHovering(!!target.closest("a, button, [data-cursor-hover]"));
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [dotX, dotY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot — instant */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-blue-400 pointer-events-none z-[9999]"
      />

      {/* Blob — spring-lagged */}
      <motion.div
        style={{
          x: blobX,
          y: blobY,
          translateX: "-50%",
          translateY: "-50%",
          marginLeft: 4,
          marginTop: 4,
        }}
        animate={{
          scale: isHovering ? 2.2 : 1,
          opacity: isHovering ? 0.6 : 0.35,
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-blue-400 pointer-events-none z-[9998]"
      />
    </>
  );
}
