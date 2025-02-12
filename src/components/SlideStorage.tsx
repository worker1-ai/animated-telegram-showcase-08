
import { Slide } from "./Slide";
import { Database, BoxIcon, Binary } from "lucide-react";

// Типы данных для визуализации
const DATA_TYPES = [
  { type: "text", color: "rgb(74, 222, 128)", examples: ["Лекция", "Семинар"] },
  { type: "datetime", color: "rgb(96, 165, 250)", examples: ["14:30", "2024-03-15"] },
  { type: "vector", color: "rgb(192, 132, 252)", examples: ["[0.23, 0.45, 0.89]"] },
  { type: "category", color: "rgb(251, 146, 60)", examples: ["Расписание", "Новости"] }
];

export const SlideStorage = ({ active }: { active: boolean }) => {
  return (
    <Slide active={active} className="bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex flex-col items-center justify-center h-full text-white space-y-8">
        <h2
          className="text-3xl font-bold animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          Хранение данных
        </h2>

        <div className="relative w-[800px] h-[500px]">
          {/* Матрица на фоне */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 grid grid-cols-16 grid-rows-12 gap-1 p-4 opacity-20">
              {Array.from({ length: 192 }).map((_, i) => (
                <div
                  key={i}
                  className="border border-telegram-primary/20 rounded animate-pulse"
                  style={{ 
                    animationDelay: `${(i * 0.05)}s`,
                    background: 'linear-gradient(45deg, rgba(34,139,217,0.05) 0%, rgba(34,139,217,0.1) 100%)'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Основная визуализация хранения данных */}
          <div className="relative h-full flex flex-col items-center justify-center space-y-8">
            {/* Типы данных и их визуализация */}
            <div className="grid grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: "1s" }}>
              {DATA_TYPES.map((dataType, index) => (
                <div 
                  key={index}
                  className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10"
                >
                  <div className="text-sm font-medium mb-2" style={{ color: dataType.color }}>
                    {dataType.type}
                  </div>
                  <div className="space-y-1">
                    {dataType.examples.map((example, i) => (
                      <div key={i} className="text-xs text-gray-400">
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Структура базы данных */}
            <div 
              className="relative w-full max-w-2xl bg-white/5 rounded-lg p-6 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: "2s" }}
            >
              <div className="absolute -top-3 -right-3">
                <Database className="w-6 h-6 text-telegram-primary" />
              </div>

              {/* Таблица с данными */}
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-400">
                  <div>ID</div>
                  <div>Content</div>
                  <div>Metadata</div>
                  <div>Vector</div>
                </div>

                {/* Примеры записей */}
                {[
                  {
                    id: "1",
                    content: "Лекция по AI",
                    metadata: { type: "schedule", time: "14:30" },
                    vector: [0.23, 0.45, 0.89]
                  },
                  {
                    id: "2",
                    content: "Научная конференция",
                    metadata: { type: "news", date: "2024-03-15" },
                    vector: [0.78, 0.12, 0.34]
                  }
                ].map((record, index) => (
                  <div 
                    key={index}
                    className="grid grid-cols-4 gap-4 text-sm bg-white/5 p-3 rounded animate-fade-in"
                    style={{ animationDelay: `${3 + index * 0.5}s` }}
                  >
                    <div className="text-gray-500">{record.id}</div>
                    <div className="text-green-400">{record.content}</div>
                    <div className="text-blue-400">
                      {JSON.stringify(record.metadata)}
                    </div>
                    <div className="text-purple-400">
                      [{record.vector.join(", ")}]
                    </div>
                  </div>
                ))}
              </div>

              {/* Связи между данными */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full">
                  {[0, 1].map((i) => (
                    <g key={i} className="animate-draw" style={{ animationDelay: `${4 + i * 0.5}s` }}>
                      <path
                        d={`M 100 ${150 + i * 60} L 300 ${150 + i * 60}`}
                        stroke="rgba(34,139,217,0.3)"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle
                        cx="100"
                        cy={150 + i * 60}
                        r="4"
                        fill="rgb(34,139,217)"
                      />
                      <circle
                        cx="300"
                        cy={150 + i * 60}
                        r="4"
                        fill="rgb(34,139,217)"
                      />
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes draw {
          from {
            stroke-dashoffset: 100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .animate-draw path {
          stroke-dasharray: 100;
          animation: draw 1s ease-out forwards;
        }

        .grid-cols-16 {
          grid-template-columns: repeat(16, minmax(0, 1fr));
        }
      `}</style>
    </Slide>
  );
};
