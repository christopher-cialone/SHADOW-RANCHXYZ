import { ReactNode, useEffect, useState } from "react";
import { Header } from "./Header";
import { useGameStore } from "@/hooks/use-game-store";
import { GameCanvas } from "@/components/game/GameCanvas";
import { useTheme } from "next-themes";
import { GlobalLoader } from "@/components/ui/GlobalLoader";
import { useLoadingManager } from "@/hooks/use-loading-manager";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const gameState = useGameStore();
  const { showLoader } = useLoadingManager();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Create data particles periodically with error handling
    const createDataParticle = () => {
      try {
        const particle = document.createElement('div');
        particle.className = 'data-particle';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        document.body.appendChild(particle);
        
        setTimeout(() => {
          try {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          } catch (error) {
            console.debug('Particle cleanup error:', error);
          }
        }, 25000);
      } catch (error) {
        console.debug('Particle creation error:', error);
      }
    };

    const interval = setInterval(createDataParticle, 2000);
    
    // Create initial particles
    for (let i = 0; i < 8; i++) {
      setTimeout(createDataParticle, i * 500);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative flex flex-col">
      {/* Blueshift geometric grid pattern background */}
      <div className="absolute inset-0 opacity-[0.03] bg-repeat" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300FFFF' stroke-width='0.5'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3Cpath d='M0 30h60M30 0v60'/%3E%3Cpath d='M15 0v60M45 0v60M0 15h60M0 45h60'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      {/* Subtle tech accent lines */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(45deg, transparent 49%, rgba(0, 255, 255, 0.1) 50%, transparent 51%), linear-gradient(-45deg, transparent 49%, rgba(0, 255, 255, 0.1) 50%, transparent 51%)`,
        backgroundSize: '20px 20px'
      }} />
      {/* Blueshift-style floating data elements */}
      <div className="absolute top-[15%] right-[10%] w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0s' }} />
      <div className="absolute top-[35%] left-[5%] w-1 h-1 bg-cyan-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '-2s' }} />
      <div className="absolute top-[55%] right-[20%] w-1 h-1 bg-cyan-400 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '-4s' }} />
      <div className="absolute top-[75%] left-[15%] w-1 h-1 bg-cyan-400 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '-6s' }} />
      <Header onThemeToggle={toggleTheme} currentTheme={theme} />
      <main 
        className="flex-grow px-3 sm:px-4 md:px-6 lg:px-8"
        style={{ paddingTop: 'var(--header-height)' }}
      >
        {children}
      </main>
      {/* Game Canvas Overlay */}
      <GameCanvas
        networkPingActive={gameState.networkPingActive}
        sparkleActive={gameState.sparkleActive}
        coinFallActive={gameState.coinFallActive}
        transactionActive={gameState.transactionActive}
        lastStoredMessage={gameState.lastStoredMessage}
      />
      {/* Global Loader */}
      <GlobalLoader show={showLoader} />
      {/* Blueshift-style Footer */}
      <footer className="bg-black/50 border-t border-cyan-400/10 py-4 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="font-space-gothic text-sm bg-gradient-to-r from-tech-cyan-400 to-tech-purple-400 bg-clip-text text-transparent">🏜️ brb: shadow ranch</span>
              <span className="text-gray-500 font-code text-xs">|</span>
              <span className="text-gray-400 font-code text-xs">Learn Solana Program Development</span>
            </div>
            <div className="flex items-center space-x-6">
              <a 
                href="https://x.com/Bull_Run_Boost" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-tech-cyan-400 transition-colors flex items-center space-x-1"
                title="Follow us on X"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://t.me/+Cb2SmUQ-53QwZGM5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-tech-cyan-400 transition-colors flex items-center space-x-1"
                title="Join our Telegram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a 
                href="https://discord.com/users/cialonecodes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-tech-cyan-400 transition-colors"
                title="Connect on Discord"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z"/>
                </svg>
              </a>
              
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
