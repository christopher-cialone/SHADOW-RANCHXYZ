/**
 * NFT Asset Manager for Shadow Ranch
 * 
 * Manages NFT achievement assets following the Mock/Production Decentralized Storage Standard
 * Supports both development (local assets) and production (IPFS/Arweave) deployment
 */

export interface NFTAssetMetadata {
  id: string;
  name: string;
  description: string;
  moduleId: number;
  localPath: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export interface UploadService {
  uploadAsset(file: File | string): Promise<string>;
  getAssetUrl(uri: string): string;
}

/**
 * Mock uploader service for development
 * Simulates IPFS/Arweave functionality with local assets
 */
export class MockUploaderService implements UploadService {
  async uploadAsset(localPath: string): Promise<string> {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Generate fake decentralized URI
    const hash = this.generateFakeHash(localPath);
    return `ipfs://${hash}`;
  }

  getAssetUrl(uri: string): string {
    if (uri.startsWith('ipfs://')) {
      // Convert IPFS URI to local development path
      const hash = uri.replace('ipfs://', '');
      return `/nft-achievements/${this.hashToLocalPath(hash)}`;
    }
    return uri;
  }

  private generateFakeHash(path: string): string {
    // Generate deterministic fake hash for development
    let hash = 0;
    for (let i = 0; i < path.length; i++) {
      const char = path.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return `Qm${Math.abs(hash).toString(36)}${'0'.repeat(20)}`.substr(0, 46);
  }

  private hashToLocalPath(hash: string): string {
    // Map hash back to local path for development
    const pathMap: { [key: string]: string } = {
      // Module 0 - Solana Fundamentals
      'QmFoundationsExplorer': 'module-0/foundations-explorer.png',
      'QmAccountMaster': 'module-0/account-master.png',
      'QmTransactionWizard': 'module-0/transaction-wizard.png',
      'QmPDAScholar': 'module-0/pda-scholar.png',
      
      // Module 1 - Program Development
      'QmRustRanger': 'module-1/rust-ranger.png',
      'QmAnchorAce': 'module-1/anchor-ace.png',
      'QmInstructionMaster': 'module-1/instruction-master.png',
      'QmSecuritySheriff': 'module-1/security-sheriff.png',
      
      // Module 2 - Advanced Concepts
      'QmCPICommander': 'module-2/cpi-commander.png',
      'QmTokenTycoon': 'module-2/token-tycoon.png',
      'QmNFTArtisan': 'module-2/nft-artisan.png',
      'QmDeploymentMaster': 'module-2/deployment-master.png',
      
      // Module 3 - Ecosystem Integration
      'QmDappDeveloper': 'module-3/dapp-developer.png',
      'QmWalletWrangler': 'module-3/wallet-wrangler.png',
      'QmFrontendFrontier': 'module-3/frontend-frontier.png',
      'QmSolanaSpecialist': 'module-3/solana-specialist.png',
    };
    
    return pathMap[hash.substr(0, 16)] || 'placeholder.png';
  }
}

/**
 * Production uploader service for IPFS/Arweave
 */
export class ProductionUploaderService implements UploadService {
  private apiKey: string;
  private gateway: string;

  constructor(apiKey?: string, gateway?: string) {
    this.apiKey = apiKey || process.env.REACT_APP_NFT_STORAGE_API_KEY || '';
    this.gateway = gateway || process.env.REACT_APP_IPFS_GATEWAY || 'https://gateway.pinata.cloud/ipfs/';
  }

  async uploadAsset(file: File | string): Promise<string> {
    // TODO: Implement actual IPFS/Arweave upload
    // This would use services like NFT.Storage, Pinata, or Arweave
    throw new Error('Production upload not yet implemented');
  }

  getAssetUrl(uri: string): string {
    if (uri.startsWith('ipfs://')) {
      const hash = uri.replace('ipfs://', '');
      return `${this.gateway}${hash}`;
    }
    if (uri.startsWith('ar://')) {
      const txId = uri.replace('ar://', '');
      return `https://arweave.net/${txId}`;
    }
    return uri;
  }
}

/**
 * NFT Asset Manager - Main class for managing achievement assets
 */
export class NFTAssetManager {
  private uploader: UploadService;
  private assets: Map<string, NFTAssetMetadata> = new Map();

  constructor(isDevelopment: boolean = process.env.NODE_ENV === 'development') {
    this.uploader = isDevelopment 
      ? new MockUploaderService()
      : new ProductionUploaderService();
    
    this.initializeAssets();
  }

