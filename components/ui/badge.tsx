import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 cyber-chamfer-tab px-2.5 py-1 font-label text-[11px] uppercase tracking-[0.15em] leading-none whitespace-nowrap transition-colors duration-150",
  {
    variants: {
      variant: {
        default: "bg-accent/10 text-accent shadow-[inset_0_0_0_1px_rgba(0,255,136,0.35)]",
        secondary: "bg-accent-secondary/10 text-accent-secondary shadow-[inset_0_0_0_1px_rgba(255,0,255,0.35)]",
        tertiary: "bg-accent-tertiary/10 text-accent-tertiary shadow-[inset_0_0_0_1px_rgba(0,212,255,0.35)]",
        muted: "bg-muted text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)]",
        warning: "bg-warning/10 text-warning shadow-[inset_0_0_0_1px_rgba(255,204,0,0.4)]",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
