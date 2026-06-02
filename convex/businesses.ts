import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";

// ─── Public queries ───────────────────────────────────────────────────────────
export const list = query({
  args: {
    countryCode: v.optional(v.string()),
    city: v.optional(v.string()),
    type: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { countryCode, city, type, featured, limit = 20 }) => {
    let results = await ctx.db.query("businesses")
      .filter(q => q.eq(q.field("active"), true))
      .collect();

    if (countryCode) results = results.filter(b => b.countryCode === countryCode);
    if (city) results = results.filter(b => b.city.toLowerCase().includes(city.toLowerCase()));
    if (type) results = results.filter(b => b.type === type);
    if (featured !== undefined) results = results.filter(b => b.featured === featured);

    return results.slice(0, limit);
  },
});

export const getById = query({
  args: { id: v.id("businesses") },
  handler: async (ctx, { id }) => {
    const business = await ctx.db.get(id);
    if (!business?.active) return null;
    return business;
  },
});

export const getServices = query({
  args: { businessId: v.id("businesses") },
  handler: async (ctx, { businessId }) => {
    return ctx.db.query("services")
      .withIndex("by_business", q => q.eq("businessId", businessId))
      .filter(q => q.eq(q.field("active"), true))
      .collect();
  },
});

export const getStaff = query({
  args: { businessId: v.id("businesses") },
  handler: async (ctx, { businessId }) => {
    return ctx.db.query("staff")
      .withIndex("by_business", q => q.eq("businessId", businessId))
      .filter(q => q.eq(q.field("available"), true))
      .collect();
  },
});

export const getReviews = query({
  args: { businessId: v.id("businesses"), limit: v.optional(v.number()) },
  handler: async (ctx, { businessId, limit = 10 }) => {
    return ctx.db.query("reviews")
      .withIndex("by_business", q => q.eq("businessId", businessId))
      .filter(q => q.eq(q.field("approved"), true))
      .order("desc")
      .take(limit);
  },
});

// ─── Authenticated mutations ─────────────────────────────────────────────────
export const create = mutation({
  args: {
    name: v.string(),
    type: v.string(),
    description: v.string(),
    shortDescription: v.string(),
    countryCode: v.string(),
    city: v.string(),
    neighborhood: v.string(),
    address: v.string(),
    phone: v.string(),
    priceRange: v.union(v.literal("budget"), v.literal("mid"), v.literal("premium"), v.literal("luxury")),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) throw new Error("Not authenticated");
    if (user.role !== "business" && user.role !== "admin") throw new Error("Only business accounts can create listings");

    return ctx.db.insert("businesses", {
      ...args,
      ownerId: user._id,
      images: [],
      rating: 0,
      reviewCount: 0,
      badge: "none",
      planTier: "free",
      isOpen: false,
      featured: false,
      verified: false,
      active: true,
      amenities: [],
      hours: JSON.stringify({}),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const submitReview = mutation({
  args: {
    bookingId: v.id("bookings"),
    businessId: v.id("businesses"),
    rating: v.number(),
    comment: v.string(),
    staffId: v.optional(v.id("staff")),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) throw new Error("Not authenticated");

    // Validate rating range
    if (args.rating < 1 || args.rating > 5) throw new Error("Rating must be between 1 and 5");

    const reviewId = await ctx.db.insert("reviews", {
      ...args,
      customerId: user._id,
      photos: [],
      flagged: false,
      approved: true, // auto-approve; flagged manually later
      createdAt: Date.now(),
    });

    // Recalculate business rating
    const reviews = await ctx.db.query("reviews")
      .withIndex("by_business", q => q.eq("businessId", args.businessId))
      .filter(q => q.eq(q.field("approved"), true))
      .collect();
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await ctx.db.patch(args.businessId, { rating: Math.round(avg * 10) / 10, reviewCount: reviews.length });

    return reviewId;
  },
});