  private initializeAssets(): void {
    const assetDefinitions: NFTAssetMetadata[] = [
      // Module 0 - Solana Fundamentals
      {
        id: 'foundations-explorer',
        name: 'Foundations Explorer',
        description: 'Mastered the fundamentals of Solana blockchain architecture',
        moduleId: 0,
        localPath: 'module-0/foundations-explorer.png',
        attributes: [
          { trait_type: 'Module', value: 'Solana Fundamentals' },
          { trait_type: 'Difficulty', value: 'Beginner' },
          { trait_type: 'Rarity', value: 'Common' }
        ]
      },
      {
        id: 'account-master',
        name: 'Account Master',
        description: 'Demonstrated expertise in Solana account management',
        moduleId: 0,
        localPath: 'module-0/account-master.png',
        attributes: [
          { trait_type: 'Module', value: 'Solana Fundamentals' },
          { trait_type: 'Skill', value: 'Account Management' },
          { trait_type: 'Rarity', value: 'Common' }
        ]
      },
      {
        id: 'transaction-wizard',
        name: 'Transaction Wizard',
        description: 'Mastered transaction creation and execution on Solana',
        moduleId: 0,
        localPath: 'module-0/transaction-wizard.png',
        attributes: [
          { trait_type: 'Module', value: 'Solana Fundamentals' },
          { trait_type: 'Skill', value: 'Transactions' },
          { trait_type: 'Rarity', value: 'Uncommon' }
        ]
      },
      {
        id: 'pda-scholar',
        name: 'PDA Scholar',
        description: 'Expert in Program Derived Address patterns and security',
        moduleId: 0,
        localPath: 'module-0/pda-scholar.png',
        attributes: [
          { trait_type: 'Module', value: 'Solana Fundamentals' },
          { trait_type: 'Skill', value: 'PDA Management' },
          { trait_type: 'Rarity', value: 'Rare' }
        ]
      },

      // Module 1 - Program Development
      {
        id: 'rust-ranger',
        name: 'Rust Ranger',
        description: 'Proficient in Rust programming for Solana development',
        moduleId: 1,
        localPath: 'module-1/rust-ranger.png',
        attributes: [
          { trait_type: 'Module', value: 'Program Development' },
          { trait_type: 'Language', value: 'Rust' },
          { trait_type: 'Rarity', value: 'Common' }
        ]
      },
      {
        id: 'anchor-ace',
        name: 'Anchor Ace',
        description: 'Master of the Anchor framework for Solana programs',
        moduleId: 1,
        localPath: 'module-1/anchor-ace.png',
        attributes: [
          { trait_type: 'Module', value: 'Program Development' },
          { trait_type: 'Framework', value: 'Anchor' },
          { trait_type: 'Rarity', value: 'Uncommon' }
        ]
      },
      {
        id: 'instruction-master',
        name: 'Instruction Master',
        description: 'Expert in designing and implementing program instructions',
        moduleId: 1,
        localPath: 'module-1/instruction-master.png',
        attributes: [
          { trait_type: 'Module', value: 'Program Development' },
          { trait_type: 'Skill', value: 'Instruction Design' },
          { trait_type: 'Rarity', value: 'Rare' }
        ]
      },
      {
        id: 'security-sheriff',
        name: 'Security Sheriff',
        description: 'Guardian of secure Solana program practices',
        moduleId: 1,
        localPath: 'module-1/security-sheriff.png',
        attributes: [
          { trait_type: 'Module', value: 'Program Development' },
          { trait_type: 'Skill', value: 'Security' },
          { trait_type: 'Rarity', value: 'Epic' }
        ]
      },

      // Module 2 - Advanced Concepts
      {
        id: 'cpi-commander',
        name: 'CPI Commander',
        description: 'Master of Cross-Program Invocations and program composition',
        moduleId: 2,
        localPath: 'module-2/cpi-commander.png',
        attributes: [
          { trait_type: 'Module', value: 'Advanced Concepts' },
          { trait_type: 'Skill', value: 'CPI' },
          { trait_type: 'Rarity', value: 'Rare' }
        ]
      },
      {
        id: 'token-tycoon',
        name: 'Token Tycoon',
        description: 'Expert in SPL Token creation and management',
        moduleId: 2,
        localPath: 'module-2/token-tycoon.png',
        attributes: [
          { trait_type: 'Module', value: 'Advanced Concepts' },
          { trait_type: 'Skill', value: 'SPL Tokens' },
          { trait_type: 'Rarity', value: 'Uncommon' }
        ]
      },
      {
        id: 'nft-artisan',
        name: 'NFT Artisan',
        description: 'Creator of unique NFTs using Metaplex standards',
        moduleId: 2,
        localPath: 'module-2/nft-artisan.png',
        attributes: [
          { trait_type: 'Module', value: 'Advanced Concepts' },
          { trait_type: 'Skill', value: 'NFT Creation' },
          { trait_type: 'Rarity', value: 'Epic' }
        ]
      },
      {
        id: 'deployment-master',
        name: 'Deployment Master',
        description: 'Expert in deploying and upgrading Solana programs',
        moduleId: 2,
        localPath: 'module-2/deployment-master.png',
        attributes: [
          { trait_type: 'Module', value: 'Advanced Concepts' },
          { trait_type: 'Skill', value: 'Deployment' },
          { trait_type: 'Rarity', value: 'Legendary' }
        ]
      },

      // Module 3 - Ecosystem Integration
      {
        id: 'dapp-developer',
        name: 'dApp Developer',
        description: 'Full-stack Solana decentralized application developer',
        moduleId: 3,
        localPath: 'module-3/dapp-developer.png',
        attributes: [
          { trait_type: 'Module', value: 'Ecosystem Integration' },
          { trait_type: 'Skill', value: 'dApp Development' },
          { trait_type: 'Rarity', value: 'Epic' }
        ]
      },
      {
        id: 'wallet-wrangler',
        name: 'Wallet Wrangler',
        description: 'Master of wallet integration and user experience',
        moduleId: 3,
        localPath: 'module-3/wallet-wrangler.png',
        attributes: [
          { trait_type: 'Module', value: 'Ecosystem Integration' },
          { trait_type: 'Skill', value: 'Wallet Integration' },
          { trait_type: 'Rarity', value: 'Rare' }
        ]
      },
      {
        id: 'frontend-frontier',
        name: 'Frontend Frontier',
        description: 'Pioneer of seamless blockchain-frontend integration',
        moduleId: 3,
        localPath: 'module-3/frontend-frontier.png',
        attributes: [
          { trait_type: 'Module', value: 'Ecosystem Integration' },
          { trait_type: 'Skill', value: 'Frontend Integration' },
          { trait_type: 'Rarity', value: 'Uncommon' }
        ]
      },
      {
        id: 'solana-specialist',
        name: 'Solana Specialist',
        description: 'Ultimate master of the Solana ecosystem - the final achievement',
        moduleId: 3,
        localPath: 'module-3/solana-specialist.png',
        attributes: [
          { trait_type: 'Module', value: 'Ecosystem Integration' },
          { trait_type: 'Achievement', value: 'Final Mastery' },
          { trait_type: 'Rarity', value: 'Legendary' }
        ]
      }
    ];

    assetDefinitions.forEach(asset => {
      this.assets.set(asset.id, asset);
    });
  }

