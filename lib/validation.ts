import { z } from 'zod'

export const companyTypeSchema = z.enum(['STARTUP', 'ENTERPRISE', 'RESEARCH', 'NONPROFIT'])
export const companyStatusSchema = z.enum(['ACTIVE', 'ACQUIRED', 'CLOSED'])
export const companySortSchema = z.enum(['newest', 'oldest', 'name-asc', 'name-desc']).default('newest')

const emptyToUndefined = (v: unknown) => (typeof v === 'string' && v.trim() === '' ? undefined : v)

export const companiesQuerySchema = z.object({
  search: z.preprocess(emptyToUndefined, z.string().optional()),
  industry: z.preprocess(emptyToUndefined, z.string().optional()),
  companyType: z.preprocess(emptyToUndefined, companyTypeSchema.optional()),
  status: z.preprocess(emptyToUndefined, companyStatusSchema.optional()),
  sort: z.preprocess(emptyToUndefined, companySortSchema.default('newest')),
  page: z.preprocess(
    emptyToUndefined,
    z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => {
        if (!val) return 1
        const num = typeof val === 'number' ? val : parseInt(val, 10)
        return isNaN(num) || num < 1 ? 1 : num
      })
      .pipe(z.number().int().min(1).default(1))
  ),
  limit: z.preprocess(
    emptyToUndefined,
    z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => {
        if (!val) return 12
        const num = typeof val === 'number' ? val : parseInt(val, 10)
        return isNaN(num) || num < 1 ? 12 : Math.min(num, 100)
      })
      .pipe(z.number().int().min(1).max(100).default(12))
  ),
})

export type CompaniesQuery = z.infer<typeof companiesQuerySchema>

export function validateQuery<T extends z.ZodTypeAny>(
  schema: T,
  data: Record<string, any>
): { success: true; data: z.infer<T> } | { success: false; error: string } {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errorMessage = result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')
    return { success: false, error: errorMessage }
  }
  return { success: true, data: result.data }
}
