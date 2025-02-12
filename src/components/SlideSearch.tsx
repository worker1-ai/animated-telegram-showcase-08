
import { Slide } from "./Slide";
import { Search, MessageCircle, Binary, Sparkles, History, MoveUpRight, FileText, ArrowRight } from "lucide-react";

export const SlideSearch = ({ active }: { active: boolean }) => {
  return (
    <Slide active={active} className="bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex flex-col items-center justify-center h-full text-white space-y-8">
        {/* Заголовок */}
        <h2
          className="text-3xl font-bold animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          Гибридный поиск данных (RAG)
        </h2>

        {/* Основной контейнер */}
        <div className="relative w-[800px] h-[500px]">
          {/* Шаг 1: Пользовательский запрос (0-3 сек) */}
          <div 
            className="absolute inset-0 flex items-start justify-center pt-12 animate-fade-in"
            style={{ animationDelay: "0s" }}
          >
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm max-w-2xl w-full">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-telegram-primary" />
                <div className="flex-1">
                  <div className="typing-effect">
                    Когда будет следующая лекция по AI?
                    <span className="cursor">|</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Шаг 2: Параллельная обработка (3-6 сек) */}
          <div 
            className="absolute inset-0 flex items-center justify-center gap-16 animate-fade-in"
            style={{ animationDelay: "3s" }}
          >
            {/* Векторный поиск */}
            <div className="space-y-4 bg-white/5 p-6 rounded-lg">
              <div className="flex items-center gap-2 text-telegram-primary font-medium">
                <Binary className="w-5 h-5" />
                <span>Векторный поиск</span>
              </div>
              <div className="space-y-2">
                {['лекция', 'AI', 'время'].map((word, i) => (
                  <div
                    key={word}
                    className="text-sm px-3 py-1 bg-white/10 rounded animate-pulse"
                    style={{ animationDelay: `${3.5 + i * 0.2}s` }}
                  >
                    {word} → [0.8, 0.2, 0.6]
                  </div>
                ))}
              </div>
            </div>

            {/* Поиск по ключевым словам */}
            <div className="space-y-4 bg-white/5 p-6 rounded-lg">
              <div className="flex items-center gap-2 text-green-400 font-medium">
                <Search className="w-5 h-5" />
                <span>Ключевые слова</span>
              </div>
              <div className="space-y-2">
                {['следующая', 'лекция', 'AI'].map((word, i) => (
                  <div
                    key={word}
                    className="text-sm px-3 py-1 bg-white/10 rounded animate-pulse"
                    style={{ animationDelay: `${3.5 + i * 0.2}s` }}
                  >
                    match: "{word}"
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Шаг 3: Поиск в базе данных (6-9 сек) */}
          <div 
            className="absolute inset-0 flex items-center justify-center animate-fade-in"
            style={{ animationDelay: "6s" }}
          >
            <div className="relative bg-white/5 p-6 rounded-lg w-[600px]">
              <div className="absolute -top-3 -right-3">
                <History className="w-6 h-6 text-telegram-primary animate-spin-slow" />
              </div>
              <div className="space-y-4">
                <div className="text-sm text-gray-400">Поиск по базе данных...</div>
                {[
                  { score: 0.92, text: "Лекция по AI, аудитория 312", time: "Завтра, 14:30" },
                  { score: 0.85, text: "Семинар по AI и ML", time: "Пятница, 16:00" },
                  { score: 0.78, text: "Курс лекций по AI", time: "Каждый вторник" }
                ].map((result, i) => (
                  <div 
                    key={i}
                    className={`flex items-center justify-between p-3 rounded bg-white/10 animate-fade-in ${
                      i === 0 ? 'border border-telegram-primary' : ''
                    }`}
                    style={{ animationDelay: `${7 + i * 0.5}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="text-sm">{result.text}</div>
                        <div className="text-xs text-gray-400">{result.time}</div>
                      </div>
                    </div>
                    <div className="text-xs text-telegram-primary">
                      {(result.score * 100).toFixed(0)}% match
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Шаг 4: Генерация ответа (9-12 сек) */}
          <div 
            className="absolute inset-0 flex items-center justify-center animate-fade-in"
            style={{ animationDelay: "9s" }}
          >
            <div className="relative max-w-2xl w-full">
              {/* Исходные данные */}
              <div className="absolute -top-20 left-0 right-0 flex justify-between text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <Binary className="w-4 h-4" />
                  <span>Векторное сходство: 92%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  <span>Ключевые слова: 3/3</span>
                </div>
              </div>

              {/* Генерация ответа */}
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-telegram-primary" />
                  <span className="text-lg font-medium">Генерация ответа</span>
                </div>
                <p className="text-lg leading-relaxed animate-typing">
                  Следующая лекция по AI состоится завтра в 14:30 в аудитории 312.
                </p>
              </div>
            </div>
          </div>

          {/* Финальный шаг: Результат (12-15 сек) */}
          <div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-fade-in"
            style={{ animationDelay: "12s" }}
          >
            <div className="flex items-center gap-2 text-sm text-telegram-primary">
              <MoveUpRight className="w-4 h-4" />
              <span>Ответ сгенерирован за 0.8 секунды</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        .animate-typing {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 1s steps(50);
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }

        .cursor {
          animation: blink 1s step-start infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </Slide>
  );
};
