import { motion, AnimatePresence } from "framer-motion";
import { TechButton } from "@/components/ui/TechButton";
import { TechCard } from "@/components/ui/TechCard";
import { UploadedMetadata } from "@/lib/mockUploader";

interface NftAchievementModalProps {
  isVisible: boolean;
  badge: string;
  challengeTitle: string;
  onContinue: () => void;
  onClose: () => void;
  // New NFT-related props
  nftMetadata?: UploadedMetadata;
  transactionSignature?: string;
  isWalletConnected?: boolean;
  isMinting?: boolean;
}

export function NftAchievementModal({ 
  isVisible, 
  badge, 
  challengeTitle, 
  onContinue, 
  onClose,
  nftMetadata,
  transactionSignature,
  isWalletConnected = false,
  isMinting = false
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

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "The Architect": return "from-green-500 to-green-600";
      case "First Contact": return "from-cyan-500 to-blue-500";
      case "State Keeper": return "from-orange-500 to-red-500";
      case "Chain Writer": return "from-yellow-500 to-orange-500";
      case "State Modifier": return "from-pink-500 to-purple-500";
      case "Gatekeeper": return "from-emerald-500 to-green-500";
      case "Master of Puppets": return "from-purple-600 to-purple-800";
      case "The Composer": return "from-orange-500 to-red-500";
      case "Toll Collector": return "from-yellow-400 to-yellow-600";
      case "The Debugger": return "from-red-500 to-pink-500";
      default: return "from-purple-600 to-cyan-600";
    }
  };

  const getSolanaExplorerUrl = (signature: string) => {
    // For localnet, we'll show a fake URL. In production, use appropriate cluster
    return `https://explorer.solana.com/tx/${signature}?cluster=localnet`;
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
                    className={`bg-gradient-to-r ${getBadgeColor(badge)} text-white px-4 py-2 rounded-lg mb-4 inline-block`}
                  >
                    <div className="font-tech text-lg font-bold">
                      "{badge}" BADGE
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-gray-300 mb-4 font-code"
                  >
                    You have successfully completed:<br />
                    <span className="text-cyan-400 font-bold">{challengeTitle}</span>
                  </motion.p>

                  {/* NFT Status Information */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                  >
                    <div className="text-sm text-gray-300 space-y-2">
                      <div className="flex items-center justify-between">
                        <span>🏆 NFT Achievement:</span>
                        <span className={`font-bold ${
                          transactionSignature ? 'text-green-400' : 
                          isMinting ? 'text-yellow-400' :
                          isWalletConnected ? 'text-blue-400' : 'text-gray-400'
                        }`}>
                          {transactionSignature ? '✅ Minted' : 
                           isMinting ? '⏳ Minting...' :
                           isWalletConnected ? '🎯 Ready to Mint' : '⚠️ Wallet Required'}
                        </span>
                      </div>
                      
                      {nftMetadata && (
                        <div className="flex items-center justify-between">
                          <span>📄 Metadata:</span>
                          <a 
                            href={nftMetadata.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 underline text-xs"
                          >
                            View JSON ↗
                          </a>
                        </div>
                      )}
                      
                      {transactionSignature && (
                        <div className="flex items-center justify-between">
                          <span>🔗 Transaction:</span>
                          <a 
                            href={getSolanaExplorerUrl(transactionSignature)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 underline text-xs"
                          >
                            View on Explorer ↗
                          </a>
                        </div>
                      )}
                      
                      {!isWalletConnected && (
                        <div className="text-center text-yellow-400 text-xs mt-2">
                          💡 Connect your wallet to mint NFT achievements!
                        </div>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="space-y-3"
                  >
                    <TechButton
                      variant="primary"
                      onClick={onContinue}
                      disabled={isMinting}
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 disabled:opacity-50"
                    >
                      <span className="mr-2">{isMinting ? '⏳' : '🚀'}</span>
                      {isMinting ? 'MINTING NFT...' : 'CONTINUE TO NEXT CHALLENGE'}
                    </TechButton>
                    
                    <TechButton
                      variant="secondary"
                      onClick={onClose}
                      disabled={isMinting}
                      className="w-full bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 disabled:opacity-50"
                    >
                      {transactionSignature ? '🎨 VIEW NFT COLLECTION' : '📁 VIEW BADGE COLLECTION'}
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