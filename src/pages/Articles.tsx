
import React from "react";
import LoyaltyNavbar from "@/components/LoyaltyNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Ticket, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  imageUrl?: string;
}

const Articles = () => {
  const articles: Article[] = [
    {
      id: "slot-mechanics",
      title: "How Modern Slot Machines Actually Work",
      description: "Understanding the technology behind Random Number Generators (RNGs) and why each spin is truly independent.",
      category: "Educational",
      readTime: "5 min read",
      imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "jackpot-secrets",
      title: "The Mathematics Behind Progressive Jackpots",
      description: "Learn about how progressive jackpots grow and the statistical probability of winning them.",
      category: "Educational",
      readTime: "7 min read",
      imageUrl: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "featured-treasure-island",
      title: "Introducing: Treasure Island Slots",
      description: "Our newest slot machine takes you on a pirate adventure with exciting bonus rounds and hidden treasures.",
      category: "Featured Game",
      readTime: "4 min read",
      imageUrl: "https://images.unsplash.com/photo-1524230572899-a752b3835840?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "strategies",
      title: "Slot Strategies: Myths and Facts",
      description: "We debunk common myths about slot machines and provide evidence-based approaches to gameplay.",
      category: "Tips & Tricks",
      readTime: "8 min read",
      imageUrl: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "history",
      title: "From Liberty Bell to Digital Reels: The Evolution of Slot Machines",
      description: "A fascinating journey through the history of slot machines from mechanical devices to digital experiences.",
      category: "History",
      readTime: "10 min read",
      imageUrl: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "vegas-classics",
      title: "Vegas Classics: The Slot Machines that Changed Gambling",
      description: "Discover the iconic machines that shaped the landscape of casino gambling as we know it today.",
      category: "History",
      readTime: "6 min read",
      imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  const categories = [...new Set(articles.map(article => article.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D243B] flex flex-col">
      <LoyaltyNavbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
            <FileText className="h-8 w-8 mr-2 text-[#9b87f5]" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">
              Slot Machine Articles
            </span>
          </h1>
          <p className="text-[#9b87f5] max-w-2xl mx-auto">
            Learn about how slot machines work, discover our featured games, and become a more informed player.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="outline" className="bg-[#322B45] text-white border-purple-700 hover:bg-[#3D3450]">
              All Articles
            </Button>
            {categories.map(category => (
              <Button 
                key={category} 
                variant="outline" 
                className="bg-transparent text-[#9b87f5] border-purple-700 hover:bg-[#322B45]"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {articles.map((article) => (
            <Card 
              key={article.id} 
              className="overflow-hidden border border-[#3D3450] bg-gradient-to-b from-[#322B45] to-[#282336] hover:shadow-lg hover:shadow-purple-900/20 transition-all"
            >
              {article.imageUrl && (
                <div className="h-48 w-full overflow-hidden">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-purple-900 text-purple-200">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400">{article.readTime}</span>
                </div>
                <CardTitle className="text-xl text-white">{article.title}</CardTitle>
                <CardDescription className="text-gray-300">
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full bg-transparent border border-[#9b87f5] text-[#9b87f5] hover:bg-[#3D3450]"
                >
                  Read Article
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-[#322B45] rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Star className="h-6 w-6 mr-2 text-yellow-400" />
            Featured Games
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#2D243B] border-0">
              <CardHeader>
                <CardTitle className="text-yellow-300">Treasure Island</CardTitle>
                <CardDescription className="text-gray-300">
                  Embark on a pirate adventure with exciting bonus rounds.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
                  <Ticket className="mr-2 h-4 w-4" />
                  Play Now
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-[#2D243B] border-0">
              <CardHeader>
                <CardTitle className="text-yellow-300">Golden Dynasty</CardTitle>
                <CardDescription className="text-gray-300">
                  Ancient Chinese-themed slots with generous multipliers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
                  <Ticket className="mr-2 h-4 w-4" />
                  Play Now
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-[#2D243B] border-0">
              <CardHeader>
                <CardTitle className="text-yellow-300">Cosmic Wins</CardTitle>
                <CardDescription className="text-gray-300">
                  Space-themed adventure with expanding wilds and respins.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
                  <Ticket className="mr-2 h-4 w-4" />
                  Play Now
                </Button>
              </CardContent>
            </Card>
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

export default Articles;
