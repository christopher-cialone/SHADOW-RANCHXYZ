import { useState, useEffect, useRef } from "react";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  impact: string;
  classification: string;
}

const events: TimelineEvent[] = [
  {
    year: "1976",
    title: "Public Key Cryptography Discovered",
    description: "Whitfield Diffie and Martin Hellman publish 'New Directions in Cryptography', introducing the concept of public-key cryptography. This breakthrough allows secure communication without sharing secret keys.",
    impact: "Foundation for all modern secure communications",
    classification: "DECLASSIFIED"
  },
  {
    year: "1991", 
    title: "PGP Released to the World",
    description: "Phil Zimmermann releases Pretty Good Privacy (PGP), making military-grade encryption available to civilians. The US government considers this a violation of arms export restrictions.",
    impact: "Democratized encryption for the masses",
    classification: "RESTRICTED"
  },
  {
    year: "1993",
    title: "The Clipper Chip Controversy",
    description: "The US government proposes the Clipper Chip—an encryption device with a government backdoor. Cypherpunks rally against this attempt to weaken privacy, ultimately defeating the proposal.",
    impact: "Established precedent against government backdoors",
    classification: "TOP SECRET"
  },
  {
    year: "1995",
    title: "SSL Protocol Introduced",
    description: "Netscape introduces Secure Sockets Layer (SSL), bringing cryptographic security to web browsing. This protocol becomes the foundation for HTTPS and secure e-commerce.",
    impact: "Enabled secure web commerce and communications",
    classification: "DECLASSIFIED"
  },
  {
    year: "2001",
    title: "Advanced Encryption Standard (AES)",
    description: "The US government adopts AES as the official encryption standard, replacing DES. This cipher, originally called Rijndael, becomes the worldwide standard for symmetric encryption.",
    impact: "Standardized modern encryption globally",
    classification: "DECLASSIFIED"
  }
];

interface CryptoWarsTimelineProps {
  onComplete?: () => void;
}

