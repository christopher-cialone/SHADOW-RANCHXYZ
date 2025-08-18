import { Lock, Trophy, Star, Gem, Crown } from "lucide-react";
import { NFTBadge } from "@/lib/firebase";
import { cn } from "@/lib/utils";

interface AchievementGalleryProps {
  badges: NFTBadge[];
}

export function AchievementGallery({ badges }: AchievementGalleryProps) {
  const getRarityIcon = (rarity: NFTBadge['rarity']) => {
    switch (rarity) {
      case 'common':
        return <Star size={16} className="text-gray-400" />;
      case 'uncommon':
        return <Star size={16} className="text-green-400" />;
      case 'rare':
        return <Gem size={16} className="text-blue-400" />;
      case 'epic':
        return <Trophy size={16} className="text-purple-400" />;
      case 'legendary':
        return <Crown size={16} className="text-yellow-400" />;
      default:
        return <Star size={16} className="text-gray-400" />;
    }
  };

  const getRarityBorder = (rarity: NFTBadge['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-400/30';
      case 'uncommon':
        return 'border-green-400/30';
      case 'rare':
        return 'border-blue-400/30';
      case 'epic':
        return 'border-purple-400/30';
      case 'legendary':
        return 'border-yellow-400/30';
      default:
        return 'border-gray-400/30';
    }
  };

  const getRarityGlow = (rarity: NFTBadge['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'shadow-gray-400/20';
      case 'uncommon':
        return 'shadow-green-400/20';
      case 'rare':
        return 'shadow-blue-400/20';
      case 'epic':
        return 'shadow-purple-400/20';
      case 'legendary':
        return 'shadow-yellow-400/20';
      default:
        return 'shadow-gray-400/20';
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="font-space-gothic text-xl sm:text-2xl text-cyan-400">
          Achievements
        </h2>
        <div className="text-sm text-gray-400">
          {badges.filter(badge => badge.unlocked).length} / {badges.length} Unlocked
        </div>
      </div>

      {/* Clean 2x3 Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-lg mx-auto">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={cn(
              "group relative flex flex-col items-center p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer",
              badge.unlocked 
                ? `${getRarityBorder(badge.rarity)} bg-gradient-to-br from-black/60 to-gray-900/60 hover:shadow-lg ${getRarityGlow(badge.rarity)}` 
                : "border-gray-600/30 bg-gray-900/40"
            )}
            title={badge.description}
          >
            {/* Badge Icon */}
            <div className={cn(
              "w-12 h-12 sm:w-16 sm:h-16 mb-3 flex items-center justify-center rounded-xl transition-all duration-300",
              badge.unlocked 
                ? "bg-cyan-400/20 border-2 border-cyan-400/30" 
                : "bg-gray-700/40 border-2 border-gray-600/30 opacity-40"
            )}>
              {badge.unlocked ? (
                getRarityIcon(badge.rarity)
              ) : (
                <Lock size={20} className="text-gray-400" />
              )}
            </div>

            {/* Badge Name */}
            <h3 className={cn(
              "text-center text-sm sm:text-base font-medium leading-tight",
              badge.unlocked ? "text-white" : "text-gray-500 opacity-60"
            )}>
              {badge.name}
            </h3>

            {/* Hover Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/95 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-nowrap border border-cyan-400/30">
              <div className="font-medium">{badge.name}</div>
              <div className="text-gray-300 text-xs mt-1">{badge.description}</div>
              {badge.unlocked && badge.unlockedAt && (
                <div className="text-cyan-400 text-xs mt-1">
                  Unlocked: {badge.unlockedAt?.toDate ? badge.unlockedAt.toDate().toLocaleDateString() : 'Recently'}
                </div>
              )}
              {/* Tooltip Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/95"></div>
            </div>

            {/* Rarity Indicator */}
            <div className="absolute top-2 right-2">
              <div className={cn(
                "w-3 h-3 rounded-full border",
                badge.unlocked ? {
                  'common': 'bg-gray-400 border-gray-300',
                  'uncommon': 'bg-green-400 border-green-300',
                  'rare': 'bg-blue-400 border-blue-300',
                  'epic': 'bg-purple-400 border-purple-300',
                  'legendary': 'bg-yellow-400 border-yellow-300'
                }[badge.rarity] : 'bg-gray-600 border-gray-500 opacity-50'
              )} />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {badges.length === 0 && (
        <div className="text-center py-8">
          <Trophy size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400">No achievements yet</p>
          <p className="text-sm text-gray-500 mt-1">Complete lessons and challenges to earn badges!</p>
        </div>
      )}
    </div>
  );
}