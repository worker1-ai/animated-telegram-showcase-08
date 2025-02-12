
import { Slide } from "./Slide";
import { useState, useEffect } from "react";

const WORDS = [
  { text: "Лекция", group: "schedule", color: "rgb(74, 222, 128)", vector: [-100, -50, 100] },
  { text: "Экзамен", group: "schedule", color: "rgb(74, 222, 128)", vector: [-150, -100, 50] },
  { text: "Семинар", group: "schedule", color: "rgb(74, 222, 128)", vector: [-120, -80, 80] },
  { text: "Новость", group: "news", color: "rgb(96, 165, 250)", vector: [100, -50, 100] },
  { text: "Анонс", group: "news", color: "rgb(96, 165, 250)", vector: [150, -100, 50] },
  { text: "Событие", group: "news", color: "rgb(96, 165, 250)", vector: [120, -80, 80] },
  { text: "Документ", group: "docs", color: "rgb(192, 132, 252)", vector: [0, 150, 100] },
  { text: "Приказ", group: "docs", color: "rgb(192, 132, 252)", vector: [-50, 120, 80] },
  { text: "Справка", group: "docs", color: "rgb(192, 132, 252)", vector: [50, 130, 90] }
];

export const SlideProcessing = ({ active }: { active: boolean }) => {
  const [words, setWords] = useState(WORDS.map(word => ({
    ...word,
    x: 0,
    y: 0,
    z: 0,
    opacity: 0,
    scale: 0
  })));

  useEffect(() => {
    if (!active) return;

    // Анимация появления и распределения слов
    words.forEach((word, index) => {
      setTimeout(() => {
        setWords(prev => prev.map((w, i) => {
          if (i === index) {
            const [x, y, z] = WORDS[i].vector;
            return {
              ...w,
              x,
              y,
              z,
              opacity: 1,
              scale: 1
            };
          }
          return w;
        }));
      }, 500 + index * 500); // Увеличили задержку для лучшего восприятия
    });
  }, [active]);

  return (
    <Slide active={active} className="bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="flex flex-col items-center justify-center h-full text-white space-y-8">
        <h2
          className="text-3xl font-bold animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          Векторизация данных
        </h2>

        <div className="relative w-[800px] h-[500px] perspective-1000">
          {/* Статичная сцена */}
          <div 
            className="relative w-full h-full"
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Вращающаяся камера */}
            <div 
              className="absolute inset-0 animate-camera-rotate"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center'
              }}
            >
              {/* Слова в пространстве */}
              {words.map((word, index) => (
                <div
                  key={index}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                  style={{
                    transform: `translate3d(${word.x}px, ${word.y}px, ${word.z}px) scale(${word.scale})`,
                    opacity: word.opacity,
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {/* Текст слова */}
                  <div className="relative">
                    <span 
                      className="relative z-10 text-lg font-medium"
                      style={{ color: word.color }}
                    >
                      {word.text}
                    </span>
                    <div 
                      className="absolute inset-0 blur-sm opacity-30"
                      style={{ backgroundColor: word.color }}
                    />
                  </div>
                  
                  {/* Координаты */}
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs opacity-70"
                    style={{ color: word.color }}
                  >
                    ({word.x}, {word.y}, {word.z})
                  </div>

                  {/* Точка */}
                  <div 
                    className="absolute w-2 h-2 rounded-full -translate-x-1 -translate-y-1 top-1/2 left-1/2"
                    style={{ 
                      backgroundColor: word.color,
                      boxShadow: `0 0 10px ${word.color}`
                    }}
                  />

                  {/* Линия к началу координат */}
                  <div 
                    className="absolute left-1/2 top-1/2 w-px"
                    style={{
                      height: `${Math.sqrt(word.x ** 2 + word.y ** 2 + word.z ** 2)}px`,
                      backgroundColor: `${word.color}33`,
                      transform: `rotate3d(${-word.y}, ${word.x}, 0, ${Math.atan2(Math.sqrt(word.x ** 2 + word.y ** 2), word.z) * (180 / Math.PI)}deg)`,
                      transformOrigin: 'top',
                      opacity: word.opacity * 0.5
                    }}
                  />
                </div>
              ))}

              {/* Координатные оси */}
              <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
                {/* X axis */}
                <div className="absolute left-0 top-1/2 w-full h-px bg-white/20" />
                {/* Y axis */}
                <div className="absolute top-0 left-1/2 w-px h-full bg-white/20" />
                {/* Z axis */}
                <div 
                  className="absolute left-1/2 top-1/2 w-px h-[300px] bg-white/20 origin-top"
                  style={{ transform: 'rotateX(-90deg)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes camera-rotate {
          0% {
            transform: rotateY(0deg) rotateX(20deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(20deg);
          }
        }

        .animate-camera-rotate {
          animation: camera-rotate 20s linear infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </Slide>
  );
};
