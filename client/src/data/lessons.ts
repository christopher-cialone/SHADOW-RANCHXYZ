// PASTE THIS ENTIRE CODE BLOCK INTO src/data/lessons.ts

export interface Lesson {
  id: number;
  title: string;
  track: 'cypherpunk' | 'solana-ethos' | 'solana-code'; // Explicit track identifier
  content: any; // Add content property for existing lesson structure
  description?: string;
}

// This is the master list of all lessons
export const allLessons: Lesson[] = [
  // --- IMPORTANT ---
  // You must add your Cypherpunk track lessons here with 'track: "cypherpunk"'
  // Example: { id: 101, title: "Cypherpunk Ethos 1", track: 'cypherpunk', ... },

  // SOLANA TRACK LESSONS (OLD STRUCTURE)
  { 
    id: 1, 
    title: "The Digital Frontier's Code of Honor", 
    track: 'solana-ethos',
    content: { steps: [] } // Placeholder content
  },
  { 
    id: 2, 
    title: "Echoes from the Old World", 
    track: 'solana-ethos',
    content: { steps: [] } // Placeholder content
  },
  { 
    id: 3, 
    title: "Principles of Privacy", 
    track: 'solana-ethos',
    content: { steps: [] } // Placeholder content
  },
  { 
    id: 4, 
    title: "Decentralized Identity", 
    track: 'solana-ethos',
    content: { steps: [] } // Placeholder content
  },
  { 
    id: 5, 
    title: "Rust Fundamentals", 
    track: 'solana-code',
    content: {
      steps: [
        {
          id: 1,
          title: "Variables & Data Types",
          challenge: "Learn the fundamentals of Rust variables and data types in the context of Solana development.",
          quiz: {
            type: "multiple-choice",
            question: "Which data type is commonly used for account addresses in Solana?",
            options: ["String", "Pubkey", "u64", "Vec<u8>"],
            correctAnswer: "Pubkey"
          },
          successMessage: "Excellent! You understand Rust data types for Solana.",
          failureMessage: "Not quite. In Solana, Pubkey is the standard type for account addresses."
        },
        {
          id: 2,
          title: "Basic Program Structure",
          challenge: "Understand the basic structure of a Solana program written in Rust.",
          isCodingChallenge: true,
          initialCodeTemplateKey: "rust_basic_program",
          expectedOutput: "Hello, Solana!",
          successMessage: "Great! You've created your first Solana program structure.",
          failureMessage: "Check your program entry point and return statement."
        }
      ]
    }
  },
  { 
    id: 6, 
    title: "Anchor Framework Basics", 
    track: 'solana-code',
    content: {
      steps: [
        {
          id: 1,
          title: "Setting up Anchor",
          challenge: "Learn how to initialize and structure an Anchor project.",
          quiz: {
            type: "text-input",
            question: "What command initializes a new Anchor project?",
            correctAnswer: "anchor init"
          },
          successMessage: "Perfect! You know how to start an Anchor project.",
          failureMessage: "The correct command is 'anchor init' to create a new project."
        }
      ]
    }
  },
  { 
    id: 7, 
    title: "Program Development", 
    track: 'solana-code',
    content: {
      steps: [
        {
          id: 1,
          title: "Writing Instructions",
          challenge: "Learn to write and structure Solana program instructions.",
          isCodingChallenge: true,
          initialCodeTemplateKey: "solana_instruction",
          expectedOutput: "Instruction executed successfully",
          successMessage: "Excellent! You can now write Solana instructions.",
          failureMessage: "Review the instruction handler structure and try again."
        }
      ]
    }
  }
  // Add any other original Solana lessons here...
];

// Filter for ONLY the solana-code lessons
const solanaCodingLessonsRaw = allLessons.filter(lesson => lesson.track === 'solana-code');

// Re-index the filtered lessons so their IDs start from 1
export const solanaCodingLessons = solanaCodingLessonsRaw.map((lesson, index) => ({
  ...lesson,
  id: index + 1, // This makes the old lesson 5 become the new lesson 1
}));

// Filter for the Cypherpunk lessons
export const cypherpunkLessons = allLessons.filter(lesson => lesson.track === 'cypherpunk');

// Combine the final, cleaned arrays into one export for the app to use
export const lessons = [...cypherpunkLessons, ...solanaCodingLessons];