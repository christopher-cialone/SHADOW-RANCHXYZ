import { Link } from "wouter";
import { WesternButton } from "@/components/ui/WesternButton";
import { WesternCard } from "@/components/ui/WesternCard";
import { TypewriterText } from "@/components/ui/TypewriterText";
import DecryptedText from "@/components/ui/DecryptedText";

import { useGameStore } from "@/hooks/use-game-store";
import { formatRanchCoin } from "@/lib/utils";

export default function Home() {
  const { ranchData } = useGameStore();

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background sparkle effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="sparkle-effect" style={{ top: '20%', left: '10%', animationDelay: '0s' }} />
          <div className="sparkle-effect" style={{ top: '60%', left: '80%', animationDelay: '0.5s' }} />
          <div className="sparkle-effect" style={{ top: '40%', left: '30%', animationDelay: '1s' }} />
          <div className="sparkle-effect" style={{ top: '80%', left: '60%', animationDelay: '1.5s' }} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="font-data70 text-6xl md:text-8xl text-desert-400 mb-6 animate-glow-pulse font-bold tracking-wider">
              welcome to shadow ranch
            </h1>
            <p className="font-deputy md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto text-[22px] font-medium">
              <TypewriterText 
                text="We know that someone has to write user privacy. Learn to write Solana Programs through gamified challenges. Cypherpunks write code. "
                speed={60}
                delay={1000}
              />
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Link href="/lessons">
                <WesternButton variant="primary" className="text-lg">
                  <i className="fas fa-play mr-2" />
                  Start Your Adventure
                </WesternButton>
              </Link>
              <Link href="/lessons">
                <WesternButton variant="secondary" className="text-lg">
                  <i className="fas fa-book mr-2" />
                  Browse Lessons
                </WesternButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-western text-4xl md:text-5xl text-sunset-400 mb-6">Why Choose Shadow Ranch?</h2>
            <p className="font-deputy text-lg text-gray-300 max-w-2xl mx-auto">
              Experience the most immersive way to learn blockchain development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <WesternCard className="p-6 hover:scale-105 transition-transform duration-200 animate-slide-up">
              <div className="text-center">
                <i className="fas fa-code text-4xl text-desert-400 mb-4" />
                <h3 className="font-deputy text-xl text-desert-400 mb-3">Interactive Coding</h3>
                <p className="text-gray-300 font-mono text-sm">
                  Learn by doing with our interactive code editor and real-time feedback system.
                </p>
              </div>
            </WesternCard>

            <WesternCard className="p-6 hover:scale-105 transition-transform duration-200 animate-slide-up">
              <div className="text-center">
                <i className="fas fa-gamepad text-4xl text-sage-400 mb-4" />
                <h3 className="font-deputy text-xl text-sage-400 mb-3">Gamified Learning</h3>
                <p className="text-gray-300 font-mono text-sm">
                  Build your virtual ranch, collect characters, and earn rewards as you progress.
                </p>
              </div>
            </WesternCard>

            <WesternCard className="p-6 hover:scale-105 transition-transform duration-200 animate-slide-up">
              <div className="text-center">
                <i className="fas fa-graduation-cap text-4xl text-sunset-400 mb-4" />
                <h3 className="font-deputy text-xl text-sunset-400 mb-3">Expert Curriculum</h3>
                <p className="text-gray-300 font-mono text-sm">Learn the principles crypto was built on through carefully crafted lessons and challenges.</p>
              </div>
            </WesternCard>
          </div>
        </div>
      </section>



      {/* Cypherpunk Blueprint Section */}
      <section className="py-16 bg-gray-900 text-white text-center rounded-xl mx-auto max-w-4xl mt-12 px-6">
        <h2 className="text-5xl font-extrabold mb-6">
          <DecryptedText
            text="The Cypherpunk Blueprint"
            animateOn="view"
            revealDirection="center"
            speed={100}
            sequential={true}
            characters="01!@#$%^&*()_+"
            className="text-indigo-400"
            parentClassName="block"
          />
        </h2>
        <p className="text-xl leading-relaxed text-gray-300">
          Don't just code; create movements. Learn the foundational ethos that drives meaningful software and redefine what's possible on the internet.
        </p>
      </section>
    </div>
  );
}
