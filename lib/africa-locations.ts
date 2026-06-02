// All 54 African countries with currencies, payment methods, and dial codes.
// Cities are loaded on-demand via /api/locations/cities?country=XX

export interface AfricanCountry {
  code: string          // ISO 3166-1 alpha-2
  name: string
  flag: string
  dialCode: string
  currency: {
    code: string        // e.g. "KES"
    symbol: string      // e.g. "KSh"
    name: string
  }
  payments: PaymentMethod[]
  region: 'east' | 'west' | 'north' | 'central' | 'southern'
}

export interface PaymentMethod {
  id: string
  name: string
  icon: string
  type: 'mobile_money' | 'card' | 'cash' | 'bank_transfer' | 'wallet'
}

// ─── Payment method templates ───────────────────────────────────────────────
const MPESA:       PaymentMethod = { id: 'mpesa',       name: 'M-Pesa',          icon: '📱', type: 'mobile_money' }
const AIRTEL:      PaymentMethod = { id: 'airtel',      name: 'Airtel Money',    icon: '📱', type: 'mobile_money' }
const MTN:         PaymentMethod = { id: 'mtn',         name: 'MTN Mobile Money',icon: '📱', type: 'mobile_money' }
const ORANGE:      PaymentMethod = { id: 'orange',      name: 'Orange Money',    icon: '📱', type: 'mobile_money' }
const WAVE:        PaymentMethod = { id: 'wave',        name: 'Wave',            icon: '📱', type: 'wallet'       }
const TIGO:        PaymentMethod = { id: 'tigo',        name: 'Tigo Pesa',       icon: '📱', type: 'mobile_money' }
const VODACOM:     PaymentMethod = { id: 'vodacom',     name: 'Vodacom M-Pesa',  icon: '📱', type: 'mobile_money' }
const ECOCASH:     PaymentMethod = { id: 'ecocash',     name: 'EcoCash',         icon: '📱', type: 'mobile_money' }
const TELEBIRR:    PaymentMethod = { id: 'telebirr',    name: 'Telebirr',        icon: '📱', type: 'mobile_money' }
const FLUTTERWAVE: PaymentMethod = { id: 'flutterwave', name: 'Flutterwave',     icon: '💳', type: 'bank_transfer'}
const PAYSTACK:    PaymentMethod = { id: 'paystack',    name: 'Paystack',        icon: '💳', type: 'bank_transfer'}
const FAWRY:       PaymentMethod = { id: 'fawry',       name: 'Fawry',           icon: '💳', type: 'wallet'       }
const CARD:        PaymentMethod = { id: 'card',        name: 'Card',            icon: '💳', type: 'card'         }
const CASH:        PaymentMethod = { id: 'cash',        name: 'Cash',            icon: '💵', type: 'cash'         }
const BANK:        PaymentMethod = { id: 'bank',        name: 'Bank Transfer',   icon: '🏦', type: 'bank_transfer'}

