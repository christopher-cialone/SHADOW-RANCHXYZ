import { HTMLAttributes, forwardRef } from "react";
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TechCardProps {
  children: ReactNode;
  variant?: 'cyan' | 'purple' | 'neutral';
  className?: string;
}

export function TechCard({ children, variant = 'neutral', className = '' }: TechCardProps) {
  const baseClasses = "relative p-6 rounded-lg border backdrop-blur-sm transition-all duration-300";
  
  const variantClasses = {
    cyan: "bg-black/80 border-cyan-400/30 hover:border-cyan-400/60 hover:bg-cyan-400/5",
    purple: "bg-black/80 border-purple-400/30 hover:border-purple-400/60 hover:bg-purple-400/5",
    neutral: "bg-black/80 border-gray-600/30 hover:border-gray-600/60 hover:bg-gray-600/5"
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </div>
  );
}
