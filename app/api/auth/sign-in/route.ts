import { NextRequest, NextResponse } from 'next/server'
import { findUserByEmail, createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: { message: 'Email and password are required.' } },
        { status: 400 }
      )
    }

    const user = findUserByEmail(email)
    if (!user || user.passwordHash !== password) {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid email address or password.' } },
        { status: 401 }
      )
    }

    const token = createSession({ id: user.id, name: user.name, email: user.email })

    const response = NextResponse.json({
      success: true,
      data: {
        user: { id: user.id, name: user.name, email: user.email },
      },
    })

    response.cookies.set('ai_orbit_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message || 'Failed to sign in.' } },
      { status: 500 }
    )
  }
}
