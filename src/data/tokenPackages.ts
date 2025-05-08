
import { ReactNode } from "react";

export interface TokenPackageBonus {
  type: string;
  value: string;
  icon: string; // Changed from ReactNode to string to avoid JSX in .ts file
}

export interface TokenPackageSale {
  name: string;
  discount: number;
}

export interface TokenPackage {
  id: string;
  tokens: number;
  price: number;
  originalPrice?: number;
  webStoreBonus: number;
  bonusPercentage?: number;
  isBestValue?: boolean;
  tags?: string[];
  sale?: TokenPackageSale;
  bonuses: TokenPackageBonus[];
}

const tokenPackages: TokenPackage[] = [
  {
    id: "small",
    tokens: 10000000,
    price: 4.99,
    webStoreBonus: 1000000,
    tags: ["Starter"],
    sale: {
      name: "Weekend Deal",
      discount: 5
    },
    bonuses: [
      { type: "Spins", value: "+50", icon: "gift" },
      { type: "XP Boost", value: "1.5x", icon: "star" }
    ]
  },
  {
    id: "medium",
    tokens: 50000000,
    price: 9.99,
    webStoreBonus: 5000000,
    tags: ["Popular"],
    bonuses: [
      { type: "Spins", value: "+100", icon: "gift" },
      { type: "XP Boost", value: "2x", icon: "star" }
    ]
  },
  {
    id: "large",
    tokens: 120550500,
    originalPrice: 39.99,
    price: 29.99,
    webStoreBonus: 12055050,
    bonusPercentage: 40,
    isBestValue: true,
    tags: ["Best Value", "Limited"],
    sale: {
      name: "Spring Sale",
      discount: 25
    },
    bonuses: [
      { type: "Win", value: "+200", icon: "gift" },
      { type: "XP Boost", value: "2.5x", icon: "star" },
      { type: "Bonus", value: "1 Pack", icon: "gift" }
    ]
  },
  {
    id: "mega",
    tokens: 500000000,
    price: 99.99,
    webStoreBonus: 50000000,
    bonusPercentage: 10,
    tags: ["Premium", "VIP"],
    sale: {
      name: "Flash Deal",
      discount: 10
    },
    bonuses: [
      { type: "Win", value: "+500", icon: "gift" },
      { type: "XP Boost", value: "3x", icon: "star" },
      { type: "Bonus", value: "3 Pack", icon: "gift" }
    ]
  }
];

export default tokenPackages;
