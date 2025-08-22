import { UserProfile, NFTBadge, getDefaultNFTBadges } from './firebase';

// High-speed local storage implementation for instant profile operations
export class LocalProfileStorage {
  private static readonly STORAGE_KEY = 'shadow_ranch_profiles';
  private static readonly CURRENT_USER_KEY = 'shadow_ranch_current_user';

  // Get all profiles from localStorage
  private static getAllProfiles(): Record<string, UserProfile> {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  // Save all profiles to localStorage
  private static saveAllProfiles(profiles: Record<string, UserProfile>): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profiles));
    } catch (error) {
      console.error('Failed to save profiles:', error);
    }
  }

  // Get user profile instantly
  static getUserProfile(publicKey: string): UserProfile | null {
    const profiles = this.getAllProfiles();
    return profiles[publicKey] || null;
  }

  // Create user profile instantly
  static createUserProfile(publicKey: string, initialData?: Partial<UserProfile>): UserProfile {
    const now = new Date();
    const mockTimestamp = {
      toDate: () => now,
      seconds: Math.floor(now.getTime() / 1000),
      nanoseconds: 0,
      valueOf: () => now.getTime()
    };

    const defaultProfile: UserProfile = {
      publicKey,
      username: `User_${publicKey.slice(0, 6)}`,
      bio: '',
      profileImageUrl: '',
      nftBadges: getDefaultNFTBadges(),
      createdAt: mockTimestamp as any,
      updatedAt: mockTimestamp as any,
      ...initialData
    };

    const profiles = this.getAllProfiles();
    profiles[publicKey] = defaultProfile;
    this.saveAllProfiles(profiles);

    return defaultProfile;
  }

  // Update user profile instantly
  static updateUserProfile(publicKey: string, updates: Partial<UserProfile>): void {
    const profiles = this.getAllProfiles();
    const existingProfile = profiles[publicKey];
    
    if (!existingProfile) {
      throw new Error('Profile not found');
    }

    const now = new Date();
    const mockTimestamp = {
      toDate: () => now,
      seconds: Math.floor(now.getTime() / 1000),
      nanoseconds: 0,
      valueOf: () => now.getTime()
    };

    profiles[publicKey] = {
      ...existingProfile,
      ...updates,
      updatedAt: mockTimestamp as any
    };
    
    this.saveAllProfiles(profiles);
  }

  // Upload profile image (mock implementation for speed)
  static async uploadProfileImage(
    file: File,
    publicKey: string,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    // Simulate upload progress for UX
    if (onProgress) {
      onProgress(25);
      await new Promise(resolve => setTimeout(resolve, 100));
      onProgress(50);
      await new Promise(resolve => setTimeout(resolve, 100));
      onProgress(75);
      await new Promise(resolve => setTimeout(resolve, 100));
      onProgress(100);
    }

    // Create a local blob URL for the image
    return URL.createObjectURL(file);
  }

  // Unlock achievement badge instantly
  static unlockBadge(publicKey: string, badgeId: string): void {
    const profile = this.getUserProfile(publicKey);
    if (!profile) return;

    const updatedBadges = profile.nftBadges.map(badge => {
      if (badge.id === badgeId) {
        const now = new Date();
        return {
          ...badge,
          unlocked: true,
          unlockedAt: {
            toDate: () => now,
            seconds: Math.floor(now.getTime() / 1000),
            nanoseconds: 0,
            valueOf: () => now.getTime()
          } as any
        };
      }
      return badge;
    });

    this.updateUserProfile(publicKey, { nftBadges: updatedBadges });
  }

  // Check if user has profile
  static hasProfile(publicKey: string): boolean {
    return this.getUserProfile(publicKey) !== null;
  }

  // Clear all data (for testing)
  static clearAll(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }
}

// High-speed profile operations wrapper
export const FastProfile = {
  // Get profile instantly
  async getProfile(publicKey: string): Promise<UserProfile | null> {
    return LocalProfileStorage.getUserProfile(publicKey);
  },

  // Create profile instantly
  async createProfile(publicKey: string, initialData?: Partial<UserProfile>): Promise<UserProfile> {
    return LocalProfileStorage.createUserProfile(publicKey, initialData);
  },

  // Update profile instantly
  async updateProfile(publicKey: string, updates: Partial<UserProfile>): Promise<void> {
    LocalProfileStorage.updateUserProfile(publicKey, updates);
  },

  // Upload image with instant feedback
  async uploadImage(file: File, publicKey: string, onProgress?: (progress: number) => void): Promise<string> {
    return LocalProfileStorage.uploadProfileImage(file, publicKey, onProgress);
  },

  // Unlock badge instantly
  async unlockBadge(publicKey: string, badgeId: string): Promise<void> {
    LocalProfileStorage.unlockBadge(publicKey, badgeId);
  }
};