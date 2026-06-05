/**
 * Client-side error reporter.
 * Sends errors to /api/errors which logs them and forwards
 * high/critical issues to Linear for triaging.
 *
 * Usage:
 *   import { reportError } from '@/lib/error-reporter'
 *   reportError(new Error('Something broke'), 'CheckoutPage', 'high')
 */

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical'

export async function reportError(
  error: Error | string,
  context?: string,
  severity: ErrorSeverity = 'medium',
): Promise<void> {
  // Never throws — error reporting must not cause more errors
  try {
    const message = typeof error === 'string' ? error : error.message
    const stack   = typeof error === 'string' ? undefined : error.stack

    await fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        stack,
        context,
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        severity,
      }),
    })
  } catch {
    // Silently ignore — we're already in an error state
  }
}

/**
 * Wraps an async function to auto-report errors.
 *
 * Usage:
 *   const result = await withErrorReporting(
 *     () => doSomethingRisky(),
 *     'PaymentPage',
 *     'critical'
 *   )
 */
export async function withErrorReporting<T>(
  fn: () => Promise<T>,
  context?: string,
  severity: ErrorSeverity = 'medium',
): Promise<T | null> {
  try {
    return await fn()
  } catch (err) {
    await reportError(err instanceof Error ? err : new Error(String(err)), context, severity)
    return null
  }
}

/**
 * Attach a global window.onerror listener to catch unhandled JS errors.
 * Call once from your root layout or _app.
 */
export function initGlobalErrorReporting(): void {
  if (typeof window === 'undefined') return

  window.addEventListener('error', event => {
    reportError(
      event.error ?? new Error(event.message),
      `${event.filename}:${event.lineno}`,
      'high',
    )
  })

  window.addEventListener('unhandledrejection', event => {
    const reason = event.reason
    const err = reason instanceof Error ? reason : new Error(String(reason))
    reportError(err, 'unhandledrejection', 'high')
  })
}
