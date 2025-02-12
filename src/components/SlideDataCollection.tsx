
import { Slide } from "./Slide";
import { FileText, FolderOpen } from "lucide-react";

export const SlideDataCollection = ({ active }: { active: boolean }) => {
  return (
    <Slide active={active} className="bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex flex-col items-center justify-center h-full text-white space-y-8">
        <h2
          className="text-3xl font-bold animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          Сбор данных
        </h2>
        <div className="relative w-96 h-64 bg-white/10 rounded-lg backdrop-blur-sm overflow-hidden">
          <div
            className="absolute inset-0 animate-slide-in"
            style={{ animationDelay: "1s" }}
          >
            {/* Симуляция контента веб-страницы */}
            <div className="p-4 space-y-2">
              <div className="h-4 bg-white/20 rounded w-3/4"></div>
              <div className="h-4 bg-white/20 rounded w-1/2"></div>
              <div className="h-4 bg-white/20 rounded w-2/3"></div>
            </div>
          </div>
          <div
            className="absolute right-4 bottom-4 animate-fade-in"
            style={{ animationDelay: "2s" }}
          >
            <FolderOpen className="w-12 h-12 text-telegram-primary animate-bounce" />
          </div>
        </div>
        <div className="flex gap-4 animate-fade-in" style={{ animationDelay: "2.5s" }}>
          <FileText className="w-8 h-8" />
          <FileText className="w-8 h-8" />
          <FileText className="w-8 h-8" />
        </div>
      </div>
    </Slide>
  );
};
