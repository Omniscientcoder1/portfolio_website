import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Chamfered field shell. Native inputs can't host ::after, so the
 * cyber-frame outline and focus/invalid states live on this wrapper.
 * Shared by Input and Textarea so the two never drift apart.
 */
export const fieldShellClasses = cn(
  "relative w-full min-w-0 cyber-chamfer-sm cyber-frame bg-input",
  "transition-all duration-200 ease-digital",
  "focus-within:[--frame-color:var(--accent)] focus-within:shadow-[inset_0_0_14px_rgba(0,255,136,0.2)]",
  "has-[[aria-invalid=true]]:[--frame-color:var(--destructive)]",
  "has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed"
)

export const fieldControlClasses = cn(
  "w-full min-w-0 bg-transparent border-0 outline-none",
  "font-mono text-sm text-accent caret-accent tracking-wide",
  "placeholder:text-muted-foreground",
  "selection:bg-accent selection:text-background",
  "aria-invalid:text-destructive disabled:pointer-events-none"
)

type InputProps = React.ComponentProps<"input"> & {
  /** Terminal prompt glyph rendered before the field. Pass `null` to hide. */
  promptSymbol?: React.ReactNode
}

function Input({ className, type, promptSymbol = ">", ...props }: InputProps) {
  return (
    <div data-slot="input-shell" className={fieldShellClasses}>
      {promptSymbol != null && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-accent text-glow"
        >
          {promptSymbol}
        </span>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          fieldControlClasses,
          "h-11 px-3 py-1",
          "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          promptSymbol != null && "pl-8",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
