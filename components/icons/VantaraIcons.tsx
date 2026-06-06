/**
 * Vantara Icon System
 * ─────────────────────────────────────────────────────────────────────────────
 * 34 proprietary icons designed for the Vantara brand.
 *
 * Grid:          24×24 (scalable via `size` prop)
 * Stroke:        1.5px default · round linecap · round linejoin
 * Brand motifs:  V-shape peaks · crown geometry · beauty-precision curves
 *
 * Colors:
 *   Royal Gold  #D4AF37
 *   Deep Violet #5B2A86
 *   Black       #0B0B0B
 *   White       #FFFFFF
 *
 * Usage:
 *   import { HomeIcon, DiscoverIcon } from '@/components/icons/VantaraIcons'
 *   <HomeIcon size={32} variant="gold" />
 *   <HomeIcon size={24} color="#D4AF37" />
 */

export interface IconProps {
  size?:        number
  color?:       string
  strokeWidth?: number
  className?:   string
  /** Preset colour variants */
  variant?:     'default' | 'gold' | 'violet' | 'dark' | 'white'
  /** For filled/accent icons */
  fill?:        string
}

const VARIANT_COLOR: Record<string, string> = {
  default: 'currentColor',
  gold:    '#D4AF37',
  violet:  '#5B2A86',
  dark:    '#0B0B0B',
  white:   '#FFFFFF',
}

function resolveColor(props: IconProps): string {
  if (props.color) return props.color
  if (props.variant) return VARIANT_COLOR[props.variant] ?? 'currentColor'
  return 'currentColor'
}

/** Shared SVG wrapper keeps stroke attributes consistent across every icon */
function V({
  size = 24, color = 'currentColor', strokeWidth = 1.5, className = '', children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  NAVIGATION  (5 icons)
// ─────────────────────────────────────────────────────────────────────────────

/** V-roofed house — the V peak is the Vantara signature */
export function HomeIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* V-shaped roof ridge */}
      <path d="M3 12L12 3L21 12" />
      {/* House walls */}
      <path d="M5 10.5V20.5C5 20.78 5.22 21 5.5 21H9.5V15.5H14.5V21H18.5C18.78 21 19 20.78 19 20.5V10.5" />
      {/* V-accent above door */}
      <path d="M10 14.5L12 12.5L14 14.5" />
    </V>
  )
}

/** Geometric hexagonal lens — precision discovery tool */
export function DiscoverIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Hexagonal search frame */}
      <path d="M11 3C6.58 3 3 6.58 3 11C3 15.42 6.58 19 11 19C15.42 19 19 15.42 19 11C19 6.58 15.42 3 11 3Z" />
      {/* V-pointer compass inside */}
      <path d="M8.5 9.5L11 13L13.5 9.5" />
      {/* Handle with angle */}
      <path d="M16.5 16.5L21 21" />
    </V>
  )
}

/** Calendar with V-checkmark — booking confirmed aesthetic */
export function BookingsIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Calendar body */}
      <rect x="3" y="4" width="18" height="18" rx="2.5" />
      {/* Header bar */}
      <path d="M3 9H21" />
      {/* Peg straps */}
      <path d="M8 2V6M16 2V6" />
      {/* V-checkmark in grid */}
      <path d="M8.5 14.5L11 17L15.5 12.5" />
    </V>
  )
}

/** Rounded 3-peak crown — signature reward motif */
export function RewardsIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Crown silhouette with V-centre peak */}
      <path d="M3.5 17H20.5L19.5 11L16 14L12 6L8 14L4.5 11L3.5 17Z" />
      {/* Base band */}
      <path d="M3.5 17C3.5 18.38 4.62 19.5 6 19.5H18C19.38 19.5 20.5 18.38 20.5 17" />
      {/* Centre gem */}
      <circle cx="12" cy="6" r="1" fill={resolveColor(p)} stroke="none" />
      {/* Flanking gems */}
      <circle cx="4.5" cy="11" r="0.75" fill={resolveColor(p)} stroke="none" />
      <circle cx="19.5" cy="11" r="0.75" fill={resolveColor(p)} stroke="none" />
    </V>
  )
}

