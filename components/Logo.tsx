'use client'

import Image from 'next/image'
import { useState } from 'react'

// ─── Vantara Icon Mark (SVG) ─────────────────────────────────────────────────
// Used when the PNG is unavailable or at very small sizes.
// Captures the V + crown + woman silhouette essence of the Vantara brand.
export function VantaraIcon({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      fill="none"
      width={size}
      height={size}
      className={className}
      aria-label="Vantara"
    >
      <defs>
        <linearGradient id="vGold" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8C97D"/>
          <stop offset="50%" stopColor="#C9A84C"/>
          <stop offset="100%" stopColor="#B8912A"/>
        </linearGradient>
        <linearGradient id="vPurple" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B44FD4"/>
          <stop offset="100%" stopColor="#8B21A8"/>
        </linearGradient>
        <radialGradient id="vBg" cx="100" cy="80" r="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1C1010"/>
          <stop offset="100%" stopColor="#080808"/>
        </radialGradient>
      </defs>

      {/* Background */}
      <circle cx="100" cy="100" r="100" fill="url(#vBg)"/>

      {/* Purple arch / crescent (behind V) */}
      <path
        d="M60 155 C60 115 70 90 100 80 C130 90 140 115 140 155"
        stroke="url(#vPurple)" strokeWidth="8" fill="none"
        strokeLinecap="round"
      />

      {/* V letterform (serif-style, bold) */}
      <path
        d="M38 50 L70 148 L100 88 L130 148 L162 50"
        stroke="url(#vGold)" strokeWidth="12" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
      />

      {/* Woman silhouette inside V (simplified face + flowing hair) */}
      {/* Face */}
      <ellipse cx="100" cy="95" rx="9" ry="11" fill="url(#vGold)" opacity="0.85"/>
      {/* Hair flowing right */}
      <path d="M109 88 C120 82 135 90 138 108 C135 100 125 98 109 102"
        fill="url(#vGold)" opacity="0.7"/>
      {/* Neck / shoulder */}
      <path d="M93 106 C92 114 90 120 88 124" stroke="url(#vGold)" strokeWidth="2.5" fill="none" opacity="0.7"/>

      {/* Crown above V */}
      {/* Crown base */}
      <rect x="78" y="35" width="44" height="8" rx="2" fill="url(#vGold)"/>
      {/* Crown points */}
      <polygon points="78,35 83,20 88,35" fill="url(#vGold)"/>
      <polygon points="96,35 100,17 104,35" fill="url(#vGold)"/>
      <polygon points="112,35 117,20 122,35" fill="url(#vGold)"/>
      {/* Crown gem */}
      <path d="M100 22 L103 27 L100 32 L97 27 Z" fill="url(#vPurple)"/>

      {/* Outer decorative ring */}
      <circle cx="100" cy="100" r="94" stroke="url(#vGold)" strokeWidth="1" opacity="0.4"/>
    </svg>
  )
}

// ─── Full Logo (PNG image with text fallback) ─────────────────────────────────
interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'full' | 'icon' | 'wordmark'
  className?: string
  /** Use the actual PNG logo from /public/vantara-logo.png */
  usePng?: boolean
}

const sizes = {
  xs: { icon: 24,  logoH: 28,  textClass: 'text-sm',  subClass: 'text-[8px]'  },
  sm: { icon: 32,  logoH: 36,  textClass: 'text-base', subClass: 'text-[9px]'  },
  md: { icon: 40,  logoH: 44,  textClass: 'text-xl',  subClass: 'text-[10px]' },
  lg: { icon: 52,  logoH: 60,  textClass: 'text-2xl', subClass: 'text-[11px]' },
  xl: { icon: 72,  logoH: 80,  textClass: 'text-4xl', subClass: 'text-xs'     },
}

function PngLogo({ height, className = '' }: { height: number; className?: string }) {
  const [errored, setErrored] = useState(false)
  if (errored) return null
  return (
    <Image
      src="/vantara-logo.png"
      alt="Vantara"
      height={height}
      width={Math.round(height * 1.0)} // ~1:1 ratio for the square logo
      className={`object-contain ${className}`}
      onError={() => setErrored(true)}
      priority
      unoptimized
    />
  )
}

/** Wordmark text fallback (used when PNG not available or in text-only contexts) */
function WordmarkText({ textClass, subClass }: { textClass: string; subClass: string }) {
  return (
    <div className="flex flex-col leading-none">
      <span
        className={`font-playfair font-bold tracking-[0.12em] uppercase ${textClass}`}
        style={{
          background: 'linear-gradient(135deg, #E8C97D 0%, #C9A84C 45%, #B44FD4 75%, #8B21A8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Vantara
      </span>
      <span className={`tracking-[0.22em] uppercase font-medium mt-0.5 ${subClass}`} style={{ color: 'rgba(201,168,76,0.55)' }}>
        Discover. Book. Glow.
      </span>
    </div>
  )
}

export default function Logo({ size = 'md', variant = 'full', className = '', usePng = true }: LogoProps) {
  const s = sizes[size]

  if (variant === 'icon') {
    return usePng
      ? <PngLogo height={s.icon} className={className} />
      : <VantaraIcon size={s.icon} className={className} />
  }

  if (variant === 'wordmark') {
    return <WordmarkText textClass={s.textClass} subClass={s.subClass} />
  }

  // Full: icon + text side by side
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {usePng
        ? <PngLogo height={s.logoH} />
        : <VantaraIcon size={s.icon} />
      }
      <WordmarkText textClass={s.textClass} subClass={s.subClass} />
    </div>
  )
}

// Named export alias for backward compatibility
export { VantaraIcon as LogoIcon }
