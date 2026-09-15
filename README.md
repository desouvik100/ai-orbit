# AI Orbit - Companies Backend

Production-quality backend for the AI company discovery module.

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Prisma ORM** with PostgreSQL
- **Zod** for validation

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Create a `.env` file based on `.env.example`:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

### 3. Run Migrations

```bash
npm run db:push
```

Or for production with migration history:

```bash
npm run db:migrate
```

### 4. Seed Database

```bash
npm run db:seed
```

This creates 47 AI companies with products, categories, and relationships.

### 5. Start Development Server

```bash
npm run dev
```

API available at `http://localhost:3000`

## API Endpoints

### GET /api/companies

List companies with filtering, search, sort, and pagination.

**Query Parameters:**

- `search` (optional): Search in name, shortDescription, industry
- `industry` (optional): Filter by industry (case-insensitive)
- `companyType` (optional): STARTUP | ENTERPRISE | RESEARCH | NONPROFIT
- `status` (optional): ACTIVE | ACQUIRED | CLOSED
- `sort` (optional): newest | oldest | name-asc | name-desc (default: newest)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page, max 100 (default: 12)

**Example Requests:**

```bash
# List all companies
GET /api/companies

# Search for AI research companies
GET /api/companies?search=research

# Filter by industry
GET /api/companies?industry=AI%20Infrastructure

# Filter by company type
GET /api/companies?companyType=STARTUP

# Multiple filters with sorting
GET /api/companies?companyType=STARTUP&status=ACTIVE&sort=name-asc

# Pagination
GET /api/companies?page=2&limit=20
```

**Response:**

```json
{
  "success": true,
  "data": {
    "companies": [
      {
        "id": "...",
        "name": "OpenAI",
        "slug": "openai",
        "shortDescription": "...",
        "logo": "...",
        "website": "...",
        "headquarters": "San Francisco, CA",
        "foundedYear": 2015,
        "industry": "Artificial Intelligence",
        "companyType": "RESEARCH",
        "employeeRange": "LARGE_51_200",
        "status": "ACTIVE",
        "createdAt": "...",
        "updatedAt": "..."
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 47,
      "totalPages": 4
    }
  }
}
```

### GET /api/companies/[slug]

Get detailed company information by slug.

**Example Request:**

```bash
GET /api/companies/openai
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "OpenAI",
    "slug": "openai",
    "shortDescription": "...",
    "description": "...",
    "logo": "...",
    "website": "...",
    "headquarters": "San Francisco, CA",
    "foundedYear": 2015,
    "industry": "Artificial Intelligence",
    "companyType": "RESEARCH",
    "employeeRange": "LARGE_51_200",
    "status": "ACTIVE",
    "createdAt": "...",
    "updatedAt": "...",
    "products": [
      {
        "id": "...",
        "name": "ChatGPT",
        "slug": "chatgpt",
        "description": "...",
        "website": "...",
        "logo": null,
        "createdAt": "...",
        "updatedAt": "..."
      }
    ],
    "categories": [
      {
        "id": "...",
        "name": "Large Language Models",
        "slug": "large-language-models",
        "description": "..."
      }
    ],
    "relatedCompanies": [
      {
        "id": "...",
        "name": "Anthropic",
        "slug": "anthropic",
        "shortDescription": "...",
        "logo": "...",
        "industry": "AI Safety",
        "companyType": "STARTUP",
        "headquarters": "San Francisco, CA"
      }
    ]
  }
}
```

**404 Response:**

```json
{
  "success": false,
  "error": {
    "message": "Company not found",
    "code": "NOT_FOUND"
  }
}
```

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

**Error Codes:**

- `400` - Bad Request (invalid parameters)
- `404` - Not Found (company doesn't exist)
- `500` - Internal Server Error

## Database Schema

### Company

- `id` - Unique identifier
- `name` - Company name
- `slug` - URL-friendly identifier (unique)
- `shortDescription` - Brief description
- `description` - Full description
- `logo` - Logo URL
- `website` - Company website
- `headquarters` - Location
- `foundedYear` - Year founded
- `industry` - Industry/sector
- `companyType` - STARTUP | ENTERPRISE | RESEARCH | NONPROFIT
- `employeeRange` - SOLO_1 | SMALL_2_10 | MEDIUM_11_50 | LARGE_51_200 | XLARGE_201_500 | ENTERPRISE_501_PLUS
- `status` - ACTIVE | ACQUIRED | CLOSED

### Category

Categories for organizing companies (Large Language Models, Computer Vision, AI Infrastructure, etc.)

### Product

Products/services offered by companies.

### CompanyRelation

Many-to-many relationship between companies (related/similar companies).

## Production Deployment

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable: `DATABASE_URL`
4. Deploy
5. Run migrations and seed:

```bash
# Using Vercel CLI
vercel env pull
npm run db:push
npm run db:seed
```

### Database Options

- **Vercel Postgres** - Managed PostgreSQL on Vercel
- **Supabase** - Open-source Firebase alternative
- **Neon** - Serverless PostgreSQL
- **Railway** - Full-stack deployment platform

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio (database GUI)

## Notes for Frontend Development

- All API responses include `success: boolean` field
- Pagination metadata always includes `page`, `limit`, `total`, `totalPages`
- Company slugs are unique and URL-safe
- Categories and related companies are included in detail endpoint
- Search is case-insensitive and searches across name, shortDescription, and industry
- Filters can be combined (e.g., `?companyType=STARTUP&industry=AI%20Infrastructure`)
- Maximum page size is 100 items
- All timestamps are ISO 8601 format
