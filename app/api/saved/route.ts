import { NextRequest, NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import {
  getUserSavedSlugs,
  saveCompanyForUser,
  unsaveCompanyForUser,
  getSavedCompanyItems,
} from '@/lib/saved'

function getAuthenticatedUser(request: NextRequest) {
  const token = request.cookies.get('ai_orbit_session')?.value
  if (!token) return null
  return getSessionUser(token)
}

export async function GET(request: NextRequest) {
  const user = getAuthenticatedUser(request)
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Authentication required. Please sign in.' },
      { status: 401 }
    )
  }

  const savedSlugs = getUserSavedSlugs(user.id)
  const companies = await getSavedCompanyItems(user.id)

  return NextResponse.json({
    success: true,
    data: {
      savedSlugs,
      companies,
    },
  })
}

export async function POST(request: NextRequest) {
  const user = getAuthenticatedUser(request)
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Authentication required. Please sign in to save companies.' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { slug } = body

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid company identifier' },
        { status: 400 }
      )
    }

    saveCompanyForUser(user.id, slug.trim())
    const savedSlugs = getUserSavedSlugs(user.id)

    return NextResponse.json({
      success: true,
      data: {
        savedSlugs,
        isSaved: true,
      },
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to save company' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const user = getAuthenticatedUser(request)
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Authentication required. Please sign in.' },
      { status: 401 }
    )
  }

  try {
    let slug = request.nextUrl.searchParams.get('slug')
    if (!slug) {
      const body = await request.json().catch(() => ({}))
      slug = body?.slug
    }

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid company identifier' },
        { status: 400 }
      )
    }

    unsaveCompanyForUser(user.id, slug.trim())
    const savedSlugs = getUserSavedSlugs(user.id)

    return NextResponse.json({
      success: true,
      data: {
        savedSlugs,
        isSaved: false,
      },
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to remove saved company' },
      { status: 500 }
    )
  }
}
