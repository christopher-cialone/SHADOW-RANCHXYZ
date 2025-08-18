# Shadow Ranch - Solana Learning Game

## Overview
Shadow Ranch is a gamified educational platform designed to teach Solana blockchain development within an immersive Western-themed environment. It enables users to learn Rust, Anchor, and Solana development concepts by completing coding challenges, earning rewards, and building a virtual ranch. The project aims to combine full-stack web architecture with engaging game mechanics to provide an interactive learning experience. Key capabilities include interactive coding lessons with a Monaco editor, real-time code validation, a virtual ranch management system, and NFT reward collection.

## Recent Changes (August 2025)
### Critical Bug Resolution: Lesson Progression Loop
- **Issue**: Infinite looping in lesson progression caused by conflicting state management
- **Root Cause**: Dual state systems (`stepCompleted` local state vs `isStepCompleted` persistent store)
- **Solution**: Unified state management using only useLessonStore as single source of truth
- **Impact**: Smooth lesson progression now enabled for Solana track
- **Date**: August 18, 2025

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture
The application features a full-stack architecture with distinct frontend and backend components.

### Frontend Architecture
-   **Framework**: React 18 with TypeScript.
-   **Build Tool**: Vite.
-   **Routing**: Wouter.
-   **State Management**: Zustand for global state.
-   **UI Framework**: Custom Western-themed components built on Radix UI primitives.
-   **Styling**: Tailwind CSS with custom themes.
-   **Code Editor**: Monaco Editor for in-browser code editing.

### Backend Architecture
-   **Runtime**: Node.js with Express.js.
-   **Language**: TypeScript with ES modules.
-   **API Pattern**: RESTful APIs for lesson and progress management.

### Data Storage Strategy
-   **Interface**: `IStorage` for data operations.
-   **Current Implementation**: In-memory storage with Zustand persistence.
-   **Future Ready**: Prepared for PostgreSQL with Drizzle ORM.
-   **Schema**: Defined in `shared/schema.ts`.
-   **Lesson Data**: Restructured with explicit track categorization (`cypherpunk`, `solana-ethos`, `solana-code`).

### Key Components
-   **Lesson System**: Multi-step coding challenges with content stored in TypeScript data files, featuring pattern-matching validation and unified progress tracking via useLessonStore.
-   **Game Mechanics**: Includes virtual ranch management, a ranch coin currency system, experience points (XP) with leveling, and visual effects for achievements.
-   **Code Editor Integration**: Monaco Editor with syntax highlighting for Rust and Python, real-time validation, and code templates.
-   **UI/UX Design**: Dual theming (Western aesthetic + tech styling), responsive design, accessibility built on Radix UI, and custom CSS animations.

### Data Flow
Lessons are loaded from static files, user code is validated, progress is updated to persistent storage, rewards are distributed, and the ranch state is updated based on purchases.

### Deployment Strategy
-   **Replit Configuration**: Node.js 20 and PostgreSQL 16 modules enabled. `npm run dev` for concurrent frontend/backend development.
-   **Build Process**: Vite compiles the frontend, ESBuild bundles the Express server, and the production server serves static assets.
-   **Database Migration**: Drizzle Kit handles schema migrations using `DATABASE_URL` environment variable.

## External Dependencies

### Core Libraries
-   **React Ecosystem**: React 18, React DOM, React Query.
-   **Development**: Vite, TypeScript, ESBuild.
-   **UI Foundation**: Radix UI primitives, Tailwind CSS, Lucide icons.
-   **Code Editor**: Monaco Editor.

### Database & Storage
-   **Drizzle ORM**: Type-safe database queries.
-   **Neon Database**: Serverless PostgreSQL driver.
-   **Firebase**: Optional Firestore integration.
-   **Zustand**: Client-side state persistence.

### Development Tools
-   **Hot Reloading**: Vite dev server.
-   **Type Safety**: Strict TypeScript configuration.
-   **Path Aliases**: Configured for clean imports.