/** Stylised head silhouette with crown-halo arc above */
export function ProfileIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Head */}
      <circle cx="12" cy="8" r="4.5" />
      {/* Shoulder curve */}
      <path d="M4.5 21C4.5 17.41 7.91 14.5 12 14.5C16.09 14.5 19.5 17.41 19.5 21" />
      {/* Crown halo — V-arc above head */}
      <path d="M9 3.5L12 1.5L15 3.5" />
    </V>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  DISCOVERY  (6 icons)
// ─────────────────────────────────────────────────────────────────────────────

/** Location pin with inner pulse ring */
export function NearbyIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Pin body */}
      <path d="M12 2C8.13 2 5 5.13 5 9C5 13.25 12 22 12 22C12 22 19 13.25 19 9C19 5.13 15.87 2 12 2Z" />
      {/* Inner dot */}
      <circle cx="12" cy="9" r="2.5" />
    </V>
  )
}

/** Pentagon shield with confident V-checkmark inside */
export function VerifiedIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Shield */}
      <path d="M12 2L4 5.5V11C4 15.52 7.4 19.74 12 21C16.6 19.74 20 15.52 20 11V5.5L12 2Z" />
      {/* V-check */}
      <path d="M8 11L10.5 14L16.5 8.5" />
    </V>
  )
}

/** Five-point star with mini crown tip at apex */
export function TopRatedIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Star */}
      <path d="M12 2L14.39 8.26L21 9.27L16.5 13.64L17.77 20.23L12 17.27L6.23 20.23L7.5 13.64L3 9.27L9.61 8.26L12 2Z" />
      {/* Crown peak above star tip */}
      <path d="M10 4.5L12 2.5L14 4.5" />
    </V>
  )
}

/** Rising step chart with upward arrow — growth signal */
export function TrendingIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Trend line */}
      <path d="M4 18L8.5 12.5L12.5 15.5L19 7.5" />
      {/* Arrow head */}
      <path d="M15.5 7.5H19V11" />
      {/* Baseline */}
      <path d="M4 21H20" strokeOpacity="0.3" />
      {/* Sparkle — 4-point star */}
      <path d="M3 9L3.8 7L4.6 9L3 10.2L4.6 11L3.8 13L3 11L1.4 10.2Z" fill={resolveColor(p)} stroke="none" />
    </V>
  )
}

/** Faceted diamond gem — premium tier marker */
export function PremiumIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Diamond outline */}
      <path d="M12 3L20 9.5L12 22L4 9.5L12 3Z" />
      {/* Girdle line */}
      <path d="M4 9.5H20" />
      {/* Upper facets */}
      <path d="M8 6.5L12 9.5L16 6.5" />
      {/* Lower facets */}
      <path d="M8.5 12.5L12 22M15.5 12.5L12 22" strokeOpacity="0.4" />
    </V>
  )
}

/** Triple-peak crown with radiating prestige lines */
export function EliteIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Crown body with prominent V centre */}
      <path d="M2 17H22L21 11L17 14.5L12 4L7 14.5L3 11L2 17Z" />
      {/* Base band */}
      <path d="M2 17C2 18.1 2.9 19 4 19H20C21.1 19 22 18.1 22 17" />
      {/* Top radiant line */}
      <path d="M12 1V3.5" />
      {/* Left/right radiant lines */}
      <path d="M5 6.5L6.5 8" strokeOpacity="0.5" />
      <path d="M19 6.5L17.5 8" strokeOpacity="0.5" />
    </V>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  SERVICES  (8 icons)
// ─────────────────────────────────────────────────────────────────────────────

/** Open scissors with blade geometry */
export function HaircutIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Blade 1 */}
      <line x1="7" y1="6" x2="14" y2="12" />
      <circle cx="5.5" cy="5.5" r="2.5" />
      {/* Blade 2 */}
      <line x1="17" y1="6" x2="10" y2="12" />
      <circle cx="18.5" cy="5.5" r="2.5" />
      {/* Pivot */}
      <circle cx="12" cy="12" r="1" fill={resolveColor(p)} stroke="none" />
      {/* Handle arms */}
      <path d="M8.5 13.5L6.5 18.5" />
      <path d="M15.5 13.5L17.5 18.5" />
    </V>
  )
}

