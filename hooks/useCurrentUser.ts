'use client'

/**
 * useCurrentUser — reads the authenticated user from localStorage.
 *
 * The login API (/api/auth/login) stores the full UserRecord (minus
 * passwordHash) in localStorage under "vt_user" and the JWT access
 * token under "vt_token".  This hook exposes that state to client
 * components so they can render user-specific UI without an extra
 * round-trip.
 *
 * Auth guard / redirect is handled by <AuthGuard> — this hook only
 * returns the state.
 */

import { useState, useEffect, useCallback } from 'react'

export interface CurrentUser {
  id:            string
  name:          string
  email:         string
  phone:         string
  avatar:        string
  role:          string
  countryCode:   string
  city:          string
  loyaltyPoints: number
  loyaltyTier:   string
  joinedAt:      string
  totalBookings: number
  businessName?: string
  businessType?: string
}

export interface AuthState {
  user:            CurrentUser | null
  loading:         boolean
  isAuthenticated: boolean
  /** Call after successful login to sync hook state without a reload */
  refresh:         () => void
  /** Call on logout to clear the hook state */
  clear:           () => void
}

function readFromStorage(): CurrentUser | null {
  try {
    const raw   = typeof window !== 'undefined' ? localStorage.getItem('vt_user')  : null
    const token = typeof window !== 'undefined' ? localStorage.getItem('vt_token') : null
    if (!raw || !token) return null
    const parsed = JSON.parse(raw) as CurrentUser
    // Minimal sanity check — must have id + email + role
    if (!parsed?.id || !parsed?.email || !parsed?.role) return null
    return parsed
  } catch {
    return null
  }
}

export function useCurrentUser(): AuthState {
  const [user,    setUser]    = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)

  const sync = useCallback(() => {
    const u = readFromStorage()
    setUser(u)
    setLoading(false)
  }, [])

  const clear = useCallback(() => {
    try {
      localStorage.removeItem('vt_user')
      localStorage.removeItem('vt_token')
    } catch { /* ignore */ }
    setUser(null)
    setLoading(false)
  }, [])

  useEffect(() => {
    sync()
    // Keep state in sync across tabs
    const handler = (e: StorageEvent) => {
      if (e.key === 'vt_user' || e.key === 'vt_token') sync()
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [sync])

  return {
    user,
    loading,
    isAuthenticated: !!user,
    refresh: sync,
    clear,
  }
}
