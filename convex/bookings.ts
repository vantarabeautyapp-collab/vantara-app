import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";

export const getMyBookings = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, { status }) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) return [];

    let q = ctx.db.query("bookings").withIndex("by_customer", x => x.eq("customerId", user._id));
    const bookings = await q.order("desc").collect();
    return status ? bookings.filter(b => b.status === status) : bookings;
  },
});

export const getBusinessBookings = query({
  args: { businessId: v.id("businesses"), date: v.optional(v.string()) },
  handler: async (ctx, { businessId, date }) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) return [];

    // Only business owner or staff can see business bookings
    const business = await ctx.db.get(businessId);
    if (!business || (business.ownerId !== user._id && user.role !== "admin")) return [];

    let bookings = await ctx.db.query("bookings")
      .withIndex("by_business", q => q.eq("businessId", businessId))
      .order("desc")
      .collect();

    if (date) bookings = bookings.filter(b => b.date === date);
    return bookings;
  },
});

export const create = mutation({
  args: {
    businessId: v.id("businesses"),
    serviceId: v.id("services"),
    staffId: v.optional(v.id("staff")),
    date: v.string(),
    time: v.string(),
    paymentMethod: v.string(),
    customerNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) throw new Error("Not authenticated");

    const service = await ctx.db.get(args.serviceId);
    if (!service) throw new Error("Service not found");

    const loyaltyPointsEarned = Math.floor(service.price * 0.05); // 5% back as points

    const bookingId = await ctx.db.insert("bookings", {
      customerId: user._id,
      businessId: args.businessId,
      staffId: args.staffId,
      serviceId: args.serviceId,
      date: args.date,
      time: args.time,
      durationMinutes: service.duration,
      status: "pending",
      totalPrice: service.price,
      currency: service.currency,
      paymentMethod: args.paymentMethod,
      paymentStatus: "pending",
      customerNotes: args.customerNotes,
      loyaltyPointsEarned,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return bookingId;
  },
});

export const cancel = mutation({
  args: { bookingId: v.id("bookings"), reason: v.optional(v.string()) },
  handler: async (ctx, { bookingId, reason }) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) throw new Error("Not authenticated");

    const booking = await ctx.db.get(bookingId);
    if (!booking) throw new Error("Booking not found");
    if (booking.customerId !== user._id && user.role !== "admin") throw new Error("Not authorized");
    if (booking.status === "completed" || booking.status === "cancelled") {
      throw new Error("Cannot cancel a completed or already-cancelled booking");
    }

    await ctx.db.patch(bookingId, {
      status: "cancelled",
      cancelledBy: user._id,
      cancellationReason: reason,
      updatedAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    bookingId: v.id("bookings"),
    status: v.union(
      v.literal("confirmed"), v.literal("in_progress"),
      v.literal("completed"), v.literal("no_show")
    ),
  },
  handler: async (ctx, { bookingId, status }) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) throw new Error("Not authenticated");

    const booking = await ctx.db.get(bookingId);
    if (!booking) throw new Error("Booking not found");

    const business = await ctx.db.get(booking.businessId);
    if (!business || (business.ownerId !== user._id && user.role !== "admin")) {
      throw new Error("Not authorized to update booking status");
    }

    await ctx.db.patch(bookingId, { status, updatedAt: Date.now() });

    // Award loyalty points when completed
    if (status === "completed") {
      const customer = await ctx.db.get(booking.customerId);
      if (customer) {
        const newPoints = (customer.loyaltyPoints ?? 0) + booking.loyaltyPointsEarned;
        const newTier = newPoints >= 10000 ? "platinum"
          : newPoints >= 5000 ? "gold"
          : newPoints >= 1000 ? "silver"
          : "bronze";
        await ctx.db.patch(booking.customerId, {
          loyaltyPoints: newPoints,
          loyaltyTier: newTier,
          totalBookings: (customer.totalBookings ?? 0) + 1,
        });
      }
    }
  },
});
