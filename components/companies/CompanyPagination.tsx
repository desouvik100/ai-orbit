'use client'

import React from 'react'
import { PaginationMeta } from '@/lib/types'

interface CompanyPaginationProps {
  pagination: PaginationMeta
  onPageChange: (page: number) => void
}

export function CompanyPagination({ pagination, onPageChange }: CompanyPaginationProps) {
  const { page, limit, total, totalPages } = pagination

  if (totalPages <= 1) return null

  const startItem = Math.min((page - 1) * limit + 1, total)
  const endItem = Math.min(page * limit, total)

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const delta = 1

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...')
      }
    }
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="pagination-container" aria-label="Pagination Navigation">
      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
        Showing <span style={{ color: '#fff', fontWeight: 600 }}>{startItem}–{endItem}</span> of{' '}
        <span style={{ color: '#fff', fontWeight: 600 }}>{total}</span> companies
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="page-btn"
          aria-label="Previous page"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </button>

        {pageNumbers.map((p, idx) => {
          if (p === '...') {
            return (
              <span
                key={`ell-${idx}`}
                style={{ padding: '0 4px', color: 'var(--text-faint)', fontSize: 12 }}
              >
                ...
              </span>
            )
          }

          const pageNum = p as number
          const isActive = pageNum === page

          return (
            <button
              key={`page-${pageNum}`}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`page-btn ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </button>
          )
        })}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="page-btn"
          aria-label="Next page"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}
