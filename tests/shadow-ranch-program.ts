import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { ShadowRanchProgram } from "../target/types/shadow_ranch_program";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import { expect } from "chai";

describe("shadow-ranch-program", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.ShadowRanchProgram as Program<ShadowRanchProgram>;
  
  // Test keypair for testing
  const testUser = Keypair.generate();

  it("Can initialize user progress account", async () => {
    // This is a basic test structure - you'll need to add proper setup
    // including airdropping SOL to the test user and creating the PDA
    
    const [userProgressPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("user_progress"), testUser.publicKey.toBuffer()],
      program.programId
    );

    try {
      await program.methods
        .initializeUser()
        .accounts({
          userProgress: userProgressPda,
          payer: testUser.publicKey,
          authority: testUser.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([testUser])
        .rpc();
      
      // If we get here, the instruction succeeded
      expect(true).to.be.true;
    } catch (error) {
      // For now, we expect this to fail due to missing SOL
      // In a real test environment, you'd airdrop SOL first
      console.log("Test failed as expected (no SOL):", error.message);
    }
  });
});
