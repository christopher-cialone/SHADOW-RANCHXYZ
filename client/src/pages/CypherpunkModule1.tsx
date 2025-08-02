import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";
import { BackButton } from "@/components/ui/BackButton";
import { usePageLoader } from "@/hooks/use-page-loader";
import { useCypherpunkProgress } from "@/hooks/use-cypherpunk-progress";
import { CryptoWarsTimeline } from "@/components/cypherpunk/CryptoWarsTimeline";
import { ManifestoQuiz } from "@/components/cypherpunk/ManifestoQuiz";

export default function CypherpunkModule1() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);
  const [terminalText, setTerminalText] = useState("");
  const [showNarrative, setShowNarrative] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { completeModule } = useCypherpunkProgress();
  
  usePageLoader();

  // Terminal typing effect for intro
  useEffect(() => {
    if (step === 0) {
      const text = "> RUN GENESIS_ARCHIVE.EXE";
      let i = 0;
      
      const typeEffect = setInterval(() => {
        if (i < text.length) {
          setTerminalText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeEffect);
          // Show narrative after typing completes
          setTimeout(() => setShowNarrative(true), 1000);
          // Show button after narrative appears
          setTimeout(() => setShowButton(true), 3000);
        }
      }, 150);

      return () => clearInterval(typeEffect);
    }
  }, [step]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleQuizComplete = () => {
    setTimeout(() => setStep(5), 1500);
  };

  const handleReturnToDashboard = () => {
    completeModule(1);
    setLocation('/lessons');
  };

  if (step === 0) {
    // Intro Screen
    return (
      <>
        <BackButton currentModule={1} />
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-purple-900/10"></div>
        
        <div className="text-center z-10 max-w-4xl px-8">
          <div className="font-code text-cyan-400 text-xl mb-8">
            {terminalText}
            <span className="animate-pulse">|</span>
          </div>
          
          {showNarrative && (
            <div className="animate-fade-in">
              <p className="font-tech text-gray-300 text-lg leading-relaxed mb-8">
                What if your every digital whisper could be heard? What if your every transaction, 
                every message, every thought shared online was catalogued, analyzed, and stored forever? 
                In the shadows of the early internet, a group of digital rebels asked these very questions—
                and decided to fight back with the most powerful weapon of all: code.
              </p>
            </div>
          )}
          
          {showButton && (
            <div className="animate-fade-in">
              <TechButton variant="accent" size="lg" onClick={handleNext}>
                <span className="mr-2">⚡</span>
                BEGIN MISSION
              </TechButton>
            </div>
          )}
        </div>
        </div>
      </>
    );
  }

  if (step === 1) {
    // Chapter 1: The Digital Frontier
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <TechCard variant="cyan" className="mb-8">
            <div className="p-8">
              <h1 className="font-titulo text-3xl text-cyan-400 mb-6">Chapter 1: The Digital Frontier</h1>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  Before Bitcoin, before Ethereum, before the blockchain revolution took the world by storm, 
                  there existed a different kind of rebel—the Cypherpunk. These weren't your typical outlaws; 
                  they were mathematicians, programmers, and philosophers armed with cryptographic algorithms 
                  instead of six-shooters.
                </p>
                
                <p>
                  In the 1990s, as the internet began to take shape, these digital pioneers gathered in 
                  virtual spaces, sharing encrypted messages and debating the future of privacy, freedom, 
                  and democracy in the digital age. They believed that strong cryptography was not just 
                  a tool—it was a fundamental right.
                </p>
                
                <p className="font-tech text-cyan-400 bg-cyan-500/10 p-4 rounded border-l-4 border-cyan-400">
                  "Privacy is necessary for an open society in the electronic age... We cannot expect 
                  governments, corporations, or other large, faceless organizations to grant us privacy 
                  out of their beneficence."
                </p>
                
                <p>
                  This was their manifesto, their code of honor in the digital frontier.
                </p>
              </div>
              
              <div className="mt-8 flex justify-end">
                <TechButton variant="primary" onClick={handleNext}>
                  CONTINUE TO TIMELINE
                  <span className="ml-2">→</span>
                </TechButton>
              </div>
            </div>
          </TechCard>
        </div>
      </div>
    );
  }

  if (step === 2) {
    // Interactive Timeline
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="font-titulo text-4xl text-cyan-400 mb-4">The Crypto Wars Timeline</h1>
            <p className="text-gray-400 font-tech">Declassified: Key moments in the battle for digital freedom</p>
          </div>
          
          <CryptoWarsTimeline onComplete={handleNext} />
        </div>
      </div>
    );
  }

  if (step === 3) {
    // Chapter 2: The Manifesto
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <TechCard variant="purple" className="mb-8">
            <div className="p-8">
              <h1 className="font-titulo text-3xl text-purple-400 mb-6">Chapter 2: A Cypherpunk's Manifesto</h1>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  On March 9, 1993, Eric Hughes published what would become the foundational document of 
                  the cypherpunk movement: "A Cypherpunk's Manifesto." In it, he laid out the philosophical 
                  groundwork for everything that would follow—from PGP encryption to Bitcoin.
                </p>
                
                <div className="bg-gray-800 p-6 rounded border-l-4 border-purple-400 font-code text-sm">
                  <p className="text-purple-400 mb-4">[CLASSIFIED DOCUMENT - EYES ONLY]</p>
                  <p className="mb-4">
                    "Privacy is not secrecy. A private matter is something one doesn't want the whole world 
                    to know, but a secret matter is something one doesn't want anybody to know. Privacy is 
                    the power to selectively reveal oneself to the world."
                  </p>
                  <p>
                    "Cypherpunks write code. We know that someone has to write software to defend privacy, 
                    and since we can't get privacy unless we all do, we're going to write it."
                  </p>
                </div>
                
                <p>
                  This manifesto became the rallying cry for a generation of developers who would go on to 
                  create the tools and technologies that power today's decentralized web. They understood 
                  that code wasn't just instructions for computers—it was a form of political action.
                </p>
              </div>
              
              <div className="mt-8 flex justify-end">
                <TechButton variant="primary" onClick={handleNext}>
                  TEST YOUR KNOWLEDGE
                  <span className="ml-2">→</span>
                </TechButton>
              </div>
            </div>
          </TechCard>
        </div>
      </div>
    );
  }

  if (step === 4) {
    // Interactive Quiz
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-titulo text-4xl text-cyan-400 mb-4">Manifesto Quiz</h1>
            <p className="text-gray-400 font-tech">Prove your understanding of the cypherpunk philosophy</p>
          </div>
          
          <ManifestoQuiz onComplete={handleQuizComplete} />
        </div>
      </div>
    );
  }

  if (step === 5) {
    // Completion Screen
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-2xl px-8">
          <div className="animate-pulse mb-8">
            <div className="w-32 h-32 bg-cyan-500/20 border border-cyan-400/30 rounded-full mx-auto flex items-center justify-center mb-6">
              <span className="text-4xl">🛡️</span>
            </div>
          </div>
          
          <h1 className="font-titulo text-5xl text-cyan-400 mb-6">
            MISSION 1 COMPLETE
          </h1>
          
          <div className="bg-cyan-500/10 border border-cyan-400/50 rounded-lg p-6 mb-8">
            <h2 className="font-tech text-cyan-400 text-xl mb-4">GENESIS BADGE ACQUIRED</h2>
            <p className="text-gray-300">
              You've successfully completed "The Genesis of a Movement" and earned your first badge 
              in the Cypherpunk Legacy track. You now understand the philosophical foundations that 
              led to the blockchain revolution.
            </p>
          </div>
          
          <div className="space-y-4">
            <TechButton variant="accent" size="lg" onClick={handleReturnToDashboard}>
              <span className="mr-2">🏠</span>
              RETURN TO DASHBOARD
            </TechButton>
            
            <p className="text-gray-400 text-sm font-code">
              Progress: 17% • Next: The Pillars of a Free Internet
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}