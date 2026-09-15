import { NextResponse } from 'next/server'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    message: string
    code: string
    details?: any
  }
}

export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  )
}

export function badRequestResponse(message: string | object, code: string = 'BAD_REQUEST') {
  return NextResponse.json(
    {
      success: false,
      error: {
        message: typeof message === 'string' ? message : JSON.stringify(message),
        code,
        ...(typeof message !== 'string' ? { details: message } : {}),
      },
    },
    { status: 400 }
  )
}

export function notFoundResponse(resource: string = 'Resource') {
  return NextResponse.json(
    {
      success: false,
      error: {
        message: `${resource} not found`,
        code: 'NOT_FOUND',
      },
    },
    { status: 404 }
  )
}

export function internalErrorResponse(message: string = 'An unexpected error occurred') {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code: 'INTERNAL_SERVER_ERROR',
      },
    },
    { status: 500 }
  )
}
