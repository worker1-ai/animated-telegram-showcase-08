
import { useEffect, useState } from "react";
import { SlideIntro } from "@/components/SlideIntro";
import { SlideDataCollection } from "@/components/SlideDataCollection";
import { SlideProcessing } from "@/components/SlideProcessing";
import { SlideStorage } from "@/components/SlideStorage";
import { SlideSearch } from "@/components/SlideSearch";
import { SlideFinale } from "@/components/SlideFinale";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const slideDurations = [5000, 5000, 5000, 5000, 5000, 5000]; // Duration for each slide in ms

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentSlide < slideDurations.length - 1) {
        setCurrentSlide(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, slideDurations[currentSlide]);

    return () => clearTimeout(timer);
  }, [currentSlide, isPlaying]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <SlideIntro active={currentSlide === 0} />
      <SlideDataCollection active={currentSlide === 1} />
      <SlideProcessing active={currentSlide === 2} />
      <SlideStorage active={currentSlide === 3} />
      <SlideSearch active={currentSlide === 4} />
      <SlideFinale active={currentSlide === 5} />
      
      {!isPlaying && (
        <button
          onClick={() => {
            setCurrentSlide(0);
            setIsPlaying(true);
          }}
          className="fixed bottom-8 right-8 px-6 py-3 bg-telegram-primary text-white rounded-full 
                     hover:bg-telegram-secondary transition-colors duration-200 z-50"
        >
          Запустить презентацию
        </button>
      )}
    </div>
  );
};

export default Index;
