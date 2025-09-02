import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TechButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function TechButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: TechButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  
  const variantClasses = {
    primary: "bg-cyan-500 hover:bg-cyan-400 text-black border border-cyan-400 focus:ring-cyan-400",
    secondary: "bg-gray-800 hover:bg-gray-700 text-cyan-400 border border-gray-600 focus:ring-gray-500",
    outline: "bg-transparent hover:bg-cyan-400/10 text-cyan-400 border border-cyan-400/60 hover:border-cyan-400 focus:ring-cyan-400"
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg"
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}