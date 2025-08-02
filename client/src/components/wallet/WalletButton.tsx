import { useWallet } from "@/hooks/use-wallet";
import { formatWalletAddress, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function WalletButton() {
  const { connected, address, connecting, connect, disconnect, walletInstalled } = useWallet();
  const { toast } = useToast();

  const handleClick = async () => {
    if (connected) {
      disconnect();
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected from Shadow Ranch",
      });
    } else {
      if (!walletInstalled) {
        toast({
          title: "No Wallet Found",
          description: "Please install Phantom wallet to connect to Shadow Ranch",
          variant: "destructive",
        });
        window.open('https://phantom.app/', '_blank');
        return;
      }
      
      try {
        await connect();
        toast({
          title: "Wallet Connected",
          description: "Welcome to Shadow Ranch, partner!",
        });
      } catch (error: any) {
        toast({
          title: "Connection Failed",
          description: error.message || "Failed to connect wallet. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={connecting}
      className={cn(
        "btn-mobile rounded-lg font-mono text-mobile-sm sm:text-mobile-base transition-all duration-200 border-2",
        connected 
          ? "bg-gradient-to-r from-tech-cyan-600 to-tech-cyan-700 border-tech-cyan-500 text-white hover:from-tech-cyan-500 hover:to-tech-cyan-600" 
          : "bg-gradient-to-r from-tech-purple-600 to-tech-purple-700 border-tech-purple-500 text-white hover:from-tech-purple-500 hover:to-tech-purple-600",
        connecting && "opacity-75 cursor-not-allowed",
        "shadow-lg hover:shadow-xl active:scale-95"
      )}
    >
      <div className="flex items-center space-x-2">
        {connecting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span className="hidden sm:inline">Connecting...</span>
            <span className="sm:hidden">...</span>
          </>
        ) : connected ? (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-mono text-xs sm:text-sm">
              {formatWalletAddress(address)}
            </span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm1 10v-1a1 1 0 011-1h8a1 1 0 011 1v1H5zm10-4V6H5v4h10z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">Connect Wallet</span>
            <span className="sm:hidden">Connect</span>
          </>
        )}
      </div>
    </button>
  );
}
