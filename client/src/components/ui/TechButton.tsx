import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TechButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "danger";
  size?: "sm" | "md" | "lg";
}

const TechButton = forwardRef<HTMLButtonElement, TechButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-tech uppercase tracking-wider transition-all duration-200 relative overflow-hidden border-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-tech-cyan-600 hover:bg-tech-cyan-500 border-tech-cyan-400 text-white hover:shadow-lg hover:shadow-tech-cyan-500/25",
      secondary: "bg-tech-purple-600 hover:bg-tech-purple-500 border-tech-purple-400 text-white hover:shadow-lg hover:shadow-tech-purple-500/25",
      accent: "bg-tech-pink-600 hover:bg-tech-pink-500 border-tech-pink-400 text-white hover:shadow-lg hover:shadow-tech-pink-500/25",
      danger: "bg-red-600 hover:bg-red-500 border-red-400 text-white hover:shadow-lg hover:shadow-red-500/25"
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs rounded",
      md: "px-4 py-2 text-sm rounded-md",
      lg: "px-6 py-3 text-base rounded-lg"
    };

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{props.children}</span>
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full hover:translate-x-full transition-transform duration-700" />
      </button>
    );
  }
);

TechButton.displayName = "TechButton";

export { TechButton };