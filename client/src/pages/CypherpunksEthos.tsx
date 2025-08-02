import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { TechButton } from "@/components/ui/TechButton";
import { TechCard } from "@/components/ui/TechCard";
import { usePageLoader } from "@/hooks/use-page-loader";

interface Section {
  id: string;
  title: string;
  shortTitle: string;
  content: string;
  variant: "cyan" | "purple";
}

const sections: Section[] = [
  {
    id: "foundation",
    title: "A Foundation for Web3",
    shortTitle: "Foundation",
    variant: "cyan",
    content: "The term \"Cypherpunk\" describes a collective of activists who, in the late 1980s and early 1990s, advocated for the widespread use of strong cryptography and privacy-enhancing technologies as a means to achieve social and political change. They believed that privacy was essential for a free society in the digital age, fearing that government surveillance and corporate control over information would erode civil liberties. Their motto, \"Cypherpunks write code,\" emphasized the importance of building tools rather than merely talking about problems."
  },
  {
    id: "pioneers",
    title: "The Pioneers",
    shortTitle: "Pioneers",
    variant: "purple",
    content: "Prominent figures like Eric Hughes, Timothy C. May, and John Gilmore formed informal groups, communicating primarily through mailing lists where they discussed ideas ranging from digital cash to anonymous communication systems. They foresaw many of the challenges that later emerged with the rise of the internet, including data exploitation, mass surveillance, and centralized control. Their radical proposals for cryptographic solutions were often dismissed as fringe ideas at the time, but many have since become fundamental components of modern digital infrastructure."
  },
  {
    id: "web3-connection",
    title: "The Web3 Connection",
    shortTitle: "Web3 Connection",
    variant: "cyan",
    content: "The Cypherpunk movement's enduring legacy is deeply intertwined with the very genesis of Web3. Concepts like decentralization, censorship resistance, digital identity, and peer-to-peer networks—core tenets of blockchain technology and Web3—can be traced directly back to their early manifestos and experiments. Bitcoin, for instance, is often seen as the culmination of the Cypherpunks' vision for digital cash, providing a way for individuals to transact without intermediaries or centralized control."
  },
  {
    id: "building-future",
    title: "Building the Future",
    shortTitle: "Building Future",
    variant: "purple",
    content: "For Web3 builders today, understanding the Cypherpunk ethos isn't just a historical curiosity; it's a moral imperative. It reminds us that the primary goal isn't just about building new financial instruments or decentralized applications, but about fundamentally re-architecting the internet to empower users, protect privacy, and resist centralization. Embracing this original spirit means focusing on open-source, community-driven development, ensuring true user ownership of data and digital assets, and maintaining the decentralized principles that make Web3 transformative."
  }
];

