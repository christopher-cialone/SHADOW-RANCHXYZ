import { Router } from 'express';
import { FirebaseProfileService } from '../firebase-admin';

const router = Router();

// Proxy route to get user profile via server-side Firebase Admin
router.get('/api/profile/:publicKey', async (req, res) => {
  try {
    const { publicKey } = req.params;
    
    if (!publicKey) {
      return res.status(400).json({ error: 'Public key is required' });
    }

    const profile = await FirebaseProfileService.getUserProfile(publicKey);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Proxy route to create user profile
router.post('/api/profile', async (req, res) => {
  try {
    const { publicKey, ...profileData } = req.body;
    
    if (!publicKey) {
      return res.status(400).json({ error: 'Public key is required' });
    }

    const profile = await FirebaseProfileService.createUserProfile(publicKey, profileData);
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Proxy route to update user profile
router.put('/api/profile/:publicKey', async (req, res) => {
  try {
    const { publicKey } = req.params;
    const updates = req.body;
    
    if (!publicKey) {
      return res.status(400).json({ error: 'Public key is required' });
    }

    await FirebaseProfileService.updateUserProfile(publicKey, updates);
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Proxy route to unlock badge
router.post('/api/profile/:publicKey/unlock-badge', async (req, res) => {
  try {
    const { publicKey } = req.params;
    const { badgeId } = req.body;
    
    if (!publicKey || !badgeId) {
      return res.status(400).json({ error: 'Public key and badge ID are required' });
    }

    await FirebaseProfileService.unlockBadge(publicKey, badgeId);
    res.json({ success: true });
  } catch (error) {
    console.error('Error unlocking badge:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;