export function CryptoWarsTimeline({ onComplete }: CryptoWarsTimelineProps) {
  // State for automated progression
  const [currentEventIndex, setCurrentEventIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  
  // Refs for scroll management
  const timelineRef = useRef<HTMLDivElement>(null);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-progression timing (3 seconds per event)
  const PROGRESSION_DELAY = 3000;

  // Initialize event refs array
  useEffect(() => {
    eventRefs.current = eventRefs.current.slice(0, events.length);
  }, []);

  // Automated progression logic
  useEffect(() => {
    if (isPlaying && hasStarted) {
      intervalRef.current = setInterval(() => {
        setCurrentEventIndex(prev => {
          const nextIndex = prev + 1;
          if (nextIndex >= events.length) {
            setIsPlaying(false);
            setIsComplete(true);
            return prev;
          }
          return nextIndex;
        });
      }, PROGRESSION_DELAY);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, hasStarted]);

  // Update visible events and scroll when current event changes
  useEffect(() => {
    if (currentEventIndex >= 0) {
      setVisibleEvents(prev => {
        if (!prev.includes(currentEventIndex)) {
          return [...prev, currentEventIndex];
        }
        return prev;
      });

      // Scroll to current event (with delay for animation)
      setTimeout(() => {
        const eventElement = eventRefs.current[currentEventIndex];
        if (eventElement && timelineRef.current) {
          eventElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
        }
      }, 200);
    }
  }, [currentEventIndex]);

  // Control functions
  const startProgression = () => {
    setHasStarted(true);
    setIsPlaying(true);
    if (currentEventIndex === -1) {
      setCurrentEventIndex(0);
    }
  };

  const pauseProgression = () => {
    setIsPlaying(false);
  };

  const goToNextEvent = () => {
    if (currentEventIndex < events.length - 1) {
      setCurrentEventIndex(prev => prev + 1);
    } else if (currentEventIndex === events.length - 1) {
      setIsComplete(true);
    }
  };

  const goToPreviousEvent = () => {
    if (currentEventIndex > 0) {
      setCurrentEventIndex(prev => prev - 1);
    }
  };

  const resetTimeline = () => {
    setCurrentEventIndex(-1);
    setVisibleEvents([]);
    setIsPlaying(false);
    setHasStarted(false);
    setIsComplete(false);
    if (timelineRef.current) {
      timelineRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Control Panel */}
      <div className="sticky top-4 z-30 mb-8">
        <TechCard variant="cyan" className="bg-black/90 backdrop-blur-sm border-cyan-400/50">
          <div className="p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Progress Indicator */}
              <div className="flex items-center space-x-4">
                <span className="font-code text-cyan-400 text-sm">
                  CLASSIFIED INTEL: {currentEventIndex + 1} / {events.length}
                </span>
                <div className="w-32 sm:w-48 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentEventIndex + 1) / events.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center space-x-2 timeline-controls">
                {!hasStarted ? (
                  <TechButton variant="accent" size="sm" onClick={startProgression}>
                    <span className="mr-2">▶</span>
                    START INTEL BRIEFING
                  </TechButton>
                ) : (
                  <>
                    <TechButton 
                      variant="secondary" 
                      size="sm" 
                      onClick={goToPreviousEvent}
                      disabled={currentEventIndex <= 0}
                    >
                      <span>←</span>
                    </TechButton>

                    <TechButton 
                      variant="primary" 
                      size="sm" 
                      onClick={isPlaying ? pauseProgression : startProgression}
                    >
                      <span className="mr-2">{isPlaying ? '⏸' : '▶'}</span>
                      {isPlaying ? 'PAUSE' : 'PLAY'}
                    </TechButton>

                    <TechButton 
                      variant="secondary" 
                      size="sm" 
                      onClick={goToNextEvent}
                      disabled={currentEventIndex >= events.length - 1}
                    >
                      <span>→</span>
                    </TechButton>

                    <TechButton 
                      variant="secondary" 
                      size="sm" 
                      onClick={resetTimeline}
                    >
                      <span className="mr-2">↻</span>
                      RESET
                    </TechButton>
                  </>
                )}
              </div>
            </div>
          </div>
        </TechCard>
      </div>

      {/* Timeline Container */}
      <div ref={timelineRef} className="relative min-h-screen">
        {/* Central Timeline Line - Responsive */}
        <div className="absolute left-4 sm:left-1/2 sm:transform sm:-translate-x-0.5 w-1 bg-gradient-to-b from-cyan-400 via-purple-400 to-cyan-400 opacity-50" 
             style={{ height: 'calc(100% - 8rem)' }}>
        </div>
        
        {/* Timeline Events */}
        <div className="space-y-8 sm:space-y-16 timeline-mobile-cards sm:pl-0">
          {events.map((event, index) => {
            const isVisible = visibleEvents.includes(index);
            const isActive = currentEventIndex === index;
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
            
            return (
              <div 
                key={event.year}
                ref={el => eventRefs.current[index] = el}
                className={`relative transition-all duration-1000 ${
                  isVisible 
                    ? 'opacity-100 transform translate-y-0 timeline-reveal' 
                    : 'opacity-0 transform translate-y-8'
                } ${
                  isMobile 
                    ? 'flex flex-col' 
                    : `flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`
                }`}
              >
                {/* Event Card - Mobile: Full width, Desktop: Alternating sides */}
                <div className={`${
                  isMobile 
                    ? 'w-full' 
                    : `w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`
                }`}>
                  <TechCard 
                    variant={index % 2 === 0 ? "cyan" : "purple"} 
                    className={`relative transition-all duration-500 ${
                      isActive ? 'ring-2 ring-cyan-400 shadow-lg shadow-cyan-400/20 scale-105' : ''
                    }`}
                  >
                    <div className="p-4 sm:p-6">
                      {/* Classification Badge */}
                      <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                        <span className={`px-2 py-1 text-xs font-code rounded ${
                          event.classification === 'DECLASSIFIED' ? 'bg-green-900 text-green-400' :
                          event.classification === 'RESTRICTED' ? 'bg-yellow-900 text-yellow-400' :
                          'bg-red-900 text-red-400'
                        } ${isActive ? 'animate-pulse' : ''}`}>
                          {event.classification}
                        </span>
                      </div>
                      
                      {/* Event Header */}
                      <div className="mb-4">
                        <span className={`text-2xl sm:text-3xl font-titulo ${
                          index % 2 === 0 ? 'text-cyan-400' : 'text-purple-400'
                        } ${isActive ? 'animate-pulse' : ''}`}>
                          {event.year}
                        </span>
                        <h3 className="font-tech text-base sm:text-lg text-white mt-2 leading-tight">
                          {event.title}
                        </h3>
                      </div>
                      
                      {/* Event Description */}
                      <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
                        {event.description}
                      </p>
                      
                      {/* Impact Section */}
                      <div className={`border-l-4 pl-4 ${
                        index % 2 === 0 ? 'border-cyan-400' : 'border-purple-400'
                      }`}>
                        <p className={`text-xs sm:text-sm font-code ${
                          index % 2 === 0 ? 'text-cyan-400' : 'text-purple-400'
                        }`}>
                          IMPACT: {event.impact}
                        </p>
                      </div>

                      {/* Active Event Indicator */}
                      {isActive && (
                        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 border-2 border-cyan-400 rounded-lg animate-pulse pointer-events-none"></div>
                      )}
                    </div>
                  </TechCard>
                </div>
                
                {/* Central Timeline Node - Hidden on mobile */}
                {!isMobile && (
                  <div className={`w-8 h-8 rounded-full border-4 bg-gray-900 z-10 flex items-center justify-center transition-all duration-500 ${
                    index % 2 === 0 ? 'border-cyan-400' : 'border-purple-400'
                  } ${isActive ? 'scale-125 shadow-lg' : ''} ${
                    isVisible ? 'animate-pulse' : ''
                  }`}>
                    <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      index % 2 === 0 ? 'bg-cyan-400' : 'bg-purple-400'
                    } ${isActive ? 'scale-150' : ''}`}></div>
                  </div>
                )}
                
                {/* Spacer for desktop layout */}
                {!isMobile && <div className="w-5/12"></div>}

                {/* Mobile Timeline Node */}
                {isMobile && (
                  <div className={`absolute -left-8 top-8 w-6 h-6 rounded-full border-2 bg-gray-900 z-10 flex items-center justify-center transition-all duration-500 ${
                    index % 2 === 0 ? 'border-cyan-400' : 'border-purple-400'
                  } ${isActive ? 'scale-125 shadow-lg' : ''} ${
                    isVisible ? 'animate-pulse' : ''
                  }`}>
                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      index % 2 === 0 ? 'bg-cyan-400' : 'bg-purple-400'
                    } ${isActive ? 'scale-150' : ''}`}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Timeline End Decoration */}
        {isComplete && (
          <div className="mt-16 sm:mt-32 text-center timeline-fade-in">
            <div className="inline-block bg-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded border border-cyan-400/50 mb-8">
              <span className="font-code text-cyan-400 text-xs sm:text-sm">
                END OF TIMELINE • CLASSIFICATION LEVEL: EYES ONLY
              </span>
            </div>
            
            {onComplete && (
              <div className="animate-bounce">
                <TechButton variant="accent" size="lg" onClick={onComplete}>
                  <span className="mr-2">🚀</span>
                  PROCEED TO CHAPTER 2
                </TechButton>
              </div>
            )}
          </div>
        )}
      </div>


    </div>
  );
}