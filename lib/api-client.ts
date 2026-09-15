import {
  CompaniesApiResponse,
  CompaniesFilterParams,
  CompanyDetail,
  CompanyDetailApiResponse,
  CompanyListItem,
  PaginationMeta,
} from './types'

export class ApiError extends Error {
  statusCode: number
  code?: string

  constructor(message: string, statusCode: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.code = code
  }
}

export async function fetchCompanies(
  params: CompaniesFilterParams = {},
  signal?: AbortSignal
): Promise<{ companies: CompanyListItem[]; pagination: PaginationMeta }> {
  const query = new URLSearchParams()

  if (params.search?.trim()) query.set('search', params.search.trim())
  if (params.industry?.trim()) query.set('industry', params.industry.trim())
  if (params.companyType?.trim()) query.set('companyType', params.companyType.trim())
  if (params.status?.trim()) query.set('status', params.status.trim())
  if (params.sort) query.set('sort', params.sort)
  if (params.page && params.page > 1) query.set('page', params.page.toString())
  if (params.limit && params.limit !== 12) query.set('limit', params.limit.toString())

  const queryString = query.toString()
  const url = `/api/companies${queryString ? `?${queryString}` : ''}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    signal,
  })

  const payload: CompaniesApiResponse = await response.json()

  if (!response.ok || !payload.success || !payload.data) {
    throw new ApiError(
      payload.error?.message || 'Failed to fetch companies',
      response.status,
      payload.error?.code
    )
  }

  return payload.data
}

export async function fetchCompanyBySlug(
  slug: string,
  signal?: AbortSignal
): Promise<CompanyDetail> {
  const url = `/api/companies/${encodeURIComponent(slug)}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    signal,
  })

  const payload: CompanyDetailApiResponse = await response.json()

  if (!response.ok || !payload.success || !payload.data) {
    throw new ApiError(
      payload.error?.message || 'Failed to fetch company details',
      response.status,
      payload.error?.code
    )
  }

  return payload.data
}