  /**
   * Get asset metadata by ID
   */
  getAssetMetadata(assetId: string): NFTAssetMetadata | undefined {
    return this.assets.get(assetId);
  }

  /**
   * Get all assets for a specific module
   */
  getModuleAssets(moduleId: number): NFTAssetMetadata[] {
    return Array.from(this.assets.values()).filter(asset => asset.moduleId === moduleId);
  }

  /**
   * Get the public URL for an asset
   */
  getAssetUrl(assetId: string): string {
    const asset = this.assets.get(assetId);
    if (!asset) return '';

    // For development, use local public path
    return `/nft-achievements/${asset.localPath}`;
  }

  /**
   * Upload asset and get decentralized URI
   */
  async uploadAsset(assetId: string): Promise<string> {
    const asset = this.assets.get(assetId);
    if (!asset) throw new Error(`Asset not found: ${assetId}`);

    return await this.uploader.uploadAsset(asset.localPath);
  }

  /**
   * Generate complete NFT metadata for minting
   */
  async generateNFTMetadata(assetId: string): Promise<{
    name: string;
    symbol: string;
    description: string;
    image: string;
    attributes: Array<{ trait_type: string; value: string | number; }>;
    properties: {
      files: Array<{ uri: string; type: string; }>;
      category: string;
      creators: Array<{ address: string; share: number; }>;
    };
  }> {
    const asset = this.assets.get(assetId);
    if (!asset) throw new Error(`Asset not found: ${assetId}`);

    const imageUri = await this.uploadAsset(assetId);

    return {
      name: asset.name,
      symbol: 'SHADOW',
      description: asset.description,
      image: imageUri,
      attributes: asset.attributes,
      properties: {
        files: [
          {
            uri: imageUri,
            type: 'image/png'
          }
        ],
        category: 'image',
        creators: [
          {
            address: 'ShadowRanchXYZ', // This should be replaced with actual creator address
            share: 100
          }
        ]
      }
    };
  }

  /**
   * Get all available assets
   */
  getAllAssets(): NFTAssetMetadata[] {
    return Array.from(this.assets.values());
  }
}

// Export singleton instance
export const nftAssetManager = new NFTAssetManager();