'use client'

import React from 'react'
import Link from 'next/link'
import { reportError } from '@/lib/error-reporter'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

/**
 * React Error Boundary — catches runtime errors in the React tree,
 * reports them to Linear via /api/errors, and shows a graceful fallback.
 *
 * Must be a class component (React limitation for error boundaries).
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    reportError(
      error,
      `React component tree:\n${errorInfo.componentStack?.slice(0, 400) ?? 'unknown'}`,
      'high',
    )
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">⚠️</span>
            </div>
            <h1 className="font-playfair text-2xl font-bold text-text-primary mb-3">
              Something went wrong
            </h1>
            <p className="text-text-muted text-sm mb-2">
              An unexpected error occurred. Our team has been notified and will fix it soon.
            </p>
            {process.env.NODE_ENV !== 'production' && this.state.error && (
              <pre className="text-left text-xs text-red-400 bg-red-500/5 border border-red-500/10 rounded-xl p-4 mb-6 overflow-auto max-h-40">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={this.handleRetry}
                className="btn-gold rounded-xl px-6 py-2.5 text-sm font-semibold"
              >
                Try Again
              </button>
              <Link href="/" className="btn-outline-gold rounded-xl px-6 py-2.5 text-sm font-semibold">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
