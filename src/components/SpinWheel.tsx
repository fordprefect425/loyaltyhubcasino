
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

  const wheelPrizes = [
    "5Mn Tokens",
    "1Mn Tokens",
    "100K Tokens",
    "10K Tokens",
    "1K Tokens",
    "Try Again",
    "2X Multiplier",
    "Free Spin"
  ];

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
    <Card className="border-0 overflow-hidden bg-gradient-to-b from-[#322B45] to-[#282336]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center text-yellow-300">
          <RotateCw className="h-5 w-5 mr-2 text-yellow-300" />
          Lucky Spin & Win
        </CardTitle>
        <CardDescription className="text-gray-300">
          Spend {spinCost} CC Points for a chance to win amazing prizes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative w-64 h-64 mb-6">
            {/* Single wheel with clear segments */}
            <div 
              className="wheel-container"
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 0 20px rgba(155, 135, 245, 0.5)',
                border: '4px solid rgba(251, 191, 36, 0.6)',
              }}
            >
              <div
                className="wheel"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  position: 'relative',
                  transform: `rotate(${spinDegrees}deg)`,
                  transition: isSpinning ? 'transform 5s cubic-bezier(0.1, 0.2, 0.1, 1)' : 'none',
                }}
              >
                {wheelPrizes.map((prize, index) => {
                  const angle = 360 / wheelPrizes.length;
                  const rotation = index * angle;
                  const bgColors = [
                    '#9b87f5', '#FCD34D', '#9b87f5', '#FCD34D', 
                    '#D3E4FD', '#FDE1D3', '#9b87f5', '#FCD34D'
                  ];
                  
                  return (
                    <div 
                      key={prize}
                      className="wheel-segment"
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        transform: `rotate(${rotation}deg)`,
                        transformOrigin: '50% 50%',
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(Math.PI/wheelPrizes.length)}% ${50 - 50 * Math.sin(Math.PI/wheelPrizes.length)}%, 50% 0%)`,
                        backgroundColor: bgColors[index % bgColors.length],
                      }}
                    />
                  );
                })}
                
                {/* Prize text labels */}
                {wheelPrizes.map((prize, index) => {
                  const angle = 360 / wheelPrizes.length;
                  const rotation = index * angle;
                  // Position text about 70% from center to edge
                  const textRadius = 35;
                  const textRotation = rotation + angle / 2;
                  const textX = 50 + textRadius * Math.sin(textRotation * Math.PI / 180);
                  const textY = 50 - textRadius * Math.cos(textRotation * Math.PI / 180);
                  
                  return (
                    <div 
                      key={`text-${prize}`}
                      style={{
                        position: 'absolute',
                        left: `${textX}%`,
                        top: `${textY}%`,
                        transform: `translate(-50%, -50%) rotate(${rotation + 90}deg)`,
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                        textAlign: 'center',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                        maxWidth: '60px',
                        padding: '2px',
                      }}
                    >
                      {prize}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Center of wheel */}
            <div 
              className="wheel-center"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#FCD34D',
                border: '3px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: '#2D1A4C',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                zIndex: 5,
              }}
            >
              SPIN
            </div>
            
            {/* Pointer */}
            <div
              style={{
                position: 'absolute',
                top: '-5px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '20px',
                height: '20px',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderTop: '20px solid #FCD34D',
                  filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.5))',
                }}
              />
            </div>
          </div>
          
          {result && (
            <div className="text-lg font-medium text-center animate-scale-up mb-4 text-yellow-300 bg-purple-900/40 px-4 py-2 rounded-md">
              {result}
            </div>
          )}
          
          <Button 
            className="w-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8A76E4] hover:to-[#6E59A5] border-none shadow-lg shadow-purple-900/25 text-white"
            disabled={isSpinning || !canSpin}
            onClick={handleSpin}
          >
            {isSpinning 
              ? "Spinning..." 
              : !canSpin && remainingTime 
                ? `Spin again in ${formatTimeRemaining(remainingTime)}`
                : `Spin for ${spinCost} CC Points`}
          </Button>
          
          <p className="text-xs text-gray-400 mt-2 text-center">
            One spin per day. Higher tiers get better rewards!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpinWheel;
