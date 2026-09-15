'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { CompanyListItem } from '@/lib/types'

interface CompareContextType {
  compareList: CompanyListItem[]
  isInCompare: (slug: string) => boolean
  toggleCompare: (company: CompanyListItem) => { success: boolean; message?: string }
  removeFromCompare: (slug: string) => void
  clearCompare: () => void
  compareNotice: string | null
  clearNotice: () => void
}

const CompareContext = createContext<CompareContextType>({
  compareList: [],
  isInCompare: () => false,
  toggleCompare: () => ({ success: false }),
  removeFromCompare: () => {},
  clearCompare: () => {},
  compareNotice: null,
  clearNotice: () => {},
})

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<CompanyListItem[]>([])
  const [compareNotice, setCompareNotice] = useState<string | null>(null)

  // Initialize from session storage if present
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('ai_orbit_compare')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setCompareList(parsed.slice(0, 3))
        }
      }
    } catch {
      // Ignore session storage errors
    }
  }, [])

  // Sync to session storage
  const updateList = useCallback((list: CompanyListItem[]) => {
    setCompareList(list)
    try {
      sessionStorage.setItem('ai_orbit_compare', JSON.stringify(list))
    } catch {
      // Ignore session storage errors
    }
  }, [])

  const isInCompare = useCallback(
    (slug: string) => {
      return compareList.some((c) => c.slug === slug)
    },
    [compareList]
  )

  const toggleCompare = (company: CompanyListItem): { success: boolean; message?: string } => {
    const existing = compareList.find((c) => c.slug === company.slug)

    if (existing) {
      const next = compareList.filter((c) => c.slug !== company.slug)
      updateList(next)
      return { success: true }
    }

    if (compareList.length >= 3) {
      setCompareNotice('You can compare up to 3 companies at a time.')
      return { success: false, message: 'You can compare up to 3 companies at a time.' }
    }

    const next = [...compareList, company]
    updateList(next)
    return { success: true }
  }

  const removeFromCompare = (slug: string) => {
    const next = compareList.filter((c) => c.slug !== slug)
    updateList(next)
  }

  const clearCompare = () => {
    updateList([])
    setCompareNotice(null)
  }

  const clearNotice = () => {
    setCompareNotice(null)
  }

  return (
    <CompareContext.Provider
      value={{
        compareList,
        isInCompare,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        compareNotice,
        clearNotice,
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  return useContext(CompareContext)
}
