import { useState } from "react";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";

interface DAOHackDilemmaProps {
  onComplete: () => void;
}

export function DAOHackDilemma({ onComplete }: DAOHackDilemmaProps) {
  const [userReflection, setUserReflection] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleSubmitReflection = () => {
    if (userReflection.trim().length > 50) {
      setShowAnalysis(true);
    }
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="space-y-8">
      {/* Background */}
      <TechCard variant="cyan">
        <div className="p-8">
          <h2 className="font-tech text-2xl text-tech-cyan-400 mb-6">The Philosophy Meets Reality</h2>
          
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              By 2016, Bitcoin had inspired Ethereum—a platform for "smart contracts" that could 
              execute automatically without human intervention. The cypherpunk dream seemed realized: 
              unstoppable code governing digital assets.
            </p>
            
            <div className="bg-tech-cyan-900/20 border-l-4 border-tech-cyan-400 p-4 rounded">
              <p className="font-code text-tech-cyan-400 text-sm">
                JUNE 17, 2016: The DAO (Decentralized Autonomous Organization) launches with $150M
              </p>
            </div>
            
            <p>
              The DAO was revolutionary—a venture fund with no human management, governed entirely 
              by smart contract code. Investors could fund projects through voting, and the code 
              would execute decisions automatically.
            </p>
            
            <p className="text-tech-cyan-400 font-medium">
              Then disaster struck.
            </p>
          </div>
        </div>
      </TechCard>

      {/* The Crisis */}
      <TechCard variant="purple" className="relative">
        <div className="p-8">
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-red-900 text-red-400 text-xs font-code rounded animate-pulse">
              CRISIS EVENT
            </span>
          </div>
          
          <h3 className="font-tech text-tech-purple-400 text-xl mb-6">The Hack</h3>
          
          <div className="space-y-4 text-gray-300 text-sm">
            <p>
              A hacker discovered a flaw in The DAO's smart contract code. They exploited it to drain 
              approximately $50 million worth of Ethereum into a child DAO they controlled.
            </p>
            
            <div className="bg-red-900/20 border border-red-400/50 rounded p-4">
              <h4 className="text-red-400 font-code text-sm mb-2">TECHNICAL DETAILS:</h4>
              <ul className="text-xs space-y-1 text-gray-300">
                <li>• Recursive call vulnerability in withdrawal function</li>
                <li>• Attacker repeatedly called withdraw before balance update</li>
                <li>• $50M+ drained over several hours</li>
                <li>• Funds locked in child DAO for 28 days</li>
              </ul>
            </div>
            
            <p>
              The Ethereum community faced an unprecedented philosophical crisis. The code had worked 
              exactly as written—but the result was catastrophic theft.
            </p>
          </div>
        </div>
      </TechCard>

      {/* The Dilemma */}
      <div className="grid md:grid-cols-2 gap-6">
        <TechCard variant="cyan">
          <div className="p-6">
            <h4 className="font-tech text-tech-cyan-400 text-lg mb-4">Position A: "Code is Law"</h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <p>
                <strong>The Purist View:</strong> Smart contracts are immutable by design. 
                If we change the rules now, we destroy the entire premise of unstoppable code.
              </p>
              
              <div className="bg-tech-cyan-900/20 border-l-4 border-tech-cyan-400 p-3 rounded">
                <p className="text-tech-cyan-400 font-code text-xs">
                  "The hack was technically legal according to the code"
                </p>
              </div>
              
              <ul className="text-xs space-y-1">
                <li>• Maintains blockchain immutability principle</li>
                <li>• Preserves censorship resistance</li>
                <li>• Upholds "unstoppable code" philosophy</li>
                <li>• Investors knew the risks</li>
              </ul>
            </div>
          </div>
        </TechCard>

        <TechCard variant="purple">
          <div className="p-6">
            <h4 className="font-tech text-tech-purple-400 text-lg mb-4">Position B: Human Intervention</h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <p>
                <strong>The Pragmatic View:</strong> This was clearly theft, not intended behavior. 
                We have the power to fix this injustice and should use it.
              </p>
              
              <div className="bg-tech-purple-900/20 border-l-4 border-tech-purple-400 p-3 rounded">
                <p className="text-tech-purple-400 font-code text-xs">
                  "Moral obligations supersede technical purism"
                </p>
              </div>
              
              <ul className="text-xs space-y-1">
                <li>• Prevents massive financial loss</li>
                <li>• Protects innocent investors</li>
                <li>• Demonstrates community responsibility</li>
                <li>• Malicious exploitation shouldn't be rewarded</li>
              </ul>
            </div>
          </div>
        </TechCard>
      </div>

      {/* User Reflection */}
      <TechCard variant="cyan">
        <div className="p-8">
          <h3 className="font-tech text-tech-cyan-400 text-lg mb-4">Your Perspective</h3>
          <p className="text-gray-300 mb-4">
            The Ethereum community ultimately chose to "hard fork"—creating a new version of the 
            blockchain that returned the stolen funds. This decision split the community forever.
          </p>
          <p className="text-gray-300 mb-6">
            What would you have done? Share your thoughts on this fundamental conflict between 
            ideological purity and pragmatic intervention:
          </p>
          
          <textarea
            value={userReflection}
            onChange={(e) => setUserReflection(e.target.value)}
            placeholder="Consider the tensions between immutability, justice, and community consensus. How do we balance cypherpunk ideals with real-world consequences?"
            className="w-full h-32 bg-black border-2 border-tech-cyan-400 rounded p-4 text-green-400 font-mono text-sm placeholder-gray-500 focus:outline-none focus:border-tech-cyan-300 resize-none"
          />
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-gray-400 text-xs font-code">
              {userReflection.length}/1000 characters
            </span>
            
            <TechButton 
              variant="accent" 
              onClick={handleSubmitReflection}
              disabled={userReflection.trim().length < 50}
            >
              SUBMIT REFLECTION
            </TechButton>
          </div>
        </div>
      </TechCard>

      {/* Analysis and Conclusion */}
      {showAnalysis && (
        <TechCard variant="purple" className="animate-fade-in">
          <div className="p-8">
            <h3 className="font-tech text-tech-purple-400 text-lg mb-4">The Lasting Impact</h3>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>
                Your reflection highlights the central tension in blockchain governance. 
                The DAO hack forced the crypto community to confront uncomfortable questions 
                about immutability, justice, and collective decision-making.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-tech-purple-900/20 border-l-4 border-tech-purple-400 p-4 rounded">
                  <h4 className="text-tech-purple-400 font-code text-sm mb-2">THE FORK:</h4>
                  <p className="text-xs">
                    Ethereum hard forked, returning stolen funds. The original chain became 
                    "Ethereum Classic," maintaining the hack's results.
                  </p>
                </div>
                
                <div className="bg-tech-cyan-900/20 border-l-4 border-tech-cyan-400 p-4 rounded">
                  <h4 className="text-tech-cyan-400 font-code text-sm mb-2">THE LESSON:</h4>
                  <p className="text-xs">
                    Technology alone cannot solve governance. Human judgment and community 
                    consensus remain essential for complex decisions.
                  </p>
                </div>
              </div>
              
              <p>
                This crisis revealed that "code is law" is more complex than early cypherpunks imagined. 
                As blockchain technology matures, balancing ideological purity with practical governance 
                remains one of its greatest challenges.
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <TechButton variant="accent" size="lg" onClick={handleContinue}>
                COMPLETE MODULE 3
                <span className="ml-2">→</span>
              </TechButton>
            </div>
          </div>
        </TechCard>
      )}
    </div>
  );
}