
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SlideIntro } from "@/components/SlideIntro";
import { SlideDataCollection } from "@/components/SlideDataCollection";
import { SlideProcessing } from "@/components/SlideProcessing";
import { SlideStorage } from "@/components/SlideStorage";
import { SlideSearch } from "@/components/SlideSearch";
import { SlideFinale } from "@/components/SlideFinale";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 6;

  const goToNextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  // Обработка клавиш стрелок
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNextSlide();
      } else if (e.key === "ArrowLeft") {
        goToPrevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSlide]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <SlideIntro active={currentSlide === 0} />
      <SlideDataCollection active={currentSlide === 1} />
      <SlideProcessing active={currentSlide === 2} />
      <SlideStorage active={currentSlide === 3} />
      <SlideSearch active={currentSlide === 4} />
      <SlideFinale active={currentSlide === 5} />
      
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-50">
        <Button
          variant="outline"
          onClick={goToPrevSlide}
          disabled={currentSlide === 0}
          className="bg-white/10 hover:bg-white/20 text-white border-none"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          onClick={goToNextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="bg-white/10 hover:bg-white/20 text-white border-none"
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