/** Straight-razor silhouette — barber precision */
export function BarberIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Blade body */}
      <path d="M4 10H18C18.55 10 19 10.45 19 11V13C19 13.55 18.55 14 18 14H4L3 12L4 10Z" />
      {/* Handle */}
      <path d="M19 11H21V13H19" />
      {/* Spine line */}
      <path d="M4.5 12H18" strokeOpacity="0.35" />
      {/* Brand V-notch on blade */}
      <path d="M8 10.5L9.5 12L8 13.5" strokeOpacity="0.6" />
    </V>
  )
}

/** Lipstick tube with sparkle tip */
export function MakeupIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Tube body */}
      <rect x="9.5" y="9" width="5" height="12" rx="1.5" />
      {/* Cap */}
      <path d="M9.5 9H14.5V7C14.5 6.45 14.05 6 13.5 6H10.5C9.95 6 9.5 6.45 9.5 7V9Z" />
      {/* Angled lipstick tip */}
      <path d="M9.5 6L12 3.5L14.5 6" />
      {/* Sparkle lines */}
      <path d="M17 4L18.5 2.5" strokeOpacity="0.7" />
      <path d="M18 6.5H20" strokeOpacity="0.5" />
      <path d="M17 9L18.5 10.5" strokeOpacity="0.4" />
    </V>
  )
}

/** Stylised fingertip with polished nail highlight */
export function NailsIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Fingertip shape */}
      <path d="M8 15V10C8 8.9 8.9 8 10 8H14C15.1 8 16 8.9 16 10V15L14 20H10L8 15Z" />
      {/* Nail plate */}
      <path d="M9.5 10H14.5V12.5C14.5 13.33 13.83 14 13 14H11C10.17 14 9.5 13.33 9.5 12.5V10Z" />
      {/* V-shine line on nail */}
      <path d="M10.5 10.8L11.5 11.8" strokeOpacity="0.6" />
      {/* Cuticle arc */}
      <path d="M9.5 10C9.5 9.17 10.62 8.5 12 8.5C13.38 8.5 14.5 9.17 14.5 10" />
    </V>
  )
}

/** Three-strand braid weave pattern */
export function BraidsIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Left strand — weaves behind centre */}
      <path d="M7 3C7 3 10 6.5 8 9C6 11.5 9 14 8 17C7 20 7 21 7 21" />
      {/* Centre strand — vertical spine */}
      <path d="M12 3V21" />
      {/* Right strand — mirrors left */}
      <path d="M17 3C17 3 14 6.5 16 9C18 11.5 15 14 16 17C17 20 17 21 17 21" />
      {/* Crossover ties */}
      <path d="M8 7.5L12 9.5L16 7.5" strokeOpacity="0.4" />
      <path d="M8 13.5L12 15.5L16 13.5" strokeOpacity="0.4" />
    </V>
  )
}

/** Lotus blossom — spa & wellness serenity */
export function SpaIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Centre petal */}
      <path d="M12 4C12 4 9 7 9 10.5C9 12.43 10.34 14 12 14C13.66 14 15 12.43 15 10.5C15 7 12 4 12 4Z" />
      {/* Left petal */}
      <path d="M9 10.5C9 10.5 6 9 4.5 11C3.5 12.35 4 14 5.5 14.8C7 15.6 9 15 9 15" />
      {/* Right petal */}
      <path d="M15 10.5C15 10.5 18 9 19.5 11C20.5 12.35 20 14 18.5 14.8C17 15.6 15 15 15 15" />
      {/* Stem */}
      <path d="M12 14V20" />
      {/* Water line */}
      <path d="M7 20C7 20 9.5 18.5 12 20C14.5 21.5 17 20 17 20" />
    </V>
  )
}

/** Wide-tooth comb with V-arch spine */
export function GroomingIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Spine arc — V curve */}
      <path d="M4 6C4 6 8 10 12 10C16 10 20 6 20 6" />
      {/* Outer frame */}
      <path d="M4 6V18C4 18.55 4.45 19 5 19H19C19.55 19 20 18.55 20 18V6" />
      {/* Teeth */}
      <line x1="7" y1="10" x2="7" y2="16" />
      <line x1="9.5" y1="10" x2="9.5" y2="16" />
      <line x1="12" y1="10" x2="12" y2="16" />
      <line x1="14.5" y1="10" x2="14.5" y2="16" />
      <line x1="17" y1="10" x2="17" y2="16" />
    </V>
  )
}

