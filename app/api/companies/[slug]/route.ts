import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, notFoundResponse, internalErrorResponse } from '@/lib/api-response'
import { FALLBACK_COMPANIES } from '@/lib/fallback-data'

type Params = {
  params: {
    slug: string
  }
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { slug } = params

    try {
      const company = await prisma.company.findUnique({
        where: { slug },
        include: {
          products: {
            select: {
              id: true,
              name: true,
              slug: true,
              description: true,
              website: true,
              logo: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          categories: {
            include: {
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  description: true,
                },
              },
            },
          },
          relatedCompanies: {
            include: {
              relatedCompany: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  shortDescription: true,
                  logo: true,
                  industry: true,
                  companyType: true,
                  headquarters: true,
                },
              },
            },
            take: 6,
          },
        },
      })

      if (!company) {
        return notFoundResponse('Company')
      }

      const transformedCompany = {
        ...company,
        categories: company.categories.map((cc) => cc.category),
        relatedCompanies: company.relatedCompanies.map((rc) => rc.relatedCompany),
      }

      return successResponse(transformedCompany)
    } catch (dbError) {
      console.warn(`Database unreachable, serving ${slug} from fallback records:`, dbError)

      const fallbackCompany = FALLBACK_COMPANIES.find((c) => c.slug === slug)
      if (!fallbackCompany) {
        return notFoundResponse('Company')
      }

      return successResponse(fallbackCompany)
    }
  } catch (error) {
    console.error('Error fetching company:', error)
    return internalErrorResponse()
  }
}
