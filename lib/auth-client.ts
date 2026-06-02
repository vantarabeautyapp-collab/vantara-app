"use client";

// Better-Auth client — only active once @convex-dev/better-auth is installed
// and NEXT_PUBLIC_CONVEX_SITE_URL is configured.
// Until then, auth flows use the existing /api/auth/login + /api/auth/register routes.

let _authClient: any = null;

if (process.env.NEXT_PUBLIC_CONVEX_SITE_URL) {
  try {
    const { createAuthClient } = require("better-auth/react");
    const { convexClient } = require("@convex-dev/better-auth/client/plugins");
    _authClient = createAuthClient({
      baseURL: process.env.NEXT_PUBLIC_CONVEX_SITE_URL,
      plugins: [convexClient()],
    });
  } catch {
    // Package not yet installed — graceful fallback
  }
}

export const authClient = _authClient;
export const signIn = _authClient?.signIn;
export const signUp = _authClient?.signUp;
export const signOut = _authClient?.signOut;
export const useSession = _authClient?.useSession ?? (() => ({ data: null, isPending: false }));
export const getSession = _authClient?.getSession;
