'use client'

import React, { useEffect, useState } from 'react'

interface CompanySearchProps {
  value: string
  onChange: (search: string) => void
  placeholder?: string
}

export function CompanySearch({
  value,
  onChange,
  placeholder = 'Search by name, capability, or industry...',
}: CompanySearchProps) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [localValue, value, onChange])

  const handleClear = () => {
    setLocalValue('')
    onChange('')
  }

  return (
    <div className="discovery-search-wrap">
      <div className="search-field-icon">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      <input
        type="search"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="search-input-field"
        aria-label="Search directory"
      />

      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="search-field-clear"
          aria-label="Clear search"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  )
}
