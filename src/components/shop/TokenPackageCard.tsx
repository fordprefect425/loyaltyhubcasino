
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
  ccPoints: number;
  tags?: string[];
  sale?: {
    name: string;
    discount: number;
  };
  bonuses: {
    type: string;
    value: string | number;
    icon: string;
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
      className={`h-full flex flex-col overflow-hidden relative border-0 shadow-lg ${
        pack.isBestValue 
          ? 'bg-gradient-to-b from-[#9b87f5] to-[#7E69AB]' 
          : 'bg-gradient-to-b from-[#242038] to-[#171225]'
      }`}
    >
      {pack.isBestValue && (
        <div className="absolute -top-1 -left-1 w-16 h-16 overflow-hidden">
          <div className="bg-yellow-400 text-[#8B4000] font-bold text-[10px] py-1 px-2 absolute transform rotate-[-45deg] translate-x-[-25%] translate-y-[100%] shadow-sm">
            BEST VALUE
          </div>
        </div>
      )}
      
      {pack.bonusPercentage && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-600 to-purple-700 text-white text-xs py-1 px-3 transform translate-x-[30%] translate-y-[30%] rotate-[45deg] shadow">
          +{pack.bonusPercentage}%
        </div>
      )}

      {/* Tags */}
      {pack.tags && pack.tags.length > 0 && (
        <div className="absolute top-2 left-0 right-0 flex justify-center">
          {pack.tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-flex items-center bg-blue-900/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full mx-1 shadow-md"
            >
              <Tag className="h-3 w-3 mr-1" /> {tag}
            </span>
          ))}
        </div>
      )}

      <CardContent className="p-4 pt-10 flex-grow flex flex-col">
        {/* Sale Banner */}
        {pack.sale && (
          <div className="bg-red-600 text-white font-bold py-1 px-3 mb-3 -mx-4 text-center shadow-md relative overflow-hidden">
            <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 animate-pulse"></span>
            <div className="flex items-center justify-center">
              <Percent className="h-3 w-3 mr-1" />
              <span className="text-sm">{pack.sale.name}: {pack.sale.discount}% OFF</span>
            </div>
          </div>
        )}

        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 flex items-center justify-center shadow-lg">
            <Coins className="h-8 w-8 text-purple-900" />
          </div>
        </div>

        <div className={`rounded-full py-1 px-3 mb-3 font-bold text-center text-xl ${
          pack.isBestValue ? 'bg-blue-600 text-yellow-300' : 'bg-blue-900 text-white'
        }`}>
          {pack.tokens.toLocaleString()} Tokens
        </div>
        
        {pack.originalPrice && (
          <div className="text-center mb-2">
            <span className="text-gray-300 line-through">${pack.originalPrice.toFixed(2)}</span>
          </div>
        )}

        {/* Bonuses Section - Improved contrast */}
        <div className="space-y-2 mb-3 flex-grow">
          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg py-2 px-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="uppercase text-xs font-semibold">Web Bonus</span>
              <span className="flex items-center text-sm font-bold">
                <Coins className="h-3 w-3 mr-1" /> {pack.webStoreBonus.toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg py-2 px-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="uppercase text-xs font-semibold">CC Points</span>
              <span className="flex items-center text-sm font-bold">
                <Currency className="h-3 w-3 mr-1" /> {pack.ccPoints}
              </span>
            </div>
          </div>

          <div className={`rounded-lg p-2 grid grid-cols-3 gap-1 ${
            pack.isBestValue ? 'bg-purple-900/50' : 'bg-[#1F1A2C]'
          } border border-purple-800/30`}>
            {pack.bonuses.map((bonus, i) => (
              <div key={i} className="text-center p-1 bg-black/20 rounded">
                <div className="flex flex-col items-center">
                  {renderIcon(bonus.icon)}
                  <div className="text-sm font-bold text-yellow-300">
                    {bonus.value}
                  </div>
                  <div className="text-xs text-gray-200">
                    {bonus.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={() => handlePurchase(pack)}
          className="w-full text-base py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-b-2 border-green-700 shadow-lg mt-auto"
        >
          <BadgeDollarSign className="mr-2 h-5 w-5" />
          ${pack.price.toFixed(2)}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TokenPackageCard;
