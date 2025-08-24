# Shadow Ranch (a Solana Adventure)

**Learn the Ethos. Master the Code.**

[![Solana](https://img.shields.io/badge/Solana-9945FF?style=for-the-badge&logo=solana&logoColor=white)](https://solana.com/)
[![Anchor](https://img.shields.io/badge/Anchor-0.29.0-blue?style=for-the-badge)](https://www.anchor-lang.com/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Shadow Ranch is a first-of-its-kind educational platform designed to forge the next generation of principled Web3 builders on the Solana blockchain.

## 🎯 The Mission

The promise of Web3 was a decentralized, private, and user-owned internet. However, as the space has evolved, the centralizing, extractive models of Web 2.0 have begun to creep in. Shadow Ranch exists to counter this trend. 

Our mission is to reconnect the act of coding with the founding ethos of the Cypherpunk movement, ensuring that new builders don't just learn **how** to build, but **why** they should build differently.

## 🛤️ What We Offer

Shadow Ranch provides a unique, two-track learning experience:

### 🏛️ The Cypherpunk Legacy
An interactive, narrative-driven history course that immerses users in the principles of privacy, decentralization, and censorship resistance. This track teaches the **"why"** behind Web3.

### ⚙️ Solana Corps of Engineers  
A gamified, hands-on coding curriculum that teaches Solana program development from the ground up. This track teaches the **"how,"** with users earning NFT achievements for their progress.

By combining philosophy with practical skills, we aim to cultivate a community of developers dedicated to building a truly open and equitable digital future.

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library
- **TypeScript 5.6.3** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **D3.js** - Data visualization
- **Zustand** - State management

### Blockchain
- **Solana** - High-performance blockchain
- **Anchor Framework 0.29.0** - Solana development framework (Rust)
- **@solana/web3.js** - Solana JavaScript SDK
- **MPL Token Metadata 3.2.3** - Metaplex NFT standard

### Backend & Database
- **Firebase/Firestore** - User profiles and authentication
- **Express.js** - API server

### Development Tools
- **Rust 1.80.0** - Systems programming language for Solana programs
- **Solana CLI 1.18.26** - Solana command-line tools
- **ESLint** - Code linting
- **TypeScript** - Type checking

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Rust](https://rustup.rs/) (latest stable)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/christopher-cialone/SHADOW-RANCHXYZ.git
   cd SHADOW-RANCHXYZ
   ```

2. **Set up the correct Rust toolchain**
   ```bash
   rustup override set 1.80.0
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Build the Solana program**
   ```bash
   npm run anchor:build
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 📋 Available Scripts

### Frontend Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run check` - Run TypeScript type checking

### Solana Program Development
- `npm run anchor:build` - Build Solana programs
- `npm run anchor:test` - Run Solana program tests
- `npm run anchor:deploy` - Deploy programs to configured cluster

## 🏗️ Project Structure

```
SHADOW-RANCHXYZ/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── cypherpunk/          # Cypherpunk Legacy track components
│   │   ├── solana/              # Solana Corps track components
│   │   ├── game/                # Gamification components
│   │   ├── layout/              # Layout components
│   │   └── ui/                  # Reusable UI components
│   ├── pages/                   # Page components
│   ├── hooks/                   # Custom React hooks
│   ├── contexts/                # React contexts
│   ├── data/                    # Static data and configurations
│   ├── lib/                     # Utility libraries
│   └── assets/                  # Static assets
├── programs/                    # Solana programs
│   └── shadow-ranch-program/    # Main Solana program
├── tests/                       # Solana program tests
├── Anchor.toml                  # Anchor configuration
├── Cargo.toml                   # Rust workspace configuration
└── package.json                 # Node.js dependencies
```

## 🔧 Development Configuration

This project uses a carefully configured development environment to ensure stability:

- **Anchor Framework**: 0.29.0 (stable version)
- **Solana CLI**: 1.18.26 (compatible with Anchor 0.29.0)
- **Rust Toolchain**: 1.80.0 (project override)
- **MPL Token Metadata**: 3.2.3 (compatible with Anchor 0.29.0)

This configuration resolves known dependency conflicts and provides a stable foundation for development.

## 🧪 Testing

### Frontend Tests
```bash
npm run test
```

### Solana Program Tests
```bash
npm run anchor:test
```

## 🚢 Deployment

### Local Development
The project is configured for local development by default. The Solana program deploys to a local validator.

### Devnet Deployment
To deploy to Solana Devnet:

1. Update `Anchor.toml` cluster configuration
2. Ensure you have devnet SOL in your wallet
3. Run: `npm run anchor:deploy`

## 🤝 Contributing

We welcome contributions to Shadow Ranch! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Repository](https://github.com/christopher-cialone/SHADOW-RANCHXYZ)
- [Solana Documentation](https://docs.solana.com/)
- [Anchor Documentation](https://www.anchor-lang.com/)
- [React Documentation](https://reactjs.org/docs)

## 🆘 Troubleshooting

### Common Issues

**Build Errors with Anchor**
- Ensure Rust 1.80.0 is set: `rustup override set 1.80.0`
- Clean and rebuild: `rm -rf target/ node_modules/ && npm install && npm run anchor:build`

**Dependency Conflicts**
- This project uses Anchor 0.29.0 with MPL Token Metadata 3.2.3 for stability
- If upgrading dependencies, ensure version compatibility

**Local Validator Issues**
- Restart local validator: `solana-test-validator --reset`
- Check Solana CLI configuration: `solana config get`

For more help, please open an issue on GitHub.

---

**Built with ❤️ for the Cypherpunk community and the future of decentralized education.**