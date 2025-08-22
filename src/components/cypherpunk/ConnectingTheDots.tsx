import { useState } from "react";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";

interface Connection {
  id: number;
  concept: string;
  feature: string;
  conceptDescription: string;
  featureDescription: string;
}

interface ConnectingTheDotsProps {
  onComplete: () => void;
}

const connections: Connection[] = [
  {
    id: 1,
    concept: "Anonymous eCash",
    feature: "Pseudonymous Addresses",
    conceptDescription: "Digital cash that protects user identity",
    featureDescription: "Bitcoin addresses hide real-world identity"
  },
  {
    id: 2,
    concept: "Decentralized Servers",
    feature: "Peer-to-Peer Network",
    conceptDescription: "No single point of control or failure",
    featureDescription: "Network of independent nodes"
  },
  {
    id: 3,
    concept: "\"We Write Code\"",
    feature: "Open Source Codebase",
    conceptDescription: "Cypherpunk philosophy of building solutions",
    featureDescription: "Bitcoin code is publicly auditable"
  },
  {
    id: 4,
    concept: "Digital Signatures",
    feature: "Public/Private Key Crypto",
    conceptDescription: "Cryptographic proof of ownership",
    featureDescription: "Mathematical verification of transactions"
  }
];

export function ConnectingTheDots({ onComplete }: ConnectingTheDotsProps) {
  const [selectedConcept, setSelectedConcept] = useState<number | null>(null);
  const [completedConnections, setCompletedConnections] = useState<number[]>([]);
  const [activeConnections, setActiveConnections] = useState<{[key: number]: number}>({});
  const [showCompletion, setShowCompletion] = useState(false);

  const handleConceptClick = (conceptId: number) => {
    if (completedConnections.includes(conceptId)) return;
    setSelectedConcept(conceptId);
  };

  const handleFeatureClick = (featureId: number) => {
    if (!selectedConcept || completedConnections.includes(selectedConcept)) return;
    
    const connection = connections.find(c => c.id === selectedConcept);
    const targetFeature = connections.find(c => c.id === featureId);
    
    if (connection && targetFeature && connection.id === targetFeature.id) {
      // Correct connection
      setCompletedConnections(prev => [...prev, selectedConcept]);
      setActiveConnections(prev => ({...prev, [selectedConcept]: featureId}));
      setSelectedConcept(null);
      
      if (completedConnections.length + 1 === connections.length) {
        setTimeout(() => setShowCompletion(true), 1000);
      }
    } else {
      // Incorrect connection - show feedback
      setTimeout(() => setSelectedConcept(null), 500);
    }
  };

  const handleContinue = () => {
    onComplete();
  };

  const isAllComplete = completedConnections.length === connections.length;

  return (
    <div className="space-y-8">
      {/* Instructions */}
      <TechCard variant="purple">
        <div className="p-6">
          <h2 className="font-space-gothic text-2xl text-tech-purple-400 mb-4">Connection Analysis</h2>
          <p className="text-gray-300 mb-4">
            Connect each cypherpunk concept to its corresponding Bitcoin implementation. 
            Click a concept on the left, then click its matching feature on the right.
          </p>
          <div className="bg-tech-purple-900/20 border-l-4 border-tech-purple-400 p-4 rounded">
            <p className="font-code text-tech-purple-400 text-sm">
              PROGRESS: {completedConnections.length} / {connections.length} connections made
            </p>
          </div>
        </div>
      </TechCard>

      {/* Connection Game */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Cypherpunk Concepts */}
        <div className="space-y-4">
          <h3 className="font-tech text-tech-cyan-400 text-xl text-center mb-6">
            CYPHERPUNK CONCEPTS
          </h3>
          
          {connections.map((connection) => (
            <TechCard 
              key={`concept-${connection.id}`}
              variant="cyan"
              className={`cursor-pointer transition-all duration-300 relative ${
                completedConnections.includes(connection.id) 
                  ? 'opacity-50 ring-2 ring-green-400' 
                  : selectedConcept === connection.id
                  ? 'ring-2 ring-tech-cyan-400 scale-105'
                  : 'hover:scale-105 hover:ring-1 hover:ring-tech-cyan-400'
              }`}
              onClick={() => handleConceptClick(connection.id)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-tech text-tech-cyan-400 text-lg mb-2">
                      {connection.concept}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {connection.conceptDescription}
                    </p>
                  </div>
                  
                  <div className="ml-4">
                    {completedConnections.includes(connection.id) ? (
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">✓</span>
                      </div>
                    ) : selectedConcept === connection.id ? (
                      <div className="w-8 h-8 bg-tech-cyan-400 rounded-full animate-pulse"></div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Connection Line */}
              {activeConnections[connection.id] && (
                <div className="absolute top-1/2 right-0 w-12 h-0.5 bg-green-400 transform translate-x-full -translate-y-1/2 z-10">
                  <div className="absolute right-0 top-1/2 w-2 h-2 bg-green-400 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                </div>
              )}
            </TechCard>
          ))}
        </div>

        {/* Bitcoin Features */}
        <div className="space-y-4">
          <h3 className="font-tech text-tech-purple-400 text-xl text-center mb-6">
            BITCOIN FEATURES
          </h3>
          
          {connections.map((connection) => (
            <TechCard 
              key={`feature-${connection.id}`}
              variant="purple"
              className={`cursor-pointer transition-all duration-300 relative ${
                completedConnections.includes(connection.id)
                  ? 'opacity-50 ring-2 ring-green-400'
                  : selectedConcept && !completedConnections.includes(selectedConcept)
                  ? 'hover:scale-105 hover:ring-1 hover:ring-tech-purple-400'
                  : 'opacity-70'
              }`}
              onClick={() => handleFeatureClick(connection.id)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="ml-4">
                    {completedConnections.includes(connection.id) ? (
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">✓</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-tech text-tech-purple-400 text-lg mb-2">
                      {connection.feature}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {connection.featureDescription}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Connection Line */}
              {activeConnections[connection.id] && (
                <div className="absolute top-1/2 left-0 w-12 h-0.5 bg-green-400 transform -translate-x-full -translate-y-1/2 z-10">
                  <div className="absolute left-0 top-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              )}
            </TechCard>
          ))}
        </div>
      </div>

      {/* Completion Screen */}
      {showCompletion && (
        <TechCard variant="cyan" className="animate-fade-in">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-tech-cyan-400 to-tech-purple-400 rounded-full mx-auto flex items-center justify-center mb-4">
              <span className="text-2xl">🔗</span>
            </div>
            
            <h3 className="font-tech text-tech-cyan-400 text-xl mb-4">
              ALL CONNECTIONS ESTABLISHED
            </h3>
            
            <p className="text-gray-300 mb-6">
              You've successfully traced how cypherpunk principles evolved into Bitcoin's core features. 
              Each concept laid the groundwork for Satoshi's revolutionary design.
            </p>
            
            <div className="bg-tech-cyan-900/20 border-l-4 border-tech-cyan-400 p-4 rounded mb-6">
              <p className="text-tech-cyan-400 font-code text-sm">
                INSIGHT: Bitcoin didn't emerge from nothing—it was the culmination of decades of cypherpunk innovation
              </p>
            </div>
            
            <TechButton variant="accent" size="lg" onClick={handleContinue}>
              EXPLORE THE NEXT CHALLENGE
              <span className="ml-2">→</span>
            </TechButton>
          </div>
        </TechCard>
      )}

      {/* Progress Indicator */}
      {!showCompletion && (
        <div className="text-center">
          <div className="inline-flex space-x-2">
            {connections.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  completedConnections.length > index ? 'bg-green-400' : 'bg-gray-600'
                }`}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}