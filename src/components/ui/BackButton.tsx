import { useLocation } from "wouter";
import { TechButton } from "@/components/ui/TechButton";

interface BackButtonProps {
  currentModule: number;
  className?: string;
}

export function BackButton({ currentModule, className = "" }: BackButtonProps) {
  const [, setLocation] = useLocation();

  const handleGoBack = () => {
    if (currentModule > 1) {
      setLocation(`/cypherpunk-module-${currentModule - 1}`);
    }
  };

  if (currentModule <= 1) {
    return null;
  }

  return (
    <div className={`fixed top-6 left-6 z-50 ${className}`}>
      <TechButton 
        variant="secondary" 
        size="sm"
        onClick={handleGoBack}
        className="bg-gray-800/80 backdrop-blur border-gray-600 hover:border-tech-cyan-400 transition-all duration-300"
      >
        <span className="mr-2">←</span>
        PREVIOUS
      </TechButton>
    </div>
  );
}