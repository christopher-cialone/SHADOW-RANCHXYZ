// Solana coding challenge data structure
export interface SolanaChallenge {
  id: number;
  title: string;
  story: string;
  example?: string;
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
    story: "Every structure begins with a foundation. In Solana, that foundation is the program declaration itself. Like claiming your digital homestead on the blockchain frontier, you must first announce your program's identity to the world.",
    task: "Change the program's name to my_chyron",
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
    story: "A program is useless without instructions to guide it. Just as a frontier town needs its first laws, your program needs its first meaningful instruction. This instruction will announce your program's awakening to the Solana network.",
    task: "Add msg!(\"Chyron Initialized!\"); to the initialize function",
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
    story: "Programs themselves don't store data - they're like judges who make decisions but don't keep permanent records. For persistence, we need accounts. Think of accounts as ledger books where your program's state lives forever on the blockchain.",
    task: "Define the ChyronAccount struct with a message: String field",
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
    validationPattern: /#\[account\][\s\S]*pub struct[\s\S]*ChyronAccount[\s\S]*message:\s*String/m,
    hints: [
      "Use the #[account] attribute above a struct",
      "Name the struct 'ChyronAccount'",
      "Add a message field of type String"
    ]
  },
  {
    id: 4,
    title: "Writing to the Chain",
    story: "Now, let's connect our instruction to our account. This is where the magic happens – we'll write our first piece of data permanently to the Solana blockchain.",
    example: `// In our instruction's context, we need to define the accounts it will use.
#[derive(Accounts)]
pub struct SomeContext<'info> {
    // To create an account, we need 3 things:
    // 1. The account itself, using the 'init' macro.
    #[account(init, payer = user, space = 8 + 256)]
    pub my_account: Account<'info, MyAccountStruct>,
    // 2. The user who will pay for it.
    #[account(mut)]
    pub user: Signer<'info>,
    // 3. The official Solana System Program.
    pub system_program: Program<'info, System>,
}`,
    task: "First, let's prepare our Initialize context. Following the example, add the three necessary fields inside the struct: chyron_account, user, and system_program. Don't forget to add 'info!",
    visualEffect: "chain_write",
    nftBadge: "Chain Writer",
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
pub struct Initialize {
    // Add the three necessary fields here
}

#[account]
pub struct ChyronAccount {
    pub message: String,
}`,
    validationPattern: /#\[account\(init.*payer\s*=\s*user.*space.*\)\][\s\S]*pub\s+chyron_account:\s*Account<'info,\s*ChyronAccount>[\s\S]*#\[account\(mut\)\][\s\S]*pub\s+user:\s*Signer<'info>[\s\S]*pub\s+system_program:\s*Program<'info,\s*System>/m,
    hints: [
      "Add chyron_account with #[account(init, payer = user, space = 8 + 256)]",
      "Add user with #[account(mut)] and type Signer<'info>",
      "Add system_program with type Program<'info, System>"
    ]
  },
  {
    id: 5,
    title: "Setting the State",
    story: "Our context is ready! Now we can access the newly created account inside our initialize instruction and set its message.",
    example: `// Inside an instruction, we can access accounts via the context (ctx).
pub fn some_instruction(ctx: Context<SomeContext>) -> Result<()> {
    // We create a mutable reference to our account.
    let my_account = &mut ctx.accounts.my_account;
    // Then, we can set its fields.
    my_account.some_data = "A new message!".to_string();
    Ok(())
}`,
    task: "Inside the initialize function, create a mutable reference to chyron_account and set its message field to \"Hello, World!\".to_string().",
    visualEffect: "update_button",
    nftBadge: "State Modifier",
    initialCode: `use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod my_chyron {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Chyron Initialized!");
        // Set the message here
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 256)]
    pub chyron_account: Account<'info, ChyronAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct ChyronAccount {
    pub message: String,
}`,
    validationPattern: /let\s+chyron_account\s*=\s*&mut\s+ctx\.accounts\.chyron_account[\s\S]*chyron_account\.message\s*=\s*"Hello, World!"\.to_string\(\)/m,
    hints: [
      "Create a mutable reference: let chyron_account = &mut ctx.accounts.chyron_account;",
      "Set the message: chyron_account.message = \"Hello, World!\".to_string();",
      "Place this code inside the initialize function"
    ]
  },
  {
    id: 6,
    title: "Creating a Custom Instruction",
    story: "An on-screen display isn't very useful if you can't update what it shows. Time to build our second instruction - one that can modify the message after initialization. This is where your program becomes truly interactive.",
    example: `// To create a new instruction, we follow the same pattern:
