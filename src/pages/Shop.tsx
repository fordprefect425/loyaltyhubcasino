
import React from "react";
import LoyaltyNavbar from "@/components/LoyaltyNavbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, BadgeDollarSign, Gift, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TokenPackage {
  id: string;
  tokens: number;
  originalPrice?: number;
  price: number;
  isBestValue?: boolean;
  bonusPercentage?: number;
  bonuses: {
    type: string;
    value: string | number;
    icon: JSX.Element;
  }[];
}

const Shop = () => {
  const { toast } = useToast();

  const tokenPackages: TokenPackage[] = [
    {
      id: "small",
      tokens: 10000000,
      price: 4.99,
      bonuses: [
        { type: "Spins", value: "+50", icon: <Gift className="h-4 w-4 text-yellow-400" /> },
        { type: "XP Boost", value: "1.5x", icon: <Star className="h-4 w-4 text-pink-500" /> }
      ]
    },
    {
      id: "medium",
      tokens: 50000000,
      price: 9.99,
      bonuses: [
        { type: "Spins", value: "+100", icon: <Gift className="h-4 w-4 text-yellow-400" /> },
        { type: "XP Boost", value: "2x", icon: <Star className="h-4 w-4 text-pink-500" /> }
      ]
    },
    {
      id: "large",
      tokens: 120550500,
      originalPrice: 6000000,
      price: 29.99,
      bonusPercentage: 240,
      isBestValue: true,
      bonuses: [
        { type: "Win", value: "+200", icon: <Gift className="h-4 w-4 text-yellow-400" /> },
        { type: "XP Boost", value: "2.5x", icon: <Star className="h-4 w-4 text-pink-500" /> },
        { type: "Bonus", value: "1 Pack", icon: <Gift className="h-4 w-4 text-yellow-400" /> }
      ]
    },
    {
      id: "mega",
      tokens: 500000000,
      price: 99.99,
      bonusPercentage: 320,
      bonuses: [
        { type: "Win", value: "+500", icon: <Gift className="h-4 w-4 text-yellow-400" /> },
        { type: "XP Boost", value: "3x", icon: <Star className="h-4 w-4 text-pink-500" /> },
        { type: "Bonus", value: "3 Pack", icon: <Gift className="h-4 w-4 text-yellow-400" /> }
      ]
    }
  ];

  const handlePurchase = (pack: TokenPackage) => {
    toast({
      title: "Purchase Initiated",
      description: `Processing your purchase of ${pack.tokens.toLocaleString()} tokens for $${pack.price}`,
    });
    // Here you would integrate with a payment processor like Stripe
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D243B] flex flex-col">
      <LoyaltyNavbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
            <Coins className="h-8 w-8 mr-2 text-yellow-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
              Token Shop
            </span>
          </h1>
          <p className="text-[#9b87f5] max-w-2xl mx-auto">
            Purchase tokens to use in our casino games. The more you buy, the more bonuses you get!
          </p>
          <div className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-purple-700 to-purple-900 rounded-lg">
            <p className="text-yellow-200 font-bold">Web Store Bonus: +1,000,000,000 tokens on all purchases!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {tokenPackages.map((pack) => (
            <Card 
              key={pack.id} 
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

              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <img 
                    src="/lovable-uploads/00dc3694-2047-408a-a0b7-b158f8888686.png" 
                    alt="Token package" 
                    className="w-28 h-28 object-contain"
                  />
                </div>

                <div className={`rounded-full py-2 px-4 mb-4 font-bold text-center text-2xl ${
                  pack.isBestValue ? 'bg-blue-600 text-yellow-300' : 'bg-blue-800 text-white'
                }`}>
                  {pack.tokens.toLocaleString()}
                </div>
                
                {pack.originalPrice && (
                  <div className="text-center mb-2">
                    <span className="text-gray-400 line-through">{pack.originalPrice.toLocaleString()}</span>
                  </div>
                )}

                <div className="bg-yellow-400 text-purple-900 font-bold rounded-lg py-3 px-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="uppercase text-sm">Web Store Bonus</span>
                    <span className="flex items-center">
                      <Coins className="h-4 w-4 mr-1" /> 1,000,000,000
                    </span>
                  </div>
                </div>

                <div className={`rounded-lg p-3 mb-4 grid grid-cols-3 gap-2 ${
                  pack.isBestValue ? 'bg-purple-800 bg-opacity-50' : 'bg-[#2D243B]'
                }`}>
                  {pack.bonuses.map((bonus, i) => (
                    <div key={i} className="text-center">
                      <div className="flex flex-col items-center">
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
                  ${pack.price}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-[#322B45] rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Why Purchase Tokens?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#2D243B] p-4 rounded-lg">
              <h3 className="text-lg font-bold text-yellow-300 mb-2">More Gameplay</h3>
              <p className="text-gray-300">Keep the fun going with more spins and extended gameplay time.</p>
            </div>
            <div className="bg-[#2D243B] p-4 rounded-lg">
              <h3 className="text-lg font-bold text-yellow-300 mb-2">Bigger Wins</h3>
              <p className="text-gray-300">Higher bets lead to bigger jackpots and more exciting prizes!</p>
            </div>
            <div className="bg-[#2D243B] p-4 rounded-lg">
              <h3 className="text-lg font-bold text-yellow-300 mb-2">Exclusive Features</h3>
              <p className="text-gray-300">Unlock special game modes and exclusive slot machines.</p>
            </div>
          </div>
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

export default Shop;
