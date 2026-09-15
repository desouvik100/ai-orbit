'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from './AuthProvider'

import { useSaved } from './SavedProvider'
import { useCompare } from './CompareProvider'

export function Navbar() {
  const pathname = usePathname()
  const { user, signOut, loading } = useAuth()
  const { savedSlugs } = useSaved()
  const { compareList } = useCompare()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isCompanies = pathname.startsWith('/companies')
  const isSaved = pathname === '/saved'
  const isCompare = pathname === '/compare'

  return (
    <header className="site-header">
      <div className="site-container">
        <div className="header-inner">
          <div className="header-left">
            <button
              type="button"
              className="btn-icon mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>

            <Link href="/companies" className="brand-link">
              <div className="brand-logo-mark">
                <span>✦</span>
              </div>
              <span className="brand-name">AI Orbit</span>
            </Link>
          </div>

          <nav className="header-nav" aria-label="Main navigation">
            <Link
              href="/companies"
              className={`nav-link ${isCompanies ? 'active' : ''}`}
            >
              Companies
            </Link>
            <Link
              href="/saved"
              className={`nav-link ${isSaved ? 'active' : ''}`}
            >
              Saved
              {user && savedSlugs.size > 0 && (
                <span className="nav-badge-count">{savedSlugs.size}</span>
              )}
            </Link>
            <Link
              href="/compare"
              className={`nav-link ${isCompare ? 'active' : ''}`}
            >
              Compare
              {compareList.length > 0 && (
                <span className="nav-badge-count">{compareList.length}</span>
              )}
            </Link>
            <span className="nav-link inactive">
              Tools
            </span>
            <span className="nav-link inactive">
              Models
            </span>
            <span className="nav-link highlight">
              Leaderboard
            </span>
          </nav>

          <div className="header-actions">
            {!loading && (
              <>
                {user ? (
                  <div className="user-auth-menu">
                    <div className="user-pill" title={user.email}>
                      <span className="user-avatar-initials">
                        {user.name ? user.name[0].toUpperCase() : 'U'}
                      </span>
                      <span className="user-display-name">{user.name.split(' ')[0]}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => signOut()}
                      className="nav-auth-link"
                      title="Sign out of account"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="guest-auth-actions">
                    <Link href="/sign-in" className="nav-auth-link">
                      Sign in
                    </Link>
                    <Link href="/sign-up" className="btn-signup-subtle">
                      Sign up
                    </Link>
                  </div>
                )}
              </>
            )}

            <a
              href="https://aiorbit.club"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-submit"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Submit AI
            </a>
          </div>
        </div>

        {mobileOpen && (
          <div className="mobile-nav-panel">
            <Link
              href="/companies"
              onClick={() => setMobileOpen(false)}
              className={`mobile-nav-item ${isCompanies ? 'active' : ''}`}
            >
              Companies
            </Link>
            <Link
              href="/saved"
              onClick={() => setMobileOpen(false)}
              className={`mobile-nav-item ${isSaved ? 'active' : ''}`}
            >
              Saved Companies {user && savedSlugs.size > 0 ? `(${savedSlugs.size})` : ''}
            </Link>
            <Link
              href="/compare"
              onClick={() => setMobileOpen(false)}
              className={`mobile-nav-item ${isCompare ? 'active' : ''}`}
            >
              Compare Companies {compareList.length > 0 ? `(${compareList.length})` : ''}
            </Link>
            <div className="mobile-auth-divider" />
            {!loading && (
              <div className="mobile-auth-section">
                {user ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: '#a1a1aa' }}>Signed in as {user.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        signOut()
                        setMobileOpen(false)
                      }}
                      className="nav-auth-link"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 10 }}>
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileOpen(false)}
                      className="btn-outline"
                      style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setMobileOpen(false)}
                      className="btn-accent"
                      style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
