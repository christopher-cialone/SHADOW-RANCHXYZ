import { useState } from "react";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";

interface AnonymityGameProps {
  onComplete: () => void;
}

export function AnonymityGame({ onComplete }: AnonymityGameProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSendMessage = async () => {
    setIsAnimating(true);
    setAnimationStep(0);
    
    // Animate through each remailer node
    for (let i = 1; i <= 4; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnimationStep(i);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAnimating(false);
    setShowExplanation(true);
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="space-y-8">
      {/* Explanation */}
      <TechCard variant="purple">
        <div className="p-6">
          <h2 className="font-space-gothic text-2xl text-tech-purple-400 mb-4">Anonymous Remailer Network</h2>
          <p className="text-gray-300 mb-4">
            Watch how a message travels through multiple remailer nodes to achieve anonymity. 
            Each node strips away identifying information, making it impossible to trace the 
            original sender.
          </p>
          <div className="bg-tech-purple-900/20 border-l-4 border-tech-purple-400 p-4 rounded">
            <p className="font-code text-tech-purple-400 text-sm">
              DEMO: Click "Send Message" to see anonymity in action
            </p>
          </div>
        </div>
      </TechCard>

      {/* Visual Demonstration */}
      <TechCard variant="cyan" className="relative overflow-hidden">
        <div className="p-8">
          <div className="relative h-64 flex items-center justify-between">
            {/* Sender */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-tech-cyan-600 rounded-full flex items-center justify-center mb-2">
                <span className="text-xl">👤</span>
              </div>
              <span className="text-tech-cyan-400 font-code text-sm">YOU</span>
            </div>

            {/* Remailer Nodes */}
            <div className="flex-1 flex justify-center space-x-8">
              {[1, 2, 3].map((nodeId) => (
                <div key={nodeId} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 transition-all duration-500 ${
                    animationStep >= nodeId ? 'bg-tech-purple-600 scale-110' : 'bg-gray-700'
                  }`}>
                    <span className="text-lg">🔄</span>
                  </div>
                  <span className="text-gray-400 font-code text-xs">NODE {nodeId}</span>
                </div>
              ))}
            </div>

            {/* Recipient */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-tech-cyan-600 rounded-full flex items-center justify-center mb-2">
                <span className="text-xl">📰</span>
              </div>
              <span className="text-tech-cyan-400 font-code text-sm">RECIPIENT</span>
            </div>

            {/* Message Packet Animation */}
            {isAnimating && (
              <div className={`absolute transition-all duration-800 ease-in-out ${
                animationStep === 0 ? 'left-16' :
                animationStep === 1 ? 'left-1/4' :
                animationStep === 2 ? 'left-1/2' :
                animationStep === 3 ? 'left-3/4' :
                'right-16'
              }`} style={{ top: '50%', transform: 'translateY(-50%)' }}>
                <div className="bg-tech-purple-400 rounded-lg p-2 text-xs font-code text-black">
                  <div>FROM: {
                    animationStep === 0 ? 'journalist@secure.net' :
                    animationStep === 1 ? 'user████@████.███' :
                    animationStep === 2 ? '████████@████.███' :
                    animationStep === 3 ? '████████@████.███' :
                    'ANONYMOUS'
                  }</div>
                  <div>TO: editor@newspaper.com</div>
                </div>
              </div>
            )}
          </div>

          {/* Connection Lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-0.5 bg-gradient-to-r from-tech-cyan-400 via-tech-purple-400 to-tech-cyan-400 opacity-30"></div>
          </div>
        </div>
      </TechCard>

      {/* Controls */}
      <div className="text-center">
        {!showExplanation ? (
          <TechButton 
            variant="accent" 
            size="lg" 
            onClick={handleSendMessage}
            disabled={isAnimating}
          >
            {isAnimating ? (
              <>
                <span className="mr-2">🔄</span>
                ROUTING MESSAGE...
              </>
            ) : (
              <>
                <span className="mr-2">📤</span>
                SEND MESSAGE
              </>
            )}
          </TechButton>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <TechCard variant="purple">
              <div className="p-6">
                <h3 className="font-space-gothic text-tech-purple-400 text-lg mb-4">Anonymity Achieved</h3>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p>
                    <strong>What happened:</strong> Your message passed through 3 remailer nodes. 
                    Each node removed identifying information and re-encrypted the message before 
                    forwarding it.
                  </p>
                  <p>
                    <strong>Result:</strong> The recipient receives the message, but cannot trace it 
                    back to you. Even if one node is compromised, your identity remains protected.
                  </p>
                  <div className="bg-tech-purple-900/20 border-l-4 border-tech-purple-400 p-3 rounded">
                    <p className="text-tech-purple-400 font-code text-xs">
                      ANONYMITY PILLAR: Multiple hops break the connection between sender and receiver
                    </p>
                  </div>
                </div>
              </div>
            </TechCard>
            
            <TechButton variant="accent" size="lg" onClick={handleContinue}>
              PROCEED TO PILLARS 3 & 4
              <span className="ml-2">→</span>
            </TechButton>
          </div>
        )}
      </div>
    </div>
  );
}