import { Link, useLocation } from "wouter";
import { TechButton } from "@/components/ui/TechButton";
import { TechCard } from "@/components/ui/TechCard";
import { usePageLoader } from "@/hooks/use-page-loader";

export default function Lessons() {
  const [, setLocation] = useLocation();
  usePageLoader();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-tech-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-titulo text-5xl md:text-6xl bg-gradient-to-r from-tech-cyan-400 to-tech-purple-400 bg-clip-text text-transparent mb-6">
            CHOOSE YOUR PATH
          </h1>
          <p className="font-tech text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Two tracks await at Shadow Ranch. Master the philosophical foundations before diving into the technical depths.
          </p>
        </div>

        {/* Learning Tracks */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Cypherpunk Track */}
          <TechCard variant="cyan" className="group hover:scale-105 transition-all duration-300">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-tech-cyan-500 to-tech-cyan-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🔓</span>
                </div>
                <div>
                  <h2 className="font-titulo text-2xl text-tech-cyan-400 mb-2">THE CYPHERPUNK LEGACY</h2>
                  <p className="text-sm text-gray-400 font-code">FOUNDATIONAL TRACK</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Discover the philosophical foundations of digital freedom. Learn about the rebels who dreamed of a decentralized future before blockchain existed.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-400">
                  <span className="w-2 h-2 bg-tech-cyan-400 rounded-full mr-3"></span>
                  The Genesis of a Movement
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-3"></span>
                  Cryptographic Foundations
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-3"></span>
                  Digital Rights Manifesto
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
                  <span className="px-3 py-1 bg-tech-cyan-900/50 text-tech-cyan-400 rounded-full text-xs font-code">
                    PHILOSOPHY
                  </span>
                  <span className="px-3 py-1 bg-tech-cyan-900/50 text-tech-cyan-400 rounded-full text-xs font-code">
                    HISTORY
                  </span>
                </div>
                <span className="text-xs text-gray-500 font-code">6 MODULES</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                <div className="bg-gradient-to-r from-tech-cyan-500 to-tech-cyan-400 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>

              <TechButton 
                variant="accent" 
                className="w-full"
                onClick={() => setLocation('/cypherpunk-module-1')}
              >
                <span className="mr-2">🚀</span>
                START LEGACY TRACK
              </TechButton>
            </div>
          </TechCard>

          {/* Solana Programming Track */}
          <TechCard variant="purple" className="group hover:scale-105 transition-all duration-300 opacity-60">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-tech-purple-500 to-tech-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h2 className="font-titulo text-2xl text-tech-purple-400 mb-2">SOLANA CORPS OF ENGINEERS</h2>
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
                variant="secondary" 
                className="w-full cursor-not-allowed"
                disabled
              >
                <span className="mr-2">🔒</span>
                COMPLETE LEGACY TRACK FIRST
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
