"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string;
  /** ms per character */
  speed?: number;
  /** ms before typing starts */
  delay?: number;
  className?: string;
}

/**
 * Types `text` out character by character, then leaves a blinking cursor.
 * Screen readers get the full string immediately via the sr-only copy.
 */
export function Typewriter({ text, speed = 28, delay = 400, className }: TypewriterProps) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length && interval) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay, reduceMotion]);

  const shown = reduceMotion ? text : text.slice(0, count);

  return (
    <span className={cn("relative", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="cyber-cursor">
        {shown}
      </span>
    </span>
  );
}
