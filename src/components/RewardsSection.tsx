
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Discount, Star } from 'lucide-react';
import { Reward, RewardType, TierLevel, User } from '@/models/loyalty';
import { useToast } from '@/hooks/use-toast';

interface RewardsSectionProps {
  rewards: Reward[];
  user: User;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({ rewards, user }) => {
  const [selectedTab, setSelectedTab] = useState('all');
  const { toast } = useToast();

  const filteredRewards = rewards.filter(reward => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'discount') return reward.type === RewardType.Discount;
    if (selectedTab === 'token') return reward.type === RewardType.Token;
    if (selectedTab === 'pack') return reward.type === RewardType.Pack;
    if (selectedTab === 'sweepstakes') return reward.type === RewardType.Sweepstakes;
    return true;
  });

  const isTierEligible = (requiredTier: TierLevel | undefined): boolean => {
    if (!requiredTier) return true;
    
    const tiers = [TierLevel.Bronze, TierLevel.Silver, TierLevel.Gold, TierLevel.Platinum];
    const userTierIndex = tiers.indexOf(user.tier);
    const requiredTierIndex = tiers.indexOf(requiredTier);
    
    return userTierIndex >= requiredTierIndex;
  };

  const handleRedeemReward = (reward: Reward) => {
    if (user.ccPoints < reward.pointsCost) {
      toast({
        title: "Not enough points",
        description: `You need ${reward.pointsCost} CC Points to redeem this reward.`,
        variant: "destructive",
      });
      return;
    }
    
    if (reward.tierRequired && !isTierEligible(reward.tierRequired)) {
      toast({
        title: "Tier not eligible",
        description: `You need to be ${reward.tierRequired} tier or higher to redeem this reward.`,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Reward Redeemed!",
      description: `You've successfully redeemed: ${reward.name}`,
      variant: "default",
    });
  };

  const getRewardIcon = (type: RewardType) => {
    switch (type) {
      case RewardType.Discount:
        return <Discount className="h-5 w-5 text-amber-500" />;
      case RewardType.Token:
        return <Gift className="h-5 w-5 text-indigo-500" />;
      case RewardType.Pack:
        return <Gift className="h-5 w-5 text-green-500" />;
      case RewardType.Sweepstakes:
        return <Star className="h-5 w-5 text-pink-500" />;
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Gift className="h-5 w-5 mr-2 text-loyalty-purple" />
          Available Rewards
        </CardTitle>
        <CardDescription>
          Redeem your CC Points for these exclusive rewards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="discount">Discounts</TabsTrigger>
            <TabsTrigger value="token">Tokens</TabsTrigger>
            <TabsTrigger value="pack">Packs</TabsTrigger>
            <TabsTrigger value="sweepstakes">Sweepstakes</TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedTab} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRewards.map(reward => (
                <Card key={reward.id} className={`overflow-hidden border ${
                  reward.tierRequired && !isTierEligible(reward.tierRequired) 
                    ? 'opacity-60' 
                    : ''
                }`}>
                  <div className="h-3 bg-loyalty-purple" />
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                          {getRewardIcon(reward.type)}
                        </div>
                        <h3 className="ml-2 font-medium">{reward.name}</h3>
                      </div>
                      <div className="points-gradient text-white text-xs px-2 py-1 rounded">
                        {reward.pointsCost} Points
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                    
                    <div className="flex justify-between items-center mt-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-loyalty-purple hover:bg-loyalty-purple-dark"
                        onClick={() => handleRedeemReward(reward)}
                        disabled={
                          user.ccPoints < reward.pointsCost || 
                          (reward.tierRequired && !isTierEligible(reward.tierRequired))
                        }
                      >
                        Redeem
                      </Button>
                      
                      {reward.tierRequired && (
                        <div className="ml-2 text-xs text-muted-foreground whitespace-nowrap">
                          {reward.tierRequired}+ Tier
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredRewards.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No rewards found in this category.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RewardsSection;
