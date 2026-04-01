import { cn } from "@/lib/utils"
import { Trophy, Medal, Star } from "lucide-react"

export default function LeaderboardPage() {
  const leaderboardData = [
    { rank: 1, name: "Anisa Rahma", xp: "24,500", level: 42, avatar: "Annie", trend: "up" },
    { rank: 2, name: "Budi Santoso", xp: "23,100", level: 40, avatar: "Budi", trend: "up" },
    { rank: 3, name: "Citra Dewi", xp: "22,850", level: 39, avatar: "Citra", trend: "down" },
    { rank: 4, name: "Dedi Kurniawan", xp: "21,200", level: 38, avatar: "Dedi", trend: "same" },
    { rank: 5, name: "Eka Putri", xp: "20,500", level: 36, avatar: "Eliza", trend: "up" },
    { rank: 6, name: "Fajar Siddiq", xp: "19,800", level: 35, avatar: "Felix", trend: "down" },
    { rank: 7, name: "Gita Savitri", xp: "19,200", level: 34, avatar: "Gigi", trend: "same" },
    { rank: 8, name: "Hadi Pranoto", xp: "18,900", level: 33, avatar: "Hadi", trend: "up" },
    { rank: 9, name: "Indah Permata", xp: "18,400", level: 32, avatar: "Isla", trend: "down" },
    { rank: 10, name: "Joko Anwar", xp: "17,500", level: 31, avatar: "Jack", trend: "same" },
  ]

  const currentUser = { rank: 42, name: "Ariel Pratama", xp: "4,240", level: 12, avatar: "Ariel" }

  return (
    <div className="max-w-5xl mx-auto py-8 animate-in slide-in-from-bottom-8 duration-500 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-xl text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-kampus-yellow/20 rounded-full blur-3xl mix-blend-overlay -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md mb-6 inline-block border border-white/20 shadow-inner">
            <Trophy size={48} className="text-kampus-yellow drop-shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">National Leaderboard</h1>
          <p className="text-blue-100 text-lg max-w-lg mx-auto font-medium">Compete with thousands of students across the country and climb your way to the top!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col - Top 3 Podium (Visible on Desktop, stacked on mobile) */}
        <div className="lg:col-span-1 flex flex-col gap-4 order-2 lg:order-1">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-slate-300"></div>
            <div className="text-4xl absolute top-4 left-4 opacity-20">🥈</div>
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${leaderboardData[1].avatar}&backgroundColor=e2e8f0`} alt="Rank 2" className="w-24 h-24 rounded-full border-4 border-slate-200 shadow-md mb-4 mt-2" />
            <div className="font-bold text-lg text-slate-800">{leaderboardData[1].name}</div>
            <div className="text-sm font-bold text-kampus-blue mb-1">{leaderboardData[1].xp} XP</div>
            <div className="text-xs text-slate-400 font-medium">Level {leaderboardData[1].level}</div>
          </div>

          <div className="bg-gradient-to-b from-yellow-50 to-white rounded-[2rem] p-8 shadow-md border border-yellow-200 flex flex-col items-center text-center relative overflow-hidden transform lg:-translate-y-4">
            <div className="absolute top-0 left-0 right-0 h-3 bg-kampus-yellow"></div>
            <div className="text-5xl absolute top-4 left-4 opacity-20">🥇</div>
            <div className="relative">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${leaderboardData[0].avatar}&backgroundColor=fcd34d`} alt="Rank 1" className="w-32 h-32 rounded-full border-4 border-kampus-yellow shadow-xl mb-4" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-kampus-yellow text-yellow-900 text-xs font-black px-3 py-1 rounded-full border-2 border-white shadow-sm">
                RANK 1
              </div>
            </div>
            <div className="font-black text-2xl text-slate-800 mt-2">{leaderboardData[0].name}</div>
            <div className="text-lg font-black text-kampus-blue flex items-center justify-center gap-1 mb-1">
              <Star size={18} className="text-kampus-yellow fill-kampus-yellow" />
              {leaderboardData[0].xp} XP
            </div>
            <div className="text-sm text-slate-500 font-medium">Level {leaderboardData[0].level}</div>
          </div>

          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#CD7F32]"></div>
            <div className="text-4xl absolute top-4 left-4 opacity-20">🥉</div>
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${leaderboardData[2].avatar}&backgroundColor=fed7aa`} alt="Rank 3" className="w-24 h-24 rounded-full border-4 border-[#CD7F32]/30 shadow-md mb-4 mt-2" />
            <div className="font-bold text-lg text-slate-800">{leaderboardData[2].name}</div>
            <div className="text-sm font-bold text-kampus-blue mb-1">{leaderboardData[2].xp} XP</div>
            <div className="text-xs text-slate-400 font-medium">Level {leaderboardData[2].level}</div>
          </div>
        </div>

        {/* Right Col - List 4-10 */}
        <div className="lg:col-span-2 flex flex-col order-1 lg:order-2">
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden flex-1 flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                <Medal className="text-kampus-blue" />
                Global Rankings
              </h2>
              <select className="bg-white border border-slate-200 text-slate-600 text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kampus-blue font-medium">
                <option>This Week</option>
                <option>All Time</option>
              </select>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {leaderboardData.slice(3).map((user) => (
                <div key={user.rank} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center font-bold text-slate-400 text-lg group-hover:text-kampus-blue transition-colors">
                      {user.rank}
                    </div>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar}&backgroundColor=f1f5f9`} alt={user.name} className="w-12 h-12 rounded-full border border-slate-200" />
                    <div>
                      <div className="font-bold text-slate-800">{user.name}</div>
                      <div className="text-xs text-slate-400 font-medium">Level {user.level}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-kampus-blue">{user.xp} XP</div>
                      <div className={cn(
                        "text-xs font-bold flex items-center justify-end gap-1",
                        user.trend === "up" ? "text-emerald-500" :
                        user.trend === "down" ? "text-rose-500" : "text-slate-400"
                      )}>
                        {user.trend === "up" ? "↗" : user.trend === "down" ? "↘" : ""}
                        {user.trend === "up" ? "+12%" : user.trend === "down" ? "-2%" : "0%"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Current User Fixed Bottom */}
            <div className="p-4 border-t-2 border-slate-100 bg-blue-50/50">
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md border-2 border-kampus-blue relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-kampus-blue"></div>
                <div className="flex items-center gap-4 pl-2">
                  <div className="w-10 h-10 flex items-center justify-center font-black text-kampus-blue text-xl">
                    {currentUser.rank}
                  </div>
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.avatar}&backgroundColor=1e293b`} alt={currentUser.name} className="w-12 h-12 rounded-full border-2 border-kampus-blue shadow-sm" />
                  <div>
                    <div className="font-bold text-slate-800">{currentUser.name} <span className="text-xs font-bold text-blue-500 bg-blue-100 px-2 py-0.5 rounded-full ml-1">YOU</span></div>
                    <div className="text-xs text-slate-500 font-medium">Level {currentUser.level}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-kampus-blue text-lg">{currentUser.xp} XP</div>
                  <div className="text-xs font-bold text-emerald-500">↗ +25%</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
