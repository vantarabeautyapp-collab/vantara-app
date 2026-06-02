import { mutation } from "./_generated/server";

// Run once via Convex dashboard or CLI to populate placeholder data.
// npx convex run seed:run
export const run = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("businesses").take(1);
    if (existing.length > 0) return { message: "Already seeded" };

    // Create demo businesses
    const demos = [
      {
        name: "Crown Cuts Barbershop",
        type: "barbershop",
        description: "Award-winning barbershop serving Nairobi's finest since 2015. Our master barbers specialise in fades, line-ups, and traditional African hair art.",
        shortDescription: "Nairobi's #1 rated barbershop. Fades, line-ups & beard trims.",
        countryCode: "KE", city: "Nairobi", neighborhood: "Westlands",
        address: "The Oval, Ring Road Westlands", phone: "+254 700 123 456",
        rating: 4.9, reviewCount: 312, badge: "elite", planTier: "elite",
        priceRange: "premium", featured: true, verified: true,
        amenities: ["WiFi", "AC", "Parking", "Online booking", "Card payments"],
        hours: JSON.stringify({
          Monday: { open: "08:00", close: "20:00", closed: false },
          Tuesday: { open: "08:00", close: "20:00", closed: false },
          Wednesday: { open: "08:00", close: "20:00", closed: false },
          Thursday: { open: "08:00", close: "20:00", closed: false },
          Friday: { open: "08:00", close: "21:00", closed: false },
          Saturday: { open: "09:00", close: "19:00", closed: false },
          Sunday: { open: "10:00", close: "17:00", closed: false },
        }),
        images: [
          "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800",
          "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800",
        ],
      },
      {
        name: "Luxe Beauty Lounge",
        type: "hair_salon",
        description: "Premium hair salon specialising in natural African hair. We offer braiding, loc maintenance, weaves, and colour treatments using only the finest products.",
        shortDescription: "Premium African hair salon. Braids, locs, weaves & colour.",
        countryCode: "KE", city: "Nairobi", neighborhood: "Karen",
        address: "Karen Shopping Centre, Langata Road", phone: "+254 722 987 654",
        rating: 4.8, reviewCount: 487, badge: "premium", planTier: "premium",
        priceRange: "luxury", featured: true, verified: true,
        amenities: ["WiFi", "AC", "Refreshments", "Child-friendly", "Parking"],
        hours: JSON.stringify({
          Monday: { open: "09:00", close: "19:00", closed: false },
          Tuesday: { open: "09:00", close: "19:00", closed: false },
          Wednesday: { open: "09:00", close: "19:00", closed: false },
          Thursday: { open: "09:00", close: "19:00", closed: false },
          Friday: { open: "09:00", close: "20:00", closed: false },
          Saturday: { open: "08:00", close: "18:00", closed: false },
          Sunday: { open: "10:00", close: "16:00", closed: false },
        }),
        images: [
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
          "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800",
        ],
      },
      {
        name: "Glam Nail Studio",
        type: "nail_studio",
        description: "Nairobi's trendiest nail studio. We specialise in gel nails, nail art, manicures, and pedicures with a focus on long-lasting, statement looks.",
        shortDescription: "Gel nails, nail art & manicures by Nairobi's top technicians.",
        countryCode: "KE", city: "Nairobi", neighborhood: "Kilimani",
        address: "Yaya Centre, Argwings Kodhek Rd", phone: "+254 733 456 789",
        rating: 4.7, reviewCount: 203, badge: "verified", planTier: "free",
        priceRange: "mid", featured: false, verified: true,
        amenities: ["WiFi", "AC", "Parking"],
        hours: JSON.stringify({
          Monday: { open: "09:00", close: "18:00", closed: false },
          Tuesday: { open: "09:00", close: "18:00", closed: false },
          Wednesday: { open: "09:00", close: "18:00", closed: false },
          Thursday: { open: "09:00", close: "18:00", closed: false },
          Friday: { open: "09:00", close: "19:00", closed: false },
          Saturday: { open: "08:00", close: "17:00", closed: false },
          Sunday: { open: "12:00", close: "17:00", closed: false },
        }),
        images: [
          "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800",
        ],
      },
      {
        name: "Urban Fade Kampala",
        type: "barbershop",
        description: "Kampala's premier barbershop experience. Modern fades, beard sculpting, and hot towel shaves in a luxurious setting.",
        shortDescription: "Kampala's top fade specialists. Hot towel shaves & beard sculpting.",
        countryCode: "UG", city: "Kampala", neighborhood: "Kololo",
        address: "Acacia Mall, Acacia Avenue", phone: "+256 700 111 222",
        rating: 4.8, reviewCount: 156, badge: "premium", planTier: "premium",
        priceRange: "premium", featured: true, verified: true,
        amenities: ["WiFi", "AC", "Parking", "Card payments", "M-Pesa"],
        hours: JSON.stringify({
          Monday: { open: "08:00", close: "20:00", closed: false },
          Tuesday: { open: "08:00", close: "20:00", closed: false },
          Wednesday: { open: "08:00", close: "20:00", closed: false },
          Thursday: { open: "08:00", close: "20:00", closed: false },
          Friday: { open: "08:00", close: "21:00", closed: false },
          Saturday: { open: "09:00", close: "19:00", closed: false },
          Sunday: { open: "10:00", close: "17:00", closed: false },
        }),
        images: [
          "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800",
        ],
      },
      {
        name: "Lagos Glow Skincare",
        type: "beauty_parlour",
        description: "Lagos' premier skincare and facial studio. Specialising in African skin tones, hyperpigmentation treatment, and natural glow facials.",
        shortDescription: "Expert skincare for African skin tones. Glow facials & hyperpigmentation.",
        countryCode: "NG", city: "Lagos", neighborhood: "Victoria Island",
        address: "1415 Adeola Hopewell St, Victoria Island", phone: "+234 801 234 5678",
        rating: 4.9, reviewCount: 89, badge: "premium", planTier: "premium",
        priceRange: "luxury", featured: true, verified: true,
        amenities: ["WiFi", "AC", "Parking", "Card payments", "Flutterwave"],
        hours: JSON.stringify({
          Monday: { open: "10:00", close: "19:00", closed: false },
          Tuesday: { open: "10:00", close: "19:00", closed: false },
          Wednesday: { open: "10:00", close: "19:00", closed: false },
          Thursday: { open: "10:00", close: "19:00", closed: false },
          Friday: { open: "10:00", close: "20:00", closed: false },
          Saturday: { open: "09:00", close: "18:00", closed: false },
          Sunday: { open: "12:00", close: "17:00", closed: true },
        }),
        images: [
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
        ],
      },
    ] as const;

    // Create a seed admin user to own all demo businesses
    const adminId = await ctx.db.insert("users", {
      name: "Vantara Admin",
      email: "admin@vantara.com",
      emailVerified: true,
      role: "admin",
      loyaltyPoints: 0,
      loyaltyTier: "platinum",
      totalBookings: 0,
      banned: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const ids: string[] = [];
    for (const demo of demos) {
      const id = await ctx.db.insert("businesses", {
        ...demo,
        ownerId: adminId,
        email: undefined,
        website: undefined,
        instagram: undefined,
        coverImage: undefined,
        latitude: undefined,
        longitude: undefined,
        stripeSubscriptionId: undefined,
        isOpen: true,
        active: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      // Add services for the business
      if (demo.type === "barbershop") {
        await ctx.db.insert("services", { businessId: id, name: "Classic Fade", category: "haircut", description: "Clean, sharp fade with detailed line-up", price: 800, currency: demo.countryCode === "KE" ? "KES" : demo.countryCode === "UG" ? "UGX" : "NGN", duration: 45, popular: true, active: true });
        await ctx.db.insert("services", { businessId: id, name: "Beard Trim & Shape", category: "beard", description: "Precision beard sculpting with hot towel finish", price: 500, currency: demo.countryCode === "KE" ? "KES" : demo.countryCode === "UG" ? "UGX" : "NGN", duration: 30, popular: false, active: true });
        await ctx.db.insert("services", { businessId: id, name: "The Full Package", category: "haircut", description: "Fade + beard + hot towel shave + moisturise", price: 1500, currency: demo.countryCode === "KE" ? "KES" : demo.countryCode === "UG" ? "UGX" : "NGN", duration: 75, popular: true, active: true });
      } else if (demo.type === "hair_salon") {
        await ctx.db.insert("services", { businessId: id, name: "Box Braids", category: "braiding", description: "Classic box braids. Any length, any size.", price: 3500, currency: "KES", duration: 240, popular: true, active: true });
        await ctx.db.insert("services", { businessId: id, name: "Loc Retwist", category: "locs", description: "Professional loc maintenance and retwist", price: 2000, currency: "KES", duration: 120, popular: false, active: true });
        await ctx.db.insert("services", { businessId: id, name: "Hair Colour", category: "color", description: "Full colour treatment by certified colourists", price: 5000, currency: "KES", duration: 180, popular: false, active: true });
      }

      ids.push(id);
    }

    // Seed loyalty rewards
    await ctx.db.insert("loyaltyRewards", { name: "20% Off Your Next Visit", description: "Valid on any service at any StyleAfrique partner", pointsCost: 500, category: "discount", available: true });
    await ctx.db.insert("loyaltyRewards", { name: "Free Classic Fade", description: "One free classic fade at Crown Cuts or Urban Fade", pointsCost: 1000, category: "free_service", available: true });
    await ctx.db.insert("loyaltyRewards", { name: "VIP Priority Booking", description: "Skip the queue — book up to 30 days in advance", pointsCost: 2000, category: "vip_access", available: true });
    await ctx.db.insert("loyaltyRewards", { name: "Free Gel Manicure", description: "One free gel manicure at Glam Nail Studio", pointsCost: 1500, category: "free_service", available: false });

    return { message: `Seeded ${ids.length} businesses`, ids };
  },
});
