'use client'

/**
 * Analytics Provider — PostHog + Google Analytics 4
 *
 * Environment variables:
 *   NEXT_PUBLIC_POSTHOG_KEY       — PostHog project key (e.g. phc_xxx)
 *   NEXT_PUBLIC_POSTHOG_HOST      — PostHog host (default: https://app.posthog.com)
 *   NEXT_PUBLIC_GA4_MEASUREMENT_ID — GA4 stream ID (e.g. G-XXXXXXXXXX)
 *
 * Mounted once in app/layout.tsx inside a <Suspense> boundary.
 */

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { initGlobalErrorReporting } from '@/lib/error-reporter'

// ─── PostHog lightweight integration ────────────────────────────────────────
function usePostHog() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!key || typeof window === 'undefined') return

    // Lazy-load posthog-js only if configured
    import('posthog-js').then(({ default: posthog }) => {
      if (!posthog.__loaded) {
        posthog.init(key, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
          capture_pageview: false, // We handle this manually
          persistence: 'localStorage',
          autocapture: false,
          disable_session_recording: true,
          ip: false, // IP anonymization
          loaded: ph => {
            if (process.env.NODE_ENV !== 'production') ph.debug()
          },
        })
      }
      const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
      posthog.capture('$pageview', { $current_url: window.location.origin + url })
    }).catch(() => {})
  }, [pathname, searchParams])
}

// ─── GA4 pageview helper ─────────────────────────────────────────────────────
function useGA4() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const GA_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID

  useEffect(() => {
    if (!GA_ID || typeof window === 'undefined') return
    const gtag = (window as any).gtag
    if (typeof gtag !== 'function') return
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    gtag('event', 'page_view', {
      page_path: url,
      send_to: GA_ID,
    })
  }, [pathname, searchParams, GA_ID])
}

// ─── Global error reporting init ─────────────────────────────────────────────
function useErrorReporting() {
  useEffect(() => {
    initGlobalErrorReporting()
  }, [])
}

// ─── Main component ──────────────────────────────────────────────────────────
export function Analytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID

  usePostHog()
  useGA4()
  useErrorReporting()

  return (
    <>
      {GA_ID && (
        <>
          {/* Google Analytics 4 */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
                anonymize_ip: true,
                send_page_view: false
              });
            `}
          </Script>
        </>
      )}
    </>
  )
}

export default Analytics