/** Radiating face with symmetrical glow dots */
export function SkincareIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Face circle */}
      <circle cx="12" cy="12" r="7.5" />
      {/* Eyes */}
      <circle cx="9.5" cy="10.5" r="1" fill={resolveColor(p)} stroke="none" />
      <circle cx="14.5" cy="10.5" r="1" fill={resolveColor(p)} stroke="none" />
      {/* Smile arc */}
      <path d="M9 14C9 14 10 16 12 16C14 16 15 14 15 14" />
      {/* Glow dots — radiate outward from face */}
      <circle cx="12" cy="3" r="0.75" fill={resolveColor(p)} stroke="none" />
      <circle cx="12" cy="21" r="0.75" fill={resolveColor(p)} stroke="none" />
      <circle cx="3" cy="12" r="0.75" fill={resolveColor(p)} stroke="none" />
      <circle cx="21" cy="12" r="0.75" fill={resolveColor(p)} stroke="none" />
      <circle cx="5.5" cy="5.5" r="0.6" fill={resolveColor(p)} stroke="none" />
      <circle cx="18.5" cy="5.5" r="0.6" fill={resolveColor(p)} stroke="none" />
      <circle cx="5.5" cy="18.5" r="0.6" fill={resolveColor(p)} stroke="none" />
      <circle cx="18.5" cy="18.5" r="0.6" fill={resolveColor(p)} stroke="none" />
    </V>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  BOOKING STATUS  (5 icons)
// ─────────────────────────────────────────────────────────────────────────────

/** Open hexagon frame — slot is ready */
export function AvailableIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      <path d="M12 2.5L19.5 6.75V15.25L12 19.5L4.5 15.25V6.75L12 2.5Z" />
      {/* Sparkle V inside */}
      <path d="M9 10L12 14L15 10" />
      {/* Small glow dot */}
      <circle cx="12" cy="14" r="1" fill={resolveColor(p)} stroke="none" />
    </V>
  )
}

/** Clock face — appointment waiting */
export function PendingIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      <circle cx="12" cy="12" r="9" />
      {/* Hour hand */}
      <path d="M12 7V12" />
      {/* Minute hand pointing forward */}
      <path d="M12 12L16.5 12" />
      {/* Tick marks at 12 and 3 */}
      <path d="M12 4V5.5M18.5 7.5L17.3 8.8" strokeOpacity="0.4" />
    </V>
  )
}

/** Rounded badge with V-checkmark — confirmed quality */
export function ConfirmedIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      {/* Bold V-check */}
      <path d="M7.5 12L10.5 15.5L16.5 8.5" />
    </V>
  )
}

/** Filled medal ring with V-star inside */
export function CompletedIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      <circle cx="12" cy="12" r="9" />
      {/* Star paths */}
      <path d="M12 7L13.3 10.5H17L14.2 12.7L15.3 16.2L12 14.2L8.7 16.2L9.8 12.7L7 10.5H10.7L12 7Z" />
    </V>
  )
}

/** Circle with clean X — cancelled status */
export function CancelledIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 8.5L15.5 15.5M15.5 8.5L8.5 15.5" />
    </V>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  REWARDS TIERS  (5 icons)
// ─────────────────────────────────────────────────────────────────────────────

/** Six-sided hexagon with centre star — points accumulate */
export function PointsIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      <path d="M12 2L19.5 6.5V15.5L12 20L4.5 15.5V6.5L12 2Z" />
      {/* Six-pointed centre star */}
      <path d="M12 7L13.2 10H16.4L13.9 11.9L14.8 15L12 13.3L9.2 15L10.1 11.9L7.6 10H10.8L12 7Z" />
    </V>
  )
}

