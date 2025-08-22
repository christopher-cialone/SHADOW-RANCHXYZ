import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const techCardVariants = cva(
  "card-mobile-compact sm:card-mobile shadow-xl backdrop-blur-sm transition-all duration-200 hover:shadow-2xl",
  {
    variants: {
      variant: {
        default: "bg-gray-900/50 border-2 border-cyan-400/30",
        purple: "bg-gray-900/50 border-2 border-purple-400/30",
        cyan: "bg-gray-900/50 border-2 border-cyan-400/30",
        pink: "bg-gray-900/50 border-2 border-purple-400/30",
        neutral: "bg-gray-900/50 border-2 border-gray-600/30",
      },
      glow: {
        none: "",
        purple: "shadow-2xl shadow-purple-500/20",
        cyan: "shadow-2xl shadow-cyan-500/20",
        pink: "shadow-2xl shadow-purple-500/20",
      }
    },
    defaultVariants: {
      variant: "default",
      glow: "none",
    },
  }
);

export interface TechCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof techCardVariants> {}

const TechCard = forwardRef<HTMLDivElement, TechCardProps>(
  ({ className, variant, glow, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(techCardVariants({ variant, glow, className }))}
        {...props}
      />
    );
  }
);
TechCard.displayName = "TechCard";

export { TechCard, techCardVariants };