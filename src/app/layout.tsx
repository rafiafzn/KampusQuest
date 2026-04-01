import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'KampusQuest - UTBK Mastery',
  description: 'Platform latihan soal UTBK interaktif',
}

import AuthProvider from '@/components/AuthProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} font-sans bg-kampus-bg h-screen overflow-hidden flex`}>
        <AuthProvider>
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
