
import React from "react";
import LoyaltyNavbar from "@/components/LoyaltyNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { User, Friend, Referral } from "@/models/loyalty";
import { currentUser, friends, referrals } from "@/data/mockData";
import ReferralSection from "@/components/ReferralSection";
import { Info, Users, Gift } from "lucide-react";

const Referrals: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D243B] flex flex-col">
      <LoyaltyNavbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Referrals & Friends</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ReferralSection friends={friends} referrals={referrals} />
          </div>
          
          <div className="space-y-6">
            <ReferralInfoCard />
          </div>
        </div>
      </main>
      
      <footer className="bg-[#2D243B] border-t border-[#3D3450] py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-[#9b87f5]">
            &copy; 2025 Casino Royale Loyalty Program. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const ReferralInfoCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="h-5 w-5 text-loyalty-purple" />
          How Referrals Work
        </CardTitle>
        <CardDescription>
          Learn how to earn CC Points through referrals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="types">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="types">Referral Types</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="types" className="mt-4 space-y-4">
            <Alert>
              <AlertTitle className="flex items-center">
                <Gift className="h-4 w-4 mr-2" /> New User Referrals
              </AlertTitle>
              <AlertDescription className="mt-2">
                <p className="mb-2">
                  Invite friends who have never installed GSN Casino. When they:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Install and create an account - <span className="text-loyalty-purple font-medium">100 CC Points</span></li>
                  <li>Make their first purchase - <span className="text-loyalty-purple font-medium">200 CC Points</span></li>
                  <li>Reach Silver Tier - <span className="text-loyalty-purple font-medium">500 CC Points</span></li>
                </ul>
              </AlertDescription>
            </Alert>
            
            <Alert>
              <AlertTitle className="flex items-center">
                <Users className="h-4 w-4 mr-2" /> Existing User Referrals
              </AlertTitle>
              <AlertDescription className="mt-2">
                <p className="mb-2">
                  Refer existing GSN Casino players to use the web store:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>When they make their first web store purchase - <span className="text-loyalty-purple font-medium">150 CC Points</span></li>
                  <li>For each purchase they make - <span className="text-loyalty-purple font-medium">5% of CC Points they earn</span></li>
                </ul>
              </AlertDescription>
            </Alert>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Referral Limits</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Maximum 30 active referrals per account</li>
                <li>Referral links expire after 30 days if unused</li>
                <li>Friend must use your referral link to be counted</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="faq" className="mt-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm">
                  How do I refer a friend?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">
                    Enter your friend's email in the referral section and click "Send Invite". 
                    An email will be sent with your unique referral link.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm">
                  When do I receive my referral points?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">
                    Points are credited to your account automatically when your friend completes 
                    the required actions. You'll receive a notification when points are added.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm">
                  Can I refer someone who already has an account?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">
                    Yes! You can refer existing players to use the web store for the first time. 
                    You'll earn points when they make their first web store purchase.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-sm">
                  Do my friends get any benefits?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">
                    Yes! New users get a welcome bonus of 500 tokens and 100 CC Points. 
                    Existing users get 200 CC Points when making their first web store purchase.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-sm">
                  How do tier bonuses work?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">
                    As your friends reach higher loyalty tiers, you'll earn more points from their activity:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                    <li>Bronze tier friends: 5% of their earned CC Points</li>
                    <li>Silver tier friends: 7% of their earned CC Points</li>
                    <li>Gold tier friends: 10% of their earned CC Points</li>
                    <li>Platinum tier friends: 15% of their earned CC Points</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Referrals;
