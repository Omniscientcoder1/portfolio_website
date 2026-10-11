import * as React from "react"

import { cn } from "@/lib/utils"
import { fieldShellClasses, fieldControlClasses } from "@/components/ui/input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <div data-slot="textarea-shell" className={fieldShellClasses}>
      <textarea
        data-slot="textarea"
        className={cn(fieldControlClasses, "flex field-sizing-content min-h-16 px-3 py-2 leading-relaxed", className)}
        {...props}
      />
    </div>
  )
}

export { Textarea }
