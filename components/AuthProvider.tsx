'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface AuthUser {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ success: false }),
  signUp: async () => ({ success: false }),
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/me')
        const json = await res.json()
        if (json.success && json.data?.user) {
          setUser(json.data.user)
        }
      } catch (err) {
        console.error('Failed to verify session', err)
      } finally {
        setLoading(false)
      }
    }
    checkSession()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok && data.success && data.data?.user) {
        setUser(data.data.user)
        return { success: true }
      }
      return { success: false, error: data.error?.message || 'Invalid email or password' }
    } catch {
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (res.ok && data.success && data.data?.user) {
        setUser(data.data.user)
        return { success: true }
      }
      return { success: false, error: data.error?.message || 'Registration failed' }
    } catch {
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const signOut = async () => {
    try {
      await fetch('/api/auth/sign-out', { method: 'POST' })
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
