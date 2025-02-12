
import { Slide } from "./Slide";
import { Database, BoxIcon, Binary } from "lucide-react";

export const SlideStorage = ({ active }: { active: boolean }) => {
  return (
    <Slide active={active} className="bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex flex-col items-center justify-center h-full text-white space-y-8">
        {/* Заголовок */}
        <h2
          className="text-3xl font-bold animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          Хранение данных
        </h2>

        {/* Основной контейнер */}
        <div className="relative w-[800px] h-[500px]">
          {/* Сцена 1: Инициализация базы данных (0-3 сек) */}
          <div className="absolute inset-0">
            {/* Фоновая сетка */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-1 p-4">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={i}
                  className="border border-telegram-primary/20 rounded animate-fade-in"
                  style={{ 
                    animationDelay: `${(i * 0.05)}s`,
                    background: 'linear-gradient(45deg, rgba(34,139,217,0.05) 0%, rgba(34,139,217,0.1) 100%)'
                  }}
                />
              ))}
            </div>
            
            {/* Цифровой фон */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute text-xs text-telegram-primary/50 whitespace-nowrap animate-slide-down"
                  style={{
                    left: `${i * 10}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '10s'
                  }}
                >
                  {Array.from({ length: 20 }).map(() => '01').join(' ')}
                </div>
              ))}
            </div>
          </div>

          {/* Сцена 2: Перемещение эмбеддингов (3-8 сек) */}
          <div 
            className="absolute inset-0 grid grid-cols-4 gap-4 p-8 animate-fade-in"
            style={{ animationDelay: "3s" }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="relative bg-white/5 rounded-lg backdrop-blur-sm animate-scale-up"
                style={{ animationDelay: `${3 + i * 0.2}s` }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Database 
                    className="w-6 h-6 text-telegram-primary animate-pulse" 
                    style={{ animationDelay: `${4 + i * 0.2}s` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Сцена 3: Структурирование (8-12 сек) */}
          <div 
            className="absolute inset-0 animate-fade-in"
            style={{ animationDelay: "8s" }}
          >
            {/* Линии связей */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={i}
                  x1={`${20 + (i % 4) * 20}%`}
                  y1={`${30 + Math.floor(i / 4) * 20}%`}
                  x2={`${20 + ((i + 1) % 4) * 20}%`}
                  y2={`${30 + Math.floor((i + 1) / 4) * 20}%`}
                  stroke="rgba(34,139,217,0.3)"
                  strokeWidth="2"
                  className="animate-draw"
                  style={{ animationDelay: `${8 + i * 0.2}s` }}
                />
              ))}
            </svg>

            {/* Метки групп */}
            {['Расписание', 'Контакты', 'Документы'].map((label, i) => (
              <div
                key={label}
                className="absolute text-telegram-primary text-sm animate-fade-in"
                style={{
                  top: `${25 + i * 25}%`,
                  left: '75%',
                  animationDelay: `${10 + i * 0.5}s`
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Сцена 4: Финальное подтверждение (12-15 сек) */}
          <div 
            className="absolute inset-0 flex items-center justify-center perspective-1000 animate-fade-in"
            style={{ animationDelay: "12s" }}
          >
            <div className="relative transform animate-zoom-rotate">
              <p className="text-xl text-telegram-primary text-center backdrop-blur-sm bg-black/30 px-6 py-3 rounded-lg">
                Данные готовы к поиску!
              </p>
            </div>
          </div>
        </div>

        {/* Комментарий внизу */}
        <p 
          className="text-sm text-gray-400 animate-fade-in"
          style={{ animationDelay: "14s" }}
        >
          Готово: данные сохранены и структурированы для мгновенного поиска
        </p>
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(100%);
          }
        }

        @keyframes draw {
          from {
            stroke-dashoffset: 100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes zoom-rotate {
          0% {
            transform: scale(0.9) rotateX(0deg);
          }
          50% {
            transform: scale(1.1) rotateX(10deg);
          }
          100% {
            transform: scale(1) rotateX(0deg);
          }
        }

        .animate-slide-down {
          animation: slide-down 10s linear infinite;
        }

        .animate-draw {
          stroke-dasharray: 100;
          animation: draw 1s ease-out forwards;
        }

        .animate-zoom-rotate {
          animation: zoom-rotate 3s ease-in-out infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </Slide>
  );
};
