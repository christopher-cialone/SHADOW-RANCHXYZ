import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ChallengeRewardProps {
  isVisible: boolean;
  nftImageUrl: string | null;
}

export function ChallengeReward({ isVisible, nftImageUrl }: ChallengeRewardProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowContent(true);
      // Auto-hide after 4 seconds
      const timer = setTimeout(() => {
        setShowContent(false);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      {/* Background overlay with matrix effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`
        }}
      />

      {/* Matrix digital rain effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-tech-cyan-400 to-transparent"
            style={{
              left: `${(i * 5) % 100}%`,
              height: '100vh',
            }}
            initial={{ y: '-100vh', opacity: 0 }}
            animate={{ 
              y: '100vh', 
              opacity: [0, 1, 0],
              transition: {
                duration: 2 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'linear'
              }
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* "CORRECT" Text with Matrix Effect */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotateX: 0,
            transition: {
              duration: 0.6,
              ease: "easeOut",
              type: "spring",
              stiffness: 100
            }
          }}
          className="text-8xl font-titulo text-tech-cyan-400 text-shadow-matrix-glow mb-8 select-none"
          style={{
            fontWeight: 900,
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}
        >
          CORRECT
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.3, duration: 0.4 }
          }}
          className="text-center mb-8"
        >
          <div className="text-tech-purple-400 font-code text-lg tracking-wider">
            CHALLENGE COMPLETED
          </div>
          <div className="text-gray-400 font-code text-sm mt-1">
            REWARD UNLOCKED
          </div>
        </motion.div>

        {/* NFT Image with Advanced Animation */}
        {nftImageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8, rotateY: -180 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              rotateY: 0,
              transition: { 
                delay: 0.5, 
                duration: 0.8, 
                ease: "easeOut",
                type: "spring",
                stiffness: 80
              }
            }}
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5,
              transition: { duration: 0.2 }
            }}
            className="relative"
          >
            {/* Glow effect behind NFT */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="absolute inset-0 bg-gradient-to-r from-tech-purple-500 to-tech-cyan-500 rounded-2xl blur-xl -z-10"
            />

            {/* NFT Container */}
            <div className="relative p-4 bg-gradient-to-br from-tech-purple-900/50 to-tech-cyan-900/50 rounded-2xl border-2 border-tech-cyan-400/30 backdrop-blur-sm">
              <img
                src={nftImageUrl}
                alt="Challenge Reward NFT"
                className="w-64 h-64 object-contain rounded-xl"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.4))'
                }}
              />
            </div>

            {/* Sparkle effects around NFT */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-tech-cyan-400 rounded-full"
                style={{
                  top: `${20 + (i % 4) * 20}%`,
                  left: `${10 + (i % 3) * 30}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { delay: 1.2, duration: 0.5 }
          }}
          className="mt-8 text-center"
        >
          <div className="text-tech-cyan-400 font-code text-sm tracking-wider">
            + NFT REWARD ADDED TO COLLECTION
          </div>
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="text-gray-500 font-code text-xs mt-2"
          >
            Continue to next challenge...
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}