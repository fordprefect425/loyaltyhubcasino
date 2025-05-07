
import React from "react";

const WebStoreBenefits: React.FC = () => {
  return (
    <div className="bg-[#322B45] rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Why Purchase Tokens in the Web Store?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#2D243B] p-4 rounded-lg">
          <h3 className="text-lg font-bold text-yellow-300 mb-2">More Bonuses</h3>
          <p className="text-gray-300">Get up to 10% additional tokens when you purchase through our web store!</p>
        </div>
        <div className="bg-[#2D243B] p-4 rounded-lg">
          <h3 className="text-lg font-bold text-yellow-300 mb-2">Exclusive Deals</h3>
          <p className="text-gray-300">Access special promotions and offers only available in the web store.</p>
        </div>
        <div className="bg-[#2D243B] p-4 rounded-lg">
          <h3 className="text-lg font-bold text-yellow-300 mb-2">Loyalty Points</h3>
          <p className="text-gray-300">Earn bonus loyalty points with every web store purchase!</p>
        </div>
      </div>
    </div>
  );
};

export default WebStoreBenefits;
