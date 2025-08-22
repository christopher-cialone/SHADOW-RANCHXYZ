import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const westernButtonVariants = cva(
  "inline-flex items-center justify-center font-deputy font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-desert-500 to-sunset-500 text-white border-2 border-desert-600 hover:scale-105 hover:shadow-xl shadow-lg",
        secondary: "bg-gradient-to-r from-sage-500 to-sage-600 text-white border-2 border-sage-700 hover:scale-105 hover:shadow-xl shadow-lg",
        tertiary: "bg-gradient-to-r from-rust-500 to-rust-600 text-white border-2 border-rust-700 hover:scale-105 hover:shadow-xl shadow-lg",
        ghost: "bg-transparent border-2 border-desert-600 text-desert-400 hover:bg-desert-600/20 hover:text-desert-300",
        outline: "bg-transparent border-2 border-current hover:bg-current hover:text-background"
      },
      size: {
        sm: "px-3 py-2 text-sm",
        default: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        icon: "h-10 w-10"
      },
      glow: {
        true: "animate-glow-pulse",
        false: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      glow: false
    }
  }
);

export interface WesternButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof westernButtonVariants> {}

const WesternButton = forwardRef<HTMLButtonElement, WesternButtonProps>(
  ({ className, variant, size, glow, ...props }, ref) => {
    return (
      <button
        className={cn(westernButtonVariants({ variant, size, glow, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

WesternButton.displayName = "WesternButton";

export { WesternButton, westernButtonVariants };
