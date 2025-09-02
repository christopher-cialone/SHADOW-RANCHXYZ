import { useEffect } from 'react';

interface GameCanvasProps {
  networkPingActive?: boolean;
  sparkleActive?: boolean;
  coinFallActive?: boolean;
  transactionActive?: boolean;
  lastStoredMessage?: string | null;
}

export function GameCanvas({ 
  networkPingActive = false,
  sparkleActive = false,
  coinFallActive = false,
  transactionActive = false,
  lastStoredMessage 
}: GameCanvasProps) {
  useEffect(() => {
    if (sparkleActive) {
      // Create sparkle effects
      const sparkles: HTMLDivElement[] = [];
      for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'absolute w-2 h-2 bg-cyan-400 rounded-full animate-ping';
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        document.body.appendChild(sparkle);
        sparkles.push(sparkle);

        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
          }
        }, 3000);
      }

      return () => {
        sparkles.forEach(sparkle => {
          if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
          }
        });
      };
    }
  }, [sparkleActive]);

  useEffect(() => {
    if (coinFallActive) {
      // Create coin fall effects
      const coins: HTMLDivElement[] = [];
      for (let i = 0; i < 3; i++) {
        const coin = document.createElement('div');
        coin.className = 'absolute text-yellow-400 text-xl font-bold animate-bounce';
        coin.textContent = '🪙';
        coin.style.top = '-50px';
        coin.style.left = `${Math.random() * 100}%`;
        coin.style.animationDuration = '2s';
        document.body.appendChild(coin);
        coins.push(coin);

        // Animate falling
        let position = -50;
        const fallInterval = setInterval(() => {
          position += 5;
          coin.style.top = `${position}px`;
          if (position > window.innerHeight) {
            clearInterval(fallInterval);
            if (coin.parentNode) {
              coin.parentNode.removeChild(coin);
            }
          }
        }, 50);
      }

      return () => {
        coins.forEach(coin => {
          if (coin.parentNode) {
            coin.parentNode.removeChild(coin);
          }
        });
      };
    }
  }, [coinFallActive]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {networkPingActive && (
        <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-ping" />
      )}
      {transactionActive && (
        <div className="absolute bottom-4 left-4 text-cyan-400 font-mono text-sm animate-pulse">
          Processing transaction...
        </div>
      )}
      {lastStoredMessage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-cyan-400 px-4 py-2 rounded border border-cyan-400/50 font-mono text-sm">
          {lastStoredMessage}
        </div>
      )}
    </div>
  );
}