
import { Slide } from "./Slide";
import { Search, MessageCircle, Binary, Sparkles } from "lucide-react";

export const SlideSearch = ({ active }: { active: boolean }) => {
  return (
    <Slide active={active} className="bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex flex-col items-center justify-center h-full text-white space-y-8">
        {/* Заголовок */}
        <h2
          className="text-3xl font-bold animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          Поиск данных
        </h2>

        {/* Основной контейнер */}
        <div className="relative w-[800px] h-[500px]">
          {/* Сцена 1: Ввод запроса (0-3 сек) */}
          <div 
            className="absolute inset-0 flex items-start justify-center pt-12 animate-fade-in"
            style={{ animationDelay: "0s" }}
          >
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm max-w-2xl w-full">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-telegram-primary" />
                <div className="flex-1">
                  <div className="typing-effect">
                    Как узнать расписание?
                    <span className="cursor">|</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Сцена 2: Преобразование запроса (3-6 сек) */}
          <div 
            className="absolute inset-0 flex items-center justify-center animate-fade-in"
            style={{ animationDelay: "3s" }}
          >
            <div className="relative">
              {/* Фрагменты текста */}
              {['Как', 'узнать', 'расписание'].map((word, i) => (
                <div
                  key={word}
                  className="absolute text-sm bg-white/10 px-2 py-1 rounded animate-scatter"
                  style={{ 
                    animationDelay: `${3.5 + i * 0.2}s`,
                    left: `${-50 + i * 50}px`,
                    top: `${20 + i * 10}px`
                  }}
                >
                  {word}
                </div>
              ))}
              
              {/* Результирующий эмбеддинг */}
              <div 
                className="w-12 h-12 bg-telegram-primary rounded-full animate-pulse-strong"
                style={{ animationDelay: "5s" }}
              />
            </div>
          </div>

          {/* Сцена 3: Поиск ближайших соседей (6-12 сек) */}
          <div 
            className="absolute inset-0 perspective-1000 animate-fade-in"
            style={{ animationDelay: "6s" }}
          >
            <div className="relative w-full h-full transform-style-3d animate-rotate3d">
              {/* Облако точек */}
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-3 h-3 rounded-full ${
                    i < 5 ? 'bg-telegram-primary animate-glow' : 'bg-white/30'
                  }`}
                  style={{
                    transform: `translate3d(
                      ${Math.cos(i * 0.7) * 150}px,
                      ${Math.sin(i * 0.5) * 150}px,
                      ${Math.sin(i * 0.3) * 100}px
                    )`,
                    animationDelay: `${7 + i * 0.2}s`
                  }}
                />
              ))}

              {/* Линии связей */}
              <svg className="absolute inset-0 w-full h-full">
                {Array.from({ length: 5 }).map((_, i) => (
                  <line
                    key={i}
                    x1="50%"
                    y1="50%"
                    x2={`${45 + Math.cos(i * 1.25) * 20}%`}
                    y2={`${45 + Math.sin(i * 1.25) * 20}%`}
                    stroke="rgba(34,139,217,0.5)"
                    strokeWidth="2"
                    className="animate-draw"
                    style={{ animationDelay: `${8 + i * 0.3}s` }}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Сцена 4: Извлечение результатов (12-18 сек) */}
          <div 
            className="absolute inset-0 flex items-center justify-center animate-fade-in"
            style={{ animationDelay: "12s" }}
          >
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm max-w-2xl w-full animate-slide-up">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-telegram-primary" />
                  <span className="text-lg font-medium">Найденный результат:</span>
                </div>
                <p className="text-lg leading-relaxed animate-fade-in" style={{ animationDelay: "14s" }}>
                  Зимняя сессия начинается 15 января 2024 года и продлится до 31 января. 
                  Расписание экзаменов доступно в личном кабинете студента.
                </p>
              </div>
            </div>
          </div>

          {/* Сцена 5: Финальное сообщение (18-20 сек) */}
          <div 
            className="absolute inset-0 flex items-end justify-center pb-8 animate-fade-in"
            style={{ animationDelay: "18s" }}
          >
            <p className="text-telegram-primary text-xl font-medium">
              Результат найден за 0.2 секунды!
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        @keyframes blink {
          0%, 100% { opacity: 1 }
          50% { opacity: 0 }
        }

        .typing-effect {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          animation: typing 2s steps(25);
        }

        .cursor {
          animation: blink 1s step-start infinite;
        }

        @keyframes scatter {
          0% { transform: scale(1) translate(0, 0); opacity: 1; }
          100% { transform: scale(0.5) translate(var(--tx, 50px), var(--ty, 50px)); opacity: 0; }
        }

        @keyframes pulse-strong {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }

        @keyframes rotate3d {
          0% { transform: rotate3d(1, 1, 1, 0deg); }
          100% { transform: rotate3d(1, 1, 1, 360deg); }
        }

        @keyframes glow {
          0% { filter: brightness(1) drop-shadow(0 0 5px rgba(34,139,217,0.5)); }
          50% { filter: brightness(1.5) drop-shadow(0 0 10px rgba(34,139,217,0.8)); }
          100% { filter: brightness(1) drop-shadow(0 0 5px rgba(34,139,217,0.5)); }
        }

        .animate-scatter {
          animation: scatter 1s forwards;
        }

        .animate-pulse-strong {
          animation: pulse-strong 2s infinite;
        }

        .animate-rotate3d {
          animation: rotate3d 15s linear infinite;
        }

        .animate-glow {
          animation: glow 2s infinite;
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        @keyframes draw {
          from {
            stroke-dashoffset: 100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .animate-draw {
          stroke-dasharray: 100;
          animation: draw 1s ease-out forwards;
        }

        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }
      `}</style>
    </Slide>
  );
};
