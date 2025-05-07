
import React from 'react';
import { Bell, Gift, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TierLevel, User } from '@/models/loyalty';

interface LoyaltyHeaderProps {
  user: User;
}

const LoyaltyHeader: React.FC<LoyaltyHeaderProps> = ({ user }) => {
  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Get color based on tier
  const getTierColor = (tier: TierLevel) => {
    switch (tier) {
      case TierLevel.Bronze:
        return 'bg-orange-200 text-orange-800';
      case TierLevel.Silver:
        return 'bg-gray-200 text-gray-800';
      case TierLevel.Gold:
        return 'bg-yellow-100 text-yellow-800';
      case TierLevel.Platinum:
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-white rounded-lg shadow-sm mb-6">
      <div className="flex items-center mb-4 md:mb-0">
        <Avatar className="h-12 w-12 border-2 border-loyalty-purple">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <div className="flex items-center">
            <span className={`text-xs px-2 py-0.5 rounded-full ${getTierColor(user.tier)}`}>
              {user.tier} Tier
            </span>
            <span className="ml-2 text-sm text-gray-500">{user.loginStreak} day streak</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="points-gradient text-white px-4 py-2 rounded-lg flex items-center">
          <span className="font-bold text-lg">{user.ccPoints.toLocaleString()}</span>
          <span className="ml-1">CC Points</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white ml-1 h-6 w-6">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Your current CC Points balance</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Button variant="outline" size="icon" className="bg-white">
          <Bell className="h-5 w-5 text-loyalty-purple-dark" />
        </Button>
        
        <Button className="bg-loyalty-purple hover:bg-loyalty-purple-dark">
          <Gift className="h-5 w-5 mr-2" />
          Redeem Points
        </Button>
      </div>
    </header>
  );
};

export default LoyaltyHeader;
