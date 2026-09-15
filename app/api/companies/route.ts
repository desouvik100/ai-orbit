import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { companiesQuerySchema, validateQuery } from '@/lib/validation'
import { successResponse, badRequestResponse, internalErrorResponse } from '@/lib/api-response'
import { Prisma } from '@prisma/client'
import { FALLBACK_COMPANIES } from '@/lib/fallback-data'

export async function GET(request: NextRequest) {
  try {
    // Parse and validate query parameters
    const searchParams = Object.fromEntries(request.nextUrl.searchParams)
    const validation = validateQuery(companiesQuerySchema, searchParams)

    if (!validation.success) {
      return badRequestResponse(validation.error)
    }

    const { search, industry, companyType, status, sort, page, limit } = validation.data

    try {
      // Build where clause for filtering in Prisma
      const where: Prisma.CompanyWhereInput = {}

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { shortDescription: { contains: search, mode: 'insensitive' } },
          { industry: { contains: search, mode: 'insensitive' } },
        ]
      }

      if (industry) {
        where.industry = { contains: industry, mode: 'insensitive' }
      }

      if (companyType) {
        where.companyType = companyType
      }

      if (status) {
        where.status = status
      }

      let orderBy: Prisma.CompanyOrderByWithRelationInput = {}

      switch (sort) {
        case 'newest':
          orderBy = { createdAt: 'desc' }
          break
        case 'oldest':
          orderBy = { createdAt: 'asc' }
          break
        case 'name-asc':
          orderBy = { name: 'asc' }
          break
        case 'name-desc':
          orderBy = { name: 'desc' }
          break
        default:
          orderBy = { createdAt: 'desc' }
      }

      const skip = (page - 1) * limit

      const [companies, total] = await Promise.all([
        prisma.company.findMany({
          where,
          orderBy,
          skip,
          take: limit,
          select: {
            id: true,
            name: true,
            slug: true,
            shortDescription: true,
            logo: true,
            website: true,
            headquarters: true,
            foundedYear: true,
            industry: true,
            companyType: true,
            employeeRange: true,
            status: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
        prisma.company.count({ where }),
      ])

      const totalPages = Math.ceil(total / limit)

      return successResponse({
        companies,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      })
    } catch (dbError) {
      console.warn('Database unreachable, serving from seed fallback records:', dbError)

      // In-memory filter matching identical Prisma query behavior
      let filtered = [...FALLBACK_COMPANIES]

      if (search) {
        const queryLower = search.toLowerCase()
        filtered = filtered.filter(
          (c) =>
            c.name.toLowerCase().includes(queryLower) ||
            c.shortDescription.toLowerCase().includes(queryLower) ||
            (c.industry && c.industry.toLowerCase().includes(queryLower))
        )
      }

      if (industry) {
        const indLower = industry.toLowerCase()
        filtered = filtered.filter((c) => c.industry && c.industry.toLowerCase().includes(indLower))
      }

      if (companyType) {
        filtered = filtered.filter((c) => c.companyType === companyType)
      }

      if (status) {
        filtered = filtered.filter((c) => c.status === status)
      }

      // In-memory sorting
      filtered.sort((a, b) => {
        if (sort === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
        if (sort === 'oldest') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        }
        if (sort === 'name-asc') {
          return a.name.localeCompare(b.name)
        }
        if (sort === 'name-desc') {
          return b.name.localeCompare(a.name)
        }
        return 0
      })

      const total = filtered.length
      const totalPages = Math.ceil(total / limit)
      const skip = (page - 1) * limit
      const paginated = filtered.slice(skip, skip + limit)

      return successResponse({
        companies: paginated,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      })
    }
  } catch (error) {
    console.error('Error fetching companies:', error)
    return internalErrorResponse()
  }
}
