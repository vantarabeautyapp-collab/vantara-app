'use client'

/**
 * ThemeToggle
 * Premium animated sun / moon toggle with smooth SVG morphing.
 */

import { useTheme } from './ThemeProvider'

interface Props {
  className?: string
  size?: 'sm' | 'md'
}

export function ThemeToggle({ className = '', size = 'md' }: Props) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const dim  = size === 'sm' ? 32 : 36
  const pad  = size === 'sm' ? 'p-1.5' : 'p-2'
  const icon = size === 'sm' ? 16  : 18

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`
        relative flex items-center justify-center rounded-xl
        border transition-all duration-200 select-none
        ${pad}
        ${isDark
          ? 'border-border bg-surface hover:border-gold/30 hover:bg-surface-hover'
          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-gold/40 hover:bg-[var(--color-surface-hover)]'
        }
        ${className}
      `}
      style={{ width: dim, height: dim }}
    >
      {isDark ? (
        /* Moon icon — dark mode */
        <svg
          width={icon} height={icon} viewBox="0 0 24 24"
          fill="none" stroke="currentColor"
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          className="text-gold transition-transform duration-300 rotate-0"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        /* Sun icon — light mode */
        <svg
          width={icon} height={icon} viewBox="0 0 24 24"
          fill="none" stroke="currentColor"
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          className="text-[#C9A84C] transition-transform duration-300"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )}
    </button>
  )
}
