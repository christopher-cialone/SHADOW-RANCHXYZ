import { Link } from "wouter";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";
import { lessons } from "@/data/lessons";
import { usePageLoader } from "@/hooks/use-page-loader";

export default function Lessons() {
  usePageLoader();

  // Filter lessons by track
  const cypherpunkLessons = lessons.filter(lesson => lesson.track === 'cypherpunk');
  const solanaEthosLessons = lessons.filter(lesson => lesson.track === 'solana-ethos');
  const solanaCodeLessons = lessons.filter(lesson => lesson.track === 'solana-code');

  return (
    <div className="min-h-screen p-6 bg-black">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-space-gothic text-4xl md:text-5xl text-cyan-400 mb-4">
            SHADOW RANCH LESSONS
          </h1>
          <p className="font-code text-gray-300 text-lg">
            Master blockchain development through gamified learning paths
          </p>
        </div>

        {/* Success Message */}
        <TechCard variant="cyan" className="mb-8 text-center">
          <p className="text-cyan-400 text-lg font-bold mb-2">
            🎉 Wallet Standard Integration Complete!
          </p>
          <p className="text-gray-300">
            Your Shadow Ranch adventure is now fully connected to the Solana blockchain.
          </p>
        </TechCard>

        {/* Learning Tracks */}
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* Cypherpunk Track */}
          <TechCard variant="purple" className="p-8">
            <div className="text-center mb-6">
              <h2 className="font-space-gothic text-2xl md:text-3xl text-purple-400 mb-4">
                🛡️ CYPHERPUNK LEGACY
              </h2>
              <p className="text-gray-300 mb-6">
                Learn the philosophical foundations of decentralization and digital freedom
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <Link href="/cypherpunks-ethos">
                <TechButton variant="outline" className="w-full text-left justify-start border-purple-400/60 text-purple-400 hover:bg-purple-400/10">
                  <span className="mr-3">📖</span>
                  <div>
                    <div className="font-bold">Cypherpunks Ethos</div>
                    <div className="text-sm opacity-80">Foundation & Philosophy</div>
                  </div>
                </TechButton>
              </Link>
              
              <Link href="/cypherpunk-module-1">
                <TechButton variant="outline" className="w-full text-left justify-start border-purple-400/60 text-purple-400 hover:bg-purple-400/10">
                  <span className="mr-3">⚡</span>
                  <div>
                    <div className="font-bold">Module 1: The Genesis Archive</div>
                    <div className="text-sm opacity-80">Digital Freedom Origins</div>
                  </div>
                </TechButton>
              </Link>
              
              <Link href="/cypherpunk-module-2">
                <TechButton variant="outline" className="w-full text-left justify-start border-purple-400/60 text-purple-400 hover:bg-purple-400/10">
                  <span className="mr-3">🔒</span>
                  <div>
                    <div className="font-bold">Module 2: Crypto Wars</div>
                    <div className="text-sm opacity-80">The Battle for Encryption</div>
                  </div>
                </TechButton>
              </Link>
              
              <Link href="/cypherpunk-module-3">
                <TechButton variant="outline" className="w-full text-left justify-start border-purple-400/60 text-purple-400 hover:bg-purple-400/10">
                  <span className="mr-3">💰</span>
                  <div>
                    <div className="font-bold">Module 3: Digital Cash</div>
                    <div className="text-sm opacity-80">From Cypherpunk to Bitcoin</div>
                  </div>
                </TechButton>
              </Link>
              
              <Link href="/cypherpunk-module-4">
                <TechButton variant="outline" className="w-full text-left justify-start border-purple-400/60 text-purple-400 hover:bg-purple-400/10">
                  <span className="mr-3">🌐</span>
                  <div>
                    <div className="font-bold">Module 4: Legacy</div>
                    <div className="text-sm opacity-80">The Future of Decentralization</div>
                  </div>
                </TechButton>
              </Link>
            </div>

            <div className="text-center">
              <Link href="/cypherpunks-ethos">
                <TechButton variant="primary" className="bg-purple-600 hover:bg-purple-500 border-purple-500">
                  Start Cypherpunk Journey
                </TechButton>
              </Link>
            </div>
          </TechCard>

          {/* Solana Development Track */}
          <TechCard variant="cyan" className="p-8">
            <div className="text-center mb-6">
              <h2 className="font-space-gothic text-2xl md:text-3xl text-cyan-400 mb-4">
                ⚙️ SOLANA MASTERY
              </h2>
              <p className="text-gray-300 mb-6">
                Build real Solana programs through hands-on coding challenges
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {solanaCodeLessons.length > 0 ? (
                solanaCodeLessons.slice(0, 4).map((lesson) => (
                  <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
                    <TechButton variant="outline" className="w-full text-left justify-start border-cyan-400/60 text-cyan-400 hover:bg-cyan-400/10">
                      <span className="mr-3">🔧</span>
                      <div>
                        <div className="font-bold">{lesson.title}</div>
                        <div className="text-sm opacity-80">Hands-on Coding</div>
                      </div>
                    </TechButton>
                  </Link>
                ))
              ) : (
                <>
                  <TechButton variant="outline" className="w-full text-left justify-start border-cyan-400/60 text-cyan-400 hover:bg-cyan-400/10">
                    <span className="mr-3">🦀</span>
                    <div>
                      <div className="font-bold">Rust Fundamentals</div>
                      <div className="text-sm opacity-80">Language Basics</div>
                    </div>
                  </TechButton>
                  
                  <TechButton variant="outline" className="w-full text-left justify-start border-cyan-400/60 text-cyan-400 hover:bg-cyan-400/10">
                    <span className="mr-3">⚓</span>
                    <div>
                      <div className="font-bold">Anchor Framework</div>
                      <div className="text-sm opacity-80">Smart Contract Development</div>
                    </div>
                  </TechButton>
                  
                  <TechButton variant="outline" className="w-full text-left justify-start border-cyan-400/60 text-cyan-400 hover:bg-cyan-400/10">
                    <span className="mr-3">💎</span>
                    <div>
                      <div className="font-bold">NFT Minting</div>
                      <div className="text-sm opacity-80">Digital Assets</div>
                    </div>
                  </TechButton>
                  
                  <TechButton variant="outline" className="w-full text-left justify-start border-cyan-400/60 text-cyan-400 hover:bg-cyan-400/10">
                    <span className="mr-3">🏪</span>
                    <div>
                      <div className="font-bold">DeFi Programs</div>
                      <div className="text-sm opacity-80">Advanced Concepts</div>
                    </div>
                  </TechButton>
                </>
              )}
            </div>

            <div className="text-center">
              <Link href="/solana-challenges">
                <TechButton variant="primary" className="bg-cyan-600 hover:bg-cyan-500 border-cyan-500">
                  Start Coding Challenges
                </TechButton>
              </Link>
            </div>
          </TechCard>
          
        </div>

        {/* Additional Resources */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <TechCard variant="neutral" className="p-6 text-center">
            <h3 className="font-space-gothic text-xl text-cyan-400 mb-3">🎯 Your Progress</h3>
            <p className="text-gray-300 text-sm mb-4">
              Track your learning journey across both paths
            </p>
            <Link href="/profile">
              <TechButton variant="outline" size="sm">View Profile</TechButton>
            </Link>
          </TechCard>
          
          <TechCard variant="neutral" className="p-6 text-center">
            <h3 className="font-space-gothic text-xl text-purple-400 mb-3">🗺️ Mindmap</h3>
            <p className="text-gray-300 text-sm mb-4">
              Explore interconnected blockchain concepts
            </p>
            <Link href="/mindmap">
              <TechButton variant="outline" size="sm">Explore Map</TechButton>
            </Link>
          </TechCard>
          
          <TechCard variant="neutral" className="p-6 text-center">
            <h3 className="font-space-gothic text-xl text-cyan-400 mb-3">🏠 Your Ranch</h3>
            <p className="text-gray-300 text-sm mb-4">
              Build and customize your virtual homestead
            </p>
            <Link href="/ranch">
              <TechButton variant="outline" size="sm">Visit Ranch</TechButton>
            </Link>
          </TechCard>
        </div>
      </div>
    </div>
  );
}