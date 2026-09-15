import { z } from 'zod'

// Query parameter validation schemas
export const companiesQuerySchema = z.object({
  search: z.string().optional(),
  industry: z.string().optional(),
  companyType: z.enum(['STARTUP', 'ENTERPRISE', 'RESEARCH', 'NONPROFIT']).optional(),
  status: z.enum(['ACTIVE', 'ACQUIRED', 'CLOSED']).optional(),
  sort: z.enum(['newest', 'oldest', 'name-asc', 'name-desc']).optional().default('newest'),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(12),
})

export type CompaniesQuery = z.infer<typeof companiesQuerySchema>

// Validation helper
export function validateQuery<T>(schema: z.ZodSchema<T>, data: unknown): 
  { success: true; data: T } | { success: false; error: string } {
  try {
    const validated = schema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      return { success: false, error: messages }
    }
    return { success: false, error: 'Validation failed' }
  }
}
