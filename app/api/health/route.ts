import { NextResponse } from "next/server";

// Railway health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "ok",
    app: "Vantara",
    version: process.env.npm_package_version ?? "0.1.0",
    env: process.env.NODE_ENV,
    convex: !!process.env.NEXT_PUBLIC_CONVEX_URL,
    stripe: !!process.env.STRIPE_SECRET_KEY,
    posthog: !!process.env.NEXT_PUBLIC_POSTHOG_KEY,
    sentry: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
    timestamp: new Date().toISOString(),
  });
}
