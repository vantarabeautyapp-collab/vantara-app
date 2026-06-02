import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ─── AUTH TABLES (managed by Better-Auth via @convex-dev/better-auth) ─────
  // These are auto-synced; define them here so RLS rules apply.

  // ─── USERS ───────────────────────────────────────────────────────────────
  users: defineTable({
    // Core identity
    name: v.string(),
    email: v.string(),
    emailVerified: v.boolean(),
    image: v.optional(v.string()),
    role: v.union(v.literal("customer"), v.literal("business"), v.literal("staff"), v.literal("admin")),

    // Location
    countryCode: v.optional(v.string()),  // ISO 2-letter, e.g. "KE"
    city: v.optional(v.string()),

    // Contact
    phone: v.optional(v.string()),

    // Loyalty
    loyaltyPoints: v.number(),
    loyaltyTier: v.union(v.literal("bronze"), v.literal("silver"), v.literal("gold"), v.literal("platinum")),
    totalBookings: v.number(),

    // Business owner fields
    businessName: v.optional(v.string()),
    businessType: v.optional(v.string()),

    // Stripe
    stripeCustomerId: v.optional(v.string()),

    // Moderation
    banned: v.boolean(),
    bannedReason: v.optional(v.string()),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"])
    .index("by_stripe_customer", ["stripeCustomerId"]),

  // ─── BUSINESSES ──────────────────────────────────────────────────────────
  businesses: defineTable({
    ownerId: v.id("users"),
    name: v.string(),
    type: v.string(),       // barbershop | hair_salon | nail_studio | etc.
    description: v.string(),
    shortDescription: v.string(),

    // Location
    countryCode: v.string(),
    city: v.string(),
    neighborhood: v.string(),
    address: v.string(),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),

    // Contact
    phone: v.string(),
    email: v.optional(v.string()),
    website: v.optional(v.string()),
    instagram: v.optional(v.string()),

    // Media
    images: v.array(v.string()),
    coverImage: v.optional(v.string()),

    // Ratings
    rating: v.number(),
    reviewCount: v.number(),

    // Status & verification
    badge: v.union(v.literal("elite"), v.literal("premium"), v.literal("verified"), v.literal("none")),
    planTier: v.union(v.literal("free"), v.literal("premium"), v.literal("elite")),
    isOpen: v.boolean(),
    featured: v.boolean(),
    verified: v.boolean(),
    active: v.boolean(),

    // Operating hours (JSON string for simplicity)
    hours: v.string(),

    // Amenities
    amenities: v.array(v.string()),
    priceRange: v.union(v.literal("budget"), v.literal("mid"), v.literal("premium"), v.literal("luxury")),

    // Stripe subscription
    stripeSubscriptionId: v.optional(v.string()),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_owner", ["ownerId"])
    .index("by_country_city", ["countryCode", "city"])
    .index("by_plan", ["planTier"])
    .index("by_type", ["type"])
    .index("by_featured", ["featured"]),

  // ─── SERVICES ────────────────────────────────────────────────────────────
  services: defineTable({
    businessId: v.id("businesses"),
    name: v.string(),
    category: v.string(),
    description: v.string(),
    price: v.number(),
    currency: v.string(),   // e.g. "KES"
    duration: v.number(),   // minutes
    popular: v.boolean(),
    active: v.boolean(),
    imageUrl: v.optional(v.string()),
  }).index("by_business", ["businessId"]).index("by_category", ["category"]),

  // ─── STAFF ───────────────────────────────────────────────────────────────
  staff: defineTable({
    businessId: v.id("businesses"),
    userId: v.optional(v.id("users")),  // linked user account if staff has login
    name: v.string(),
    avatar: v.optional(v.string()),
    role: v.string(),
    specialties: v.array(v.string()),
    rating: v.number(),
    reviewCount: v.number(),
    available: v.boolean(),
    bio: v.optional(v.string()),
  }).index("by_business", ["businessId"]),

  // ─── BOOKINGS ────────────────────────────────────────────────────────────
  bookings: defineTable({
    customerId: v.id("users"),
    businessId: v.id("businesses"),
    staffId: v.optional(v.id("staff")),
    serviceId: v.id("services"),

    date: v.string(),          // YYYY-MM-DD
    time: v.string(),          // HH:MM
    durationMinutes: v.number(),

    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled"),
      v.literal("no_show"),
    ),

    // Payment
    totalPrice: v.number(),
    currency: v.string(),
    paymentMethod: v.string(),
    paymentStatus: v.union(v.literal("pending"), v.literal("paid"), v.literal("refunded"), v.literal("failed")),
    stripePaymentIntentId: v.optional(v.string()),

    // Notes
    customerNotes: v.optional(v.string()),
    staffNotes: v.optional(v.string()),

    // Loyalty
    loyaltyPointsEarned: v.number(),

    // Cancellation
    cancelledBy: v.optional(v.string()),
    cancellationReason: v.optional(v.string()),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_customer", ["customerId"])
    .index("by_business", ["businessId"])
    .index("by_status", ["status"])
    .index("by_date", ["date"]),

  // ─── REVIEWS ─────────────────────────────────────────────────────────────
  reviews: defineTable({
    bookingId: v.id("bookings"),
    customerId: v.id("users"),
    businessId: v.id("businesses"),
    staffId: v.optional(v.id("staff")),

    rating: v.number(),      // 1-5
    comment: v.string(),
    photos: v.array(v.string()),

    // Moderation
    ownerReply: v.optional(v.string()),
    flagged: v.boolean(),
    flagReason: v.optional(v.string()),
    approved: v.boolean(),

    createdAt: v.number(),
  })
    .index("by_business", ["businessId"])
    .index("by_customer", ["customerId"])
    .index("by_moderation", ["approved", "flagged"]),

  // ─── LOYALTY REWARDS ─────────────────────────────────────────────────────
  loyaltyRewards: defineTable({
    name: v.string(),
    description: v.string(),
    pointsCost: v.number(),
    category: v.union(v.literal("discount"), v.literal("free_service"), v.literal("product"), v.literal("vip_access")),
    available: v.boolean(),
    countryCode: v.optional(v.string()),   // null = global
    businessId: v.optional(v.id("businesses")), // null = platform-wide
    expiresAt: v.optional(v.number()),
  }).index("by_category", ["category"]),

  // ─── SUBSCRIPTIONS (Stripe) ──────────────────────────────────────────────
  subscriptions: defineTable({
    businessId: v.id("businesses"),
    stripeSubscriptionId: v.string(),
    stripePriceId: v.string(),
    stripeCustomerId: v.string(),
    status: v.union(
      v.literal("active"), v.literal("past_due"), v.literal("canceled"),
      v.literal("trialing"), v.literal("incomplete"),
    ),
    planTier: v.union(v.literal("premium"), v.literal("elite")),
    currentPeriodStart: v.number(),
    currentPeriodEnd: v.number(),
    cancelAtPeriodEnd: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_business", ["businessId"])
    .index("by_stripe_sub", ["stripeSubscriptionId"]),

  // ─── NOTIFICATIONS ───────────────────────────────────────────────────────
  notifications: defineTable({
    userId: v.id("users"),
    type: v.string(),      // booking_confirmed | booking_reminder | review_request | etc.
    title: v.string(),
    body: v.string(),
    read: v.boolean(),
    data: v.optional(v.string()), // JSON string for deep link data
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_unread", ["userId", "read"]),

  // ─── ERROR LOGS ──────────────────────────────────────────────────────────
  errorLogs: defineTable({
    userId: v.optional(v.id("users")),
    message: v.string(),
    stack: v.optional(v.string()),
    context: v.optional(v.string()),
    url: v.optional(v.string()),
    severity: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("critical")),
    resolved: v.boolean(),
    linearIssueId: v.optional(v.string()),  // linked Linear issue
    sentryEventId: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_severity", ["severity"])
    .index("by_resolved", ["resolved"]),

  // ─── MODERATION QUEUE ────────────────────────────────────────────────────
  moderationQueue: defineTable({
    type: v.union(v.literal("review"), v.literal("business"), v.literal("user_report")),
    targetId: v.string(),       // ID of the thing being moderated
    reporterId: v.optional(v.id("users")),
    reason: v.string(),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    moderatorId: v.optional(v.id("users")),
    moderatorNotes: v.optional(v.string()),
    createdAt: v.number(),
    resolvedAt: v.optional(v.number()),
  }).index("by_status", ["status"]).index("by_type", ["type"]),
});
