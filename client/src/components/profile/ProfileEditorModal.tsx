import { useState, useRef } from "react";
import { X, Upload, Loader2, User, FileText } from "lucide-react";
import { UserProfile, updateUserProfile, uploadProfileImage } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface ProfileEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onProfileUpdate: (updatedProfile: Partial<UserProfile>) => void;
}

export function ProfileEditorModal({ 
  isOpen, 
  onClose, 
  profile, 
  onProfileUpdate 
}: ProfileEditorModalProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    username: profile.username,
    bio: profile.bio,
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!formData.username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    try {
      let profileImageUrl = profile.profileImageUrl;

      // Upload new image if selected (now using fixed Firebase)
      if (imageFile) {
        setIsUploading(true);
        profileImageUrl = await uploadProfileImage(
          imageFile,
          profile.publicKey,
          (progress) => setUploadProgress(progress)
        );
        setIsUploading(false);
      }

      // Update profile with Firebase
      const updates = {
        username: formData.username.trim(),
        bio: formData.bio.trim(),
        profileImageUrl,
      };

      await updateUserProfile(profile.publicKey, updates);
      
      // Update local state
      onProfileUpdate(updates);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
      
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: "Could not update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    if (isSaving || isUploading) return;
    
    // Reset form state
    setFormData({
      username: profile.username,
      bio: profile.bio,
    });
    setImageFile(null);
    setImagePreview(null);
    setUploadProgress(0);
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-cyan-400/30 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cyan-400/20">
          <h2 className="font-space-gothic text-xl text-cyan-400">Edit Profile</h2>
          <button
            onClick={handleClose}
            disabled={isSaving || isUploading}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Image Upload */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-300">Profile Picture</Label>
            
            <div className="flex flex-col items-center gap-4">
              {/* Image Preview */}
              <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-cyan-400/30">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : profile.profileImageUrl ? (
                  <img
                    src={profile.profileImageUrl}
                    alt="Current profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                    <User size={32} className="text-white" />
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                size="sm"
                disabled={isUploading || isSaving}
                className="bg-transparent border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
              >
                <Upload size={16} className="mr-2" />
                Choose Image
              </Button>

              {/* Upload Progress */}
              {isUploading && (
                <div className="w-full space-y-2">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-center text-gray-400">
                    Uploading... {Math.round(uploadProgress)}%
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-gray-300">
              Username
            </Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              placeholder="Enter your username"
              maxLength={50}
              disabled={isSaving || isUploading}
              className="bg-black/40 border-cyan-400/30 text-white placeholder:text-gray-500 focus:border-cyan-400/60"
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-medium text-gray-300">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself..."
              maxLength={500}
              rows={4}
              disabled={isSaving || isUploading}
              className="bg-black/40 border-cyan-400/30 text-white placeholder:text-gray-500 focus:border-cyan-400/60 resize-none"
            />
            <p className="text-xs text-gray-500 text-right">
              {formData.bio.length}/500
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-cyan-400/20">
          <Button
            onClick={handleClose}
            variant="outline"
            disabled={isSaving || isUploading}
            className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || isUploading || !formData.username.trim()}
            className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}