/** Ridged shield — bronze tier foundation */
export function BronzeIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      <path d="M12 2L4 5.5V12C4 16.52 7.4 20.74 12 22C16.6 20.74 20 16.52 20 12V5.5L12 2Z" />
      {/* Three horizontal ridges */}
      <path d="M8 10H16" />
      <path d="M8 13H16" />
      <path d="M8 16H16" strokeOpacity="0.5" />
    </V>
  )
}

/** Faceted diamond outline — silver clarity */
export function SilverIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Diamond */}
      <path d="M12 2L20 9L12 22L4 9L12 2Z" />
      {/* Girdle */}
      <path d="M4 9H20" />
      {/* Top facets */}
      <path d="M8.5 5.5L12 9L15.5 5.5" />
      {/* Lower facet reflections */}
      <path d="M9 12L12 22M15 12L12 22" strokeOpacity="0.3" />
    </V>
  )
}

/** Crown with radiating star points — gold tier prestige */
export function GoldIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Crown */}
      <path d="M3.5 17H20.5L19.5 11L16 14L12 5L8 14L4.5 11L3.5 17Z" />
      {/* Base */}
      <path d="M3.5 17C3.5 18.38 4.62 19.5 6 19.5H18C19.38 19.5 20.5 18.38 20.5 17" />
      {/* Gem dots at crown peaks */}
      <circle cx="12" cy="5" r="1.2" fill={resolveColor(p)} stroke="none" />
      <circle cx="4.5" cy="11" r="1" fill={resolveColor(p)} stroke="none" />
      <circle cx="19.5" cy="11" r="1" fill={resolveColor(p)} stroke="none" />
      {/* Top radiant line */}
      <path d="M12 2V3.5" />
    </V>
  )
}

/** Multi-facet brilliant cut — diamond tier peak */
export function DiamondIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Outline */}
      <path d="M7 4H17L22 10.5L12 22L2 10.5L7 4Z" />
      {/* Table */}
      <path d="M7 4L9.5 8.5H14.5L17 4" />
      {/* Girdle */}
      <path d="M2 10.5H22" />
      {/* Star facets */}
      <path d="M9.5 8.5L2 10.5M14.5 8.5L22 10.5" strokeOpacity="0.35" />
      <path d="M9.5 8.5L12 22M14.5 8.5L12 22" strokeOpacity="0.35" />
    </V>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  PREMIUM FEATURES  (5 icons)
// ─────────────────────────────────────────────────────────────────────────────

/** Face + scan grid brackets — AI style analysis */
export function StyleMatchAIIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Face oval */}
      <ellipse cx="12" cy="12" rx="7" ry="8.5" />
      {/* Scan line */}
      <path d="M5 12H19" strokeOpacity="0.4" />
      {/* Corner scan brackets (top-left, top-right) */}
      <path d="M2 6V3H5" />
      <path d="M22 6V3H19" />
      {/* Corner brackets (bottom) */}
      <path d="M2 18V21H5" />
      <path d="M22 18V21H19" />
      {/* Eye dots */}
      <circle cx="9.5" cy="10.5" r="1" fill={resolveColor(p)} stroke="none" />
      <circle cx="14.5" cy="10.5" r="1" fill={resolveColor(p)} stroke="none" />
    </V>
  )
}

/** Open passport with V-brand stamp */
export function BeautyPassportIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Passport body */}
      <rect x="3" y="2.5" width="18" height="19" rx="2.5" />
      {/* Spine */}
      <path d="M12 2.5V21.5" />
      {/* V stamp on right page */}
      <path d="M14 8L16 13L18 8" />
      {/* Lines on left page */}
      <path d="M5 9H10.5" />
      <path d="M5 12H10.5" />
      <path d="M5 15H8" />
      {/* Star/seal top left */}
      <circle cx="7.5" cy="6" r="1.5" />
    </V>
  )
}

