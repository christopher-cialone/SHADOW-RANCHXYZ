import { useState } from "react";
import { Zap, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { unlockBadge } from "@/lib/firebase";
import { useWallet } from "@/hooks/use-wallet";
import { useToast } from "@/hooks/use-toast";

export function SpeedTestButton() {
  const { address: connectedAddress, connected } = useWallet();
  const { toast } = useToast();
  const [testing, setTesting] = useState(false);

  const runSpeedTest = async () => {
    if (!connectedAddress || !connected) {
      toast({
        title: "No Wallet Connected",
        description: "Connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    setTesting(true);
    const startTime = performance.now();

    try {
      // Test Firebase badge unlock with new configuration
      await unlockBadge(connectedAddress, 'wallet-connected');
      
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);

      toast({
        title: "Firebase Connected!",
        description: `Badge unlocked in ${duration}ms - Firebase long-polling works!`,
      });
    } catch (error) {
      toast({
        title: "Connection Test Failed",
        description: "Firebase connectivity issue detected",
        variant: "destructive",
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <Button
      onClick={runSpeedTest}
      disabled={testing || !connected}
      variant="outline"
      size="sm"
      className="bg-transparent border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/50"
    >
      {testing ? (
        <>
          <Timer size={16} className="mr-2 animate-spin" />
          Testing...
        </>
      ) : (
        <>
          <Zap size={16} className="mr-2" />
          Firebase Test
        </>
      )}
    </Button>
  );
}