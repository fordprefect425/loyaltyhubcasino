
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

const LoyaltyNavbar = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Coins className="h-6 w-6 text-loyalty-purple mr-2" />
          <span className="font-bold text-2xl bg-gradient-to-r from-loyalty-purple to-loyalty-purple-dark bg-clip-text text-transparent">
            CC Points
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-loyalty-purple transition-colors">Dashboard</Link>
          <Link to="/rewards" className="text-foreground hover:text-loyalty-purple transition-colors">Rewards</Link>
          <Link to="/referrals" className="text-foreground hover:text-loyalty-purple transition-colors">Referrals</Link>
          <Link to="/history" className="text-foreground hover:text-loyalty-purple transition-colors">History</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" asChild>
            <a href="#" className="hidden md:inline-flex">
              Back to App
            </a>
          </Button>
          <Button className="bg-loyalty-purple hover:bg-loyalty-purple-dark">Shop Now</Button>
        </div>
      </div>
    </header>
  );
};

export default LoyaltyNavbar;
