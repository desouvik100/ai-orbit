# Setup and Testing Instructions

## Installation Steps

Run these commands in order:

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client
```bash
npm run db:generate
```

### 3. Push Database Schema
```bash
npm run db:push
```

### 4. Seed Database
```bash
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

## Testing Checklist

Once the server is running, test these endpoints:

### ✓ Basic Listing
```bash
curl http://localhost:3000/api/companies
```
Expected: Returns 12 companies (first page) with pagination metadata

### ✓ Search
```bash
curl "http://localhost:3000/api/companies?search=openai"
```
Expected: Returns companies matching "openai" in name, description, or industry

### ✓ Filter by Industry
```bash
curl "http://localhost:3000/api/companies?industry=AI%20Infrastructure"
```
Expected: Returns only companies in AI Infrastructure industry

### ✓ Filter by Company Type
```bash
curl "http://localhost:3000/api/companies?companyType=STARTUP"
```
Expected: Returns only STARTUP companies

### ✓ Filter by Status
```bash
curl "http://localhost:3000/api/companies?status=ACTIVE"
```
Expected: Returns only ACTIVE companies

### ✓ Sorting - Newest
```bash
curl "http://localhost:3000/api/companies?sort=newest"
```
Expected: Companies sorted by createdAt descending (newest first)

### ✓ Sorting - Oldest
```bash
curl "http://localhost:3000/api/companies?sort=oldest"
```
Expected: Companies sorted by createdAt ascending (oldest first)

### ✓ Sorting - Name Ascending
```bash
curl "http://localhost:3000/api/companies?sort=name-asc"
```
Expected: Companies sorted alphabetically A-Z

### ✓ Sorting - Name Descending
```bash
curl "http://localhost:3000/api/companies?sort=name-desc"
```
Expected: Companies sorted alphabetically Z-A

### ✓ Pagination
```bash
curl "http://localhost:3000/api/companies?page=2&limit=10"
```
Expected: Returns second page with 10 companies

### ✓ Combined Filters
```bash
curl "http://localhost:3000/api/companies?companyType=STARTUP&industry=Generative%20AI&sort=name-asc"
```
Expected: Returns only STARTUP companies in Generative AI, sorted by name

### ✓ Company Detail by Slug
```bash
curl http://localhost:3000/api/companies/openai
```
Expected: Returns full company details including products, categories, and related companies

### ✓ Company Detail - Another Example
```bash
curl http://localhost:3000/api/companies/anthropic
```
Expected: Returns Anthropic details with Claude product

### ✓ 404 - Invalid Slug
```bash
curl http://localhost:3000/api/companies/nonexistent-company
```
Expected: Returns 404 with error message "Company not found"

### ✓ Invalid Query Parameter
```bash
curl "http://localhost:3000/api/companies?companyType=INVALID"
```
Expected: Returns 400 with validation error

### ✓ Invalid Pagination
```bash
curl "http://localhost:3000/api/companies?page=-1"
```
Expected: Returns 400 with validation error

### ✓ Excessive Limit
```bash
curl "http://localhost:3000/api/companies?limit=200"
```
Expected: Returns 400 or automatically caps at 100

## Manual Testing via Browser

1. Open http://localhost:3000 - should see API info page
2. Open http://localhost:3000/api/companies - should see JSON response
3. Open http://localhost:3000/api/companies/openai - should see company details

## Production Build Test

```bash
npm run build
npm run start
```

Then test the same endpoints on the production build.

## Database Verification

Open Prisma Studio to visually inspect the database:

```bash
npm run db:studio
```

Verify:
- 47 companies exist
- 8 categories exist
- Products are linked to companies
- Company-category relationships exist
- Company relations exist

## Expected Data

After seeding, you should have:
- 47 AI companies
- 8 categories (Large Language Models, Computer Vision, AI Infrastructure, etc.)
- Multiple products (ChatGPT, Claude, Stable Diffusion, etc.)
- Company-category links
- Related company relationships

## Troubleshooting

### Database Connection Error
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running
- Verify credentials and database exists

### Prisma Client Not Generated
```bash
npm run db:generate
```

### Migration Issues
```bash
npm run db:push
```

### Seed Fails
- Check if database is empty
- Verify Prisma Client is generated
- Check for constraint violations
