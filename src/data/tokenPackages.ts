
import React from "react";
import { Gift, Star } from "lucide-react";
import { TokenPackage } from "@/components/shop/TokenPackageCard";

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
      { type: "Spins", value: "+50", icon: <Gift className="h-4 w-4 text-yellow-400" /> },
      { type: "XP Boost", value: "1.5x", icon: <Star className="h-4 w-4 text-pink-500" /> }
    ]
  },
  {
    id: "medium",
    tokens: 50000000,
    price: 9.99,
    webStoreBonus: 5000000,
    tags: ["Popular"],
    bonuses: [
      { type: "Spins", value: "+100", icon: <Gift className="h-4 w-4 text-yellow-400" /> },
      { type: "XP Boost", value: "2x", icon: <Star className="h-4 w-4 text-pink-500" /> }
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
      { type: "Win", value: "+200", icon: <Gift className="h-4 w-4 text-yellow-400" /> },
      { type: "XP Boost", value: "2.5x", icon: <Star className="h-4 w-4 text-pink-500" /> },
      { type: "Bonus", value: "1 Pack", icon: <Gift className="h-4 w-4 text-yellow-400" /> }
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
      { type: "Win", value: "+500", icon: <Gift className="h-4 w-4 text-yellow-400" /> },
      { type: "XP Boost", value: "3x", icon: <Star className="h-4 w-4 text-pink-500" /> },
      { type: "Bonus", value: "3 Pack", icon: <Gift className="h-4 w-4 text-yellow-400" /> }
    ]
  }
];

export default tokenPackages;
