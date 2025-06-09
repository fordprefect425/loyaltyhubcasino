
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Friend, Referral, ReferralStatus } from '@/models/loyalty';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ReferralSectionProps {
  friends: Friend[];
  referrals: Referral[];
}

const ReferralSection: React.FC<ReferralSectionProps> = ({ friends, referrals }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSendReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Referral Sent!",
        description: `Invitation sent to ${email}`,
        variant: "default",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Friends & Referrals</CardTitle>
        <CardDescription>
          Invite friends and earn CC Points when they make purchases
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="referral">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="referral">Send Referrals</TabsTrigger>
            <TabsTrigger value="friends">Your Friends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="referral" className="mt-4 space-y-4">
            <form onSubmit={handleSendReferral} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="friend@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  className="bg-loyalty-purple hover:bg-loyalty-purple-dark whitespace-nowrap"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Invite"}
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Earn 200 CC Points when your friend makes their first purchase after signing up!
              </p>
            </form>
            
            <div className="border rounded-md">
              <div className="bg-muted px-4 py-2 rounded-t-md">
                <h3 className="font-medium">Your Referrals</h3>
              </div>
              <div className="p-4">
                {referrals.length > 0 ? (
                  <div className="space-y-3">
                    {referrals.map((referral) => (
                      <div key={referral.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{referral.email}</p>
                          <p className="text-sm text-muted-foreground">
                            Sent: {formatDate(referral.date)}
                          </p>
                        </div>
                        <div>
                          {referral.status === ReferralStatus.Pending ? (
                            <span className="text-sm px-2 py-1 bg-amber-100 text-amber-800 rounded">
                              Pending
                            </span>
                          ) : referral.status === ReferralStatus.Completed ? (
                            <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded">
                              Completed (+{referral.pointsEarned} points)
                            </span>
                          ) : (
                            <span className="text-sm px-2 py-1 bg-gray-100 text-gray-800 rounded">
                              Expired
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-4 text-muted-foreground">
                    No referrals sent yet
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="friends" className="mt-4">
            <div className="border rounded-md">
              <div className="bg-muted px-4 py-2 rounded-t-md">
                <h3 className="font-medium">Connected Friends ({friends.length}/30)</h3>
              </div>
              <div className="p-4">
                {friends.length > 0 ? (
                  <div className="space-y-4">
                    {friends.map((friend) => (
                      <div key={friend.id} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={friend.avatarUrl} alt={friend.name} />
                            <AvatarFallback>{getInitials(friend.name)}</AvatarFallback>
                          </Avatar>
                          <div className="ml-3">
                            <p className="font-medium">{friend.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {friend.tier} Tier • Joined {formatDate(friend.joinDate)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-loyalty-purple-dark">
                            +{friend.pointsGenerated} Points
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Generated for you
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-4 text-muted-foreground">
                    No friends connected yet
                  </p>
                )}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              Earn CC Points when your friends make purchases. Higher tier friends earn you more points!
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReferralSection;
