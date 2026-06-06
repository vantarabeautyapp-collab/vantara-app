'use client'

/**
 * <AuthGuard>
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps any subtree that requires an authenticated user.
 *
 *  • Shows a branded loading spinner until localStorage is read (< 1 frame)
 *  • Redirects to /login?from=<pathname> when not authenticated
 *  • Optionally enforces a role (or list of roles) — redirects to
 *    /login?error=unauthorized if the role doesn't match
 *  • Renders {children} only when the user is authenticated (and authorised)
 *
 * Place it in a route layout so every page in that group is protected:
 *
 *   // app/(customer)/layout.tsx
 *   import AuthGuard from '@/components/AuthGuard'
 *   export default function CustomerLayout({ children }) {
 *     return <AuthGuard requiredRole="customer">{children}</AuthGuard>
 *   }
 */

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Crown } from 'lucide-react'
import { useCurrentUser } from '@/hooks/useCurrentUser'

interface AuthGuardProps {
  children:      React.ReactNode
  /** If specified, the user must have one of these roles */
  requiredRole?: string | string[]
  /** Where to redirect unauthenticated users (default: /login) */
  redirectTo?:   string
}

export default function AuthGuard({
  children,
  requiredRole,
  redirectTo = '/login',
}: AuthGuardProps) {
  const { user, loading, isAuthenticated } = useCurrentUser()
  const router   = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (loading) return

    // Not authenticated at all
    if (!isAuthenticated) {
      router.replace(`${redirectTo}?from=${encodeURIComponent(pathname)}`)
      return
    }

    // Role check
    if (requiredRole) {
      const allowed = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
      if (!allowed.includes(user!.role)) {
        router.replace(`${redirectTo}?error=unauthorized&from=${encodeURIComponent(pathname)}`)
        return
      }
    }
  }, [loading, isAuthenticated, user, router, pathname, redirectTo, requiredRole])

  // ── Loading state ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Crown size={32} className="text-gold animate-pulse" />
          <p className="text-sm text-text-muted tracking-wide">Loading…</p>
        </div>
      </div>
    )
  }

  // ── Not authenticated — show nothing while redirect fires ────────────────
  if (!isAuthenticated) return null

  // ── Wrong role — show nothing while redirect fires ───────────────────────
  if (requiredRole) {
    const allowed = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
    if (!allowed.includes(user!.role)) return null
  }

  return <>{children}</>
}
