import { ReactNode } from "react";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";
import { useLocation } from "wouter";

interface CodingChallengeLayoutProps {
  title: string;
  currentChallenge: number;
  totalChallenges: number;
  onPrevious?: () => void;
  onNext?: () => void;
  onCompile?: () => void;
  canGoNext?: boolean;
  hasPrevious?: boolean;
  isCompiling?: boolean;
  children: ReactNode;
}

export function CodingChallengeLayout({
  title,
  currentChallenge,
  totalChallenges,
  onPrevious,
  onNext,
  onCompile,
  canGoNext = false,
  hasPrevious = false,
  isCompiling = false,
  children
}: CodingChallengeLayoutProps) {
  const [, setLocation] = useLocation();

  const handleExit = () => {
    setLocation("/lessons");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="border-b border-cyan-400/20 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="font-space-gothic text-xl text-cyan-400">
                SOLANA CORPS OF ENGINEERS
              </h1>
              <div className="text-sm text-gray-400 font-code">
                Challenge {currentChallenge} of {totalChallenges}
              </div>
            </div>
            <TechButton
              variant="secondary"
              size="sm"
              onClick={handleExit}
              className="text-gray-400 hover:text-white bg-transparent"
            >
              <span className="text-lg">✕</span>
            </TechButton>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>

      {/* Bottom Navigation */}
      <div className="border-t border-cyan-400/20 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <TechButton
              variant="secondary"
              onClick={onPrevious}
              disabled={!hasPrevious}
              size="sm"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
            >
              <span className="mr-2">←</span>
              PREVIOUS
            </TechButton>
            
            <div className="flex items-center space-x-4">
              <TechButton
                variant="accent"
                onClick={onCompile}
                disabled={isCompiling}
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0"
              >
                {isCompiling ? (
                  <>
                    <span className="mr-2 animate-spin">⚙️</span>
                    COMPILING...
                  </>
                ) : (
                  <>
                    <span className="mr-2">🔧</span>
                    COMPILE & TEST
                  </>
                )}
              </TechButton>
              
              <TechButton
                variant="primary"
                onClick={onNext}
                disabled={!canGoNext}
                size="sm"
                className="bg-transparent border-cyan-600 text-cyan-400 hover:bg-cyan-800 disabled:opacity-50"
              >
                NEXT CHALLENGE
                <span className="ml-2">→</span>
              </TechButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}