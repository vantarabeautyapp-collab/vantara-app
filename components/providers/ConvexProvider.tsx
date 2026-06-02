"use client";

import { ReactNode } from "react";

// Convex + Better-Auth provider — only active once NEXT_PUBLIC_CONVEX_URL is set.
// App works normally without it (falls back to legacy JSON auth).

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

function FallbackProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

let ConvexBetterAuthProviderModule: any = FallbackProvider;
let convexClient: any = null;

if (convexUrl) {
  try {
    const { ConvexReactClient } = require("convex/react");
    const { ConvexBetterAuthProvider } = require("@convex-dev/better-auth/react");
    const { authClient } = require("@/lib/auth-client");
    convexClient = new ConvexReactClient(convexUrl);

    ConvexBetterAuthProviderModule = function ConvexWrapper({
      children,
      initialToken,
    }: {
      children: ReactNode;
      initialToken?: string | null;
    }) {
      return (
        <ConvexBetterAuthProvider
          client={convexClient}
          authClient={authClient}
          initialToken={initialToken}
        >
          {children}
        </ConvexBetterAuthProvider>
      );
    };
  } catch {
    // Packages not yet available — use fallback
  }
}

export function ConvexClientProvider({
  children,
  initialToken,
}: {
  children: ReactNode;
  initialToken?: string | null;
}) {
  const Provider = ConvexBetterAuthProviderModule;
  return <Provider initialToken={initialToken}>{children}</Provider>;
}
