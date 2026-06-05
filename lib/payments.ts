/**
 * Payment Method Configuration
 * Maps countries → available payment methods + currency info.
 *
 * Stripe:       International cards, M-Pesa (Kenya via Stripe beta)
 * Flutterwave:  Nigeria, Ghana, Uganda, Tanzania, Rwanda — mobile money + cards
 * M-Pesa Direct (Daraja): Kenya booking payments (lower fees for local transactions)
 *
 * Environment variables needed:
 *   STRIPE_SECRET_KEY                  — Stripe secret key
 *   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY — Stripe publishable key
 *   FLUTTERWAVE_SECRET_KEY             — Flutterwave secret key
 *   NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY — Flutterwave public key
 *   MPESA_CONSUMER_KEY                 — Safaricom Daraja API key
 *   MPESA_CONSUMER_SECRET              — Safaricom Daraja secret
 *   MPESA_SHORTCODE                    — Business shortcode
 *   MPESA_PASSKEY                      — Lipa Na M-Pesa online passkey
 *   MPESA_CALLBACK_URL                 — Webhook URL for M-Pesa callbacks
 */

export type PaymentProvider = 'stripe' | 'flutterwave' | 'mpesa_daraja'

export interface PaymentMethod {
  id:          string
  label:       string
  description: string
  icon:        string       // emoji or icon key
  provider:    PaymentProvider
  currency:    string
  minAmount?:  number
  maxAmount?:  number
}

export interface CountryPaymentConfig {
  countryCode:  string
  countryName:  string
  currency:     string
  currencySymbol: string
  methods:      PaymentMethod[]
  primaryMethod: string   // id of the default/recommended method
}

