
// Types for the loyalty program

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  ccPoints: number;
  tier: TierLevel;
  joinDate: Date;
  lastLoginDate: Date;
  loginStreak: number;
  totalPurchases: number;
  friendsCount: number;
  referralsCount: number;
}

export enum TierLevel {
  Bronze = "Bronze",
  Silver = "Silver",
  Gold = "Gold",
  Platinum = "Platinum",
}

export interface Tier {
  level: TierLevel;
  requiredPoints: number;
  benefits: string[];
  icon: string;
  color: string;
  nextTier?: TierLevel;
  nextTierPoints?: number;
}

export interface PointsTransaction {
  id: string;
  userId: string;
  amount: number;
  type: PointsTransactionType;
  source: PointsSource;
  description: string;
  date: Date;
}

export enum PointsTransactionType {
  Earned = "Earned",
  Spent = "Spent",
}

export enum PointsSource {
  Purchase = "Purchase",
  DailyLogin = "DailyLogin",
  LoginStreak = "LoginStreak",
  Referral = "Referral",
  FriendActivity = "FriendActivity",
  SpinWheel = "SpinWheel",
  Redemption = "Redemption",
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  image?: string;
  type: RewardType;
  value: number | string;
  available: boolean;
  tierRequired?: TierLevel;
  expiryDate?: Date;
}

export enum RewardType {
  Discount = "Discount",
  Token = "Token",
  Pack = "Pack",
  Sweepstakes = "Sweepstakes",
}

export interface SpinWheelReward {
  id: number;
  name: string;
  value: number | string;
  type: RewardType;
  probability: number; // Percentage chance (0-100)
  color: string;
}

export interface Friend {
  id: string;
  name: string;
  avatarUrl?: string;
  tier: TierLevel;
  joinDate: Date;
  pointsGenerated: number;
}

export interface Referral {
  id: string;
  email: string;
  status: ReferralStatus;
  date: Date;
  completedDate?: Date;
  pointsEarned?: number;
}

export enum ReferralStatus {
  Pending = "Pending",
  Completed = "Completed",
  Expired = "Expired",
}
