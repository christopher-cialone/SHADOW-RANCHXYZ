// client/src/data/lessons.ts - Clean Solana-Only Track
export interface LessonData {
    id: number;
    title: string;
    description: string;
    chapter: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number; // in minutes
    isPremium: boolean;
    content: {
        steps: LessonStep[];
    };
    codeTemplate?: string; // Optional: for general lesson, specific templates in steps
}

export interface LessonStep {
    id: number;
    title: string;
    challenge: string;
    expectedCodePattern?: { rust?: string; python?: string; }; // Made optional for narrative/quiz lessons
    successMessage: string;
    failureMessage: string;
    initialCodeTemplateKey: string; // Key from code-templates.ts
    visualEffectTrigger?: 'networkPing' | 'sparkle' | 'coinFall' | 'messageBoard' | 'transaction' | 'dataStream' | 'blueprint' | 'dystopianCity' | 'cypherpunkSymbol' | 'codeShield' | 'digitalGhost' | 'bankBreaking' | 'decentralizedNodes' | 'blockchainBlocks' | 'smartContractGears' | 'digitalMarketplace' | 'glowingPath'; // New visual triggers
    hintMessage?: string;
    isCodingChallenge: boolean; // Flag to indicate if this step requires coding
    quiz?: { // NEW: Optional quiz for narrative steps
        type: 'multiple-choice' | 'true-false' | 'text-input';
        question: string;
        options?: string[]; // For multiple-choice/true-false
        correctAnswer: string | boolean; // Text for text-input, boolean for true-false
    };
    videoUrl?: string; // NEW: Optional video URL for narrative steps
}

