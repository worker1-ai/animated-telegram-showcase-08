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
                  className="flex items-center gap-4 animate-slide-right"
                  style={{ 
                    animationDelay: `${1 + i * 0.3}s`,
                    opacity: 0,
                    animation: "slide-right 0.5s ease-out forwards"
                  }}
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

          <div 
            className="absolute inset-0 flex items-center justify-center opacity-0"
            style={{ 
              animationDelay: "3s",
              animation: "fade-in 0.5s ease-out forwards",
              animationFillMode: "forwards"
            }}
          >
            <div className="grid grid-cols-4 gap-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="relative"
                >
                  <div 
                    className="w-4 h-4 bg-telegram-primary rounded-full animate-scale-up"
                    style={{ 
                      animationDelay: `${3.5 + i * 0.2}s`,
                      opacity: 0,
                      animation: "scale-up 0.5s ease-out forwards",
                    }}
                  />
                  {i > 0 && (
                    <div 
                      className="absolute inset-0 w-full h-full"
                      style={{
                        animation: "fade-in 0.3s ease-out forwards",
                        animationDelay: `${4 + i * 0.2}s`,
                        opacity: 0
                      }}
                    >
                      <svg className="absolute top-1/2 left-1/2 -translate-x-full -translate-y-1/2 w-8 h-0.5">
                        <line
                          x1="0"
                          y1="1"
                          x2="100%"
                          y2="1"
                          stroke="rgba(34, 158, 217, 0.3)"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div 
            className="absolute inset-0 perspective-1000 opacity-0"
            style={{ 
              animationDelay: "6s",
              animation: "fade-in 0.5s ease-out forwards",
              animationFillMode: "forwards"
            }}
          >
            <div className="relative w-full h-full animate-rotate3d">
              <div className="absolute left-1/4 top-1/3 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i}>
                      <div
                        className="absolute w-3 h-3 bg-blue-400 rounded-full animate-pulse"
                        style={{ 
                          transform: `translate3d(${Math.cos(i * Math.PI/4) * 50}px, ${Math.sin(i * Math.PI/4) * 50}px, ${Math.sin(i * Math.PI/3) * 30}px)`,
                          animation: "pulse 2s infinite, fade-in 0.5s forwards",
                          animationDelay: `${6 + i * 0.2}s`
                        }}
                      />
                      {i > 0 && (
                        <div
                          className="absolute w-full h-full"
                          style={{
                            transform: `translate3d(${Math.cos(i * Math.PI/4) * 25}px, ${Math.sin(i * Math.PI/4) * 25}px, ${Math.sin(i * Math.PI/3) * 15}px)`,
                            animation: "fade-in 0.5s forwards",
                            animationDelay: `${6.5 + i * 0.2}s`
                          }}
                        >
                          <div className="absolute w-full h-0.5 bg-blue-400/30" />
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="absolute top-full mt-2 text-blue-400 whitespace-nowrap left-1/2 -translate-x-1/2">
                    Новости
                  </div>
                </div>
              </div>

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
          0% { 
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% { 
            transform: scale(1);
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

        .animate-scale-up {
          animation: scale-up 0.5s ease-out forwards;
        }
      `}</style>
    </Slide>
  );
};
