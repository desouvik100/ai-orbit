import { prisma } from './prisma'
import { FALLBACK_COMPANIES } from './fallback-data'
import { CompanyListItem } from './types'

const userSavedStore: Map<string, Set<string>> = new Map([
  ['usr_demo', new Set(['openai', 'anthropic'])],
])

export function getUserSavedSlugs(userId: string): string[] {
  const set = userSavedStore.get(userId)
  return set ? Array.from(set) : []
}

export function saveCompanyForUser(userId: string, slug: string): boolean {
  let set = userSavedStore.get(userId)
  if (!set) {
    set = new Set()
    userSavedStore.set(userId, set)
  }
  set.add(slug)
  return true
}

export function unsaveCompanyForUser(userId: string, slug: string): boolean {
  const set = userSavedStore.get(userId)
  if (!set) return false
  const existed = set.delete(slug)
  return existed
}

export function isCompanySavedForUser(userId: string, slug: string): boolean {
  const set = userSavedStore.get(userId)
  return set ? set.has(slug) : false
}

export async function getSavedCompanyItems(userId: string): Promise<CompanyListItem[]> {
  const slugs = getUserSavedSlugs(userId)
  if (slugs.length === 0) return []

  try {
    const companies = await prisma.company.findMany({
      where: {
        slug: { in: slugs },
      },
    })
    if (companies && companies.length > 0) {
      return companies.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        shortDescription: c.shortDescription,
        logo: c.logo,
        website: c.website,
        headquarters: c.headquarters,
        foundedYear: c.foundedYear,
        industry: c.industry,
        companyType: c.companyType,
        employeeRange: c.employeeRange,
        status: c.status,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
      }))
    }
  } catch {
  }

  return FALLBACK_COMPANIES.filter((c) => slugs.includes(c.slug))
}
