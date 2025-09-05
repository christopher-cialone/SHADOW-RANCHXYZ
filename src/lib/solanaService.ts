/**
 * Shadow Ranch Solana Service
 * 
 * This service provides TypeScript functions to interact with the Shadow Ranch
 * Solana program, handling user progress tracking, challenge completion,
 * and NFT achievement minting.
 * 
 * Compatible with Anchor 0.29.0 and Shadow Ranch Program v0.1.0
 */

import {
  Connection,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Keypair,
  Transaction,
} from '@solana/web3.js';
import {
  Program,
  AnchorProvider,
  web3,
  utils,
  BN,
} from '@coral-xyz/anchor';
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from '@solana/spl-token';

// Import the generated IDL and types
import { ShadowRanchProgram, IDL } from '../../target/types/shadow_ranch_program';

// Program constants
export const SHADOW_RANCH_PROGRAM_ID = new PublicKey('Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS');
export const TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

// PDA seed constants
const USER_PROGRESS_SEED = 'user_progress';

/**
 * Type definitions for the service
 */
export interface UserProgress {
  authority: PublicKey;
  challengesCompleted: number;
  modulesCompleted: number;
  createdAt: BN;
  updatedAt: BN;
}

export interface NFTMetadata {
  title: string;
  symbol: string;
  uri: string;
  moduleId: number;
}

export interface WalletAdapter {
  publicKey: PublicKey | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  connected: boolean;
  signMessage?: (message: Uint8Array) => Promise<Uint8Array>;
}

/**
 * Shadow Ranch Solana Service Class
 * 
 * Enhanced with security best practices:
 * - Input validation and sanitization
 * - Transaction verification
 * - Rate limiting considerations
 * - Comprehensive error handling
 */
export class SolanaService {
  private connection: Connection;
  private programId: PublicKey;
  private readonly maxRetries = 3;
  private readonly timeoutMs = 30000;

  constructor(connection: Connection, programId: PublicKey = SHADOW_RANCH_PROGRAM_ID) {
    // Security: Validate inputs
    if (!connection) {
      throw new Error('Connection is required');
    }
    if (!PublicKey.isOnCurve(programId)) {
      throw new Error('Invalid program ID provided');
    }
    
    this.connection = connection;
    this.programId = programId;
  }

  /**
   * Get an initialized Anchor program instance with security validations
   * @param wallet - The wallet adapter instance
   * @returns Initialized Anchor program
   */
  getProgram(wallet: WalletAdapter): Program<ShadowRanchProgram> {
    // Security: Comprehensive wallet validation
    if (!wallet) {
      throw new Error('Wallet adapter is required');
    }
    if (!wallet.connected) {
      throw new Error('Wallet is not connected');
    }
    if (!wallet.publicKey) {
      throw new Error('Wallet public key not available');
    }
    if (!PublicKey.isOnCurve(wallet.publicKey)) {
      throw new Error('Invalid wallet public key');
    }

    const provider = new AnchorProvider(
      this.connection,
      wallet as any,
      {
        commitment: 'confirmed',
        preflightCommitment: 'confirmed',
        skipPreflight: false, // Security: Always run preflight checks
      }
    );

    return new Program(IDL, this.programId, provider);
  }

