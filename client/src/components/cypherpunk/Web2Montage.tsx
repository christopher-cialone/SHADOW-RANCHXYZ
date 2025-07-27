import { useState, useEffect } from "react";
import { TechButton } from "@/components/ui/TechButton";

interface Web2MontageProps {
  onComplete: () => void;
}

interface LogoData {
  name: string;
  icon: string;
  color: string;
  glitchTexts: string[];
}

const logos: LogoData[] = [
  {
    name: "Facebook",
    icon: "📘",
    color: "#1877F2",
    glitchTexts: ["DATA HARVESTED", "PRIVACY VIOLATED", "DEMOCRACY COMPROMISED"]
  },
  {
    name: "Google",
    icon: "🔍",
    color: "#4285F4",
    glitchTexts: ["SEARCHES TRACKED", "BEHAVIOR PROFILED", "THOUGHTS MONETIZED"]
  },
  {
    name: "TikTok",
    icon: "🎵",
    color: "#FF0050",
    glitchTexts: ["ATTENTION HIJACKED", "ADDICTION ENGINEERED", "MINDS CONTROLLED"]
  },
  {
    name: "Amazon",
    icon: "📦",
    color: "#FF9900",
    glitchTexts: ["WORKERS EXPLOITED", "COMPETITION CRUSHED", "SURVEILLANCE EXPANDED"]
  },
  {
    name: "Twitter",
    icon: "🐦",
    color: "#1DA1F2",
    glitchTexts: ["VOICES SILENCED", "DISCOURSE MANIPULATED", "TRUTH DISTORTED"]
  }
];

export function Web2Montage({ onComplete }: Web2MontageProps) {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [currentGlitchIndex, setCurrentGlitchIndex] = useState(0);
  const [showNarrative, setShowNarrative] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const startAnimation = async () => {
      setIsAnimating(true);
      
      // Show each logo with glitch effects
      for (let logoIndex = 0; logoIndex < logos.length; logoIndex++) {
        setCurrentLogoIndex(logoIndex);
        
        // Show each glitch text for this logo
        for (let glitchIndex = 0; glitchIndex < logos[logoIndex].glitchTexts.length; glitchIndex++) {
          setCurrentGlitchIndex(glitchIndex);
          await new Promise(resolve => setTimeout(resolve, 800));
        }
        
        // Pause between logos
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Fade to black
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show narrative
      setShowNarrative(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Show continue button
      setShowContinue(true);
      setIsAnimating(false);
    };

    startAnimation();
  }, []);

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Logo Display */}
      {isAnimating && currentLogoIndex < logos.length && (
        <div className="text-center relative">
          <div 
            className="text-9xl mb-8 logo-animation"
            style={{ 
              filter: `drop-shadow(0 0 30px ${logos[currentLogoIndex].color}) drop-shadow(0 0 60px ${logos[currentLogoIndex].color}50)`,
              color: logos[currentLogoIndex].color,
              textShadow: `0 0 20px ${logos[currentLogoIndex].color}`
            }}
          >
            {logos[currentLogoIndex].icon}
          </div>
          
          <h2 
            className="text-4xl font-bold mb-8 animate-fade-in"
            style={{ color: logos[currentLogoIndex].color }}
          >
            {logos[currentLogoIndex].name}
          </h2>
          
          {/* Glitch Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="text-red-500 text-3xl font-mono font-bold animate-glitch"
              data-text={logos[currentLogoIndex].glitchTexts[currentGlitchIndex]}
              style={{
                textShadow: `
                  -2px 0 #ff0000,
                  2px 0 #00ffff,
                  0 -2px #ffff00,
                  0 2px #ff00ff,
                  -1px -1px #ff0000,
                  1px 1px #00ffff
                `,
                filter: 'brightness(1.2) contrast(1.3)'
              }}
            >
              {logos[currentLogoIndex].glitchTexts[currentGlitchIndex]}
            </div>
          </div>
        </div>
      )}
      
      {/* Narrative */}
      {showNarrative && !isAnimating && (
        <div className="text-center max-w-4xl px-8 animate-fade-in">
          <div className="space-y-8 text-gray-300 leading-relaxed">
            <p className="text-2xl font-light">
              The Cypherpunks gave us the tools for a free and open internet.
            </p>
            
            <p className="text-3xl text-red-400 font-medium">
              But what did we build?
            </p>
            
            <div className="bg-red-900/20 border border-red-400/50 rounded-lg p-8">
              <p className="text-lg">
                Instead of liberation, we created digital plantations. Instead of privacy, 
                we built surveillance empires. Instead of decentralization, we built 
                new monopolies more powerful than anything the world had ever seen.
              </p>
            </div>
            
            <p className="text-xl text-tech-cyan-400">
              The fight for the future is not over. It's just beginning.
            </p>
          </div>
          
          {showContinue && (
            <div className="mt-12 animate-fade-in">
              <TechButton 
                variant="accent" 
                size="lg" 
                onClick={handleContinue}
                className="relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-2">⚔️</span>
                  CONTINUE THE FIGHT
                  <span className="ml-2">⚔️</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/50 to-tech-cyan-600/50 animate-pulse"></div>
              </TechButton>
            </div>
          )}
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes glitch {
          0%, 100% { 
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
          10% { 
            transform: translate(-2px, -2px);
            filter: hue-rotate(90deg);
          }
          20% { 
            transform: translate(2px, 2px);
            filter: hue-rotate(180deg);
          }
          30% { 
            transform: translate(-1px, 1px);
            filter: hue-rotate(270deg);
          }
          40% { 
            transform: translate(1px, -1px);
            filter: hue-rotate(360deg);
          }
          50% { 
            transform: translate(-1px, -1px);
            filter: hue-rotate(180deg);
          }
          60% { 
            transform: translate(1px, 1px);
            filter: hue-rotate(90deg);
          }
          70% { 
            transform: translate(-2px, 1px);
            filter: hue-rotate(270deg);
          }
          80% { 
            transform: translate(2px, -1px);
            filter: hue-rotate(45deg);
          }
          90% { 
            transform: translate(-1px, 2px);
            filter: hue-rotate(135deg);
          }
        }
        
        .animate-glitch {
          animation: glitch 0.3s infinite;
          text-shadow: 
            -1px 0 red,
            1px 0 cyan,
            0 -1px yellow,
            0 1px blue;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-in;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}