// 1. Define the instruction function
pub fn some_instruction(ctx: Context<SomeContext>, new_data: String) -> Result<()> {
    let my_account = &mut ctx.accounts.my_account;
    my_account.some_field = new_data;
    Ok(())
}

// 2. Define the context for this instruction
#[derive(Accounts)]
pub struct SomeContext<'info> {
    #[account(mut)] // This account will be modified
    pub my_account: Account<'info, MyAccountStruct>,
    pub authority: Signer<'info>, // Who can call this instruction
}`,
    task: "Create an update_message instruction that takes a new_message: String parameter and updates the chyron_account's message. Also create the UpdateMessage context struct.",
    visualEffect: "access_control",
    nftBadge: "Gatekeeper",
    initialCode: `use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod my_chyron {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Chyron Initialized!");
        let chyron_account = &mut ctx.accounts.chyron_account;
        chyron_account.message = "Hello, World!".to_string();
        Ok(())
    }

    // Add your update_message instruction here
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 256)]
    pub chyron_account: Account<'info, ChyronAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct ChyronAccount {
    pub message: String,
}

// Add UpdateMessage context here`,
    validationPattern: /pub fn update_message.*new_message:\s*String.*Result<\(\)>[\s\S]*#\[derive\(Accounts\)\][\s\S]*pub struct UpdateMessage/m,
    hints: [
      "Create the update_message function following the example pattern",
      "Add a new_message: String parameter",
      "Create the UpdateMessage context struct with chyron_account and authority fields"
    ]
  },
  {
    id: 7,
    title: "Access Control & Signers",
    story: "We have a problem. Right now, anyone can call our update function and change our message. In the Wild West of blockchain, we need to establish who has the authority to make changes. Time to add some security to our digital homestead.",
    example: `// We can add ownership to our account struct:
#[account]
pub struct MyAccount {
    pub message: String,
    pub authority: Pubkey, // This stores who owns this account
}

// And use constraints to enforce security:
#[derive(Accounts)]
pub struct UpdateContext<'info> {
    #[account(mut, has_one = authority)] // Only the authority can update
    pub my_account: Account<'info, MyAccount>,
    pub authority: Signer<'info>, // Must sign the transaction
}`,
    task: "Add an authority: Pubkey field to ChyronAccount, and update the UpdateMessage context to include the has_one = authority constraint.",
    visualEffect: "pda_creation",
    nftBadge: "Master of Puppets",
    initialCode: `use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod my_chyron {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Chyron Initialized!");
        let chyron_account = &mut ctx.accounts.chyron_account;
        chyron_account.message = "Hello, World!".to_string();
        Ok(())
    }

    pub fn update_message(ctx: Context<UpdateMessage>, new_message: String) -> Result<()> {
        let chyron_account = &mut ctx.accounts.chyron_account;
        chyron_account.message = new_message;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 256 + 32)]
    pub chyron_account: Account<'info, ChyronAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateMessage<'info> {
    #[account(mut)]
    pub chyron_account: Account<'info, ChyronAccount>,
    pub authority: Signer<'info>,
}

#[account]
pub struct ChyronAccount {
    pub message: String,
    // Add authority field here
}`,
    validationPattern: /pub\s+authority:\s+Pubkey[\s\S]*has_one\s*=\s*authority/m,
    hints: [
      "Add 'pub authority: Pubkey' to the ChyronAccount struct",
      "Add the has_one = authority constraint to the UpdateMessage chyron_account",
      "Set the authority in the initialize function: chyron_account.authority = ctx.accounts.user.key();"
    ]
  },
  {
    id: 8,
    title: "Program Derived Addresses (PDAs)",
    story: "Program Derived Addresses, or PDAs, are powerful. They're accounts that your program can control without needing a private key. Think of them as robot assistants that your program can command. Let's create a PDA that your program owns.",
    example: `// PDAs are created using seeds and a bump:
#[derive(Accounts)]
pub struct CreatePda<'info> {
    // The seeds make this PDA unique and reproducible
    #[account(
        init, 
        seeds = [b"my_pda", authority.key().as_ref()], 
        bump, 
        payer = authority, 
        space = 8 + 8
    )]
    pub my_pda: Account<'info, MyPdaStruct>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}`,
    task: "Create a create_pda instruction and CreatePda context that initializes a PDA using seeds [b\"counter\", user.key().as_ref()] and a PdaAccount struct with a counter: u64 field.",
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
  },
  {
    id: 9,
    title: "Cross-Program Invocation (CPI)",
    story: "Solana programs are composable - they can call each other like functions in a library. This is the power of Cross-Program Invocation (CPI). Let's make your program talk to another program on the network, expanding your digital reach.",
    example: `// To call another program, we use CPI:
use anchor_lang::solana_program::program::invoke;

pub fn my_instruction(ctx: Context<MyContext>) -> Result<()> {
    // Create the instruction for the other program
    let memo_instruction = spl_memo::instruction::build_memo(
        b"Hello from my program!",
        &[&ctx.accounts.authority.key()]
    );
    
    // Invoke the other program
    invoke(
        &memo_instruction,
        &[ctx.accounts.authority.to_account_info()]
    )?;
    
    Ok(())
}`,
    task: "Add a CPI call to the SPL Memo program within the update_message instruction. The memo should contain the new message.",
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
        let chyron_account = &mut ctx.accounts.chyron_account;
        chyron_account.message = "Hello, World!".to_string();
        chyron_account.authority = ctx.accounts.user.key();
        Ok(())
    }

    pub fn update_message(ctx: Context<UpdateMessage>, new_message: String) -> Result<()> {
        let chyron_account = &mut ctx.accounts.chyron_account;
        chyron_account.message = new_message.clone();
        
        // Add CPI call here
        
        Ok(())
    }

    pub fn create_pda(ctx: Context<CreatePda>) -> Result<()> {
        let pda_account = &mut ctx.accounts.pda_account;
        pda_account.counter = 0;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 256 + 32)]
    pub chyron_account: Account<'info, ChyronAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateMessage<'info> {
    #[account(mut, has_one = authority)]
    pub chyron_account: Account<'info, ChyronAccount>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct CreatePda<'info> {
    #[account(
        init,
        seeds = [b"counter", user.key().as_ref()],
        bump,
        payer = user,
        space = 8 + 8
    )]
    pub pda_account: Account<'info, PdaAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
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
    validationPattern: /spl_memo::instruction::build_memo[\s\S]*invoke/m,
    hints: [
      "Use spl_memo::instruction::build_memo to create the memo instruction",
      "Pass the new_message as bytes to the memo",
      "Use invoke() to call the memo program"
    ]
  },
  {
    id: 10,
    title: "Handling SOL & Error Handling", 
    story: "Let's make things interesting by adding economics to your program and proper error handling. We'll create a 'toll' system - users must pay a small amount of SOL to update the message, and we'll add clear error messages.",
    example: `// Custom errors help users understand what went wrong:
#[error_code]
pub enum ErrorCode {
    #[msg("The message is too long. Maximum 100 characters.")]
    MessageTooLong,
}

// We can use require! to check conditions:
pub fn some_instruction(ctx: Context<SomeContext>, message: String) -> Result<()> {
    require!(message.len() <= 100, ErrorCode::MessageTooLong);
    
    // Transfer SOL using system_program
    system_program::transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.payer.to_account_info(),
                to: ctx.accounts.authority.to_account_info(),
            },
        ),
        1_000_000, // 0.001 SOL
    )?;
    
    Ok(())
}`,
    task: "Add a pay_to_update instruction that requires payment of 0.001 SOL and includes error handling for messages over 100 characters. Define ErrorCode enum with MessageTooLong variant.",
    visualEffect: "error_handling",
    nftBadge: "The Debugger",
    initialCode: `use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("11111111111111111111111111111111");

const TOLL_AMOUNT: u64 = 1_000_000; // 0.001 SOL
const MAX_MESSAGE_LENGTH: usize = 100;

#[program]
pub mod my_chyron {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Chyron Initialized!");
        let chyron_account = &mut ctx.accounts.chyron_account;
        chyron_account.message = "Hello, World!".to_string();
        chyron_account.authority = ctx.accounts.user.key();
        Ok(())
    }

    pub fn update_message(ctx: Context<UpdateMessage>, new_message: String) -> Result<()> {
        let chyron_account = &mut ctx.accounts.chyron_account;
        chyron_account.message = new_message;
        Ok(())
    }

    // Add pay_to_update instruction here
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 256 + 32)]
    pub chyron_account: Account<'info, ChyronAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateMessage<'info> {
    #[account(mut, has_one = authority)]
    pub chyron_account: Account<'info, ChyronAccount>,
    pub authority: Signer<'info>,
}

#[account]
pub struct ChyronAccount {
    pub message: String,
    pub authority: Pubkey,
}

// Add PayToUpdate context and ErrorCode enum here`,
    validationPattern: /#\[error_code\][\s\S]*enum\s+ErrorCode[\s\S]*MessageTooLong[\s\S]*require!.*MAX_MESSAGE_LENGTH.*ErrorCode::MessageTooLong[\s\S]*system_program::transfer/m,
    hints: [
      "Create ErrorCode enum with #[error_code] attribute",
      "Add require! check for message length", 
      "Use system_program::transfer to collect toll",
      "Create PayToUpdate context with payer and authority"
    ]
  }
];