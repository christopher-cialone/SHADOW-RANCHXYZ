import { useState } from "react";
import { WesternCard, WesternCardContent, WesternCardHeader, WesternCardTitle } from "@/components/ui/WesternCard";
import { WesternButton } from "@/components/ui/WesternButton";
import { useGameStore } from "@/hooks/use-enhanced-game-store";
import { useLessonStore } from "@/hooks/use-lesson-store";
import { useToast } from "@/hooks/use-toast";
import { RewardNftGallery } from "@/components/ranch/RewardNftGallery";
import { formatRanchCoin, getRarityColor, getRarityBorder } from "@/lib/utils";
import { usePageLoader } from "@/hooks/use-page-loader";

interface ShopItem {
  id: string;
  name: string;
  type: string;
  category: 'building' | 'character';
  cost: number;
  description: string;
  icon: string;
}

const shopItems: ShopItem[] = [
  {
    id: 'water_tower',
    name: 'Water Tower',
    type: 'water_tower',
    category: 'building',
    cost: 500,
    description: 'Essential for ranch operations',
    icon: 'fa-tint'
  },
  {
    id: 'library',
    name: 'Code Library',
    type: 'library',
    category: 'building',
    cost: 750,
    description: 'Store your coding knowledge',
    icon: 'fa-book'
  },
  {
    id: 'deputy',
    name: 'Deputy',
    type: 'deputy',
    category: 'character',
    cost: 1000,
    description: 'A helpful coding companion',
    icon: 'fa-user-tie'
  },
  {
    id: 'merchant',
    name: 'Code Merchant',
    type: 'merchant',
    category: 'character',
    cost: 1500,
    description: 'Trades coding tips for coins',
    icon: 'fa-user-ninja'
  }
];

const achievements = [
  { name: 'First Steps', icon: 'fa-star', unlocked: true, description: 'Complete your first lesson' },
  { name: 'Ranch Builder', icon: 'fa-home', unlocked: true, description: 'Build your first structure' },
  { name: 'Code Master', icon: 'fa-code', unlocked: false, description: 'Complete 10 lessons' },
  { name: 'Solana Pioneer', icon: 'fa-rocket', unlocked: false, description: 'Deploy your first program' }
];

