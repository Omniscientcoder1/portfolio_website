import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "relative text-card-foreground flex flex-col gap-6 py-6 transition-all duration-300 ease-digital",
  {
    variants: {
      variant: {
        default: "cyber-chamfer cyber-frame bg-card",
        // Terminal window: void background + decorative title bar (rendered below)
        terminal: "cyber-chamfer cyber-frame bg-background pt-14",
        // Glassy HUD panel. Not clipped, so a real outer neon glow is possible.
        holographic:
          "bg-muted/30 border border-accent/30 shadow-neon-sm backdrop-blur-md",
      },
      hoverEffect: {
        true: "hover:-translate-y-px hover:[--frame-color:var(--accent)] hover:shadow-[inset_0_0_24px_rgba(0,255,136,0.08)]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      hoverEffect: false,
    },
  }
)

type CardProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & {
    /** Label shown in the terminal variant's title bar */
    terminalTitle?: string
  }

function Card({ className, variant = "default", hoverEffect, terminalTitle, children, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(cardVariants({ variant, hoverEffect }), className)}
      {...props}
    >
      {variant === "terminal" && <TerminalBar title={terminalTitle} />}
      {variant === "holographic" && <HoloCorners />}
      {children}
    </div>
  )
}

function TerminalBar({ title = "~/session" }: { title?: string }) {
  return (
    <div
      aria-hidden
      className="absolute top-0 inset-x-0 h-9 flex items-center gap-2 px-4 border-b border-border bg-muted/40"
    >
      <span className="size-2.5 rounded-full bg-destructive" />
      <span className="size-2.5 rounded-full bg-warning" />
      <span className="size-2.5 rounded-full bg-accent" />
      <span className="ml-3 font-label text-[11px] uppercase tracking-[0.2em] text-muted-foreground truncate">
        {title}
      </span>
    </div>
  )
}

function HoloCorners() {
  const base = "absolute size-3 border-accent pointer-events-none"
  return (
    <>
      <span aria-hidden className={cn(base, "-top-px -left-px border-t-2 border-l-2")} />
      <span aria-hidden className={cn(base, "-top-px -right-px border-t-2 border-r-2")} />
      <span aria-hidden className={cn(base, "-bottom-px -left-px border-b-2 border-l-2")} />
      <span aria-hidden className={cn(base, "-bottom-px -right-px border-b-2 border-r-2")} />
    </>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-heading uppercase tracking-wide leading-tight font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
