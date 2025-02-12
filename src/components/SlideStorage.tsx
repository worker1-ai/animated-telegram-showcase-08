
import { Slide } from "./Slide";
import { Database } from "lucide-react";

// Типы данных для визуализации
const DATA_TYPES = [
  { type: "text", color: "rgb(74, 222, 128)", examples: ["Лекция", "Семинар"] },
  { type: "datetime", color: "rgb(96, 165, 250)", examples: ["14:30", "2024-03-15"] },
  { type: "vector", color: "rgb(192, 132, 252)", examples: ["[0.23, 0.45, 0.89]"] },
  { type: "category", color: "rgb(251, 146, 60)", examples: ["Расписание", "Новости"] }
];

// Примеры данных
const EXAMPLE_DATA = [
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
  },
  {
    id: "3",
    content: "Семинар по Big Data",
    metadata: { type: "schedule", time: "16:00" },
    vector: [0.56, 0.67, 0.23]
  },
  {
    id: "4",
    content: "День открытых дверей",
    metadata: { type: "event", date: "2024-04-01" },
    vector: [0.91, 0.33, 0.45]
  },
  {
    id: "5",
    content: "Защита дипломов",
    metadata: { type: "schedule", time: "10:00" },
    vector: [0.44, 0.88, 0.12]
  }
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
              className="relative w-full max-w-2xl bg-white/5 rounded-lg p-6 backdrop-blur-sm animate-fade-in overflow-auto max-h-[300px]"
              style={{ animationDelay: "2s" }}
            >
              <div className="absolute -top-3 -right-3">
                <Database className="w-6 h-6 text-telegram-primary" />
              </div>

              {/* Таблица с данными */}
              <div className="space-y-4">
                {/* Заголовки колонок */}
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-400 sticky top-0 bg-gray-900/90 p-2 rounded">
                  <div>ID</div>
                  <div>Content</div>
                  <div className="truncate">Metadata</div>
                  <div>Vector</div>
                </div>

                {/* Записи */}
                {EXAMPLE_DATA.map((record, index) => (
                  <div 
                    key={index}
                    className="grid grid-cols-4 gap-4 text-sm bg-white/5 p-3 rounded animate-fade-in"
                    style={{ animationDelay: `${3 + index * 0.5}s` }}
                  >
                    <div className="text-gray-500">{record.id}</div>
                    <div className="text-green-400 truncate" title={record.content}>
                      {record.content}
                    </div>
                    <div 
                      className="text-blue-400 truncate" 
                      title={JSON.stringify(record.metadata)}
                    >
                      {JSON.stringify(record.metadata)}
                    </div>
                    <div 
                      className="text-purple-400 truncate" 
                      title={`[${record.vector.join(", ")}]`}
                    >
                      [{record.vector.join(", ")}]
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .grid-cols-16 {
          grid-template-columns: repeat(16, minmax(0, 1fr));
        }
      `}</style>
    </Slide>
  );
};
