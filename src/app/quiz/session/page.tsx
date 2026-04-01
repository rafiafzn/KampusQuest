"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useQuizStore } from "@/stores/quiz-store"

export default function QuizSessionPage() {
  const router = useRouter()
  const { 
    currentQuiz, 
    currentIndex, 
    answers, 
    answerQuestion, 
    nextQuestion, 
    prevQuestion, 
    submitQuiz 
  } = useQuizStore()

  useEffect(() => {
    if (!currentQuiz) {
      router.push('/') // Redirect home if no active quiz
    }
  }, [currentQuiz, router])

  if (!currentQuiz) return null

  const currentQuestion = currentQuiz.questions[currentIndex]
  const selectedOption = answers[currentQuestion.id] || null
  const progressPercent = ((currentIndex) / currentQuiz.questions.length) * 100

  const handleNextOrSubmit = () => {
    if (currentIndex === currentQuiz.questions.length - 1) {
      if (!selectedOption) {
        alert("Pilih jawaban dulu ya!")
        return
      }
      submitQuiz()
      router.push("/quiz/result")
    } else {
      nextQuestion()
    }
  }

  return (
    <div className="max-w-4xl mx-auto min-h-[85vh] flex flex-col pt-8 animate-in fade-in slide-in-from-right-8 duration-500">
      
      {/* Header section with top nav equivalents */}
      <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
        <div>
          <div className="text-xs font-bold text-kampus-blue tracking-widest uppercase mb-1">Practice Session</div>
          <h2 className="text-4xl font-bold text-slate-800">Question {String(currentIndex + 1).padStart(2, '0')}<span className="text-slate-400 text-2xl">/{currentQuiz.questions.length}</span></h2>
        </div>
        <div className="bg-kampus-yellow text-yellow-900 px-6 py-2 rounded-full font-bold shadow-sm flex items-center gap-2">
          <span>⚡</span> 2.5x Multiplier active
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-slate-200 rounded-full mb-12 overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-kampus-blue to-cyan-400 rounded-full relative transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute top-0 right-0 bottom-0 w-12 bg-white/20 skew-x-[45deg] animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-lg border border-slate-100 flex-1 relative mb-8">
        <div className={cn("inline-flex items-center gap-2 border px-4 py-2 rounded-2xl mb-8", currentQuiz.subjectInfo.color, currentQuiz.subjectInfo.color.replace('text-', 'border-').replace('bg-', 'border-').replace('100', '200'))}>
          <div className="w-8 h-8 rounded-xl bg-white/50 font-bold flex items-center justify-center">{currentQuiz.subjectInfo.icon}</div>
          <span className="font-semibold">{currentQuiz.subjectInfo.label}</span>
        </div>

        <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">{currentQuestion.subject} - {currentQuestion.topic}</div>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight mb-12">
          {currentQuestion.question}
        </h3>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedOption === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => answerQuestion(currentQuestion.id, opt.id)}
                className={cn(
                  "p-6 rounded-[2rem] border-2 flex items-center gap-6 text-left transition-all duration-300 transform outline-none",
                  isSelected 
                    ? "border-kampus-blue bg-blue-50/50 shadow-md scale-[1.02]" 
                    : "border-slate-100 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0 transition-colors",
                  isSelected ? "bg-kampus-blue text-white" : "bg-slate-100 text-slate-500"
                )}>
                  {opt.id}
                </div>
                <div className={cn(
                  "text-xl font-semibold w-full",
                  isSelected ? "text-kampus-blueDark" : "text-slate-700"
                )}>
                  {opt.text}
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-kampus-blue text-white font-bold flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between items-center px-4 pb-8">
        <div>
          {currentIndex > 0 ? (
            <button 
              onClick={prevQuestion}
              className="flex items-center gap-2 text-slate-500 font-bold px-6 py-3 rounded-full hover:bg-slate-100 transition-colors"
            >
              <span>←</span> Prev
            </button>
          ) : (
            <button className="flex items-center gap-2 bg-kampus-yellow text-yellow-900 font-bold px-6 py-3 rounded-full hover:bg-yellow-400 transition-colors shadow-sm">
              <span>💡</span> HINT (15 Energy)
            </button>
          )}
        </div>
        <button 
          onClick={handleNextOrSubmit}
          className="bg-kampus-blue hover:bg-kampus-blueDark text-white font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          {currentIndex === currentQuiz.questions.length - 1 ? "CONFIRM & SUBMIT" : "NEXT QUESTION"}
        </button>
      </div>

    </div>
  )
}
