'use client'

/**
 * /auth/callback
 * Receives the OAuth handoff cookies set by /api/auth/google/callback,
 * moves them to localStorage (matching the existing email/password auth flow),
 * clears the cookies, and redirects to the final destination.
 */

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Logo, { LogoIcon } from '@/components/Logo'

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`
}

export default function OAuthCallbackPage() {
  const router      = useRouter()
  const params      = useSearchParams()
  const destination = params.get('to') ?? '/home'

  useEffect(() => {
    const token    = getCookie('vt_oauth_token')
    const userJson = getCookie('vt_oauth_user')

    if (!token || !userJson) {
      router.replace('/login?error=oauth_timeout')
      return
    }

    // Persist to localStorage (existing auth mechanism)
    localStorage.setItem('vt_token', token)
    localStorage.setItem('vt_user',  userJson)

    // Clean up handoff cookies
    deleteCookie('vt_oauth_token')
    deleteCookie('vt_oauth_user')

    // Navigate to destination
    router.replace(destination)
  }, [destination, router])

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-6">
      <LogoIcon size={40} />
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-text-muted text-sm">Signing you in&hellip;</p>
      </div>
    </div>
  )
}
