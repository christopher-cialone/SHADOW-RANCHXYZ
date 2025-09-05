/**
 * Mock Uploader Service for Shadow Ranch NFT Metadata
 * 
 * This service simulates uploading NFT metadata to decentralized storage
 * without requiring actual IPFS or Arweave setup. Perfect for development
 * and testing environments.
 */

import { NFTAchievementMetadata } from '../data/nftMetadata';

/**
 * Interface for the uploaded metadata response
 */
export interface UploadedMetadata {
  /** The fake decentralized URI where the metadata is "stored" */
  uri: string;
  /** The complete metadata object that was "uploaded" */
  metadata: NFTMetadataJSON;
  /** Timestamp of when the upload was simulated */
  uploadedAt: string;
  /** Simulated file size in bytes */
  size: number;
  /** Simulated content hash */
  hash: string;
}

/**
 * Standard NFT metadata JSON format
 */
export interface NFTMetadataJSON {
  name: string;
  symbol: string;
  description: string;
  image: string;
  external_url?: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  properties: {
    files: Array<{
      uri: string;
      type: string;
    }>;
    category: string;
    creators: Array<{
      address: string;
      share: number;
    }>;
  };
}

/**
 * Mock Uploader Service Class
 */
export class MockUploaderService {
  private readonly baseUrls = [
    'https://arweave.net',
    'https://ipfs.io/ipfs',
    'https://cloudflare-ipfs.com/ipfs',
    'https://gateway.pinata.cloud/ipfs'
  ];

  /**
   * Generates a fake hash for the metadata
   * @param data - The data to generate a hash for
   * @returns A fake hash string
   */
  private generateFakeHash(data: string): string {
    // Simple hash-like string generation for demonstration
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let hash = '';
    const dataLength = data.length;
    
    for (let i = 0; i < 44; i++) { // Typical hash length
      const index = (dataLength + i * 7) % chars.length;
      hash += chars[index];
    }
    
    return hash;
  }

  /**
   * Generates a fake decentralized URI
   * @param challengeId - The challenge ID for generating consistent URIs
   * @param hash - The content hash
   * @returns A fake decentralized storage URI
   */
  private generateFakeURI(challengeId: number, hash: string): string {
    const baseUrl = this.baseUrls[challengeId % this.baseUrls.length];
    return `${baseUrl}/${hash}`;
  }

  /**
   * Converts NFT achievement metadata to standard NFT JSON format
   * @param metadata - The Shadow Ranch NFT metadata
   * @param imageURI - The URI for the uploaded image
   * @returns Standard NFT metadata JSON
   */
  private formatMetadataJSON(metadata: NFTAchievementMetadata, imageURI: string): NFTMetadataJSON {
    return {
      name: metadata.name,
      symbol: metadata.symbol,
      description: metadata.description,
      image: imageURI,
      external_url: "https://shadow-ranch.xyz",
      attributes: [
        ...metadata.attributes,
        {
          trait_type: "Challenge ID",
          value: metadata.challengeId.toString()
        },
        {
          trait_type: "Collection",
          value: "Shadow Ranch Achievements"
        },
        {
          trait_type: "Rarity",
          value: this.getRarityByDifficulty(metadata.attributes.find(attr => attr.trait_type === "Difficulty")?.value || "Common")
        }
      ],
      properties: {
        files: [
          {
            uri: imageURI,
            type: "image/svg+xml"
          }
        ],
        category: "image",
        creators: [
          {
            address: "ShadowRanchDevTeam1234567890123456789012", // Fake address
            share: 100
          }
        ]
      }
    };
  }

  /**
   * Maps difficulty to rarity
   * @param difficulty - The difficulty level
   * @returns The rarity level
   */
  private getRarityByDifficulty(difficulty: string): string {
    const rarityMap: { [key: string]: string } = {
      "Beginner": "Common",
      "Intermediate": "Uncommon", 
      "Advanced": "Rare",
      "Expert": "Epic",
      "Master": "Legendary"
    };
    return rarityMap[difficulty] || "Common";
  }

  /**
   * Simulates uploading an image file to decentralized storage
   * @param imagePath - The local path to the image
   * @param challengeId - The challenge ID for consistent URI generation
   * @returns Promise resolving to a fake image URI
   */
  async uploadImage(imagePath: string, challengeId: number): Promise<string> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
    
