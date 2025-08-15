import { useState } from "react";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";

interface DecentralizationVisualizationProps {
  onComplete: () => void;
}

interface NetworkNode {
  id: number;
  x: number;
  y: number;
  isActive: boolean;
  isCentral?: boolean;
}

export function DecentralizationVisualization({ onComplete }: DecentralizationVisualizationProps) {
  const [centralizedNodes, setCentralizedNodes] = useState<NetworkNode[]>([
    { id: 0, x: 50, y: 50, isActive: true, isCentral: true },
    { id: 1, x: 20, y: 20, isActive: true },
    { id: 2, x: 80, y: 20, isActive: true },
    { id: 3, x: 20, y: 80, isActive: true },
    { id: 4, x: 80, y: 80, isActive: true },
    { id: 5, x: 50, y: 15, isActive: true },
    { id: 6, x: 50, y: 85, isActive: true },
  ]);

  const [decentralizedNodes, setDecentralizedNodes] = useState<NetworkNode[]>([
    { id: 0, x: 25, y: 25, isActive: true },
    { id: 1, x: 75, y: 25, isActive: true },
    { id: 2, x: 25, y: 75, isActive: true },
    { id: 3, x: 75, y: 75, isActive: true },
    { id: 4, x: 50, y: 15, isActive: true },
    { id: 5, x: 15, y: 50, isActive: true },
    { id: 6, x: 85, y: 50, isActive: true },
    { id: 7, x: 50, y: 85, isActive: true },
  ]);

  const [centralizedFailed, setCentralizedFailed] = useState(false);
  const [decentralizedFailedNode, setDecentralizedFailedNode] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleCentralizedClick = (nodeId: number) => {
    if (nodeId === 0) { // Central server
      setCentralizedNodes(nodes => nodes.map(node => ({ ...node, isActive: false })));
      setCentralizedFailed(true);
      setShowExplanation(true);
    }
  };

  const handleDecentralizedClick = (nodeId: number) => {
    setDecentralizedNodes(nodes => nodes.map(node => 
      node.id === nodeId ? { ...node, isActive: false } : node
    ));
    setDecentralizedFailedNode(nodeId);
    if (!showExplanation) setShowExplanation(true);
  };

  const resetNetworks = () => {
    setCentralizedNodes(nodes => nodes.map(node => ({ ...node, isActive: true })));
    setDecentralizedNodes(nodes => nodes.map(node => ({ ...node, isActive: true })));
    setCentralizedFailed(false);
    setDecentralizedFailedNode(null);
    setShowExplanation(false);
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="space-y-8">
      {/* Explanation */}
      <TechCard variant="cyan">
        <div className="p-6">
          <h2 className="font-space-gothic text-2xl text-tech-cyan-400 mb-4">Network Architecture Comparison</h2>
          <p className="text-gray-300 mb-4">
            Explore the fundamental difference between centralized and decentralized networks. 
            Click on nodes to see how each architecture responds to failures.
          </p>
          <div className="bg-tech-cyan-900/20 border-l-4 border-tech-cyan-400 p-4 rounded">
            <p className="font-code text-tech-cyan-400 text-sm">
              INTERACTIVE DEMO: Click nodes to simulate attacks or failures
            </p>
          </div>
        </div>
      </TechCard>

      {/* Network Visualizations */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Centralized Network */}
        <TechCard variant="purple">
          <div className="p-6">
            <h3 className="font-tech text-tech-purple-400 text-lg mb-4 text-center">
              CENTRALIZED NETWORK
            </h3>
            
            <div className="relative h-64 bg-gray-900 rounded-lg border border-tech-purple-600/30 overflow-hidden">
              <svg className="w-full h-full">
                {/* Connection lines */}
                {centralizedNodes.filter(node => !node.isCentral).map(node => (
                  <line
                    key={`line-${node.id}`}
                    x1={`${centralizedNodes[0].x}%`}
                    y1={`${centralizedNodes[0].y}%`}
                    x2={`${node.x}%`}
                    y2={`${node.y}%`}
                    stroke={node.isActive && centralizedNodes[0].isActive ? '#8b5cf6' : '#ef4444'}
                    strokeWidth="2"
                    className="transition-all duration-500"
                    opacity={node.isActive && centralizedNodes[0].isActive ? 0.8 : 0.3}
                  />
                ))}
                
                {/* Nodes */}
                {centralizedNodes.map(node => (
                  <circle
                    key={node.id}
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r={node.isCentral ? "16" : "8"}
                    fill={node.isActive ? (node.isCentral ? '#8b5cf6' : '#a855f7') : '#ef4444'}
                    className="cursor-pointer transition-all duration-500 hover:r-12"
                    onClick={() => handleCentralizedClick(node.id)}
                  />
                ))}
                
                {/* Labels */}
                {centralizedNodes.map(node => (
                  <text
                    key={`label-${node.id}`}
                    x={`${node.x}%`}
                    y={`${node.y + (node.isCentral ? 8 : 5)}%`}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    className="font-code"
                  >
                    {node.isCentral ? 'SERVER' : `U${node.id}`}
                  </text>
                ))}
              </svg>
              
              {centralizedFailed && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-900/50">
                  <span className="text-red-400 font-code text-lg">NETWORK FAILURE</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm mb-2">Click the central server to simulate failure</p>
              <div className="flex items-center justify-center text-xs">
                <span className="w-2 h-2 bg-tech-purple-400 rounded-full mr-2"></span>
                <span className="text-gray-500">Single point of failure</span>
              </div>
            </div>
          </div>
        </TechCard>

        {/* Decentralized Network */}
        <TechCard variant="cyan">
          <div className="p-6">
            <h3 className="font-tech text-tech-cyan-400 text-lg mb-4 text-center">
              DECENTRALIZED NETWORK
            </h3>
            
            <div className="relative h-64 bg-gray-900 rounded-lg border border-tech-cyan-600/30 overflow-hidden">
              <svg className="w-full h-full">
                {/* Connection lines - mesh topology */}
                {decentralizedNodes.map(node1 => 
                  decentralizedNodes.filter(node2 => {
                    const distance = Math.sqrt(
                      Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2)
                    );
                    return distance < 40 && node1.id !== node2.id;
                  }).map(node2 => (
                    <line
                      key={`line-${node1.id}-${node2.id}`}
                      x1={`${node1.x}%`}
                      y1={`${node1.y}%`}
                      x2={`${node2.x}%`}
                      y2={`${node2.y}%`}
                      stroke={node1.isActive && node2.isActive ? '#06b6d4' : '#64748b'}
                      strokeWidth="2"
                      className="transition-all duration-500"
                      opacity={node1.isActive && node2.isActive ? 0.6 : 0.2}
                    />
                  ))
                )}
                
                {/* Nodes */}
                {decentralizedNodes.map(node => (
                  <circle
                    key={node.id}
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r="10"
                    fill={node.isActive ? '#06b6d4' : '#ef4444'}
                    className="cursor-pointer transition-all duration-500 hover:r-12"
                    onClick={() => handleDecentralizedClick(node.id)}
                  />
                ))}
                
                {/* Labels */}
                {decentralizedNodes.map(node => (
                  <text
                    key={`label-${node.id}`}
                    x={`${node.x}%`}
                    y={`${node.y + 6}%`}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    className="font-code"
                  >
                    N{node.id}
                  </text>
                ))}
              </svg>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm mb-2">Click any node to simulate failure</p>
              <div className="flex items-center justify-center text-xs">
                <span className="w-2 h-2 bg-tech-cyan-400 rounded-full mr-2"></span>
                <span className="text-gray-500">Fault-tolerant mesh network</span>
              </div>
            </div>
          </div>
        </TechCard>
      </div>

      {/* Controls */}
      <div className="text-center space-y-4">
        <TechButton variant="secondary" onClick={resetNetworks}>
          <span className="mr-2">🔄</span>
          RESET NETWORKS
        </TechButton>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <TechCard variant="purple" className="animate-fade-in">
          <div className="p-6">
            <h3 className="font-tech text-tech-purple-400 text-lg mb-4">
              {centralizedFailed ? 'Centralized Network Failure' : 'Decentralized Network Resilience'}
            </h3>
            
            <div className="space-y-3 text-gray-300 text-sm">
              {centralizedFailed ? (
                <>
                  <p>
                    <strong>What happened:</strong> When the central server failed, the entire network 
                    became unusable. All communication paths were severed simultaneously.
                  </p>
                  <p>
                    <strong>Real-world impact:</strong> This is why centralized services can be easily 
                    censored or shut down by authorities. A single point of failure affects everyone.
                  </p>
                  <div className="bg-red-900/20 border-l-4 border-red-400 p-3 rounded">
                    <p className="text-red-400 font-code text-xs">
                      VULNERABILITY: All eggs in one basket makes the system fragile
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    <strong>What happened:</strong> Even with node failures, the decentralized network 
                    continues operating. Other nodes route around the failed components.
                  </p>
                  <p>
                    <strong>Real-world benefit:</strong> This resilience makes decentralized networks 
                    extremely difficult to censor or completely shut down.
                  </p>
                  <div className="bg-green-900/20 border-l-4 border-green-400 p-3 rounded">
                    <p className="text-green-400 font-code text-xs">
                      RESILIENCE PILLARS: Redundancy and mesh connectivity ensure survival
                    </p>
                  </div>
                </>
              )}
            </div>
            
            <div className="mt-6 text-center">
              <TechButton variant="accent" size="lg" onClick={handleContinue}>
                COMPLETE MODULE 2
                <span className="ml-2">→</span>
              </TechButton>
            </div>
          </div>
        </TechCard>
      )}
    </div>
  );
}