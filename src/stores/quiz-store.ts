import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Quiz, Question, sampleQuizArray } from '@/lib/data/mock-questions'

interface QuizState {
  currentQuiz: Quiz | null
  currentIndex: number
  answers: Record<number, string> // questionId -> optionId
  isCompleted: boolean
  startTime: number | null
  timeSpent: number // seconds
  
  // Actions
  startQuiz: (quizId: string) => void
  answerQuestion: (questionId: number, optionId: string) => void
  nextQuestion: () => void
  prevQuestion: () => void
  submitQuiz: () => void
  resetQuiz: () => void
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      currentQuiz: null,
      currentIndex: 0,
      answers: {},
      isCompleted: false,
      startTime: null,
      timeSpent: 0,

      startQuiz: (quizId) => {
        const quiz = sampleQuizArray.find(q => q.id === quizId)
        if (quiz) {
          set({
            currentQuiz: quiz,
            currentIndex: 0,
            answers: {},
            isCompleted: false,
            startTime: Date.now(),
            timeSpent: 0,
          })
        }
      },

      answerQuestion: (questionId, optionId) => {
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: optionId
          }
        }))
      },

      nextQuestion: () => {
        const { currentIndex, currentQuiz } = get()
        if (currentQuiz && currentIndex < currentQuiz.questions.length - 1) {
          set({ currentIndex: currentIndex + 1 })
        }
      },

      prevQuestion: () => {
        const { currentIndex } = get()
        if (currentIndex > 0) {
          set({ currentIndex: currentIndex - 1 })
        }
      },

      submitQuiz: () => {
        const { startTime } = get()
        const spent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0
        set({ isCompleted: true, timeSpent: spent })
      },

      resetQuiz: () => {
        set({
          currentQuiz: null,
          currentIndex: 0,
          answers: {},
          isCompleted: false,
          startTime: null,
          timeSpent: 0,
        })
      }
    }),
    {
      name: 'kampusquest-quiz-storage',
    }
  )
)
