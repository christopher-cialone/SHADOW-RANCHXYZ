import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

// Initialize Firebase Admin SDK
let app;
if (getApps().length === 0) {
  app = initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
} else {
  app = getApps()[0];
}

export const adminDb = getFirestore(app);
export const adminStorage = getStorage(app);

// Collection paths
export const COLLECTIONS = {
  USER_PROFILES: 'userProfiles',
  USER_PROGRESS: 'userProgress',
  REWARD_NFTS: 'rewardNfts',
};

// Types for server-side operations
export interface UserProfile {
  publicKey: string;
  username: string;
  bio: string;
  profileImageUrl: string;
  nftBadges: NFTBadge[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface NFTBadge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  unlocked: boolean;
  unlockedAt?: Timestamp;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

// Server-side profile operations
export class FirebaseProfileService {
  static async getUserProfile(publicKey: string): Promise<UserProfile | null> {
    try {
      const docRef = adminDb.collection(COLLECTIONS.USER_PROFILES).doc(publicKey);
      const docSnap = await docRef.get();
      
      if (docSnap.exists) {
        return docSnap.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Server: Error fetching user profile:', error);
      throw error;
    }
  }

  static async createUserProfile(publicKey: string, profileData: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const now = Timestamp.now();
      const defaultProfile: UserProfile = {
        publicKey,
        username: `User_${publicKey.slice(0, 6)}`,
        bio: '',
        profileImageUrl: '',
        nftBadges: getDefaultNFTBadges(),
        createdAt: now,
        updatedAt: now,
        ...profileData
      };

      const docRef = adminDb.collection(COLLECTIONS.USER_PROFILES).doc(publicKey);
      await docRef.set(defaultProfile);
      return defaultProfile;
    } catch (error) {
      console.error('Server: Error creating user profile:', error);
      throw error;
    }
  }

  static async updateUserProfile(publicKey: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      const docRef = adminDb.collection(COLLECTIONS.USER_PROFILES).doc(publicKey);
      await docRef.update({
        ...updates,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Server: Error updating user profile:', error);
      throw error;
    }
  }

  static async unlockBadge(publicKey: string, badgeId: string): Promise<void> {
    try {
      const profile = await this.getUserProfile(publicKey);
      if (!profile) {
        throw new Error('Profile not found');
      }

      const updatedBadges = profile.nftBadges.map(badge => {
        if (badge.id === badgeId) {
          return {
            ...badge,
            unlocked: true,
            unlockedAt: Timestamp.now()
          };
        }
        return badge;
      });

      await this.updateUserProfile(publicKey, { nftBadges: updatedBadges });
    } catch (error) {
      console.error('Server: Error unlocking badge:', error);
      throw error;
    }
  }
}

// Default NFT badges for new users
function getDefaultNFTBadges(): NFTBadge[] {
  return [
    {
      id: 'first-lesson',
      name: 'First Steps',
      description: 'Complete your first Solana lesson',
      imageUrl: '/badges/first-lesson.svg',
      unlocked: false,
      rarity: 'common'
    },
    {
      id: 'cypherpunk-initiate',
      name: 'Cypherpunk Initiate',
      description: 'Learn the fundamentals of cypherpunk philosophy',
      imageUrl: '/badges/cypherpunk-initiate.svg',
      unlocked: false,
      rarity: 'uncommon'
    },
    {
      id: 'wallet-connected',
      name: 'Wallet Master',
      description: 'Successfully connect your Solana wallet',
      imageUrl: '/badges/wallet-connected.svg',
      unlocked: false,
      rarity: 'common'
    },
    {
      id: 'ranch-builder',
      name: 'Ranch Builder',
      description: 'Build your first structure in Shadow Ranch',
      imageUrl: '/badges/ranch-builder.svg',
      unlocked: false,
      rarity: 'rare'
    },
    {
      id: 'code-slinger',
      name: 'Code Slinger',
      description: 'Write and deploy your first Solana program',
      imageUrl: '/badges/code-slinger.svg',
      unlocked: false,
      rarity: 'epic'
    },
    {
      id: 'mindmap-explorer',
      name: 'Mindmap Explorer',
      description: 'Explore the full history of internet mindmap',
      imageUrl: '/badges/mindmap-explorer.svg',
      unlocked: false,
      rarity: 'uncommon'
    }
  ];
}