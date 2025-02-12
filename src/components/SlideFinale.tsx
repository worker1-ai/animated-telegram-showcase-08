
import { Slide } from "./Slide";
import { Send } from "lucide-react";

export const SlideFinale = ({ active }: { active: boolean }) => {
  return (
    <Slide active={active} className="bg-gradient-to-br from-gray-900 to-black">
      <div className="flex flex-col items-center justify-center h-full text-white space-y-8">
        <div
          className="animate-scale-up"
          style={{ animationDelay: "0.5s" }}
        >
          <Send className="w-24 h-24 text-telegram-primary" />
        </div>
        <h2
          className="text-4xl font-bold animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          Начните использовать прямо сейчас
        </h2>
        <div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-fade-in"
          style={{ animationDelay: "1.5s" }}
        >
          <img
            src="/qr-code.png"
            alt="QR код для доступа к боту"
            className="w-48 h-48 object-contain"
          />
        </div>
        <p
          className="text-xl opacity-90 animate-fade-in text-center max-w-md"
          style={{ animationDelay: "2s" }}
        >
          Отсканируйте QR-код или найдите бота по имени @UniversityAssistantBot
        </p>
      </div>
    </Slide>
  );
};
