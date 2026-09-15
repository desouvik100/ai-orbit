'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { CompanyDetail } from '@/lib/types'
import { fetchCompanyBySlug } from '@/lib/api-client'
import { CompanyLogo } from './CompanyLogo'
import { CompanyCard } from './CompanyCard'
import { useSaved } from '../SavedProvider'
import { useCompare } from '../CompareProvider'

interface CompanyDetailViewProps {
  slug: string
}

export function CompanyDetailView({ slug }: CompanyDetailViewProps) {
  const [company, setCompany] = useState<CompanyDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { isSaved, toggleSave } = useSaved()
  const { isInCompare, toggleCompare } = useCompare()

  const saved = company ? isSaved(company.slug) : false
  const inCompare = company ? isInCompare(company.slug) : false

  const loadDetail = useCallback(async () => {
    setLoading(true)
    setError(null)
    setNotFound(false)

    try {
      const data = await fetchCompanyBySlug(slug)
      setCompany(data)
    } catch (err: any) {
      if (err.statusCode === 404 || err.code === 'NOT_FOUND') {
        setNotFound(true)
      } else {
        console.error('Failed to load company detail:', err)
        setError(err.message || 'Failed to load company profile.')
      }
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    loadDetail()
  }, [loadDetail])

  const formatEmployeeRange = (range: string | null) => {
    if (!range) return 'Not disclosed'
    switch (range) {
      case 'SOLO_1':
        return '1'
      case 'SMALL_2_10':
        return '2–10'
      case 'MEDIUM_11_50':
        return '11–50'
      case 'LARGE_51_200':
        return '51–200'
      case 'XLARGE_201_500':
        return '201–500'
      case 'ENTERPRISE_501_PLUS':
        return '500+'
      default:
        return range
    }
  }

  const formatCompanyType = (type: string) => {
    switch (type) {
      case 'STARTUP':
        return 'Startup'
      case 'ENTERPRISE':
        return 'Enterprise'
      case 'RESEARCH':
        return 'Research Lab'
      case 'NONPROFIT':
        return 'Nonprofit'
      default:
        return type
    }
  }

  // 404 State
  if (notFound) {
    return (
      <div className="clean-state-panel" style={{ marginTop: '48px' }}>
        <h2 className="state-clean-title">Company not found</h2>
        <p className="state-clean-desc">
          The company you&apos;re looking for could not be found.
        </p>
        <Link href="/companies" className="btn-signup-subtle" style={{ display: 'inline-block' }}>
          Back to Companies
        </Link>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className="clean-state-panel" style={{ marginTop: '48px' }}>
        <h2 className="state-clean-title" style={{ color: '#f87171' }}>Something went wrong</h2>
        <p className="state-clean-desc">{error}</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button type="button" onClick={loadDetail} className="btn-signup-subtle">
            Try again
          </button>
          <Link href="/companies" className="btn-signup-subtle">
            Back to Companies
          </Link>
        </div>
      </div>
    )
  }

  // Skeleton Loading State
  if (loading || !company) {
    return (
      <div style={{ padding: '16px 0 40px' }}>
        <div className="skeleton-box" style={{ width: 110, height: 14, marginBottom: 14 }} />

        <div className="profile-head-card">
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div className="skeleton-box" style={{ width: 54, height: 54, borderRadius: 8, flexShrink: 0 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="skeleton-box" style={{ width: 180, height: 24 }} />
              <div className="skeleton-box" style={{ width: '80%', height: 14 }} />
              <div className="skeleton-box" style={{ width: '50%', height: 12 }} />
            </div>
          </div>
        </div>

        <div className="profile-content-grid">
          <div>
            <div className="section-panel">
              <div className="skeleton-box" style={{ width: 100, height: 16, marginBottom: 12 }} />
              <div className="skeleton-box" style={{ width: '100%', height: 14, marginBottom: 6 }} />
              <div className="skeleton-box" style={{ width: '92%', height: 14, marginBottom: 6 }} />
              <div className="skeleton-box" style={{ width: '70%', height: 14 }} />
            </div>
          </div>
          <div>
            <div className="section-panel">
              <div className="skeleton-box" style={{ width: 110, height: 16, marginBottom: 12 }} />
              <div className="skeleton-box" style={{ width: '100%', height: 140 }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '16px 0 48px' }}>
      {/* Breadcrumb Navigation */}
      <Link
        href="/companies"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 12.5,
          color: 'var(--text-muted)',
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: 13 }}>←</span> Companies
      </Link>

      {/* Compact Profile Header */}
      <div className="profile-head-card">
        <div className="profile-top-section">
          <div className="profile-title-row">
            <div className="profile-avatar-box">
              <CompanyLogo name={company.name} logo={company.logo} size={54} />
            </div>

            <div>
              <h1 className="profile-h1">{company.name}</h1>

              <p className="profile-short-summary">{company.shortDescription}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontSize: 12, color: 'var(--text-faint)', flexWrap: 'wrap' }}>
                {company.industry && <span style={{ color: 'var(--text-secondary)' }}>{company.industry}</span>}
                {company.industry && company.companyType && <span>·</span>}
                {company.companyType && <span>{formatCompanyType(company.companyType)}</span>}
                {company.headquarters && <span>·</span>}
                {company.headquarters && <span>{company.headquarters}</span>}
                {company.foundedYear && <span>·</span>}
                {company.foundedYear && <span>Founded {company.foundedYear}</span>}
                {company.employeeRange && <span>·</span>}
                {company.employeeRange && <span>{formatEmployeeRange(company.employeeRange)} team</span>}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => company && toggleCompare(company)}
              className={`btn-detail-action ${inCompare ? 'is-active' : ''}`}
              title={inCompare ? 'Remove from comparison' : 'Add to compare'}
              aria-label={inCompare ? 'Remove from comparison' : 'Add to compare'}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 3h5v5M4 20L21 3m0 13v5h-5m-7-7l-5 5"></path>
              </svg>
              <span>{inCompare ? 'In compare' : 'Add to compare'}</span>
            </button>

            <button
              type="button"
              onClick={() => company && toggleSave(company.slug, company)}
              className={`btn-detail-action ${saved ? 'is-saved' : ''}`}
              title={saved ? 'Remove from saved' : 'Save company'}
              aria-label={saved ? 'Remove from saved' : 'Save company'}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
              </svg>
              <span>{saved ? 'Saved' : 'Save company'}</span>
            </button>

            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-external-link"
              >
                Visit website
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17l9.2-9.2M17 17V8H8"></path>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Content + Facts Sidebar */}
      <div className="profile-content-grid">
        {/* Main Column */}
        <div>
          {/* About Section */}
          <section className="section-panel">
            <h2 className="section-heading-editorial">Overview</h2>
            <div className="editorial-prose">
              {company.description || company.shortDescription}
            </div>
          </section>

          {/* Products / Offerings */}
          {company.products && company.products.length > 0 && (
            <section className="section-panel">
              <h2 className="section-heading-editorial">
                Products &amp; Models ({company.products.length})
              </h2>

              <div>
                {company.products.map((product) => (
                  <div key={product.id} className="product-row-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <div>
                        <h3 className="product-name-head">{product.name}</h3>
                        <p className="product-desc-text">{product.description}</p>
                      </div>

                      {product.website && (
                        <a
                          href={product.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-signup-subtle"
                          style={{ padding: '3px 8px', fontSize: 11, flexShrink: 0 }}
                        >
                          Explore ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Companies */}
          {company.relatedCompanies && company.relatedCompanies.length > 0 && (
            <section className="section-panel">
              <h2 className="section-heading-editorial">
                Related Organizations ({company.relatedCompanies.length})
              </h2>

              <div className="companies-grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
                {company.relatedCompanies.map((relCompany) => (
                  <CompanyCard
                    key={relCompany.id}
                    company={relCompany}
                    viewMode="grid"
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Column */}
        <div>
          <div className="section-panel">
            <h2 className="section-heading-editorial" style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Company Details
            </h2>

            <div className="facts-list-clean">
              <div className="facts-item">
                <span className="facts-key">Industry</span>
                <span className="facts-value">{company.industry || '—'}</span>
              </div>

              <div className="facts-item">
                <span className="facts-key">Type</span>
                <span className="facts-value">{formatCompanyType(company.companyType)}</span>
              </div>

              <div className="facts-item">
                <span className="facts-key">Headquarters</span>
                <span className="facts-value">{company.headquarters || '—'}</span>
              </div>

              <div className="facts-item">
                <span className="facts-key">Founded</span>
                <span className="facts-value">{company.foundedYear || '—'}</span>
              </div>

              <div className="facts-item">
                <span className="facts-key">Team Size</span>
                <span className="facts-value">{formatEmployeeRange(company.employeeRange)}</span>
              </div>


              {company.website && (
                <div className="facts-item">
                  <span className="facts-key">Domain</span>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="facts-value"
                    style={{ color: 'var(--accent-purple)', textDecoration: 'underline', textUnderlineOffset: 2 }}
                  >
                    {company.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Categories */}
          {company.categories && company.categories.length > 0 && (
            <div className="section-panel">
              <h2 className="section-heading-editorial" style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Categories
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {company.categories.map((cat) => (
                  <span key={cat.id} className="tag-compact">
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
