// Ingest front-end errors, log to Convex errorLogs table, and optionally
// create a Linear issue for critical/high severity errors.
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false }, { status: 400 });

  const { message, stack, context, url, severity = "medium" } = body as {
    message: string;
    stack?: string;
    context?: string;
    url?: string;
    severity?: "low" | "medium" | "high" | "critical";
  };

  // Log to console for Railway log aggregation
  console.error(`[ErrorLog][${severity.toUpperCase()}] ${message}`, { stack, context, url });

  // Forward to Linear for high/critical issues
  const linearKey = process.env.LINEAR_API_KEY;
  const linearTeamId = process.env.LINEAR_TEAM_ID;
  if (linearKey && linearTeamId && (severity === "high" || severity === "critical")) {
    try {
      await fetch("https://api.linear.app/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: linearKey,
        },
        body: JSON.stringify({
          query: `
            mutation IssueCreate($input: IssueCreateInput!) {
              issueCreate(input: $input) { success issue { id } }
            }
          `,
          variables: {
            input: {
              teamId: linearTeamId,
              title: `[${severity.toUpperCase()}] ${message.slice(0, 120)}`,
              description: `**URL:** ${url ?? "unknown"}\n\n**Context:** ${context ?? "none"}\n\n\`\`\`\n${stack ?? "No stack trace"}\n\`\`\``,
              priority: severity === "critical" ? 1 : 2,
              labelIds: [],
            },
          },
        }),
        signal: AbortSignal.timeout(5000),
      });
    } catch (e) {
      console.error("Failed to create Linear issue:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
