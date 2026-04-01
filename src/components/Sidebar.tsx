"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, BarChart2, User, Settings, HelpCircle } from "lucide-react"

import { LogOut, LogIn } from "lucide-react"
import { useUserStore } from "@/stores/user-store"
import { createClient } from "@/lib/supabase/client"

export default function Sidebar() {
  const pathname = usePathname()
  const { isGuest } = useUserStore()

  const mainLinks = [
    { href: "/", label: "Learn", icon: BookOpen },
    { href: "/leaderboard", label: "Leaderboard", icon: BarChart2 },
    { href: "/profile", label: "Profile", icon: User },
  ]
  
  const bottomLinks = [
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/help", label: "Help", icon: HelpCircle },
  ]

  const handleAuthAction = async () => {
    if (isGuest) {
      window.location.href = '/auth'
    } else {
      const supabase = createClient()
      await supabase.auth.signOut()
    }
  }

  return (
    <aside className="w-64 h-full bg-white hidden md:flex flex-col border-r border-slate-100 flex-shrink-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-kampus-blue">
          KampusQuest
          <span className="block text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-wider">UTBK Mastery</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {mainLinks.map((link) => {
          const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/")
          const Icon = link.icon
          
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-colors duration-200",
                isActive 
                  ? "bg-[#F0F5FF] text-kampus-blue" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              )}
            >
              <Icon size={20} className={cn(isActive ? "text-kampus-blue" : "text-slate-400")} />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 space-y-2">
        {bottomLinks.map((link) => {
          const Icon = link.icon
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-slate-500 hover:bg-slate-50 transition-colors"
            >
              <Icon size={20} className="text-slate-400" />
              <span className="text-sm">{link.label}</span>
            </Link>
          )
        })}
        
        <button 
          onClick={handleAuthAction}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-slate-500 hover:bg-slate-50 hover:text-rose-600 transition-colors"
        >
          {isGuest ? (
            <><LogIn size={20} className="text-slate-400" /><span className="text-sm">Log In</span></>
          ) : (
            <><LogOut size={20} className="text-rose-400" /><span className="text-sm">Log Out</span></>
          )}
        </button>
        
      </div>
    </aside>
  )
}
