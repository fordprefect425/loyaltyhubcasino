
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tier, User } from '@/models/loyalty';
import { tiers } from '@/data/mockData';

interface PointsOverviewProps {
  user: User;
}

const PointsOverview: React.FC<PointsOverviewProps> = ({ user }) => {
  // Find current tier and next tier
  const currentTier = tiers.find(tier => tier.level === user.tier);
  const nextTierIndex = currentTier ? tiers.findIndex(t => t.level === currentTier.nextTier) : -1;
  const nextTier = nextTierIndex !== -1 ? tiers[nextTierIndex] : null;
  
  // Calculate progress to next tier
  const calculateProgress = (): number => {
    if (!currentTier || !nextTier) return 100;
    
    const pointsNeeded = nextTier.requiredPoints - currentTier.requiredPoints;
    const pointsAchieved = user.ccPoints - currentTier.requiredPoints;
    
    return Math.min(Math.floor((pointsAchieved / pointsNeeded) * 100), 100);
  };

  const progress = calculateProgress();
  const pointsToNextTier = nextTier ? nextTier.requiredPoints - user.ccPoints : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <span>Your CC Points Progress</span>
        </CardTitle>
        <CardDescription>
          Track your points and tier status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-loyalty-purple flex items-center justify-center">
                <span className="text-white font-semibold">{user.tier.charAt(0)}</span>
              </div>
              <div className="ml-3">
                <div className="font-medium">{currentTier?.level}</div>
                <div className="text-sm text-muted-foreground">Current Tier</div>
              </div>
            </div>
            
            {nextTier ? (
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-loyalty-purple flex items-center justify-center">
                  <span className="text-loyalty-purple font-semibold">{nextTier.level.charAt(0)}</span>
                </div>
                <div className="ml-3">
                  <div className="font-medium">{nextTier.level}</div>
                  <div className="text-sm text-muted-foreground">Next Tier</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full border-2 border-loyalty-purple flex items-center justify-center">
                  <span className="text-loyalty-purple font-semibold">⭐</span>
                </div>
                <div className="ml-3">
                  <div className="font-medium">Maximum</div>
                  <div className="text-sm text-muted-foreground">Tier Reached</div>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-sm">
              <span>{user.ccPoints.toLocaleString()} points</span>
              {nextTier && (
                <span>{nextTier.requiredPoints.toLocaleString()} points</span>
              )}
            </div>
          </div>
          
          {nextTier && (
            <div className="text-center p-3 bg-muted rounded-md">
              <p className="text-sm">
                {pointsToNextTier > 0 ? (
                  <>You need <span className="font-semibold text-loyalty-purple-dark">{pointsToNextTier.toLocaleString()}</span> more points to reach {nextTier.level}</>
                ) : (
                  <>You've reached the {nextTier.level} tier! Keep earning points to maintain your status.</>
                )}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PointsOverview;