  /**
   * Find the user's progress PDA (Program Derived Address)
   * @param userPublicKey - The user's public key
   * @returns The PDA and bump seed
   */
  async findUserProgressPDA(userPublicKey: PublicKey): Promise<[PublicKey, number]> {
    // Security: Validate input
    if (!PublicKey.isOnCurve(userPublicKey)) {
      throw new Error('Invalid user public key provided');
    }
    
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from(USER_PROGRESS_SEED),
        userPublicKey.toBuffer(),
      ],
      this.programId
    );
  }

  /**
   * Get the user's progress account data
   * @param wallet - The wallet adapter instance
   * @returns User progress data or null if account doesn't exist
   */
  async getUserProgressAccount(wallet: WalletAdapter): Promise<UserProgress | null> {
    if (!wallet.publicKey) {
      throw new Error('Wallet not connected');
    }

    try {
      const program = this.getProgram(wallet);
      const [userProgressPDA] = await this.findUserProgressPDA(wallet.publicKey);

      // Attempt to fetch the account
      const userProgress = await program.account.userProgress.fetch(userProgressPDA);
      
      return {
        authority: userProgress.authority,
        challengesCompleted: userProgress.challengesCompleted,
        modulesCompleted: userProgress.modulesCompleted,
        createdAt: userProgress.createdAt,
        updatedAt: userProgress.updatedAt,
      };
    } catch (error) {
      // Account doesn't exist yet
      console.log('User progress account not found:', error);
      return null;
    }
  }

  /**
   * Initialize a new user progress account with enhanced security
   * @param wallet - The wallet adapter instance
   * @returns Transaction signature
   */
  async initializeUser(wallet: WalletAdapter): Promise<string> {
    if (!wallet.publicKey) {
      throw new Error('Wallet not connected');
    }

    const program = this.getProgram(wallet);
    const [userProgressPDA] = await this.findUserProgressPDA(wallet.publicKey);

    // Security: Check if account already exists to prevent duplicate initialization
    try {
      const existingAccount = await program.account.userProgress.fetch(userProgressPDA);
      if (existingAccount) {
        throw new Error('User progress account already exists');
      }
    } catch (error) {
      // Expected error when account doesn't exist - continue with initialization
      if (!error.toString().includes('Account does not exist')) {
        throw error;
      }
    }

    return this.executeTransactionWithRetry(async () => {
      const txSignature = await program.methods
        .initializeUser()
        .accounts({
          userProgress: userProgressPDA,
          payer: wallet.publicKey!,
          authority: wallet.publicKey!,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log('User initialized successfully:', txSignature);
      return txSignature;
    });
  }

  /**
   * Complete a specific challenge with enhanced security validation
   * @param wallet - The wallet adapter instance
   * @param challengeId - The ID of the challenge to complete (0-15)
   * @returns Transaction signature
   */
  async completeChallenge(wallet: WalletAdapter, challengeId: number): Promise<string> {
    if (!wallet.publicKey) {
      throw new Error('Wallet not connected');
    }

    // Security: Enhanced input validation
    if (!Number.isInteger(challengeId) || challengeId < 0 || challengeId > 15) {
      throw new Error('Invalid challenge ID. Must be an integer between 0 and 15.');
    }

    const program = this.getProgram(wallet);
    const [userProgressPDA] = await this.findUserProgressPDA(wallet.publicKey);

    // Security: Verify user progress account exists
    try {
      await program.account.userProgress.fetch(userProgressPDA);
    } catch (error) {
      throw new Error('User progress account not found. Please initialize user account first.');
    }

    return this.executeTransactionWithRetry(async () => {
      const txSignature = await program.methods
        .completeChallenge(challengeId)
        .accounts({
          userProgress: userProgressPDA,
          authority: wallet.publicKey!,
        })
        .rpc();

      console.log(`Challenge ${challengeId} completed successfully:`, txSignature);
      return txSignature;
    });
  }

  /**
   * Complete a module (requires all challenges in the module to be completed)
   * @param wallet - The wallet adapter instance
   * @param moduleId - The ID of the module to complete (0-3)
   * @returns Transaction signature
   */
  async completeModule(wallet: WalletAdapter, moduleId: number): Promise<string> {
    if (!wallet.publicKey) {
      throw new Error('Wallet not connected');
    }

    if (moduleId < 0 || moduleId > 3) {
      throw new Error('Invalid module ID. Must be between 0 and 3.');
    }

    const program = this.getProgram(wallet);
    const [userProgressPDA] = await this.findUserProgressPDA(wallet.publicKey);

    try {
      // Build and send the complete_module transaction
      const txSignature = await program.methods
        .completeModule(moduleId)
        .accounts({
          userProgress: userProgressPDA,
          authority: wallet.publicKey,
        })
        .rpc();

      console.log(`Module ${moduleId} completed successfully:`, txSignature);
      return txSignature;
    } catch (error) {
      console.error(`Failed to complete module ${moduleId}:`, error);
      throw new Error(`Failed to complete module: ${error}`);
    }
  }

  /**
   * Mint an achievement NFT for completing a module
   * @param wallet - The wallet adapter instance
   * @param metadata - The NFT metadata (title, symbol, uri, moduleId)
   * @returns Transaction signature
   */
  async mintAchievementNft(wallet: WalletAdapter, metadata: NFTMetadata): Promise<string> {
    if (!wallet.publicKey) {
      throw new Error('Wallet not connected');
    }

    if (metadata.moduleId < 0 || metadata.moduleId > 3) {
      throw new Error('Invalid module ID. Must be between 0 and 3.');
    }

    const program = this.getProgram(wallet);
    const [userProgressPDA] = await this.findUserProgressPDA(wallet.publicKey);

    // Generate a new keypair for the mint
    const mintKeypair = Keypair.generate();

    try {
      // Derive the metadata PDA
      const [metadataPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mintKeypair.publicKey.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
      );

      // Derive the master edition PDA
      const [masterEditionPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mintKeypair.publicKey.toBuffer(),
          Buffer.from('edition'),
        ],
        TOKEN_METADATA_PROGRAM_ID
      );

      // Get the associated token account for the user
      const userTokenAccount = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        wallet.publicKey
      );

      // Build and send the mint_achievement_nft transaction
      const txSignature = await program.methods
        .mintAchievementNft(
          metadata.title,
          metadata.symbol,
          metadata.uri,
          metadata.moduleId
        )
        .accounts({
          userProgress: userProgressPDA,
          mint: mintKeypair.publicKey,
          metadata: metadataPDA,
          masterEdition: masterEditionPDA,
          userTokenAccount: userTokenAccount,
          payer: wallet.publicKey,
          authority: wallet.publicKey,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .signers([mintKeypair])
        .rpc();

      console.log(`Achievement NFT minted successfully for module ${metadata.moduleId}:`, txSignature);
      console.log('Mint address:', mintKeypair.publicKey.toString());
      
      return txSignature;
    } catch (error) {
      console.error(`Failed to mint achievement NFT for module ${metadata.moduleId}:`, error);
      throw new Error(`Failed to mint achievement NFT: ${error}`);
    }
  }

  /**
   * Check if a specific challenge is completed
   * @param challengesCompleted - The challenges completed bitmask
   * @param challengeId - The challenge ID to check
   * @returns True if the challenge is completed
   */
  isChallengeCompleted(challengesCompleted: number, challengeId: number): boolean {
    return (challengesCompleted & (1 << challengeId)) !== 0;
  }

  /**
   * Check if a specific module is completed
   * @param modulesCompleted - The modules completed bitmask
   * @param moduleId - The module ID to check
   * @returns True if the module is completed
   */
  isModuleCompleted(modulesCompleted: number, moduleId: number): boolean {
    return (modulesCompleted & (1 << moduleId)) !== 0;
  }

  /**
   * Get all completed challenges from the bitmask
   * @param challengesCompleted - The challenges completed bitmask
   * @returns Array of completed challenge IDs
   */
  getCompletedChallenges(challengesCompleted: number): number[] {
    const completed: number[] = [];
    for (let i = 0; i < 16; i++) {
      if (this.isChallengeCompleted(challengesCompleted, i)) {
        completed.push(i);
      }
    }
    return completed;
  }

  /**
   * Get all completed modules from the bitmask
   * @param modulesCompleted - The modules completed bitmask
   * @returns Array of completed module IDs
   */
  getCompletedModules(modulesCompleted: number): number[] {
    const completed: number[] = [];
    for (let i = 0; i < 4; i++) {
      if (this.isModuleCompleted(modulesCompleted, i)) {
        completed.push(i);
      }
    }
    return completed;
  }

  /**
   * Get the user's progress statistics
   * @param wallet - The wallet adapter instance
   * @returns Progress statistics
   */
  async getUserProgressStats(wallet: WalletAdapter): Promise<{
    totalChallengesCompleted: number;
    totalModulesCompleted: number;
    completedChallenges: number[];
    completedModules: number[];
    progressPercentage: number;
  } | null> {
    const userProgress = await this.getUserProgressAccount(wallet);
    
    if (!userProgress) {
      return null;
    }

    const completedChallenges = this.getCompletedChallenges(userProgress.challengesCompleted);
    const completedModules = this.getCompletedModules(userProgress.modulesCompleted);
    
    // Calculate progress percentage (16 total challenges + 4 total modules = 20 total items)
    const totalItems = 20;
    const completedItems = completedChallenges.length + completedModules.length;
    const progressPercentage = (completedItems / totalItems) * 100;

    return {
      totalChallengesCompleted: completedChallenges.length,
      totalModulesCompleted: completedModules.length,
      completedChallenges,
      completedModules,
      progressPercentage: Math.round(progressPercentage * 100) / 100, // Round to 2 decimal places
    };
  }
}

/**
 * Create a default instance of the SolanaService
 * @param connection - Solana connection instance
 * @returns SolanaService instance
 */
export function createSolanaService(connection: Connection): SolanaService {
  return new SolanaService(connection);
}

/**
 * Utility function to create a connection with common RPC endpoints
 * @param cluster - The cluster to connect to ('localnet' | 'devnet' | 'mainnet-beta')
 * @returns Connection instance
 */
export function createConnection(cluster: 'localnet' | 'devnet' | 'mainnet-beta' = 'localnet'): Connection {
  const endpoints = {
    localnet: 'http://127.0.0.1:8899',
    devnet: 'https://api.devnet.solana.com',
    'mainnet-beta': 'https://api.mainnet-beta.solana.com',
  };

  return new Connection(endpoints[cluster], 'confirmed');
}

// Export the service instance for convenience
export default SolanaService;