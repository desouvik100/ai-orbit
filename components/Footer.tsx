'use client'

import React from 'react'
import Link from 'next/link'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <div>
            <Link href="/companies" className="brand-link" style={{ marginBottom: 10 }}>
              <div className="brand-logo-mark">
                <span>✦</span>
              </div>
              <span className="brand-name">AI Orbit</span>
            </Link>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              The Home of Everything AI.
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-faint)', marginTop: '4px', maxWidth: '280px', lineHeight: 1.5 }}>
              Discover tools, companies, and frontier research shaping the global AI ecosystem.
            </p>
          </div>

          <div className="footer-columns">
            <div>
              <h4 className="footer-col-title">Explore</h4>
              <ul className="footer-col-links">
                <li><Link href="/companies">AI Companies</Link></li>
                <li><span>AI Tools</span></li>
                <li><span>AI Agents</span></li>
                <li><span>AI Models</span></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Discover</h4>
              <ul className="footer-col-links">
                <li><span>AI News</span></li>
                <li><span>AI Trends</span></li>
                <li><span>Leaderboard</span></li>
                <li><span>Research</span></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Ecosystem</h4>
              <ul className="footer-col-links">
                <li><span>Repositories</span></li>
                <li><span>MCP</span></li>
                <li><span>Submit AI</span></li>
                <li><span>Advertise</span></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Company</h4>
              <ul className="footer-col-links">
                <li><span>About</span></li>
                <li><span>Contact</span></li>
                <li><span>Privacy</span></li>
                <li><span>Terms</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>made with ❤️ by AI Orbit</p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: '1px solid var(--border-default)',
              color: 'var(--text-muted)',
              background: 'var(--bg-surface)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 15-6-6-6 6"></path>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
