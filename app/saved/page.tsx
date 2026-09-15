'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import { useSaved } from '@/components/SavedProvider'
import { CompanyCard } from '@/components/companies/CompanyCard'
import { CompanySkeleton } from '@/components/companies/CompanySkeleton'
import { ViewToggle } from '@/components/companies/ViewToggle'

export default function SavedCompaniesPage() {
  const { user, loading: authLoading } = useAuth()
  const { savedCompanies, loading: savedLoading, refreshSaved } = useSaved()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  const loading = authLoading || savedLoading

  return (
    <main className="site-container" style={{ paddingBottom: '48px' }}>
      <header className="page-head-compact">
        <h1 className="page-head-title">Saved Companies</h1>
        <p className="page-head-desc">
          Companies you&apos;ve bookmarked for later research and monitoring.
        </p>
      </header>

      <section style={{ paddingTop: '8px' }}>
        {loading ? (
          <CompanySkeleton viewMode={viewMode} count={4} />
        ) : !user ? (
          <div className="discovery-empty-state">
            <div className="empty-state-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
              </svg>
            </div>
            <h2 className="empty-state-title">Sign in to view saved companies</h2>
            <p className="empty-state-desc">
              Please sign in with your AI Orbit account to access and synchronize your bookmarked companies.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <Link href="/sign-in?returnUrl=%2Fsaved" className="btn-search-clear" style={{ padding: '8px 16px', textDecoration: 'none' }}>
                Sign in
              </Link>
              <Link href="/sign-up?returnUrl=%2Fsaved" className="btn-submit-ai" style={{ padding: '8px 16px', textDecoration: 'none' }}>
                Sign up
              </Link>
            </div>
          </div>
        ) : savedCompanies.length === 0 ? (
          <div className="discovery-empty-state">
            <div className="empty-state-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
              </svg>
            </div>
            <h2 className="empty-state-title">You haven&apos;t saved any companies yet</h2>
            <p className="empty-state-desc">
              Save companies while exploring the AI ecosystem and they&apos;ll appear here.
            </p>
            <div style={{ marginTop: 16 }}>
              <Link href="/companies" className="btn-submit-ai" style={{ padding: '8px 18px', textDecoration: 'none' }}>
                Explore companies →
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '12px',
                marginBottom: '12px',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <span style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
                {savedCompanies.length} {savedCompanies.length === 1 ? 'company' : 'companies'} saved
              </span>
              <ViewToggle viewMode={viewMode} onChange={setViewMode} />
            </div>

            <div className={viewMode === 'list' ? 'companies-list-view' : 'companies-grid-view'}>
              {savedCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} viewMode={viewMode} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
