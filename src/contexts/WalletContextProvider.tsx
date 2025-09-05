import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// Security: Use environment variables for RPC endpoints with fallbacks
const getSecureRpcEndpoint = (network: WalletAdapterNetwork): string => {
  switch (network) {
    case WalletAdapterNetwork.Devnet:
      return process.env.REACT_APP_DEVNET_RPC_URL || clusterApiUrl(network);
    case WalletAdapterNetwork.Mainnet:
      return process.env.REACT_APP_MAINNET_RPC_URL || clusterApiUrl(network);
    case WalletAdapterNetwork.Testnet:
      return process.env.REACT_APP_TESTNET_RPC_URL || clusterApiUrl(network);
    default:
      return clusterApiUrl(WalletAdapterNetwork.Devnet);
  }
};

export const WalletContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    // Security: Use environment variable for network selection with secure fallback
    const network = (process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => getSecureRpcEndpoint(network), [network]);

    // Security: Initialize wallet adapters with proper error handling and secure defaults
    const wallets = useMemo(
        () => {
            try {
                return [
                    new PhantomWalletAdapter(),
                    new SolflareWalletAdapter(),
                ];
            } catch (error) {
                console.error('Failed to initialize wallet adapters:', error);
                return [];
            }
        },
        [network]
    );

    return (
        <ConnectionProvider 
            endpoint={endpoint}
            config={{
                commitment: 'confirmed',
                wsEndpoint: undefined, // Security: Disable WebSocket for now
                confirmTransactionInitialTimeout: 60000,
            }}
        >
            <WalletProvider 
                wallets={wallets} 
                autoConnect={false} // Security: Disable auto-connect, require explicit user action
                onError={(error) => {
                    console.error('Wallet adapter error:', error);
                    // TODO: Add proper error reporting to monitoring service
                }}
            >
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};