import React from 'react'

interface CompanySkeletonProps {
  viewMode?: 'grid' | 'list'
  count?: number
}

export function CompanySkeleton({ viewMode = 'grid', count = 6 }: CompanySkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i)

  if (viewMode === 'list') {
    return (
      <div className="companies-list-layout" aria-label="Loading companies list">
        {items.map((key) => (
          <div
            key={key}
            className="list-item-row"
            style={{ pointerEvents: 'none' }}
          >
            <div className="list-left-identity">
              <div className="skeleton-box" style={{ width: 30, height: 30, borderRadius: 6, flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div className="skeleton-box" style={{ width: 140, height: 14 }} />
                <div className="skeleton-box" style={{ width: '65%', height: 11 }} />
              </div>
            </div>
            <div className="list-right-metadata">
              <div className="skeleton-box" style={{ width: 70, height: 16 }} />
              <div className="skeleton-box" style={{ width: 80, height: 14 }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="companies-grid-layout" aria-label="Loading companies grid">
      {items.map((key) => (
        <div
          key={key}
          className="card-item-grid"
          style={{ pointerEvents: 'none' }}
        >
          <div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
              <div className="skeleton-box" style={{ width: 38, height: 38, borderRadius: 6, flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div className="skeleton-box" style={{ width: '60%', height: 15 }} />
                <div className="skeleton-box" style={{ width: '40%', height: 11 }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
              <div className="skeleton-box" style={{ width: '100%', height: 12 }} />
              <div className="skeleton-box" style={{ width: '75%', height: 12 }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 10, borderTop: '1px solid #18181c' }}>
            <div className="skeleton-box" style={{ width: 70, height: 16 }} />
            <div className="skeleton-box" style={{ width: 50, height: 14 }} />
          </div>
        </div>
      ))}
    </div>
  )
}
