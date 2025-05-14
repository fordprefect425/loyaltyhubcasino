
import React from "react";
import { Coins } from "lucide-react";

interface CasinoRoyaleLogoProps {
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

const CasinoRoyaleLogo: React.FC<CasinoRoyaleLogoProps> = ({
  className = "",
  showIcon = true,
  size = "md"
}) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32
  };

  return (
    <div className={`flex items-center ${className}`}>
      {showIcon && (
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-400 blur-sm rounded-full"></div>
          <Coins className={`h-${iconSizes[size]/4} w-${iconSizes[size]/4} relative z-10 text-yellow-400 mr-2`} />
        </div>
      )}
      <span 
        className={`font-bold ${sizeClasses[size]} bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500`}
      >
        Casino Royale
      </span>
    </div>
  );
};

export default CasinoRoyaleLogo;
