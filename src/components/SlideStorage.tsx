
import { Slide } from "./Slide";
import { Database } from "lucide-react";

export const SlideStorage = ({ active }: { active: boolean }) => {
  return (
    <Slide active={active} className="bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex flex-col items-center justify-center h-full text-white space-y-8">
        <h2
          className="text-3xl font-bold animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          Хранение данных
        </h2>
        <div className="relative w-96 h-64 grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/10 rounded-lg p-4 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <Database className="w-6 h-6 text-telegram-primary" />
              </div>
            </div>
          ))}
        </div>
        <p
          className="text-lg opacity-75 animate-fade-in text-center"
          style={{ animationDelay: "2s" }}
        >
          Оптимизированное хранение векторных данных
        </p>
      </div>
    </Slide>
  );
};
