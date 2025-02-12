
import { Slide } from "./Slide";
import { Binary } from "lucide-react";

export const SlideProcessing = ({ active }: { active: boolean }) => {
  return (
    <Slide active={active} className="bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="flex flex-col items-center justify-center h-full text-white space-y-8">
        <h2
          className="text-3xl font-bold animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          Data Processing & Embedding
        </h2>
        <div
          className="relative w-96 h-96 perspective-1000"
          style={{ animationDelay: "1s" }}
        >
          <div className="animate-rotate3d">
            {/* 3D Vector points visualization */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-telegram-primary rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `translateZ(${Math.random() * 100}px)`,
                }}
              />
            ))}
          </div>
        </div>
        <div
          className="flex items-center gap-2 animate-fade-in"
          style={{ animationDelay: "2s" }}
        >
          <Binary className="w-6 h-6" />
          <span className="text-sm opacity-75">Vector Transformation</span>
        </div>
      </div>
    </Slide>
  );
};
