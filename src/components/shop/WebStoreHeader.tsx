
import React from "react";
import { ShoppingCart } from "lucide-react";
import StoreCarouselBanner from "./StoreCarouselBanner";

const WebStoreHeader: React.FC = () => {
  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-lg p-4 mb-8 shadow-lg animate-pulse">
        <h2 className="text-purple-900 text-xl md:text-2xl font-bold text-center">
          🎰 Get Up to 10% More Tokens on Every Web Store Purchase! 🎰
        </h2>
      </div>
      
      {/* Carousel Banner */}
      <StoreCarouselBanner />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
          <ShoppingCart className="h-8 w-8 mr-2 text-yellow-400" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
            Web Store
          </span>
        </h1>
        <p className="text-[#9b87f5] max-w-2xl mx-auto">
          Purchase tokens to use in our casino games. The more tokens you buy, the bigger your bonuses!
        </p>
      </div>
    </>
  );
};

export default WebStoreHeader;