/** Speedometer gauge with star needle — score indicator */
export function StyleScoreIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Arc base */}
      <path d="M4 17.5C4 13.08 7.58 9.5 12 9.5C16.42 9.5 20 13.08 20 17.5" />
      {/* Scale ticks */}
      <path d="M4 17.5L5.5 16" strokeOpacity="0.4" />
      <path d="M20 17.5L18.5 16" strokeOpacity="0.4" />
      <path d="M12 9.5V11" strokeOpacity="0.4" />
      {/* Needle pointing high */}
      <path d="M12 17.5L15.5 12.5" strokeWidth="2" />
      {/* Pivot */}
      <circle cx="12" cy="17.5" r="1.5" fill={resolveColor(p)} stroke="none" />
      {/* Star above gauge */}
      <path d="M12 4L12.8 6.4H15.4L13.3 7.9L14.1 10.3L12 8.8L9.9 10.3L10.7 7.9L8.6 6.4H11.2L12 4Z" />
    </V>
  )
}

/** Wallet with sparkle burst — beauty currency */
export function GlowWalletIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Wallet body */}
      <rect x="2" y="7" width="20" height="14" rx="2.5" />
      {/* Card flap top */}
      <path d="M2 11H22" />
      {/* Coin pocket */}
      <circle cx="17" cy="15" r="2.5" />
      {/* Sparkle rays top-left */}
      <path d="M5 4L5.5 2.5" />
      <path d="M8 3L7 1.5" />
      <path d="M3 6.5L1.5 5.5" />
      {/* Centre sparkle star */}
      <path d="M5 4L6 5.5L5 4L4 5.5L5 4L5 2.5L5 4L6.5 4L5 4L6 2.5" strokeOpacity="0" />
      <path d="M7 3.5L6 4.5M5.5 4.5H7M6.5 3L6.5 5" strokeOpacity="0.7" />
    </V>
  )
}

/** Radar screen with signal blips — beauty proximity detection */
export function BeautyRadarIcon(p: IconProps) {
  return (
    <V {...p} color={resolveColor(p)}>
      {/* Outer ring */}
      <circle cx="12" cy="12" r="9" />
      {/* Middle ring */}
      <circle cx="12" cy="12" r="5.5" strokeOpacity="0.5" />
      {/* Inner ring */}
      <circle cx="12" cy="12" r="2" strokeOpacity="0.3" />
      {/* Cross hairs */}
      <path d="M12 3V21M3 12H21" strokeOpacity="0.25" />
      {/* Sweep line (45°) */}
      <path d="M12 12L18.5 5.5" />
      {/* Signal blips */}
      <circle cx="16" cy="8" r="1.2" fill={resolveColor(p)} stroke="none" />
      <circle cx="9" cy="15" r="0.9" fill={resolveColor(p)} stroke="none" strokeOpacity="0.7" />
      {/* V-peak at center */}
      <path d="M10 12.5L12 11L14 12.5" strokeOpacity="0.6" />
    </V>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  EXPORT MAP  — for dynamic rendering
// ─────────────────────────────────────────────────────────────────────────────
export const ICONS = {
  // Navigation
  Home:         HomeIcon,
  Discover:     DiscoverIcon,
  Bookings:     BookingsIcon,
  Rewards:      RewardsIcon,
  Profile:      ProfileIcon,
  // Discovery
  Nearby:       NearbyIcon,
  Verified:     VerifiedIcon,
  TopRated:     TopRatedIcon,
  Trending:     TrendingIcon,
  Premium:      PremiumIcon,
  Elite:        EliteIcon,
  // Services
  Haircut:      HaircutIcon,
  Barber:       BarberIcon,
  Makeup:       MakeupIcon,
  Nails:        NailsIcon,
  Braids:       BraidsIcon,
  Spa:          SpaIcon,
  Grooming:     GroomingIcon,
  Skincare:     SkincareIcon,
  // Status
  Available:    AvailableIcon,
  Pending:      PendingIcon,
  Confirmed:    ConfirmedIcon,
  Completed:    CompletedIcon,
  Cancelled:    CancelledIcon,
  // Tiers
  Points:       PointsIcon,
  Bronze:       BronzeIcon,
  Silver:       SilverIcon,
  Gold:         GoldIcon,
  Diamond:      DiamondIcon,
  // Features
  StyleMatchAI:   StyleMatchAIIcon,
  BeautyPassport: BeautyPassportIcon,
  StyleScore:     StyleScoreIcon,
  GlowWallet:     GlowWalletIcon,
  BeautyRadar:    BeautyRadarIcon,
} as const

export type IconName = keyof typeof ICONS
