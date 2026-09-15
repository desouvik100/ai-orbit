import React from 'react'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { CompanyDetailView } from '@/components/companies/CompanyDetailView'
import { FALLBACK_COMPANIES } from '@/lib/fallback-data'

interface CompanyDetailPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params,
}: CompanyDetailPageProps): Promise<Metadata> {
  try {
    let company: { name: string; shortDescription: string } | null = null

    try {
      company = await prisma.company.findUnique({
        where: { slug: params.slug },
        select: { name: true, shortDescription: true },
      })
    } catch {
      const fb = FALLBACK_COMPANIES.find((c) => c.slug === params.slug)
      if (fb) {
        company = { name: fb.name, shortDescription: fb.shortDescription }
      }
    }

    if (!company) {
      return {
        title: 'Company Not Found | AI Orbit',
        description: 'The requested company profile could not be found on AI Orbit.',
      }
    }

    return {
      title: `${company.name} — AI Company Profile & Overview | AI Orbit`,
      description:
        company.shortDescription || `Discover details, products, and information for ${company.name} on AI Orbit.`,
    }
  } catch {
    return {
      title: 'Company Profile | AI Orbit',
      description: 'Explore leading AI companies in the global ecosystem on AI Orbit.',
    }
  }
}

export default function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  return (
    <main className="detail-container">
      <CompanyDetailView slug={params.slug} />
    </main>
  )
}
