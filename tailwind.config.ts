import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Class-based dark mode — toggled by adding/removing 'dark' class on <html>
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Brand colours (static, both themes) ──────────────────────────────
        gold: {
          DEFAULT: '#C9A84C',
          light:   '#E8C97D',
          dim:     '#A07835',
          subtle:  '#3A2F10',
        },
        emerald: {
          brand:  '#1A7A4A',
          light:  '#22A863',
          dim:    '#115234',
          subtle: '#0D2B1A',
        },
        royal: {
          DEFAULT: '#8B21A8',
          light:   '#B44FD4',
          dim:     '#5B1470',
          subtle:  '#2D0A38',
        },

        // ── Semantic tokens — resolved from CSS variables ─────────────────────
        // Dark values are set in :root, light values in .light class
        background: 'var(--color-background)',
        surface: {
          DEFAULT:  'var(--color-surface)',
          elevated: 'var(--color-surface-elevated)',
          hover:    'var(--color-surface-hover)',
          card:     'var(--color-surface-card)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          subtle:  'var(--color-border-subtle)',
          gold:    'var(--color-border-gold)',
        },
        text: {
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted:     'var(--color-text-muted)',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        inter:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient':    'linear-gradient(135deg, #C9A84C 0%, #E8C97D 50%, #A07835 100%)',
        'emerald-gradient': 'linear-gradient(135deg, #115234 0%, #1A7A4A 50%, #22A863 100%)',
        'royal-gradient':   'linear-gradient(135deg, #5B1470 0%, #8B21A8 50%, #B44FD4 100%)',
        'vantara-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C97D 45%, #B44FD4 75%, #8B21A8 100%)',
        'hero-gradient':    'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(201,168,76,0.12) 0%, rgba(139,33,168,0.08) 50%, transparent 70%)',
        'card-gradient':    'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        'dark-gradient':    'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
      },
      boxShadow: {
        gold:         '0 0 30px rgba(201, 168, 76, 0.2)',
        'gold-sm':    '0 0 12px rgba(201, 168, 76, 0.15)',
        card:         '0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.4)',
        'card-light': '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
        'glow-emerald':    '0 0 30px rgba(26, 122, 74, 0.3)',
        'glow-royal':      '0 0 30px rgba(139, 33, 168, 0.35)',
        'glow-royal-sm':   '0 0 14px rgba(139, 33, 168, 0.25)',
      },
      animation: {
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        float:        'float 6s ease-in-out infinite',
        shimmer:      'shimmer 2s linear infinite',
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'theme-in':   'themeIn 0.25s ease-out forwards',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        themeIn: {
          from: { opacity: '0.8' },
          to:   { opacity: '1' },
        },
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke',
      },
    },
  },
  plugins: [],
}
export default config
