import { useState, useEffect } from "react";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";

interface SatoshiMessageProps {
  onComplete: () => void;
}

export function SatoshiMessage({ onComplete }: SatoshiMessageProps) {
  const [revealedText, setRevealedText] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  const fullMessage = `I've been working on a new electronic cash system that's fully peer-to-peer, with no trusted third party.

The main properties:
- Double-spending is prevented with a peer-to-peer network.
- No mint or other trusted parties.
- Participants can be anonymous.
- New coins are made from Hashcash style proof-of-work.
- The proof-of-work for new coin generation also powers the network to prevent double-spending.

Bitcoin v0.1 will be released soon.

The nature of Bitcoin is such that once version 0.1 was released, the core design was set in stone for the rest of its lifetime.

- Satoshi Nakamoto`;

  const handleRevealMessage = async () => {
    setIsRevealing(true);
    setRevealedText("");
    
    for (let i = 0; i <= fullMessage.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      setRevealedText(fullMessage.slice(0, i));
    }
    
    setIsRevealing(false);
    setTimeout(() => setShowContinue(true), 1000);
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="space-y-8">
      {/* Email Header */}
      <TechCard variant="cyan" className="font-mono">
        <div className="p-6 bg-black border-2 border-tech-cyan-400">
          <div className="border-b border-tech-cyan-400/30 pb-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="text-tech-cyan-400">
                <span className="text-gray-400">From:</span> satoshi@gmx.com
              </div>
              <div className="text-tech-cyan-400">
                <span className="text-gray-400">Date:</span> Oct 31, 2008 21:21:40
              </div>
              <div className="text-tech-cyan-400">
                <span className="text-gray-400">To:</span> cryptography@metzdowd.com
              </div>
              <div className="text-tech-cyan-400">
                <span className="text-gray-400">Subject:</span> Bitcoin P2P e-cash paper
              </div>
            </div>
          </div>
          
          <div className="flex items-center text-xs text-gray-400 mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            <span>AUTHENTICATED MESSAGE • CRYPTOGRAPHY MAILING LIST</span>
          </div>
        </div>
      </TechCard>

      {/* Message Content */}
      <TechCard variant="purple" className="relative">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-space-gothic text-2xl text-tech-purple-400">Message Decryption</h2>
            <div className="px-3 py-1 bg-tech-purple-900 text-tech-purple-400 text-xs font-code rounded">
              CLASSIFIED: LEVEL 5
            </div>
          </div>
          
          <div className="min-h-96 bg-black rounded border-2 border-tech-purple-400 p-6 font-mono text-sm relative overflow-hidden">
            {!isRevealing && !revealedText ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 border-4 border-tech-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-tech-purple-400 font-code">
                  ENCRYPTED MESSAGE DETECTED
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Click below to decrypt historical communication
                </p>
              </div>
            ) : (
              <div className="text-green-400 leading-relaxed whitespace-pre-wrap">
                {revealedText}
                {isRevealing && (
                  <span className="animate-pulse bg-green-400 text-black px-1">▌</span>
                )}
              </div>
            )}
            
            {/* Matrix-style background effect */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="text-tech-purple-400 text-xs animate-pulse">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="mb-1">
                    {Array.from({ length: 80 }, () => Math.random() > 0.7 ? '1' : '0').join('')}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </TechCard>

      {/* Historical Context */}
      <TechCard variant="cyan">
        <div className="p-6">
          <h3 className="font-space-gothic text-tech-cyan-400 text-lg mb-4">Historical Significance</h3>
          <div className="space-y-3 text-gray-300 text-sm">
            <p>
              This message, sent on Halloween 2008, introduced Bitcoin to the world. Posted to the 
              cryptography mailing list where cypherpunks had discussed digital cash for years, 
              it proposed the first working solution to the double-spend problem.
            </p>
            <div className="bg-tech-cyan-900/20 border-l-4 border-tech-cyan-400 p-3 rounded">
              <p className="text-tech-cyan-400 font-code text-xs">
                TIMING: Sent during the 2008 financial crisis, when trust in traditional banking was collapsing
              </p>
            </div>
          </div>
        </div>
      </TechCard>

      {/* Controls */}
      <div className="text-center space-y-4">
        {!revealedText && !isRevealing ? (
          <TechButton variant="accent" size="lg" onClick={handleRevealMessage}>
            <span className="mr-2">🔓</span>
            DECRYPT MESSAGE
          </TechButton>
        ) : showContinue ? (
          <TechButton variant="accent" size="lg" onClick={handleContinue}>
            ANALYZE THE CONNECTIONS
            <span className="ml-2">→</span>
          </TechButton>
        ) : (
          <TechButton variant="secondary" size="lg" disabled>
            <span className="mr-2">⚡</span>
            DECRYPTING...
          </TechButton>
        )}
      </div>
    </div>
  );
}