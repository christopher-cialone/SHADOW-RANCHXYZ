import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TechButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "danger";
  size?: "sm" | "md" | "lg";
}

const TechButton = forwardRef<HTMLButtonElement, TechButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseClasses = "touch-target inline-flex items-center justify-center font-mono uppercase tracking-wider transition-all duration-200 relative overflow-hidden border-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
    
    const variants = {
      primary: "bg-cyan-500 hover:bg-cyan-400 border-cyan-400 text-black font-bold hover:shadow-lg hover:shadow-cyan-400/25",
      secondary: "bg-gray-800 hover:bg-gray-700 border-gray-600 text-cyan-400 hover:shadow-lg hover:shadow-gray-700/25",
      accent: "bg-purple-600 hover:bg-purple-500 border-purple-400 text-white hover:shadow-lg hover:shadow-purple-500/25",
      danger: "bg-red-600 hover:bg-red-500 border-red-400 text-white hover:shadow-lg hover:shadow-red-500/25"
    };

    const sizes = {
      sm: "px-3 py-2 text-mobile-sm rounded-md min-h-10",
      md: "px-4 py-3 text-mobile-base rounded-lg min-h-11", 
      lg: "px-6 py-4 text-mobile-lg rounded-xl min-h-12"
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