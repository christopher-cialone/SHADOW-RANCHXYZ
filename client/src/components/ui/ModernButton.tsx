import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const modernButtonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
  {
    variants: {
      variant: {
        primary: [
          "btn-primary text-primary-foreground",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-transparent before:to-white/20",
          "before:translate-x-[-100%] before:transition-transform before:duration-700",
          "hover:before:translate-x-[100%]"
        ],
        secondary: [
          "btn-secondary",
          "hover:text-primary"
        ],
        outline: [
          "border-2 border-primary/50 text-primary bg-transparent",
          "hover:bg-primary hover:text-primary-foreground hover:border-primary",
          "hover:shadow-lg hover:shadow-primary/25"
        ],
        ghost: [
          "text-muted-foreground bg-transparent",
          "hover:text-foreground hover:bg-muted/50"
        ],
        destructive: [
          "bg-destructive text-destructive-foreground",
          "hover:bg-destructive/90",
          "shadow-lg shadow-destructive/25"
        ]
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-13 px-8 text-lg",
        xl: "h-16 px-10 text-xl",
        icon: "h-11 w-11"
      },
      glow: {
        none: "",
        subtle: "shadow-lg",
        medium: "shadow-xl",
        strong: "shadow-2xl"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      glow: "none"
    }
  }
);

export interface ModernButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof modernButtonVariants> {}

const ModernButton = forwardRef<HTMLButtonElement, ModernButtonProps>(
  ({ className, variant, size, glow, children, ...props }, ref) => {
    return (
      <button
        className={cn(modernButtonVariants({ variant, size, glow }), className)}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

ModernButton.displayName = "ModernButton";

export { ModernButton, modernButtonVariants };