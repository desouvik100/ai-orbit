import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="site-container" style={{ padding: '80px 16px', textAlign: 'center' }}>
      <div className="discovery-empty-state" style={{ margin: '0 auto', maxWidth: '460px' }}>
        <div className="empty-state-icon">
          <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-faint)' }}>404</span>
        </div>
        <h1 className="empty-state-title" style={{ fontSize: 20 }}>Page or company not found</h1>
        <p className="empty-state-desc">
          The company or page you&apos;re looking for could not be found or may have been moved.
        </p>
        <div style={{ marginTop: 20 }}>
          <Link href="/companies" className="btn-submit-ai" style={{ padding: '9px 20px', textDecoration: 'none' }}>
            Back to Companies →
          </Link>
        </div>
      </div>
    </main>
  )
}
