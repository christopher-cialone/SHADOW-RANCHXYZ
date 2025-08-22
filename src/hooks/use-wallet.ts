import { useState, useEffect, useCallback } from 'react';

interface WalletState {
  connected: boolean;
  address: string | null;
  connecting: boolean;
}

// Phantom wallet interface
interface PhantomWallet {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: { toString(): string } }>;
  disconnect: () => Promise<void>;
  isConnected: boolean;
  publicKey: { toString(): string } | null;
  on: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
}

declare global {
  interface Window {
    solana?: PhantomWallet;
    phantom?: {
      solana?: PhantomWallet;
    };
  }
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    connected: false,
    address: null,
    connecting: false
  });

  // Get the wallet adapter (prioritize Phantom)
  const getWallet = useCallback((): PhantomWallet | null => {
    if (typeof window === 'undefined') return null;
    
    // Check for Phantom
    if (window.phantom?.solana?.isPhantom) {
      return window.phantom.solana;
    }
    
    // Fallback to generic solana object
    if (window.solana?.isPhantom) {
      return window.solana;
    }
    
    return null;
  }, []);

  // Check for existing connection on load
  useEffect(() => {
    const wallet = getWallet();
    if (wallet && wallet.isConnected && wallet.publicKey) {
      setState({
        connected: true,
        address: wallet.publicKey.toString(),
        connecting: false
      });
    }
  }, [getWallet]);

  const connect = async () => {
    const wallet = getWallet();
    
    if (!wallet) {
      throw new Error('No Solana wallet found. Please install Phantom wallet.');
    }

    setState(prev => ({ ...prev, connecting: true }));
    
    try {
      const response = await wallet.connect();
      const address = response.publicKey.toString();
      
      setState({
        connected: true,
        address,
        connecting: false
      });
      
      localStorage.setItem('wallet-connected', 'true');
      localStorage.setItem('wallet-address', address);
    } catch (error) {
      setState(prev => ({ ...prev, connecting: false }));
      throw error;
    }
  };

  const disconnect = useCallback(async () => {
    const wallet = getWallet();
    
    if (wallet && wallet.disconnect) {
      try {
        await wallet.disconnect();
      } catch (error) {
        console.warn('Error disconnecting wallet:', error);
      }
    }
    
    setState({
      connected: false,
      address: null,
      connecting: false
    });
    
    localStorage.removeItem('wallet-connected');
    localStorage.removeItem('wallet-address');
  }, [getWallet]);

  // Listen for wallet events
  useEffect(() => {
    const wallet = getWallet();
    if (!wallet) return;

    const handleAccountChanged = () => {
      if (wallet.publicKey) {
        setState(prev => ({
          ...prev,
          address: wallet.publicKey!.toString()
        }));
      } else {
        disconnect();
      }
    };

    wallet.on('accountChanged', handleAccountChanged);
    wallet.on('disconnect', disconnect);

    return () => {
      wallet.off('accountChanged', handleAccountChanged);
      wallet.off('disconnect', disconnect);
    };
  }, [getWallet, disconnect]);

  return {
    ...state,
    connect,
    disconnect,
    walletInstalled: !!getWallet()
  };
}
