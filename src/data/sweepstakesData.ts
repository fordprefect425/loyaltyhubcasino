
import { RewardType } from "@/models/loyalty";

export interface SweepstakesEntry {
  id: string;
  name: string;
  prize: string;
  pointsPerEntry: number;
  endsIn: string;
  image?: string;
  type: RewardType;
  entries?: number;
}

export const sweepstakesEntries: SweepstakesEntry[] = [
  {
    id: "sweep-1",
    name: "$100 Sweepstakes",
    prize: "$100 Cash Prize",
    pointsPerEntry: 100,
    endsIn: "10 hours",
    type: RewardType.Sweepstakes,
    entries: 0
  },
  {
    id: "sweep-2",
    name: "Luxury Weekend Getaway",
    prize: "Weekend at Casino Resort",
    pointsPerEntry: 250,
    endsIn: "2 days",
    type: RewardType.Sweepstakes,
    entries: 0
  },
  {
    id: "sweep-3",
    name: "VIP Tournament Entry",
    prize: "Exclusive Slot Tournament Entry",
    pointsPerEntry: 150,
    endsIn: "5 days",
    type: RewardType.Sweepstakes,
    entries: 0
  },
  {
    id: "sweep-4",
    name: "Million Token Jackpot",
    prize: "1 Million Tokens",
    pointsPerEntry: 200,
    endsIn: "3 days",
    type: RewardType.Sweepstakes,
    entries: 0
  }
];
