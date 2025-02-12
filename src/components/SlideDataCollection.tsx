
import { Slide } from "./Slide";
import { FileText, FolderOpen, ChevronDown, Globe } from "lucide-react";

export const SlideDataCollection = ({ active }: { active: boolean }) => {
  return (
    <Slide active={active} className="bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex flex-col items-center justify-center h-full text-white space-y-4">
        <h2
          className="text-3xl font-bold animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          Сбор данных с сайта университета
        </h2>

        {/* Сцена 1: Веб-страница (0-3 сек) */}
        <div className="relative w-[800px] h-[500px] bg-white/5 rounded-lg backdrop-blur-sm overflow-hidden">
          {/* Имитация браузерной строки */}
          <div className="flex items-center gap-2 bg-white/10 p-2 border-b border-white/10">
            <Globe className="w-4 h-4 text-gray-400" />
            <div className="flex-1 bg-white/5 rounded px-2 py-1 text-sm">
              iitu.edu.kz
            </div>
          </div>

          {/* Контент страницы */}
          <div className="p-6 space-y-6">
            {/* Хедер сайта */}
            <div 
              className="h-12 bg-white/10 rounded animate-fade-in flex items-center px-6"
              style={{ animationDelay: "1s" }}
            >
              <span className="text-xl font-bold">International IT University</span>
            </div>

            {/* Основной контент */}
            <div className="grid grid-cols-3 gap-4">
              {/* Навигация */}
              <div className="space-y-2">
                <div className="font-medium text-sm text-gray-400 mb-4">Меню</div>
                {[
                  "Об университете",
                  "Поступление",
                  "Факультеты",
                  "Наука",
                  "Студентам",
                  "Контакты"
                ].map((item, i) => (
                  <div
                    key={i}
                    className="h-8 bg-white/10 rounded px-3 flex items-center animate-fade-in hover:bg-white/20 transition-colors cursor-pointer"
                    style={{ animationDelay: `${1 + i * 0.2}s` }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Центральная колонка с новостями */}
              <div className="col-span-2 space-y-4">
                <div className="font-medium text-sm text-gray-400 mb-2">Новости и события</div>
                {[
                  {
                    title: "День открытых дверей IITU 2024",
                    desc: "Приглашаем абитуриентов и их родителей на день открытых дверей"
                  },
                  {
                    title: "Международная научная конференция",
                    desc: "Открыт прием заявок на участие в конференции AI & Big Data"
                  },
                  {
                    title: "Встреча с работодателями",
                    desc: "Ведущие IT компании проведут презентации для студентов"
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group relative space-y-2 bg-white/5 p-4 rounded animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${2 + i * 0.3}s` }}
                  >
                    <div className="text-lg font-medium group-hover:text-telegram-primary transition-colors">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {item.desc}
                    </div>
                    {/* Анимация выделения при наведении */}
                    <div className="absolute inset-0 border border-transparent group-hover:border-telegram-primary/50 rounded transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Курсор и эффекты сканирования */}
          <div
            className="absolute w-full h-full top-0 left-0 pointer-events-none"
            style={{ 
              background: "linear-gradient(transparent, rgba(32, 129, 226, 0.1))",
              animation: "scanline 2s linear infinite",
            }}
          />
        </div>

        {/* Сцена 2 и 3: Сбор данных (3-12 сек) */}
        <div 
          className="relative h-32 animate-fade-in flex items-center justify-center"
          style={{ animationDelay: "4s" }}
        >
          {/* Виртуальная папка */}
          <div className="relative bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="absolute -top-3 -right-3">
              <div className="relative">
                <ChevronDown className="w-6 h-6 text-telegram-primary animate-bounce" />
                {/* Анимированные точки загрузки */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-1 h-1 bg-telegram-primary rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <FolderOpen className="w-12 h-12 text-telegram-primary" />
              {/* Анимация добавления файлов */}
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="relative bg-white/20 rounded p-2 animate-fade-in"
                    style={{ animationDelay: `${6 + i * 0.5}s` }}
                  >
                    <FileText className="w-6 h-6" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </Slide>
  );
};
