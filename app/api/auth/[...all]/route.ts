// Better-Auth + Convex route handler.
// Only active once NEXT_PUBLIC_CONVEX_URL is configured.
// Until then, the existing /api/auth/login and /api/auth/register routes handle auth.

const convexConfigured = !!process.env.NEXT_PUBLIC_CONVEX_URL;

let handler: { GET: any; POST: any } | null = null;

if (convexConfigured) {
  const { handler: h } = require("@/lib/auth-server");
  handler = h;
}

export const GET = handler?.GET ?? (async () => new Response("Convex not configured", { status: 503 }));
export const POST = handler?.POST ?? (async () => new Response("Convex not configured", { status: 503 }));
