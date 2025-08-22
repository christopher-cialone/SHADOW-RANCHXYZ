import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const westernCardVariants = cva(
  "rounded-lg shadow-xl backdrop-blur-sm border-2 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-leather-900/90 to-leather-800/90 border-desert-600",
        leather: "bg-gradient-to-br from-leather-800/90 to-leather-700/90 border-leather-600",
        gold: "bg-gradient-to-br from-sunset-900/90 to-sunset-800/90 border-sunset-600",
        mystical: "bg-gradient-to-br from-mystic-900/90 to-mystic-800/90 border-mystic-600"
      },
      glow: {
        true: "animate-glow-pulse",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      glow: false
    }
  }
);

export interface WesternCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof westernCardVariants> {}

const WesternCard = forwardRef<HTMLDivElement, WesternCardProps>(
  ({ className, variant, glow, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(westernCardVariants({ variant, glow, className }))}
        {...props}
      />
    );
  }
);

WesternCard.displayName = "WesternCard";

const WesternCardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

WesternCardHeader.displayName = "WesternCardHeader";

const WesternCardTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-western text-2xl leading-none tracking-tight text-desert-400", className)}
    {...props}
  />
));

WesternCardTitle.displayName = "WesternCardTitle";

const WesternCardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground font-mono", className)}
    {...props}
  />
));

WesternCardDescription.displayName = "WesternCardDescription";

const WesternCardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));

WesternCardContent.displayName = "WesternCardContent";

const WesternCardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

WesternCardFooter.displayName = "WesternCardFooter";

export {
  WesternCard,
  WesternCardHeader,
  WesternCardFooter,
  WesternCardTitle,
  WesternCardDescription,
  WesternCardContent,
};
