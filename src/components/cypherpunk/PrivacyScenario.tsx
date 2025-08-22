import { useState } from "react";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";

interface PrivacyScenarioProps {
  onComplete: () => void;
}

export function PrivacyScenario({ onComplete }: PrivacyScenarioProps) {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleChoice = (choice: number) => {
    setSelectedChoice(choice);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="space-y-8">
      {/* Scenario Description */}
      <TechCard variant="cyan" className="relative">
        <div className="p-8">
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-red-900 text-red-400 text-xs font-code rounded">
              CLASSIFIED SCENARIO
            </span>
          </div>
          
          <h2 className="font-space-gothic text-2xl text-tech-cyan-400 mb-6">Emergency Communication</h2>
          
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              A journalist in an oppressive regime has uncovered evidence of government corruption. 
              They need to safely transmit this sensitive document to their editor in another country. 
              The government monitors all communications and severely punishes dissidents.
            </p>
            
            <div className="bg-tech-cyan-900/20 border-l-4 border-tech-cyan-400 p-4 rounded">
              <p className="font-code text-tech-cyan-400 text-sm">
                MISSION PARAMETERS: Document must reach editor safely without exposing journalist's identity
              </p>
            </div>
            
            <p className="font-tech text-white">
              How should the journalist transmit this document?
            </p>
          </div>
        </div>
      </TechCard>

      {/* Choices */}
      <div className="grid md:grid-cols-2 gap-6">
        <TechCard 
          variant="purple" 
          className={`cursor-pointer transition-all duration-300 ${
            selectedChoice === 1 ? 'ring-2 ring-tech-purple-400' : 'hover:scale-105'
          }`}
          onClick={() => !showFeedback && handleChoice(1)}
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-tech-purple-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-xl">📱</span>
              </div>
              <h3 className="font-space-gothic text-tech-purple-400 text-lg">Option A</h3>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">
              Send the document through a social media direct message to the editor. 
              It's quick and convenient, and they use this platform regularly.
            </p>
            
            <div className="flex items-center text-xs text-gray-400">
              <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
              <span>Unencrypted Communication</span>
            </div>
          </div>
        </TechCard>

        <TechCard 
          variant="cyan" 
          className={`cursor-pointer transition-all duration-300 ${
            selectedChoice === 2 ? 'ring-2 ring-tech-cyan-400' : 'hover:scale-105'
          }`}
          onClick={() => !showFeedback && handleChoice(2)}
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-tech-cyan-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-xl">🔐</span>
              </div>
              <h3 className="font-space-gothic text-tech-cyan-400 text-lg">Option B</h3>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">
              Encrypt the document using PGP encryption, then send it through a secure, 
              end-to-end encrypted messaging service designed for journalists.
            </p>
            
            <div className="flex items-center text-xs text-gray-400">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              <span>End-to-End Encrypted</span>
            </div>
          </div>
        </TechCard>
      </div>

      {/* Feedback */}
      {showFeedback && selectedChoice && (
        <TechCard variant={selectedChoice === 2 ? "cyan" : "purple"} className="animate-fade-in">
          <div className="p-6">
            <div className="flex items-start">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                selectedChoice === 2 ? 'bg-green-600' : 'bg-red-600'
              }`}>
                <span className="text-white font-bold">
                  {selectedChoice === 2 ? '✓' : '✗'}
                </span>
              </div>
              
              <div className="flex-1">
                <h3 className={`font-tech text-lg mb-3 ${
                  selectedChoice === 2 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {selectedChoice === 2 ? 'CORRECT CHOICE' : 'DANGEROUS CHOICE'}
                </h3>
                
                <div className="space-y-3 text-gray-300 text-sm">
                  {selectedChoice === 2 ? (
                    <>
                      <p>
                        <strong>Outcome:</strong> The document reaches the editor safely. Even if intercepted, 
                        the PGP encryption makes it unreadable to surveillance systems.
                      </p>
                      <p>
                        <strong>Why this works:</strong> End-to-end encryption ensures only the intended 
                        recipient can decrypt the message. The journalist's identity and the document's 
                        contents remain protected.
                      </p>
                      <div className="bg-green-900/20 border-l-4 border-green-400 p-3 rounded">
                        <p className="text-green-400 font-code text-xs">
                          PRIVACY PILLAR: Strong encryption protects both message content and sender identity
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>Outcome:</strong> Government surveillance systems intercept the message. 
                        The journalist is arrested within hours, and the story is buried.
                      </p>
                      <p>
                        <strong>Why this failed:</strong> Social media platforms can access all messages. 
                        Without encryption, sensitive communications are vulnerable to interception.
                      </p>
                      <div className="bg-red-900/20 border-l-4 border-red-400 p-3 rounded">
                        <p className="text-red-400 font-code text-xs">
                          LESSON: Convenience without privacy can be deadly in authoritarian contexts
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TechCard>
      )}

      {/* Continue Button */}
      {showFeedback && (
        <div className="text-center animate-fade-in">
          <TechButton variant="accent" size="lg" onClick={handleContinue}>
            PROCEED TO PILLAR 2
            <span className="ml-2">→</span>
          </TechButton>
        </div>
      )}
    </div>
  );
}