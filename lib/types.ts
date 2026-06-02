export type UserRole = 'customer' | 'business' | 'staff' | 'admin'
export type VerificationBadge = 'verified' | 'premium' | 'elite' | 'none'
export type AppointmentStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
export type ServiceCategory = 'haircut' | 'hair_styling' | 'braiding' | 'color' | 'beard' | 'makeup' | 'nails' | 'skincare' | 'locs' | 'weave'
export type BusinessType = 'barbershop' | 'hair_salon' | 'beauty_parlour' | 'nail_studio' | 'makeup_studio' | 'grooming_lounge'

export interface City {
  id: string
  name: string
  country: string
  currency: string
  currencySymbol: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  role: UserRole
  city: string
  loyaltyPoints: number
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum'
  joinedAt: string
  totalBookings: number
}

export interface StaffMember {
  id: string
  name: string
  avatar: string
  role: string
  specialties: ServiceCategory[]
  rating: number
  reviewCount: number
  available: boolean
}

export interface Service {
  id: string
  name: string
  category: ServiceCategory
  description: string
  price: number
  duration: number
  popular: boolean
  image?: string
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  date: string
  serviceReceived: string
  staffName: string
  photos?: string[]
  ownerReply?: string
}

export interface BusinessHours {
  open: string
  close: string
  closed: boolean
}

export interface Business {
  id: string
  name: string
  type: BusinessType
  description: string
  shortDescription: string
  coverImage: string
  galleryImages: string[]
  logo: string
  badge: VerificationBadge
  rating: number
  reviewCount: number
  address: string
  city: string
  neighborhood: string
  coordinates: { lat: number; lng: number }
  distance?: number
  phone: string
  email: string
  website?: string
  services: Service[]
  staff: StaffMember[]
  reviews: Review[]
  hours: Record<string, BusinessHours>
  amenities: string[]
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  isOpen: boolean
  waitTime?: number
  nextAvailable: string
  totalBookings: number
  repeatCustomerRate: number
  responseTime: string
  planTier: 'free' | 'premium' | 'elite'
  joinedAt: string
  featured: boolean
  tags: string[]
}

export interface Appointment {
  id: string
  customerId: string
  customerName: string
  customerAvatar: string
  businessId: string
  businessName: string
  staffId: string
  staffName: string
  serviceId: string
  serviceName: string
  servicePrice: number
  serviceDuration: number
  date: string
  time: string
  status: AppointmentStatus
  notes?: string
  paymentMethod?: string
  loyaltyPointsEarned?: number
}

export interface LoyaltyReward {
  id: string
  name: string
  description: string
  pointsCost: number
  value: string
  category: 'discount' | 'free_service' | 'product' | 'vip_access'
  expiresAt?: string
  businessName?: string
  image: string
  available: boolean
}

export interface DashboardStats {
  todayBookings: number
  todayRevenue: number
  newCustomers: number
  pendingBookings: number
  weeklyRevenue: number[]
  topServices: { name: string; count: number; revenue: number }[]
  customerSatisfaction: number
  completionRate: number
}
