import { Link } from "wouter";
import { WesternButton } from "@/components/ui/WesternButton";
import { usePageLoader } from "@/hooks/use-page-loader";

export default function CypherpunksEthos() {
  usePageLoader(); // This will handle the loading state automatically

  return (
    <div className="min-h-screen bg-gradient-to-br from-tech-purple-900 via-slate-900 to-tech-cyan-900 text-gray-100 p-8 md:p-12 lg:p-16">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8">
          <Link href="/">
            <WesternButton variant="outline" className="mb-6">
              ← Back to Ranch
            </WesternButton>
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-tech-cyan-400 to-tech-purple-400 bg-clip-text text-transparent font-data70">
            the cypherpunk ethos
          </h1>
        </div>

        {/* Embedded YouTube Video */}
        <div className="relative aspect-video w-full mb-12 rounded-lg overflow-hidden shadow-xl border border-tech-cyan-600/20">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/PYl9_1cBeVc?si=3-vOsKouvBAEp1mV&autoplay=1&loop=1&playlist=PYl9_1cBeVc"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        {/* Cypherpunk Ethos Text Content */}
        <div className="text-lg leading-relaxed space-y-6 text-gray-300 font-mono">
          <div className="border-l-4 border-tech-cyan-400 pl-6 bg-tech-purple-900/20 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-tech-cyan-400 mb-4 font-data70">A Foundation for Web3</h2>
            <p>
              The term "Cypherpunk" describes a collective of activists who, in the late 1980s and early 1990s, advocated for the widespread use of strong cryptography and privacy-enhancing technologies as a means to achieve social and political change. They believed that privacy was essential for a free society in the digital age, fearing that government surveillance and corporate control over information would erode civil liberties. Their motto, "Cypherpunks write code," emphasized the importance of building tools rather than merely talking about problems.
            </p>
          </div>

          <div className="border-l-4 border-tech-purple-400 pl-6 bg-tech-cyan-900/20 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-tech-purple-400 mb-4 font-data70">The Pioneers</h2>
            <p>
              Prominent figures like Eric Hughes, Timothy C. May, and John Gilmore formed informal groups, communicating primarily through mailing lists where they discussed ideas ranging from digital cash to anonymous communication systems. They foresaw many of the challenges that later emerged with the rise of the internet, including data exploitation, mass surveillance, and centralized control. Their radical proposals for cryptographic solutions were often dismissed as fringe ideas at the time, but many have since become fundamental components of modern digital infrastructure.
            </p>
          </div>

          <div className="border-l-4 border-tech-cyan-400 pl-6 bg-tech-purple-900/20 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-tech-cyan-400 mb-4 font-data70">The Web3 Connection</h2>
            <p>
              The Cypherpunk movement's enduring legacy is deeply intertwined with the very genesis of Web3. Concepts like decentralization, censorship resistance, digital identity, and peer-to-peer networks—core tenets of blockchain technology and Web3—can be traced directly back to their early manifestos and experiments. Bitcoin, for instance, is often seen as the culmination of the Cypherpunks' vision for digital cash, providing a way for individuals to transact without intermediaries or centralized control.
            </p>
          </div>

          <div className="border-l-4 border-tech-purple-400 pl-6 bg-tech-cyan-900/20 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-tech-purple-400 mb-4 font-data70">Building the Future</h2>
            <p>
              For Web3 builders today, understanding the Cypherpunk ethos isn't just a historical curiosity; it's a moral imperative. It reminds us that the primary goal isn't just about building new financial instruments or decentralized applications, but about fundamentally re-architecting the internet to empower users, protect privacy, and resist centralization. Embracing this original spirit means focusing on open-source, community-driven development, ensuring true user ownership of data and digital assets, and maintaining the decentralized principles that make Web3 transformative.
            </p>
          </div>

          <div className="text-center mt-12 p-8 bg-gradient-to-r from-tech-purple-900/50 to-tech-cyan-900/50 rounded-lg border border-tech-cyan-600/20">
            <blockquote className="text-2xl font-bold text-tech-cyan-400 mb-4 font-data70">
              "Cypherpunks write code."
            </blockquote>
            <p className="text-gray-400 italic">
              The foundation principle that drives our mission at Shadow Ranch
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link href="/lessons">
            <WesternButton size="lg" className="bg-gradient-to-r from-tech-cyan-600 to-tech-purple-600 hover:from-tech-cyan-500 hover:to-tech-purple-500">
              Start Your Cypherpunk Journey
            </WesternButton>
          </Link>
        </div>
      </div>
    </div>
  );
}