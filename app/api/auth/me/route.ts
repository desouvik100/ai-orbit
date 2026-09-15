import { NextRequest, NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('ai_orbit_session')?.value
  if (!token) {
    return NextResponse.json({ success: true, data: { user: null } })
  }

  const user = getSessionUser(token)
  return NextResponse.json({ success: true, data: { user } })
}
