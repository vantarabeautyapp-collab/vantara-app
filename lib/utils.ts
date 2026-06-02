import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, symbol = 'KSh') {
  return `${symbol} ${amount.toLocaleString()}`
}

/**
 * Reads the user's saved country from localStorage and returns currency symbol.
 * Safe to call server-side (returns default symbol if window is unavailable).
 */
export function getUserCurrencySymbol(defaultSymbol = 'KSh'): string {
  if (typeof window === 'undefined') return defaultSymbol
  try {
    const user = JSON.parse(localStorage.getItem('vt_user') ?? '{}')
    const countryCode: string = user?.countryCode ?? ''
    if (!countryCode) return defaultSymbol
    // Inline minimal map to avoid circular imports with africa-locations
    const symbols: Record<string, string> = {
      KE:'KSh', TZ:'TSh', UG:'USh', RW:'RF', ET:'Br', MZ:'MT', MG:'Ar',
      MW:'MK', ZM:'ZK', BI:'Fr', DJ:'Fr', ER:'Nfk', SO:'Sh', SS:'£',
      MU:'₨', SC:'₨', KM:'Fr', NG:'₦', GH:'GH₵', SN:'CFA', CI:'CFA',
      ML:'CFA', BF:'CFA', NE:'CFA', GN:'Fr', TG:'CFA', BJ:'CFA', SL:'Le',
      LR:'$', MR:'UM', GM:'D', GW:'CFA', CV:'$', ST:'Db',
      EG:'E£', MA:'د.م.', TN:'DT', DZ:'دج', LY:'ل.د', SD:'£',
      CM:'FCFA', CD:'FC', CG:'FCFA', GA:'FCFA', GQ:'FCFA', CF:'FCFA', TD:'FCFA',
      ZA:'R', ZW:'Z$', AO:'Kz', NA:'N$', BW:'P', LS:'L', SZ:'L',
    }
    return symbols[countryCode] ?? defaultSymbol
  } catch {
    return defaultSymbol
  }
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h}h ${m}min` : `${h}h`
}

export function getBadgeLabel(badge: string): string {
  const labels: Record<string, string> = {
    elite: 'Elite',
    premium: 'Premium',
    verified: 'Verified',
    none: '',
  }
  return labels[badge] || ''
}

export function getLoyaltyTierColor(tier: string): string {
  const colors: Record<string, string> = {
    bronze: 'text-amber-600',
    silver: 'text-slate-400',
    gold: 'text-gold',
    platinum: 'text-purple-400',
  }
  return colors[tier] || 'text-slate-400'
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    confirmed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    in_progress: 'bg-emerald-brand/20 text-emerald-light border-emerald-brand/30',
    completed: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  }
  return colors[status] || ''
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
  }
  return labels[status] || status
}

export function getPlanBadgeStyle(plan: string): string {
  const styles: Record<string, string> = {
    free: 'bg-slate-500/20 text-slate-400',
    premium: 'bg-gold/20 text-gold',
    elite: 'bg-emerald-brand/20 text-emerald-light',
  }
  return styles[plan] || ''
}

export function getStarRating(rating: number): string {
  return '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(rating))
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}