export const lessons: LessonData[] = [
    {
        id: 1,
        title: "Solana Basics & Wallet Setup",
        description: "Learn the fundamentals of Solana and set up your Web3 wallet",
        chapter: 1,
        difficulty: 'beginner',
        estimatedTime: 30,
        isPremium: false,
        content: {
            steps: [
                {
                    id: 1,
                    title: "Ping the Blockchain: Your First Transmission",
                    challenge: `Welcome, new recruit! Your mission begins now. This isn't just a game; it's a training simulation in the digital frontier. Your first task is to establish a connection with the Solana Devnet – think of it as sending a tiny digital "ping" to see if the network is alive and responding.

Below, you'll see your **Code Terminal**, a powerful tool for writing Solana programs. It starts with some basic program structure. Don't worry about understanding all of it yet! We'll guide you.

**Your Task:**
1.  Find the special area in your **Code Terminal** marked with comments like \`// Your code goes here\` or \`# Your code goes here\`.
2.  Type the following command into that area: \`get_network_status()\`
3.  Click the **"Deploy"** button to send your command.

Watch the "Console Output" below your code for a response! This is how your program communicates with the Solana network.`,
                    expectedCodePattern: { rust: 'get_network_status\\(\\)', python: 'get_network_status\\(\\)' },
                    successMessage: "Transmission received! Network Status: Connected! Ping: {ping}ms | Current Slot: {slot}. You've made your first connection!",
                    failureMessage: "Transmission failed. The `get_network_status()` command was not found or is misspelled. Please ensure you typed it exactly as shown in the designated area. Double-check for typos!",
                    initialCodeTemplateKey: 'default',
                    visualEffectTrigger: 'networkPing',
                    hintMessage: "Hey there! To complete this first step, type `get_network_status()` exactly as you see it into the designated section of your Code Terminal. Then, click the 'Deploy' button. This function call is like pressing a big red button to check the network!",
                    isCodingChallenge: true,
                },
            ]
        },
    },
    {
        id: 2,
        title: "Creating Your Ranch Account", 
        description: "Build your first Solana program to manage ranch data",
        chapter: 2,
        difficulty: 'beginner',
        estimatedTime: 45,
        isPremium: false,
        content: {
            steps: [
                {
                    id: 1,
                    title: "Define Ranch Owner Field",
                    challenge: "Your ranch needs an owner! In the `Ranch` struct (Rust) or `Ranch` class (Python), add a `pubkey` field named `owner`. This will identify who controls the ranch. Don't forget the comma for Rust!",
                    expectedCodePattern: { rust: 'pub\\s+owner:\\s*Pubkey,', python: 'owner:\\s*Pubkey' },
                    successMessage: "Excellent! The `owner` field has been added. Your ranch now knows who its rightful owner is!",
                    failureMessage: "Not quite. Make sure you've added 'pub owner: Pubkey,' (Rust) or 'owner: Pubkey' (Python) exactly inside the Ranch definition. Check for typos and correct capitalization!",
                    initialCodeTemplateKey: 'ranch_management_initial',
                    visualEffectTrigger: 'blueprint',
                    hintMessage: "Think about Rust structs or Python classes. You need to add a line that declares a public key variable named 'owner' within your 'Ranch' data structure.",
                    isCodingChallenge: true,
                },
                {
                    id: 2,
                    title: "Initialize Owner in `initialize_ranch`",
                    challenge: "Now, inside the `initialize_ranch` function, assign the `owner` field of your `ranch` account to the `ctx.accounts.owner.key()` (Rust) or `owner.key()` (Python). Remember `ranch.owner = ctx.accounts.owner.key();` or `ranch.owner = owner.key()`.",
                    expectedCodePattern: { rust: 'ranch\\.owner\\s*=\\s*ctx\\.accounts\\.owner\\.key\\(\\);', python: 'ranch\\.owner\\s*=\\s*owner\\.key\\(\\)' },
                    successMessage: "Owner successfully initialized! Your ranch deed is now registered to you!",
                    failureMessage: "The owner assignment is incorrect. Double-check the syntax for assigning the owner's key to the ranch account. Hint: Look at the `ctx.accounts.owner` context in Rust or `owner` parameter in Python.",
                    initialCodeTemplateKey: 'ranch_management_step1_complete',
                    visualEffectTrigger: 'sparkle',
                    hintMessage: "You need to set the 'owner' field of your 'ranch' variable to the public key of the user who's calling this program. In Rust, you'll use `ctx.accounts.owner.key()`; in Python, `owner.key()`.",
                    isCodingChallenge: true,
                },
                {
                    id: 3,
                    title: "Programmatic Ownership: Securing Your Ranch with a Program Derived Address (PDA)",
                    challenge: `Welcome, digital homesteader! In this decentralized frontier, we value true ownership and privacy. Unlike the old world where deeds were on paper in a dusty office, here, your ranch deed can be controlled by pure code! This is the essence of **cypherpunk** – using cryptography and decentralized tech to protect privacy and freedom.

Today, we're diving into **Program Derived Addresses (PDAs)**. Imagine your ranch deed isn't owned by a specific wallet with a private key, but by a special, unhackable 'strongbox' that *only your ranch program can open*. This strongbox address is *derived* from your program's ID and some unique 'seeds' (like a secret password) and a 'bump' (a special number to make sure it's valid). This makes your ranch truly **decentralized** and secure, giving control to the smart contract itself, not a person's key.

**Your Task:**
1.  In the \`InitializeRanch\` struct (Rust) or function definition (Python), locate the \`#[account(...)]\` attribute for your \`ranch\` account.
2.  **Add a \`seeds\` argument** to this attribute. For the ranch, the seeds will be the byte literal \`b"ranch"\` and the owner's public key (\`owner.key().as_ref()\` in Rust, \`owner\` in Python).
3.  **Add a \`bump\` argument** to this attribute. This is a special nonce that ensures the PDA is valid.`,
                    expectedCodePattern: {
                        rust: 'seeds\\s*=\\s*\\[b"ranch",\\s*owner\\.key\\(\\)\\.as_ref\\(\\)\\]\\s*,\\s*bump',
                        python: 'seeds=\\[\'ranch\',\\s*owner\\]\\s*,\\s*bump'
                    },
                    successMessage: "Fantastic! Your ranch account is now a true Program Derived Address (PDA)! Its deed is safely locked away, controlled by your program, not a private key. You've embraced programmatic ownership!",
                    failureMessage: "Not quite. Double-check your PDA syntax. Did you add `seeds` and `bump` correctly within the `#[account(...)]` attribute? The seeds should include both the string 'ranch' and the owner's public key.",
                    initialCodeTemplateKey: 'ranch_management_step2_complete',
                    visualEffectTrigger: 'codeShield',
                    hintMessage: "You're creating a PDA for your ranch account. In the `#[account(...)]` attribute, add: `seeds = [b\"ranch\", owner.key().as_ref()], bump` for Rust, or `seeds=['ranch', owner], bump` for Python.",
                    isCodingChallenge: true,
                },
            ]
        },
    },
    {
        id: 3,
        title: "Token Economics & Ranch Rewards",
        description: "Learn about Solana tokens and implement a reward system",
        chapter: 3,
        difficulty: 'intermediate',
        estimatedTime: 60,
        isPremium: false,
        content: {
            steps: [
                {
                    id: 1,
                    title: "Ranch Coin Mint",
                    challenge: "Create a new token mint for Ranch Coins! In Solana, tokens are created through 'mints' - think of a mint as a special factory that produces tokens. Add a `mint` field to your `Ranch` struct that will store the public key of your token mint.",
                    expectedCodePattern: { rust: 'pub\\s+mint:\\s*Pubkey,', python: 'mint:\\s*Pubkey' },
                    successMessage: "Token mint field added! Your ranch now has a blueprint for its own currency!",
                    failureMessage: "Make sure to add 'pub mint: Pubkey,' to your Ranch struct. This will store the address of your token mint.",
                    initialCodeTemplateKey: 'token_economics_initial',
                    visualEffectTrigger: 'coinFall',
                    hintMessage: "A mint is like a master template for creating tokens. Each ranch needs to know where its token factory is located.",
                    isCodingChallenge: true,
                },
            ]
        },
    },
];