'use client'

import React from 'react'

interface CompanyErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function CompanyErrorState({
  message = "We couldn't load companies right now. Please check your connection and try again.",
  onRetry,
}: CompanyErrorStateProps) {
  return (
    <div className="clean-state-panel">
      <h3 className="state-clean-title" style={{ color: '#f87171' }}>Something went wrong</h3>
      <p className="state-clean-desc">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn-signup-subtle"
          style={{ padding: '5px 14px' }}
        >
          Try again
        </button>
      )}
    </div>
  )
}
