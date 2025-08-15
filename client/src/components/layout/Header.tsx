import { useState } from "react";
import { Link, useLocation } from "wouter";
import { WalletButton } from "@/components/wallet/WalletButton";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onThemeToggle: () => void;
  currentTheme?: string;
}

export function Header({ onThemeToggle, currentTheme }: HeaderProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/cypherpunks-ethos", label: "Ethos" },
    { href: "/lessons", label: "Lessons" },
    { href: "/ranch", label: "My Ranch" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile header - optimized for small screens */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-cyan-400/20"
        style={{ height: 'var(--header-height)' }}
      >
        <div className="container mx-auto px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-between h-full">
          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="mobile-nav-toggle md:hidden"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo - responsive sizing */}
          <Link href="/">
            <div className="flex items-center space-x-2 sm:space-x-4 cursor-pointer touch-target">
              <span className="text-cyan-400 text-lg sm:text-2xl animate-pulse">🏜️</span>
              <h1 className="font-space-gothic text-lg sm:text-xl md:text-2xl lg:text-[30px] leading-tight hover:text-cyan-300 transition-colors text-[#67e8f9]">shadowranch.xyz</h1>
            </div>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={cn(
                    "font-mono text-sm lg:text-base text-gray-300 hover:text-cyan-400 transition-colors uppercase tracking-wider cursor-pointer touch-target flex items-center justify-center px-3 py-2 rounded-lg",
                    location === item.href && "text-cyan-400 bg-cyan-400/10"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
          
          {/* Right side actions */}
          <div className="flex items-center">
            <WalletButton />
          </div>
        </div>
      </header>
      {/* Mobile navigation overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay md:hidden"
          onClick={closeMobileMenu}
        />
      )}
      {/* Mobile navigation sidebar */}
      <nav className={cn(
        "mobile-sidebar md:hidden",
        isMobileMenuOpen ? "mobile-sidebar-open" : "mobile-sidebar-closed"
      )}
      style={{ top: 'var(--header-height)' }}
      >
        <div className="p-mobile-6 space-y-1">
          <div className="text-tech-cyan-400 font-mono text-mobile-sm uppercase tracking-wider mb-6 px-3">
            Navigation
          </div>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                onClick={closeMobileMenu}
                className={cn(
                  "block px-4 py-4 text-mobile-lg font-medium text-gray-300 hover:text-tech-cyan-400 hover:bg-tech-cyan-400/10 rounded-lg transition-all duration-200 touch-target cursor-pointer",
                  location === item.href && "text-tech-cyan-400 bg-tech-cyan-400/20 border-l-4 border-tech-cyan-400"
                )}
              >
                {item.label}
              </div>
            </Link>
          ))}
          
          {/* Mobile-only utility links */}
          <div className="pt-6 mt-6 border-t border-tech-cyan-400/20">
            <Link href="/wallet-test">
              <div
                onClick={closeMobileMenu}
                className="block px-4 py-4 text-mobile-lg font-medium text-gray-400 hover:text-tech-cyan-400 hover:bg-tech-cyan-400/10 rounded-lg transition-all duration-200 touch-target cursor-pointer"
              >
                Wallet Test
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
