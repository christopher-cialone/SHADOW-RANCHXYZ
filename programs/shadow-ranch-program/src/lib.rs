use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    metadata::{
        create_metadata_accounts_v3, create_mint_v2, create_master_edition_v3,
        CreateMetadataAccountsV3, CreateMintV2, CreateMasterEditionV3,
        Metadata, MetadataAccount, MasterEditionAccount,
    },
    token::{Mint, Token, TokenAccount},
};
use mpl_token_metadata::types::{DataV2, Creator, Collection, Uses, CollectionDetails};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod shadow_ranch_program {
    use super::*;

    /// Initialize a new user progress account
    /// This creates a PDA account to track the user's learning progress
    pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
        let user_progress = &mut ctx.accounts.user_progress;
        
        // Set the authority to the user who signed the transaction
        user_progress.authority = ctx.accounts.authority.key();
        
        // Initialize challenges completed to 0 (no challenges completed yet)
        user_progress.challenges_completed = 0;
        
        // Initialize module progress to 0
        user_progress.modules_completed = 0;
        
        // Set timestamps
        let clock = Clock::get()?;
        user_progress.created_at = clock.unix_timestamp;
        user_progress.updated_at = clock.unix_timestamp;
        
        msg!("User progress account initialized for: {}", ctx.accounts.authority.key());
        Ok(())
    }

    /// Complete a specific challenge
    /// This updates the bitmask to mark a challenge as completed
    pub fn complete_challenge(ctx: Context<CompleteChallenge>, challenge_id: u8) -> Result<()> {
        require!(challenge_id < 16, ShadowRanchError::InvalidChallengeId);
        
        let user_progress = &mut ctx.accounts.user_progress;
        
        // Verify the signer is the authority of this progress account
        require!(
            ctx.accounts.authority.key() == user_progress.authority,
            ShadowRanchError::Unauthorized
        );
        
        // Use bitwise OR to mark the challenge as completed
        // challenge_id 0 corresponds to bit 0, challenge_id 1 to bit 1, etc.
        let challenge_mask = 1u16 << challenge_id;
        user_progress.challenges_completed |= challenge_mask;
        
        // Update timestamp
        let clock = Clock::get()?;
        user_progress.updated_at = clock.unix_timestamp;
        
        msg!("Challenge {} completed for user: {}", challenge_id, user_progress.authority);
        Ok(())
    }

    /// Complete a module (requires completing all challenges in the module)
    /// This is called when a user finishes all challenges in a learning module
    pub fn complete_module(ctx: Context<CompleteModule>, module_id: u8) -> Result<()> {
        require!(module_id < 4, ShadowRanchError::InvalidModuleId);
        
        let user_progress = &mut ctx.accounts.user_progress;
        
        // Verify the signer is the authority of this progress account
        require!(
            ctx.accounts.authority.key() == user_progress.authority,
            ShadowRanchError::Unauthorized
        );
        
        // Check if all challenges for this module are completed
        let module_challenges = get_module_challenges(module_id);
        let module_mask = create_module_mask(module_challenges);
        
        require!(
            (user_progress.challenges_completed & module_mask) == module_mask,
            ShadowRanchError::ModuleNotComplete
        );
        
        // Mark module as completed using bitwise OR
        let module_completion_mask = 1u8 << module_id;
        user_progress.modules_completed |= module_completion_mask;
        
        // Update timestamp
        let clock = Clock::get()?;
        user_progress.updated_at = clock.unix_timestamp;
        
        msg!("Module {} completed for user: {}", module_id, user_progress.authority);
        Ok(())
    }

    /// Mint an achievement NFT for completing a module
    /// This performs a CPI to the Metaplex Token Metadata program
    pub fn mint_achievement_nft(
        ctx: Context<MintAchievementNft>,
        title: String,
        symbol: String,
        uri: String,
        module_id: u8,
    ) -> Result<()> {
        require!(module_id < 4, ShadowRanchError::InvalidModuleId);
        
        let user_progress = &ctx.accounts.user_progress;
        
        // Verify the signer is the authority of this progress account
        require!(
            ctx.accounts.authority.key() == user_progress.authority,
            ShadowRanchError::Unauthorized
        );
        
        // Check if the module is completed before allowing NFT mint
        let module_completion_mask = 1u8 << module_id;
        require!(
            (user_progress.modules_completed & module_completion_mask) != 0,
            ShadowRanchError::ModuleNotComplete
        );
        
        // Create the mint account
        let cpi_accounts = CreateMintV2 {
            mint: ctx.accounts.mint.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
            payer: ctx.accounts.payer.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
            token_program: ctx.accounts.token_program.to_account_info(),
            associated_token_program: ctx.accounts.associated_token_program.to_account_info(),
            rent: ctx.accounts.rent.to_account_info(),
        };
        
        let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);
        create_mint_v2(cpi_ctx, 0, &ctx.accounts.authority.key(), None, None)?;
        
        // Create the metadata account
        let creators = vec![
            Creator {
                address: ctx.accounts.authority.key(),
                verified: true,
                share: 100,
            }
        ];
        
        let data_v2 = DataV2 {
            name: title,
            symbol,
            uri,
            seller_fee_basis_points: 0, // No royalties for educational achievements
            creators: Some(creators),
            collection: None,
            uses: None,
        };
        
        let cpi_accounts = CreateMetadataAccountsV3 {
            metadata: ctx.accounts.metadata.to_account_info(),
            mint: ctx.accounts.mint.to_account_info(),
            mint_authority: ctx.accounts.authority.to_account_info(),
            payer: ctx.accounts.payer.to_account_info(),
            update_authority: ctx.accounts.authority.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
            rent: Some(ctx.accounts.rent.key()),
        };
        
        let cpi_ctx = CpiContext::new(ctx.accounts.metadata_program.to_account_info(), cpi_accounts);
        create_metadata_accounts_v3(
            cpi_ctx,
            data_v2,
            true, // is_mutable
            true, // update_authority_is_signer
            None, // collection_details
            None, // uses
        )?;
        
        // Create the master edition account (non-fungible)
        let cpi_accounts = CreateMasterEditionV3 {
            edition: ctx.accounts.master_edition.to_account_info(),
            mint: ctx.accounts.mint.to_account_info(),
            update_authority: ctx.accounts.authority.to_account_info(),
            mint_authority: ctx.accounts.authority.to_account_info(),
            payer: ctx.accounts.payer.to_account_info(),
            metadata: ctx.accounts.metadata.to_account_info(),
            token_program: ctx.accounts.token_program.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
            rent: Some(ctx.accounts.rent.key()),
        };
        
        let cpi_ctx = CpiContext::new(ctx.accounts.metadata_program.to_account_info(), cpi_accounts);
        create_master_edition_v3(cpi_ctx, None)?;
        
        // Create the user's token account
        let cpi_accounts = AssociatedToken::create(
            ctx.accounts.associated_token_program.to_account_info(),
            ctx.accounts.authority.to_account_info(),
            ctx.accounts.mint.to_account_info(),
            ctx.accounts.authority.to_account_info(),
            ctx.accounts.token_program.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
            ctx.accounts.rent.to_account_info(),
        );
        
        cpi_accounts?;
        
        // Mint 1 token to the user's account
        let cpi_accounts = anchor_spl::token::MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.user_token_account.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        
        let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);
        anchor_spl::token::mint_to(cpi_ctx, 1)?;
        
        msg!("Achievement NFT minted for module {} completion!", module_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        payer = payer,
        space = UserProgress::LEN,
        seeds = [b"user_progress", authority.key().as_ref()],
        bump
    )]
    pub user_progress: Account<'info, UserProgress>,
    
    #[account(mut)]
    pub payer: Signer<'info>,
    
    /// CHECK: This is the user's authority key
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CompleteChallenge<'info> {
    #[account(
        mut,
        seeds = [b"user_progress", authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub user_progress: Account<'info, UserProgress>,
    
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct CompleteModule<'info> {
    #[account(
        mut,
        seeds = [b"user_progress", authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub user_progress: Account<'info, UserProgress>,
    
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct MintAchievementNft<'info> {
    #[account(
        seeds = [b"user_progress", authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub user_progress: Account<'info, UserProgress>,
    
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    
    #[account(
        init,
        payer = payer,
        mint = mint,
        authority = authority,
        associated_token_program = associated_token_program,
        token_program = token_program,
    )]
    pub user_token_account: Account<'info, TokenAccount>,
    
    #[account(
        init,
        payer = payer,
        mint = mint,
        update_authority = authority,
        mint_authority = authority,
        metadata = metadata,
        token_program = token_program,
        system_program = system_program,
        rent = Some(rent.key()),
    )]
    pub master_edition: Account<'info, MasterEditionAccount>,
    
    #[account(
        init,
        payer = payer,
        mint = mint,
        mint_authority = authority,
        update_authority = authority,
        metadata = metadata,
        token_program = token_program,
        system_program = system_program,
        rent = Some(rent.key()),
    )]
    pub metadata: Account<'info, MetadataAccount>,
    
    #[account(mut)]
    pub payer: Signer<'info>,
    
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub metadata_program: Program<'info, Metadata>,
    pub rent: Sysvar<'info, Rent>,
}

