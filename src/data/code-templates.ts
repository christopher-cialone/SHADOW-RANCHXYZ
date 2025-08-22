// Enhanced V6 Interactive Ethos Implementation - Code Templates
export interface CodeTemplate {
  rust: string;
  python: string;
}

export const codeTemplates: Record<string, CodeTemplate> = {
  default: {
    rust: `use anchor_lang::prelude::*;

declare_id!("YourProgramID");

#[program]
pub mod shadow_ranch {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        // --- Your code goes here! ---
        // Type: get_network_status()
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}`,
    python: `import asyncio
from solana.rpc.async_api import AsyncClient

# Shadow Ranch Learning Environment
async def main():
    # Your code goes here
    
    pass

if __name__ == "__main__":
    asyncio.run(main())`
  },

  // NEW: Ethos Lesson Templates (Non-coding narrative lessons)
  ethos_lesson0_1: {
    rust: `// Module 0: The Digital Frontier's Code of Honor
// Step 1: Echoes from the Old World

/* 
   Welcome to Shadow Ranch!
   
   This is a narrative lesson about digital freedom foundations.
   No coding required - just reflection and understanding.
   
   Read the content, watch videos, and answer the quiz
   to demonstrate your grasp of cypherpunk principles.
*/

// Click 'Deploy' when ready to proceed`,
    python: `# Module 0: The Digital Frontier's Code of Honor
# Step 1: Echoes from the Old World

"""
Welcome to Shadow Ranch!

This is a narrative lesson about digital freedom foundations.
No coding required - just reflection and understanding.

Read the content, watch videos, and answer the quiz
to demonstrate your grasp of cypherpunk principles.
"""

# Click 'Deploy' when ready to proceed`
  },

  ethos_lesson0_2: {
    rust: `// Module 0: The Digital Frontier's Code of Honor
// Step 2: The Whispers of Rebellion - Rise of the Cypherpunks

/*
   The Cypherpunks emerged in the early 1990s as digital freedom fighters.
   
   Key figures:
   - Eric Hughes (Cypherpunk Manifesto)
   - Timothy C. May (Crypto Anarchist Manifesto)
   - John Gilmore ("The Net interprets censorship as damage")
   
   Core belief: Privacy through cryptography, not legislation.
*/

// Click 'Deploy' when ready to proceed`,
    python: `# Module 0: The Digital Frontier's Code of Honor
# Step 2: The Whispers of Rebellion - Rise of the Cypherpunks

"""
The Cypherpunks emerged in the early 1990s as digital freedom fighters.

Key figures:
- Eric Hughes (Cypherpunk Manifesto)
- Timothy C. May (Crypto Anarchist Manifesto)  
- John Gilmore ("The Net interprets censorship as damage")

Core belief: Privacy through cryptography, not legislation.
"""

# Click 'Deploy' when ready to proceed`
  },

  ethos_lesson1_1: {
    rust: `// Module 1: The Manifestos - Code is Law, Privacy is Power
// Step 1: The Cypherpunk Manifesto: Code, Not Trust

/*
   "Privacy is necessary for an open society in the electronic age.
   We cannot expect governments, corporations, or other large,
   faceless organizations to grant us privacy out of beneficence."
   
   - Eric Hughes, A Cypherpunk's Manifesto (1993)
   
   Key principles:
   - Code provides stronger guarantees than laws
   - Cryptography enables individual sovereignty
   - Privacy must be built into systems, not added later
*/

// Click 'Deploy' when ready to proceed`,
    python: `# Module 1: The Manifestos - Code is Law, Privacy is Power
# Step 1: The Cypherpunk Manifesto: Code, Not Trust

"""
"Privacy is necessary for an open society in the electronic age.
We cannot expect governments, corporations, or other large,
faceless organizations to grant us privacy out of beneficence."

- Eric Hughes, A Cypherpunk's Manifesto (1993)

Key principles:
- Code provides stronger guarantees than laws
- Cryptography enables individual sovereignty  
- Privacy must be built into systems, not added later
"""

# Click 'Deploy' when ready to proceed`
  },

  ethos_lesson1_2: {
    rust: `// Module 1: The Manifestos - Code is Law, Privacy is Power
// Step 2: The Crypto Anarchist Manifesto: Unstoppable Liberty

/*
   "Computer technology is on the verge of providing the ability
   for individuals and groups to communicate and interact with each
   other in a totally anonymous manner."
   
   - Timothy C. May, The Crypto Anarchist Manifesto (1988)
   
   Vision includes:
   - Anonymous digital cash systems
   - Reputation-based markets
   - Untraceable communication networks
   - Dissolution of traditional power structures
*/

// Click 'Deploy' when ready to proceed`,
    python: `# Module 1: The Manifestos - Code is Law, Privacy is Power
# Step 2: The Crypto Anarchist Manifesto: Unstoppable Liberty

"""
"Computer technology is on the verge of providing the ability
for individuals and groups to communicate and interact with each
other in a totally anonymous manner."

- Timothy C. May, The Crypto Anarchist Manifesto (1988)

Vision includes:
- Anonymous digital cash systems
- Reputation-based markets
- Untraceable communication networks
- Dissolution of traditional power structures
"""

# Click 'Deploy' when ready to proceed`
  },

  ethos_lesson2_1: {
    rust: `// Module 2: The Genesis Block - Bitcoin's Cypherpunk Legacy
// Step 1: The Fiat Chains - Why Bitcoin Was Born

/*
   Problems with Traditional Fiat Currency:
   
   1. Centralized Control
      - Central banks control money supply
      - Governments can freeze accounts
      - Single points of failure
   
   2. Inflation & Debasement
      - Money printing reduces purchasing power
      - Hidden tax on savers
      - Wealth transfer to asset holders
   
   3. Surveillance & Censorship
      - Every transaction monitored
      - Financial privacy eliminated
      - Transactions can be blocked
*/

// Click 'Deploy' when ready to proceed`,
    python: `# Module 2: The Genesis Block - Bitcoin's Cypherpunk Legacy
# Step 1: The Fiat Chains - Why Bitcoin Was Born

"""
Problems with Traditional Fiat Currency:

1. Centralized Control
   - Central banks control money supply
   - Governments can freeze accounts
   - Single points of failure

2. Inflation & Debasement
   - Money printing reduces purchasing power
   - Hidden tax on savers
   - Wealth transfer to asset holders

3. Surveillance & Censorship
   - Every transaction monitored
   - Financial privacy eliminated
   - Transactions can be blocked
"""

# Click 'Deploy' when ready to proceed`
  },

  ethos_lesson2_2: {
    rust: `// Module 2: The Genesis Block - Bitcoin's Cypherpunk Legacy
// Step 2: Bitcoin: A Peer-to-Peer Electronic Cash System

/*
   Bitcoin's Revolutionary Properties:
   
   1. Peer-to-Peer
      - Direct transactions without intermediaries
      - No central authority required
      - Global 24/7 availability
   
   2. Cryptographic Security
      - Private key ownership = control
      - Unforgeable digital signatures
      - Proof of work consensus
   
   3. Fixed Supply
      - 21 million bitcoin maximum
      - Predictable issuance schedule
      - Protection against inflation
*/

// Click 'Deploy' when ready to proceed`,
    python: `# Module 2: The Genesis Block - Bitcoin's Cypherpunk Legacy
# Step 2: Bitcoin: A Peer-to-Peer Electronic Cash System

"""
Bitcoin's Revolutionary Properties:

1. Peer-to-Peer
   - Direct transactions without intermediaries
   - No central authority required
   - Global 24/7 availability

2. Cryptographic Security
   - Private key ownership = control
   - Unforgeable digital signatures
   - Proof of work consensus

3. Fixed Supply
   - 21 million bitcoin maximum
   - Predictable issuance schedule
   - Protection against inflation
"""

# Click 'Deploy' when ready to proceed`
  },

  ethos_lesson2_3: {
    rust: `// Module 2: The Genesis Block - Bitcoin's Cypherpunk Legacy
// Step 3: The Blockchain: A Public, Immutable Ledger

/*
   Blockchain Innovation:
   
   1. Public Transparency
      - All transactions visible to everyone
      - Real-time audit capability
      - No hidden reserves or fractional banking
   
   2. Immutability
      - Past transactions cannot be altered
      - Cryptographic hash chain protection
      - Historical record preserved forever
   
   3. Decentralized Consensus
      - No single authority controls the ledger
      - Network participants validate transactions
      - Majority consensus determines truth
*/

// Click 'Deploy' when ready to proceed`,
    python: `# Module 2: The Genesis Block - Bitcoin's Cypherpunk Legacy
# Step 3: The Blockchain: A Public, Immutable Ledger

"""
Blockchain Innovation:

1. Public Transparency
   - All transactions visible to everyone
   - Real-time audit capability
   - No hidden reserves or fractional banking

2. Immutability
   - Past transactions cannot be altered
   - Cryptographic hash chain protection
   - Historical record preserved forever

3. Decentralized Consensus
   - No single authority controls the ledger
   - Network participants validate transactions
   - Majority consensus determines truth
"""

# Click 'Deploy' when ready to proceed`
  },

  ethos_lesson3_1: {
    rust: `// Module 3: The Crossroads - Web3's Path and Future
// Step 1: Ethereum & Smart Contracts: Expanding the Vision

/*
   Smart Contracts = Code is Law in Practice
   
   1. Self-Executing Agreements
      - Terms written directly in code
      - Automatic execution when conditions met
      - No need for trusted intermediaries
   
   2. Programmable Money
      - Beyond simple transactions
      - Complex financial instruments
      - Decentralized autonomous organizations
   
   3. Global Virtual Machine
      - World computer accessible to all
      - Permissionless innovation platform
      - Composable financial primitives
*/

// Click 'Deploy' when ready to proceed`,
    python: `# Module 3: The Crossroads - Web3's Path and Future
# Step 1: Ethereum & Smart Contracts: Expanding the Vision

"""
Smart Contracts = Code is Law in Practice

1. Self-Executing Agreements
   - Terms written directly in code
   - Automatic execution when conditions met
   - No need for trusted intermediaries

2. Programmable Money
   - Beyond simple transactions
   - Complex financial instruments
   - Decentralized autonomous organizations

3. Global Virtual Machine
   - World computer accessible to all
   - Permissionless innovation platform
   - Composable financial primitives
"""

# Click 'Deploy' when ready to proceed`
  },

  ethos_lesson3_2: {
    rust: `// Module 3: The Crossroads - Web3's Path and Future
// Step 2: The Rise of DeFi & NFTs: Promises and Perils

/*
   Web3 Growth & Challenges:
   
   Promises:
   - Decentralized Financial Services (DeFi)
   - True Digital Ownership (NFTs)
   - Permissionless Innovation
   - Global Financial Inclusion
   
   Perils:
   - Re-emergence of centralized services
   - Speculation over utility
   - Regulatory capture attempts
   - User experience barriers
   
   Challenge: Staying true to cypherpunk ideals while scaling
*/

// Click 'Deploy' when ready to proceed`,
    python: `# Module 3: The Crossroads - Web3's Path and Future
# Step 2: The Rise of DeFi & NFTs: Promises and Perils

"""
Web3 Growth & Challenges:

Promises:
- Decentralized Financial Services (DeFi)
- True Digital Ownership (NFTs)
- Permissionless Innovation
- Global Financial Inclusion

Perils:
- Re-emergence of centralized services
- Speculation over utility
- Regulatory capture attempts
- User experience barriers

Challenge: Staying true to cypherpunk ideals while scaling
"""

# Click 'Deploy' when ready to proceed`
  },

  ethos_lesson3_3: {
    rust: `// Module 3: The Crossroads - Web3's Path and Future
// Step 3: The Path Forward: Realigning with the Ethos

/*
   Your Mission as a Solana Developer:
   
   1. Build for Decentralization
      - Avoid single points of failure
      - Design for censorship resistance
      - Prioritize user sovereignty
   
   2. Protect Privacy
      - Implement privacy by design
      - Minimize data collection
      - Enable anonymous usage
   
   3. Foster Financial Freedom
      - Create permissionless systems
      - Reduce barriers to entry
      - Empower the unbanked
   
   Remember: Every line of code is a choice between freedom and control.
*/

// Click 'Deploy' when ready to continue to Solana coding lessons!`,
    python: `# Module 3: The Crossroads - Web3's Path and Future
# Step 3: The Path Forward: Realigning with the Ethos

"""
Your Mission as a Solana Developer:

1. Build for Decentralization
   - Avoid single points of failure
   - Design for censorship resistance
   - Prioritize user sovereignty

2. Protect Privacy
   - Implement privacy by design
   - Minimize data collection
   - Enable anonymous usage

3. Foster Financial Freedom
   - Create permissionless systems
   - Reduce barriers to entry
   - Empower the unbanked

Remember: Every line of code is a choice between freedom and control.
"""

# Click 'Deploy' when ready to continue to Solana coding lessons!`
  },

  // ORIGINAL Solana Lesson Templates
  ranch_management_initial: {
    rust: `use anchor_lang::prelude::*;

declare_id!("RanchManagementProgramID");

#[program]
pub mod ranch_management {
    use super::*;

    pub fn initialize_ranch(ctx: Context<InitializeRanch>) -> Result<()> {
        // Your code goes here - initialize ranch owner
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeRanch<'info> {
    #[account(init, payer = owner, space = 8 + 32)]
    pub ranch: Account<'info, Ranch>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Ranch {
    // Add owner field here
}`,
    python: `# Ranch Management System
import asyncio
from solana.publickey import PublicKey

class Ranch:
    def __init__(self):
        # Add owner field here
        pass

async def initialize_ranch(owner):
    # Your code goes here - initialize ranch owner
    pass

if __name__ == "__main__":
    asyncio.run(initialize_ranch(PublicKey("YourOwnerKey")))`
  },

  ranch_management_step1_complete: {
    rust: `use anchor_lang::prelude::*;

declare_id!("RanchManagementProgramID");

#[program]
pub mod ranch_management {
    use super::*;

    pub fn initialize_ranch(ctx: Context<InitializeRanch>) -> Result<()> {
        let ranch = &mut ctx.accounts.ranch;
        // Your code goes here - assign owner
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeRanch<'info> {
    #[account(init, payer = owner, space = 8 + 32)]
    pub ranch: Account<'info, Ranch>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Ranch {
    pub owner: Pubkey,
}`,
    python: `# Ranch Management System
import asyncio
from solana.publickey import PublicKey

class Ranch:
    def __init__(self):
        self.owner = None

async def initialize_ranch(owner):
    ranch = Ranch()
    # Your code goes here - assign owner
    return ranch

if __name__ == "__main__":
    asyncio.run(initialize_ranch(PublicKey("YourOwnerKey")))`
  },

  ranch_management_step2_complete: {
    rust: `use anchor_lang::prelude::*;

declare_id!("RanchManagementProgramID");

#[program]
pub mod ranch_management {
    use super::*;

    pub fn initialize_ranch(ctx: Context<InitializeRanch>) -> Result<()> {
        let ranch = &mut ctx.accounts.ranch;
        ranch.owner = ctx.accounts.owner.key();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeRanch<'info> {
    #[account(
        init, 
        payer = owner, 
        space = 8 + 32,
        // Add PDA seeds and bump here
    )]
    pub ranch: Account<'info, Ranch>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Ranch {
    pub owner: Pubkey,
}`,
    python: `# Ranch Management System with PDA
import asyncio
from solana.publickey import PublicKey

class Ranch:
    def __init__(self):
        self.owner = None

async def initialize_ranch(owner):
    ranch = Ranch()
    ranch.owner = owner.key()
    # Add PDA logic here
    return ranch

if __name__ == "__main__":
    asyncio.run(initialize_ranch(PublicKey("YourOwnerKey")))`
  },

  token_economics_initial: {
    rust: `use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};

declare_id!("TokenEconomicsProgramID");

#[program]
pub mod token_economics {
    use super::*;

    pub fn create_ranch_token(ctx: Context<CreateRanchToken>) -> Result<()> {
        // Your code goes here - create token mint
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateRanchToken<'info> {
    #[account(init, payer = authority, mint::decimals = 6, mint::authority = authority)]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}`,
    python: `# Token Economics System
import asyncio
from solana.publickey import PublicKey

async def create_ranch_token(authority):
    # Your code goes here - create token mint
    pass

if __name__ == "__main__":
    asyncio.run(create_ranch_token(PublicKey("YourAuthorityKey")))`
  }
};