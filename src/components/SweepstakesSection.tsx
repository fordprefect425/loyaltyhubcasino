
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SweepstakesEntry } from '@/data/sweepstakesData';
import { User } from '@/models/loyalty';

interface SweepstakesSectionProps {
  entries: SweepstakesEntry[];
  user: User;
}

const SweepstakesSection: React.FC<SweepstakesSectionProps> = ({ entries, user }) => {
  const [userEntries, setUserEntries] = useState<Record<string, number>>({});
  const { toast } = useToast();

  const handleEnterSweepstakes = (entry: SweepstakesEntry) => {
    if (user.ccPoints < entry.pointsPerEntry) {
      toast({
        title: "Not enough points",
        description: `You need ${entry.pointsPerEntry} CC Points to enter this sweepstakes.`,
        variant: "destructive",
      });
      return;
    }

    const currentEntries = userEntries[entry.id] || 0;
    setUserEntries({
      ...userEntries,
      [entry.id]: currentEntries + 1
    });

    toast({
      title: "Entry Confirmed!",
      description: `You've successfully entered the ${entry.name} sweepstakes!`,
      variant: "default",
    });
  };

  return (
    <Card className="border-0 overflow-hidden bg-gradient-to-b from-[#322B45] to-[#282336]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center text-yellow-300">
          <Award className="h-5 w-5 mr-2 text-yellow-300" />
          Sweepstakes
        </CardTitle>
        <CardDescription className="text-gray-300">
          Enter for a chance to win amazing prizes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map(entry => (
            <Card key={entry.id} className="overflow-hidden border-0 bg-gradient-to-b from-[#3D3450] to-[#2D243B]">
              <div className="h-2 bg-yellow-400" />
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-white">{entry.name}</h3>
                    <p className="text-sm text-gray-300">{entry.prize}</p>
                  </div>
                  <div className="px-2 py-1 bg-red-500 text-white text-xs rounded flex items-center">
                    <Timer className="h-3 w-3 mr-1" />
                    Ends in {entry.endsIn}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm">
                    <span className="text-yellow-400">{entry.pointsPerEntry} CC Points</span>
                    <span className="text-gray-400 block">per entry</span>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8A76E4] hover:to-[#6E59A5]"
                    onClick={() => handleEnterSweepstakes(entry)}
                    disabled={user.ccPoints < entry.pointsPerEntry}
                  >
                    Enter Now
                  </Button>
                </div>
                
                {userEntries[entry.id] > 0 && (
                  <div className="mt-3 text-center py-1 bg-purple-900/30 rounded text-sm text-yellow-400">
                    Your Entries: {userEntries[entry.id]}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SweepstakesSection;
