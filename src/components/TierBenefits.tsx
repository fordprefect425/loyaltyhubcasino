
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tier, TierLevel, User } from '@/models/loyalty';
import { tiers } from '@/data/mockData';
import { Award, Check } from 'lucide-react';

interface TierBenefitsProps {
  user: User;
}

const TierBenefits: React.FC<TierBenefitsProps> = ({ user }) => {
  const currentTier = tiers.find(tier => tier.level === user.tier);
  
  const getTierIcon = (level: TierLevel) => {
    switch (level) {
      case TierLevel.Bronze:
        return <Award className="h-5 w-5 text-orange-600" />;
      case TierLevel.Silver:
        return <Award className="h-5 w-5 text-gray-400" />;
      case TierLevel.Gold:
        return <Award className="h-5 w-5 text-yellow-500" />;
      case TierLevel.Platinum:
        return <Award className="h-5 w-5 text-blue-400" />;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <span>Your {currentTier?.level} Tier Benefits</span>
          {getTierIcon(user.tier)}
        </CardTitle>
        <CardDescription>
          Exclusive benefits for your current tier
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {currentTier?.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        
        {currentTier?.nextTier && (
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="font-medium mb-2 flex items-center">
              {getTierIcon(currentTier.nextTier)}
              <span className="ml-2">Unlock at {currentTier.nextTier} Tier</span>
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              {tiers.find(t => t.level === currentTier.nextTier)?.benefits.slice(0, 3).map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-5 w-5 mr-2 flex items-center justify-center text-xs">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
              {(tiers.find(t => t.level === currentTier.nextTier)?.benefits.length || 0) > 3 && (
                <li className="flex items-start">
                  <span className="h-5 w-5 mr-2 flex items-center justify-center text-xs">•</span>
                  <span>And more benefits...</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TierBenefits;
