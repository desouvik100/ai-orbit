import { NextResponse } from 'next/server'

export type ApiSuccessResponse<T> = {
  success: true
  data: T
}

export type ApiErrorResponse = {
  success: false
  error: {
    message: string
    code?: string
  }
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export function successResponse<T>(data: T, status = 200): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json({ success: true, data }, { status })
}

export function errorResponse(
  message: string,
  status = 500,
  code?: string
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error: { message, ...(code && { code }) },
    },
    { status }
  )
}

export function notFoundResponse(resource = 'Resource'): NextResponse<ApiErrorResponse> {
  return errorResponse(`${resource} not found`, 404, 'NOT_FOUND')
}

export function badRequestResponse(message: string): NextResponse<ApiErrorResponse> {
  return errorResponse(message, 400, 'BAD_REQUEST')
}

export function internalErrorResponse(): NextResponse<ApiErrorResponse> {
  return errorResponse('Internal server error', 500, 'INTERNAL_ERROR')
}
