import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-label text-sm uppercase tracking-[0.2em]",
    "transition-all duration-150 ease-digital",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    // clip-path swallows outer rings, so focus is drawn inset (visible on chamfered variants too)
    "outline-none focus-visible:[--frame-color:var(--accent-tertiary)]",
    "focus-visible:shadow-[inset_0_0_0_2px_var(--accent-tertiary),inset_0_0_16px_rgba(0,212,255,0.45)]",
    "aria-invalid:[--frame-color:var(--destructive)]",
  ],
  {
    variants: {
      variant: {
        // Neon outline → floods with accent on hover
        default: [
          "cyber-chamfer-sm cyber-frame [--frame-w:2px] [--frame-color:var(--accent)]",
          "bg-transparent text-accent",
          "hover:bg-accent hover:text-background hover:shadow-[inset_0_0_14px_rgba(0,0,0,0.25)]",
        ],
        secondary: [
          "cyber-chamfer-sm cyber-frame [--frame-w:2px] [--frame-color:var(--accent-secondary)]",
          "bg-transparent text-accent-secondary",
          "hover:bg-accent-secondary hover:text-background",
        ],
        outline: [
          "cyber-chamfer-sm cyber-frame",
          "bg-transparent text-foreground",
          "hover:[--frame-color:var(--accent)] hover:text-accent hover:shadow-[inset_0_0_12px_rgba(0,255,136,0.25)]",
        ],
        ghost: "text-foreground hover:bg-accent/10 hover:text-accent",
        destructive: [
          "cyber-chamfer-sm cyber-frame [--frame-color:var(--destructive)]",
          "bg-transparent text-destructive",
          "hover:bg-destructive hover:text-background",
        ],
        // Solid CTA with chromatic aberration
        glitch: [
          "cyber-chamfer-sm bg-accent text-background font-bold",
          "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]",
          "hover:brightness-110 hover:[text-shadow:-2px_0_var(--accent-secondary),2px_0_var(--accent-tertiary)]",
          "active:translate-y-px",
        ],
        link: "text-accent underline-offset-4 hover:underline normal-case tracking-normal font-mono",
      },
      size: {
        default: "h-11 px-5 py-2 has-[>svg]:px-4",
        sm: "h-9 gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-12 px-8 has-[>svg]:px-6",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
