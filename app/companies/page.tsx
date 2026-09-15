import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { CompaniesExplorer } from '@/components/companies/CompaniesExplorer'
import { CompanySkeleton } from '@/components/companies/CompanySkeleton'

export const metadata: Metadata = {
  title: 'AI Companies — Research & Ecosystem Directory | AI Orbit',
  description:
    'Directory of frontier AI research labs, infrastructure providers, and applied machine learning companies.',
}

export default function CompaniesPage() {
  return (
    <main className="site-container">
      <header className="page-head-compact">
        <h1 className="page-head-title">AI Companies</h1>
        <p className="page-head-desc">
          Directory of artificial intelligence research labs, model developers, and infrastructure platforms.
        </p>
      </header>

      <section style={{ paddingTop: '8px' }}>
        <Suspense fallback={<CompanySkeleton viewMode="list" count={8} />}>
          <CompaniesExplorer />
        </Suspense>
      </section>
    </main>
  )
}
