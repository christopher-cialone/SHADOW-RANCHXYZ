// client/src/data/lessons.ts - DEFINITIVE CONTENT (COPY THIS ENTIRE BLOCK)
export interface LessonData {
    id: number;
    title: string;
    description: string;
    chapter: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number; // in minutes
    isPremium: boolean;
    reward?: number; // Optional: Ranch Coins earned for completion
    content: {
        steps: LessonStep[];
    };
    codeTemplate?: string; // Optional: for general lesson, specific templates in steps
}

export interface LessonStep {
    id: number;
    title: string;
    challenge: string;
    expectedCodePattern?: { rust?: string; python?: string; }; // Made optional for narrative lessons
    successMessage: string;
    failureMessage: string;
    initialCodeTemplateKey: string; // Key from code-templates.ts
    visualEffectTrigger?: 'networkPing' | 'sparkle' | 'coinFall' | 'messageBoard' | 'transaction' | 'dataStream' | 'blueprint' | 'dystopianCity' | 'cypherpunkSymbol' | 'codeShield' | 'digitalGhost' | 'bankBreaking' | 'decentralizedNodes' | 'blockchainBlocks' | 'smartContractGears' | 'digitalMarketplace' | 'glowingPath'; // New visual triggers
    hintMessage?: string;
    isCodingChallenge: boolean; // NEW: Flag to indicate if this step requires coding
}

