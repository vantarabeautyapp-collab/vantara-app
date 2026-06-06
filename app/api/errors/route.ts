/**
 * POST /api/errors
 * ─────────────────────────────────────────────────────────────────────────────
 * Central error-ingestion endpoint.  Accepts structured error events from:
 *   • Client-side React error boundaries
 *   • Server-side payment failure handlers (Stripe, Flutterwave)
 *   • Stripe webhook failures
 *   • Any other internal service
 *
 * Fan-out:
 *   1. Console log  → visible in Railway / Vercel log streams (always)
 *   2. Linear issue → requires LINEAR_API_KEY + LINEAR_TEAM_ID env vars
 *                     Only created for severity === 'high' | 'critical'
 *
 * Rate-limited to 20 req/min per IP (enforced in middleware.ts).
 *
 * Accepted payload fields (all optional except message):
 *   type?      string   — category: "payment_failed" | "stripe_error" | etc.
 *   message    string   — human-readable description (required)
 *   stack?     string   — JS stack trace
 *   context?   any      — extra metadata object or string
 *   url?       string   — page / endpoint where error occurred
 *   severity?  string   — "low" | "medium" | "high" | "critical"  (default: medium)
 */

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const LINEAR_PRIORITY: Record<string, number> = {
  low:      4,
  medium:   3,
  high:     2,
  critical: 1,
}

async function createLinearIssue(params: {
  type:      string
  message:   string
  stack?:    string
  context?:  unknown
  url?:      string
  severity:  string
}) {
  const apiKey = process.env.LINEAR_API_KEY
  const teamId = process.env.LINEAR_TEAM_ID
  if (!apiKey || !teamId) return

  const contextStr = params.context
    ? typeof params.context === 'string'
      ? params.context
      : JSON.stringify(params.context, null, 2)
    : 'none'

  const description = [
    `**Type:** \`${params.type}\``,
    `**Severity:** ${params.severity}`,
    params.url      ? `**URL / Endpoint:** \`${params.url}\`` : '',
    `**Context:**\n\`\`\`json\n${contextStr}\n\`\`\``,
    params.stack    ? `**Stack Trace:**\n\`\`\`\n${params.stack.slice(0, 2000)}\n\`\`\`` : '',
    `**Reported at:** ${new Date().toISOString()}`,
  ].filter(Boolean).join('\n\n')

  try {
    const res = await fetch('https://api.linear.app/graphql', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify({
        query: `
          mutation IssueCreate($input: IssueCreateInput!) {
            issueCreate(input: $input) { success issue { id } }
          }
        `,
        variables: {
          input: {
            teamId,
            title:       `[${params.severity.toUpperCase()}][${params.type.toUpperCase()}] ${params.message.slice(0, 100)}`,
            description,
            priority:    LINEAR_PRIORITY[params.severity] ?? 3,
            labelIds:    [],
          },
        },
      }),
      signal: AbortSignal.timeout(8_000),
    })
    if (!res.ok) {
      console.error('[Errors API] Linear issue creation failed, status:', res.status)
    }
  } catch (err) {
    console.error('[Errors API] Linear request error:', err instanceof Error ? err.message : err)
  }
}

export async function POST(req: NextRequest) {
  // Size guard (4 KB)
  const cl = req.headers.get('content-length')
  if (cl && parseInt(cl) > 4096) {
    return NextResponse.json({ ok: false, error: 'Payload too large.' }, { status: 413 })
  }

  let body: Record<string, unknown>
  try {
    body = (await req.json()) ?? {}
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON.' }, { status: 400 })
  }

  const message  = typeof body.message === 'string' ? body.message.slice(0, 512) : 'Unknown error'
  const type     = typeof body.type    === 'string' ? body.type.slice(0, 64)     : 'runtime_error'
  const stack    = typeof body.stack   === 'string' ? body.stack                 : undefined
  const url      = typeof body.url     === 'string' ? body.url.slice(0, 256)     : undefined
  const context  = body.context ?? undefined

  const allowedSeverities = ['low', 'medium', 'high', 'critical'] as const
  const severity: string = allowedSeverities.includes(body.severity as any)
    ? String(body.severity)
    : 'medium'

  // ── Console log (always) ─────────────────────────────────────────────────
  const logMethod = severity === 'high' || severity === 'critical' ? 'error' : 'warn'
  console[logMethod](
    `[ErrorLog][${severity.toUpperCase()}][${type.toUpperCase()}] ${message}`,
    { stack, context, url },
  )

  // ── Linear (high/critical only) ──────────────────────────────────────────
  if (severity === 'high' || severity === 'critical') {
    void createLinearIssue({ type, message, stack, context, url, severity })
  }

  return NextResponse.json({ ok: true })
}
