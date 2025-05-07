
import React from "react";
import LoyaltyNavbar from "@/components/LoyaltyNavbar";
import LoyaltyHeader from "@/components/LoyaltyHeader";
import PointsOverview from "@/components/PointsOverview";
import TierBenefits from "@/components/TierBenefits";
import DailyLogin from "@/components/DailyLogin";
import SpinWheel from "@/components/SpinWheel";
import PointsHistory from "@/components/PointsHistory";
import RewardsSection from "@/components/RewardsSection";
import ReferralSection from "@/components/ReferralSection";
import { currentUser, pointsHistory, rewards, friends, referrals } from "@/data/mockData";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D243B] flex flex-col">
      <LoyaltyNavbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <LoyaltyHeader user={currentUser} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <PointsOverview user={currentUser} />
          <TierBenefits user={currentUser} />
          <div className="space-y-6">
            <DailyLogin user={currentUser} />
            <PointsHistory transactions={pointsHistory.slice(0, 3)} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <SpinWheel user={currentUser} />
          </div>
          <RewardsSection rewards={rewards.slice(0, 3)} user={currentUser} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ReferralSection friends={friends} referrals={referrals} />
        </div>
      </main>
      
      <footer className="bg-[#2D243B] border-t border-[#3D3450] py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-[#9b87f5]">
            &copy; 2025 Casino Royale Loyalty Program. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
