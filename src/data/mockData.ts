
import { 
  Friend, 
  PointsSource, 
  PointsTransaction, 
  PointsTransactionType, 
  Referral, 
  ReferralStatus, 
  Reward, 
  RewardType, 
  SpinWheelReward, 
  Tier, 
  TierLevel, 
  User 
} from "../models/loyalty";

// Mock user data
export const currentUser: User = {
  id: "user123",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatarUrl: "https://i.pravatar.cc/150?u=user123",
  ccPoints: 3750,
  tier: TierLevel.Silver,
  joinDate: new Date("2023-10-15"),
  lastLoginDate: new Date(),
  loginStreak: 7,
  totalPurchases: 12,
  friendsCount: 8,
  referralsCount: 3,
};

// Loyalty tiers
export const tiers: Tier[] = [
  {
    level: TierLevel.Bronze,
    requiredPoints: 0,
    benefits: [
      "Earn 1 CC Point per $1 spent",
      "Daily login bonuses",
      "Spin & Win access"
    ],
    icon: "award",
    color: "#CD7F32", // Bronze color
    nextTier: TierLevel.Silver,
    nextTierPoints: 1000,
  },
  {
    level: TierLevel.Silver,
    requiredPoints: 1000,
    benefits: [
      "Earn 1.5 CC Points per $1 spent",
      "Increased Spin & Win rewards",
      "Early access to new packs",
      "10% bonus on streak rewards"
    ],
    icon: "medal",
    color: "#C0C0C0", // Silver color
    nextTier: TierLevel.Gold,
    nextTierPoints: 5000,
  },
  {
    level: TierLevel.Gold,
    requiredPoints: 5000,
    benefits: [
      "Earn 2 CC Points per $1 spent",
      "Premium Spin & Win rewards",
      "Exclusive gold tier rewards",
      "25% bonus on streak rewards",
      "Monthly bonus rewards"
    ],
    icon: "trophy",
    color: "#FFD700", // Gold color
    nextTier: TierLevel.Platinum,
    nextTierPoints: 10000,
  },
  {
    level: TierLevel.Platinum,
    requiredPoints: 10000,
    benefits: [
      "Earn 3 CC Points per $1 spent",
      "VIP Spin & Win rewards",
      "Priority customer support",
      "50% bonus on streak rewards",
      "Weekly bonus rewards",
      "Exclusive platinum events"
    ],
    icon: "star",
    color: "#E5E4E2", // Platinum color
  },
];

// Available rewards
export const rewards: Reward[] = [
  {
    id: "reward1",
    name: "10% Discount",
    description: "Get 10% off your next purchase",
    pointsCost: 500,
    image: "/placeholder.svg",
    type: RewardType.Discount,
    value: 10,
    available: true,
  },
  {
    id: "reward2",
    name: "100 Game Tokens",
    description: "Redeem for 100 in-game tokens",
    pointsCost: 800,
    image: "/placeholder.svg",
    type: RewardType.Token,
    value: 100,
    available: true,
  },
  {
    id: "reward3",
    name: "Premium Pack",
    description: "Get a premium card pack",
    pointsCost: 1500,
    image: "/placeholder.svg",
    type: RewardType.Pack,
    value: "Premium Pack",
    available: true,
  },
  {
    id: "reward4",
    name: "25% Discount",
    description: "Get 25% off your next purchase",
    pointsCost: 2000,
    image: "/placeholder.svg",
    type: RewardType.Discount,
    value: 25,
    available: true,
    tierRequired: TierLevel.Silver,
  },
  {
    id: "reward5",
    name: "$50 Sweepstakes Entry",
    description: "Enter for a chance to win $50",
    pointsCost: 1000,
    image: "/placeholder.svg",
    type: RewardType.Sweepstakes,
    value: 50,
    available: true,
  },
  {
    id: "reward6",
    name: "Ultra Pack",
    description: "Get an ultra card pack with guaranteed rare items",
    pointsCost: 3000,
    image: "/placeholder.svg",
    type: RewardType.Pack,
    value: "Ultra Pack",
    available: true,
    tierRequired: TierLevel.Gold,
  },
];

// Recent point transactions
export const pointsHistory: PointsTransaction[] = [
  {
    id: "tx1",
    userId: "user123",
    amount: 100,
    type: PointsTransactionType.Earned,
    source: PointsSource.Purchase,
    description: "Web store purchase: Premium Pack",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "tx2",
    userId: "user123",
    amount: 25,
    type: PointsTransactionType.Earned,
    source: PointsSource.DailyLogin,
    description: "Daily login bonus",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "tx3",
    userId: "user123",
    amount: 50,
    type: PointsTransactionType.Earned,
    source: PointsSource.LoginStreak,
    description: "7-day login streak bonus",
    date: new Date(),
  },
  {
    id: "tx4",
    userId: "user123",
    amount: 500,
    type: PointsTransactionType.Spent,
    source: PointsSource.Redemption,
    description: "Redeemed: 10% Discount",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "tx5",
    userId: "user123",
    amount: 75,
    type: PointsTransactionType.Earned,
    source: PointsSource.FriendActivity,
    description: "Friend purchase: John D. bought an Ultra Pack",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
];

// Friends list
export const friends: Friend[] = [
  {
    id: "friend1",
    name: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?u=friend1",
    tier: TierLevel.Gold,
    joinDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    pointsGenerated: 350,
  },
  {
    id: "friend2",
    name: "Sarah Smith",
    avatarUrl: "https://i.pravatar.cc/150?u=friend2",
    tier: TierLevel.Silver,
    joinDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    pointsGenerated: 180,
  },
  {
    id: "friend3",
    name: "Mike Brown",
    avatarUrl: "https://i.pravatar.cc/150?u=friend3",
    tier: TierLevel.Bronze,
    joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    pointsGenerated: 75,
  },
];

// Referrals
export const referrals: Referral[] = [
  {
    id: "ref1",
    email: "jane@example.com",
    status: ReferralStatus.Completed,
    date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    completedDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
    pointsEarned: 200,
  },
  {
    id: "ref2",
    email: "tom@example.com",
    status: ReferralStatus.Pending,
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: "ref3",
    email: "lisa@example.com",
    status: ReferralStatus.Completed,
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    completedDate: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000),
    pointsEarned: 200,
  },
];

// Spin wheel rewards
export const spinWheelRewards: SpinWheelReward[] = [
  { id: 1, name: "50 CC Points", value: 50, type: RewardType.Token, probability: 20, color: "#9b87f5" },
  { id: 2, name: "100 CC Points", value: 100, type: RewardType.Token, probability: 10, color: "#E5DEFF" },
  { id: 3, name: "5% Discount", value: 5, type: RewardType.Discount, probability: 25, color: "#FEF7CD" },
  { id: 4, name: "10% Discount", value: 10, type: RewardType.Discount, probability: 15, color: "#9b87f5" },
  { id: 5, name: "Basic Pack", value: "Basic Pack", type: RewardType.Pack, probability: 10, color: "#D3E4FD" },
  { id: 6, name: "200 CC Points", value: 200, type: RewardType.Token, probability: 5, color: "#FDE1D3" },
  { id: 7, name: "Try Again", value: 0, type: RewardType.Token, probability: 10, color: "#9b87f5" },
  { id: 8, name: "$5 Sweepstakes", value: 5, type: RewardType.Sweepstakes, probability: 5, color: "#FEF7CD" },
];
