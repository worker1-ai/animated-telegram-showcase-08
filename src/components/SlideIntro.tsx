
import { Slide } from "./Slide";
import { Send } from "lucide-react";

export const SlideIntro = ({ active }: { active: boolean }) => {
  return (
    <Slide active={active} className="bg-gradient-to-br from-telegram-primary to-telegram-dark">
      <div className="flex flex-col items-center justify-center h-full text-white space-y-8">
        <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <img
            src="/university-logo.png"
            alt="Логотип университета"
            className="w-32 h-32 object-contain"
          />
        </div>
        <div
          className="animate-scale-up bg-white/10 backdrop-blur-sm rounded-2xl p-8"
          style={{ animationDelay: "1s" }}
        >
          <Send className="w-16 h-16 text-white animate-bounce" />
        </div>
        <h1
          className="text-4xl font-bold animate-fade-in"
          style={{ animationDelay: "1.5s" }}
        >
          Телеграм-бот университета
        </h1>
        <p
          className="text-xl opacity-90 animate-fade-in text-center max-w-md"
          style={{ animationDelay: "2s" }}
        >
          Ваш AI-ассистент для мгновенного доступа к информации университета
        </p>
      </div>
    </Slide>
  );
};