export const lessons: LessonData[] = [
    // --- NEW: Module 0: Prologue - The Digital Frontier's Code of Honor (Lesson ID 1) ---
    {
        id: 1,
        title: "Prologue: The Digital Frontier's Code of Honor",
        description: "Uncover the forgotten history of digital freedom.",
        chapter: 0,
        difficulty: 'beginner',
        estimatedTime: 20,
        isPremium: false,
        content: {
            steps: [
                {
                    id: 1,
                    title: "Echoes from the Old World",
                    challenge: `Before the blockchain sun rose over this digital frontier, the Old World suffered under the thumb of centralized powers. Data was spied on, money controlled, and freedom often felt like a myth whispered in hushed tones. But some dreamed of a new kind of freedom – built not with guns, but with **code**.

                    **Reflection:** What aspects of the 'Old World' (digital or otherwise) make you value privacy and control over your own data?`,
                    successMessage: "Understood. The seeds of rebellion are often sown in the shadows of control. Click 'Next Step' to continue.",
                    failureMessage: "Please take a moment to reflect on the prompt. Click 'Deploy' to confirm understanding.",
                    initialCodeTemplateKey: 'ethos_lesson0_1',
                    visualEffectTrigger: 'dystopianCity',
                    hintMessage: "This step is about setting the stage. Read the narrative, think about the question, and click 'Deploy' when you're ready to proceed.",
                    isCodingChallenge: false,
                },
                {
                    id: 2,
                    title: "The Whispers of Rebellion - Rise of the Cypherpunks",
                    challenge: `In the shadows of early digital networks, a band of rebels emerged – the **Cypherpunks**. They weren't outlaws in the traditional sense, but digital freedom fighters who believed that cryptography, not legislation, was the key to true liberty. They met not in saloons, but in email lists, forging their manifestos in lines of encrypted text.

                    **Reflection:** If code is a form of speech, and privacy is essential for free speech, how does strong encryption become a tool for freedom?`,
                    successMessage: "Confirmed. The digital whispers grew into a chorus. Click 'Next Step' to continue.",
                    failureMessage: "Please reflect on the concept of code and freedom. Click 'Deploy' to confirm understanding.",
                    initialCodeTemplateKey: 'ethos_lesson0_2',
                    visualEffectTrigger: 'cypherpunkSymbol',
                    hintMessage: "The Cypherpunks believed that privacy could only be guaranteed by mathematics, not by human promises. Think about how unbreakable math gives you control.",
                    isCodingChallenge: false,
                },
            ]
        },
    },
    // --- NEW: Module 1: The Manifestos - Code is Law, Privacy is Power (Lesson ID 2) ---
    {
        id: 2,
        title: "The Manifestos: Code is Law, Privacy is Power",
        description: "Dive into the founding texts of the digital freedom movement.",
        chapter: 1,
        difficulty: 'beginner',
        estimatedTime: 25,
        isPremium: false,
        content: {
            steps: [
                {
                    id: 1,
                    title: "The Cypherpunk Manifesto: Code, Not Trust",
                    challenge: `Eric Hughes, a quiet frontier coder, penned the words that became our first law: 'Cypherpunks write code.' He argued that laws and regulations could never truly protect our freedom in the digital realm. Only **unbreakable code** could truly guarantee privacy and liberty. Our very first step in this adventure is to understand this fundamental truth.

                    **Reflection:** Why do cypherpunks believe that code is a stronger guarantee of privacy than laws or policies?`,
                    successMessage: "Manifesto understood. Trust in code is the first principle. Click 'Next Step' to continue.",
                    failureMessage: "Consider the inherent limitations of human promises versus mathematical guarantees. Click 'Deploy' to confirm understanding.",
                    initialCodeTemplateKey: 'ethos_lesson1_1',
                    visualEffectTrigger: 'codeShield',
                    hintMessage: "Laws can be broken or changed by people. Code, if written correctly, executes exactly as intended, every time.",
                    isCodingChallenge: false,
                },
                {
                    id: 2,
                    title: "The Crypto Anarchist Manifesto: Unstoppable Liberty",
                    challenge: `Timothy C. May, a figure shrouded in digital mist, took the vision even further. His 'Crypto Anarchist Manifesto' painted a future where cryptography would dissolve the very power of the state, creating truly free and anonymous markets. This vision of an unstoppable, censorship-resistant digital realm is where the true heart of Web3 beats.

                    **Reflection:** How does an 'anonymous, distributed digital cash system' fulfill the vision of a truly free and unstoppable market?`,
                    successMessage: "Vision embraced. A future without central gatekeepers. Click 'Next Step' to continue.",
                    failureMessage: "Think about how intermediaries can stop or control transactions. Click 'Deploy' to confirm understanding.",
                    initialCodeTemplateKey: 'ethos_lesson1_2',
                    visualEffectTrigger: 'digitalGhost',
                    hintMessage: "If no single person or company can control the money, then no one can stop you from using it. That's true freedom in action.",
                    isCodingChallenge: false,
                },
            ]
        },
    },
    // --- NEW: Module 2: The Genesis Block - Bitcoin's Cypherpunk Legacy (Lesson ID 3) ---
    {
        id: 3,
        title: "The Genesis Block: Bitcoin's Cypherpunk Legacy",
        description: "Explore how Bitcoin brought cypherpunk ideals to life.",
        chapter: 2,
        difficulty: 'beginner',
        estimatedTime: 30,
        isPremium: false,
        content: {
            steps: [
                {
                    id: 1,
                    title: "The Fiat Chains - Why Bitcoin Was Born",
                    challenge: `The old world's money, 'fiat currency,' was controlled by central banks and governments. It could be printed out of thin air, censored, or inflated away. This system felt like digital chains to those who valued financial freedom. The 2008 financial crisis exposed these flaws, and in the digital dust, a new idea was born.

                    **Reflection:** How can a system where money supply is controlled by a single entity undermine individual freedom?`,
                    successMessage: "Chains identified. The need for a new path. Click 'Next Step' to continue.",
                    failureMessage: "Reflect on the power a centralized financial system holds over individuals. Click 'Deploy' to confirm understanding.",
                    initialCodeTemplateKey: 'ethos_lesson2_1',
                    visualEffectTrigger: 'bankBreaking',
                    hintMessage: "Think about inflation, censorship, and access to funds. What happens when someone else has ultimate control over your money?",
                    isCodingChallenge: false,
                },
                {
                    id: 2,
                    title: "Bitcoin: A Peer-to-Peer Electronic Cash System",
                    challenge: `From the shadows, an anonymous figure, Satoshi Nakamoto, rode into the digital frontier with a revolutionary proposal: **Bitcoin**. It was the first true 'electronic cash' that didn't need a bank, a government, or any trusted middleman. It was a digital currency for the people, by the people, secured by pure cryptography.

                    **Reflection:** How does eliminating the 'trusted third party' in financial transactions enhance privacy and decentralization?`,
                    successMessage: "Bitcoin's core principle absorbed. Trustless transactions for a new age. Click 'Next Step' to continue.",
                    failureMessage: "Focus on the 'peer-to-peer' aspect. What does that remove from the equation? Click 'Deploy' to confirm understanding.",
                    initialCodeTemplateKey: 'ethos_lesson2_2',
                    visualEffectTrigger: 'decentralizedNodes',
                    hintMessage: "When you send money directly to someone else, without a bank in the middle, who can stop it? No one.",
                    isCodingChallenge: false,
                },
                {
                    id: 3,
                    title: "The Blockchain: A Public, Immutable Ledger",
                    challenge: `At the heart of Bitcoin was the **blockchain** – a revolutionary 'digital ledger' that recorded every transaction not in a bank's secret book, but openly and immutably across a vast network of computers. Once a transaction was carved into this digital stone, it couldn't be changed. This public, decentralized truth became the backbone of our new digital world.

                    **Reflection:** How does a public and immutable ledger contribute to a more transparent and fair financial system, even if the users are pseudonymous?`,
                    successMessage: "Blockchain principles secured. The unchangeable truth. Click 'Next Step' to continue.",
                    failureMessage: "Consider what 'public' and 'immutable' mean for accountability. Click 'Deploy' to confirm understanding.",
                    initialCodeTemplateKey: 'ethos_lesson2_3',
                    visualEffectTrigger: 'blockchainBlocks',
                    hintMessage: "Even if you don't know *who* did something, you know *what* happened, and that it can't be covered up.",
                    isCodingChallenge: false,
                },
            ]
        },
    },
    // --- NEW: Module 3: The Crossroads - Web3's Path and Future (Lesson ID 4) ---
    {
        id: 4,
        title: "The Crossroads: Web3's Path and Future",
        description: "Understand the evolution of Web3 and re-align with core ideals.",
        chapter: 3,
        difficulty: 'beginner',
        estimatedTime: 30,
        isPremium: false,
        content: {
            steps: [
                {
                    id: 1,
                    title: "Ethereum & Smart Contracts: Expanding the Vision",
                    challenge: `Bitcoin proved that decentralized money was possible. But soon, new pioneers arrived, pushing the frontier further. Ethereum, with its 'smart contracts,' allowed not just money, but **any kind of digital agreement** to be executed automatically and transparently on the blockchain. The digital Wild West just got a lot more sophisticated.

                    **Reflection:** How do smart contracts enhance the idea of 'code is law' by making agreements self-enforcing without human intervention?`,
                    successMessage: "Smart Contracts understood. Code as unstoppable agreement. Click 'Next Step' to continue.",
                    failureMessage: "Think about what 'self-enforcing' means for trust and intermediaries. Click 'Deploy' to confirm understanding.",
                    initialCodeTemplateKey: 'ethos_lesson3_1',
                    visualEffectTrigger: 'smartContractGears',
                    hintMessage: "If the rules are written in code, and that code runs automatically, you don't need a judge or lawyer to enforce it.",
                    isCodingChallenge: false,
                },
                {
                    id: 2,
                    title: "The Rise of DeFi & NFTs: Promises and Perils",
                    challenge: `The frontier exploded with innovation: Decentralized Finance (DeFi) offered banks made of code, and Non-Fungible Tokens (NFTs) gave us true digital ownership of art, collectibles, and even virtual land. But with this rapid growth came new challenges – the lure of easy riches, scams lurking in the shadows, and the constant threat of centralization creeping back into the decentralized dream.

                    **Reflection:** How can we, as builders and users, ensure that the growth of Web3 (like DeFi and NFTs) remains true to the original cypherpunk ideals of decentralization and individual control?`,
                    successMessage: "Perils recognized, vigilance heightened. The fight for true decentralization continues. Click 'Next Step' to continue.",
                    failureMessage: "Consider where power can accumulate in new systems. How can we prevent that? Click 'Deploy' to confirm understanding.",
                    initialCodeTemplateKey: 'ethos_lesson3_2',
                    visualEffectTrigger: 'digitalMarketplace',
                    hintMessage: "Even in Web3, some services become very popular and centralize power. We need to actively choose decentralized alternatives and build them robustly.",
                    isCodingChallenge: false,
                },
                {
                    id: 3,
                    title: "The Path Forward: Realigning with the Ethos",
                    challenge: `The digital frontier is vast and ever-changing. As new builders like you join the ranks, it's crucial to remember the code of honor established by the original cypherpunks. To truly build a decentralized future, we must constantly question centralization, champion privacy, and ensure that our innovations serve liberty, not control. Your journey is not just about writing code; it's about building a better digital world.

                    **Reflection:** As a future Solana developer, how will you incorporate the principles of privacy, decentralization, and censorship resistance into the applications you build?`,
                    successMessage: "Ethos embraced! Your journey as a builder aligned with the true spirit of Web3 begins now. Click 'Next' to move to your first coding challenge!",
                    failureMessage: "Reflect on your role in shaping the decentralized future. What principles will guide your work? Click 'Deploy' to confirm understanding.",
                    initialCodeTemplateKey: 'ethos_lesson3_3',
                    visualEffectTrigger: 'glowingPath',
                    hintMessage: "Every piece of code you write, every decision you make, can either reinforce centralization or push towards more freedom and privacy.",
                    isCodingChallenge: false,
                },
            ]
        },
    },
    // --- ORIGINAL Solana Lessons (IDs SHIFTED) ---
    {
        id: 5, // Original Lesson 1 (Solana Basics & Wallet Setup)
        title: "Solana Basics & Wallet Setup",
        description: "Learn the fundamentals of Solana and set up your Web3 wallet",
        chapter: 4, // Chapter adjusted
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
        id: 2, // Lesson 2: Creating Your Ranch Account
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
                    challenge: `Welcome, digital homesteader! In this decentralized frontier, we value true ownership and privacy. Unlike the old world where deeds were on paper in a dusty office, here, your ranch deed can be controlled by pure code! This is the essence of **cypher-punk** – using cryptography and decentralized tech to protect privacy and freedom.
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
                    failureMessage: "Not quite. Double-check your PDA syntax. Did you add `seeds` and `bump` correctly within the `#[account(...)]` attribute (Rust) or `init` arguments (Python)? Remember the exact values for the seeds (`b\"ranch\"` and the owner's key) and that `bump` is also required!",
                    initialCodeTemplateKey: 'ranch_management_step2_complete',
                    visualEffectTrigger: 'dataStream',
                    hintMessage: `Okay, digital prospector! Think of PDAs like a magic lockbox only your program can open. You need to tell Solana:
                    1.  What 'words' (seeds) make this lockbox unique (e.g., the word "ranch" and the owner's special key).
                    2.  A special number (the 'bump') that makes sure the lockbox address is perfect and unhackable.
                    Look at the \`#[account(...)]\` line for the \`ranch\` in Rust, or the \`.init()\` call in Python, and add the \`seeds\` and \`bump\` keywords!`,
                    isCodingChallenge: true,
                },
            ]
        },
    },
    {
        id: 3, // Placeholder for Lesson 3
        title: "Introduction to NFTs: Minting Your First Digital Asset",
        description: "Learn how to create and mint Non-Fungible Tokens (NFTs) on Solana.",
        chapter: 3,
        difficulty: 'intermediate',
        estimatedTime: 60,
        isPremium: false,
        content: {
            steps: [
                {
                    id: 1,
                    title: "Coming Soon...",
                    challenge: "This lesson is under development. Check back soon for exciting challenges!",
                    successMessage: "",
                    failureMessage: "",
                    initialCodeTemplateKey: 'default',
                    hintMessage: "More challenges are on the way!",
                    isCodingChallenge: true,
                }
            ]
        }
    },
    {
        id: 7, // Original Lesson 3 (adjusted ID)
        title: "RanchCoin Token Creation",
        description: "Deploy your own SPL token for in-game economy",
        chapter: 6, // Chapter adjusted
        difficulty: 'intermediate',
        estimatedTime: 50,
        isPremium: true,
        content: {
            steps: [
                { id: 1, title: "Coming Soon...", challenge: "This lesson is under development.", successMessage: "", failureMessage: "", initialCodeTemplateKey: 'default', isCodingChallenge: true }
            ]
        }
    },
    {
        id: 8, // Original Lesson 4 (adjusted ID)
        title: "Saloon Dueling System",
        description: "Program interactive duels and betting mechanics",
        chapter: 7, // Chapter adjusted
        difficulty: 'advanced',
        estimatedTime: 75,
        isPremium: true,
        content: {
            steps: [
                { id: 1, title: "Coming Soon...", challenge: "This lesson is under development.", successMessage: "", failureMessage: "", initialCodeTemplateKey: 'default', isCodingChallenge: true }
            ]
        }
    },
    {
        id: 9, // Original Lesson 5 (adjusted ID)
        title: "Security & Ranch Defense",
        description: "Implement security measures against shadow beasts",
        chapter: 8, // Chapter adjusted
        difficulty: 'advanced',
        estimatedTime: 90,
        isPremium: true,
        content: {
            steps: [
                { id: 1, title: "Coming Soon...", challenge: "This lesson is under development.", successMessage: "", failureMessage: "", initialCodeTemplateKey: 'default', isCodingChallenge: true }
            ]
        }
    },
    {
        id: 10, // Original Lesson 6 (adjusted ID)
        title: "Ether Range Expeditions",
        description: "Master cross-program invocations and external integrations",
        chapter: 9, // Chapter adjusted
        difficulty: 'advanced',
        estimatedTime: 120,
        isPremium: true,
        content: {
            steps: [
                { id: 1, title: "Coming Soon...", challenge: "This lesson is under development.", successMessage: "", failureMessage: "", initialCodeTemplateKey: 'default', isCodingChallenge: true }
            ]
        }
    }
];