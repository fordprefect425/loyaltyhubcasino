
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarClock, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/models/loyalty';

interface DailyLoginProps {
  user: User;
}

const DailyLogin: React.FC<DailyLoginProps> = ({ user }) => {
  const [claimed, setClaimed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleClaimDailyBonus = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setClaimed(true);
      setIsLoading(false);
      toast({
        title: "Daily Bonus Claimed!",
        description: `You've received 25 CC Points. Login streak: ${user.loginStreak + 1} days`,
        variant: "default",
      });
    }, 1000);
  };
  
  const getStreakText = () => {
    if (user.loginStreak < 5) return "Keep logging in daily to increase your rewards!";
    if (user.loginStreak < 10) return "You're building a great streak!";
    if (user.loginStreak < 30) return "Amazing streak! Keep it going!";
    return "Incredible dedication! You're a loyalty champion!";
  };
  
  // Calculate days until streak bonus
  const getDaysUntilStreakBonus = () => {
    const nextMilestone = Math.ceil(user.loginStreak / 7) * 7;
    return nextMilestone - user.loginStreak;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <CalendarClock className="h-5 w-5 mr-2 text-loyalty-purple" />
          Daily Login Bonus
        </CardTitle>
        <CardDescription>
          Claim your daily points and build your streak
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Current Streak</p>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-loyalty-purple-dark">{user.loginStreak}</span>
                <span className="ml-1 text-sm text-muted-foreground">days</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full points-gradient flex items-center justify-center">
              <Gift className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">{getStreakText()}</p>
            {getDaysUntilStreakBonus() > 0 && (
              <p className="text-sm font-medium">
                <span className="text-loyalty-purple-dark">{getDaysUntilStreakBonus()}</span> days until your next streak bonus!
              </p>
            )}
          </div>
          
          <Button 
            className="w-full bg-loyalty-purple hover:bg-loyalty-purple-dark"
            disabled={claimed || isLoading}
            onClick={handleClaimDailyBonus}
          >
            {isLoading ? "Claiming..." : claimed ? "Claimed Today" : "Claim 25 CC Points"}
          </Button>
          
          {claimed && (
            <p className="text-center text-sm text-muted-foreground">
              Come back tomorrow for more points!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyLogin;
