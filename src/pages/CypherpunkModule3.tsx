import { useState } from "react";
import { useLocation } from "wouter";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";
import { BackButton } from "@/components/ui/BackButton";
import { usePageLoader } from "@/hooks/use-page-loader";
import { useCypherpunkProgress } from "@/hooks/use-cypherpunk-progress";
import { DoubleSpendProblem } from "@/components/cypherpunk/DoubleSpendProblem";
import { SatoshiMessage } from "@/components/cypherpunk/SatoshiMessage";
import { ConnectingTheDots } from "@/components/cypherpunk/ConnectingTheDots";
import { DAOHackDilemma } from "@/components/cypherpunk/DAOHackDilemma";

export default function CypherpunkModule3() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);
  const { completeModule } = useCypherpunkProgress();
  
  usePageLoader();

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleComponentComplete = () => {
    setStep(step + 1);
  };

  const handleModuleComplete = () => {
    completeModule(3);
    setLocation('/lessons');
  };

  if (step === 0) {
    // Introduction Screen
    return (
      <>
        <BackButton currentModule={3} />
        <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-titulo text-5xl text-cyan-400 mb-6">
              MODULE 3: FROM MAILING LIST TO MAINNET
            </h1>
            <div className="w-24 h-1 bg-cyan-400 mx-auto mb-8"></div>
          </div>

          <TechCard variant="purple" className="mb-8">
            <div className="p-8">
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  The cypherpunks laid the foundation, but one problem remained unsolved: 
                  how to create digital money without a central authority. The challenge seemed 
                  impossible until a mysterious figure emerged from the shadows.
                </p>
                
                <div className="bg-purple-500/10 border-l-4 border-purple-400 p-6 rounded">
                  <h3 className="font-space-gothic text-purple-400 text-lg mb-4">The Journey</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      <span>The Double-Spend Problem</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      <span>The Ghost in the Machine</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      <span>Connecting the Dots</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      <span>The DAO Hack Dilemma</span>
                    </div>
                  </div>
                </div>
                
                <p>
                  This module reveals how cypherpunk principles evolved into the first successful 
                  cryptocurrency, and explores the philosophical challenges that emerged as these 
                  systems grew beyond their creators' original vision.
                </p>
              </div>
              
              <div className="mt-8 flex justify-end">
                <TechButton variant="accent" onClick={handleNext}>
                  <span className="mr-2">🔗</span>
                  TRACE THE CONNECTION
                </TechButton>
              </div>
            </div>
          </TechCard>
        </div>
        </div>
      </>
    );
  }

  if (step === 1) {
    // Double-Spend Problem
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="font-space-gothic text-4xl text-purple-400 mb-4">THE DOUBLE-SPEND PROBLEM</h1>
            <p className="text-gray-400 font-tech">The core challenge of digital money</p>
          </div>
          
          <DoubleSpendProblem onComplete={handleComponentComplete} />
        </div>
      </div>
    );
  }

  if (step === 2) {
    // Satoshi Message
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="font-space-gothic text-4xl text-cyan-400 mb-4">THE GHOST IN THE MACHINE</h1>
            <p className="text-gray-400 font-tech">October 31, 2008 • Cryptography Mailing List</p>
          </div>
          
          <SatoshiMessage onComplete={handleComponentComplete} />
        </div>
      </div>
    );
  }

  if (step === 3) {
    // Connecting the Dots Game
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-tech-purple-900 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="font-space-gothic text-4xl text-tech-purple-400 mb-4">CONNECTING THE DOTS</h1>
            <p className="text-gray-400 font-tech">Link cypherpunk concepts to Bitcoin features</p>
          </div>
          
          <ConnectingTheDots onComplete={handleComponentComplete} />
        </div>
      </div>
    );
  }

  if (step === 4) {
    // DAO Hack Dilemma
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-tech-cyan-900 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="font-space-gothic text-4xl text-tech-cyan-400 mb-4">THE DAO HACK DILEMMA</h1>
            <p className="text-gray-400 font-tech">When ideology meets reality</p>
          </div>
          
          <DAOHackDilemma onComplete={handleComponentComplete} />
        </div>
      </div>
    );
  }

  if (step === 5) {
    // Completion Screen
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-tech-purple-900 flex items-center justify-center">
        <div className="text-center max-w-2xl px-8">
          <div className="animate-pulse mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-tech-cyan-400 rounded-full mx-auto flex items-center justify-center mb-6">
              <span className="text-4xl">₿</span>
            </div>
          </div>
          
          <h1 className="font-titulo text-5xl bg-gradient-to-r from-orange-400 to-tech-cyan-400 bg-clip-text text-transparent mb-6">
            MISSION 3 COMPLETE
          </h1>
          
          <div className="bg-tech-purple-900/30 border border-tech-purple-400/50 rounded-lg p-6 mb-8">
            <h2 className="font-space-gothic text-tech-purple-400 text-xl mb-4">BITCOIN GENESIS BADGE ACQUIRED</h2>
            <p className="text-gray-300">
              You've traced the evolution from cypherpunk theory to Bitcoin implementation. 
              Understanding this connection reveals why blockchain technology embodies the 
              principles of digital freedom, privacy, and decentralization.
            </p>
          </div>
          
          <div className="space-y-4">
            <TechButton variant="accent" size="lg" onClick={handleModuleComplete}>
              <span className="mr-2">🏠</span>
              RETURN TO DASHBOARD
            </TechButton>
            
            <p className="text-gray-400 text-sm font-code">
              Progress: 50% • Next: Cryptographic Foundations
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}