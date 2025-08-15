import { Link } from "wouter";
import { TechButton } from "@/components/ui/TechButton";
import { TechCard } from "@/components/ui/TechCard";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { useGameStore } from "@/hooks/use-game-store";
import { formatRanchCoin } from "@/lib/utils";
import { usePageLoader } from "@/hooks/use-page-loader";

export default function HomeMobile() {
  const { ranchData } = useGameStore();
  usePageLoader();

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Mobile-first Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center relative px-4">
        {/* Background sparkle effects - reduced for mobile */}
        <div className="absolute inset-0 opacity-20">
          <div className="sparkle-effect" style={{ top: '20%', left: '10%', animationDelay: '0s' }} />
          <div className="sparkle-effect" style={{ top: '60%', left: '80%', animationDelay: '1s' }} />
          <div className="sparkle-effect" style={{ top: '40%', left: '30%', animationDelay: '2s' }} />
        </div>
        
        <div className="text-center relative z-10 max-w-md sm:max-w-2xl mx-auto">
          <div className="animate-fade-in space-y-6 sm:space-y-8">
            <h1 className="font-space-gothic text-mobile-3xl sm:text-4xl md:text-6xl lg:text-8xl text-cyan-400 font-bold tracking-wider leading-tight">
              welcome to shadow ranch
            </h1>
            <p className="text-mobile-base sm:text-mobile-lg md:text-xl text-gray-300 leading-relaxed">
              <TypewriterText 
                text="Learn to write Solana Programs through gamified challenges. Cypherpunks write code."
                speed={60}
                delay={1000}
              />
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
              <Link href="/cypherpunks-ethos">
                <TechButton variant="primary" size="lg" className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 border-cyan-400 text-black font-bold">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Learn the Ethos
                </TechButton>
              </Link>
              <Link href="/lessons">
                <TechButton variant="secondary" size="lg" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 border-gray-600 text-cyan-400">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Start Coding
                </TechButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-optimized Features Section */}
      <section className="py-8 sm:py-12 lg:py-20">
        <div className="space-y-8 sm:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-space-gothic text-mobile-2xl sm:text-3xl md:text-4xl lg:text-5xl text-cyan-400">
              Why Choose Shadow Ranch?
            </h2>
            <p className="text-mobile-base sm:text-mobile-lg text-gray-300 max-w-xl mx-auto px-4">
              Experience the most immersive way to learn blockchain development
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <TechCard variant="cyan" className="hover:scale-105 transition-transform duration-200 animate-slide-up bg-gray-900/50 border-cyan-400/30">
              <div className="text-center space-y-4">
                <svg className="w-12 h-12 text-cyan-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <h3 className="font-mono text-mobile-xl text-cyan-400 font-bold">Interactive Coding</h3>
                <p className="text-gray-300 text-mobile-sm leading-relaxed">
                  Learn by doing with our interactive code editor and real-time feedback system.
                </p>
              </div>
            </TechCard>

            <TechCard variant="purple" className="hover:scale-105 transition-transform duration-200 animate-slide-up bg-gray-900/50 border-purple-400/30">
              <div className="text-center space-y-4">
                <svg className="w-12 h-12 text-purple-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 className="font-mono text-mobile-xl text-purple-400 font-bold">NFT Rewards</h3>
                <p className="text-gray-300 text-mobile-sm leading-relaxed">
                  Earn unique NFT certificates as you complete challenges and master new concepts.
                </p>
              </div>
            </TechCard>

            <TechCard variant="neutral" className="hover:scale-105 transition-transform duration-200 animate-slide-up sm:col-span-2 lg:col-span-1 bg-gray-900/50 border-gray-600/30">
              <div className="text-center space-y-4">
                <svg className="w-12 h-12 text-cyan-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <h3 className="font-mono text-mobile-xl text-cyan-400 font-bold">Gamified Learning</h3>
                <p className="text-gray-300 text-mobile-sm leading-relaxed">
                  Build your virtual ranch while mastering Solana development through engaging gameplay.
                </p>
              </div>
            </TechCard>
          </div>
        </div>
      </section>

      {/* Blueshift-style Stats Section */}
      {ranchData && (
        <section className="py-8 bg-gray-900/30 border border-cyan-400/20 rounded-xl mx-4 sm:mx-0">
          <div className="text-center space-y-6">
            <h2 className="font-space-gothic text-mobile-xl sm:text-2xl text-cyan-400">
              Your Progress
            </h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-mobile-2xl sm:text-3xl font-bold text-cyan-400">
                  {formatRanchCoin(ranchData.coins)}
                </div>
                <div className="text-mobile-sm text-gray-400 font-mono">Ranch Coins</div>
              </div>
              <div className="text-center">
                <div className="text-mobile-2xl sm:text-3xl font-bold text-purple-400">
                  {ranchData.experience}
                </div>
                <div className="text-mobile-sm text-gray-400 font-mono">Experience</div>
              </div>
              <div className="text-center">
                <div className="text-mobile-2xl sm:text-3xl font-bold text-cyan-300">
                  {ranchData.level}
                </div>
                <div className="text-mobile-sm text-gray-400 font-mono">Level</div>
              </div>
              <div className="text-center">
                <div className="text-mobile-2xl sm:text-3xl font-bold text-cyan-400">
                  {0}
                </div>
                <div className="text-mobile-sm text-gray-400 font-mono">Buildings</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blueshift-style CTA Section */}
      <section className="py-8 sm:py-12 text-center space-y-6">
        <h2 className="font-space-gothic text-mobile-2xl sm:text-3xl md:text-4xl text-cyan-400">
          Ready to Start Your Journey?
        </h2>
        <p className="text-mobile-base sm:text-mobile-lg text-gray-300 max-w-md mx-auto px-4">
          Join thousands of developers learning Solana development the fun way.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:justify-center">
          <Link href="/cypherpunks-ethos">
            <TechButton variant="primary" size="lg" className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 border-cyan-400 text-black font-bold">
              Begin Your Adventure
            </TechButton>
          </Link>
          <Link href="/wallet-test">
            <TechButton variant="secondary" size="lg" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 border-gray-600 text-cyan-400">
              Test Wallet Connection
            </TechButton>
          </Link>
        </div>
      </section>
    </div>
  );
}