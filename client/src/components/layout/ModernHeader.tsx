import { Link, useLocation } from "wouter";
import { ModernButton } from "@/components/ui/ModernButton";
import { WalletButton } from "@/components/wallet/WalletButton";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function ModernHeader() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/cypherpunks-ethos", label: "Ethos", icon: "🛡️" },
    { href: "/lessons", label: "Code", icon: "⚡" },
    { href: "/ranch", label: "Ranch", icon: "🏜️" },
    { href: "/playground", label: "Playground", icon: "🧪" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <nav className="section-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-bold text-primary-foreground group-hover:scale-110 transition-transform duration-300">
              S
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-xl text-gradient">Shadow Ranch</div>
              <div className="text-xs text-muted-foreground -mt-1">Solana Development</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <button
                  className={cn(
                    "nav-link flex items-center gap-2 text-sm",
                    location === item.href && "active text-primary bg-primary/10"
                  )}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <WalletButton />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "w-full text-left nav-link flex items-center gap-3 text-base",
                      location === item.href && "active text-primary bg-primary/10"
                    )}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}