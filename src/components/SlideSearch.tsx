import { Slide } from "./Slide";
import { Search, MessageCircle, Binary, Sparkles, History, MoveUpRight, FileText } from "lucide-react";

export const SlideSearch = ({ active }: { active: boolean }) => {
  return (
    <Slide active={active} className="bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex flex-col items-center justify-center h-full text-white">
        <h2
          className="text-3xl font-bold animate-fade-in mb-12"
          style={{ animationDelay: "0.5s" }}
        >
          Гибридный поиск данных (RAG)
        </h2>

        <div className="relative w-[1000px] h-[700px]">
          {/* Шаг 1: Пользовательский запрос (0-4 сек) */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 z-50 animate-fade-in"
            style={{ animationDelay: "0s" }}
          >
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm w-[500px]">
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

          {/* Шаг 2: Параллельная обработка (4-8 сек) */}
          <div 
            className="absolute top-32 left-8 flex flex-col gap-4 z-40 animate-fade-in"
            style={{ animationDelay: "4s" }}
          >
            {/* Векторный поиск */}
            <div className="space-y-4 bg-white/5 p-6 rounded-lg w-[320px]">
              <div className="flex items-center gap-2 text-telegram-primary font-medium">
                <Binary className="w-5 h-5" />
                <span>Векторный поиск</span>
              </div>
              <div className="space-y-3">
                {['лекция', 'AI', 'время', 'следующая'].map((word, i) => (
                  <div
                    key={word}
                    className="text-sm px-3 py-2 bg-white/10 rounded animate-slide-up"
                    style={{ animationDelay: `${4.5 + i * 0.5}s` }}
                  >
                    <div className="text-gray-400 mb-1">Токен: "{word}"</div>
                    <div className="text-telegram-primary">
                      [{Array.from({length: 3}, () => (Math.random() * 1).toFixed(2)).join(", ")}]
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Поиск по ключевым словам */}
            <div className="space-y-4 bg-white/5 p-6 rounded-lg w-[320px]">
              <div className="flex items-center gap-2 text-green-400 font-medium">
                <Search className="w-5 h-5" />
                <span>Ключевые слова</span>
              </div>
              <div className="space-y-3">
                {['следующая', 'лекция', 'AI', 'когда'].map((word, i) => (
                  <div
                    key={word}
                    className="text-sm px-3 py-2 bg-white/10 rounded animate-slide-up"
                    style={{ animationDelay: `${4.5 + i * 0.5}s` }}
                  >
                    <div className="text-gray-400 mb-1">Слово: "{word}"</div>
                    <div className="text-green-400">
                      Совпадение: {Math.floor(Math.random() * 30 + 70)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Шаг 3: Поиск в базе данных (8-12 сек) */}
          <div 
            className="absolute top-32 right-8 z-30 animate-fade-in"
            style={{ animationDelay: "8s" }}
          >
            <div className="relative bg-white/5 p-6 rounded-lg w-[600px]">
              <div className="absolute -top-3 -right-3">
                <History className="w-6 h-6 text-telegram-primary animate-spin-slow" />
              </div>
              <div className="space-y-4">
                <div className="text-sm text-gray-400">Поиск по базе данных...</div>
                <div className="space-y-3">
                  {[
                    { score: 0.92, text: "Лекция по AI, аудитория 312", time: "Завтра, 14:30", details: "Основы машинного обучения" },
                    { score: 0.85, text: "Семинар по AI и ML", time: "Пятница, 16:00", details: "Практическое занятие" },
                    { score: 0.78, text: "Курс лекций по AI", time: "Каждый вторник", details: "Теория нейронных сетей" }
                  ].map((result, i) => (
                    <div 
                      key={i}
                      className={`p-4 rounded bg-white/10 animate-slide-up ${
                        i === 0 ? 'border border-telegram-primary' : ''
                      }`}
                      style={{ animationDelay: `${9 + i * 1}s` }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-gray-400 mt-1" />
                          <div>
                            <div className="text-sm font-medium">{result.text}</div>
                            <div className="text-xs text-gray-400 mt-1">{result.time}</div>
                            <div className="text-xs text-gray-500 mt-1">{result.details}</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-xs text-telegram-primary font-medium">
                            {(result.score * 100).toFixed(0)}% релевантность
                          </div>
                          <div className="mt-2 w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-telegram-primary rounded-full animate-width"
                              style={{ 
                                width: `${result.score * 100}%`,
                                animationDelay: `${9.2 + i * 1}s`
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Шаг 4: Генерация ответа (12-16 сек) */}
          <div 
            className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 animate-fade-in"
            style={{ animationDelay: "12s" }}
          >
            <div className="relative max-w-2xl w-full">
              <div className="absolute -top-16 left-0 right-0 flex justify-between text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <Binary className="w-4 h-4" />
                  <span>Векторное сходство: 92%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  <span>Ключевые слова: 4/4</span>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-telegram-primary" />
                  <span className="text-lg font-medium">Генерация ответа</span>
                </div>
                <p className="text-lg leading-relaxed animate-typing-slow">
                  Следующая лекция по AI состоится завтра в 14:30 в аудитории 312. Тема лекции: Основы машинного обучения.
                </p>
              </div>
            </div>
          </div>

          {/* Финальный шаг: Результат (16-20 сек) */}
          <div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 animate-fade-in"
            style={{ animationDelay: "16s" }}
          >
            <div className="flex items-center gap-2 text-sm text-telegram-primary">
              <MoveUpRight className="w-4 h-4" />
              <span>Ответ сгенерирован за 1.2 секунды</span>
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
          animation: typing 2s steps(50);
        }

        .animate-typing-slow {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 3s steps(75);
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
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
          animation: slide-up 0.5s ease-out forwards;
        }

        @keyframes width-animation {
          from { width: 0% }
          to { width: var(--target-width) }
        }

        .animate-width {
          animation: width-animation 1s ease-out forwards;
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
