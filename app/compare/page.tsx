'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCompare } from '@/components/CompareProvider'
import { CompanyLogo } from '@/components/companies/CompanyLogo'
import { CompanyListItem, ProductItem } from '@/lib/types'
import { fetchCompanyBySlug } from '@/lib/api-client'

interface FullComparisonItem extends CompanyListItem {
  products?: ProductItem[]
}

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare()
  const [detailedCompanies, setDetailedCompanies] = useState<FullComparisonItem[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch full details (for products) for the compared companies
  useEffect(() => {
    if (compareList.length === 0) {
      setDetailedCompanies([])
      return
    }

    let isCancelled = false
    setLoading(true)

    Promise.all(
      compareList.map(async (item) => {
        try {
          const detail = await fetchCompanyBySlug(item.slug)
          return detail
        } catch {
          return item
        }
      })
    )
      .then((results) => {
        if (!isCancelled) {
          setDetailedCompanies(results)
        }
      })
      .finally(() => {
        if (!isCancelled) setLoading(false)
      })

    return () => {
      isCancelled = true
    }
  }, [compareList])

  const formatCompanyType = (type?: string) => {
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
        return type || '—'
    }
  }

  const formatEmployeeRange = (range?: string | null) => {
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
        return '—'
    }
  }

  return (
    <main className="site-container" style={{ paddingBottom: '64px' }}>
      {/* Editorial Header */}
      <header className="page-head-compact">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 className="page-head-title">Compare Companies</h1>
            <p className="page-head-desc">
              Side-by-side structured comparison of frontier AI labs, platforms, and research entities.
            </p>
          </div>
          {compareList.length > 0 && (
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={clearCompare}
                className="btn-filter-reset"
              >
                Clear all
              </button>
              <Link
                href="/companies"
                className="btn-search-clear"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 12px',
                  fontSize: 12,
                  textDecoration: 'none',
                }}
              >
                + Add more
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Comparison Body */}
      <section style={{ paddingTop: '16px' }}>
        {compareList.length === 0 ? (
          /* Empty State */
          <div className="discovery-empty-state">
            <div className="empty-state-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 3h5v5M4 20L21 3m0 13v5h-5m-7-7l-5 5"></path>
              </svg>
            </div>
            <h2 className="empty-state-title">Compare companies</h2>
            <p className="empty-state-desc">
              Select companies while browsing to compare them side by side.
            </p>
            <div style={{ marginTop: 16 }}>
              <Link href="/companies" className="btn-submit-ai" style={{ padding: '8px 18px', textDecoration: 'none' }}>
                Explore companies →
              </Link>
            </div>
          </div>
        ) : (
          /* Comparison Table */
          <div className="compare-table-wrapper">
            <table className="compare-table">
              <thead>
                <tr>
                  <th style={{ width: '180px', minWidth: '150px' }}>Company</th>
                  {detailedCompanies.map((c) => (
                    <th key={c.slug} style={{ minWidth: '220px' }}>
                      <div className="compare-th-content">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <CompanyLogo name={c.name} logo={c.logo} size={28} />
                          <div>
                            <Link href={`/companies/${c.slug}`} className="compare-company-name">
                              {c.name}
                            </Link>
                            {c.website && (
                              <a
                                href={c.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="compare-company-web"
                              >
                                {c.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')} ↗
                              </a>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCompare(c.slug)}
                          aria-label={`Remove ${c.name} from comparison`}
                          className="compare-remove-cell-btn"
                          title="Remove from comparison"
                        >
                          ✕
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Description */}
                <tr>
                  <td className="compare-label-cell">Overview</td>
                  {detailedCompanies.map((c) => (
                    <td key={c.slug} className="compare-value-cell" style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                      {c.shortDescription}
                    </td>
                  ))}
                </tr>

                {/* Industry */}
                <tr>
                  <td className="compare-label-cell">Industry</td>
                  {detailedCompanies.map((c) => (
                    <td key={c.slug} className="compare-value-cell">
                      <span className="tag-compact-subtle">{c.industry}</span>
                    </td>
                  ))}
                </tr>

                {/* Type */}
                <tr>
                  <td className="compare-label-cell">Company Type</td>
                  {detailedCompanies.map((c) => (
                    <td key={c.slug} className="compare-value-cell">
                      {formatCompanyType(c.companyType)}
                    </td>
                  ))}
                </tr>

                {/* Headquarters */}
                <tr>
                  <td className="compare-label-cell">Headquarters</td>
                  {detailedCompanies.map((c) => (
                    <td key={c.slug} className="compare-value-cell">
                      {c.headquarters || '—'}
                    </td>
                  ))}
                </tr>

                {/* Founded */}
                <tr>
                  <td className="compare-label-cell">Founded</td>
                  {detailedCompanies.map((c) => (
                    <td key={c.slug} className="compare-value-cell">
                      {c.foundedYear || '—'}
                    </td>
                  ))}
                </tr>

                {/* Team Size */}
                <tr>
                  <td className="compare-label-cell">Team Size</td>
                  {detailedCompanies.map((c) => (
                    <td key={c.slug} className="compare-value-cell">
                      {formatEmployeeRange(c.employeeRange)}
                    </td>
                  ))}
                </tr>

                {/* Key Products */}
                <tr>
                  <td className="compare-label-cell">Products &amp; Models</td>
                  {detailedCompanies.map((c) => (
                    <td key={c.slug} className="compare-value-cell">
                      {c.products && c.products.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {c.products.map((p) => (
                            <div key={p.id} style={{ fontSize: 12 }}>
                              <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{p.name}</span>
                              {p.description && (
                                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                                  {p.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-faint)' }}>—</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Profile Link */}
                <tr>
                  <td className="compare-label-cell">Full Profile</td>
                  {detailedCompanies.map((c) => (
                    <td key={c.slug} className="compare-value-cell">
                      <Link href={`/companies/${c.slug}`} className="btn-detail-action" style={{ display: 'inline-flex', fontSize: 11.5 }}>
                        View profile →
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}
