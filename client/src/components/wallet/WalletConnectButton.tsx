import { useState } from 'react';
import { useWalletContext } from './WalletProvider';
import { TechButton } from '@/components/ui/TechButton';
import { TechCard } from '@/components/ui/TechCard';
import { useToast } from '@/hooks/use-toast';

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

export function WalletConnectButton() {
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
      <div className="flex items-center space-x-3">
        <div className="bg-tech-cyan-900/20 border border-tech-cyan-400/50 rounded-lg px-3 py-2">
          <span className="font-code text-tech-cyan-400 text-sm">
            {truncateAddress(address)}
          </span>
        </div>
        <TechButton
          variant="secondary"
          size="sm"
          onClick={handleDisconnect}
        >
          Disconnect
        </TechButton>
      </div>
    );
  }

  return (
    <>
      <TechButton
        variant="accent"
        onClick={() => setShowWalletModal(true)}
        disabled={connecting}
        className="min-w-[120px]"
      >
        {connecting ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-tech-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Connecting...</span>
          </div>
        ) : (
          'Connect Wallet'
        )}
      </TechButton>

      {/* Wallet Selection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <TechCard variant="cyan" className="w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-titulo text-xl text-tech-cyan-400">
                  Connect Wallet
                </h3>
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                >
                  ×
                </button>
              </div>

              <p className="text-gray-300 text-sm mb-6">
                Choose a wallet to connect to the Shadow Ranch. Your wallet is used to track progress and earn NFT rewards.
              </p>

              <div className="space-y-3">
                {availableWallets.map((wallet) => (
                  <button
                    key={wallet.adapter}
                    onClick={() => handleConnect(wallet.adapter)}
                    className="w-full flex items-center space-x-3 p-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-tech-cyan-400/50 rounded-lg transition-all duration-200"
                  >
                    <span className="text-2xl">{wallet.icon}</span>
                    <span className="font-tech text-white">{wallet.name}</span>
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Don't have a wallet? Visit{' '}
                <a
                  href="https://phantom.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tech-cyan-400 hover:underline"
                >
                  phantom.app
                </a>{' '}
                to get started.
              </p>
            </div>
          </TechCard>
        </div>
      )}
    </>
  );
}