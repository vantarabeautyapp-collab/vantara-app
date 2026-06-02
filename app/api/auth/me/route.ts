import { NextRequest, NextResponse } from 'next/server'
import { getUserById } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const payload = verifyToken(token)
  if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const user = getUserById(payload.userId)
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const { passwordHash: _, ...userOut } = user
  return NextResponse.json(userOut)
}
