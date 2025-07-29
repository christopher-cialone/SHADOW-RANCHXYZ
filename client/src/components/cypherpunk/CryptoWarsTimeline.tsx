import { TechCard } from "@/components/ui/TechCard";

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
  }
];

export function CryptoWarsTimeline() {
  return (
    <div className="relative">
      {/* Central Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-0.5 w-1 bg-gradient-to-b from-tech-cyan-400 via-tech-purple-400 to-tech-cyan-400" style={{ height: 'calc(100% - 8rem)' }}></div>
      
      <div className="space-y-16">
        {events.map((event, index) => (
          <div key={event.year} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
              <TechCard variant={index % 2 === 0 ? "cyan" : "purple"} className="relative">
                <div className="p-6">
                  {/* Classification Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 text-xs font-code rounded ${
                      event.classification === 'DECLASSIFIED' ? 'bg-green-900 text-green-400' :
                      event.classification === 'RESTRICTED' ? 'bg-yellow-900 text-yellow-400' :
                      'bg-red-900 text-red-400'
                    }`}>
                      {event.classification}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <span className={`text-3xl font-titulo ${index % 2 === 0 ? 'text-tech-cyan-400' : 'text-tech-purple-400'}`}>
                      {event.year}
                    </span>
                    <h3 className="font-tech text-lg text-white mt-2">{event.title}</h3>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{event.description}</p>
                  
                  <div className={`border-l-4 pl-4 ${index % 2 === 0 ? 'border-tech-cyan-400' : 'border-tech-purple-400'}`}>
                    <p className={`text-xs font-code ${index % 2 === 0 ? 'text-tech-cyan-400' : 'text-tech-purple-400'}`}>
                      IMPACT: {event.impact}
                    </p>
                  </div>
                </div>
              </TechCard>
            </div>
            
            {/* Central Timeline Node */}
            <div className={`w-8 h-8 rounded-full border-4 bg-gray-900 z-10 flex items-center justify-center ${
              index % 2 === 0 ? 'border-tech-cyan-400' : 'border-tech-purple-400'
            }`}>
              <div className={`w-3 h-3 rounded-full ${index % 2 === 0 ? 'bg-tech-cyan-400' : 'bg-tech-purple-400'}`}></div>
            </div>
            
            <div className="w-5/12"></div>
          </div>
        ))}
      </div>
      
      {/* Bottom decoration */}
      <div className="mt-32 text-center">
        <div className="inline-block bg-gray-800 px-6 py-2 rounded border border-tech-cyan-400/50">
          <span className="font-code text-tech-cyan-400 text-sm">END OF TIMELINE • CLASSIFICATION LEVEL: EYES ONLY</span>
        </div>
      </div>
    </div>
  );
}