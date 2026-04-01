"use client"

import { BarChart2 } from "lucide-react"
import { useUserStore } from "@/stores/user-store"
import { useQuizStore } from "@/stores/quiz-store"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const { profile } = useUserStore()
  const startQuiz = useQuizStore(state => state.startQuiz)

  const handleStartPractice = () => {
    startQuiz("quiz-logic-01")
    router.push("/quiz/session")
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Header Row (Mobile menu + User Stats header) */}
      <div className="flex justify-between items-center bg-white rounded-full px-6 py-3 shadow-sm border border-slate-100">
        <div className="font-semibold text-slate-700 md:hidden">KampusQuest</div>
        <div className="hidden md:block text-slate-500">Welcome to your dashboard</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-1.5 rounded-full font-semibold text-sm">
            <span>⚡</span>
            <span>{profile.streak} Day Streak</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 text-kampus-blue px-4 py-1.5 rounded-full font-semibold text-sm">
            <span>🏆</span>
            <span>Level {profile.level}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm shrink-0">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.avatar}&backgroundColor=b6e3f4`} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-kampus-blue to-blue-400 rounded-[2rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-kampus-blueDark opacity-20 rounded-full translate-y-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="space-y-4 max-w-xl">
            <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-semibold tracking-wide border border-white/20 uppercase text-blue-50">
              Your Progress
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">Welcome back,<br/>{profile.name.split(' ')[0]}!</h2>
            <p className="text-blue-50 text-lg leading-relaxed max-w-md">
              You&apos;re doing amazing! You&apos;ve earned <span className="font-bold text-white">{profile.totalXp.toLocaleString()} XP</span> this week and you&apos;re currently <span className="font-bold text-white">Rank #42</span> in the National League. Keep it up!
            </p>
            <div className="flex gap-4 pt-4">
              <button 
                onClick={handleStartPractice}
                className="bg-kampus-yellow hover:bg-yellow-300 text-yellow-900 font-bold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Mulai Latihan Hari Ini
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold py-3 px-8 rounded-full transition-colors backdrop-blur-sm">
                View Analytics
              </button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            {/* Rank Card Visualization */}
            <div className="bg-gradient-to-b from-blue-300/30 to-blue-500/30 backdrop-blur-xl border border-white/20 rounded-3xl p-6 w-64 shadow-2xl rotate-2 hover:rotate-0 transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <div className="text-kampus-yellow text-2xl">🥇</div>
                <div className="bg-kampus-blueDark/40 text-xs font-bold px-3 py-1 rounded-full">ELITE TIER</div>
              </div>
              <div className="text-sm font-medium text-blue-100 mb-1">Current League</div>
              <div className="text-2xl font-bold mb-8">Grandmaster</div>
              
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-kampus-yellow h-2 rounded-full w-[85%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Stats */}
        <div className="space-y-6">
          <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
            <BarChart2 className="text-kampus-blue" />
            Weekly Stats
          </h3>
          
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-50 text-kampus-blue rounded-full flex items-center justify-center text-xl shrink-0">📝</div>
            <div>
              <div className="text-sm font-medium text-slate-500">Questions Solved</div>
              <div className="text-3xl font-bold text-slate-800">{profile.questionsSolved}</div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-orange-50 text-kampus-orange rounded-full flex items-center justify-center text-xl shrink-0">⏱️</div>
            <div>
              <div className="text-sm font-medium text-slate-500">Avg. Speed</div>
              <div className="text-3xl font-bold text-slate-800">{profile.avgSpeed}s <span className="text-base font-medium text-slate-400">/ q</span></div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-emerald-50 text-kampus-emerald rounded-full flex items-center justify-center text-xl pl-1 shrink-0">🎯</div>
            <div>
              <div className="text-sm font-medium text-slate-500">Accuracy Rate</div>
              <div className="text-3xl font-bold text-slate-800">{profile.accuracyRate}%</div>
            </div>
          </div>

          {/* Recommended Card */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-indigo-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -translate-y-1/2 translate-x-1/3 transition-transform group-hover:scale-150 duration-500"></div>
            <div className="relative z-10">
              <div className="text-xs font-bold tracking-wider text-purple-500 uppercase mb-4">Recommended</div>
              <h4 className="font-bold text-lg text-slate-800 mb-2">Penalaran Umum - Level 5</h4>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-6">
                <span>⭐</span> +250 XP Reward
              </div>
              <button 
                onClick={handleStartPractice}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-2xl transition-colors"
              >
                Attempt Now
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Leaderboard */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
              <span className="text-kampus-yellow">📊</span>
              Weekly Leaderboard
            </h3>
            <div className="bg-slate-100 rounded-full p-1 flex">
              <button className="px-4 py-1.5 bg-kampus-blue text-white rounded-full text-sm font-semibold shadow-sm">National</button>
              <button className="px-4 py-1.5 text-slate-500 hover:text-slate-700 rounded-full text-sm font-medium transition-colors">Regional</button>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-2">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-100 text-xs font-bold text-slate-400 tracking-wider">
              <div className="col-span-2 sm:col-span-1">RANK</div>
              <div className="col-span-7 sm:col-span-8">STUDENT</div>
              <div className="col-span-3 text-right">POINTS / XP</div>
            </div>
            
            <div className="p-2 space-y-1">
              {/* Rank 1 */}
              <div className="grid grid-cols-12 gap-4 items-center px-4 py-3 bg-yellow-50/50 rounded-2xl border border-yellow-100/50">
                <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-kampus-yellow text-white font-bold flex items-center justify-center shadow-sm relative">
                    1
                    <span className="absolute -top-1 -right-2 text-lg">👑</span>
                  </div>
                </div>
                <div className="col-span-7 sm:col-span-8 flex items-center gap-4">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Annie&backgroundColor=fcd34d" alt="Anisa" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                  <div>
                    <div className="font-bold text-slate-800">Anisa Rahma</div>
                    <div className="text-xs text-slate-500">Mastery Level: 92%</div>
                  </div>
                </div>
                <div className="col-span-3 text-right">
                  <div className="font-bold text-kampus-blue text-lg">24,500 XP</div>
                  <div className="text-xs font-bold text-emerald-500">↗ +12%</div>
                </div>
              </div>

              {/* Rank 2 */}
              <div className="grid grid-cols-12 gap-4 items-center px-4 py-3 hover:bg-slate-50 rounded-2xl transition-colors">
                <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center shadow-inner">2</div>
                </div>
                <div className="col-span-7 sm:col-span-8 flex items-center gap-4">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Budi&backgroundColor=e2e8f0" alt="Budi" className="w-12 h-12 rounded-full border border-slate-200" />
                  <div>
                    <div className="font-bold text-slate-800">Budi Santoso</div>
                    <div className="text-xs text-slate-500">Mastery Level: 88%</div>
                  </div>
                </div>
                <div className="col-span-3 text-right">
                  <div className="font-bold text-slate-700">23,100 XP</div>
                  <div className="text-xs font-bold text-emerald-500">↗ +5%</div>
                </div>
              </div>

              {/* Rank 3 */}
              <div className="grid grid-cols-12 gap-4 items-center px-4 py-3 hover:bg-slate-50 rounded-2xl transition-colors">
                <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#CD7F32]/20 text-[#CD7F32] font-bold flex items-center justify-center shadow-inner">3</div>
                </div>
                <div className="col-span-7 sm:col-span-8 flex items-center gap-4">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Citra&backgroundColor=fed7aa" alt="Citra" className="w-12 h-12 rounded-full border border-slate-200" />
                  <div>
                    <div className="font-bold text-slate-800">Citra Dewi</div>
                    <div className="text-xs text-slate-500">Mastery Level: 85%</div>
                  </div>
                </div>
                <div className="col-span-3 text-right">
                  <div className="font-bold text-slate-700">22,850 XP</div>
                  <div className="text-xs font-bold text-rose-500">↘ -2%</div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 mt-2">
              <button 
                onClick={() => router.push('/leaderboard')}
                className="w-full py-2 flex items-center justify-center gap-2 text-kampus-blue font-bold hover:bg-blue-50 rounded-xl transition-colors"
              >
                View Full Leaderboard <span>→</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
