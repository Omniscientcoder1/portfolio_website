import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconBoxVariants = cva(
  "relative inline-flex items-center justify-center shrink-0 cyber-chamfer-sm cyber-frame transition-all duration-150 ease-digital",
  {
    variants: {
      tone: {
        accent: "text-accent [--frame-color:rgba(0,255,136,0.45)] bg-accent/5",
        secondary: "text-accent-secondary [--frame-color:rgba(255,0,255,0.45)] bg-accent-secondary/5",
        tertiary: "text-accent-tertiary [--frame-color:rgba(0,212,255,0.45)] bg-accent-tertiary/5",
      },
      size: {
        sm: "size-9 [&_svg]:size-4",
        md: "size-11 [&_svg]:size-5",
        lg: "size-14 [&_svg]:size-6",
      },
      interactive: {
        true: "hover:[--frame-color:currentColor] hover:shadow-[inset_0_0_14px_currentColor] hover:[&_svg]:drop-shadow-[0_0_4px_currentColor]",
        false: "",
      },
    },
    defaultVariants: { tone: "accent", size: "md", interactive: false },
  }
);

type IconBoxProps = React.ComponentProps<"span"> & VariantProps<typeof iconBoxVariants>;

/** Chamfered, glowing square that frames an icon. */
export function IconBox({ className, tone, size, interactive, ...props }: IconBoxProps) {
  return <span className={cn(iconBoxVariants({ tone, size, interactive }), className)} {...props} />;
}

export { iconBoxVariants };
