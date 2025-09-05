import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { CodingChallengeLayout } from "@/components/lessons/CodingChallengeLayout";
import { TechCard } from "@/components/ui/TechCard";
import { CodeEditor } from "@/components/ui/CodeEditor";
import { NarrativeBox } from "@/components/lessons/NarrativeBox";
import { VisualFeedback } from "@/components/solana/VisualFeedback";
import { NftAchievementModal } from "@/components/solana/NftAchievementModal";
import { solanaChallenges } from "@/data/solana-challenges";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/use-wallet";
import { 
  SolanaService, 
  createConnection, 
  UserProgress,
  NFTMetadata 
} from "@/lib/solanaService";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { nftMetadata, getNFTMetadataByChallenge } from "@/data/nftMetadata";
import { mockUploader, UploadedMetadata } from "@/lib/mockUploader";

interface ChallengeProgress {
  currentChallenge: number;
  completedChallenges: Set<number>;
  code: string;
  badges: string[];
  nftTransactions: Map<number, string>; // challengeId -> transaction signature
}

export default function CodingChallengePage() {
  const [, params] = useRoute("/solana-challenges/:challengeId?");
  const challengeId = parseInt(params?.challengeId || "1");
  
  const [progress, setProgress] = useState<ChallengeProgress>({
    currentChallenge: 1,
    completedChallenges: new Set(),
    code: "",
    badges: [],
    nftTransactions: new Map()
  });
  
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilationResult, setCompilationResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [showVisualFeedback, setShowVisualFeedback] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [mintingNFT, setMintingNFT] = useState(false);
  const [lastMintedNFT, setLastMintedNFT] = useState<{
    metadata: UploadedMetadata;
    transactionSignature: string;
  } | null>(null);
  
  // Solana connection and service
  const { connected, address, connecting } = useWallet();
  const [solanaService, setSolanaService] = useState<SolanaService | null>(null);
  
  // Create a wallet adapter for Solana service
  const createWalletAdapter = () => {
    if (!connected || !address) return null;
    
    // Create a simple wallet adapter interface for SolanaService
    return {
      publicKey: new PublicKey(address),
      connected: true,
      signTransaction: async (transaction: Transaction) => {
        // This would normally use the actual wallet's signTransaction method
        // For now, we'll assume it's handled by the service
        throw new Error('Transaction signing not implemented in mock');
      },
      signAllTransactions: async (transactions: Transaction[]) => {
        throw new Error('Batch transaction signing not implemented in mock');
      }
    };
  };
  
  useEffect(() => {
    if (connected) {
      const connection = createConnection('localnet'); // Use env variable in production
      const service = new SolanaService(connection);
      setSolanaService(service);
    }
  }, [connected]);
  
  const { toast } = useToast();
  const currentChallenge = solanaChallenges.find(c => c.id === challengeId);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('solana-challenge-progress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      setProgress({
        ...parsed,
        completedChallenges: new Set(parsed.completedChallenges || []),
        nftTransactions: new Map(parsed.nftTransactions || [])
      });
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: ChallengeProgress) => {
    const toSave = {
      ...newProgress,
      completedChallenges: Array.from(newProgress.completedChallenges),
      nftTransactions: Array.from(newProgress.nftTransactions.entries())
    };
    localStorage.setItem('solana-challenge-progress', JSON.stringify(toSave));
    setProgress(newProgress);
  };

  // Initialize code when challenge changes
  useEffect(() => {
    if (currentChallenge) {
      setProgress(prev => ({
        ...prev,
        code: currentChallenge.initialCode,
        currentChallenge: challengeId
      }));
    }
  }, [challengeId, currentChallenge]);

  const handleCodeChange = (newCode: string) => {
    setProgress(prev => ({ ...prev, code: newCode }));
  };

  const validateCode = (code: string, challenge: typeof currentChallenge): boolean => {
    if (!challenge || !challenge.validationPattern) return false;
    return challenge.validationPattern.test(code);
  };

  /**
   * Handles NFT minting after successful challenge completion
   */
  const handleNFTMinting = async (challengeId: number) => {
    if (!connected || !address || !solanaService) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to mint achievement NFTs.",
        variant: "destructive"
      });
      return null;
    }

    const walletAdapter = createWalletAdapter();
    if (!walletAdapter) {
      console.error('Failed to create wallet adapter');
      return null;
    }

    const nftData = getNFTMetadataByChallenge(challengeId - 1); // challengeId is 1-indexed, array is 0-indexed
    if (!nftData) {
      console.error(`No NFT metadata found for challenge ${challengeId}`);
      return null;
    }

    try {
      setMintingNFT(true);
      
      toast({
        title: "Minting NFT Achievement",
        description: `Creating your ${nftData.name}...`,
        duration: 3000
      });

      // Step 1: Upload metadata to "decentralized" storage
      console.log(`📤 Uploading metadata for ${nftData.name}...`);
      const uploadedMetadata = await mockUploader.uploadMetadata(nftData);

      // Step 2: Mint the achievement NFT
      console.log(`🎨 Minting NFT with metadata URI: ${uploadedMetadata.uri}`);
      const nftMetadata: NFTMetadata = {
        title: nftData.name,
        symbol: nftData.symbol,
        uri: uploadedMetadata.uri,
        moduleId: Math.floor(challengeId / 3) // Group challenges into modules
      };

      const transactionSignature = await solanaService.mintAchievementNft(walletAdapter, nftMetadata);
      
      // Step 3: Store the transaction info
      setLastMintedNFT({
        metadata: uploadedMetadata,
        transactionSignature
      });

      toast({
        title: "NFT Minted Successfully! 🎉",
        description: `Your ${nftData.name} has been minted to your wallet.`,
        duration: 5000
      });

      console.log(`✅ NFT minted successfully!`);
      console.log(`Transaction: ${transactionSignature}`);
      console.log(`Metadata URI: ${uploadedMetadata.uri}`);
      
      return transactionSignature;
      
    } catch (error) {
      console.error('NFT minting failed:', error);
      toast({
        title: "NFT Minting Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred.",
        variant: "destructive",
        duration: 5000
      });
      return null;
    } finally {
      setMintingNFT(false);
    }
  };

  const handleCompile = async () => {
    if (!currentChallenge) return;

    setIsCompiling(true);
    setCompilationResult(null);

    // Simulate compilation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const isValid = validateCode(progress.code, currentChallenge);

    if (isValid) {
      // Success
      setCompilationResult({
        success: true,
        message: "Compilation successful! All tests passed."
      });

      // Show visual feedback
      setShowVisualFeedback(true);
      
      // After visual feedback, handle NFT minting and show achievement modal
      setTimeout(async () => {
        setShowVisualFeedback(false);
        
        // Mark challenge as completed
        const newCompletedChallenges = Array.from(progress.completedChallenges);
        newCompletedChallenges.push(challengeId);
        
        // Attempt to mint NFT if wallet is connected
        let transactionSignature: string | null = null;
        if (connected && address && solanaService) {
          transactionSignature = await handleNFTMinting(challengeId);
        }
        
        // Update progress with new completion and transaction
        const newNftTransactions = new Map(progress.nftTransactions);
        if (transactionSignature) {
          newNftTransactions.set(challengeId, transactionSignature);
        }
        
        const newProgress = {
          ...progress,
          completedChallenges: new Set(newCompletedChallenges),
          badges: [...progress.badges, currentChallenge.nftBadge],
          nftTransactions: newNftTransactions
        };
        saveProgress(newProgress);
        
        setShowAchievementModal(true);
      }, 3000);

    } else {
      // Failure
      setCompilationResult({
        success: false,
        message: "Compilation failed. Check your code and try again."
      });
      
      toast({
        title: "Compilation Failed",
        description: currentChallenge.hints?.[0] || "Review the task requirements.",
        variant: "destructive"
      });
    }

    setIsCompiling(false);
  };

  const handleNext = () => {
    if (challengeId < solanaChallenges.length) {
      window.location.href = `/solana-challenges/${challengeId + 1}`;
    }
  };

  const handlePrevious = () => {
    if (challengeId > 1) {
      window.location.href = `/solana-challenges/${challengeId - 1}`;
    }
  };

  const handleCloseModal = () => {
    setShowAchievementModal(false);
  };

  const handleContinue = () => {
    setShowAchievementModal(false);
    if (challengeId < solanaChallenges.length) {
      setTimeout(() => {
        window.location.href = `/solana-challenges/${challengeId + 1}`;
      }, 300);
    }
  };

  if (!currentChallenge) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <TechCard className="p-8 text-center">
          <span className="text-4xl mb-4 block">⚠️</span>
          <h2 className="font-space-gothic text-2xl text-gray-300 mb-4">CHALLENGE NOT FOUND</h2>
          <p className="font-code text-gray-400">The requested challenge could not be found.</p>
        </TechCard>
      </div>
    );
  }

  const canGoNext = progress.completedChallenges.has(challengeId);
  const hasPrevious = challengeId > 1;

  return (
    <>
      <CodingChallengeLayout
        title={currentChallenge.title}
        currentChallenge={challengeId}
        totalChallenges={solanaChallenges.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onCompile={handleCompile}
        canGoNext={canGoNext}
        hasPrevious={hasPrevious}
        isCompiling={isCompiling}
      >
        <div className="container mx-auto px-4 py-6 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Left Panel - Instructions */}
            <div className="lg:col-span-1">
              <TechCard variant="cyan" className="h-full">
                <div className="p-6 h-full overflow-y-auto">
                  <div className="mb-6">
                    <h2 className="font-space-gothic text-xl text-cyan-400 mb-4">
                      Challenge {challengeId}: {currentChallenge.title}
                    </h2>
                    
                    <NarrativeBox 
                      variant="story" 
                      icon="📖" 
                      title="The Story"
                      typewriter={true}
                      typewriterSpeed={30}
                    >
                      {currentChallenge.story}
                    </NarrativeBox>
                    
                    {currentChallenge.example && (
                      <div className="mb-6">
                        <NarrativeBox variant="info" icon="💡" title="The Example">
                          <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                            <code className="text-gray-200 font-mono">
                              {currentChallenge.example}
                            </code>
                          </pre>
                        </NarrativeBox>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <NarrativeBox variant="challenge" icon="🎯" title="Your Task">
                      {currentChallenge.task}
                    </NarrativeBox>
                  </div>

                  {/* Compilation Result */}
                  {compilationResult && (
                    <div className="mb-6">
                      <NarrativeBox 
                        variant={compilationResult.success ? "success" : "warning"}
                        icon={compilationResult.success ? "✅" : "❌"}
                        title={compilationResult.success ? "Success!" : "Error"}
                      >
                        {compilationResult.message}
                      </NarrativeBox>
                    </div>
                  )}

                  {/* Progress Indicator */}
                  <div className="mt-auto pt-4 border-t border-cyan-400/20">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>Progress</span>
                      <span>{progress.completedChallenges.size}/{solanaChallenges.length}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(progress.completedChallenges.size / solanaChallenges.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </TechCard>
            </div>

            {/* Center Panel - Code Editor */}
            <div className="lg:col-span-1">
              <TechCard variant="purple" className="h-full">
                <div className="p-4 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-tech text-lg text-purple-400 uppercase tracking-wider">
                      CODE EDITOR
                    </h3>
                    <div className="text-xs text-gray-400 font-code">
                      Rust • Anchor Framework
                    </div>
                  </div>
                  
                  <div className="flex-1 min-h-0">
                    <CodeEditor
                      value={progress.code}
                      onChange={handleCodeChange}
                      language="rust"
                      className="h-full"
                    />
                  </div>
                </div>
              </TechCard>
            </div>

            {/* Right Panel - Visual Feedback */}
            <div className="lg:col-span-1">
              <TechCard variant="cyan" className="h-full">
                <div className="p-6 h-full flex flex-col">
                  <h3 className="font-tech text-lg text-cyan-400 uppercase tracking-wider mb-4">
                    VISUAL FEEDBACK
                  </h3>
                  
                  <div className="flex-1 min-h-0">
                    {showVisualFeedback ? (
                      <VisualFeedback 
                        effect={currentChallenge.visualEffect}
                        isVisible={showVisualFeedback}
                        onComplete={() => setShowVisualFeedback(false)}
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🔧</div>
                          <p className="font-code text-sm">
                            Run "Compile & Test" to see<br />the magic happen!
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TechCard>
            </div>
          </div>
        </div>
      </CodingChallengeLayout>

      {/* Achievement Modal */}
      <NftAchievementModal
        isVisible={showAchievementModal}
        badge={currentChallenge.nftBadge}
        challengeTitle={currentChallenge.title}
        onContinue={handleContinue}
        onClose={handleCloseModal}
        // Pass additional NFT-related props
        nftMetadata={lastMintedNFT?.metadata}
        transactionSignature={lastMintedNFT?.transactionSignature}
        isWalletConnected={connected}
        isMinting={mintingNFT}
      />
    </>
  );
}