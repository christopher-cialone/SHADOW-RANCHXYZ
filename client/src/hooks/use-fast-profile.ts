import { useState, useEffect } from 'react';
import { UserProfile } from '@/lib/firebase';
import { FastProfile } from '@/lib/local-storage';
import { useWallet } from './use-wallet';
import { useToast } from './use-toast';

export function useFastProfile() {
  const { address: connectedAddress, connected } = useWallet();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  // Load profile instantly when wallet connects
  useEffect(() => {
    if (!connectedAddress || !connected) {
      setProfile(null);
      return;
    }

    const loadProfile = async () => {
      setLoading(true);
      try {
        let userProfile = await FastProfile.getProfile(connectedAddress);
        
        if (!userProfile) {
          // Create profile instantly
          userProfile = await FastProfile.createProfile(connectedAddress);
          toast({
            title: "Profile Created",
            description: "Your Shadow Ranch profile is ready!",
          });
        }
        
        setProfile(userProfile);
      } catch (error) {
        console.error('Error loading profile:', error);
        toast({
          title: "Profile Error", 
          description: "Could not load profile data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [connectedAddress, connected, toast]);

  // Update profile instantly
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile || !connectedAddress) return;

    try {
      await FastProfile.updateProfile(connectedAddress, updates);
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Profile Updated",
        description: "Changes saved instantly!",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update Failed",
        description: "Could not save changes",
        variant: "destructive",
      });
    }
  };

  // Upload image instantly
  const uploadImage = async (file: File, onProgress?: (progress: number) => void) => {
    if (!connectedAddress) return null;

    try {
      const imageUrl = await FastProfile.uploadImage(file, connectedAddress, onProgress);
      await updateProfile({ profileImageUrl: imageUrl });
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Failed",
        description: "Could not upload image",
        variant: "destructive",
      });
      return null;
    }
  };

  // Unlock badge instantly
  const unlockBadge = async (badgeId: string) => {
    if (!profile || !connectedAddress) return;

    try {
      await FastProfile.unlockBadge(connectedAddress, badgeId);
      
      // Update local state
      const updatedBadges = profile.nftBadges.map(badge => {
        if (badge.id === badgeId) {
          return { ...badge, unlocked: true, unlockedAt: { toDate: () => new Date() } as any };
        }
        return badge;
      });
      
      setProfile(prev => prev ? { ...prev, nftBadges: updatedBadges } : null);
      
      const badgeName = profile.nftBadges.find(b => b.id === badgeId)?.name || 'Achievement';
      toast({
        title: "Achievement Unlocked!",
        description: `You earned the ${badgeName} badge!`,
      });
    } catch (error) {
      console.error('Error unlocking badge:', error);
    }
  };

  return {
    profile,
    loading,
    connected,
    updateProfile,
    uploadImage,
    unlockBadge,
    hasProfile: !!profile
  };
}