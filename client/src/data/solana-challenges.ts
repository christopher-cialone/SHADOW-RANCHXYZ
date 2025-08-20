// Solana coding challenge data structure
export interface SolanaChallenge {
  id: number;
  title: string;
  reading: string;
  task: string;
  visualEffect: string;
  nftBadge: string;
  initialCode: string;
  expectedCode?: string;
  validationPattern?: RegExp;
  hints?: string[];
}

export const solanaChallenges: SolanaChallenge[] = [
  {
    id: 1,
    title: "The Genesis Program",
    reading: "Every structure begins with a foundation. In Solana, that foundation is the program declaration itself. Like claiming your digital homestead on the blockchain frontier, you must first announce your program's identity to the world.",
    task: "Change the `#[program]` name from `genesis` to `my_chyron`",
    visualEffect: "blueprint",
    nftBadge: "The Architect",
    initialCode: `use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod genesis {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Genesis Program Initialized!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}`,
    validationPattern: /pub\s+mod\s+my_chyron/,
    hints: [
      "Look for the #[program] declaration",
      "Change 'genesis' to 'my_chyron' after 'pub mod'",
      "Keep the rest of the structure the same"
    ]
  },
  {
    id: 2,
    title: "The First Instruction",
    reading: "A program is useless without instructions to guide it. Just as a frontier town needs its first laws, your program needs its first meaningful instruction. This instruction will announce your program's awakening to the Solana network.",
    task: "Define the `initialize` function with `msg!(\"Chyron Initialized!\");`",
    visualEffect: "initialize_button",
    nftBadge: "First Contact",
    initialCode: `use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod my_chyron {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        // Add your message here
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}`,
    validationPattern: /msg!\("Chyron Initialized!"\)/,
    hints: [
      "Use the msg! macro to log a message",
      "The message should be exactly 'Chyron Initialized!'",
      "Place it inside the initialize function"
    ]
  },
  {
    id: 3,
    title: "State & Accounts",
    reading: "Programs themselves don't store data - they're like judges who make decisions but don't keep permanent records. For persistence, we need accounts. Think of accounts as ledger books where your program's state lives forever on the blockchain.",
    task: "Define the `#[account]` struct with a `message: String` field",
    visualEffect: "data_flow",
    nftBadge: "State Keeper",
    initialCode: `use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod my_chyron {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Chyron Initialized!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

// Define your account structure here`,
    validationPattern: /#\[account\][\s\S]*pub struct[\s\S]*message:\s*String/m,
    hints: [
      "Use the #[account] attribute above a struct",
      "Name the struct something like 'ChyronAccount'",
      "Add a message field of type String"
    ]
  },
  {
    id: 4,
    title: "Writing to the Chain",
    reading: "Now, let's connect our instruction to our account. This is where the magic happens - we'll write our first piece of data permanently to the Solana blockchain. Like carving your initials in stone, this data will persist forever.",
    task: "Modify the `Initialize` context to `init` the account and set the message to \"Hello, World!\"",
    visualEffect: "chain_write",
    nftBadge: "Chain Writer",
    initialCode: `use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod my_chyron {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Chyron Initialized!");
        // Set the account message here
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {
    // Add account initialization here
}

#[account]
pub struct ChyronAccount {
    pub message: String,
}`,
    validationPattern: /ctx\.accounts\.[\w_]+\.message\s*=\s*"Hello, World!"/,
    hints: [
      "Use #[init] on an account field in the Initialize struct",
      "Set the message field: ctx.accounts.account_name.message = \"Hello, World!\"",
      "Don't forget to add payer and system_program to the Initialize struct"
    ]
  },
  {
    id: 5,
    title: "Creating a Custom Instruction",
    reading: "An on-screen display isn't very useful if you can't update what it shows. Time to build our second instruction - one that can modify the message after initialization. This is where your program becomes truly interactive.",
    task: "Create the `update_message` instruction function",
    visualEffect: "update_button",
    nftBadge: "State Modifier",
    initialCode: `use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod my_chyron {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Chyron Initialized!");
        ctx.accounts.chyron.message = "Hello, World!".to_string();
        Ok(())
    }

    // Add your update_message function here
}

#[derive(Accounts)]
pub struct Initialize {
    #[account(init, payer = payer, space = 8 + 200)]
    pub chyron: Account<'info, ChyronAccount>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct ChyronAccount {
    pub message: String,
}`,
    validationPattern: /pub fn update_message.*Context<UpdateMessage>.*Result<\(\)>/m,
    hints: [
      "Create a new function called update_message",
      "It should take a Context<UpdateMessage> parameter",
      "Don't forget to create the UpdateMessage accounts struct",
      "The function should modify the chyron account's message"
    ]
  },
  {
    id: 6,
    title: "Access Control & Signers",
    reading: "We have a problem. Right now, *anyone* can call our update function and change our message. In the Wild West of blockchain, we need to establish who has the authority to make changes. Time to add some security to our digital homestead.",
    task: "Add an `authority: Pubkey` to the account and `has_one = authority` constraint",
    visualEffect: "access_control",
    nftBadge: "Gatekeeper",
    initialCode: `use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod my_chyron {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Chyron Initialized!");
        let chyron = &mut ctx.accounts.chyron;
        chyron.message = "Hello, World!".to_string();
        // Set the authority here
        Ok(())
    }

    pub fn update_message(ctx: Context<UpdateMessage>, new_message: String) -> Result<()> {
        let chyron = &mut ctx.accounts.chyron;
        chyron.message = new_message;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {
    #[account(init, payer = payer, space = 8 + 32 + 200)]
    pub chyron: Account<'info, ChyronAccount>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateMessage {
    #[account(mut)]
    pub chyron: Account<'info, ChyronAccount>,
    pub authority: Signer<'info>,
}

#[account]
pub struct ChyronAccount {
    pub message: String,
    // Add authority field here
}`,
    validationPattern: /authority:\s*Pubkey[\s\S]*has_one\s*=\s*authority/m,
    hints: [
      "Add 'pub authority: Pubkey' to the ChyronAccount struct",
      "Set authority in initialize: chyron.authority = ctx.accounts.payer.key()",
      "Add has_one = authority constraint to the UpdateMessage chyron account"
    ]
  },
  {
    id: 7,
    title: "Program Derived Addresses (PDAs)",
    reading: "**Program Derived Addresses**, or PDAs, are powerful. They're accounts that your program can control without needing a private key. Think of them as robot assistants that your program can command. Let's create a PDA that your program owns.",
    task: "Create an instruction to initialize a PDA using `seeds` and a `bump`",
    visualEffect: "pda_creation",
    nftBadge: "Master of Puppets",
    initialCode: `use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod my_chyron {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Chyron Initialized!");
        let chyron = &mut ctx.accounts.chyron;
        chyron.message = "Hello, World!".to_string();
        chyron.authority = ctx.accounts.payer.key();
        Ok(())
    }

    pub fn update_message(ctx: Context<UpdateMessage>, new_message: String) -> Result<()> {
        let chyron = &mut ctx.accounts.chyron;
        chyron.message = new_message;
        Ok(())
    }

    // Add initialize_pda function here
}

#[derive(Accounts)]
pub struct Initialize {
    #[account(init, payer = payer, space = 8 + 32 + 200)]
    pub chyron: Account<'info, ChyronAccount>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateMessage {
    #[account(mut, has_one = authority)]
    pub chyron: Account<'info, ChyronAccount>,
    pub authority: Signer<'info>,
}

#[account]
pub struct ChyronAccount {
    pub message: String,
    pub authority: Pubkey,
}

// Add InitializePda accounts struct and PdaAccount here`,
    validationPattern: /seeds\s*=\s*\[.*\].*bump.*init.*payer/m,
    hints: [
      "Create initialize_pda function with Context<InitializePda>",
      "Use seeds = [b\"pda\", authority.key().as_ref()] in the account constraint",
      "Add bump attribute to find the PDA",
      "Create a PdaAccount struct with a counter field"
    ]
  },
  {
    id: 8,
    title: "Cross-Program Invocation (CPI)",
    reading: "Solana programs are composable - they can call each other like functions in a library. This is the power of Cross-Program Invocation (CPI). Let's make your program talk to another program on the network, expanding your digital reach.",
    task: "Add a CPI call to the `SPL Memo` program within the `update_message` instruction",
    visualEffect: "cpi_call",
    nftBadge: "The Composer",
    initialCode: `use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod my_chyron {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Chyron Initialized!");
        let chyron = &mut ctx.accounts.chyron;
        chyron.message = "Hello, World!".to_string();
        chyron.authority = ctx.accounts.payer.key();
        Ok(())
    }

    pub fn update_message(ctx: Context<UpdateMessage>, new_message: String) -> Result<()> {
        let chyron = &mut ctx.accounts.chyron;
        chyron.message = new_message.clone();
        
        // Add CPI call to memo program here
        
        Ok(())
    }

    pub fn initialize_pda(ctx: Context<InitializePda>) -> Result<()> {
        let pda = &mut ctx.accounts.pda_account;
        pda.counter = 0;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {
    #[account(init, payer = payer, space = 8 + 32 + 200)]
    pub chyron: Account<'info, ChyronAccount>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateMessage {
    #[account(mut, has_one = authority)]
    pub chyron: Account<'info, ChyronAccount>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct InitializePda {
    #[account(init, seeds = [b"pda", authority.key().as_ref()], bump, payer = payer, space = 8 + 8)]
    pub pda_account: Account<'info, PdaAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct ChyronAccount {
    pub message: String,
    pub authority: Pubkey,
}

#[account]
pub struct PdaAccount {
    pub counter: u64,
}`,
    validationPattern: /memo_program[\s\S]*invoke[\s\S]*memo_instruction/m,
    hints: [
      "Use anchor_spl::memo for the memo program",
      "Create a memo instruction using spl_memo::instruction::build_memo",
      "Use invoke() to make the cross-program call",
      "Add memo_program: Program<'info, Memo> to UpdateMessage accounts"
    ]
  },
  {
    id: 9,
    title: "Handling SOL",
    reading: "Let's make things interesting by adding economics to your program. In the frontier economy, everything has a price. We'll create a 'toll' system - users must pay a small amount of SOL to update the message. Your program becomes a digital toll booth.",
    task: "Create a `pay_to_update` instruction that uses `system_program` to transfer lamports",
    visualEffect: "sol_transfer",
    nftBadge: "Toll Collector",
    initialCode: `use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod my_chyron {
    use super::*;

    const TOLL_AMOUNT: u64 = 1_000_000; // 0.001 SOL

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Chyron Initialized!");
        let chyron = &mut ctx.accounts.chyron;
        chyron.message = "Hello, World!".to_string();
        chyron.authority = ctx.accounts.payer.key();
        Ok(())
    }

    pub fn update_message(ctx: Context<UpdateMessage>, new_message: String) -> Result<()> {
        let chyron = &mut ctx.accounts.chyron;
        chyron.message = new_message;
        Ok(())
    }

    // Add pay_to_update function here

    pub fn initialize_pda(ctx: Context<InitializePda>) -> Result<()> {
        let pda = &mut ctx.accounts.pda_account;
        pda.counter = 0;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {
    #[account(init, payer = payer, space = 8 + 32 + 200)]
    pub chyron: Account<'info, ChyronAccount>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateMessage {
    #[account(mut, has_one = authority)]
    pub chyron: Account<'info, ChyronAccount>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct InitializePda {
    #[account(init, seeds = [b"pda", authority.key().as_ref()], bump, payer = payer, space = 8 + 8)]
    pub pda_account: Account<'info, PdaAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct ChyronAccount {
    pub message: String,
    pub authority: Pubkey,
}

#[account]
pub struct PdaAccount {
    pub counter: u64,
}

// Add PayToUpdate accounts struct here`,
    validationPattern: /system_program::transfer[\s\S]*TOLL_AMOUNT/m,
    hints: [
      "Create pay_to_update function with Context<PayToUpdate>",
      "Use system_program::transfer() to move SOL",
      "Transfer from payer to authority",
      "Use TOLL_AMOUNT as the transfer amount"
    ]
  },
  {
    id: 10,
    title: "Custom Errors",
    reading: "Production-level programs need clear **error handling**. Instead of cryptic system errors, we want our program to speak plainly when something goes wrong. Let's add custom error messages that help users understand what went awry in our digital frontier.",
    task: "Define a custom `ErrorCode` enum and use a `require!` macro to check message length",
    visualEffect: "error_handling",
    nftBadge: "The Debugger",
    initialCode: `use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod my_chyron {
    use super::*;

    const TOLL_AMOUNT: u64 = 1_000_000; // 0.001 SOL
    const MAX_MESSAGE_LENGTH: usize = 100;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Chyron Initialized!");
        let chyron = &mut ctx.accounts.chyron;
        chyron.message = "Hello, World!".to_string();
        chyron.authority = ctx.accounts.payer.key();
        Ok(())
    }

    pub fn update_message(ctx: Context<UpdateMessage>, new_message: String) -> Result<()> {
        // Add message length validation here
        let chyron = &mut ctx.accounts.chyron;
        chyron.message = new_message;
        Ok(())
    }

    pub fn pay_to_update(ctx: Context<PayToUpdate>, new_message: String) -> Result<()> {
        // Transfer SOL
        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.payer.to_account_info(),
                    to: ctx.accounts.authority.to_account_info(),
                },
            ),
            TOLL_AMOUNT,
        )?;

        // Update message
        let chyron = &mut ctx.accounts.chyron;
        chyron.message = new_message;
        Ok(())
    }

    pub fn initialize_pda(ctx: Context<InitializePda>) -> Result<()> {
        let pda = &mut ctx.accounts.pda_account;
        pda.counter = 0;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {
    #[account(init, payer = payer, space = 8 + 32 + 200)]
    pub chyron: Account<'info, ChyronAccount>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateMessage {
    #[account(mut, has_one = authority)]
    pub chyron: Account<'info, ChyronAccount>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct PayToUpdate {
    #[account(mut)]
    pub chyron: Account<'info, ChyronAccount>,
    #[account(mut)]
    pub payer: Signer<'info>,
    /// CHECK: This is the authority that receives payment
    #[account(mut)]
    pub authority: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitializePda {
    #[account(init, seeds = [b"pda", authority.key().as_ref()], bump, payer = payer, space = 8 + 8)]
    pub pda_account: Account<'info, PdaAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct ChyronAccount {
    pub message: String,
    pub authority: Pubkey,
}

#[account]
pub struct PdaAccount {
    pub counter: u64,
}

// Add ErrorCode enum here`,
    validationPattern: /#\[error_code\][\s\S]*enum\s+ErrorCode[\s\S]*require!.*MAX_MESSAGE_LENGTH/m,
    hints: [
      "Create an ErrorCode enum with #[error_code] attribute",
      "Add a MessageTooLong variant with an error message",
      "Use require!(new_message.len() <= MAX_MESSAGE_LENGTH, ErrorCode::MessageTooLong)",
      "Place the validation in the update_message function"
    ]
  }
];