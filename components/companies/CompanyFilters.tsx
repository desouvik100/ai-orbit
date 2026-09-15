'use client'

import React from 'react'
import { CompanySortOption } from '@/lib/types'

interface CompanyFiltersProps {
  industry: string
  companyType: string
  status?: string
  sort: CompanySortOption
  onIndustryChange: (val: string) => void
  onCompanyTypeChange: (val: string) => void
  onStatusChange?: (val: string) => void
  onSortChange: (val: CompanySortOption) => void
  onResetAll: () => void
}

const INDUSTRIES = [
  'Artificial Intelligence',
  'AI Infrastructure',
  'AI Research',
  'AI Safety',
  'Large Language Models',
  'Generative AI',
  'Developer Tools',
  'Enterprise AI',
]

export function CompanyFilters({
  industry,
  companyType,
  sort,
  onIndustryChange,
  onCompanyTypeChange,
  onSortChange,
}: CompanyFiltersProps) {
  return (
    <div className="discovery-filters-wrap">
      {/* Industry Select */}
      <div className="select-box-wrap">
        <select
          value={industry}
          onChange={(e) => onIndustryChange(e.target.value)}
          className={`compact-filter-select ${industry ? 'is-active' : ''}`}
          aria-label="Filter by industry"
        >
          <option value="">All Industries</option>
          {INDUSTRIES.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
        <div className="select-box-arrow">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </div>

      {/* Company Type Select */}
      <div className="select-box-wrap">
        <select
          value={companyType}
          onChange={(e) => onCompanyTypeChange(e.target.value)}
          className={`compact-filter-select ${companyType ? 'is-active' : ''}`}
          aria-label="Filter by company type"
        >
          <option value="">All Types</option>
          <option value="STARTUP">Startup</option>
          <option value="ENTERPRISE">Enterprise</option>
          <option value="RESEARCH">Research Lab</option>
          <option value="NONPROFIT">Nonprofit</option>
        </select>
        <div className="select-box-arrow">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </div>


      {/* Sort Select */}
      <div className="select-box-wrap">
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as CompanySortOption)}
          className={`compact-filter-select ${sort !== 'newest' ? 'is-active' : ''}`}
          aria-label="Sort order"
        >
          <option value="newest">Sort: Newest</option>
          <option value="oldest">Sort: Oldest</option>
          <option value="name-asc">Sort: Name (A–Z)</option>
          <option value="name-desc">Sort: Name (Z–A)</option>
        </select>
        <div className="select-box-arrow">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}
