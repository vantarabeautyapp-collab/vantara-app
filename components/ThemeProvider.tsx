'use client'

/**
 * ThemeProvider
 * ─────────────────────────────────────────────────────────────────────────────
 * Manages dark / light mode for the entire app.
 *
 * - Persists preference to localStorage under 'vt_theme'
 * - Respects prefers-color-scheme on first visit
 * - Toggles the 'light' class on <html> (Tailwind class strategy)
 * - Exposes theme state + toggle via ThemeContext
 */

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextValue {
  theme:       Theme
  toggleTheme: () => void
  setTheme:    (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme:       'dark',
  toggleTheme: () => {},
  setTheme:    () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

const STORAGE_KEY = 'vt_theme'

function getInitialTheme(): Theme {
  // Read stored preference
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored === 'light' || stored === 'dark') return stored
    // Fall back to OS preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  }
  return 'dark'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'light') {
    root.classList.add('light')
    root.classList.remove('dark')
  } else {
    root.classList.add('dark')
    root.classList.remove('light')
  }
  // Update meta theme-color
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'light' ? '#FAFAF7' : '#0A0A0A')
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // We start with 'dark' on server (avoids hydration mismatch).
  // The useEffect below applies the correct theme client-side before first paint.
  const [theme, setThemeState] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  // Apply correct theme immediately on mount (runs before first paint via useEffect)
  useEffect(() => {
    const initial = getInitialTheme()
    setThemeState(initial)
    applyTheme(initial)
    setMounted(true)
  }, [])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    applyTheme(newTheme)
    try { localStorage.setItem(STORAGE_KEY, newTheme) } catch { /* ignore quota errors */ }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {/* Prevent flash of wrong theme on initial render */}
      <style suppressHydrationWarning>{`
        html { visibility: ${mounted ? 'visible' : 'hidden'} }
      `}</style>
      {children}
    </ThemeContext.Provider>
  )
}
