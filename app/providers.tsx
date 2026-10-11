"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    // The cyberpunk system is dark-only; forcing the theme keeps any
    // `dark:` utilities consistent and ignores stale localStorage values.
    <ThemeProvider attribute="class" forcedTheme="dark" defaultTheme="dark" enableSystem={false}>
      {/* Honour prefers-reduced-motion for every framer-motion animation */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
