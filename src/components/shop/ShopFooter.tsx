
import React from "react";

const ShopFooter: React.FC = () => {
  return (
    <footer className="bg-[#2D243B] border-t border-[#3D3450] py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-[#9b87f5]">
          &copy; {new Date().getFullYear()} Casino Royale Loyalty Program. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default ShopFooter;
