'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CompanyListItem, CompanySortOption, PaginationMeta } from '@/lib/types'
import { fetchCompanies } from '@/lib/api-client'
import { CompanySearch } from './CompanySearch'
import { CompanyFilters } from './CompanyFilters'
import { ViewToggle } from './ViewToggle'
import { CompanyCard } from './CompanyCard'
import { CompanySkeleton } from './CompanySkeleton'
import { CompanyEmptyState } from './CompanyEmptyState'
import { CompanyErrorState } from './CompanyErrorState'
import { CompanyPagination } from './CompanyPagination'

export function CompaniesExplorer() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState<string>(searchParams.get('search') || '')
  const [industry, setIndustry] = useState<string>(searchParams.get('industry') || '')
  const [companyType, setCompanyType] = useState<string>(searchParams.get('companyType') || '')
  const [status, setStatus] = useState<string>(searchParams.get('status') || '')
  const [sort, setSort] = useState<CompanySortOption>(
    (searchParams.get('sort') as CompanySortOption) || 'newest'
  )
  const [page, setPage] = useState<number>(() => {
    const p = parseInt(searchParams.get('page') || '1', 10)
    return isNaN(p) || p < 1 ? 1 : p
  })

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [companies, setCompanies] = useState<CompanyListItem[]>([])
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
  })

  const syncUrl = useCallback(
    (
      newSearch: string,
      newIndustry: string,
      newCompanyType: string,
      newStatus: string,
      newSort: CompanySortOption,
      newPage: number
    ) => {
      const params = new URLSearchParams()
      if (newSearch.trim()) params.set('search', newSearch.trim())
      if (newIndustry.trim()) params.set('industry', newIndustry.trim())
      if (newCompanyType.trim()) params.set('companyType', newCompanyType.trim())
      if (newStatus.trim()) params.set('status', newStatus.trim())
      if (newSort && newSort !== 'newest') params.set('sort', newSort)
      if (newPage > 1) params.set('page', newPage.toString())

      const queryStr = params.toString()
      const newUrl = queryStr ? `/companies?${queryStr}` : '/companies'
      window.history.replaceState(null, '', newUrl)
    },
    []
  )

  const abortControllerRef = useRef<AbortController | null>(null)

  const loadCompanies = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const controller = new AbortController()
    abortControllerRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const res = await fetchCompanies(
        {
          search,
          industry,
          companyType,
          status,
          sort,
          page,
          limit: 12,
        },
        controller.signal
      )

      setCompanies(res.companies)
      setPagination(res.pagination)
    } catch (err: any) {
      if (err.name === 'AbortError') return
      console.error('Failed to load companies:', err)
      setError(err.message || 'Failed to fetch companies.')
    } finally {
      setLoading(false)
    }
  }, [search, industry, companyType, status, sort, page])

  useEffect(() => {
    syncUrl(search, industry, companyType, status, sort, page)
    loadCompanies()
  }, [search, industry, companyType, status, sort, page, syncUrl, loadCompanies])

  const handleSearchChange = (val: string) => {
    setSearch(val)
    setPage(1)
  }

  const handleIndustryChange = (val: string) => {
    setIndustry(val)
    setPage(1)
  }

  const handleCompanyTypeChange = (val: string) => {
    setCompanyType(val)
    setPage(1)
  }

  const handleStatusChange = (val: string) => {
    setStatus(val)
    setPage(1)
  }

  const handleSortChange = (val: CompanySortOption) => {
    setSort(val)
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 180, behavior: 'smooth' })
  }

  const handleResetAll = () => {
    setSearch('')
    setIndustry('')
    setCompanyType('')
    setStatus('')
    setSort('newest')
    setPage(1)
  }

  const hasActiveFilters = Boolean(search || industry || companyType || sort !== 'newest')

  return (
    <div style={{ paddingBottom: '32px' }}>
      {/* Discovery Controls Bar */}
      <div className="discovery-bar">
        <CompanySearch value={search} onChange={handleSearchChange} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <CompanyFilters
            industry={industry}
            companyType={companyType}
            sort={sort}
            onIndustryChange={handleIndustryChange}
            onCompanyTypeChange={handleCompanyTypeChange}
            onSortChange={handleSortChange}
            onResetAll={handleResetAll}
          />

          <ViewToggle viewMode={viewMode} onChange={setViewMode} />
        </div>
      </div>

      {/* Active Filter Chips & Summary */}
      <div className="filter-summary-row">
        <div className="filter-chips-list">
          {hasActiveFilters && (
            <span style={{ fontSize: 11.5, color: 'var(--text-faint)', marginRight: 4 }}>
              Active:
            </span>
          )}

          {industry && (
            <span className="subtle-chip">
              Industry: {industry}
              <button
                type="button"
                onClick={() => handleIndustryChange('')}
                className="subtle-chip-btn"
                aria-label="Remove industry filter"
              >
                ✕
              </button>
            </span>
          )}

          {companyType && (
            <span className="subtle-chip">
              Type: {companyType}
              <button
                type="button"
                onClick={() => handleCompanyTypeChange('')}
                className="subtle-chip-btn"
                aria-label="Remove company type filter"
              >
                ✕
              </button>
            </span>
          )}


          {search && (
            <span className="subtle-chip">
              &ldquo;{search}&rdquo;
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="subtle-chip-btn"
                aria-label="Clear search keyword"
              >
                ✕
              </button>
            </span>
          )}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetAll}
              className="btn-text-reset"
            >
              Reset all
            </button>
          )}
        </div>

        {!loading && (
          <div className="result-counter">
            <span className="result-counter-num">{pagination.total}</span> companies indexed
          </div>
        )}
      </div>

      {/* Main Results Body */}
      {loading ? (
        <CompanySkeleton viewMode={viewMode} count={viewMode === 'list' ? 8 : 9} />
      ) : error ? (
        <CompanyErrorState message={error} onRetry={loadCompanies} />
      ) : companies.length === 0 ? (
        <CompanyEmptyState onReset={handleResetAll} hasFilters={hasActiveFilters} />
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="companies-grid-layout">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="companies-list-layout">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} viewMode="list" />
              ))}
            </div>
          )}

          <CompanyPagination pagination={pagination} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  )
}
