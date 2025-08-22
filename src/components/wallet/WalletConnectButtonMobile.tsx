import { useState } from 'react';
import { useWalletContext } from './WalletProvider';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface WalletOption {
  name: string;
  icon: string;
  adapter: string;
}

const availableWallets: WalletOption[] = [
  { name: 'Phantom', icon: '👻', adapter: 'phantom' },
  { name: 'Solflare', icon: '🔥', adapter: 'solflare' },
  { name: 'Ledger', icon: '🔒', adapter: 'ledger' },
];

export function WalletConnectButtonMobile() {
  const { connected, address, connecting, connect, disconnect } = useWalletContext();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { toast } = useToast();

  const handleConnect = async (walletAdapter: string) => {
    try {
      setShowWalletModal(false);
      await connect();
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${walletAdapter}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  if (connected && address) {
    return (
      <div className="flex items-center space-x-2">
        <div className="bg-tech-cyan-900/20 border border-tech-cyan-400/50 rounded-lg px-2 py-1 sm:px-3 sm:py-2">
          <span className="font-mono text-tech-cyan-400 text-xs sm:text-sm">
            {truncateAddress(address)}
          </span>
        </div>
        <button
          onClick={handleDisconnect}
          className="btn-mobile-sm bg-tech-purple-600 hover:bg-tech-purple-500 text-white border border-tech-purple-500"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowWalletModal(true)}
        disabled={connecting}
        className={cn(
          "btn-mobile bg-gradient-to-r from-tech-purple-600 to-tech-purple-700 text-white border-2 border-tech-purple-500",
          connecting && "opacity-75 cursor-not-allowed"
        )}
      >
        {connecting ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="hidden sm:inline">Connecting...</span>
            <span className="sm:hidden">...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm1 10v-1a1 1 0 011-1h8a1 1 0 011 1v1H5zm10-4V6H5v4h10z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">Connect</span>
            <span className="sm:hidden">Connect</span>
          </div>
        )}
      </button>

      {/* Mobile-optimized wallet selection modal */}
      {showWalletModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50" 
            onClick={() => setShowWalletModal(false)}
          />
          <div className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-50">
            <div className="bg-gradient-to-b from-tech-purple-900 to-tech-purple-800 border-2 border-tech-cyan-400/50 rounded-xl p-6 max-w-sm mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-mono text-mobile-xl text-tech-cyan-400">
                  Connect Wallet
                </h3>
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="text-gray-400 hover:text-white transition-colors text-2xl w-8 h-8 flex items-center justify-center"
                >
                  ×
                </button>
              </div>

              <p className="text-gray-300 text-mobile-sm mb-6">
                Choose a wallet to connect to Shadow Ranch. Your wallet tracks progress and earns NFT rewards.
              </p>

              <div className="space-y-3">
                {availableWallets.map((wallet) => (
                  <button
                    key={wallet.adapter}
                    onClick={() => handleConnect(wallet.adapter)}
                    className="w-full flex items-center space-x-3 p-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-tech-cyan-400/50 rounded-lg transition-all duration-200 touch-target"
                  >
                    <span className="text-2xl">{wallet.icon}</span>
                    <span className="font-mono text-white text-mobile-lg">{wallet.name}</span>
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Don't have a wallet?{' '}
                <a
                  href="https://phantom.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tech-cyan-400 hover:underline"
                >
                  Get Phantom
                </a>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}