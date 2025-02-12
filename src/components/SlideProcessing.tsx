
import { Slide } from "./Slide";
import { Binary, FileText } from "lucide-react";

export const SlideProcessing = ({ active }: { active: boolean }) => {
  return (
    <Slide active={active} className="bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="flex flex-col items-center justify-center h-full text-white space-y-8">
        {/* Заголовок */}
        <h2
          className="text-3xl font-bold animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          Векторизация данных
        </h2>

        {/* Контейнер для всех сцен */}
        <div className="relative w-[800px] h-[500px]">
          {/* Сцена 1: Разбиение текста (0-3 сек) */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center animate-fade-in"
            style={{ animationDelay: "1s" }}
          >
            <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm w-full max-w-2xl space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 animate-fade-in"
                  style={{ animationDelay: `${1 + i * 0.5}s` }}
                >
                  <FileText className="w-6 h-6 text-telegram-primary shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-white/20 rounded w-3/4" />
                    <div className="h-4 bg-white/10 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Сцена 2: Преобразование в точки (3-6 сек) */}
          <div 
            className="absolute inset-0 flex items-center justify-center animate-fade-in opacity-0"
            style={{ 
              animationDelay: "3s",
              animationFillMode: "forwards"
            }}
          >
            <div className="grid grid-cols-4 gap-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-telegram-primary rounded-full animate-scale-up"
                  style={{ 
                    animationDelay: `${3.5 + i * 0.2}s`,
                    opacity: 0.7 + Math.random() * 0.3
                  }}
                />
              ))}
            </div>
          </div>

          {/* Сцена 3-4: 3D Кластеры (6-18 сек) */}
          <div 
            className="absolute inset-0 perspective-1000 opacity-0"
            style={{ 
              animationDelay: "6s",
              animation: "fade-in 0.5s ease-out forwards",
              animationFillMode: "forwards"
            }}
          >
            <div className="relative w-full h-full animate-rotate3d">
              {/* Группа 1: Новости */}
              <div className="absolute left-1/4 top-1/3 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-blue-400 rounded-full animate-pulse"
                      style={{ 
                        transform: `translate3d(${Math.cos(i * Math.PI/4) * 50}px, ${Math.sin(i * Math.PI/4) * 50}px, ${Math.sin(i * Math.PI/3) * 30}px)`,
                        animationDelay: `${6 + i * 0.2}s`
                      }}
                    />
                  ))}
                  <div className="absolute top-full mt-2 text-blue-400 whitespace-nowrap left-1/2 -translate-x-1/2">
                    Новости
                  </div>
                </div>
              </div>

              {/* Группа 2: Расписание */}
              <div className="absolute right-1/4 top-1/3 translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-green-400 rounded-full animate-pulse"
                      style={{ 
                        transform: `translate3d(${Math.cos(i * Math.PI/4) * 40}px, ${Math.sin(i * Math.PI/4) * 40}px, ${Math.cos(i * Math.PI/3) * 30}px)`,
                        animationDelay: `${7 + i * 0.2}s`
                      }}
                    />
                  ))}
                  <div className="absolute top-full mt-2 text-green-400 whitespace-nowrap left-1/2 -translate-x-1/2">
                    Расписание
                  </div>
                </div>
              </div>

              {/* Группа 3: Документы */}
              <div className="absolute left-1/2 bottom-1/4 -translate-x-1/2 translate-y-1/2">
                <div className="relative">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-purple-400 rounded-full animate-pulse"
                      style={{ 
                        transform: `translate3d(${Math.cos(i * Math.PI/4) * 45}px, ${Math.sin(i * Math.PI/4) * 45}px, ${Math.sin(i * Math.PI/2) * 30}px)`,
                        animationDelay: `${8 + i * 0.2}s`
                      }}
                    />
                  ))}
                  <div className="absolute top-full mt-2 text-purple-400 whitespace-nowrap left-1/2 -translate-x-1/2">
                    Документы
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Сцена 5: Финальное сообщение (18-20 сек) */}
          <div 
            className="absolute inset-0 flex items-center justify-center animate-fade-in opacity-0"
            style={{ 
              animationDelay: "18s",
              animationFillMode: "forwards"
            }}
          >
            <p className="text-xl text-telegram-primary text-center">
              Эмбеддинг завершен. Данные готовы к хранению.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rotate3d {
          0% {
            transform: perspective(1000px) rotateX(20deg) rotateY(0deg);
          }
          50% {
            transform: perspective(1000px) rotateX(20deg) rotateY(180deg);
          }
          100% {
            transform: perspective(1000px) rotateX(20deg) rotateY(360deg);
          }
        }

        .animate-rotate3d {
          animation: rotate3d 15s linear infinite;
          transform-style: preserve-3d;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        @keyframes scale-up {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-scale-up {
          animation: scale-up 0.5s ease-out forwards;
        }
      `}</style>
    </Slide>
  );
};
