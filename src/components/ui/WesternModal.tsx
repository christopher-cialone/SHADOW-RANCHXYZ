import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface WesternModalProps extends HTMLAttributes<HTMLDivElement> {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function WesternModal({ 
  trigger, 
  title, 
  description, 
  children, 
  className,
  ...props 
}: WesternModalProps) {
  return (
    <Dialog>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent 
        className={cn(
          "bg-gradient-to-br from-leather-900 to-leather-800 border-2 border-desert-600 shadow-2xl",
          "max-w-2xl",
          className
        )}
        {...props}
      >
        {(title || description) && (
          <DialogHeader>
            {title && (
              <DialogTitle className="font-western text-2xl text-desert-400">
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription className="font-mono text-gray-300">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        <div className="font-mono text-gray-100">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