    const imageData = `image_data_for_challenge_${challengeId}_${imagePath}`;
    const hash = this.generateFakeHash(imageData);
    return this.generateFakeURI(challengeId, hash);
  }

  /**
   * Simulates uploading NFT metadata to decentralized storage
   * @param metadata - The NFT achievement metadata to upload
   * @returns Promise resolving to the upload result with fake URI
   */
  async uploadMetadata(metadata: NFTAchievementMetadata): Promise<UploadedMetadata> {
    // Simulate network delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    try {
      // First "upload" the image
      const imageURI = await this.uploadImage(metadata.image, metadata.challengeId);
      
      // Create the standard NFT metadata JSON
      const metadataJSON = this.formatMetadataJSON(metadata, imageURI);
      
      // "Upload" the metadata JSON
      const metadataString = JSON.stringify(metadataJSON, null, 2);
      const hash = this.generateFakeHash(metadataString);
      const uri = this.generateFakeURI(metadata.challengeId, hash);
      
      // Calculate fake file size
      const size = new Blob([metadataString]).size;
      
      console.log(`✅ Mock Upload Complete for "${metadata.name}"`);
      console.log(`📄 Metadata URI: ${uri}`);
      console.log(`🖼️ Image URI: ${imageURI}`);
      console.log(`📊 Size: ${size} bytes`);
      
      return {
        uri,
        metadata: metadataJSON,
        uploadedAt: new Date().toISOString(),
        size,
        hash
      };
      
    } catch (error) {
      console.error(`❌ Mock upload failed for "${metadata.name}":`, error);
      throw new Error(`Failed to upload metadata for ${metadata.name}: ${error}`);
    }
  }

  /**
   * Simulates batch uploading multiple NFT metadata objects
   * @param metadataArray - Array of NFT metadata to upload
   * @returns Promise resolving to array of upload results
   */
  async uploadBatch(metadataArray: NFTAchievementMetadata[]): Promise<UploadedMetadata[]> {
    console.log(`🚀 Starting batch upload of ${metadataArray.length} NFT metadata files...`);
    
    const results: UploadedMetadata[] = [];
    
    for (let i = 0; i < metadataArray.length; i++) {
      const metadata = metadataArray[i];
      console.log(`📤 Uploading ${i + 1}/${metadataArray.length}: ${metadata.name}...`);
      
      try {
        const result = await this.uploadMetadata(metadata);
        results.push(result);
      } catch (error) {
        console.error(`❌ Failed to upload ${metadata.name}:`, error);
        throw error; // Stop batch on first failure
      }
    }
    
    console.log(`✅ Batch upload complete! ${results.length} files uploaded successfully.`);
    return results;
  }

  /**
   * Validates if a URI looks like a valid decentralized storage URI
   * @param uri - The URI to validate
   * @returns True if the URI appears valid
   */
  isValidDecentralizedURI(uri: string): boolean {
    const validPatterns = [
      /^https:\/\/arweave\.net\/[a-zA-Z0-9_-]+$/,
      /^https:\/\/ipfs\.io\/ipfs\/[a-zA-Z0-9]+$/,
      /^https:\/\/cloudflare-ipfs\.com\/ipfs\/[a-zA-Z0-9]+$/,
      /^https:\/\/gateway\.pinata\.cloud\/ipfs\/[a-zA-Z0-9]+$/
    ];
    
    return validPatterns.some(pattern => pattern.test(uri));
  }
}

/**
 * Default instance of the mock uploader service
 */
export const mockUploader = new MockUploaderService();

/**
 * Convenience function to upload a single NFT metadata
 * @param metadata - The NFT metadata to upload
 * @returns Promise resolving to the upload result
 */
export async function uploadMetadata(metadata: NFTAchievementMetadata): Promise<UploadedMetadata> {
  return mockUploader.uploadMetadata(metadata);
}

/**
 * Convenience function to upload multiple NFT metadata files
 * @param metadataArray - Array of NFT metadata to upload
 * @returns Promise resolving to array of upload results
 */
export async function uploadBatch(metadataArray: NFTAchievementMetadata[]): Promise<UploadedMetadata[]> {
  return mockUploader.uploadBatch(metadataArray);
}

export default MockUploaderService;