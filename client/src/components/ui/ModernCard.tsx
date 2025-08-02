import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const modernCardVariants = cva(
  "modern-card transition-all duration-300 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-card border-border",
        primary: "bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20",
        secondary: "bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20",
        muted: "bg-muted/50 border-muted-foreground/20",
      },
      size: {
        sm: "p-4 rounded-lg",
        md: "p-6 rounded-xl",
        lg: "p-8 rounded-2xl",
        xl: "p-10 rounded-3xl",
      },
      glow: {
        none: "",
        subtle: "shadow-lg shadow-primary/5",
        medium: "shadow-xl shadow-primary/10",
        strong: "shadow-2xl shadow-primary/20",
      },
      hover: {
        none: "",
        lift: "hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/15",
        glow: "hover:shadow-2xl hover:shadow-primary/25 hover:border-primary/40",
        both: "hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/25 hover:border-primary/40",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      glow: "none",
      hover: "none",
    },
  }
);

export interface ModernCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modernCardVariants> {}

const ModernCard = forwardRef<HTMLDivElement, ModernCardProps>(
  ({ className, variant, size, glow, hover, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(modernCardVariants({ variant, size, glow, hover }), className)}
        {...props}
      >
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="grid-pattern h-full w-full" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-inherit" />
        </div>
      </div>
    );
  }
);

ModernCard.displayName = "ModernCard";

export { ModernCard, modernCardVariants };