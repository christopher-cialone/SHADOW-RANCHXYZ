import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { UserProfile } from "@/lib/firebase";
import { FastProfile } from "@/lib/local-storage";
import { useWallet } from "@/hooks/use-wallet";
import { useToast } from "@/hooks/use-toast";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { AchievementGallery } from "@/components/profile/AchievementGallery";
import { ProfileEditorModal } from "@/components/profile/ProfileEditorModal";
import { SpeedTestButton } from "@/components/profile/SpeedTestButton";
import { PerformanceNotice } from "@/components/profile/PerformanceNotice";
import { usePageLoader } from "@/hooks/use-page-loader";

export default function ProfilePage() {
  const { publicKey: routePublicKey } = useParams<{ publicKey: string }>();
  const { address: connectedPublicKey, connected } = useWallet();
  const { toast } = useToast();
  usePageLoader();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Determine which public key to use (route param or connected wallet)
  const targetPublicKey = routePublicKey || connectedPublicKey;
  const isOwner = connected && connectedPublicKey === targetPublicKey;

  useEffect(() => {
    const loadProfile = async () => {
      if (!targetPublicKey) {
        setError("No wallet address provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Try to fetch existing profile (instant local storage)
        let userProfile = await FastProfile.getProfile(targetPublicKey);

        // If no profile exists and this is the owner, create one
        if (!userProfile && isOwner) {
          toast({
            title: "Creating your profile",
            description: "Setting up your Shadow Ranch profile...",
          });
          userProfile = await FastProfile.createProfile(targetPublicKey);
        }

        if (!userProfile) {
          setError("Profile not found");
          return;
        }

        setProfile(userProfile);
      } catch (err) {
        console.error('Error loading profile:', err);
        setError("Failed to load profile");
        toast({
          title: "Error loading profile",
          description: "Could not load profile data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [targetPublicKey, isOwner, toast]);

  const handleProfileUpdate = (updates: Partial<UserProfile>) => {
    if (profile) {
      setProfile({ ...profile, ...updates });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="mx-auto text-cyan-400 animate-spin mb-4" />
          <p className="text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">
            {error || "Profile not found"}
          </h1>
          <p className="text-gray-400 mb-6">
            {!connected 
              ? "Please connect your wallet to view your profile"
              : "This profile doesn't exist or could not be loaded"
            }
          </p>
          <Link href="/">
            <button className="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="sparkle-effect" style={{ top: '20%', left: '10%', animationDelay: '0s' }} />
        <div className="sparkle-effect" style={{ top: '60%', left: '80%', animationDelay: '0.5s' }} />
        <div className="sparkle-effect" style={{ top: '40%', left: '30%', animationDelay: '1s' }} />
        <div className="sparkle-effect" style={{ top: '80%', left: '60%', animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <button className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </button>
          </Link>
          
          <div className="flex items-center gap-3">
            {isOwner && (
              <span className="text-sm text-cyan-400 font-mono">Your Profile</span>
            )}
            <SpeedTestButton />
          </div>
        </div>

        {/* Performance Notice */}
        <PerformanceNotice />

        {/* Page Title */}
        <div className="text-center sm:text-left">
          <h1 className="font-space-gothic text-3xl sm:text-4xl md:text-5xl text-cyan-400 mb-2">
            {isOwner ? "Your Profile" : `${profile.username}'s Profile`}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Shadow Ranch member since {profile.createdAt?.toDate ? profile.createdAt.toDate().toLocaleDateString() : new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Profile Content - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Profile Header - Full width on mobile, spans 2 columns on desktop */}
          <div className="lg:col-span-2">
            <ProfileHeader
              profile={profile}
              isOwner={isOwner}
              onEditClick={() => setIsEditorOpen(true)}
            />
          </div>

          {/* Achievement Gallery - Full width on mobile, spans 1 column on desktop */}
          <div className="lg:col-span-1">
            <AchievementGallery badges={profile.nftBadges} />
          </div>
        </div>

        {/* Additional Stats Section - Could be added later */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-black/40 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">
              {profile.nftBadges.filter(badge => badge.unlocked).length}
            </div>
            <div className="text-gray-400 text-sm">Achievements</div>
          </div>
          
          <div className="bg-black/40 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">
              {Math.floor((Date.now() - (profile.createdAt?.toDate ? profile.createdAt.toDate().getTime() : Date.now())) / (1000 * 60 * 60 * 24))}
            </div>
            <div className="text-gray-400 text-sm">Days Active</div>
          </div>
          
          <div className="bg-black/40 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">
              {profile.nftBadges.filter(badge => badge.rarity === 'rare' || badge.rarity === 'epic' || badge.rarity === 'legendary').filter(badge => badge.unlocked).length}
            </div>
            <div className="text-gray-400 text-sm">Rare Badges</div>
          </div>
        </div>
      </div>

      {/* Profile Editor Modal */}
      {isOwner && (
        <ProfileEditorModal
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          profile={profile}
          onProfileUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
}