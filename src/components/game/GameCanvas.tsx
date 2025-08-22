import { useEffect, useRef } from "react";
import { useGameStore } from "@/hooks/use-game-store";

interface GameCanvasProps {
  networkPingActive?: boolean;
  sparkleActive?: boolean;
  coinFallActive?: boolean;
  dataStreamActive?: boolean;
  transactionActive?: boolean;
  lastStoredMessage?: string | null;
}

export function GameCanvas({
  networkPingActive,
  sparkleActive,
  coinFallActive,
  dataStreamActive,
  transactionActive,
  lastStoredMessage
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const gameState = useGameStore();

  useEffect(() => {
    if (sparkleActive && canvasRef.current) {
      // Create sparkle effects
      for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-effect';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = i * 0.1 + 's';
        canvasRef.current.appendChild(sparkle);
        
        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
          }
        }, 1500);
      }
    }
  }, [sparkleActive]);

  useEffect(() => {
    if (dataStreamActive && canvasRef.current) {
      // Create data stream effects for PDA success
      for (let i = 0; i < 20; i++) {
        const dataParticle = document.createElement('div');
        dataParticle.className = 'data-stream-particle';
        dataParticle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: #08ddb8;
          border-radius: 50%;
          left: ${40 + Math.sin(i * 0.3) * 20}%;
          top: ${i * 4}%;
          animation: dataStreamFlow 3.5s ease-out forwards;
          animation-delay: ${i * 100}ms;
          box-shadow: 0 0 8px #08ddb8;
        `;
        canvasRef.current.appendChild(dataParticle);
        
        setTimeout(() => {
          if (dataParticle.parentNode) {
            dataParticle.parentNode.removeChild(dataParticle);
          }
        }, 3500);
      }
    }
  }, [dataStreamActive]);

  return (
    <div 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ 
        display: networkPingActive || sparkleActive || coinFallActive || dataStreamActive || transactionActive || lastStoredMessage ? 'block' : 'none' 
      }}
    >
      {/* Network ping effect */}
      {networkPingActive && (
        <div className="absolute top-4 right-4 bg-blue-500/90 text-white px-3 py-2 rounded-lg font-mono text-sm animate-pulse">
          <i className="fas fa-wifi mr-2" />
          Connecting to Solana...
        </div>
      )}

      {/* Transaction success effect */}
      {transactionActive && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500/90 text-white px-6 py-4 rounded-lg font-deputy text-lg animate-bounce">
          <i className="fas fa-check-circle mr-2" />
          Transaction Successful!
        </div>
      )}

      {/* Coin fall effect */}
      {coinFallActive && (
        <div className="absolute inset-0">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="absolute text-sunset-400 text-2xl animate-bounce"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 50 + '%',
                animationDelay: i * 0.1 + 's',
                animationDuration: '2s'
              }}
            >
              <i className="fas fa-coins" />
            </div>
          ))}
        </div>
      )}

      {/* Stored message display */}
      {lastStoredMessage && (
        <div className="absolute bottom-4 left-4 bg-mystic-600/90 text-white px-4 py-3 rounded-lg font-mono text-sm max-w-md">
          <i className="fas fa-save mr-2" />
          {lastStoredMessage}
        </div>
      )}
    </div>
  );
}
