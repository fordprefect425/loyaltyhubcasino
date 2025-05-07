
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Coins, 
  Menu, 
  X,
  ShoppingBag,
  FileText
} from "lucide-react";

const LoyaltyNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-[#2D1A4C] to-[#1A1F2C] border-b border-[#3D3450] sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Coins className="h-7 w-7 text-yellow-400 mr-2" />
          <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
            Casino Royale
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`transition-colors ${
              isActive('/') 
                ? 'text-yellow-400 font-semibold' 
                : 'text-white hover:text-yellow-400'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/shop" 
            className={`transition-colors ${
              isActive('/shop') 
                ? 'text-yellow-400 font-semibold' 
                : 'text-white hover:text-yellow-400'
            }`}
          >
            Token Shop
          </Link>
          <Link 
            to="/articles" 
            className={`transition-colors ${
              isActive('/articles') 
                ? 'text-yellow-400 font-semibold' 
                : 'text-white hover:text-yellow-400'
            }`}
          >
            Articles
          </Link>
          <Link 
            to="/referrals" 
            className={`transition-colors ${
              isActive('/referrals') 
                ? 'text-yellow-400 font-semibold' 
                : 'text-white hover:text-yellow-400'
            }`}
          >
            Referrals
          </Link>
          <Link 
            to="/history" 
            className={`transition-colors ${
              isActive('/history') 
                ? 'text-yellow-400 font-semibold' 
                : 'text-white hover:text-yellow-400'
            }`}
          >
            History
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            asChild 
            className="hidden md:inline-flex border-[#9b87f5] text-[#9b87f5] hover:bg-[#3D3450]"
          >
            <a href="#">
              Back to Games
            </a>
          </Button>
          <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0">
            <ShoppingBag className="mr-2 h-4 w-4" /> Shop Now
          </Button>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white hover:bg-purple-900/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-[#2D1A4C] to-[#1A1F2C] border-b border-[#3D3450]">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/" 
              className={`block py-2 px-4 rounded-md ${
                isActive('/') 
                  ? 'bg-purple-900/30 text-yellow-400' 
                  : 'text-white hover:bg-purple-900/20'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/shop" 
              className={`block py-2 px-4 rounded-md ${
                isActive('/shop') 
                  ? 'bg-purple-900/30 text-yellow-400' 
                  : 'text-white hover:bg-purple-900/20'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4" /> Token Shop
              </div>
            </Link>
            <Link 
              to="/articles" 
              className={`block py-2 px-4 rounded-md ${
                isActive('/articles') 
                  ? 'bg-purple-900/30 text-yellow-400' 
                  : 'text-white hover:bg-purple-900/20'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4" /> Articles
              </div>
            </Link>
            <Link 
              to="/referrals" 
              className={`block py-2 px-4 rounded-md ${
                isActive('/referrals') 
                  ? 'bg-purple-900/30 text-yellow-400' 
                  : 'text-white hover:bg-purple-900/20'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Referrals
            </Link>
            <Link 
              to="/history" 
              className={`block py-2 px-4 rounded-md ${
                isActive('/history') 
                  ? 'bg-purple-900/30 text-yellow-400' 
                  : 'text-white hover:bg-purple-900/20'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              History
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default LoyaltyNavbar;
