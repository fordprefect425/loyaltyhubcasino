
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/models/loyalty';
import { spinWheelRewards } from '@/data/mockData';

interface SpinWheelProps {
  user: User;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ user }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDegrees, setSpinDegrees] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [spinCost] = useState(100);
  const [canSpin, setCanSpin] = useState(true);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if the user has spun today
    const lastSpinTime = localStorage.getItem('lastSpinTime');
    if (lastSpinTime) {
      const now = new Date().getTime();
      const lastSpin = parseInt(lastSpinTime);
      const timeElapsed = now - lastSpin;
      const cooldownTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (timeElapsed < cooldownTime) {
        setCanSpin(false);
        setRemainingTime(cooldownTime - timeElapsed);
        
        // Update remaining time
        const timer = setInterval(() => {
          setRemainingTime(prev => {
            if (prev === null || prev <= 1000) {
              clearInterval(timer);
              setCanSpin(true);
              return null;
            }
            return prev - 1000;
          });
        }, 1000);
        
        return () => clearInterval(timer);
      }
    }
  }, []);

  const handleSpin = () => {
    if (user.ccPoints < spinCost) {
      toast({
        title: "Not enough points",
        description: `You need ${spinCost} CC Points to spin the wheel.`,
        variant: "destructive",
      });
      return;
    }

    setIsSpinning(true);
    setResult(null);

    // Calculate the winning segment based on probabilities
    const rand = Math.random() * 100;
    let cumProb = 0;
    let winningIndex = 0;

    for (let i = 0; i < spinWheelRewards.length; i++) {
      cumProb += spinWheelRewards[i].probability;
      if (rand <= cumProb) {
        winningIndex = i;
        break;
      }
    }

    // Calculate the degrees to spin
    // Each segment is 360/8 = 45 degrees, we add some randomness within the segment
    const segmentDegrees = 360 / spinWheelRewards.length;
    const segmentRandomness = Math.random() * (segmentDegrees * 0.5);
    
    // We want to land in the middle of the segment (plus some randomness)
    // The winning segment should be at the top (which is 270 degrees in our CSS)
    const winningDegrees = 270 - (winningIndex * segmentDegrees) - (segmentDegrees / 2) + segmentRandomness;
    
    // Add multiple rotations to create a spinning effect
    const spins = 5 + Math.floor(Math.random() * 3); // 5-7 full spins
    const totalDegrees = spins * 360 + winningDegrees;
    
    setSpinDegrees(totalDegrees);
    
    // Track the spin time
    localStorage.setItem('lastSpinTime', new Date().getTime().toString());
    
    // Show the result after the spin stops
    setTimeout(() => {
      const reward = spinWheelRewards[winningIndex];
      setResult(`You won: ${reward.name}!`);
      setIsSpinning(false);
      setCanSpin(false);
      setRemainingTime(24 * 60 * 60 * 1000); // 24 hours cooldown
      
      toast({
        title: "Congratulations! 🎉",
        description: `You won: ${reward.name}`,
        variant: reward.name === "Try Again" ? "default" : "default",
      });
    }, 5000);
  };
  
  const formatTimeRemaining = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <RotateCw className="h-5 w-5 mr-2 text-loyalty-purple" />
          Spin & Win
        </CardTitle>
        <CardDescription>
          Spend {spinCost} CC Points for a chance to win prizes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative w-64 h-64 mb-6">
            {/* Wheel */}
            <div 
              className="spin-wheel" 
              style={{
                transform: `rotate(${spinDegrees}deg)`,
                transition: isSpinning ? 'transform 5s cubic-bezier(0.1, 0.2, 0.1, 1)' : 'none',
              }}
            >
              {/* Segments would be rendered here in a real implementation */}
            </div>
            
            {/* Center of wheel */}
            <div className="spin-wheel-center">
              <span className="text-xs font-medium">SPIN</span>
            </div>
            
            {/* Pointer */}
            <svg className="spin-wheel-pointer" viewBox="0 0 20 40">
              <path d="M10 0L20 20H0L10 0Z" />
            </svg>
          </div>
          
          {result && (
            <div className="text-lg font-medium text-center animate-scale-up mb-4 text-loyalty-purple-dark">
              {result}
            </div>
          )}
          
          <Button 
            className="w-full bg-loyalty-purple hover:bg-loyalty-purple-dark"
            disabled={isSpinning || !canSpin}
            onClick={handleSpin}
          >
            {isSpinning 
              ? "Spinning..." 
              : !canSpin && remainingTime 
                ? `Spin again in ${formatTimeRemaining(remainingTime)}`
                : `Spin for ${spinCost} CC Points`}
          </Button>
          
          <p className="text-xs text-muted-foreground mt-2 text-center">
            One spin per day. Higher tiers get better rewards!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpinWheel;
