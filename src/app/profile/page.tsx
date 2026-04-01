"use client"

import { cn } from "@/lib/utils"

import { useUserStore } from "@/stores/user-store"

export default function ProfilePage() {
  const { profile } = useUserStore()

  return (
    <div className="max-w-5xl mx-auto pt-6 space-y-8 animate-in slide-in-from-top-6 duration-500">
      
      {/* Top Profile Banner */}
      <div className="bg-gradient-to-br from-kampus-blueDark via-kampus-blue to-cyan-400 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-xl text-white">
        
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-yellow-300/40 via-orange-400/20 to-transparent rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl mix-blend-overlay"></div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          <div className="relative">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.avatar}&backgroundColor=1e293b`} alt={profile.name} className="w-36 h-36 border-4 border-white/50 rounded-full shadow-2xl bg-slate-800" />
            <div className="absolute -bottom-2 -right-2 bg-kampus-yellow w-12 h-12 rounded-full border-4 border-white flex items-center justify-center text-xl shadow-md">
              ⭐
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1 mt-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-white">{profile.name}</h1>
            <p className="text-blue-100 font-medium text-lg mb-6">{profile.title}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 flex items-center gap-3">
                <span className="text-3xl">🔥</span>
                <div>
                  <div className="font-bold text-xl leading-none">{profile.streak} Day</div>
                  <div className="text-[10px] font-bold tracking-widest text-blue-200 mt-1">STREAK</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 flex items-center gap-3">
                <span className="text-3xl text-kampus-yellow">⚡</span>
                <div>
                  <div className="font-bold text-xl leading-none">{profile.totalXp.toLocaleString()}</div>
                  <div className="text-[10px] font-bold tracking-widest text-blue-200 mt-1">TOTAL XP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Calendar/Consistency Card */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-slate-800">Weekly Consistency</h3>
              <div className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full flex items-center gap-1">
                🔥 Keep it up!
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, i) => {
                const dates = [12, 13, 14, 15, 16, 17, 18]
                const date = dates[i]
                const isPast = i < 3
                const isToday = i === 3
                const isFuture = i > 3

                return (
                  <div key={day} className="flex flex-col items-center gap-3">
                    <span className="text-xs font-bold text-slate-400">{day}</span>
                    <div className={cn(
                      "w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-lg font-bold shadow-sm cursor-pointer hover:scale-105 transition-transform relative",
                      isPast ? "bg-kampus-yellow text-yellow-900 border-2 border-yellow-400" :
                      isToday ? "bg-kampus-yellow text-yellow-900 border-2 border-yellow-400 ring-4 ring-yellow-100" :
                      "bg-slate-50 text-slate-300 border border-slate-100"
                    )}>
                      {date}
                      {isToday && <span className="absolute -top-2 -right-2 text-xl drop-shadow-md">🔥</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Subject Proficiency */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-8">Subject Proficiency</h3>
            
            <div className="space-y-6">
              {/* Stat 1 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 font-bold text-slate-700">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-kampus-blue flex items-center justify-center">Σ</div>
                    Quantitative Reasoning
                  </div>
                  <div className="font-bold text-kampus-blue">88%</div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-kampus-blue h-3 rounded-full w-[88%]"></div>
                </div>
              </div>
              
              {/* Stat 2 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 font-bold text-slate-700">
                    <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">📖</div>
                    English Literacy
                  </div>
                  <div className="font-bold text-purple-600">72%</div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-purple-500 h-3 rounded-full w-[72%]"></div>
                </div>
              </div>

              {/* Stat 3 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 font-bold text-slate-700">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-kampus-emerald flex items-center justify-center">💡</div>
                    General Logic
                  </div>
                  <div className="font-bold text-kampus-emerald">94%</div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-kampus-emerald h-3 rounded-full w-[94%] shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* Current Goal */}
          <div className="bg-kampus-blue rounded-[2rem] p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute -right-8 -top-8 text-white/5 text-[150px] font-black">{profile.level}</div>
            <div className="relative z-10">
              <div className="text-xs font-bold tracking-widest text-blue-200 mb-2 uppercase">Current Goal</div>
              <h3 className="text-4xl font-extrabold mb-8 flex items-center gap-3">
                Level {profile.level}
                <div className="w-16 h-16 rounded-full bg-white/20 border-4 border-blue-400 flex items-center justify-center shadow-inner relative">
                  ⭐
                  <div className="absolute -bottom-2 bg-blue-900 text-[10px] px-2 rounded-full font-bold shadow flex">{Math.floor((profile.totalXp % 100) / 100 * 100)}%</div>
                </div>
              </h3>
              
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>{profile.totalXp.toLocaleString()}</span>
                <span className="text-blue-200">{(profile.level * 100).toLocaleString()} XP</span>
              </div>
              <div className="w-full bg-blue-900/50 rounded-full h-3 overflow-hidden shadow-inner">
                <div className="bg-white h-3 rounded-full relative" style={{ width: `${Math.floor((profile.totalXp % 100) / 100 * 100)}%` }}>
                  <div className="absolute top-0 right-0 bottom-0 w-8 bg-blue-100/30 skew-x-[45deg] animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Unlocked Badges</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full bg-kampus-yellow shadow-[0_4px_15px_rgba(251,191,36,0.3)] flex items-center justify-center text-3xl text-yellow-900">
                  🦅
                </div>
                <span className="text-xs font-bold text-slate-600">Early Bird</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full bg-blue-400 shadow-[0_4px_15px_rgba(96,165,250,0.3)] flex items-center justify-center text-3xl text-blue-900">
                  ⚡
                </div>
                <span className="text-xs font-bold text-slate-600">Speed Demon</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full bg-purple-500 shadow-[0_4px_15px_rgba(168,85,247,0.3)] flex items-center justify-center text-3xl text-purple-100">
                  🏅
                </div>
                <span className="text-xs font-bold text-slate-600">Quiz Master</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 opacity-40 grayscale">
                <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-3xl text-slate-400 border-2 border-slate-300">
                  🔒
                </div>
                <span className="text-xs font-bold text-slate-400">30 Day Streak</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
