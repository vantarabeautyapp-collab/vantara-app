// Better-Auth server utilities — only active once Convex is configured.
// The app keeps working with the legacy auth until Convex is set up.

let _handler: any = null;
let _helpers: any = {};

if (process.env.NEXT_PUBLIC_CONVEX_URL && process.env.NEXT_PUBLIC_CONVEX_SITE_URL) {
  try {
    const mod = require("@convex-dev/better-auth/nextjs");
    const result = mod.convexBetterAuthNextJs({
      convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL,
      convexSiteUrl: process.env.NEXT_PUBLIC_CONVEX_SITE_URL,
    });
    _handler = result.handler;
    _helpers = result;
  } catch {
    // Package not yet installed — graceful fallback
  }
}

export const handler = _handler;
export const preloadAuthQuery = _helpers.preloadAuthQuery;
export const isAuthenticated = _helpers.isAuthenticated ?? (async () => false);
export const getToken = _helpers.getToken ?? (async () => null);
export const fetchAuthQuery = _helpers.fetchAuthQuery;
export const fetchAuthMutation = _helpers.fetchAuthMutation;
export const fetchAuthAction = _helpers.fetchAuthAction;
