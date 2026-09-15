export type CompanyType = 'STARTUP' | 'ENTERPRISE' | 'RESEARCH' | 'NONPROFIT'

export type CompanyStatus = 'ACTIVE' | 'ACQUIRED' | 'CLOSED'

export type EmployeeRange =
  | 'SOLO_1'
  | 'SMALL_2_10'
  | 'MEDIUM_11_50'
  | 'LARGE_51_200'
  | 'XLARGE_201_500'
  | 'ENTERPRISE_501_PLUS'

export type CompanySortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc'

export interface CompanyListItem {
  id: string
  name: string
  slug: string
  shortDescription: string
  logo: string | null
  website: string
  headquarters: string
  foundedYear: number | null
  industry: string
  companyType: CompanyType
  employeeRange: EmployeeRange | null
  status: CompanyStatus
  createdAt: string
  updatedAt: string
}

export interface ProductItem {
  id: string
  name: string
  slug: string
  description: string
  website: string | null
  logo: string | null
  createdAt: string
  updatedAt: string
}

export interface CategoryItem {
  id: string
  name: string
  slug: string
  description: string | null
}

export interface RelatedCompanyItem {
  id: string
  name: string
  slug: string
  shortDescription: string
  logo: string | null
  industry: string
  companyType: CompanyType
  headquarters: string
}

export interface CompanyDetail extends CompanyListItem {
  description: string
  products: ProductItem[]
  categories: CategoryItem[]
  relatedCompanies: RelatedCompanyItem[]
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface CompaniesApiResponse {
  success: boolean
  data?: {
    companies: CompanyListItem[]
    pagination: PaginationMeta
  }
  error?: {
    message: string
    code: string
  }
}

export interface CompanyDetailApiResponse {
  success: boolean
  data?: CompanyDetail
  error?: {
    message: string
    code: string
  }
}

export interface CompaniesFilterParams {
  search?: string
  industry?: string
  companyType?: string
  status?: string
  sort?: CompanySortOption
  page?: number
  limit?: number
}