export default function CypherpunksEthos() {
  usePageLoader();

  // State management
  const [activeSection, setActiveSection] = useState<string>("");
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Refs
  const videoRef = useRef<HTMLIFrameElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Intersection Observer for sticky navigation and active section tracking
  useEffect(() => {
    const observerOptions = {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) sectionObserver.observe(ref);
    });

    // Observer for sticky navigation visibility
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setShowStickyNav(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      heroObserver.observe(heroRef.current);
    }

    return () => {
      sectionObserver.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Video play handler
  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    if (videoRef.current) {
      // Replace src to start autoplay
      const currentSrc = videoRef.current.src;
      videoRef.current.src = currentSrc.replace('&autoplay=0', '&autoplay=1');
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Sticky Navigation */}
      <div className={`fixed top-16 left-0 right-0 z-40 transition-all duration-300 ${
        showStickyNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="bg-black/95 backdrop-blur-md border-b border-cyan-400/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-3">
              <span className="font-data70 text-cyan-400 text-sm hidden sm:block">
                CYPHERPUNK ETHOS
              </span>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`font-mono text-sm uppercase tracking-wider transition-colors px-3 py-2 rounded ${
                      activeSection === section.id
                        ? 'text-cyan-400 bg-cyan-400/10'
                        : 'text-gray-400 hover:text-cyan-400'
                    }`}
                  >
                    {section.shortTitle}
                  </button>
                ))}
              </nav>

              {/* Mobile Navigation - Horizontal Scroll */}
              <nav className="md:hidden flex items-center space-x-4 ethos-nav-scroll overflow-x-auto pb-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`font-mono text-xs uppercase tracking-wider transition-colors px-2 py-1 rounded whitespace-nowrap ${
                      activeSection === section.id
                        ? 'text-cyan-400 bg-cyan-400/10'
                        : 'text-gray-400 hover:text-cyan-400'
                    }`}
                  >
                    {section.shortTitle}
                  </button>
                ))}
              </nav>

              {/* Progress Indicator */}
              <div className="w-20 sm:w-32 bg-gray-700 rounded-full h-1 hidden sm:block">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-purple-400 h-1 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ethos-container">
        {/* Hero Section */}
        <div ref={heroRef} className="py-12 sm:py-20">
          {/* Header with back button */}
          <div className="mb-8 sm:mb-12">
            <Link href="/">
              <TechButton variant="secondary" className="mb-6">
                ← Back to Ranch
              </TechButton>
            </Link>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-cyan-400 font-data70 mb-4">
              the cypherpunk ethos
            </h1>
            <p className="text-center text-gray-400 font-mono text-sm sm:text-base">
              Understanding the philosophical foundation of Web3
            </p>
          </div>

          {/* Video Section */}
          <div className="relative aspect-video w-full mb-8 sm:mb-12 rounded-lg overflow-hidden shadow-xl border border-cyan-400/20 group">
            {!isVideoPlaying && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 cursor-pointer ethos-video-overlay transition-colors"
                   onClick={handleVideoPlay}>
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-cyan-500/20 border-2 border-cyan-400 rounded-full flex items-center justify-center hover:bg-cyan-500/30 ethos-play-button transition-all">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-cyan-400 font-mono text-sm">Click to play: The Cypherpunk Philosophy</p>
                </div>
              </div>
            )}
            
            <iframe
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/PYl9_1cBeVc?si=3-vOsKouvBAEp1mV&autoplay=0&loop=1&playlist=PYl9_1cBeVc&controls=1"
              title="The Cypherpunk Philosophy"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              onLoad={() => setVideoLoaded(true)}
            />
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 sm:space-y-12">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              ref={el => sectionRefs.current[section.id] = el as HTMLDivElement}
              className="scroll-mt-32"
            >
              <TechCard 
                variant={section.variant} 
                className={`transition-all duration-500 ${
                  activeSection === section.id 
                    ? 'ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-400/10' 
                    : ''
                }`}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-start space-x-4">
                    {/* Section Number */}
                    <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center font-data70 text-sm sm:text-base ${
                      section.variant === 'cyan' 
                        ? 'border-cyan-400 text-cyan-400' 
                        : 'border-purple-400 text-purple-400'
                    }`}>
                      {index + 1}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h2 className={`text-xl sm:text-2xl font-bold mb-4 font-data70 ${
                        section.variant === 'cyan' ? 'text-cyan-400' : 'text-purple-400'
                      }`}>
                        {section.title}
                      </h2>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-mono">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              </TechCard>
            </section>
          ))}
        </div>

        {/* Quote Section */}
        <div className="my-12 sm:my-16">
          <TechCard variant="cyan" className="text-center">
            <div className="p-6 sm:p-8 lg:p-12">
              <div className="max-w-3xl mx-auto">
                <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-400 mb-4 font-data70">
                  "Cypherpunks write code."
                </blockquote>
                <p className="text-gray-400 italic text-sm sm:text-base">
                  The foundation principle that drives our mission at Shadow Ranch
                </p>
              </div>
            </div>
          </TechCard>
        </div>

        {/* Call to Action */}
        <div className="text-center pb-12 sm:pb-20">
          <Link href="/lessons">
            <TechButton variant="accent" size="lg" className="group">
              <span className="mr-2 group-hover:scale-110 transition-transform">🚀</span>
              Start Your Cypherpunk Journey
            </TechButton>
          </Link>
          <p className="text-gray-400 font-mono text-xs sm:text-sm mt-4">
            Begin your transformation from observer to builder
          </p>
        </div>
      </div>


    </div>
  );
}