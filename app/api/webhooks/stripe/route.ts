import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature") ?? "";

  let event: any;
  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeKey);
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Stripe webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const { businessId, plan } = session.metadata ?? {};
      console.log(`[Stripe] Subscription created: business=${businessId} plan=${plan}`);
      // TODO: Update business planTier in Convex when Convex is configured
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      console.log(`[Stripe] Subscription cancelled: ${sub.id}`);
      // TODO: Downgrade business to free tier
      break;
    }
    case "invoice.payment_failed": {
      console.log(`[Stripe] Payment failed: ${event.data.object.id}`);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
