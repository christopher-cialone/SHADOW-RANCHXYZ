import { Link } from "wouter";
import { ModernButton } from "@/components/ui/ModernButton";
import { ModernCard } from "@/components/ui/ModernCard";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { useGameStore } from "@/hooks/use-game-store";
import { formatRanchCoin } from "@/lib/utils";
import { usePageLoader } from "@/hooks/use-page-loader";

export default function ModernHome() {
  const { ranchData } = useGameStore();
  usePageLoader();

  const features = [
    {
      icon: "⚡",
      title: "Interactive Learning",
      description: "Master Solana development through hands-on coding challenges with real-time feedback and intelligent hints.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🎯",
      title: "Gamified Progress",
      description: "Earn XP, unlock achievements, and build your virtual ranch while learning cutting-edge blockchain technology.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "🏆",
      title: "NFT Rewards",
      description: "Collect unique NFT certificates as you complete milestones and showcase your expertise to the world.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: "🛡️",
      title: "Cypherpunk Ethos",
      description: "Learn the foundational principles of digital freedom and privacy that drive the decentralized web.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: "🔧",
      title: "Real-World Skills",
      description: "Build production-ready Solana programs using Rust, Anchor framework, and industry best practices.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: "🌐",
      title: "Community Driven",
      description: "Join a thriving community of developers, share knowledge, and collaborate on exciting projects.",
      gradient: "from-teal-500 to-blue-500"
    }
  ];

  const stats = [
    { label: "Active Learners", value: "2,500+", icon: "👥" },
    { label: "Completion Rate", value: "94%", icon: "📈" },
    { label: "NFTs Earned", value: "15,000+", icon: "🏆" },
    { label: "Programs Built", value: "8,500+", icon: "⚡" }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="section-container pt-32 pb-20">
        <div className="text-center max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-hero">
                Master Solana Development
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                <TypewriterText 
                  text="Transform from curious beginner to blockchain expert through our immersive, gamified learning platform. Build real Solana programs while earning NFT rewards."
                  speed={50}
                  delay={500}
                />
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link href="/cypherpunks-ethos">
                <ModernButton variant="primary" size="xl" className="w-full sm:w-auto">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Start Your Journey
                </ModernButton>
              </Link>
              <Link href="/lessons">
                <ModernButton variant="outline" size="xl" className="w-full sm:w-auto">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  View Lessons
                </ModernButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Why Choose Shadow Ranch?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the most comprehensive and engaging way to master Solana blockchain development
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <ModernCard 
              key={index} 
              variant="default" 
              size="lg" 
              hover="both"
              className="feature-card group"
            >
              <div className="feature-icon group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </ModernCard>
          ))}
        </div>
      </section>

      {/* Personal Progress Section */}
      {ranchData && (
        <section className="section-container">
          <ModernCard variant="primary" size="lg" className="text-center">
            <h2 className="text-3xl font-bold text-gradient mb-8">Your Progress</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {formatRanchCoin(ranchData.coins)}
                </div>
                <div className="text-sm text-muted-foreground">Ranch Coins</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">
                  {ranchData.experience}
                </div>
                <div className="text-sm text-muted-foreground">Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">
                  {ranchData.level}
                </div>
                <div className="text-sm text-muted-foreground">Level</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {ranchData.buildings?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Buildings</div>
              </div>
            </div>
          </ModernCard>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-container">
        <ModernCard variant="secondary" size="xl" className="text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient">
              Ready to Build the Future?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of developers who are mastering Solana development through our innovative, 
              gamified learning experience. Start your journey today and earn NFT certificates along the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cypherpunks-ethos">
                <ModernButton variant="primary" size="lg" className="w-full sm:w-auto">
                  Begin Your Adventure
                </ModernButton>
              </Link>
              <Link href="/wallet-test">
                <ModernButton variant="outline" size="lg" className="w-full sm:w-auto">
                  Test Wallet Connection
                </ModernButton>
              </Link>
            </div>
          </div>
        </ModernCard>
      </section>
    </div>
  );
}