
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Friend, Referral, ReferralStatus } from '@/models/loyalty';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Gift, Info, Link } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ReferralSectionProps {
  friends: Friend[];
  referrals: Referral[];
}

const ReferralSection: React.FC<ReferralSectionProps> = ({ friends, referrals }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHowToOpen, setIsHowToOpen] = useState(false);
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 mr-2 text-loyalty-purple" />
          Friends & Referrals
        </CardTitle>
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
            <Collapsible 
              open={isHowToOpen} 
              onOpenChange={setIsHowToOpen}
              className="border rounded-md bg-muted/30 mb-4"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between p-4 hover:bg-muted/50">
                <div className="flex items-center">
                  <Info className="h-4 w-4 mr-2 text-loyalty-purple" />
                  <span className="font-medium">How to refer friends</span>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <span className="sr-only">Toggle</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${
                      isHowToOpen ? "transform rotate-180" : ""
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 text-sm">
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    You can refer friends in two ways:
                  </p>
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-loyalty-purple text-white">
                      1
                    </div>
                    <div className="ml-4">
                      <p><strong>New Users:</strong> Invite friends who haven't installed GSN Casino yet.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-loyalty-purple text-white">
                      2
                    </div>
                    <div className="ml-4">
                      <p><strong>Existing Users:</strong> Refer GSN Casino players to make their first web store purchase.</p>
                    </div>
                  </div>
                  <div className="flex items-start pt-2">
                    <Gift className="h-5 w-5 text-loyalty-purple" />
                    <div className="ml-2">
                      <p>When your referred friends complete actions, you earn CC Points automatically!</p>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

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
              
              <div className="flex items-center gap-2 text-sm">
                <Link className="h-4 w-4 text-loyalty-purple" />
                <span>
                  Share your referral link to earn more CC Points!
                </span>
                <Button variant="outline" size="sm" className="ml-auto h-8">
                  Copy Link
                </Button>
              </div>
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
            <div className="bg-muted/30 rounded-md p-4 mb-4">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-loyalty-purple mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Friend Benefits</h4>
                  <p className="text-sm text-muted-foreground">
                    As your friends reach higher tiers, you earn more points from their activity:
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="text-xs px-2 py-1 bg-muted rounded">
                      Bronze: 5% of points
                    </div>
                    <div className="text-xs px-2 py-1 bg-muted rounded">
                      Silver: 7% of points
                    </div>
                    <div className="text-xs px-2 py-1 bg-muted rounded">
                      Gold: 10% of points
                    </div>
                    <div className="text-xs px-2 py-1 bg-muted rounded">
                      Platinum: 15% of points
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReferralSection;
