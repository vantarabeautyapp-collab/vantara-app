import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const PLANS = {
  premium: {
    name: "Vantara Premium",
    price: 2999, // KES/month
    usd: 23,     // ~USD equivalent shown to other countries
    features: ["Verified badge", "Priority listing", "Booking analytics", "WhatsApp integration", "Up to 5 staff"],
  },
  elite: {
    name: "Vantara Elite",
    price: 6999,
    usd: 55,
    features: ["Elite badge", "Top search placement", "Full analytics suite", "API access", "Unlimited staff", "Dedicated support"],
  },
} as const;

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: "Payment not configured" }, { status: 503 });
  }

  const body = await req.json();
  const { plan, businessId, countryCode } = body as { plan: "premium" | "elite"; businessId: string; countryCode?: string };

  if (!PLANS[plan]) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeKey);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: PLANS[plan].name,
              description: PLANS[plan].features.join(" · "),
            },
            unit_amount: PLANS[plan].usd * 100,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      metadata: { businessId, plan, countryCode: countryCode ?? "" },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/business/settings?upgraded=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/business/settings?cancelled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: err.message ?? "Payment failed" }, { status: 500 });
  }
}
