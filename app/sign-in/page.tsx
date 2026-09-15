'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl') || '/companies'
  const { signIn, user } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  React.useEffect(() => {
    if (user) {
      router.push(returnUrl)
    }
  }, [user, router, returnUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password) {
      setError('Please enter both your email address and password.')
      return
    }

    setLoading(true)
    const result = await signIn(email, password)
    setLoading(false)

    if (result.success) {
      router.push(returnUrl)
    } else {
      setError(result.error || 'Invalid credentials. Please verify your email and password.')
    }
  }

  return (
    <div className="auth-page-wrapper">
      <div className="auth-product-frame">
        <div className="auth-brand-row">
          <Link href="/companies" className="brand-link">
            <div className="brand-logo-mark">
              <span>✦</span>
            </div>
            <span className="brand-name">AI Orbit</span>
          </Link>
        </div>

        <h1 className="auth-headline">Sign in</h1>
        <p className="auth-subhead">Access your AI Orbit account.</p>

        <div className="auth-form-body">
          {error && (
            <div className="auth-error-notice" role="alert">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="form-group">
              <label htmlFor="email" className="form-label-clean">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@organization.com"
                required
                className="clean-input"
                autoComplete="email"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor="password" className="form-label-clean">
                  Password
                </label>
              </div>
              <div className="input-with-action">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="clean-input"
                  style={{ paddingRight: 48 }}
                  autoComplete="current-password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="auth-primary-btn"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        <div className="auth-alt-footer">
          <span>Don&rsquo;t have an account? </span>
          <Link href="/sign-up" className="auth-alt-link">
            Create account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="auth-page-wrapper" />}>
      <SignInForm />
    </Suspense>
  )
}
