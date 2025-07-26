import { useState } from "react";
import { useLocation } from "wouter";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";
import { usePageLoader } from "@/hooks/use-page-loader";
import { useCypherpunkProgress } from "@/hooks/use-cypherpunk-progress";
import { PrivacyScenario } from "@/components/cypherpunk/PrivacyScenario";
import { AnonymityGame } from "@/components/cypherpunk/AnonymityGame";
import { DecentralizationVisualization } from "@/components/cypherpunk/DecentralizationVisualization";

export default function CypherpunkModule2() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);
  const { completeModule } = useCypherpunkProgress();
  
  usePageLoader();

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePillarComplete = () => {
    setStep(step + 1);
  };

  const handleModuleComplete = () => {
    completeModule(2);
    setLocation('/lessons');
  };

  if (step === 0) {
    // Introduction Screen
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-tech-purple-900 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-titulo text-5xl bg-gradient-to-r from-tech-cyan-400 to-tech-purple-400 bg-clip-text text-transparent mb-6">
              MODULE 2: THE PILLARS OF A FREE INTERNET
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-tech-cyan-400 to-tech-purple-400 mx-auto mb-8"></div>
          </div>

          <TechCard variant="cyan" className="mb-8">
            <div className="p-8">
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  The cypherpunks didn't just dream of digital freedom—they identified the fundamental 
                  pillars that would support it. These technological and philosophical foundations became 
                  the blueprint for everything that followed.
                </p>
                
                <div className="bg-tech-cyan-900/20 border-l-4 border-tech-cyan-400 p-6 rounded">
                  <h3 className="font-tech text-tech-cyan-400 text-lg mb-4">The Four Pillars</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-tech-cyan-400 rounded-full mr-3"></span>
                      <span>Privacy Through Encryption</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-tech-purple-400 rounded-full mr-3"></span>
                      <span>Anonymity Networks</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-tech-cyan-400 rounded-full mr-3"></span>
                      <span>Decentralized Architecture</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-tech-purple-400 rounded-full mr-3"></span>
                      <span>Resilient Networks</span>
                    </div>
                  </div>
                </div>
                
                <p>
                  Today, you'll experience these pillars firsthand through interactive scenarios that 
                  demonstrate why each one is crucial for digital freedom. Understanding these concepts 
                  is essential before we move into the technical implementation of blockchain systems.
                </p>
              </div>
              
              <div className="mt-8 flex justify-end">
                <TechButton variant="accent" onClick={handleNext}>
                  <span className="mr-2">🏛️</span>
                  EXPLORE THE PILLARS
                </TechButton>
              </div>
            </div>
          </TechCard>
        </div>
      </div>
    );
  }

  if (step === 1) {
    // Pillar 1: Privacy Scenario
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-tech-cyan-900 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="font-titulo text-4xl text-tech-cyan-400 mb-4">PILLAR 1: PRIVACY THROUGH ENCRYPTION</h1>
            <p className="text-gray-400 font-tech">Real-world scenario simulation</p>
          </div>
          
          <PrivacyScenario onComplete={handlePillarComplete} />
        </div>
      </div>
    );
  }

  if (step === 2) {
    // Pillar 2: Anonymity Game
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-tech-purple-900 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="font-titulo text-4xl text-tech-purple-400 mb-4">PILLAR 2: ANONYMITY NETWORKS</h1>
            <p className="text-gray-400 font-tech">Interactive remailer demonstration</p>
          </div>
          
          <AnonymityGame onComplete={handlePillarComplete} />
        </div>
      </div>
    );
  }

  if (step === 3) {
    // Pillar 3 & 4: Decentralization
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-tech-cyan-900 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="font-titulo text-4xl text-tech-cyan-400 mb-4">PILLARS 3 & 4: DECENTRALIZATION & RESILIENCE</h1>
            <p className="text-gray-400 font-tech">Network architecture comparison</p>
          </div>
          
          <DecentralizationVisualization onComplete={handlePillarComplete} />
        </div>
      </div>
    );
  }

  if (step === 4) {
    // Completion Screen
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-tech-purple-900 flex items-center justify-center">
        <div className="text-center max-w-2xl px-8">
          <div className="animate-pulse mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-tech-cyan-400 to-tech-purple-400 rounded-full mx-auto flex items-center justify-center mb-6">
              <span className="text-4xl">🏛️</span>
            </div>
          </div>
          
          <h1 className="font-titulo text-5xl bg-gradient-to-r from-tech-cyan-400 to-tech-purple-400 bg-clip-text text-transparent mb-6">
            MISSION 2 COMPLETE
          </h1>
          
          <div className="bg-tech-purple-900/30 border border-tech-purple-400/50 rounded-lg p-6 mb-8">
            <h2 className="font-tech text-tech-purple-400 text-xl mb-4">PILLARS BADGE ACQUIRED</h2>
            <p className="text-gray-300">
              You've mastered the four foundational pillars of digital freedom: Privacy, Anonymity, 
              Decentralization, and Resilience. These principles guide all modern privacy-preserving 
              technologies including blockchain systems.
            </p>
          </div>
          
          <div className="space-y-4">
            <TechButton variant="accent" size="lg" onClick={handleModuleComplete}>
              <span className="mr-2">🏠</span>
              RETURN TO DASHBOARD
            </TechButton>
            
            <p className="text-gray-400 text-sm font-code">
              Progress: 40% • Next: Cryptographic Foundations
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}