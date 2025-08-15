import { motion } from "framer-motion";
import { TechCard } from "@/components/ui/TechCard";

interface RewardNft {
  id: string;
  lessonId: number;
  nftImageUrl: string;
  rewardName: string;
  awardedAt: Date;
}

interface RewardNftGalleryProps {
  rewards: RewardNft[];
}

export function RewardNftGallery({ rewards }: RewardNftGalleryProps) {
  if (rewards.length === 0) {
    return (
      <TechCard variant="purple" className="p-6 text-center">
        <div className="text-tech-cyan-400 text-4xl mb-4">🎁</div>
        <h3 className="font-space-gothic text-lg text-gray-300 mb-2">No NFT Rewards Yet</h3>
        <p className="font-code text-sm text-gray-500">
          Complete lesson challenges to earn collectible NFT rewards!
        </p>
      </TechCard>
    );
  }

  return (
    <TechCard variant="purple" className="p-6">
      <h3 className="font-space-gothic text-xl text-tech-cyan-400 mb-6 flex items-center">
        <span className="mr-2">🏆</span>
        NFT REWARD COLLECTION
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rewards.map((reward, index) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateY: 0,
              transition: { 
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut"
              }
            }}
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5,
              transition: { duration: 0.2 }
            }}
            className="relative group"
          >
            {/* Glow effect behind NFT */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.4, 0.2],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="absolute inset-0 bg-gradient-to-r from-tech-purple-500 to-tech-cyan-500 rounded-lg blur-md -z-10"
            />

            {/* NFT Container */}
            <div className="relative p-2 bg-gradient-to-br from-tech-purple-900/70 to-tech-cyan-900/70 rounded-lg border border-tech-cyan-400/30 backdrop-blur-sm group-hover:border-tech-cyan-400/60 transition-colors">
              <img
                src={reward.nftImageUrl}
                alt={reward.rewardName}
                className="w-full h-24 sm:h-32 object-contain rounded-md"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))'
                }}
              />
              
              {/* Reward Info */}
              <div className="mt-2">
                <div className="text-xs font-code text-tech-cyan-400 truncate">
                  {reward.rewardName}
                </div>
                <div className="text-xs font-code text-gray-500">
                  Lesson {reward.lessonId}
                </div>
                <div className="text-xs font-code text-gray-600">
                  {typeof reward.awardedAt === 'string' ? 
                    new Date(reward.awardedAt).toLocaleDateString() : 
                    reward.awardedAt.toLocaleDateString()}
                </div>
              </div>

              {/* Sparkle effects on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-tech-cyan-400 rounded-full"
                    style={{
                      top: `${20 + (i % 3) * 20}%`,
                      left: `${10 + (i % 2) * 70}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Collection Stats */}
      <div className="mt-6 pt-4 border-t border-tech-purple-600/30">
        <div className="flex justify-between items-center text-sm">
          <span className="font-code text-gray-400">Total Collected:</span>
          <span className="font-tech text-tech-cyan-400">{rewards.length} NFTs</span>
        </div>
        <div className="flex justify-between items-center text-sm mt-1">
          <span className="font-code text-gray-400">Latest Reward:</span>
          <span className="font-code text-gray-300">
            {rewards.length > 0 ? (
              typeof rewards[0].awardedAt === 'string' ? 
                new Date(rewards[0].awardedAt).toLocaleDateString() : 
                rewards[0].awardedAt.toLocaleDateString()
            ) : 'None'}
          </span>
        </div>
      </div>
    </TechCard>
  );
}