const COUNTRY_PAYMENTS: Record<string, CountryPaymentConfig> = {
  KE: {
    countryCode:   'KE',
    countryName:   'Kenya',
    currency:      'KES',
    currencySymbol: 'KSh',
    primaryMethod: 'mpesa',
    methods: [
      {
        id:          'mpesa',
        label:       'M-Pesa',
        description: 'Pay instantly with your Safaricom number',
        icon:        '📱',
        provider:    'mpesa_daraja',
        currency:    'KES',
        minAmount:   1,
        maxAmount:   150000,
      },
      {
        id:          'card_ke',
        label:       'Card',
        description: 'Visa, Mastercard, Amex',
        icon:        '💳',
        provider:    'stripe',
        currency:    'KES',
      },
      {
        id:          'airtel_ke',
        label:       'Airtel Money',
        description: 'Pay with your Airtel Kenya number',
        icon:        '📱',
        provider:    'flutterwave',
        currency:    'KES',
      },
    ],
  },
  NG: {
    countryCode:   'NG',
    countryName:   'Nigeria',
    currency:      'NGN',
    currencySymbol: '₦',
    primaryMethod: 'bank_ng',
    methods: [
      {
        id:          'bank_ng',
        label:       'Bank Transfer (USSD)',
        description: 'Pay via USSD or bank transfer',
        icon:        '🏦',
        provider:    'flutterwave',
        currency:    'NGN',
      },
      {
        id:          'card_ng',
        label:       'Card',
        description: 'Visa, Mastercard',
        icon:        '💳',
        provider:    'flutterwave',
        currency:    'NGN',
      },
      {
        id:          'mtn_ng',
        label:       'MTN Mobile Money',
        description: 'Pay with MTN MoMo',
        icon:        '📱',
        provider:    'flutterwave',
        currency:    'NGN',
      },
    ],
  },
  GH: {
    countryCode:   'GH',
    countryName:   'Ghana',
    currency:      'GHS',
    currencySymbol: 'GH₵',
    primaryMethod: 'momo_gh',
    methods: [
      {
        id:          'momo_gh',
        label:       'MTN Mobile Money',
        description: 'Pay with MTN MoMo Ghana',
        icon:        '📱',
        provider:    'flutterwave',
        currency:    'GHS',
      },
      {
        id:          'vodafone_gh',
        label:       'Vodafone Cash',
        description: 'Pay with Vodafone Cash',
        icon:        '📱',
        provider:    'flutterwave',
        currency:    'GHS',
      },
      {
        id:          'card_gh',
        label:       'Card',
        description: 'Visa, Mastercard',
        icon:        '💳',
        provider:    'flutterwave',
        currency:    'GHS',
      },
    ],
  },
  UG: {
    countryCode:   'UG',
    countryName:   'Uganda',
    currency:      'UGX',
    currencySymbol: 'USh',
    primaryMethod: 'mtn_ug',
    methods: [
      {
        id:          'mtn_ug',
        label:       'MTN Mobile Money',
        description: 'Pay with MTN Uganda MoMo',
        icon:        '📱',
        provider:    'flutterwave',
        currency:    'UGX',
      },
      {
        id:          'airtel_ug',
        label:       'Airtel Money',
        description: 'Pay with Airtel Uganda',
        icon:        '📱',
        provider:    'flutterwave',
        currency:    'UGX',
      },
      {
        id:          'card_ug',
        label:       'Card',
        description: 'Visa, Mastercard',
        icon:        '💳',
        provider:    'flutterwave',
        currency:    'UGX',
      },
    ],
  },
  TZ: {
    countryCode:   'TZ',
    countryName:   'Tanzania',
    currency:      'TZS',
    currencySymbol: 'TSh',
    primaryMethod: 'mpesa_tz',
    methods: [
      {
        id:          'mpesa_tz',
        label:       'M-Pesa Tanzania',
        description: 'Pay with Vodacom M-Pesa',
        icon:        '📱',
        provider:    'flutterwave',
        currency:    'TZS',
      },
      {
        id:          'tigo_tz',
        label:       'Tigo Pesa',
        description: 'Pay with Tigo Pesa',
        icon:        '📱',
        provider:    'flutterwave',
        currency:    'TZS',
      },
      {
        id:          'airtel_tz',
        label:       'Airtel Money TZ',
        description: 'Pay with Airtel Tanzania',
        icon:        '📱',
        provider:    'flutterwave',
        currency:    'TZS',
      },
    ],
  },
  ZA: {
    countryCode:   'ZA',
    countryName:   'South Africa',
    currency:      'ZAR',
    currencySymbol: 'R',
    primaryMethod: 'card_za',
    methods: [
      {
        id:          'card_za',
        label:       'Card',
        description: 'Visa, Mastercard, Amex',
        icon:        '💳',
        provider:    'flutterwave',
        currency:    'ZAR',
      },
      {
        id:          'eft_za',
        label:       'EFT / Bank Transfer',
        description: 'Pay via EFT (Instant EFT)',
        icon:        '🏦',
        provider:    'flutterwave',
        currency:    'ZAR',
      },
    ],
  },
}

const DEFAULT_CONFIG: CountryPaymentConfig = {
  countryCode:    'INTL',
  countryName:    'International',
  currency:       'USD',
  currencySymbol: '$',
  primaryMethod:  'card_intl',
  methods: [
    {
      id:          'card_intl',
      label:       'Card',
      description: 'Visa, Mastercard, Amex',
      icon:        '💳',
      provider:    'stripe',
      currency:    'USD',
    },
  ],
}

export function getPaymentConfig(countryCode: string): CountryPaymentConfig {
  return COUNTRY_PAYMENTS[countryCode.toUpperCase()] ?? DEFAULT_CONFIG
}

export function getPrimaryMethod(countryCode: string): PaymentMethod | null {
  const config = getPaymentConfig(countryCode)
  return config.methods.find(m => m.id === config.primaryMethod) ?? config.methods[0] ?? null
}

/** Convert a local currency amount to USD for Stripe (using approximate rates) */
export function toUSD(amount: number, currency: string): number {
  const rates: Record<string, number> = {
    KES: 0.0078,  // ~128 KES = 1 USD
    NGN: 0.00065, // ~1540 NGN = 1 USD
    GHS: 0.061,   // ~16.4 GHS = 1 USD
    UGX: 0.00027, // ~3700 UGX = 1 USD
    TZS: 0.00038, // ~2630 TZS = 1 USD
    ZAR: 0.055,   // ~18.2 ZAR = 1 USD
    USD: 1,
  }
  const rate = rates[currency.toUpperCase()] ?? 1
  return Math.round(amount * rate * 100) / 100 // 2 decimal places
}
