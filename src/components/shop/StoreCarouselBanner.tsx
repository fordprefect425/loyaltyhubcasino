
import React from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface BannerItem {
  title: string;
  description: string;
  bgColor: string;
  ctaText: string;
  image?: string;
}

const bannerItems: BannerItem[] = [
  {
    title: "VIP WEEKEND",
    description: "Get double tokens on all purchases this weekend!",
    bgColor: "from-purple-700 to-blue-700",
    ctaText: "Claim Now",
  },
  {
    title: "FIRST TIME BONUS",
    description: "First purchase? Get 25% extra tokens!",
    bgColor: "from-amber-600 to-red-700",
    ctaText: "Buy Now",
  },
  {
    title: "MEGA JACKPOT",
    description: "Buy tokens to unlock exclusive jackpot games",
    bgColor: "from-emerald-600 to-teal-800",
    ctaText: "Learn More",
  }
];

const StoreCarouselBanner = () => {
  return (
    <div className="mb-8">
      <Carousel
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {bannerItems.map((item, index) => (
            <CarouselItem key={index}>
              <Card className="border-0 overflow-hidden">
                <AspectRatio ratio={16 / 5}>
                  <div 
                    className={`h-full w-full bg-gradient-to-r ${item.bgColor} p-8 flex flex-col justify-center relative overflow-hidden`}
                  >
                    {/* Animated background elements */}
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-[10%] right-[5%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
                          {item.title}
                        </h3>
                        <p className="text-white/90 text-lg max-w-lg">
                          {item.description}
                        </p>
                      </div>
                      
                      <Button 
                        size="lg" 
                        className="bg-white text-purple-900 hover:bg-white/90 hover:text-purple-800 px-6 font-semibold shadow-lg group"
                      >
                        {item.ctaText}
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </AspectRatio>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
        </CarouselContent>
        <div className="absolute z-10 inset-0 flex items-center justify-between px-2 md:px-4">
          <CarouselPrevious className="relative left-0 bg-white/20 hover:bg-white/40 border-0" />
          <CarouselNext className="relative right-0 bg-white/20 hover:bg-white/40 border-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default StoreCarouselBanner;
