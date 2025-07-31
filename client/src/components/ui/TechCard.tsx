import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const techCardVariants = cva(
  "card-mobile-compact sm:card-mobile shadow-xl backdrop-blur-sm transition-all duration-200 hover:shadow-2xl",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-tech-purple-900/90 to-tech-purple-800/90 border-2 border-tech-purple-600",
        purple: "bg-gradient-to-br from-tech-purple-900/90 to-tech-purple-800/90 border-2 border-tech-purple-500",
        cyan: "bg-gradient-to-br from-tech-cyan-900/90 to-tech-cyan-800/90 border-2 border-tech-cyan-500",
        pink: "bg-gradient-to-br from-tech-pink-900/90 to-tech-pink-800/90 border-2 border-tech-pink-500",
        neutral: "bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-slate-600",
      },
      glow: {
        none: "",
        purple: "shadow-2xl shadow-tech-purple-500/20",
        cyan: "shadow-2xl shadow-tech-cyan-500/20",
        pink: "shadow-2xl shadow-tech-pink-500/20",
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