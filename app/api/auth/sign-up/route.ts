import { NextRequest, NextResponse } from 'next/server'
import { registerUser, createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, error: { message: 'Name is required.' } },
        { status: 400 }
      )
    }

    if (!email?.trim() || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: { message: 'Please enter a valid email address.' } },
        { status: 400 }
      )
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, error: { message: 'Password must be at least 6 characters long.' } },
        { status: 400 }
      )
    }

    const user = registerUser(name, email, password)
    const token = createSession(user)

    const response = NextResponse.json({
      success: true,
      data: { user },
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
      { success: false, error: { message: error.message || 'Failed to sign up.' } },
      { status: 400 }
    )
  }
}
