
import { Slide } from "./Slide";
import { FileText } from "lucide-react";

export const SlideProcessing = ({ active }: { active: boolean }) => {
  return (
    <Slide active={active} className="bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="flex flex-col items-center justify-center h-full text-white space-y-8">
        <h2
          className="text-3xl font-bold animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          Векторизация данных
        </h2>

        <div className="relative w-[800px] h-[500px]">
          {/* Сцена 1: Исходные текстовые данные */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center animate-fade-in opacity-0"
            style={{ 
              animationDelay: "0.5s",
              animationFillMode: "forwards"
            }}
          >
            <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm w-full max-w-2xl space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4"
                  style={{ 
                    opacity: 0,
                    animation: "slide-right 0.5s ease-out forwards",
                    animationDelay: `${1 + i * 0.3}s`,
                    position: "relative"
                  }}
                >
                  <FileText className="w-6 h-6 text-telegram-primary shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-white/20 rounded w-3/4" />
                    <div className="h-4 bg-white/10 rounded w-1/2" />
                  </div>
                  <div className="absolute -right-32 flex items-center gap-2 opacity-0"
                       style={{
                         animation: "show-coordinates 0.5s ease-out forwards",
                         animationDelay: `${2 + i * 0.3}s`
                       }}>
                    <span className="text-sm text-telegram-primary">
                      ({Math.random().toFixed(2)}, {Math.random().toFixed(2)}, {Math.random().toFixed(2)})
                    </span>
                    <div className="w-3 h-3 bg-telegram-primary rounded-full"
                         style={{
                           animation: "pulse 2s infinite"
                         }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Сцена 2: Векторное пространство (убрано, так как это промежуточная сцена) */}

          {/* Сцена 3: 3D Кластеризация */}
          <div 
            className="absolute inset-0 perspective-1000 opacity-0"
            style={{ 
              animationDelay: "6s",
              animation: "fade-in 0.5s ease-out forwards",
              animationFillMode: "forwards"
            }}
          >
            <div className="relative w-full h-full">
              {/* Кластер: Новости */}
              <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2">
                <div className="relative bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"
                        style={{ 
                          animation: "pulse 2s infinite, fade-in 0.5s forwards",
                          animationDelay: `${6 + i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 text-blue-400 text-center">
                    Новости
                  </div>
                </div>
              </div>

              {/* Кластер: Расписание */}
              <div className="absolute right-1/4 top-1/4 translate-x-1/2 -translate-y-1/2">
                <div className="relative bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 bg-green-400 rounded-full animate-pulse"
                        style={{ 
                          animation: "pulse 2s infinite, fade-in 0.5s forwards",
                          animationDelay: `${7 + i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 text-green-400 text-center">
                    Расписание
                  </div>
                </div>
              </div>

              {/* Кластер: Документы */}
              <div className="absolute left-1/2 bottom-1/4 -translate-x-1/2 translate-y-1/2">
                <div className="relative bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"
                        style={{ 
                          animation: "pulse 2s infinite, fade-in 0.5s forwards",
                          animationDelay: `${8 + i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 text-purple-400 text-center">
                    Документы
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Финальное сообщение */}
          <div 
            className="absolute inset-0 flex items-center justify-center animate-fade-in opacity-0"
            style={{ 
              animationDelay: "18s",
              animationFillMode: "forwards"
            }}
          >
            <p className="text-xl text-telegram-primary text-center bg-black/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              Векторизация завершена
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-right {
          0% { 
            transform: translateX(-20px);
            opacity: 0;
          }
          100% { 
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes show-coordinates {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </Slide>
  );
};
