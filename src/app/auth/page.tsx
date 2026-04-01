"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  const handleAuth = async (action: 'login' | 'signup') => {
    setLoading(true)
    setErrorMsg(null)
    
    try {
      if (action === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        alert("Pendaftaran berhasil! Silakan cek email Anda atau langsung login.")
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push("/")
      }
    } catch (err) {
      setErrorMsg((err as Error).message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 animate-in slide-in-from-bottom-8 duration-500">
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-kampus-blue text-white rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg">
            K
          </div>
        </div>
        
        <h1 className="text-3xl font-black text-center text-slate-800 mb-2">Welcome to KampusQuest</h1>
        <p className="text-center text-slate-500 mb-8 font-medium">Log in to save your progress to the national leaderboards!</p>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-2xl mb-6 text-sm font-semibold text-center">
            {errorMsg}
          </div>
        )}

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-200 px-4 py-3 rounded-2xl focus:outline-none focus:border-kampus-blue focus:ring-4 focus:ring-blue-50 transition-all font-medium"
              placeholder="anisa@sekolah.edu"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-200 px-4 py-3 rounded-2xl focus:outline-none focus:border-kampus-blue focus:ring-4 focus:ring-blue-50 transition-all font-medium"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => handleAuth('login')}
            disabled={loading}
            className="w-full bg-kampus-blue hover:bg-kampus-blueDark text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {loading ? "Process..." : "Log In"}
          </button>
          
          <button 
            onClick={() => handleAuth('signup')}
            disabled={loading}
            className="w-full bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 font-bold py-3.5 px-4 rounded-xl transition-all disabled:opacity-50"
          >
            Create New Account
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <button 
            onClick={() => router.push('/')}
            className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Lanjut sebagai Guest (Mock Data)
          </button>
        </div>
      </div>
    </div>
  )
}
