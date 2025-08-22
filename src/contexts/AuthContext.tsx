import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { initializeAuth, signInUser } from '../lib/firebase';
import { firestoreStorage } from '../lib/firestore-storage';

interface AuthContextType {
  user: User | null;
  userId: string | null;
  isAuthReady: boolean;
  firestoreStorage: typeof firestoreStorage;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = initializeAuth(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setUserId(firebaseUser.uid);
        
        // Create user document if it doesn't exist
        const existingUser = await firestoreStorage.getUser(firebaseUser.uid);
        if (!existingUser) {
          await firestoreStorage.createUser(firebaseUser.uid, {
            username: `User_${firebaseUser.uid.slice(0, 8)}`,
            password: '', // Not used for anonymous auth
            walletAddress: null,
            pfpUrl: null
          });
          
          // Create default ranch
          await firestoreStorage.createRanch(firebaseUser.uid, {
            name: "Shadow Ranch",
            coins: 100,
            experience: 0,
            level: 1
          });
        }
      } else {
        // Sign in anonymously if no user
        const newUser = await signInUser();
        if (newUser) {
          setUser(newUser);
          setUserId(newUser.uid);
        }
      }
      setIsAuthReady(true);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userId,
    isAuthReady,
    firestoreStorage
  };

  return (
    <AuthContext.Provider value={value}>
      {isAuthReady ? children : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-tech-purple-900 via-slate-900 to-tech-cyan-900">
          <div className="text-center">
            <div className="text-tech-cyan-400 text-4xl mb-4 animate-pulse">🤖</div>
            <div className="font-tech text-xl text-gray-300">Initializing Neural Network...</div>
            <div className="font-code text-sm text-gray-500 mt-2">Connecting to Firebase Database</div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}