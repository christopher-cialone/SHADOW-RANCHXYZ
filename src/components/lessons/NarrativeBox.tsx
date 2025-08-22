import { ReactNode, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const narrativeBoxVariants = cva(
  "border-l-4 p-4 rounded-r-lg mb-6 backdrop-blur-sm",
  {
    variants: {
      variant: {
        story: "bg-gradient-to-r from-tech-purple-800/50 to-tech-purple-700/50 border-tech-purple-500",
        challenge: "bg-gradient-to-r from-tech-cyan-800/30 to-tech-cyan-700/30 border-tech-cyan-600",
        success: "bg-gradient-to-r from-green-800/30 to-green-700/30 border-green-500",
        warning: "bg-gradient-to-r from-tech-pink-800/30 to-tech-pink-700/30 border-tech-pink-500",
        info: "bg-gradient-to-r from-blue-800/30 to-blue-700/30 border-blue-500"
      }
    },
    defaultVariants: {
      variant: "story"
    }
  }
);

interface NarrativeBoxProps extends VariantProps<typeof narrativeBoxVariants> {
  children: ReactNode;
  icon?: string;
  title?: string;
  className?: string;
  typewriter?: boolean;
  typewriterSpeed?: number;
}

export function NarrativeBox({ 
  children, 
  variant, 
  icon = "🤖", 
  title = "System Protocol",
  className,
  typewriter = false,
  typewriterSpeed = 50
}: NarrativeBoxProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const text = typeof children === 'string' ? children : '';

  useEffect(() => {
    if (typewriter && text) {
      setIsTyping(true);
      setDisplayedText('');
      
      let currentIndex = 0;
      const timer = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, typewriterSpeed);

      return () => clearInterval(timer);
    }
  }, [text, typewriter, typewriterSpeed]);
  const getIconColor = () => {
    switch (variant) {
      case 'challenge':
        return 'text-tech-cyan-400';
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-tech-pink-400';
      case 'info':
        return 'text-blue-400';
      default:
        return 'text-tech-purple-400';
    }
  };

  const getTitleColor = () => {
    switch (variant) {
      case 'challenge':
        return 'text-tech-cyan-400';
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-tech-pink-400';
      case 'info':
        return 'text-blue-400';
      default:
        return 'text-tech-purple-400';
    }
  };

  return (
    <div className={cn(narrativeBoxVariants({ variant }), className)}>
      <div className="flex items-start space-x-3">
        <span className={`${getIconColor()} text-xl mt-1`}>{icon}</span>
        <div>
          <h4 className={`font-tech mb-2 ${getTitleColor()} uppercase tracking-wider`}>
            {title}
          </h4>
          <div className="text-gray-300 font-code text-sm">
            {typewriter ? (
              <>
                {displayedText}
                {isTyping && <span className="animate-pulse">|</span>}
              </>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
