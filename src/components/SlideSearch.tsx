
import { Slide } from "./Slide";
import { Search, MessageCircle } from "lucide-react";

export const SlideSearch = ({ active }: { active: boolean }) => {
  return (
    <Slide active={active} className="bg-gradient-to-br from-telegram-primary to-telegram-dark">
      <div className="flex flex-col items-center justify-center h-full text-white space-y-8">
        <h2
          className="text-3xl font-bold animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          Поиск информации
        </h2>
        <div className="flex items-start gap-8">
          <div
            className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm animate-slide-in"
            style={{ animationDelay: "1s" }}
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="w-8 h-8" />
              <span className="text-lg">Когда следующая сессия?</span>
            </div>
          </div>
          <Search 
            className="w-12 h-12 animate-bounce text-telegram-primary" 
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm max-w-md animate-fade-in"
            style={{ animationDelay: "2s" }}
          >
            <p className="text-lg leading-relaxed">
              Зимняя сессия начинается 15 января 2024 года и продлится до 31 января. 
              Расписание экзаменов доступно в личном кабинете студента.
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
};
