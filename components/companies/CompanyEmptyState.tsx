'use client'

import React from 'react'

interface CompanyEmptyStateProps {
  onReset?: () => void
  hasFilters?: boolean
}

export function CompanyEmptyState({ onReset, hasFilters = false }: CompanyEmptyStateProps) {
  return (
    <div className="clean-state-panel">
      <h3 className="state-clean-title">No companies found</h3>
      <p className="state-clean-desc">
        {hasFilters
          ? 'No companies matched your current search and filter combination.'
          : 'The companies directory is currently empty.'}
      </p>
      {hasFilters && onReset && (
        <button
          type="button"
          onClick={onReset}
          className="btn-signup-subtle"
          style={{ borderColor: 'var(--border-default)', padding: '5px 14px' }}
        >
          Reset all filters
        </button>
      )}
    </div>
  )
}
