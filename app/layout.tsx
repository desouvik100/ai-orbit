import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AuthProvider } from '@/components/AuthProvider'
import { SavedProvider } from '@/components/SavedProvider'
import { CompareProvider } from '@/components/CompareProvider'
import { AuthPromptModal } from '@/components/AuthPromptModal'
import { CompareTray } from '@/components/CompareTray'

export const metadata: Metadata = {
  title: 'AI Orbit — Discover the AI Ecosystem',
  description:
    'Discover, compare, and explore the best AI tools, companies, models, and research organizations in the global ecosystem.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <AuthProvider>
          <SavedProvider>
            <CompareProvider>
              <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />
                <div style={{ flex: 1 }}>{children}</div>
                <Footer />
              </div>
              <AuthPromptModal />
              <CompareTray />
            </CompareProvider>
          </SavedProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
