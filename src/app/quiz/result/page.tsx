"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useQuizStore } from "@/stores/quiz-store"
import { useUserStore } from "@/stores/user-store"

export default function ResultPage() {
  const router = useRouter()
  const { currentQuiz, answers, isCompleted, timeSpent, resetQuiz } = useQuizStore()
  const { addXp, updateStats, incrementStreak } = useUserStore()
  
  const [hasRewarded, setHasRewarded] = useState(false)

  useEffect(() => {
    if (!currentQuiz || !isCompleted) {
      router.push("/")
    }
  }, [currentQuiz, isCompleted, router])

  const stats = useMemo(() => {
    if (!currentQuiz) return { correct: 0, wrong: 0, score: 0, xp: 0 }
    
    let correct = 0
    let wrong = 0
    
    currentQuiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++
      } else {
        wrong++
      }
    })
    
    return {
      correct,
      wrong,
      score: correct,
      xp: correct * 50 + 200 // 50 per correct + 200 completion bonus
    }
  }, [currentQuiz, answers])

  useEffect(() => {
    // Give rewards only once when viewing the completed result
    if (isCompleted && !hasRewarded && currentQuiz) {
      addXp(stats.xp)
      updateStats(currentQuiz.questions.length, stats.correct, 18) // Fake speed 18s
      
      // If perfect score, increment streak
      if (stats.wrong === 0) {
        incrementStreak()
      }
      setHasRewarded(true)
    }
  }, [isCompleted, hasRewarded, currentQuiz, stats, addXp, updateStats, incrementStreak])

  if (!currentQuiz || !isCompleted) return null

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handleFinish = () => {
    resetQuiz()
    router.push('/')
  }

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in slide-in-from-bottom-8 duration-700">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-500 via-kampus-blue to-emerald-400 rounded-[2.5rem] p-8 md:p-12 mb-8 text-white relative overflow-hidden shadow-xl text-center">
        <div className="absolute top-4 right-10 text-white/30 text-8xl">✨</div>
        <div className="absolute bottom-4 left-10 text-white/20 text-6xl">🌟</div>
        
        <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">
          {stats.wrong === 0 ? "Sempurna!" : stats.correct > currentQuiz.questions.length / 2 ? "Keren Banget!" : "Tetap Semangat!"}
        </h1>
        <p className="text-blue-100 text-lg mb-10 font-medium tracking-wide">You completed this session. Let&apos;s look at the stats!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:-translate-y-1 transition-transform">
            <div className="text-xs font-bold tracking-widest text-blue-100 mb-2 uppercase">Score</div>
            <div className="text-4xl font-bold">{stats.score} <span className="text-2xl text-blue-200">/ {currentQuiz.questions.length}</span></div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:-translate-y-1 transition-transform">
            <div className="text-xs font-bold tracking-widest text-blue-100 mb-2 uppercase">XP Gained</div>
            <div className="text-4xl font-bold flex items-center justify-center gap-2">
              <span className="text-kampus-yellow">⚡</span> {stats.xp}
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:-translate-y-1 transition-transform">
            <div className="text-xs font-bold tracking-widest text-blue-100 mb-2 uppercase">Time Spent</div>
            <div className="text-4xl font-bold flex items-center justify-center gap-2">
              <span className="text-slate-100 opacity-80">⏱</span> {formatTime(timeSpent)}
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Streak Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Weekly Progress</h3>
          <p className="text-slate-500 text-sm mb-6">You&apos;ve answered questions actively this week!</p>
          <div className="flex items-end gap-3 h-24">
            <div className="bg-blue-100 w-full h-[40%] rounded-t-xl hover:bg-blue-200 transition-colors"></div>
            <div className="bg-blue-200 w-full h-[60%] rounded-t-xl hover:bg-blue-300 transition-colors"></div>
            <div className="bg-blue-100 w-full h-[30%] rounded-t-xl hover:bg-blue-200 transition-colors"></div>
            <div className="bg-blue-300 w-full h-[80%] rounded-t-xl hover:bg-blue-400 transition-colors"></div>
            <div className="bg-blue-200 w-full h-[50%] rounded-t-xl hover:bg-blue-300 transition-colors"></div>
            <div className="bg-kampus-blue w-full h-[100%] rounded-t-xl shadow-md cursor-pointer hover:-translate-y-1 transition-transform"></div>
          </div>
        </div>

        {stats.wrong === 0 ? (
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-8 text-white shadow-md flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 text-3xl shrink-0 border border-white/30">
              🔥
            </div>
            <h3 className="font-bold text-2xl mb-2 tracking-wide">Flawless Victory</h3>
            <p className="text-indigo-100 text-sm max-w-[250px] leading-relaxed">You answered perfectly and your streak has increased!</p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-[2rem] p-8 text-slate-600 shadow-inner flex flex-col items-center justify-center text-center border border-slate-300">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-3xl shrink-0 shadow-sm">
              🧠
            </div>
            <h3 className="font-bold text-2xl mb-2 text-slate-700">Almost There</h3>
            <p className="text-slate-500 text-sm max-w-[250px] leading-relaxed">Review your mistakes below. A perfect score will grant you streak multipliers!</p>
          </div>
        )}
      </div>

      {/* Review Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Review Jawaban</h2>
          <div className="flex gap-2 text-sm font-bold">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">{stats.correct} Benar</span>
            <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full">{stats.wrong} Salah</span>
          </div>
        </div>

        <div className="space-y-4">
          {currentQuiz.questions.map((item, index) => {
            const selected = answers[item.id]
            const isCorrect = selected === item.correctAnswer
            
            return (
              <div 
                key={item.id} 
                className={cn(
                  "bg-white rounded-[2rem] p-6 shadow-sm border-2 overflow-hidden relative",
                  isCorrect ? "border-emerald-100 border-l-8 border-l-emerald-400" : "border-rose-100 border-l-8 border-l-rose-400"
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-xs font-bold text-slate-400 tracking-wider">QUESTION 0{index + 1} — {item.topic}</div>
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-white",
                    isCorrect ? "bg-emerald-500" : "bg-rose-500"
                  )}>
                    {isCorrect ? "✓" : "×"}
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-slate-800 mb-6">{item.question}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.options.filter(o => o.id === selected || o.id === item.correctAnswer).map(opt => {
                    const isTheSelectedAnswer = opt.id === selected
                    const isTheCorrectAnswer = opt.id === item.correctAnswer
                    
                    let cardClass = "bg-slate-50 border-slate-200 text-slate-500"
                    let badgeClass = ""
                    let badgeText = ""

                    if (isTheCorrectAnswer && isTheSelectedAnswer) {
                      cardClass = "bg-emerald-50 border-emerald-200 text-emerald-800 font-bold"
                      badgeClass = "text-emerald-500 font-bold ml-auto"
                      badgeText = "Jawabanmu (Benar)"
                    } else if (isTheSelectedAnswer && !isTheCorrectAnswer) {
                      cardClass = "bg-rose-50 border-rose-200 text-rose-800 font-bold"
                      badgeClass = "text-rose-500 font-bold ml-auto"
                      badgeText = "Jawabanmu (Salah)"
                    } else if (isTheCorrectAnswer && !isTheSelectedAnswer) {
                      cardClass = "bg-emerald-50/50 border-emerald-200 border-dashed text-emerald-700 font-bold"
                      badgeClass = "text-emerald-500 font-bold ml-auto"
                      badgeText = "Jawaban Benar"
                    }

                    return (
                      <div key={opt.id} className={cn("p-4 rounded-2xl border flex items-center gap-4", cardClass)}>
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white",
                          isTheCorrectAnswer && isTheSelectedAnswer ? "bg-emerald-500" : 
                          isTheSelectedAnswer && !isTheCorrectAnswer ? "bg-rose-500" : 
                          isTheCorrectAnswer && !isTheSelectedAnswer ? "bg-emerald-400" : "bg-slate-300"
                        )}>
                          {opt.id}
                        </div>
                        <span className="text-sm">{opt.text}</span>
                        {badgeText && <span className={cn("text-xs uppercase tracking-wider", badgeClass)}>{badgeText}</span>}
                      </div>
                    )
                  })}
                </div>

                {!isCorrect && item.explanation && (
                  <div className="mt-6 bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
                    <div className="text-xs font-bold text-kampus-blue mb-1">Penjelasan Quick:</div>
                    <div className="text-sm text-slate-600 leading-relaxed">{item.explanation}</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Footer sticky buttons */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 z-10">
        <div className="max-w-4xl mx-auto flex justify-center gap-4">
          <button 
            onClick={() => {
              resetQuiz()
              router.push('/quiz/session') // Reset and restart if they had a quiz selected, but practically they should start over from dashboard
            }}
            className="bg-kampus-yellow hover:bg-yellow-400 text-yellow-900 font-bold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>↺</span> Ulangi Kuis
          </button>
          <button 
            onClick={handleFinish}
            className="bg-kampus-blue hover:bg-kampus-blueDark text-white font-bold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Lanjut Belajar
          </button>
        </div>
      </div>
      
      {/* Add bottom padding to account for fixed bar */}
      <div className="h-20"></div>

    </div>
  )
}
