
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, BadgeDollarSign, Gift, Star, Percent, Tag, Currency } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface TokenPackage {
  id: string;
  tokens: number;
  originalPrice?: number;
  price: number;
  isBestValue?: boolean;
  bonusPercentage?: number;
  webStoreBonus: number;
  ccPoints: number; // Adding CC Points field
  tags?: string[];
  sale?: {
    name: string;
    discount: number;
  };
  bonuses: {
    type: string;
    value: string | number;
    icon: string; // Changed from JSX.Element to string
  }[];
}

interface TokenPackageCardProps {
  pack: TokenPackage;
}

const TokenPackageCard: React.FC<TokenPackageCardProps> = ({ pack }) => {
  const { toast } = useToast();

  // Function to render the appropriate icon based on the icon name
  const renderIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "gift":
        return <Gift className="h-4 w-4 text-yellow-400" />;
      case "star":
        return <Star className="h-4 w-4 text-pink-500" />;
      default:
        return <Gift className="h-4 w-4 text-yellow-400" />;
    }
  };

  const handlePurchase = (pack: TokenPackage) => {
    toast({
      title: "Purchase Initiated",
      description: `Processing your purchase of ${pack.tokens.toLocaleString()} tokens for $${pack.price}`,
    });
    // Here you would integrate with a payment processor like Stripe
  };

  return (
    <Card 
      className={`overflow-hidden relative border-0 shadow-lg ${
        pack.isBestValue 
          ? 'bg-gradient-to-b from-[#9b87f5] to-[#7E69AB]' 
          : 'bg-gradient-to-b from-[#322B45] to-[#282336]'
      }`}
    >
      {pack.isBestValue && (
        <div className="absolute -top-1 -left-1 w-20 h-20">
          <div className="bg-yellow-400 text-[#8B4000] font-bold text-xs py-1 px-2 rounded-full absolute transform rotate-[-30deg] translate-x-[-15%] translate-y-[80%] shadow-lg z-10">
            BEST VALUE
          </div>
        </div>
      )}
      
      {pack.bonusPercentage && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-600 to-purple-700 text-white text-sm py-1 px-3 transform translate-x-[15%] rotate-[40deg] shadow">
          +{pack.bonusPercentage}%
        </div>
      )}

      {/* Tags */}
      {pack.tags && pack.tags.length > 0 && (
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {pack.tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-flex items-center bg-blue-900/60 text-white text-xs px-2 py-1 rounded-full"
            >
              <Tag className="h-3 w-3 mr-1" /> {tag}
            </span>
          ))}
        </div>
      )}

      <CardContent className="p-6 pt-12">
        {/* Sale Banner */}
        {pack.sale && (
          <div className="bg-red-600 text-white font-bold py-2 px-4 mb-4 -mx-6 text-center shadow-md relative overflow-hidden">
            <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 animate-pulse"></span>
            <div className="flex items-center justify-center">
              <Percent className="h-4 w-4 mr-1" />
              <span>{pack.sale.name}: {pack.sale.discount}% OFF</span>
            </div>
          </div>
        )}

        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 flex items-center justify-center shadow-lg">
            <Coins className="h-10 w-10 text-purple-900" />
          </div>
        </div>

        <div className={`rounded-full py-2 px-4 mb-4 font-bold text-center text-2xl ${
          pack.isBestValue ? 'bg-blue-600 text-yellow-300' : 'bg-blue-800 text-white'
        }`}>
          {pack.tokens.toLocaleString()} Tokens
        </div>
        
        {pack.originalPrice && (
          <div className="text-center mb-2">
            <span className="text-gray-400 line-through">${pack.originalPrice.toFixed(2)}</span>
          </div>
        )}

        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-lg py-3 px-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="uppercase text-sm">Web Store Bonus</span>
            <span className="flex items-center">
              <Coins className="h-4 w-4 mr-1" /> {pack.webStoreBonus.toLocaleString()}
            </span>
          </div>
        </div>
        
        {/* CC Points Bonus Section */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold rounded-lg py-3 px-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="uppercase text-sm">Bonus CC Points</span>
            <span className="flex items-center">
              <Currency className="h-4 w-4 mr-1" /> {pack.ccPoints}
            </span>
          </div>
        </div>

        <div className={`rounded-lg p-3 mb-4 grid grid-cols-3 gap-2 ${
          pack.isBestValue ? 'bg-purple-800 bg-opacity-50' : 'bg-[#2D243B]'
        }`}>
          {pack.bonuses.map((bonus, i) => (
            <div key={i} className="text-center">
              <div className="flex flex-col items-center">
                {renderIcon(bonus.icon)}
                <div className="text-lg font-bold text-yellow-300">
                  {bonus.value}
                </div>
                <div className="text-xs text-gray-300">
                  {bonus.type}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => handlePurchase(pack)}
          className="w-full text-xl py-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-2 border-green-700 shadow-lg"
        >
          <BadgeDollarSign className="mr-2 h-6 w-6" />
          ${pack.price.toFixed(2)}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TokenPackageCard;
