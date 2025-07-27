import { useState } from "react";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";

interface DoubleSpendProblemProps {
  onComplete: () => void;
}

export function DoubleSpendProblem({ onComplete }: DoubleSpendProblemProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleDemonstrate = async () => {
    setShowAnimation(true);
    setAnimationStep(0);
    
    // Animation sequence
    for (let i = 1; i <= 4; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnimationStep(i);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowExplanation(true);
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="space-y-8">
      {/* Problem Explanation */}
      <TechCard variant="purple">
        <div className="p-8">
          <h2 className="font-tech text-2xl text-tech-purple-400 mb-6">The Digital Money Challenge</h2>
          
          <div className="space-y-4 text-gray-300 leading-relaxed mb-8">
            <p>
              Physical coins can't be in two places at once. But digital files can be copied infinitely. 
              This creates a fundamental problem for digital money: how do you prevent someone from 
              spending the same digital coin twice?
            </p>
            
            <div className="bg-tech-purple-900/20 border-l-4 border-tech-purple-400 p-4 rounded">
              <p className="font-code text-tech-purple-400 text-sm">
                CORE PROBLEM: Digital information can be duplicated without destroying the original
              </p>
            </div>
            
            <p>
              Traditional solutions required a central authority—a bank—to track all transactions. 
              But cypherpunks wanted digital money without central control. The challenge seemed impossible.
            </p>
          </div>
        </div>
      </TechCard>

      {/* Animation Demo */}
      <TechCard variant="cyan" className="relative overflow-hidden">
        <div className="p-8">
          <h3 className="font-tech text-tech-cyan-400 text-lg mb-6 text-center">
            Double-Spend Attack Demonstration
          </h3>
          
          <div className="relative h-64 flex items-center justify-between">
            {/* Alice */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-tech-cyan-600 rounded-full flex items-center justify-center mb-2">
                <span className="text-xl">👤</span>
              </div>
              <span className="text-tech-cyan-400 font-code text-sm">ALICE</span>
              <span className="text-gray-400 font-code text-xs mt-1">Has 1 Digital Coin</span>
            </div>

            {/* Digital Coin */}
            <div className="flex-1 flex justify-center relative">
              <div className={`transition-all duration-1000 ${
                animationStep >= 1 ? 'scale-110' : ''
              }`}>
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl">🪙</span>
                </div>
                <span className="block text-center font-code text-xs text-yellow-400">COIN_001</span>
              </div>
              
              {/* Duplication Effect */}
              {animationStep >= 2 && (
                <div className="absolute top-0 left-12 transition-all duration-1000 transform">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mb-2 opacity-80">
                    <span className="text-2xl">🪙</span>
                  </div>
                  <span className="block text-center font-code text-xs text-yellow-400">COIN_001</span>
                  <span className="block text-center font-code text-xs text-red-400">COPY</span>
                </div>
              )}
            </div>

            {/* Merchants */}
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col items-center">
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-2 transition-all duration-500 ${
                  animationStep >= 3 ? 'bg-green-600 scale-110' : 'bg-gray-700'
                }`}>
                  <span className="text-lg">🏪</span>
                </div>
                <span className="text-gray-400 font-code text-xs">SHOP A</span>
                {animationStep >= 3 && (
                  <span className="text-green-400 font-code text-xs mt-1">PAID ✓</span>
                )}
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-2 transition-all duration-500 ${
                  animationStep >= 4 ? 'bg-green-600 scale-110' : 'bg-gray-700'
                }`}>
                  <span className="text-lg">🏪</span>
                </div>
                <span className="text-gray-400 font-code text-xs">SHOP B</span>
                {animationStep >= 4 && (
                  <span className="text-green-400 font-code text-xs mt-1">PAID ✓</span>
                )}
              </div>
            </div>

            {/* Attack Arrows */}
            {animationStep >= 3 && (
              <>
                <div className="absolute left-1/3 top-16 w-32 h-0.5 bg-red-400 transform -rotate-12 animate-pulse"></div>
                <div className="absolute left-1/3 bottom-16 w-32 h-0.5 bg-red-400 transform rotate-12 animate-pulse"></div>
              </>
            )}
          </div>

          {animationStep >= 4 && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-900/50 backdrop-blur-sm">
              <div className="text-center">
                <span className="text-red-400 font-code text-xl block mb-2">DOUBLE-SPEND ATTACK</span>
                <span className="text-red-300 font-code text-sm">Same coin spent twice!</span>
              </div>
            </div>
          )}
        </div>
      </TechCard>

      {/* Controls */}
      <div className="text-center">
        {!showExplanation ? (
          <TechButton 
            variant="accent" 
            size="lg" 
            onClick={handleDemonstrate}
            disabled={showAnimation}
          >
            {showAnimation ? (
              <>
                <span className="mr-2">⚡</span>
                DEMONSTRATING ATTACK...
              </>
            ) : (
              <>
                <span className="mr-2">🎯</span>
                DEMONSTRATE PROBLEM
              </>
            )}
          </TechButton>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <TechCard variant="cyan">
              <div className="p-6">
                <h3 className="font-tech text-tech-cyan-400 text-lg mb-4">Why This Matters</h3>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p>
                    <strong>The Problem:</strong> Alice copied her digital coin and spent it at two different 
                    shops simultaneously. Both shops accepted the payment, but Alice only had one coin.
                  </p>
                  <p>
                    <strong>Traditional Solution:</strong> Banks prevent this by maintaining a central ledger 
                    and checking every transaction. But this requires trusting the bank.
                  </p>
                  <p>
                    <strong>The Challenge:</strong> How do you solve double-spending without a trusted authority? 
                    This puzzle stumped computer scientists for decades.
                  </p>
                  <div className="bg-tech-cyan-900/20 border-l-4 border-tech-cyan-400 p-3 rounded">
                    <p className="text-tech-cyan-400 font-code text-xs">
                      BREAKTHROUGH: A mysterious figure would soon propose an elegant solution
                    </p>
                  </div>
                </div>
              </div>
            </TechCard>
            
            <TechButton variant="accent" size="lg" onClick={handleContinue}>
              DISCOVER THE SOLUTION
              <span className="ml-2">→</span>
            </TechButton>
          </div>
        )}
      </div>
    </div>
  );
}