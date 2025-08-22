import { 
  doc, getDoc, setDoc, addDoc, updateDoc, collection, query, where, getDocs, orderBy, Timestamp 
} from 'firebase/firestore';
import { db, COLLECTIONS } from './firebase';
import type { 
  User, Ranch, Lesson, UserProgress, Character, Building, RewardNft,
  InsertUser, InsertRanch, InsertUserProgress, InsertCharacter, InsertBuilding, InsertRewardNft
} from '@shared/schema';

export class FirestoreStorage {
  // User operations
  async getUser(userId: string): Promise<User | undefined> {
    try {
      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId));
      return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } as User : undefined;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async createUser(userId: string, userData: Omit<InsertUser, 'id'>): Promise<User> {
    try {
      const user = {
        id: userId,
        ...userData,
        createdAt: Timestamp.now()
      };
      await setDoc(doc(db, COLLECTIONS.USERS, userId), user);
      return user as User;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(userId: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    try {
      await updateDoc(doc(db, COLLECTIONS.USERS, userId), updates);
      return this.getUser(userId);
    } catch (error) {
      console.error('Error updating user:', error);
      return undefined;
    }
  }

  // Ranch operations
  async getRanch(userId: string): Promise<Ranch | undefined> {
    try {
      const ranchDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId, COLLECTIONS.RANCHES, 'main'));
      return ranchDoc.exists() ? { id: ranchDoc.id, ...ranchDoc.data() } as Ranch : undefined;
    } catch (error) {
      console.error('Error getting ranch:', error);
      return undefined;
    }
  }

  async createRanch(userId: string, ranchData: Omit<InsertRanch, 'id' | 'userId'>): Promise<Ranch> {
    try {
      const ranch = {
        id: 'main',
        userId,
        ...ranchData,
        createdAt: Timestamp.now()
      };
      await setDoc(doc(db, COLLECTIONS.USERS, userId, COLLECTIONS.RANCHES, 'main'), ranch);
      return ranch as Ranch;
    } catch (error) {
      console.error('Error creating ranch:', error);
      throw error;
    }
  }

  async updateRanch(userId: string, updates: Partial<InsertRanch>): Promise<Ranch | undefined> {
    try {
      await updateDoc(doc(db, COLLECTIONS.USERS, userId, COLLECTIONS.RANCHES, 'main'), updates);
      return this.getRanch(userId);
    } catch (error) {
      console.error('Error updating ranch:', error);
      return undefined;
    }
  }

  // User Progress operations
  async getUserProgress(userId: string, lessonId: number): Promise<UserProgress | undefined> {
    try {
      const progressDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId, COLLECTIONS.USER_PROGRESS, lessonId.toString()));
      return progressDoc.exists() ? { id: progressDoc.id, ...progressDoc.data() } as UserProgress : undefined;
    } catch (error) {
      console.error('Error getting user progress:', error);
      return undefined;
    }
  }

  async getUserProgressByUserId(userId: string): Promise<UserProgress[]> {
    try {
      const progressQuery = query(collection(db, COLLECTIONS.USERS, userId, COLLECTIONS.USER_PROGRESS));
      const snapshot = await getDocs(progressQuery);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserProgress));
    } catch (error) {
      console.error('Error getting user progress:', error);
      return [];
    }
  }

  async createUserProgress(userId: string, progressData: Omit<InsertUserProgress, 'id' | 'userId'>): Promise<UserProgress> {
    try {
      const progress = {
        id: progressData.lessonId.toString(),
        userId,
        ...progressData,
        lastAttemptAt: Timestamp.now()
      };
      await setDoc(doc(db, COLLECTIONS.USERS, userId, COLLECTIONS.USER_PROGRESS, progressData.lessonId.toString()), progress);
      return progress as UserProgress;
    } catch (error) {
      console.error('Error creating user progress:', error);
      throw error;
    }
  }

  async updateUserProgress(userId: string, lessonId: number, updates: Partial<InsertUserProgress>): Promise<UserProgress | undefined> {
    try {
      const updateData = {
        ...updates,
        lastAttemptAt: Timestamp.now()
      };
      await updateDoc(doc(db, COLLECTIONS.USERS, userId, COLLECTIONS.USER_PROGRESS, lessonId.toString()), updateData);
      return this.getUserProgress(userId, lessonId);
    } catch (error) {
      console.error('Error updating user progress:', error);
      return undefined;
    }
  }

  // Character operations
  async getCharactersByUserId(userId: string): Promise<Character[]> {
    try {
      const charactersQuery = query(collection(db, COLLECTIONS.USERS, userId, COLLECTIONS.CHARACTERS));
      const snapshot = await getDocs(charactersQuery);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Character));
    } catch (error) {
      console.error('Error getting characters:', error);
      return [];
    }
  }

  async createCharacter(userId: string, characterData: Omit<InsertCharacter, 'id'>): Promise<Character> {
    try {
      const character = {
        ...characterData,
        acquiredAt: Timestamp.now()
      };
      const docRef = await addDoc(collection(db, COLLECTIONS.USERS, userId, COLLECTIONS.CHARACTERS), character);
      return { id: docRef.id, ...character } as Character;
    } catch (error) {
      console.error('Error creating character:', error);
      throw error;
    }
  }

  // Building operations
  async getBuildingsByUserId(userId: string): Promise<Building[]> {
    try {
      const buildingsQuery = query(collection(db, COLLECTIONS.USERS, userId, COLLECTIONS.BUILDINGS));
      const snapshot = await getDocs(buildingsQuery);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Building));
    } catch (error) {
      console.error('Error getting buildings:', error);
      return [];
    }
  }

  async createBuilding(userId: string, buildingData: Omit<InsertBuilding, 'id'>): Promise<Building> {
    try {
      const building = {
        ...buildingData,
        builtAt: Timestamp.now()
      };
      const docRef = await addDoc(collection(db, COLLECTIONS.USERS, userId, COLLECTIONS.BUILDINGS), building);
      return { id: docRef.id, ...building } as Building;
    } catch (error) {
      console.error('Error creating building:', error);
      throw error;
    }
  }

  // Reward NFT operations
  async getRewardNftsByUserId(userId: string): Promise<RewardNft[]> {
    try {
      const rewardsQuery = query(
        collection(db, COLLECTIONS.USERS, userId, COLLECTIONS.REWARD_NFTS),
        orderBy('awardedAt', 'desc')
      );
      const snapshot = await getDocs(rewardsQuery);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RewardNft));
    } catch (error) {
      console.error('Error getting reward NFTs:', error);
      return [];
    }
  }

  async createRewardNft(userId: string, rewardData: Omit<InsertRewardNft, 'id' | 'userId'>): Promise<RewardNft> {
    try {
      const reward = {
        userId,
        ...rewardData,
        awardedAt: Timestamp.now()
      };
      const docRef = await addDoc(collection(db, COLLECTIONS.USERS, userId, COLLECTIONS.REWARD_NFTS), reward);
      return { id: docRef.id, ...reward } as RewardNft;
    } catch (error) {
      console.error('Error creating reward NFT:', error);
      throw error;
    }
  }

  // Static lesson operations (lessons are global data)
  async getAllLessons(): Promise<Lesson[]> {
    try {
      const lessonsQuery = query(collection(db, 'lessons'), orderBy('id'));
      const snapshot = await getDocs(lessonsQuery);
      return snapshot.docs.map(doc => ({ ...doc.data() } as Lesson));
    } catch (error) {
      console.error('Error getting lessons:', error);
      return this.getDefaultLessons(); // Fallback to default lessons
    }
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    try {
      const lessons = await this.getAllLessons();
      return lessons.find(lesson => lesson.id === id);
    } catch (error) {
      console.error('Error getting lesson:', error);
      return undefined;
    }
  }

  private getDefaultLessons(): Lesson[] {
    return [
      {
        id: 1,
        title: "Introduction to Rust",
        description: "Learn the basics of Rust programming language",
        difficulty: "Beginner",
        duration: "30 minutes",
        reward: 100,
        requiredLessons: [],
        category: "basics",
        steps: [
          {
            id: 1,
            title: "Hello World",
            narrative: "Welcome to your first Rust program! Let's start with the classic 'Hello, World!' example.",
            instructions: [
              "Write a function called `main` that prints 'Hello, World!' to the console",
              "Use the `println!` macro to print the message"
            ],
            hints: [
              "The main function is the entry point of every Rust program",
              "Use `println!` macro with double quotes for the string"
            ],
            validationRules: [
              {
                type: "contains",
                pattern: "fn main()",
                message: "You need to define a main function",
                required: true
              },
              {
                type: "contains",
                pattern: "println!",
                message: "Use the println! macro to print to console",
                required: true
              },
              {
                type: "contains",
                pattern: "Hello, World!",
                message: "Print 'Hello, World!' message",
                required: true
              }
            ],
            starterCode: "// Write your first Rust program here\n",
            expectedOutput: "Hello, World!"
          }
        ]
      }
    ];
  }
}

export const firestoreStorage = new FirestoreStorage();