export const AFRICAN_COUNTRIES: AfricanCountry[] = [
  // ─── EAST AFRICA ──────────────────────────────────────────────────────────
  {
    code: 'KE', name: 'Kenya', flag: '🇰🇪', dialCode: '+254', region: 'east',
    currency: { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
    payments: [MPESA, AIRTEL, CARD, CASH, BANK],
  },
  {
    code: 'TZ', name: 'Tanzania', flag: '🇹🇿', dialCode: '+255', region: 'east',
    currency: { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling' },
    payments: [VODACOM, MPESA, AIRTEL, TIGO, CARD, CASH],
  },
  {
    code: 'UG', name: 'Uganda', flag: '🇺🇬', dialCode: '+256', region: 'east',
    currency: { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling' },
    payments: [MTN, AIRTEL, CARD, CASH],
  },
  {
    code: 'RW', name: 'Rwanda', flag: '🇷🇼', dialCode: '+250', region: 'east',
    currency: { code: 'RWF', symbol: 'RF', name: 'Rwandan Franc' },
    payments: [MTN, AIRTEL, CARD, CASH],
  },
  {
    code: 'ET', name: 'Ethiopia', flag: '🇪🇹', dialCode: '+251', region: 'east',
    currency: { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr' },
    payments: [TELEBIRR, MPESA, CASH, BANK],
  },
  {
    code: 'MZ', name: 'Mozambique', flag: '🇲🇿', dialCode: '+258', region: 'east',
    currency: { code: 'MZN', symbol: 'MT', name: 'Mozambican Metical' },
    payments: [MPESA, VODACOM, AIRTEL, CASH],
  },
  {
    code: 'MG', name: 'Madagascar', flag: '🇲🇬', dialCode: '+261', region: 'east',
    currency: { code: 'MGA', symbol: 'Ar', name: 'Malagasy Ariary' },
    payments: [ORANGE, AIRTEL, CASH],
  },
  {
    code: 'MW', name: 'Malawi', flag: '🇲🇼', dialCode: '+265', region: 'east',
    currency: { code: 'MWK', symbol: 'MK', name: 'Malawian Kwacha' },
    payments: [AIRTEL, MTN, CASH],
  },
  {
    code: 'ZM', name: 'Zambia', flag: '🇿🇲', dialCode: '+260', region: 'east',
    currency: { code: 'ZMW', symbol: 'ZK', name: 'Zambian Kwacha' },
    payments: [AIRTEL, MTN, CARD, CASH],
  },
  {
    code: 'BI', name: 'Burundi', flag: '🇧🇮', dialCode: '+257', region: 'east',
    currency: { code: 'BIF', symbol: 'Fr', name: 'Burundian Franc' },
    payments: [AIRTEL, CASH],
  },
  {
    code: 'DJ', name: 'Djibouti', flag: '🇩🇯', dialCode: '+253', region: 'east',
    currency: { code: 'DJF', symbol: 'Fr', name: 'Djiboutian Franc' },
    payments: [CASH, CARD],
  },
  {
    code: 'ER', name: 'Eritrea', flag: '🇪🇷', dialCode: '+291', region: 'east',
    currency: { code: 'ERN', symbol: 'Nfk', name: 'Eritrean Nakfa' },
    payments: [CASH],
  },
  {
    code: 'SO', name: 'Somalia', flag: '🇸🇴', dialCode: '+252', region: 'east',
    currency: { code: 'SOS', symbol: 'Sh', name: 'Somali Shilling' },
    payments: [{ id: 'hormuud', name: 'Hormuud (eDahab)', icon: '📱', type: 'mobile_money' }, CASH],
  },
  {
    code: 'SS', name: 'South Sudan', flag: '🇸🇸', dialCode: '+211', region: 'east',
    currency: { code: 'SSP', symbol: '£', name: 'South Sudanese Pound' },
    payments: [MTN, CASH],
  },
  {
    code: 'MU', name: 'Mauritius', flag: '🇲🇺', dialCode: '+230', region: 'east',
    currency: { code: 'MUR', symbol: '₨', name: 'Mauritian Rupee' },
    payments: [CARD, BANK, CASH],
  },
  {
    code: 'SC', name: 'Seychelles', flag: '🇸🇨', dialCode: '+248', region: 'east',
    currency: { code: 'SCR', symbol: '₨', name: 'Seychellois Rupee' },
    payments: [CARD, CASH],
  },
  {
    code: 'KM', name: 'Comoros', flag: '🇰🇲', dialCode: '+269', region: 'east',
    currency: { code: 'KMF', symbol: 'Fr', name: 'Comorian Franc' },
    payments: [CASH],
  },

  // ─── WEST AFRICA ──────────────────────────────────────────────────────────
  {
    code: 'NG', name: 'Nigeria', flag: '🇳🇬', dialCode: '+234', region: 'west',
    currency: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
    payments: [FLUTTERWAVE, PAYSTACK, MTN, AIRTEL, BANK, CARD, CASH],
  },
  {
    code: 'GH', name: 'Ghana', flag: '🇬🇭', dialCode: '+233', region: 'west',
    currency: { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi' },
    payments: [MTN, ORANGE, AIRTEL, CARD, CASH],
  },
  {
    code: 'SN', name: 'Senegal', flag: '🇸🇳', dialCode: '+221', region: 'west',
    currency: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    payments: [ORANGE, WAVE, { id: 'free_money', name: 'Free Money', icon: '📱', type: 'mobile_money' }, CASH],
  },
  {
    code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮', dialCode: '+225', region: 'west',
    currency: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    payments: [MTN, ORANGE, { id: 'moov', name: 'Moov Money', icon: '📱', type: 'mobile_money' }, CARD, CASH],
  },
  {
    code: 'ML', name: 'Mali', flag: '🇲🇱', dialCode: '+223', region: 'west',
    currency: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    payments: [ORANGE, { id: 'moov', name: 'Moov Money', icon: '📱', type: 'mobile_money' }, CASH],
  },
  {
    code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', dialCode: '+226', region: 'west',
    currency: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    payments: [ORANGE, { id: 'moov', name: 'Moov Money', icon: '📱', type: 'mobile_money' }, CASH],
  },
  {
    code: 'NE', name: 'Niger', flag: '🇳🇪', dialCode: '+227', region: 'west',
    currency: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    payments: [AIRTEL, ORANGE, CASH],
  },
  {
    code: 'GN', name: 'Guinea', flag: '🇬🇳', dialCode: '+224', region: 'west',
    currency: { code: 'GNF', symbol: 'Fr', name: 'Guinean Franc' },
    payments: [ORANGE, MTN, CASH],
  },
  {
    code: 'TG', name: 'Togo', flag: '🇹🇬', dialCode: '+228', region: 'west',
    currency: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    payments: [{ id: 'flooz', name: 'Flooz (Moov)', icon: '📱', type: 'mobile_money' }, { id: 'tmoney', name: 'T-Money', icon: '📱', type: 'mobile_money' }, CASH],
  },
  {
    code: 'BJ', name: 'Benin', flag: '🇧🇯', dialCode: '+229', region: 'west',
    currency: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    payments: [MTN, { id: 'moov', name: 'Moov Money', icon: '📱', type: 'mobile_money' }, CASH],
  },
  {
    code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', dialCode: '+232', region: 'west',
    currency: { code: 'SLL', symbol: 'Le', name: 'Sierra Leonean Leone' },
    payments: [ORANGE, AIRTEL, CASH],
  },
  {
    code: 'LR', name: 'Liberia', flag: '🇱🇷', dialCode: '+231', region: 'west',
    currency: { code: 'LRD', symbol: '$', name: 'Liberian Dollar' },
    payments: [ORANGE, MTN, CASH],
  },
  {
    code: 'MR', name: 'Mauritania', flag: '🇲🇷', dialCode: '+222', region: 'west',
    currency: { code: 'MRU', symbol: 'UM', name: 'Mauritanian Ouguiya' },
    payments: [AIRTEL, CASH],
  },
  {
    code: 'GM', name: 'Gambia', flag: '🇬🇲', dialCode: '+220', region: 'west',
    currency: { code: 'GMD', symbol: 'D', name: 'Gambian Dalasi' },
    payments: [AIRTEL, CASH],
  },
  {
    code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼', dialCode: '+245', region: 'west',
    currency: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    payments: [ORANGE, CASH],
  },
  {
    code: 'CV', name: 'Cape Verde', flag: '🇨🇻', dialCode: '+238', region: 'west',
    currency: { code: 'CVE', symbol: '$', name: 'Cape Verdean Escudo' },
    payments: [CARD, CASH],
  },
  {
    code: 'ST', name: 'São Tomé & Príncipe', flag: '🇸🇹', dialCode: '+239', region: 'west',
    currency: { code: 'STN', symbol: 'Db', name: 'São Tomé and Príncipe Dobra' },
    payments: [CASH, CARD],
  },

  // ─── NORTH AFRICA ─────────────────────────────────────────────────────────
  {
    code: 'EG', name: 'Egypt', flag: '🇪🇬', dialCode: '+20', region: 'north',
    currency: { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' },
    payments: [FAWRY, { id: 'vodafone_cash', name: 'Vodafone Cash', icon: '📱', type: 'mobile_money' }, { id: 'instapay', name: 'InstaPay', icon: '📱', type: 'wallet' }, CARD, CASH],
  },
  {
    code: 'MA', name: 'Morocco', flag: '🇲🇦', dialCode: '+212', region: 'north',
    currency: { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham' },
    payments: [{ id: 'cmi', name: 'CMI', icon: '💳', type: 'card' }, { id: 'maroc_telecom', name: 'Maroc Telecom Money', icon: '📱', type: 'mobile_money' }, CARD, CASH],
  },
  {
    code: 'TN', name: 'Tunisia', flag: '🇹🇳', dialCode: '+216', region: 'north',
    currency: { code: 'TND', symbol: 'DT', name: 'Tunisian Dinar' },
    payments: [{ id: 'd17', name: 'D17', icon: '📱', type: 'wallet' }, CARD, CASH, BANK],
  },
  {
    code: 'DZ', name: 'Algeria', flag: '🇩🇿', dialCode: '+213', region: 'north',
    currency: { code: 'DZD', symbol: 'دج', name: 'Algerian Dinar' },
    payments: [{ id: 'ccp', name: 'CCP (Algérie Poste)', icon: '📱', type: 'wallet' }, CARD, CASH],
  },
  {
    code: 'LY', name: 'Libya', flag: '🇱🇾', dialCode: '+218', region: 'north',
    currency: { code: 'LYD', symbol: 'ل.د', name: 'Libyan Dinar' },
    payments: [CASH, CARD],
  },
  {
    code: 'SD', name: 'Sudan', flag: '🇸🇩', dialCode: '+249', region: 'north',
    currency: { code: 'SDG', symbol: '£', name: 'Sudanese Pound' },
    payments: [{ id: 'zain_cash', name: 'Zain Cash', icon: '📱', type: 'mobile_money' }, MTN, CASH],
  },

  // ─── CENTRAL AFRICA ───────────────────────────────────────────────────────
  {
    code: 'CM', name: 'Cameroon', flag: '🇨🇲', dialCode: '+237', region: 'central',
    currency: { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
    payments: [MTN, ORANGE, AIRTEL, CASH],
  },
  {
    code: 'CD', name: 'DR Congo', flag: '🇨🇩', dialCode: '+243', region: 'central',
    currency: { code: 'CDF', symbol: 'FC', name: 'Congolese Franc' },
    payments: [MPESA, AIRTEL, ORANGE, CASH],
  },
  {
    code: 'CG', name: 'Congo', flag: '🇨🇬', dialCode: '+242', region: 'central',
    currency: { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
    payments: [MTN, AIRTEL, CASH],
  },
  {
    code: 'GA', name: 'Gabon', flag: '🇬🇦', dialCode: '+241', region: 'central',
    currency: { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
    payments: [AIRTEL, CASH, CARD],
  },
  {
    code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶', dialCode: '+240', region: 'central',
    currency: { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
    payments: [CASH, CARD],
  },
  {
    code: 'CF', name: 'Central African Republic', flag: '🇨🇫', dialCode: '+236', region: 'central',
    currency: { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
    payments: [ORANGE, CASH],
  },
  {
    code: 'TD', name: 'Chad', flag: '🇹🇩', dialCode: '+235', region: 'central',
    currency: { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
    payments: [AIRTEL, CASH],
  },

  // ─── SOUTHERN AFRICA ──────────────────────────────────────────────────────
  {
    code: 'ZA', name: 'South Africa', flag: '🇿🇦', dialCode: '+27', region: 'southern',
    currency: { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    payments: [CARD, BANK, { id: 'snapscan', name: 'SnapScan', icon: '📱', type: 'wallet' }, { id: 'zapper', name: 'Zapper', icon: '📱', type: 'wallet' }, CASH],
  },
  {
    code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', dialCode: '+263', region: 'southern',
    currency: { code: 'ZWL', symbol: 'Z$', name: 'Zimbabwean Dollar' },
    payments: [ECOCASH, { id: 'onemoney', name: 'OneMoney', icon: '📱', type: 'mobile_money' }, CARD, CASH],
  },
  {
    code: 'AO', name: 'Angola', flag: '🇦🇴', dialCode: '+244', region: 'southern',
    currency: { code: 'AOA', symbol: 'Kz', name: 'Angolan Kwanza' },
    payments: [{ id: 'unitel_money', name: 'Unitel Money', icon: '📱', type: 'mobile_money' }, CARD, CASH],
  },
  {
    code: 'NA', name: 'Namibia', flag: '🇳🇦', dialCode: '+264', region: 'southern',
    currency: { code: 'NAD', symbol: 'N$', name: 'Namibian Dollar' },
    payments: [{ id: 'e_wallet', name: 'FNB eWallet', icon: '📱', type: 'wallet' }, CARD, CASH],
  },
  {
    code: 'BW', name: 'Botswana', flag: '🇧🇼', dialCode: '+267', region: 'southern',
    currency: { code: 'BWP', symbol: 'P', name: 'Botswana Pula' },
    payments: [ORANGE, CARD, CASH],
  },
  {
    code: 'LS', name: 'Lesotho', flag: '🇱🇸', dialCode: '+266', region: 'southern',
    currency: { code: 'LSL', symbol: 'L', name: 'Lesotho Loti' },
    payments: [MPESA, CASH, CARD],
  },
  {
    code: 'SZ', name: 'Eswatini', flag: '🇸🇿', dialCode: '+268', region: 'southern',
    currency: { code: 'SZL', symbol: 'L', name: 'Swazi Lilangeni' },
    payments: [MPESA, CARD, CASH],
  },
]

// Lookup maps for fast access
export const COUNTRY_MAP = new Map(AFRICAN_COUNTRIES.map(c => [c.code, c]))
export const COUNTRY_BY_NAME = new Map(AFRICAN_COUNTRIES.map(c => [c.name.toLowerCase(), c]))

export function getCountry(code: string): AfricanCountry | undefined {
  return COUNTRY_MAP.get(code.toUpperCase())
}

export function getPaymentMethods(countryCode: string): PaymentMethod[] {
  return getCountry(countryCode)?.payments ?? [CASH, CARD]
}

export function getCurrencySymbol(countryCode: string): string {
  return getCountry(countryCode)?.currency.symbol ?? '$'
}

export function getCurrencyCode(countryCode: string): string {
  return getCountry(countryCode)?.currency.code ?? 'USD'
}

export function formatAmountForCountry(amount: number, countryCode: string): string {
  const country = getCountry(countryCode)
  if (!country) return `$${amount.toLocaleString()}`
  const { symbol, code } = country.currency
  return `${symbol}${amount.toLocaleString()}`
}

// Region groupings for UI
export const REGIONS = {
  east:     { label: 'East Africa',     countries: AFRICAN_COUNTRIES.filter(c => c.region === 'east') },
  west:     { label: 'West Africa',     countries: AFRICAN_COUNTRIES.filter(c => c.region === 'west') },
  north:    { label: 'North Africa',    countries: AFRICAN_COUNTRIES.filter(c => c.region === 'north') },
  central:  { label: 'Central Africa',  countries: AFRICAN_COUNTRIES.filter(c => c.region === 'central') },
  southern: { label: 'Southern Africa', countries: AFRICAN_COUNTRIES.filter(c => c.region === 'southern') },
}