export default function Ranch() {
  const gameStore = useGameStore();
  const { getCompletedLessonsCount } = useLessonStore();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'shop' | 'achievements'>('overview');

  const completedLessons = getCompletedLessonsCount();

  const handlePurchase = (item: ShopItem) => {
    const success = gameStore.spendRanchCoin(item.cost);
    
    if (success) {
      if (item.category === 'building') {
        gameStore.addBuilding({
          name: item.name,
          type: item.type,
          level: 1,
          position: { 
            x: Math.random() * 60 + 20, 
            y: Math.random() * 40 + 40 
          },
          isActive: true
        });
      } else {
        gameStore.addCharacter({
          name: item.name,
          type: item.type,
          rarity: 'common',
          level: 1,
          experience: 0,
          position: { 
            x: Math.random() * 60 + 20, 
            y: Math.random() * 40 + 40 
          },
          isActive: true
        });
      }
      
      gameStore.triggerCoinFall();
      toast({
        title: "Purchase Successful!",
        description: `You've added ${item.name} to your ranch!`,
      });
    } else {
      toast({
        title: "Insufficient Funds",
        description: `You need ${formatRanchCoin(item.cost)} Ranch Coins to purchase ${item.name}.`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="font-western text-4xl md:text-5xl text-rust-400 mb-6">Your Shadow Ranch</h1>
          <p className="font-deputy text-lg text-gray-300 max-w-2xl mx-auto">
            Build and customize your virtual ranch as you progress through lessons. Each achievement unlocks new buildings and characters.
          </p>
        </div>

        {/* NFT Reward Collection */}
        {gameStore.rewardNfts.length > 0 && (
          <div className="mb-8">
            <RewardNftGallery rewards={gameStore.rewardNfts} />
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-800 rounded-lg p-1">
            {[
              { key: 'overview', label: 'Overview', icon: 'fa-home' },
              { key: 'shop', label: 'Shop', icon: 'fa-store' },
              { key: 'achievements', label: 'Achievements', icon: 'fa-trophy' }
            ].map((tab) => (
              <WesternButton
                key={tab.key}
                variant={selectedTab === tab.key ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedTab(tab.key as any)}
                className="mx-1"
              >
                <i className={`fas ${tab.icon} mr-2`} />
                {tab.label}
              </WesternButton>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Ranch Overview */}
          <div className="lg:col-span-3">
            {selectedTab === 'overview' && (
              <WesternCard className="h-96 relative overflow-hidden">
                <WesternCardContent className="p-6 h-full">
                  <h3 className="font-space-gothic text-xl text-rust-400 mb-4">Ranch Overview</h3>
                  
                  {/* Expanded ranch view */}
                  <div className="absolute inset-6 bg-gradient-to-b from-sunset-500/30 via-desert-500/20 to-desert-800/40 rounded-lg border-2 border-desert-600">
                    {/* Buildings */}
                    {gameStore.buildings.map((building, index) => (
                      <div
                        key={building.id}
                        className="absolute bg-leather-700 rounded border-2 border-leather-600 shadow-lg cursor-pointer hover:scale-110 transition-transform"
                        style={{
                          left: `${building.position.x}%`,
                          bottom: '10%',
                          width: '60px',
                          height: building.type === 'saloon' ? '48px' : building.type === 'stable' ? '52px' : '40px'
                        }}
                        title={`${building.name} (Level ${building.level})`}
                      >
                        <div className={`w-full h-4 ${
                          building.type === 'saloon' ? 'bg-rust-600' :
                          building.type === 'stable' ? 'bg-sage-600' :
                          building.type === 'library' ? 'bg-mystic-600' :
                          'bg-desert-600'
                        } rounded-t`} />
                        <div className="text-xs text-center text-white font-mono mt-1 px-1 truncate">
                          {building.name}
                        </div>
                      </div>
                    ))}
                    
                    {/* Characters */}
                    {gameStore.characters.map((character) => (
                      <div
                        key={character.id}
                        className={`absolute w-8 h-10 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform ${
                          getRarityBorder(character.rarity)
                        } border-2`}
                        style={{
                          left: `${character.position.x}%`,
                          bottom: '15%',
                          backgroundColor: character.type === 'sheriff' ? '#b8824c' : 
                                         character.type === 'deputy' ? '#87a96b' : '#6a5acd'
                        }}
                        title={`${character.name} - ${character.type} (Level ${character.level})`}
                      >
                        <div className="w-6 h-6 bg-leather-600 rounded-full mx-auto mt-1" />
                        <div className={`text-xs text-center font-mono mt-1 ${getRarityColor(character.rarity)} font-bold`}>
                          {character.name}
                        </div>
                      </div>
                    ))}
                    
                    {/* Instructions */}
                    <div className="absolute top-4 left-4 bg-black/70 rounded px-3 py-2">
                      <div className="text-xs text-gray-300 font-mono">
                        Click on buildings and characters to interact
                      </div>
                    </div>
                  </div>
                </WesternCardContent>
              </WesternCard>
            )}

            {selectedTab === 'shop' && (
              <WesternCard>
                <WesternCardHeader>
                  <WesternCardTitle>Ranch Shop</WesternCardTitle>
                </WesternCardHeader>
                <WesternCardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {shopItems.map((item) => (
                      <div key={item.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <i className={`fas ${item.icon} text-2xl text-desert-400 mr-3`} />
                            <div>
                              <h4 className="font-deputy text-lg text-white">{item.name}</h4>
                              <p className="text-sm text-gray-400 font-mono">{item.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sunset-400 font-bold">
                            {formatRanchCoin(item.cost)} RC
                          </span>
                          <WesternButton
                            variant="primary"
                            size="sm"
                            onClick={() => handlePurchase(item)}
                            disabled={gameStore.ranchData.coins < item.cost}
                          >
                            <i className="fas fa-shopping-cart mr-1" />
                            Buy
                          </WesternButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </WesternCardContent>
              </WesternCard>
            )}

            {selectedTab === 'achievements' && (
              <WesternCard>
                <WesternCardHeader>
                  <WesternCardTitle>Achievements</WesternCardTitle>
                </WesternCardHeader>
                <WesternCardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border-2 ${
                          achievement.unlocked 
                            ? 'bg-gradient-to-r from-green-800/30 to-green-700/30 border-green-600'
                            : 'bg-gray-800/50 border-gray-600'
                        }`}
                      >
                        <div className="flex items-center">
                          <i className={`fas ${achievement.icon} text-2xl mr-3 ${
                            achievement.unlocked ? 'text-green-400' : 'text-gray-500'
                          }`} />
                          <div>
                            <h4 className={`font-deputy text-lg ${
                              achievement.unlocked ? 'text-white' : 'text-gray-500'
                            }`}>
                              {achievement.name}
                            </h4>
                            <p className={`text-sm font-mono ${
                              achievement.unlocked ? 'text-green-300' : 'text-gray-500'
                            }`}>
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </WesternCardContent>
              </WesternCard>
            )}
          </div>

          {/* Ranch Stats & Management */}
          <div className="space-y-6">
            {/* Stats Card */}
            <WesternCard>
              <WesternCardHeader>
                <WesternCardTitle className="text-lg">Ranch Stats</WesternCardTitle>
              </WesternCardHeader>
              <WesternCardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-mono text-sm">Ranch Coins</span>
                    <span className="text-sunset-400 font-deputy text-lg">
                      {formatRanchCoin(gameStore.ranchData.coins)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-mono text-sm">Total XP</span>
                    <span className="text-sage-400 font-deputy text-lg">
                      {gameStore.ranchData.experience}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-mono text-sm">Level</span>
                    <span className="text-desert-400 font-deputy text-lg">
                      {gameStore.ranchData.level}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-mono text-sm">Buildings</span>
                    <span className="text-rust-400 font-deputy text-lg">
                      {gameStore.buildings.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-mono text-sm">Characters</span>
                    <span className="text-mystic-400 font-deputy text-lg">
                      {gameStore.characters.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-mono text-sm">Lessons Complete</span>
                    <span className="text-green-400 font-deputy text-lg">
                      {completedLessons}
                    </span>
                  </div>
                </div>
              </WesternCardContent>
            </WesternCard>

            {/* Quick Actions */}
            <WesternCard>
              <WesternCardHeader>
                <WesternCardTitle className="text-lg">Quick Actions</WesternCardTitle>
              </WesternCardHeader>
              <WesternCardContent>
                <div className="space-y-3">
                  <WesternButton 
                    variant="secondary" 
                    className="w-full"
                    onClick={() => gameStore.triggerSparkleAnimation()}
                  >
                    <i className="fas fa-sparkles mr-2" />
                    Collect Daily Bonus
                  </WesternButton>
                  <WesternButton 
                    variant="tertiary" 
                    className="w-full"
                    onClick={() => gameStore.triggerCoinFall()}
                  >
                    <i className="fas fa-coins mr-2" />
                    Check Earnings
                  </WesternButton>
                  <WesternButton 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => setSelectedTab('shop')}
                  >
                    <i className="fas fa-store mr-2" />
                    Visit Shop
                  </WesternButton>
                </div>
              </WesternCardContent>
            </WesternCard>

            {/* Ranch Info */}
            <WesternCard>
              <WesternCardHeader>
                <WesternCardTitle className="text-lg">Ranch Info</WesternCardTitle>
              </WesternCardHeader>
              <WesternCardContent>
                <div className="text-sm text-gray-300 font-mono space-y-2">
                  <p><strong className="text-desert-400">Name:</strong> {gameStore.ranchData.name}</p>
                  <p><strong className="text-desert-400">Established:</strong> Recently</p>
                  <p><strong className="text-desert-400">Location:</strong> Shadow Valley</p>
                  <p><strong className="text-desert-400">Specialty:</strong> Solana Development</p>
                </div>
              </WesternCardContent>
            </WesternCard>
          </div>
        </div>
      </div>
    </div>
  );
}
