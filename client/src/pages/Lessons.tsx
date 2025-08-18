import { Link, useLocation } from "wouter";
import { TechButton } from "@/components/ui/TechButton";
import { TechCard } from "@/components/ui/TechCard";
import { usePageLoader } from "@/hooks/use-page-loader";
import { useCypherpunkProgress } from "@/hooks/use-cypherpunk-progress";

export default function Lessons() {
  const [, setLocation] = useLocation();
  const { getTrackProgress, getCurrentModule } = useCypherpunkProgress();
  usePageLoader();

  const trackProgress = getTrackProgress();
  const currentModule = getCurrentModule();
  
  const handleCypherpunkTrackClick = () => {
    if (currentModule === 1) {
      setLocation('/cypherpunk-module-1');
    } else if (currentModule === 2) {
      setLocation('/cypherpunk-module-2');
    } else if (currentModule === 3) {
      setLocation('/cypherpunk-module-3');
    } else if (currentModule === 4) {
      setLocation('/cypherpunk-module-4');
    } else {
      // Future modules
      setLocation('/cypherpunk-module-1');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-titulo text-5xl md:text-6xl text-cyan-400 mb-6">
            SOLANA DEVELOPER TRACK
          </h1>
          <p className="font-tech text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Master Solana development through hands-on coding challenges. Build real applications on the fastest blockchain.
          </p>
        </div>

        {/* Solana Programming Track - Single Track */}
        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          {/* Solana Programming Track */}
          <TechCard variant="purple" className="group hover:scale-105 transition-all duration-300">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-tech-purple-500 to-tech-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h2 className="font-space-gothic text-2xl text-tech-purple-400 mb-2">SOLANA PROGRAM DEVELOPMENT</h2>
                  <p className="text-sm text-gray-400 font-code">TECHNICAL TRACK</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Master the technical arts of Solana development. Build, deploy, and optimize high-performance blockchain applications.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-400">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-3"></span>
                  Rust Fundamentals
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-3"></span>
                  Anchor Framework
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-3"></span>
                  Program Development
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
                  <span className="px-3 py-1 bg-tech-purple-900/50 text-tech-purple-400 rounded-full text-xs font-code">
                    RUST
                  </span>
                  <span className="px-3 py-1 bg-tech-purple-900/50 text-tech-purple-400 rounded-full text-xs font-code">
                    SOLANA
                  </span>
                </div>
                <span className="text-xs text-gray-500 font-code">12 MODULES</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                <div className="bg-gradient-to-r from-tech-purple-500 to-tech-purple-400 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>

              <TechButton 
                variant="accent" 
                className="w-full"
                onClick={() => {
                  console.log('Navigating to Solana track - lesson 1');
                  setLocation('/lessons/1');
                }}
              >
                <span className="mr-2">⚡</span>
                START SOLANA TRACK
              </TechButton>
            </div>
          </TechCard>
        </div>

        {/* Bottom Navigation */}
        <div className="text-center mt-16">
          <Link href="/">
            <TechButton variant="secondary" size="sm">
              <span className="mr-2">←</span>
              BACK TO DASHBOARD
            </TechButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
