'use client'

import React from 'react'
import Link from 'next/link'
import { useCompare } from './CompareProvider'

export function CompareTray() {
  const { compareList, removeFromCompare, clearCompare, compareNotice, clearNotice } = useCompare()

  if (compareList.length === 0 && !compareNotice) return null

  return (
    <aside className="compare-floating-tray" aria-label="Company comparison tray">
      <div className="compare-tray-content">
        {compareNotice ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between', width: '100%' }}>
            <span style={{ fontSize: 12.5, color: '#f87171' }}>{compareNotice}</span>
            <button
              type="button"
              onClick={clearNotice}
              className="btn-filter-reset"
              style={{ fontSize: 11, padding: '3px 8px' }}
            >
              Dismiss
            </button>
          </div>
        ) : (
          <>
            <div className="compare-tray-left">
              <span className="compare-count-pill">
                {compareList.length} / 3
              </span>
              <div className="compare-chips-row">
                {compareList.map((company) => (
                  <span key={company.slug} className="compare-item-chip">
                    <span className="compare-item-chip-name">{company.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFromCompare(company.slug)}
                      aria-label={`Remove ${company.name} from comparison`}
                      className="compare-remove-btn"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="compare-tray-actions">
              <button
                type="button"
                onClick={clearCompare}
                className="btn-compare-clear"
              >
                Clear
              </button>
              <Link
                href="/compare"
                className="btn-compare-launch"
              >
                Compare {compareList.length > 1 ? `(${compareList.length})` : ''} →
              </Link>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
