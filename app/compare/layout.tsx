import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Companies — AI Orbit',
  description: 'Side-by-side structured comparison of frontier AI labs, platforms, and research entities.',
}

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children
}
