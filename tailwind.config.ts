import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Primary — Terracotta & Sienna ──────────────────────────────────
        terracotta: {
          DEFAULT: '#A64B2A',
          light:   '#C56A3D',
          dark:    '#7A3520',
          subtle:  '#2E1208',
        },

        // ── Accent — Warm Gold (earthy amber) ──────────────────────────────
        gold: {
          DEFAULT: '#D4A24C',
          light:   '#E8BA6A',
          dim:     '#9A7030',
          subtle:  '#2E2010',
        },

        // ── Energy — Sunset Orange ─────────────────────────────────────────
        sunset: {
          DEFAULT: '#E07A2D',
          light:   '#F0924A',
          dim:     '#B05820',
          subtle:  '#2E1A08',
        },

        // ── Secondary — Baobab Green & Savannah Olive ──────────────────────
        emerald: {
          brand:  '#556B2F',
          light:  '#6E8A3A',
          dim:    '#3A4A20',
          subtle: '#1A2010',
        },

        // ── Deep Earth (warm earth brown accent) ───────────────────────────
        royal: {
          DEFAULT: '#8B4513',
          light:   '#A05C28',
          dim:     '#5C2D0A',
          subtle:  '#200E04',
        },

        // ── Neutrals ───────────────────────────────────────────────────────
        sand: {
          beige: '#E7D7B8',
          clay:  '#D8C2A3',
          warm:  '#F4EDE0',
          ivory: '#FBF7F0',
        },

        // ── Semantic tokens — resolved from CSS variables ──────────────────
        background: 'var(--color-background)',
        surface: {
          DEFAULT:  'var(--color-surface)',
          elevated: 'var(--color-surface-elevated)',
          hover:    'var(--color-surface-hover)',
          card:     'var(--color-surface-card)',
        },
        border: {
          DEFAULT:    'var(--color-border)',
          subtle:     'var(--color-border-subtle)',
          gold:       'var(--color-border-gold)',
          terracotta: 'var(--color-border-terracotta)',
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
        // Primary brand gradients
        'terracotta-gradient': 'linear-gradient(135deg, #7A3520 0%, #A64B2A 50%, #C56A3D 100%)',
        'sunset-gradient':     'linear-gradient(135deg, #A64B2A 0%, #E07A2D 60%, #C56A3D 100%)',
        'gold-gradient':       'linear-gradient(135deg, #9A7030 0%, #D4A24C 50%, #E8BA6A 100%)',
        'earth-gradient':      'linear-gradient(135deg, #A64B2A 0%, #D4A24C 45%, #E07A2D 75%, #C56A3D 100%)',

        // Section backgrounds
        'hero-gradient':    'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(166,75,42,0.18) 0%, rgba(224,122,45,0.08) 50%, transparent 70%)',
        'earth-dark':       'linear-gradient(180deg, #120D08 0%, #1C1208 100%)',
        'sand-light':       'linear-gradient(180deg, #FBF7F0 0%, #F4EDE0 100%)',
        'vantara-gradient': 'linear-gradient(135deg, #A64B2A 0%, #D4A24C 40%, #E07A2D 70%, #C56A3D 100%)',

        // Card backgrounds
        'card-gradient':    'linear-gradient(135deg, rgba(255,240,220,0.04) 0%, rgba(255,240,220,0.01) 100%)',
        'dark-gradient':    'linear-gradient(180deg, #120D08 0%, #1C1208 100%)',

        // Sunset atmospheric
        'sunset-glow':      'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(166,75,42,0.2) 0%, rgba(224,122,45,0.1) 50%, transparent 70%)',
        'baobab-gradient':  'linear-gradient(135deg, #3A4A20 0%, #556B2F 50%, #6E8A3A 100%)',

        // Legacy aliases kept for compatibility
        'emerald-gradient': 'linear-gradient(135deg, #3A4A20 0%, #556B2F 50%, #6E8A3A 100%)',
        'royal-gradient':   'linear-gradient(135deg, #5C2D0A 0%, #8B4513 50%, #A05C28 100%)',
      },

      boxShadow: {
        // Earth-warm glows
        gold:             '0 0 32px rgba(212,162,76,0.25)',
        'gold-sm':        '0 0 14px rgba(212,162,76,0.18)',
        terracotta:       '0 0 32px rgba(166,75,42,0.35)',
        'terracotta-sm':  '0 0 14px rgba(166,75,42,0.25)',
        sunset:           '0 0 28px rgba(224,122,45,0.3)',
        card:             '0 1px 0 rgba(255,240,220,0.04), 0 4px 28px rgba(0,0,0,0.55)',
        'card-light':     '0 1px 3px rgba(60,20,0,0.08), 0 4px 16px rgba(60,20,0,0.07)',
        'glow-emerald':   '0 0 28px rgba(85,107,47,0.3)',
        'glow-royal':     '0 0 28px rgba(139,69,19,0.3)',
        'glow-royal-sm':  '0 0 14px rgba(139,69,19,0.2)',
        // Organic card shadow (warmer than pure black)
        'organic':        '0 4px 6px rgba(60,20,0,0.07), 0 12px 32px rgba(60,20,0,0.12)',
      },

      animation: {
        'pulse-gold':      'pulseGold 2s ease-in-out infinite',
        'earth-glow':      'earthGlow 3s ease-in-out infinite',
        float:             'float 6s ease-in-out infinite',
        shimmer:           'shimmer 2s linear infinite',
        'fade-up':         'fadeUp 0.6s ease-out forwards',
        'theme-in':        'themeIn 0.25s ease-out forwards',
        'pattern-drift':   'patternDrift 20s linear infinite',
      },

      keyframes: {
        pulseGold: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.7' },
        },
        earthGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(166,75,42,0.2)' },
          '50%':      { boxShadow: '0 0 40px rgba(224,122,45,0.35)' },
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
        patternDrift: {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '72px 72px' },
        },
      },

      transitionProperty: {
        theme: 'background-color, border-color, color, fill, stroke',
      },
    },
  },
  plugins: [],
}

export default config
