
import React from "react";
import LoyaltyNavbar from "@/components/LoyaltyNavbar";
import TokenPackageCard from "@/components/shop/TokenPackageCard";
import WebStoreBenefits from "@/components/shop/WebStoreBenefits";
import WebStoreHeader from "@/components/shop/WebStoreHeader";
import ShopFooter from "@/components/shop/ShopFooter";
import tokenPackages from "@/data/tokenPackages";

const Shop = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D243B] flex flex-col">
      <LoyaltyNavbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <WebStoreHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {tokenPackages.map((pack) => (
            <TokenPackageCard key={pack.id} pack={pack} />
          ))}
        </div>

        <WebStoreBenefits />
      </main>

      <ShopFooter />
    </div>
  );
};

export default Shop;
