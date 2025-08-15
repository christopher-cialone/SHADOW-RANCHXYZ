import { useState } from "react";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";

interface PrincipledBuilderProps {
  onComplete: () => void;
}

export function PrincipledBuilder({ onComplete }: PrincipledBuilderProps) {
  const [userResponse, setUserResponse] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleSubmitResponse = () => {
    if (userResponse.trim().length > 50) {
      setShowAnalysis(true);
    }
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="space-y-8">
      {/* The Scenario */}
      <TechCard variant="cyan">
        <div className="p-8">
          <h2 className="font-space-gothic text-2xl text-tech-cyan-400 mb-6">The Ultimate Test</h2>
          
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              You've built a revolutionary decentralized application that empowers users with 
              true financial sovereignty. No KYC, no censorship, no central control. It embodies 
              everything the cypherpunks fought for.
            </p>
            
            <div className="bg-tech-cyan-900/20 border-l-4 border-tech-cyan-400 p-4 rounded">
              <p className="font-code text-tech-cyan-400 text-sm">
                USER GROWTH: 100,000+ active users • TRANSACTION VOLUME: $50M+ daily
              </p>
            </div>
            
            <p>
              Your application is gaining massive adoption, but funding is running low. 
              The infrastructure costs are mounting, and you need capital to scale.
            </p>
          </div>
        </div>
      </TechCard>

      {/* The Offer */}
      <TechCard variant="purple" className="relative">
        <div className="p-8">
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-green-900 text-green-400 text-xs font-code rounded animate-pulse">
              $10M OFFER
            </span>
          </div>
          
          <h3 className="font-space-gothic text-tech-purple-400 text-xl mb-6">The Devil's Bargain</h3>
          
          <div className="space-y-4 text-gray-300 text-sm">
            <p>
              A prestigious venture capital firm approaches you with an offer: 
              <strong className="text-green-400"> $10 million in funding</strong> to accelerate 
              your growth and dominate the market.
            </p>
            
            <div className="bg-red-900/20 border border-red-400/50 rounded p-4">
              <h4 className="text-red-400 font-code text-sm mb-3">THE CONDITIONS:</h4>
              <ul className="text-xs space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Implement KYC (Know Your Customer) verification for all users</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Grant the VC firm ability to freeze user accounts when "necessary"</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Share user transaction data with "approved regulatory partners"</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Remove anonymous features to comply with "evolving regulations"</span>
                </li>
              </ul>
            </div>
            
            <p>
              The VC partner explains: <em>"This is just business pragmatism. You can't change 
              the world if you don't survive in it. Take the money, scale the platform, 
              and worry about ideals later."</em>
            </p>
          </div>
        </div>
      </TechCard>

      {/* The Stakes */}
      <div className="grid md:grid-cols-2 gap-6">
        <TechCard variant="green">
          <div className="p-6">
            <h4 className="font-tech text-green-400 text-lg mb-4">Accept the Offer</h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <ul className="text-xs space-y-1">
                <li>✓ Immediate $10M to scale operations</li>
                <li>✓ Market dominance and competitive advantage</li>
                <li>✓ Job security for your team</li>
                <li>✓ "Gradual" implementation of restrictions</li>
                <li>✓ Potential to "change the system from within"</li>
              </ul>
              
              <div className="bg-green-900/20 border-l-4 border-green-400 p-3 rounded mt-4">
                <p className="text-green-400 font-code text-xs">
                  "Better to have compromised decentralization than no decentralization"
                </p>
              </div>
            </div>
          </div>
        </TechCard>

        <TechCard variant="red">
          <div className="p-6">
            <h4 className="font-tech text-red-400 text-lg mb-4">Refuse the Offer</h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <ul className="text-xs space-y-1">
                <li>• Risk running out of funding</li>
                <li>• Slower growth and scaling challenges</li>
                <li>• Potential team layoffs</li>
                <li>• Competitors may take the money instead</li>
                <li>• Platform might fail entirely</li>
              </ul>
              
              <div className="bg-red-900/20 border-l-4 border-red-400 p-3 rounded mt-4">
                <p className="text-red-400 font-code text-xs">
                  "Principles don't pay the bills or serve users"
                </p>
              </div>
            </div>
          </div>
        </TechCard>
      </div>

      {/* User Response */}
      <TechCard variant="purple">
        <div className="p-8">
          <h3 className="font-space-gothic text-tech-purple-400 text-lg mb-4">Your Decision</h3>
          <p className="text-gray-300 mb-4">
            This is the test every builder faces. When the pressure mounts and the stakes are real, 
            will you hold the line or make the "pragmatic" choice?
          </p>
          <p className="text-gray-300 mb-6">
            What do you do, and why? Consider the cypherpunk principles you've learned, 
            the real-world constraints you face, and the users who depend on you:
          </p>
          
          <textarea
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            placeholder="This is your moment of truth. The cypherpunks faced similar choices in their time. Some held firm to their principles, others made compromises they later regretted. What choice will you make, and how will you justify it to yourself and your users?"
            className="w-full h-40 bg-black border-2 border-tech-purple-400 rounded p-4 text-green-400 font-mono text-sm placeholder-gray-500 focus:outline-none focus:border-tech-purple-300 resize-none"
          />
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-gray-400 text-xs font-code">
              {userResponse.length}/2000 characters
            </span>
            
            <TechButton 
              variant="accent" 
              onClick={handleSubmitResponse}
              disabled={userResponse.trim().length < 50}
            >
              SUBMIT DECISION
            </TechButton>
          </div>
        </div>
      </TechCard>

      {/* Analysis */}
      {showAnalysis && (
        <TechCard variant="cyan" className="animate-fade-in">
          <div className="p-8">
            <h3 className="font-space-gothic text-tech-cyan-400 text-lg mb-4">The Weight of Choice</h3>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>
                Your response reveals the complexity of building in the real world. 
                There are no perfect choices, only trade-offs between ideals and survival, 
                principles and pragmatism.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-tech-cyan-900/20 border-l-4 border-tech-cyan-400 p-4 rounded">
                  <h4 className="text-tech-cyan-400 font-code text-sm mb-2">HISTORICAL PRECEDENT:</h4>
                  <p className="text-xs">
                    Many cypherpunk projects faced similar pressures. Some maintained their principles 
                    and remained niche. Others compromised and became the platforms we criticize today.
                  </p>
                </div>
                
                <div className="bg-tech-purple-900/20 border-l-4 border-tech-purple-400 p-4 rounded">
                  <h4 className="text-tech-purple-400 font-code text-sm mb-2">THE PATTERN:</h4>
                  <p className="text-xs">
                    Every generation of builders faces this choice. The tools evolve, but the fundamental 
                    tension between freedom and control, idealism and realism, remains constant.
                  </p>
                </div>
              </div>
              
              <p>
                The cypherpunks understood that technology alone isn't enough. It takes builders 
                with conviction to resist the gravitational pull of power and profit. 
                The future depends on people who choose principles over pressure.
              </p>
              
              <div className="bg-orange-900/20 border border-orange-400/50 rounded p-4">
                <p className="text-orange-400 font-code text-sm text-center">
                  "The future is not some place we are going, but one we are creating. 
                  The paths are not to be found, but made." - John Schaar
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <TechButton variant="accent" size="lg" onClick={handleContinue}>
                COMPLETE THE LEGACY
                <span className="ml-2">→</span>
              </TechButton>
            </div>
          </div>
        </TechCard>
      )}
    </div>
  );
}