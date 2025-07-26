# Shadow Ranch - Solana Learning Game

## Overview

Shadow Ranch is a gamified educational platform that teaches Solana blockchain development through an immersive Western-themed experience. Students complete coding challenges, earn rewards, and build their virtual ranch while learning Rust, Anchor, and Solana development concepts.

The application combines a full-stack web architecture with game mechanics, featuring:
- Interactive coding lessons with Monaco editor
- Real-time code validation and feedback
- Virtual ranch management system
- NFT reward collection
- Progressive skill building

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Zustand for global state (lessons, game data, ranch)
- **UI Framework**: Custom Western-themed components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom Western and tech themes
- **Code Editor**: Monaco Editor for in-browser code editing

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful APIs for lesson and progress management
- **Development**: Hot reloading with Vite middleware integration

### Data Storage Strategy
The application implements a flexible storage interface pattern:
- **Interface**: `IStorage` defines all data operations
- **Current Implementation**: In-memory storage with Zustand persistence
- **Future Ready**: Prepared for PostgreSQL with Drizzle ORM
- **Firebase Integration**: Partial Firestore implementation available
- **Schema**: Comprehensive database schema defined in `shared/schema.ts`

## Key Components

### Lesson System
- **Structure**: Multi-step coding challenges with progressive difficulty
- **Content**: Lessons stored in TypeScript data files for easy modification
- **Validation**: Pattern-matching for code completion verification
- **Progress Tracking**: Step-by-step completion with attempt counting

### Game Mechanics
- **Ranch Management**: Virtual ranch with buildings, characters, and resources
- **Currency System**: Ranch coins earned through lesson completion
- **Experience Points**: XP system with leveling mechanics
- **Visual Effects**: Animated feedback for achievements and interactions

### Code Editor Integration
- **Monaco Editor**: Full-featured code editor with syntax highlighting
- **Language Support**: Rust and Python with extensible template system
- **Real-time Validation**: Immediate feedback on code submission
- **Code Templates**: Pre-built starting points for each lesson

### UI/UX Design
- **Theming**: Dual theme system (Western aesthetic + tech styling)
- **Responsive**: Mobile-friendly design with adaptive layouts
- **Accessibility**: Built on Radix UI for screen reader support
- **Animations**: Custom CSS animations for engagement

## Data Flow

1. **Lesson Loading**: Lessons loaded from static data files, progress retrieved from storage
2. **Code Execution**: User code validated against expected patterns, results processed
3. **Progress Updates**: Completion status saved to persistent storage
4. **Reward Distribution**: Game state updated with coins, XP, and unlocked content
5. **Ranch Updates**: Building/character purchases modify ranch state

## External Dependencies

### Core Libraries
- **React Ecosystem**: React 18, React DOM, React Query for server state
- **Development**: Vite, TypeScript, ESBuild for production builds
- **UI Foundation**: Radix UI primitives, Tailwind CSS, Lucide icons
- **Code Editor**: Monaco Editor with syntax highlighting

### Database & Storage
- **Drizzle ORM**: Type-safe database queries (PostgreSQL ready)
- **Neon Database**: Serverless PostgreSQL driver configured
- **Firebase**: Optional Firestore integration available
- **Zustand**: Client-side state persistence

### Development Tools
- **Hot Reloading**: Vite dev server with Express integration
- **Type Safety**: Strict TypeScript configuration
- **Path Aliases**: Configured for clean imports (`@/`, `@shared/`)

## Deployment Strategy

### Replit Configuration
- **Environment**: Node.js 20, PostgreSQL 16 modules enabled
- **Development**: `npm run dev` starts concurrent frontend/backend
- **Production**: Build process creates optimized static assets and server bundle
- **Port Configuration**: Backend serves on port 5000, Vite dev on 5173

### Build Process
1. **Frontend Build**: Vite compiles React app to `dist/public`
2. **Backend Build**: ESBuild bundles Express server to `dist/index.js`
3. **Static Serving**: Production server serves built frontend assets
4. **API Routes**: Backend handles `/api/*` requests

### Database Migration
- **Schema Management**: Drizzle Kit handles database migrations
- **Environment Variables**: `DATABASE_URL` required for PostgreSQL connection
- **Push Command**: `npm run db:push` applies schema changes

## Changelog

```
Changelog:
- July 26, 2025: Dual-Track Learning System with Module 2 Implementation
  - Split lessons into two distinct tracks: "The Cypherpunk Legacy" and "Solana Corps of Engineers"
  - Implemented comprehensive progress tracking system with Zustand persistence
  - Created Module 2: "The Pillars of a Free Internet" with interactive components:
    * Privacy scenario simulation with real-world journalism case study
    * Anonymous remailer demonstration with visual message routing
    * Network decentralization comparison (centralized vs. mesh networks)
    * Interactive failure simulations showing resilience differences
  - Enhanced dashboard with dynamic progress bars and track completion indicators
  - Added intelligent module routing based on user progress
  - Maintained consistent tech aesthetic with cyan/purple gradient themes
- June 18, 2025: Enhanced V6 Interactive Ethos Implementation Complete
  - Rebuilt comprehensive cypherpunk ethos curriculum (Modules 0-3)
  - Added interactive quiz system with multiple question types (text-input, multiple-choice, true-false)
  - Enhanced lesson interface with video embedding capability
  - Fixed TypeScript errors and code template system
  - Implemented proper quiz validation and feedback system
  - Added visual enhancements for narrative-based learning
  - Completed comprehensive code templates for all ethos lessons
- June 17, 2025: Implemented comprehensive cypherpunk ethos and history curriculum
  - Added foundational lessons (Modules 0-3) covering digital freedom philosophy
  - Created narrative-based learning system with non-coding steps
  - Enhanced lesson interface to support both coding and philosophical content
  - Added new visual effects and code templates for ethos lessons
  - Restructured lesson progression: ethos foundations → technical implementation
- June 15, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```