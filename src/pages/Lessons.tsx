import { TechCard } from "@/components/ui/TechCard";

export default function Lessons() {
  return (
    <div className="min-h-screen p-6 bg-black">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="font-space-gothic text-4xl md:text-5xl text-tech-cyan-400 mb-4">
            SOLANA LESSONS
          </h1>
          <p className="font-code text-gray-300 text-lg">
            Master Solana development through hands-on coding challenges
          </p>
        </div>

        <TechCard variant="cyan" className="p-8 text-center">
          <p className="text-white text-xl">
            Welcome to Shadow Ranch - Your Solana Adventure Begins Here!
          </p>
          <p className="text-gray-300 mt-4">
            🎉 The wallet standard integration has been successfully completed!
          </p>
        </TechCard>
      </div>
    </div>
  );
}