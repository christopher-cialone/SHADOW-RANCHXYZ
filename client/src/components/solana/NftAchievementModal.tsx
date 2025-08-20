import { motion, AnimatePresence } from "framer-motion";
import { TechButton } from "@/components/ui/TechButton";
import { TechCard } from "@/components/ui/TechCard";

interface NftAchievementModalProps {
  isVisible: boolean;
  badge: string;
  challengeTitle: string;
  onContinue: () => void;
  onClose: () => void;
}

export function NftAchievementModal({ 
  isVisible, 
  badge, 
  challengeTitle, 
  onContinue, 
  onClose 
}: NftAchievementModalProps) {
  const getBadgeEmoji = (badge: string) => {
    switch (badge) {
      case "The Architect": return "🏗️";
      case "First Contact": return "🤝";
      case "State Keeper": return "💾";
      case "Chain Writer": return "⛓️";
      case "State Modifier": return "✏️";
      case "Gatekeeper": return "🔐";
      case "Master of Puppets": return "🎭";
      case "The Composer": return "🎼";
      case "Toll Collector": return "💰";
      case "The Debugger": return "🐛";
      default: return "🏆";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            className="max-w-md w-full mx-4"
          >
            <TechCard variant="cyan" className="overflow-hidden">
              <div className="relative p-8 text-center">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
                
                {/* Celebration particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                      initial={{ 
                        x: "50%", 
                        y: "50%", 
                        opacity: 0,
                        scale: 0
                      }}
                      animate={{
                        x: `${Math.random() * 100}%`,
                        y: `${Math.random() * 100}%`,
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-6xl mb-4"
                  >
                    {getBadgeEmoji(badge)}
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="font-space-gothic text-2xl text-cyan-400 mb-2"
                  >
                    ACHIEVEMENT UNLOCKED!
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-lg mb-4 inline-block"
                  >
                    <div className="font-tech text-lg font-bold">
                      "{badge}" BADGE
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-gray-300 mb-6 font-code"
                  >
                    You have successfully completed:<br />
                    <span className="text-cyan-400 font-bold">{challengeTitle}</span>
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="space-y-3"
                  >
                    <TechButton
                      variant="primary"
                      onClick={onContinue}
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0"
                    >
                      <span className="mr-2">🚀</span>
                      CONTINUE TO NEXT CHALLENGE
                    </TechButton>
                    
                    <TechButton
                      variant="secondary"
                      onClick={onClose}
                      className="w-full bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800"
                    >
                      VIEW BADGE COLLECTION
                    </TechButton>
                  </motion.div>
                </div>
              </div>
            </TechCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}