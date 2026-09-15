'use client'

import React from 'react'

interface ViewToggleProps {
  viewMode: 'grid' | 'list'
  onChange: (mode: 'grid' | 'list') => void
}

export function ViewToggle({ viewMode, onChange }: ViewToggleProps) {
  return (
    <div className="view-switch-wrap" role="group" aria-label="Layout mode">
      <button
        type="button"
        onClick={() => onChange('grid')}
        className={`view-switch-btn ${viewMode === 'grid' ? 'active' : ''}`}
        aria-label="Grid view"
        title="Grid layout"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="7" x="3" y="3" rx="1"></rect>
          <rect width="7" height="7" x="14" y="3" rx="1"></rect>
          <rect width="7" height="7" x="14" y="14" rx="1"></rect>
          <rect width="7" height="7" x="3" y="14" rx="1"></rect>
        </svg>
      </button>

      <button
        type="button"
        onClick={() => onChange('list')}
        className={`view-switch-btn ${viewMode === 'list' ? 'active' : ''}`}
        aria-label="List view"
        title="List directory layout"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </button>
    </div>
  )
}
