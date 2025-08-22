import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Tech Theme Colors
        "tech-purple": {
          50: "hsl(var(--tech-purple-50))",
          100: "hsl(var(--tech-purple-100))",
          200: "hsl(var(--tech-purple-200))",
          300: "hsl(var(--tech-purple-300))",
          400: "hsl(var(--tech-purple-400))",
          500: "hsl(var(--tech-purple-500))",
          600: "hsl(var(--tech-purple-600))",
          700: "hsl(var(--tech-purple-700))",
          800: "hsl(var(--tech-purple-800))",
          900: "hsl(var(--tech-purple-900))",
        },
        "tech-cyan": {
          50: "hsl(var(--tech-cyan-50))",
          100: "hsl(var(--tech-cyan-100))",
          200: "hsl(var(--tech-cyan-200))",
          300: "hsl(var(--tech-cyan-300))",
          400: "hsl(var(--tech-cyan-400))",
          500: "hsl(var(--tech-cyan-500))",
          600: "hsl(var(--tech-cyan-600))",
          700: "hsl(var(--tech-cyan-700))",
          800: "hsl(var(--tech-cyan-800))",
          900: "hsl(var(--tech-cyan-900))",
        },
        "tech-pink": {
          50: "hsl(var(--tech-purple-50))",
          100: "hsl(var(--tech-purple-100))",
          200: "hsl(var(--tech-purple-200))",
          300: "hsl(var(--tech-purple-300))",
          400: "hsl(var(--tech-purple-400))",
          500: "hsl(var(--tech-purple-500))",
          600: "hsl(var(--tech-purple-600))",
          700: "hsl(var(--tech-purple-700))",
          800: "hsl(var(--tech-purple-800))",
          900: "hsl(var(--tech-purple-900))",
        },
      },
      fontFamily: {
        titulo: ['Archivo Black', 'sans-serif'],
        tech: ['Orbitron', 'sans-serif'],
        data70: ['Data70EF', 'Orbitron', 'sans-serif'],
        'space-gothic': ['SpaceGothic', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "dust-swirl": {
          '0%': { transform: 'translateX(-100px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateX(100vw) rotate(360deg)', opacity: '0' }
        },
        "sheriff-star": {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)', filter: 'brightness(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)', filter: 'brightness(1.3)' }
        },
        "glow-pulse": {
          '0%': { boxShadow: '0 0 5px rgba(212, 165, 116, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(212, 165, 116, 0.8), 0 0 30px rgba(212, 165, 116, 0.6)' }
        },
        "fade-in": {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        "slide-up": {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "dust-swirl": "dust-swirl 20s infinite linear",
        "sheriff-star": "sheriff-star 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out"
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
