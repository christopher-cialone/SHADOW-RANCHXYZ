import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { doc, getDoc, setDoc, collection, addDoc, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

interface RanchData {
  id: number;
  name: string;
  coins: number;
  experience: number;
  level: number;
}

interface Character {
  id: number;
  name: string;
  type: string;
  rarity: string;
  level: number;
  experience: number;
  position: { x: number; y: number };
  isActive: boolean;
}

interface Building {
  id: number;
  name: string;
  type: string;
  level: number;
  position: { x: number; y: number };
  isActive: boolean;
}

interface RewardNft {
  id: string;
  lessonId: number;
  nftImageUrl: string;
  rewardName: string;
  awardedAt: Date;
}

interface GameStore {
  ranchData: RanchData;
  characters: Character[];
  buildings: Building[];
  rewardNfts: RewardNft[];
  
  // Visual effect states
  networkPingActive: boolean;
  sparkleActive: boolean;
  coinFallActive: boolean;
  lastStoredMessage: string | null;
  transactionActive: boolean;
  
  // Challenge reward states
  showChallengeReward: boolean;
  currentRewardNftUrl: string | null;
  
  // Actions
  addCharacter: (character: Omit<Character, 'id'>) => void;
  addBuilding: (building: Omit<Building, 'id'>) => void;
  spendRanchCoin: (amount: number) => boolean;
  earnRanchCoin: (amount: number) => void;
  addExperience: (amount: number) => void;
  
  // Visual effect actions
  triggerNetworkPing: () => void;
  triggerSparkleAnimation: () => void;
  triggerCoinFall: () => void;
  setLastStoredMessage: (message: string) => void;
  triggerTransactionAnimation: () => void;
  
  // Challenge reward actions
  triggerChallengeReward: (nftUrl: string, lessonId: number, rewardName: string) => void;
  
  // Firestore sync actions
  loadFromFirestore: () => Promise<void>;
  saveToFirestore: () => Promise<void>;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ranchData: {
        id: 1,
        name: "Shadow Ranch",
        coins: 100,
        experience: 0,
        level: 1
      },
      characters: [
        {
          id: 1,
          name: "Sheriff",
          type: "sheriff",
          rarity: "legendary",
          level: 1,
          experience: 0,
          position: { x: 50, y: 50 },
          isActive: true
        }
      ],
      buildings: [
        {
          id: 1,
          name: "Saloon",
          type: "saloon",
          level: 1,
          position: { x: 20, y: 80 },
          isActive: true
        },
        {
          id: 2,
          name: "Stable",
          type: "stable",
          level: 1,
          position: { x: 70, y: 80 },
          isActive: true
        }
      ],
      rewardNfts: [],
      
      // Visual effects
      networkPingActive: false,
      sparkleActive: false,
      coinFallActive: false,
      lastStoredMessage: null,
      transactionActive: false,
      
      // Challenge reward states
      showChallengeReward: false,
      currentRewardNftUrl: null,

      addCharacter: (character) => {
        const newCharacter = { ...character, id: Date.now() };
        set((state) => ({
          characters: [...state.characters, newCharacter]
        }));
        get().saveToFirestore();
      },

      addBuilding: (building) => {
        const newBuilding = { ...building, id: Date.now() };
        set((state) => ({
          buildings: [...state.buildings, newBuilding]
        }));
        get().saveToFirestore();
      },

      spendRanchCoin: (amount) => {
        const currentCoins = get().ranchData.coins;
        if (currentCoins >= amount) {
          set((state) => ({
            ranchData: { ...state.ranchData, coins: currentCoins - amount }
          }));
          get().saveToFirestore();
          return true;
        }
        return false;
      },

      earnRanchCoin: (amount) => {
        set((state) => ({
          ranchData: { 
            ...state.ranchData, 
            coins: state.ranchData.coins + amount 
          }
        }));
        get().saveToFirestore();
      },

      addExperience: (amount) => {
        set((state) => {
          const newExperience = state.ranchData.experience + amount;
          const newLevel = Math.floor(newExperience / 100) + 1;
          return {
            ranchData: { 
              ...state.ranchData, 
              experience: newExperience,
              level: newLevel
            }
          };
        });
        get().saveToFirestore();
      },

      triggerNetworkPing: () => {
        set({ networkPingActive: true });
        setTimeout(() => set({ networkPingActive: false }), 2000);
      },

      triggerSparkleAnimation: () => {
        set({ sparkleActive: true });
        setTimeout(() => set({ sparkleActive: false }), 3000);
      },

      triggerCoinFall: () => {
        set({ coinFallActive: true });
        setTimeout(() => set({ coinFallActive: false }), 2000);
      },

      setLastStoredMessage: (message) => {
        set({ lastStoredMessage: message });
        setTimeout(() => set({ lastStoredMessage: null }), 5000);
      },

      triggerTransactionAnimation: () => {
        set({ transactionActive: true });
        setTimeout(() => set({ transactionActive: false }), 3000);
      },

      triggerChallengeReward: async (nftUrl, lessonId, rewardName) => {
        // Add to reward NFTs collection
        const newReward: RewardNft = {
          id: Date.now().toString(),
          lessonId,
          nftImageUrl: nftUrl,
          rewardName,
          awardedAt: new Date()
        };
        
        set((state) => ({
          currentRewardNftUrl: nftUrl,
          showChallengeReward: true,
          rewardNfts: [...state.rewardNfts, newReward]
        }));
        
        // Save to Firestore
        if (auth.currentUser) {
          try {
            await addDoc(collection(db, 'users', auth.currentUser.uid, 'rewardNfts'), {
              ...newReward,
              awardedAt: Timestamp.now()
            });
          } catch (error) {
            console.error('Error saving reward NFT to Firestore:', error);
          }
        }
        
        // Auto-hide the reward after 4.5 seconds
        setTimeout(() => set({ showChallengeReward: false }), 4500);
        
        // Save updated state to Firestore
        get().saveToFirestore();
      },

      loadFromFirestore: async () => {
        if (!auth.currentUser) return;
        
        try {
          // Load ranch data
          const ranchDoc = await getDoc(doc(db, 'users', auth.currentUser.uid, 'ranch', 'main'));
          if (ranchDoc.exists()) {
            set({ ranchData: ranchDoc.data() as RanchData });
          }

          // Load characters
          const charactersSnapshot = await getDocs(collection(db, 'users', auth.currentUser.uid, 'characters'));
          const characters = charactersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Character));
          if (characters.length > 0) {
            set({ characters });
          }

          // Load buildings
          const buildingsSnapshot = await getDocs(collection(db, 'users', auth.currentUser.uid, 'buildings'));
          const buildings = buildingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Building));
          if (buildings.length > 0) {
            set({ buildings });
          }

          // Load reward NFTs
          const rewardsQuery = query(
            collection(db, 'users', auth.currentUser.uid, 'rewardNfts'),
            orderBy('awardedAt', 'desc')
          );
          const rewardsSnapshot = await getDocs(rewardsQuery);
          const rewardNfts = rewardsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            awardedAt: doc.data().awardedAt?.toDate() || new Date()
          } as RewardNft));
          
          set({ rewardNfts });
          
        } catch (error) {
          console.error('Error loading from Firestore:', error);
        }
      },

      saveToFirestore: async () => {
        if (!auth.currentUser) return;
        
        try {
          const state = get();
          
          // Save ranch data
          await setDoc(doc(db, 'users', auth.currentUser.uid, 'ranch', 'main'), state.ranchData);
          
          // Note: Characters and buildings are saved individually when added
          // Reward NFTs are saved when awarded
          
        } catch (error) {
          console.error('Error saving to Firestore:', error);
        }
      }
    }),
    {
      name: 'game-store',
      // Load from Firestore after hydration
      onRehydrateStorage: () => (state) => {
        if (state && auth.currentUser) {
          state.loadFromFirestore();
        }
      }
    }
  )
);