import { useState } from "react";
import { Copy, Edit3, ExternalLink } from "lucide-react";
import { UserProfile } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  profile: UserProfile;
  isOwner: boolean;
  onEditClick: () => void;
}

export function ProfileHeader({ profile, isOwner, onEditClick }: ProfileHeaderProps) {
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Wallet address copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const DefaultAvatar = () => (
    <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center rounded-lg">
      <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
        {profile.username.charAt(0).toUpperCase()}
      </span>
    </div>
  );

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-4 sm:p-6 md:p-8">
      {/* Mobile Layout: Vertical Stack */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        {/* Profile Picture */}
        <div className="flex justify-center md:justify-start">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-lg overflow-hidden border-2 border-cyan-400/30 hover:border-cyan-400/60 transition-colors">
            {profile.profileImageUrl && !imageError ? (
              <img
                src={profile.profileImageUrl}
                alt={`${profile.username}'s profile`}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <DefaultAvatar />
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          {/* Username */}
          <h1 className="font-space-gothic text-2xl sm:text-3xl md:text-4xl text-cyan-400 mb-2 break-words">
            {profile.username}
          </h1>

          {/* Wallet Address */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 mb-3">
            <span className="font-mono text-sm sm:text-base text-gray-300">
              {shortenAddress(profile.publicKey)}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(profile.publicKey)}
                className="p-1.5 text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="Copy wallet address"
              >
                <Copy size={16} />
              </button>
              <a
                href={`https://explorer.solana.com/address/${profile.publicKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="View on Solana Explorer"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4 max-w-md mx-auto md:mx-0">
              {profile.bio}
            </p>
          )}

          {/* Edit Button - Only for profile owner */}
          {isOwner && (
            <Button
              onClick={onEditClick}
              variant="outline"
              className="w-full sm:w-auto bg-transparent border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/50"
            >
              <Edit3 size={16} className="mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}