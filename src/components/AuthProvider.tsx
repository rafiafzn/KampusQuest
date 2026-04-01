"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useUserStore } from "@/stores/user-store"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { fetchProfile, setProfile } = useUserStore()
  
  useEffect(() => {
    const supabase = createClient()
    
    // Check active session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null) // Reset to guest
      }
    })

    // Listen to changes (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          fetchProfile(session.user.id)
        } else if (event === 'SIGNED_OUT') {
          setProfile(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [fetchProfile, setProfile])

  return <>{children}</>
}
