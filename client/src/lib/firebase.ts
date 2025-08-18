import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { initializeFirestore, doc, getDoc, setDoc, addDoc, updateDoc, collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Firestore with Replit-compatible settings
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export const storage = getStorage(app);

// Authentication helper
export const signInUser = async (): Promise<User | null> => {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.error('Error signing in:', error);
    return null;
  }
};

// Collection paths
export const COLLECTIONS = {
  USERS: 'users',
  USER_PROFILES: 'userProfiles',
  RANCHES: 'ranches',
  USER_PROGRESS: 'userProgress',
  REWARD_NFTS: 'rewardNfts',
  CHARACTERS: 'characters',
  BUILDINGS: 'buildings'
};

// Helper function to get user document reference
export const getUserDocRef = (userId: string) => {
  return doc(db, COLLECTIONS.USERS, userId);
};

// Helper function to get user's subcollection reference
export const getUserSubcollectionRef = (userId: string, subcollection: string) => {
  return collection(db, COLLECTIONS.USERS, userId, subcollection);
};

// Initialize auth state listener
export const initializeAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// User Profile Types
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

// Profile management functions
export const getUserProfile = async (publicKey: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.USER_PROFILES, publicKey);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const createUserProfile = async (publicKey: string, initialData?: Partial<UserProfile>): Promise<UserProfile> => {
  const defaultProfile: UserProfile = {
    publicKey,
    username: `User_${publicKey.slice(0, 6)}`,
    bio: '',
    profileImageUrl: '',
    nftBadges: getDefaultNFTBadges(),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    ...initialData
  };

  try {
    const docRef = doc(db, COLLECTIONS.USER_PROFILES, publicKey);
    await setDoc(docRef, defaultProfile);
    return defaultProfile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (publicKey: string, updates: Partial<UserProfile>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.USER_PROFILES, publicKey);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Storage functions for profile images
export const uploadProfileImage = async (
  file: File, 
  publicKey: string, 
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `profile_${Date.now()}.${fileExtension}`;
    const storageRef = ref(storage, `profile-images/${publicKey}/${fileName}`);
    
    if (onProgress) {
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progress);
          },
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    } else {
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    }
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};

// Unlock badge function
export const unlockBadge = async (publicKey: string, badgeId: string): Promise<void> => {
  try {
    const profile = await getUserProfile(publicKey);
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

    await updateUserProfile(publicKey, { nftBadges: updatedBadges });
  } catch (error) {
    console.error('Error unlocking badge:', error);
    throw error;
  }
};

// Default NFT badges for new users
export const getDefaultNFTBadges = (): NFTBadge[] => [
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