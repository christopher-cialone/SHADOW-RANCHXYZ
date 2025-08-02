import { ReactNode } from "react";
import { WesternCard } from "@/components/ui/WesternCard";
import { WesternButton } from "@/components/ui/WesternButton";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";
import { LessonProgress } from "./LessonProgress";
import { useLocation } from "wouter";

interface LessonLayoutProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onPrevious?: () => void;
  onNext?: () => void;
  onComplete?: () => void;
  canGoNext?: boolean;
  hasPrevious?: boolean;
  hasNext?: boolean;
  nextButtonText?: string;
  isCompleted?: boolean;
  children: ReactNode;
}

export function LessonLayout({
  title,
  currentStep,
  totalSteps,
  progress,
  onPrevious,
  onNext,
  onComplete,
  canGoNext = false,
  hasPrevious = false,
  hasNext = false,
  nextButtonText = "Next",
  isCompleted = false,
  children
}: LessonLayoutProps) {
  const [, setLocation] = useLocation();

  const handleExit = () => {
    setLocation("/lessons");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-40 w-full bg-black/80 backdrop-blur-sm border-b border-cyan-400/20">
        <div className="container mx-auto px-4 py-4">
          <TechCard variant="cyan" className="bg-gray-900/60 border-cyan-400/30">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h1 className="font-titulo text-2xl text-cyan-400">
                  {title}
                </h1>
                <TechButton
                  variant="secondary"
                  size="sm"
                  onClick={handleExit}
                  className="text-gray-400 hover:text-white"
                >
                  <span className="text-lg">✕</span>
                </TechButton>
              </div>
              
              <LessonProgress
                currentStep={currentStep}
                totalSteps={totalSteps}
                progress={progress}
              />
            </div>
          </TechCard>
        </div>
      </div>

      {/* Main Content - Scrollable with proper padding */}
      <main className="flex-grow overflow-y-auto pt-[120px] pb-[80px]">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>

      {/* Bottom Navigation - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-30 w-full bg-black/80 backdrop-blur-sm border-t border-cyan-400/20">
        <div className="container mx-auto px-4 py-4">
          <TechCard variant="cyan" className="bg-gray-900/60 border-cyan-400/30">
            <div className="p-3">
              <div className="flex items-center justify-between">
                <TechButton
                  variant="secondary"
                  onClick={onPrevious}
                  disabled={!hasPrevious}
                  size="sm"
                >
                  <span className="mr-2">←</span>
                  PREVIOUS
                </TechButton>
                
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="font-tech text-xs text-gray-400 uppercase tracking-wider">STEP</div>
                    <div className="font-code text-sm text-cyan-400">{currentStep} / {totalSteps}</div>
                  </div>
                  
                  {isCompleted ? (
                    <TechButton
                      variant="accent"
                      onClick={onComplete}
                      size="sm"
                    >
                      <span className="mr-2">⭐</span>
                      COMPLETE LESSON
                    </TechButton>
                  ) : (
                    <TechButton
                      variant="primary"
                      onClick={onNext}
                      disabled={!canGoNext}
                      size="sm"
                    >
                      {nextButtonText.toUpperCase()}
                      <span className="ml-2">→</span>
                    </TechButton>
                  )}
                </div>
              </div>
            </div>
          </TechCard>
        </div>
      </div>
    </div>
  );
}
