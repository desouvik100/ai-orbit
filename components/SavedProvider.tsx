'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useAuth } from './AuthProvider'
import { CompanyListItem } from '@/lib/types'

interface SavedContextType {
  savedSlugs: Set<string>
  savedCompanies: CompanyListItem[]
  loading: boolean
  isSaved: (slug: string) => boolean
  toggleSave: (slug: string, company?: CompanyListItem) => Promise<boolean>
  removeSaved: (slug: string) => Promise<boolean>
  authModalOpen: boolean
  openAuthModal: () => void
  closeAuthModal: () => void
  refreshSaved: () => Promise<void>
}

const SavedContext = createContext<SavedContextType>({
  savedSlugs: new Set(),
  savedCompanies: [],
  loading: false,
  isSaved: () => false,
  toggleSave: async () => false,
  removeSaved: async () => false,
  authModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  refreshSaved: async () => {},
})

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [savedSlugs, setSavedSlugs] = useState<Set<string>>(new Set())
  const [savedCompanies, setSavedCompanies] = useState<CompanyListItem[]>([])
  const [loading, setLoading] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const refreshSaved = useCallback(async () => {
    if (!user) {
      setSavedSlugs(new Set())
      setSavedCompanies([])
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/saved')
      if (res.ok) {
        const json = await res.json()
        if (json.success && json.data) {
          setSavedSlugs(new Set(json.data.savedSlugs || []))
          setSavedCompanies(json.data.companies || [])
        }
      }
    } catch (err) {
      console.error('Failed to load saved companies:', err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    refreshSaved()
  }, [refreshSaved])

  const isSaved = useCallback(
    (slug: string) => {
      return savedSlugs.has(slug)
    },
    [savedSlugs]
  )

  const toggleSave = async (slug: string, company?: CompanyListItem): Promise<boolean> => {
    if (!user) {
      setAuthModalOpen(true)
      return false
    }

    const currentlySaved = savedSlugs.has(slug)
    const nextSaved = !currentlySaved

    // Optimistic UI update
    setSavedSlugs((prev) => {
      const next = new Set(prev)
      if (nextSaved) next.add(slug)
      else next.delete(slug)
      return next
    })

    if (!nextSaved) {
      setSavedCompanies((prev) => prev.filter((c) => c.slug !== slug))
    } else if (company) {
      setSavedCompanies((prev) => [company, ...prev.filter((c) => c.slug !== slug)])
    }

    try {
      const res = await fetch('/api/saved', {
        method: currentlySaved ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })

      if (!res.ok) {
        throw new Error('Server error while saving')
      }

      const json = await res.json()
      if (json.success && json.data) {
        setSavedSlugs(new Set(json.data.savedSlugs || []))
        return json.data.isSaved
      }
      return nextSaved
    } catch (err) {
      console.error('Failed to update saved company on server:', err)
      // Revert optimistic update
      setSavedSlugs((prev) => {
        const reverted = new Set(prev)
        if (currentlySaved) reverted.add(slug)
        else reverted.delete(slug)
        return reverted
      })
      refreshSaved()
      return currentlySaved
    }
  }

  const removeSaved = async (slug: string): Promise<boolean> => {
    if (!user) return false
    return !(await toggleSave(slug))
  }

  return (
    <SavedContext.Provider
      value={{
        savedSlugs,
        savedCompanies,
        loading,
        isSaved,
        toggleSave,
        removeSaved,
        authModalOpen,
        openAuthModal: () => setAuthModalOpen(true),
        closeAuthModal: () => setAuthModalOpen(false),
        refreshSaved,
      }}
    >
      {children}
    </SavedContext.Provider>
  )
}

export function useSaved() {
  return useContext(SavedContext)
}
