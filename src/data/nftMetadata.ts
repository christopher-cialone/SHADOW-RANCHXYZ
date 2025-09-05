/**
 * NFT Achievement Metadata Configuration
 * 
 * This file contains metadata for all 10 Shadow Ranch NFT achievement badges.
 * Each badge corresponds to a specific challenge completion in the curriculum.
 */

export interface NFTAchievementMetadata {
  /** The name of the NFT achievement */
  name: string;
  /** The symbol/ticker for the NFT */
  symbol: string;
  /** Detailed description of what this achievement represents */
  description: string;
  /** Path to the local SVG image file */
  image: string;
  /** The challenge ID this NFT corresponds to (0-9) */
  challengeId: number;
  /** Additional attributes for the NFT */
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

/**
 * Complete array of all Shadow Ranch NFT achievement metadata
 */
export const nftMetadata: NFTAchievementMetadata[] = [
  {
    name: "The Architect Badge",
    symbol: "ARCHITECT",
    description: "Awarded to developers who have mastered the fundamentals of Solana program architecture. This badge represents the successful completion of the first challenge in understanding blockchain program structure and initialization.",
    image: "/src/assets/nfts/architect-badge.svg",
    challengeId: 0,
    attributes: [
      { trait_type: "Category", value: "Foundation" },
      { trait_type: "Difficulty", value: "Beginner" },
      { trait_type: "Skill", value: "Program Architecture" },
      { trait_type: "Color Theme", value: "Green" }
    ]
  },
  {
    name: "First Contact Badge",
    symbol: "CONTACT",
    description: "Commemorates the first successful connection between a wallet and the Shadow Ranch dApp. This badge marks the beginning of your journey into decentralized application interaction.",
    image: "/src/assets/nfts/first-contact-badge.svg",
    challengeId: 1,
    attributes: [
      { trait_type: "Category", value: "Connection" },
      { trait_type: "Difficulty", value: "Beginner" },
      { trait_type: "Skill", value: "Wallet Integration" },
      { trait_type: "Color Theme", value: "Cyan" }
    ]
  },
  {
    name: "State Keeper Badge",
    symbol: "KEEPER",
    description: "Earned by mastering the art of reading and understanding blockchain state. This badge recognizes proficiency in querying on-chain data and understanding program account structures.",
    image: "/src/assets/nfts/state-keeper-badge.svg",
    challengeId: 2,
    attributes: [
      { trait_type: "Category", value: "Data Management" },
      { trait_type: "Difficulty", value: "Intermediate" },
      { trait_type: "Skill", value: "State Reading" },
      { trait_type: "Color Theme", value: "Orange" }
    ]
  },
  {
    name: "Chain Writer Badge",
    symbol: "WRITER",
    description: "Bestowed upon developers who can successfully write data to the blockchain. This achievement demonstrates understanding of transaction creation and on-chain state modification.",
    image: "/src/assets/nfts/chain-writer-badge.svg",
    challengeId: 3,
    attributes: [
      { trait_type: "Category", value: "Transaction" },
      { trait_type: "Difficulty", value: "Intermediate" },
      { trait_type: "Skill", value: "Chain Writing" },
      { trait_type: "Color Theme", value: "Yellow" }
    ]
  },
  {
    name: "State Modifier Badge",
    symbol: "MODIFIER",
    description: "Awarded to those who have learned to safely modify blockchain state through program instructions. This badge represents mastery of complex state transformations and data manipulation.",
    image: "/src/assets/nfts/state-modifier-badge.svg",
    challengeId: 4,
    attributes: [
      { trait_type: "Category", value: "State Management" },
      { trait_type: "Difficulty", value: "Advanced" },
      { trait_type: "Skill", value: "State Modification" },
      { trait_type: "Color Theme", value: "Magenta" }
    ]
  },
  {
    name: "Gatekeeper Badge",
    symbol: "GATEKEEPER",
    description: "Earned by implementing robust access control and security measures in smart contracts. This badge recognizes expertise in authorization patterns and secure program design.",
    image: "/src/assets/nfts/gatekeeper-badge.svg",
    challengeId: 5,
    attributes: [
      { trait_type: "Category", value: "Security" },
      { trait_type: "Difficulty", value: "Advanced" },
      { trait_type: "Skill", value: "Access Control" },
      { trait_type: "Color Theme", value: "Mint Green" }
    ]
  },
  {
    name: "Master of Puppets Badge",
    symbol: "PUPPETS",
    description: "The ultimate badge for developers who can orchestrate complex multi-program interactions and cross-program invocations. This represents mastery of the Solana ecosystem's composability.",
    image: "/src/assets/nfts/master-of-puppets-badge.svg",
    challengeId: 6,
    attributes: [
      { trait_type: "Category", value: "Integration" },
      { trait_type: "Difficulty", value: "Expert" },
      { trait_type: "Skill", value: "Cross-Program Invocation" },
      { trait_type: "Color Theme", value: "Purple" }
    ]
  },
  {
    name: "The Composer Badge",
    symbol: "COMPOSER",
    description: "Granted to developers who can elegantly compose complex program logic and create sophisticated instruction sequences. This badge celebrates algorithmic thinking and code artistry.",
    image: "/src/assets/nfts/composer-badge.svg",
    challengeId: 7,
    attributes: [
      { trait_type: "Category", value: "Logic Design" },
      { trait_type: "Difficulty", value: "Expert" },
      { trait_type: "Skill", value: "Complex Logic" },
      { trait_type: "Color Theme", value: "Orange" }
    ]
  },
  {
    name: "Toll Collector Badge",
    symbol: "TOLL",
    description: "Earned by implementing fee collection mechanisms and understanding the economics of blockchain transactions. This badge represents knowledge of tokenomics and value transfer.",
    image: "/src/assets/nfts/toll-collector-badge.svg",
    challengeId: 8,
    attributes: [
      { trait_type: "Category", value: "Economics" },
      { trait_type: "Difficulty", value: "Expert" },
      { trait_type: "Skill", value: "Fee Management" },
      { trait_type: "Color Theme", value: "Gold" }
    ]
  },
  {
    name: "The Debugger Badge",
    symbol: "DEBUGGER",
    description: "The final achievement for developers who have mastered the art of debugging blockchain programs and solving complex on-chain issues. This badge represents the pinnacle of Shadow Ranch mastery.",
    image: "/src/assets/nfts/debugger-badge.svg",
    challengeId: 9,
    attributes: [
      { trait_type: "Category", value: "Problem Solving" },
      { trait_type: "Difficulty", value: "Master" },
      { trait_type: "Skill", value: "Debugging" },
      { trait_type: "Color Theme", value: "Red" }
    ]
  }
];

/**
 * Helper function to get NFT metadata by challenge ID
 * @param challengeId - The challenge ID (0-9)
 * @returns The NFT metadata for the specified challenge, or undefined if not found
 */
export function getNFTMetadataByChallenge(challengeId: number): NFTAchievementMetadata | undefined {
  return nftMetadata.find(nft => nft.challengeId === challengeId);
}

/**
 * Helper function to get all NFT metadata as a map indexed by challenge ID
 * @returns Map of challenge ID to NFT metadata
 */
export function getNFTMetadataMap(): Map<number, NFTAchievementMetadata> {
  const map = new Map<number, NFTAchievementMetadata>();
  nftMetadata.forEach(nft => {
    map.set(nft.challengeId, nft);
  });
  return map;
}

/**
 * Helper function to validate if a challenge ID has associated NFT metadata
 * @param challengeId - The challenge ID to check
 * @returns True if the challenge has NFT metadata, false otherwise
 */
export function hasNFTForChallenge(challengeId: number): boolean {
  return nftMetadata.some(nft => nft.challengeId === challengeId);
}

export default nftMetadata;