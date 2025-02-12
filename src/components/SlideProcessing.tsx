
import { Slide } from "./Slide";
import { useState, useEffect } from "react";

const WORDS = [
  { text: "Лекция", group: "schedule", color: "rgb(74, 222, 128)" },
  { text: "Экзамен", group: "schedule", color: "rgb(74, 222, 128)" },
  { text: "Семинар", group: "schedule", color: "rgb(74, 222, 128)" },
  { text: "Новость", group: "news", color: "rgb(96, 165, 250)" },
  { text: "Анонс", group: "news", color: "rgb(96, 165, 250)" },
  { text: "Событие", group: "news", color: "rgb(96, 165, 250)" },
  { text: "Документ", group: "docs", color: "rgb(192, 132, 252)" },
  { text: "Приказ", group: "docs", color: "rgb(192, 132, 252)" },
  { text: "Справка", group: "docs", color: "rgb(192, 132, 252)" }
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
            // Распределяем слова по группам в разных частях 3D пространства
            const angle = (i * (360 / WORDS.length)) * (Math.PI / 180);
            const radius = 150;
            const groupOffset = {
              schedule: { x: -100, y: -100, z: 50 },
              news: { x: 100, y: -100, z: 50 },
              docs: { x: 0, y: 100, z: 50 }
            }[w.group];

            return {
              ...w,
              x: Math.cos(angle) * radius + groupOffset.x,
              y: Math.sin(angle) * radius + groupOffset.y,
              z: groupOffset.z + Math.random() * 50,
              opacity: 1,
              scale: 1
            };
          }
          return w;
        }));
      }, 500 + index * 300);
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
          <div 
            className="relative w-full h-full animate-rotate3d"
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            {words.map((word, index) => (
              <div
                key={index}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                style={{
                  transform: `translate3d(${word.x}px, ${word.y}px, ${word.z}px) scale(${word.scale})`,
                  opacity: word.opacity,
                  color: word.color,
                  transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontSize: '1.2rem',
                  textShadow: '0 0 10px rgba(0,0,0,0.5)'
                }}
              >
                <div className="relative">
                  <span className="relative z-10">{word.text}</span>
                  <div 
                    className="absolute inset-0 blur-sm opacity-50"
                    style={{ backgroundColor: word.color }}
                  />
                </div>
                <div 
                  className="absolute w-2 h-2 rounded-full -translate-x-1 -translate-y-1 top-1/2 left-1/2"
                  style={{ 
                    backgroundColor: word.color,
                    boxShadow: `0 0 10px ${word.color}`
                  }}
                />
              </div>
            ))}
          </div>

          {/* Координатные линии */}
          <div 
            className="absolute inset-0"
            style={{
              transformStyle: 'preserve-3d',
              opacity: 0.2
            }}
          >
            {/* X axis */}
            <div className="absolute left-0 top-1/2 w-full h-px bg-white" />
            {/* Y axis */}
            <div className="absolute top-0 left-1/2 w-px h-full bg-white" />
            {/* Z axis (diagonal line for perspective) */}
            <div 
              className="absolute left-1/2 top-1/2 w-px h-[200px] bg-white origin-top"
              style={{ transform: 'rotateX(-45deg)' }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rotate3d {
          0% {
            transform: rotateX(20deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(20deg) rotateY(360deg);
          }
        }

        .animate-rotate3d {
          animation: rotate3d 20s linear infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </Slide>
  );
};
