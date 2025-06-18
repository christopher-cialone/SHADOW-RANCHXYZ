// client/src/data/lessons.ts - DEFINITIVE CONTENT V7 REBUILD
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
                    quiz: {
                        type: 'text-input',
                        question: "Type 'Freedom' to confirm you're ready to learn about the digital frontier.",
                        correctAnswer: "Freedom",
                    },
                    videoUrl: "https://www.youtube.com/embed/P-2R-5_Bf7k?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0" // Placeholder, replace with relevant video
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
                    quiz: {
                        type: 'multiple-choice',
                        question: "What was the primary tool Cypherpunks believed was key to liberty?",
                        options: ["Laws", "Debates", "Cryptography", "Speeches"],
                        correctAnswer: "Cryptography",
                    },
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
                    quiz: {
                        type: 'true-false',
                        question: "True or False: Cypherpunks primarily relied on legislation to achieve privacy.",
                        correctAnswer: false,
                    },
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
                    quiz: {
                        type: 'text-input',
                        question: "What concept describes a market where transactions cannot be stopped by a central authority?",
                        correctAnswer: "Censorship Resistance",
                    },
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
                    quiz: {
                        type: 'true-false',
                        question: "True or False: Fiat currency is backed by physical gold.",
                        correctAnswer: false,
                    },
                },
                {
                    id: 2,
                    title: "Bitcoin: A Peer-to-Peer Electronic Cash System",
                    challenge: `From the shadows, an anonymous figure, Satoshi Nakamoto, rode into the digital frontier with a revolutionary proposal: **Bitcoin**. It was the first true 'electronic cash' that didn't need a bank, a government, or any trusted middleman. It was a digital currency for the people, by the people, secured by pure cryptography.

**Reflection:** How does eliminating the 'trusted third party' in financial transactions enhance privacy and decentralization?`,
                    successMessage: "Bitcoin's core principle absorbed. Trustless transactions for a new new age. Click 'Next Step' to continue.",
                    failureMessage: "Focus on the 'peer-to-peer' aspect. What does that remove from the equation? Click 'Deploy' to confirm understanding.",
                    initialCodeTemplateKey: 'ethos_lesson2_2',
                    visualEffectTrigger: 'decentralizedNodes',
                    hintMessage: "When you send money directly to someone else, without a bank in the middle, who can stop it? No one.",
                    isCodingChallenge: false,
                    quiz: {
                        type: 'multiple-choice',
                        question: "What does 'peer-to-peer' mean in the context of Bitcoin?",
                        options: ["Requires a central server", "Direct transactions between users", "Only for anonymous users", "Backed by government"],
                        correctAnswer: "Direct transactions between users",
                    },
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
                    quiz: {
                        type: 'text-input',
                        question: "What is the key characteristic of a blockchain that prevents past transactions from being altered?",
                        correctAnswer: "Immutability",
                    },
                },
            ]
          },
        },
        // Lesson 4
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
                quiz: {
                    type: 'multiple-choice',
                    question: "What do smart contracts allow to be executed directly on the blockchain?",
                    options: ["Legal documents", "Digital agreements", "Physical contracts", "Verbal promises"],
                    correctAnswer: "Digital agreements",
                },
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
                quiz: {
                    type: 'text-input',
                    question: "What is the primary risk to decentralization as Web3 grows?",
                    correctAnswer: "Centralization",
                },
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
                quiz: {
                    type: 'multiple-choice',
                    question: "Which of these is NOT a core cypherpunk principle?",
                    options: ["Privacy", "Decentralization", "Censorship Resistance", "Centralized Control"],
                    correctAnswer: "Centralized Control",
                },
              },
            ]
          },
        },
    // --- ORIGINAL Solana Lessons (IDs SHIFTED and chapter updated) ---
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
                    isCodingChallenge: true, // Mark as coding challenge
                },
            ]
        },
    },
    {
        id: 6, // Original Lesson 2
        title: "Creating Your Ranch Account",
        description: "Build your first Solana program to manage ranch data",
        chapter: 5, // Chapter adjusted
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
                    visualEffectTrigger: 'sparkle',
                    hintMessage: "Look for the comment that says 'USER ADDS PUB OWNER: PUBKEY HERE' and replace it with the owner field definition.",
                    isCodingChallenge: true,
                },
                {
                    id: 2,
                    title: "Assign Owner in Initialize Function",
                    challenge: "Now set the ranch owner when creating a new ranch! In the `initialize_ranch` function, assign the owner by setting `ranch.owner = ctx.accounts.owner.key()` (Rust) or `ranch.owner = owner.key()` (Python).",
                    expectedCodePattern: { rust: 'ranch\\.owner\\s*=\\s*ctx\\.accounts\\.owner\\.key\\(\\)', python: 'ranch\\.owner\\s*=\\s*owner\\.key\\(\\)' },
                    successMessage: "Perfect! Your ranch now properly assigns ownership when created. The owner field is set correctly!",
                    failureMessage: "The owner assignment is missing or incorrect. Make sure to set 'ranch.owner = ctx.accounts.owner.key()' (Rust) or 'ranch.owner = owner.key()' (Python) in the initialize function.",
                    initialCodeTemplateKey: 'ranch_management_step1_complete',
                    visualEffectTrigger: 'transaction',
                    hintMessage: "Look for the TODO comment about assigning the owner field. Replace it with the owner assignment line.",
                    isCodingChallenge: true,
                },
                {
                    id: 3,
                    title: "Add PDA Seeds and Bump",
                    challenge: "Make your ranch account deterministic using Program Derived Addresses (PDAs)! Add the seeds and bump to the ranch account definition. Use seeds = [b\"ranch\", owner.key().as_ref()] and bump for Rust, or seeds=['ranch', owner] and bump for Python.",
                    expectedCodePattern: { rust: 'seeds\\s*=\\s*\\[b\"ranch\",\\s*owner\\.key\\(\\)\\.as_ref\\(\\)\\]', python: 'seeds\\s*=\\s*\\[.ranch.,\\s*owner\\]' },
                    successMessage: "Brilliant! Your ranch is now a PDA - a deterministic address that can be found by anyone who knows the seeds. This is a fundamental Solana concept!",
                    failureMessage: "The PDA configuration is missing or incorrect. Make sure to add the seeds and bump parameters correctly in the account definition.",
                    initialCodeTemplateKey: 'ranch_management_step2_complete',
                    visualEffectTrigger: 'dataStream',
                    hintMessage: "Look for the comment about adding seeds and bump. Uncomment those lines and ensure they're properly formatted.",
                    isCodingChallenge: true,
                },
            ]
        },
    },
    {
        id: 7, // Original Lesson 3
        title: "Ranch Building System",
        description: "Implement building construction and management",
        chapter: 6, // Chapter adjusted
        difficulty: 'intermediate',
        estimatedTime: 60,
        isPremium: false,
        content: {
            steps: [
                { id: 1, title: "Coming Soon...", challenge: "This lesson is under development.", expectedCodePattern: {}, successMessage: "", failureMessage: "", initialCodeTemplateKey: 'default', isCodingChallenge: true }
            ]
        }
    },
    {
        id: 8, // Original Lesson 4
        title: "RanchCoin Token Creation",
        description: "Deploy your own SPL token for in-game economy",
        chapter: 7, // Chapter adjusted
        difficulty: 'intermediate',
        estimatedTime: 50,
        isPremium: true,
        content: {
            steps: [
                { id: 1, title: "Coming Soon...", challenge: "This lesson is under development.", expectedCodePattern: {}, successMessage: "", failureMessage: "", initialCodeTemplateKey: 'default', isCodingChallenge: true }
            ]
        }
    },
    {
        id: 9, // Original Lesson 5
        title: "Saloon Dueling System",
        description: "Program interactive duels and betting mechanics",
        chapter: 8, // Chapter adjusted
        difficulty: 'advanced',
        estimatedTime: 75,
        isPremium: true,
        content: {
            steps: [
                { id: 1, title: "Coming Soon...", challenge: "This lesson is under development.", expectedCodePattern: {}, successMessage: "", failureMessage: "", initialCodeTemplateKey: 'default', isCodingChallenge: true }
            ]
        }
    },
    {
        id: 10, // Original Lesson 6
        title: "Security & Ranch Defense",
        description: "Implement security measures against shadow beasts",
        chapter: 9, // Chapter adjusted
        difficulty: 'advanced',
        estimatedTime: 90,
        isPremium: true,
        content: {
            steps: [
                { id: 1, title: "Coming Soon...", challenge: "This lesson is under development.", expectedCodePattern: {}, successMessage: "", failureMessage: "", initialCodeTemplateKey: 'default', isCodingChallenge: true }
            ]
        }
    },
    {
        id: 11, // Original Lesson 7
        title: "Ether Range Expeditions",
        description: "Master cross-program invocations and external integrations",
        chapter: 10, // Chapter adjusted
        difficulty: 'advanced',
        estimatedTime: 120,
        isPremium: true,
        content: {
            steps: [
                { id: 1, title: "Coming Soon...", challenge: "This lesson is under development.", expectedCodePattern: {}, successMessage: "", failureMessage: "", initialCodeTemplateKey: 'default', isCodingChallenge: true }
            ]
        }
    }
];