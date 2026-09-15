'use client'

import React from 'react'
import Link from 'next/link'
import { CompanyListItem, RelatedCompanyItem } from '@/lib/types'
import { CompanyLogo } from './CompanyLogo'
import { useSaved } from '../SavedProvider'
import { useCompare } from '../CompareProvider'

interface CompanyCardProps {
  company: CompanyListItem | RelatedCompanyItem
  viewMode?: 'grid' | 'list'
}

export function CompanyCard({ company, viewMode = 'list' }: CompanyCardProps) {
  const isFullCompany = 'shortDescription' in company
  const companyItem = company as CompanyListItem
  const { isSaved, toggleSave } = useSaved()
  const { isInCompare, toggleCompare } = useCompare()

  const saved = isSaved(company.slug)
  const inCompare = isInCompare(company.slug)

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleSave(company.slug, isFullCompany ? companyItem : undefined)
  }

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isFullCompany) {
      toggleCompare(companyItem)
    }
  }

  const formatCompanyType = (type?: string) => {
    switch (type) {
      case 'STARTUP':
        return 'Startup'
      case 'ENTERPRISE':
        return 'Enterprise'
      case 'RESEARCH':
        return 'Research'
      case 'NONPROFIT':
        return 'Nonprofit'
      default:
        return type || ''
    }
  }


  const metaParts: string[] = []
  if (company.companyType) metaParts.push(formatCompanyType(company.companyType))
  if (company.headquarters) metaParts.push(company.headquarters)

  if (viewMode === 'list') {
    return (
      <div className="list-item-row">
        <div className="list-left-identity">
          <CompanyLogo name={company.name} logo={company.logo} size={28} />
          <div className="list-text-group">
            <div className="list-title-line">
              <Link href={`/companies/${company.slug}`} className="list-name-link">
                {company.name}
              </Link>
              {metaParts.length > 0 && (
                <span style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>
                  · {metaParts.join(' · ')}
                </span>
              )}
            </div>
            {isFullCompany && companyItem.shortDescription && (
              <p className="list-desc-snippet">{companyItem.shortDescription}</p>
            )}
          </div>
        </div>

        <div className="list-right-metadata">
          {company.industry && (
            <span className="tag-compact-subtle">{company.industry}</span>
          )}

          {isFullCompany && (
            <button
              type="button"
              onClick={handleCompareClick}
              className={`btn-card-compare ${inCompare ? 'is-compared' : ''}`}
              title={inCompare ? 'Remove from comparison' : 'Add to compare'}
              aria-label={inCompare ? 'Remove from comparison' : 'Add to compare'}
            >
              {inCompare ? '✓ Compare' : '+ Compare'}
            </button>
          )}

          <button
            type="button"
            onClick={handleSaveClick}
            className={`btn-card-bookmark ${saved ? 'is-saved' : ''}`}
            title={saved ? 'Remove from saved companies' : 'Save company for later'}
            aria-label={saved ? 'Remove from saved companies' : 'Save company for later'}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
            </svg>
          </button>

          <Link
            href={`/companies/${company.slug}`}
            style={{
              fontSize: 11.5,
              fontWeight: 500,
              color: 'var(--text-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 3,
              whiteSpace: 'nowrap',
            }}
          >
            Details →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="card-item-grid">
      <div>
        <div className="card-top-identity">
          <CompanyLogo name={company.name} logo={company.logo} size={32} />
          <div className="card-meta-head">
            <h3 className="card-item-name">
              <Link href={`/companies/${company.slug}`} className="card-stretched-link">
                {company.name}
              </Link>
            </h3>
            {metaParts.length > 0 && (
              <div className="card-subtext">
                {metaParts.join(' · ')}
              </div>
            )}
          </div>
        </div>

        {isFullCompany && companyItem.shortDescription && (
          <p className="card-item-desc">{companyItem.shortDescription}</p>
        )}
      </div>

      <div className="card-bottom-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="tag-compact-subtle">
            {company.industry || 'Artificial Intelligence'}
          </span>

          {isFullCompany && companyItem.foundedYear && (
            <span style={{ color: 'var(--text-faint)' }}>
              {companyItem.foundedYear}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, position: 'relative', zIndex: 2 }}>
          {isFullCompany && (
            <button
              type="button"
              onClick={handleCompareClick}
              className={`btn-card-compare ${inCompare ? 'is-compared' : ''}`}
              title={inCompare ? 'Remove from comparison' : 'Add to compare'}
              aria-label={inCompare ? 'Remove from comparison' : 'Add to compare'}
            >
              {inCompare ? '✓' : '+ Compare'}
            </button>
          )}

          <button
            type="button"
            onClick={handleSaveClick}
            className={`btn-card-bookmark ${saved ? 'is-saved' : ''}`}
            title={saved ? 'Remove from saved companies' : 'Save company for later'}
            aria-label={saved ? 'Remove from saved companies' : 'Save company for later'}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
