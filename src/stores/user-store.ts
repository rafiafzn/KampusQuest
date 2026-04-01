import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createClient } from '@/lib/supabase/client'

interface UserProfile {
  id?: string
  name: string
  avatar: string
  title: string
  level: number
  totalXp: number
  streak: number
  questionsSolved: number
  accuracyRate: number
  avgSpeed: number
}

interface UserState {
  profile: UserProfile
  isGuest: boolean
  
  // Actions
  setProfile: (profile: UserProfile | null) => void
  fetchProfile: (userId: string) => Promise<void>
  addXp: (amount: number) => Promise<void>
  updateStats: (questions: number, correct: number, speed: number) => Promise<void>
  incrementStreak: () => Promise<void>
  signOut: () => void
}

const guestProfile: UserProfile = {
  name: "Guest Player",
  avatar: "Guest",
  title: "Pelajar (Local)",
  level: 1,
  totalXp: 0,
  streak: 0,
  questionsSolved: 0,
  accuracyRate: 0,
  avgSpeed: 0
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: guestProfile,
      isGuest: true,

      setProfile: (profile) => set({ profile: profile || guestProfile, isGuest: profile ? false : true }),
      
      signOut: () => set({ profile: guestProfile, isGuest: true }),

      fetchProfile: async (userId: string) => {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()
        
        if (data) {
          set({ 
            profile: {
              id: data.id,
              name: data.name,
              avatar: data.avatar || "Ariel",
              title: data.title || "Pelajar",
              level: data.level || 1,
              totalXp: data.total_xp || 0,
              streak: data.streak || 0,
              questionsSolved: data.questions_solved || 0,
              accuracyRate: data.accuracy_rate || 0,
              avgSpeed: data.avg_speed || 0
            },
            isGuest: false
          })
        }
      },

      addXp: async (amount) => {
        const state = get()
        if (!state.profile) return
        
        const newXp = state.profile.totalXp + amount
        const newLevel = Math.floor(newXp / 100) + 1
        
        const updatedProfile = {
          ...state.profile,
          totalXp: newXp,
          level: newLevel
        }
        
        set({ profile: updatedProfile })

        if (!state.isGuest && state.profile.id) {
          const supabase = createClient()
          await supabase
            .from('profiles')
            .update({ total_xp: newXp, level: newLevel })
            .eq('id', state.profile.id)
        }
      },

      updateStats: async (questions, correctPos, speed) => {
        const state = get()
        if (!state.profile) return
        
        const solved = state.profile.questionsSolved + questions
        const currentCorrect = (state.profile.accuracyRate / 100) * state.profile.questionsSolved
        const newAccuracy = solved > 0 ? ((currentCorrect + correctPos) / solved) * 100 : 0
        
        const updatedProfile = {
          ...state.profile,
          questionsSolved: solved,
          accuracyRate: Number(newAccuracy.toFixed(1)),
          avgSpeed: speed
        }
        
        set({ profile: updatedProfile })

        if (!state.isGuest && state.profile.id) {
          const supabase = createClient()
          await supabase
            .from('profiles')
            .update({ 
              questions_solved: solved,
              accuracy_rate: updatedProfile.accuracyRate,
              avg_speed: speed
            })
            .eq('id', state.profile.id)
        }
      },

      incrementStreak: async () => {
        const state = get()
        if (!state.profile) return
        
        const newStreak = state.profile.streak + 1
        
        const updatedProfile = {
          ...state.profile,
          streak: newStreak
        }
        
        set({ profile: updatedProfile })

        if (!state.isGuest && state.profile.id) {
          const supabase = createClient()
          await supabase
            .from('profiles')
            .update({ streak: newStreak })
            .eq('id', state.profile.id)
        }
      }
    }),
    {
      name: 'kampusquest-user-storage' // Persist for offline/guest
    }
  )
)
