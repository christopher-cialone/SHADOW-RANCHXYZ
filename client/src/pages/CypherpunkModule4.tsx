import { useState } from "react";
import { useLocation } from "wouter";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";
import { BackButton } from "@/components/ui/BackButton";
import { usePageLoader } from "@/hooks/use-page-loader";
import { useCypherpunkProgress } from "@/hooks/use-cypherpunk-progress";
import { Web2Montage } from "@/components/cypherpunk/Web2Montage";
import { PrincipledBuilder } from "@/components/cypherpunk/PrincipledBuilder";

export default function CypherpunkModule4() {
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
    completeModule(4);
    setLocation('/lessons');
  };

  const handleBeginSolana = () => {
    completeModule(4);
    setLocation('/lessons');
  };

  if (step === 0) {
    // Introduction Screen
    return (
      <>
        <BackButton currentModule={4} />
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-tech-purple-900 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-titulo text-5xl bg-gradient-to-r from-tech-purple-400 to-red-400 bg-clip-text text-transparent mb-6">
              MODULE 4: THE FIGHT FOR THE FUTURE
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-tech-purple-400 to-red-400 mx-auto mb-8"></div>
          </div>

          <TechCard variant="cyan" className="mb-8">
            <div className="p-8">
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  The cypherpunks built the foundations. Bitcoin proved the concept. 
                  But as their vision became reality, new challenges emerged that they 
                  never anticipated.
                </p>
                
                <div className="bg-red-900/20 border-l-4 border-red-400 p-6 rounded">
                  <h3 className="font-tech text-red-400 text-lg mb-4">The Current Battlefield</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                      <span>Surveillance Capitalism</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-tech-purple-400 rounded-full mr-3"></span>
                      <span>Platform Centralization</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                      <span>Digital Censorship</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-tech-purple-400 rounded-full mr-3"></span>
                      <span>Ethical Dilemmas</span>
                    </div>
                  </div>
                </div>
                
                <p>
                  Today, you'll confront the reality of what we built versus what the 
                  cypherpunks envisioned. This final module challenges you to consider 
                  your role in shaping the future of digital freedom.
                </p>
              </div>
              
              <div className="mt-8 flex justify-end">
                <TechButton variant="accent" onClick={handleNext}>
                  <span className="mr-2">⚔️</span>
                  ENTER THE BATTLEFIELD
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
    // Web2 Montage
    return <Web2Montage onComplete={handleComponentComplete} />;
  }

  if (step === 2) {
    // Principled Builder Dilemma
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-tech-cyan-900 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="font-titulo text-4xl text-tech-cyan-400 mb-4">THE PRINCIPLED BUILDER</h1>
            <p className="text-gray-400 font-tech">When principles meet profit</p>
          </div>
          
          <PrincipledBuilder onComplete={handleComponentComplete} />
        </div>
      </div>
    );
  }

  if (step === 3) {
    // Completion Screen with Solana CTA
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-tech-purple-900 to-green-900 flex items-center justify-center">
        <div className="text-center max-w-3xl px-8">
          <div className="animate-pulse mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-tech-purple-400 rounded-full mx-auto flex items-center justify-center mb-6">
              <span className="text-4xl">🔥</span>
            </div>
          </div>
          
          <h1 className="font-titulo text-5xl bg-gradient-to-r from-orange-400 to-tech-purple-400 bg-clip-text text-transparent mb-6">
            MISSION 4 COMPLETE
          </h1>
          
          <div className="bg-tech-purple-900/30 border border-tech-purple-400/50 rounded-lg p-8 mb-8">
            <h2 className="font-tech text-tech-purple-400 text-xl mb-4">TORCHBEARER BADGE ACQUIRED</h2>
            <p className="text-gray-300 leading-relaxed">
              You've journeyed through the complete cypherpunk legacy—from the philosophical foundations 
              to the technical implementations, from Bitcoin's creation to modern governance challenges. 
              You understand both the promise and the perils of our digital future.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-900/30 to-tech-cyan-900/30 border border-green-400/50 rounded-lg p-6 mb-8">
            <h3 className="font-tech text-green-400 text-lg mb-3">THE TORCH PASSES TO YOU</h3>
            <p className="text-gray-300 text-sm">
              The cypherpunks gave us the tools. Now it's your turn to build the decentralized future. 
              Ready to learn the technical skills to make it reality?
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Primary CTA - Solana Training */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-tech-cyan-400 rounded-lg blur opacity-30 animate-pulse"></div>
              <TechButton 
                variant="accent" 
                size="lg" 
                onClick={handleBeginSolana}
                className="relative bg-gradient-to-r from-green-600 to-tech-cyan-600 hover:from-green-500 hover:to-tech-cyan-500 text-white border-green-400 shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <span className="mr-3 text-2xl">⚡</span>
                <span className="font-bold text-lg">BEGIN SOLANA TRAINING</span>
                <span className="ml-3 text-2xl">⚡</span>
              </TechButton>
            </div>
            
            {/* Secondary option */}
            <TechButton variant="secondary" onClick={handleModuleComplete}>
              <span className="mr-2">🏠</span>
              RETURN TO DASHBOARD
            </TechButton>
            
            <p className="text-gray-400 text-sm font-code">
              Progress: 67% • Cypherpunk Legacy Track Complete
            </p>
            
            <div className="mt-4 text-center">
              <p className="text-tech-cyan-400 text-xs font-code animate-pulse">
                Ready to build the future? Solana Corps of Engineers awaits...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}