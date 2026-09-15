import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Saved Companies — AI Orbit',
  description: 'View and manage your bookmarked AI companies and research organizations.',
}

export default function SavedLayout({ children }: { children: React.ReactNode }) {
  return children
}
