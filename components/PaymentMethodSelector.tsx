'use client'

/**
 * PaymentMethodSelector
 * Shows available payment methods for a given country and lets the user pick one.
 *
 * Usage:
 *   <PaymentMethodSelector
 *     countryCode="KE"
 *     amount={1400}
 *     currency="KES"
 *     onSelect={(method) => console.log(method)}
 *   />
 */

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { getPaymentConfig, type PaymentMethod } from '@/lib/payments'

interface PaymentMethodSelectorProps {
  countryCode:  string
  amount:       number
  currency:     string
  onSelect?:    (method: PaymentMethod) => void
  className?:   string
  disabled?:    boolean
}

export function PaymentMethodSelector({
  countryCode,
  amount,
  currency,
  onSelect,
  className,
  disabled = false,
}: PaymentMethodSelectorProps) {
  const config  = getPaymentConfig(countryCode)
  const [selected, setSelected] = useState<string>(config.primaryMethod)

  function handleSelect(method: PaymentMethod) {
    if (disabled) return
    setSelected(method.id)
    onSelect?.(method)
  }

  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-xs font-medium text-text-secondary mb-2">
        Payment Method
      </label>

      {config.methods.map(method => (
        <button
          key={method.id}
          type="button"
          disabled={disabled}
          onClick={() => handleSelect(method)}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-150',
            selected === method.id
              ? 'border-gold/40 bg-gold/8 text-text-primary'
              : 'border-border bg-surface/50 text-text-secondary hover:border-border hover:bg-surface-hover',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          {/* Radio dot */}
          <div className={cn(
            'w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0',
            selected === method.id ? 'border-gold' : 'border-border',
          )}>
            {selected === method.id && (
              <div className="w-2 h-2 rounded-full bg-gold" />
            )}
          </div>

          {/* Icon */}
          <span className="text-xl leading-none shrink-0">{method.icon}</span>

          {/* Label */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold leading-tight">{method.label}</div>
            <div className="text-xs text-text-muted mt-0.5">{method.description}</div>
          </div>

          {/* Provider badge */}
          <div className="text-xs text-text-muted shrink-0 capitalize">
            {method.provider === 'stripe'         && 'Stripe'}
            {method.provider === 'flutterwave'    && 'Flutterwave'}
            {method.provider === 'mpesa_daraja'   && 'Safaricom'}
          </div>
        </button>
      ))}

      {/* Amount display */}
      <div className="flex items-center justify-between px-1 pt-1">
        <span className="text-xs text-text-muted">Total</span>
        <span className="text-sm font-semibold text-text-primary">
          {currency} {amount.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

export default PaymentMethodSelector
