import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWalletAddress(address: string | null): string {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function formatRanchCoin(amount: number): string {
  return new Intl.NumberFormat().format(amount);
}

export function getRarityColor(rarity: string): string {
  switch (rarity.toLowerCase()) {
    case "common":
      return "text-gray-400";
    case "uncommon":
      return "text-sage-400";
    case "rare":
      return "text-desert-400";
    case "epic":
      return "text-sunset-400";
    case "legendary":
      return "text-mystic-400";
    default:
      return "text-gray-400";
  }
}

export function getRarityBorder(rarity: string): string {
  switch (rarity.toLowerCase()) {
    case "common":
      return "border-gray-400";
    case "uncommon":
      return "border-sage-400";
    case "rare":
      return "border-desert-400";
    case "epic":
      return "border-sunset-400";
    case "legendary":
      return "border-mystic-400";
    default:
      return "border-gray-400";
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
