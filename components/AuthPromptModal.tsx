'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSaved } from './SavedProvider'

export function AuthPromptModal() {
  const { authModalOpen, closeAuthModal } = useSaved()
  const pathname = usePathname()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && authModalOpen) {
        closeAuthModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [authModalOpen, closeAuthModal])

  if (!authModalOpen) return null

  const returnUrl = encodeURIComponent(pathname)

  return (
    <div
      className="auth-modal-backdrop"
      onClick={closeAuthModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className="auth-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Authentication Required
            </span>
            <h3 id="auth-modal-title" style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginTop: 4, letterSpacing: '-0.02em' }}>
              Sign in to save companies
            </h3>
          </div>
          <button
            type="button"
            onClick={closeAuthModal}
            aria-label="Close dialog"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: 4,
              fontSize: 16,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.5 }}>
          Create a free account or sign in to bookmark AI companies for research and access them across sessions.
        </p>

        <div style={{ display: 'flex', gap: 8, marginTop: 18, justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={closeAuthModal}
            className="btn-filter-reset"
            style={{ padding: '6px 12px' }}
          >
            Cancel
          </button>
          <Link
            href={`/sign-in?returnUrl=${returnUrl}`}
            onClick={closeAuthModal}
            className="btn-search-clear"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 500,
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
            }}
          >
            Sign in
          </Link>
          <Link
            href={`/sign-up?returnUrl=${returnUrl}`}
            onClick={closeAuthModal}
            className="btn-submit-ai"
            style={{
              padding: '6px 14px',
              fontSize: 12,
              textDecoration: 'none',
            }}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