#[account]
pub struct UserProgress {
    /// The public key of the user who owns this progress account
    pub authority: Pubkey,
    
    /// Bitmask tracking completion of up to 16 challenges
    /// Each bit represents a challenge: bit 0 = challenge 0, bit 1 = challenge 1, etc.
    pub challenges_completed: u16,
    
    /// Bitmask tracking completion of up to 4 modules
    /// Each bit represents a module: bit 0 = module 0, bit 1 = module 1, etc.
    pub modules_completed: u8,
    
    /// Timestamp when the account was created
    pub created_at: i64,
    
    /// Timestamp when the account was last updated
    pub updated_at: i64,
}

impl UserProgress {
    /// Calculate the space required for this account
    pub const LEN: usize = 8 + // discriminator
        32 + // authority (Pubkey)
        2 +  // challenges_completed (u16)
        1 +  // modules_completed (u8)
        8 +  // created_at (i64)
        8;   // updated_at (i64)
}

/// Helper function to get the challenges for a specific module
fn get_module_challenges(module_id: u8) -> Vec<u8> {
    match module_id {
        0 => vec![0, 1, 2, 3],     // Module 0: Challenges 0-3
        1 => vec![4, 5, 6, 7],     // Module 1: Challenges 4-7
        2 => vec![8, 9, 10, 11],   // Module 2: Challenges 8-11
        3 => vec![12, 13, 14, 15], // Module 3: Challenges 12-15
        _ => vec![],                // Invalid module
    }
}

/// Helper function to create a bitmask for a module's challenges
fn create_module_mask(challenges: Vec<u8>) -> u16 {
    challenges.iter().fold(0u16, |acc, &challenge_id| {
        acc | (1u16 << challenge_id)
    })
}

#[error_code]
pub enum ShadowRanchError {
    #[msg("Invalid challenge ID. Must be between 0 and 15.")]
    InvalidChallengeId,
    
    #[msg("Invalid module ID. Must be between 0 and 3.")]
    InvalidModuleId,
    
    #[msg("Unauthorized. Only the account authority can perform this action.")]
    Unauthorized,
    
    #[msg("Module not complete. All challenges in the module must be completed first.")]
    ModuleNotComplete,
}
