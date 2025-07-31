import { useWallet } from "@/hooks/use-wallet";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";

export function WalletTest() {
  const { connected, address, connecting, connect, disconnect, walletInstalled } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-br from-tech-purple-900 via-gray-900 to-tech-cyan-900 p-6">
      <div className="container mx-auto max-w-2xl">
        <TechCard variant="purple" className="p-8">
          <h1 className="font-data70 text-3xl text-tech-cyan-400 mb-8 text-center">
            Wallet Connection Test
          </h1>
          
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-tech-cyan-400 font-tech mb-2">Wallet Status:</h3>
              <div className="space-y-2 text-sm font-mono">
                <div>Wallet Installed: <span className={walletInstalled ? "text-green-400" : "text-red-400"}>
                  {walletInstalled ? "YES" : "NO"}
                </span></div>
                <div>Connected: <span className={connected ? "text-green-400" : "text-red-400"}>
                  {connected ? "YES" : "NO"}
                </span></div>
                <div>Connecting: <span className={connecting ? "text-yellow-400" : "text-gray-400"}>
                  {connecting ? "YES" : "NO"}
                </span></div>
                <div>Address: <span className="text-tech-cyan-400">
                  {address || "None"}
                </span></div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-tech-cyan-400 font-tech mb-2">What happens when you click Connect:</h3>
              <div className="text-sm text-gray-300 space-y-1">
                {!walletInstalled && <div>• Will show error and open Phantom website</div>}
                {walletInstalled && !connected && <div>• Will call window.phantom.solana.connect()</div>}
                {walletInstalled && !connected && <div>• Will request wallet approval</div>}
                {walletInstalled && !connected && <div>• Will show your real wallet address</div>}
                {connected && <div>• Will disconnect from wallet</div>}
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <TechButton
                onClick={connected ? disconnect : connect}
                disabled={connecting}
                variant={connected ? "secondary" : "accent"}
                className="min-w-[150px]"
              >
                {connecting ? "Connecting..." : connected ? "Disconnect" : "Connect Wallet"}
              </TechButton>
            </div>

            {!walletInstalled && (
              <div className="bg-red-900/20 border border-red-400 rounded-lg p-4">
                <h3 className="text-red-400 font-tech mb-2">No Wallet Detected</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Install Phantom wallet to test real Solana wallet connection.
                </p>
                <TechButton
                  onClick={() => window.open('https://phantom.app/', '_blank')}
                  variant="secondary"
                  size="sm"
                >
                  Install Phantom
                </TechButton>
              </div>
            )}
          </div>
        </TechCard>
      </div>
    </div>
  );
}