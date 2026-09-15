# Deployment Guide - Vercel

Complete guide to deploy AI Orbit Companies backend to Vercel.

## Prerequisites

1. **Vercel Account** - Sign up at https://vercel.com
2. **PostgreSQL Database** - One of the following:
   - Vercel Postgres (recommended)
   - Supabase (free tier available)
   - Neon (serverless PostgreSQL)
   - Railway
   - Any PostgreSQL database with external access

## Option 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AI Orbit Companies backend"

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/ai-orbit-companies.git
git branch -M main
git push -u origin main
```

### Step 2: Set Up Database

#### Option A: Vercel Postgres (Easiest)

1. Go to https://vercel.com/dashboard
2. Click "Storage" tab
3. Click "Create Database"
4. Select "Postgres"
5. Choose a name: `ai-orbit-db`
6. Select region (same as your app)
7. Click "Create"

The `DATABASE_URL` will be automatically added to your project's environment variables.

#### Option B: Supabase

1. Go to https://supabase.com
2. Create new project
3. Wait for database to provision
4. Go to Settings → Database
5. Copy "Connection string" (Transaction mode)
6. Replace `[YOUR-PASSWORD]` with your database password
7. Save this for Step 3

#### Option C: Neon

1. Go to https://neon.tech
2. Create new project
3. Copy the connection string
4. Save this for Step 3

### Step 3: Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will auto-detect Next.js
4. Click "Deploy"

**IMPORTANT:** The first deployment will fail because the database isn't seeded yet. This is expected.

### Step 4: Add Environment Variables (if not using Vercel Postgres)

1. Go to your project dashboard on Vercel
2. Click "Settings" tab
3. Click "Environment Variables"
4. Add:
   - Key: `DATABASE_URL`
   - Value: Your PostgreSQL connection string
   - Environments: Production, Preview, Development (check all)
5. Click "Save"

### Step 5: Set Up Database Schema

You need to run migrations from your local machine:

```bash
# Pull environment variables from Vercel
npx vercel env pull .env.local

# Or manually set the production DATABASE_URL in .env
# DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"

# Push database schema
npm run db:push

# Seed the database
npm run db:seed
```

### Step 6: Redeploy

1. Go to Vercel dashboard
2. Click "Deployments" tab
3. Click "Redeploy" on the latest deployment
4. OR simply push a new commit to trigger deployment

### Step 7: Test Your Deployment

```bash
# Replace with your actual Vercel URL
curl https://your-project.vercel.app/api/companies

curl https://your-project.vercel.app/api/companies/openai
```

## Option 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Set Up Database

Choose one of the database options from Option 1, Step 2 above.

### Step 4: Deploy

```bash
# From the project root
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? ai-orbit-companies
# - In which directory is your code located? ./
# - Want to override settings? N
```

### Step 5: Add Environment Variable

```bash
# Add DATABASE_URL
vercel env add DATABASE_URL

# Paste your PostgreSQL connection string when prompted
# Select: Production, Preview, Development (all)
```

### Step 6: Set Up Database

```bash
# Pull the environment variables
vercel env pull .env.local

# Push schema
npm run db:push

# Seed database
npm run db:seed
```

### Step 7: Deploy to Production

```bash
vercel --prod
```

## Verifying Deployment

### Check API Endpoints

```bash
# List companies
curl https://your-project.vercel.app/api/companies

# Get specific company
curl https://your-project.vercel.app/api/companies/openai

# Test search
curl "https://your-project.vercel.app/api/companies?search=AI"

# Test filtering
curl "https://your-project.vercel.app/api/companies?companyType=STARTUP"
```

### Expected Response

```json
{
  "success": true,
  "data": {
    "companies": [...],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 47,
      "totalPages": 4
    }
  }
}
```

## Troubleshooting

### Build Fails with "Cannot find module '@prisma/client'"

**Solution:** Ensure `postinstall` script is in package.json:
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Database Connection Error

**Check:**
- DATABASE_URL is set in Vercel environment variables
- Connection string includes `?sslmode=require` for production databases
- Database allows connections from Vercel's IP addresses
- Credentials are correct

### 500 Error on API Calls

**Common causes:**
- Database not seeded (no data)
- Database schema not pushed
- Environment variable not set

**Fix:**
```bash
vercel env pull .env.local
npm run db:push
npm run db:seed
```

### CORS Errors (if accessing from another domain)

The API is designed to work with any frontend. If you need CORS headers, add to `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ]
  },
}
```

## Post-Deployment Steps

### 1. Test All Endpoints

Use the verification script:
```bash
# Update BASE_URL in verify-setup.js to your Vercel URL
node verify-setup.js
```

### 2. Set Up Custom Domain (Optional)

1. Go to Vercel dashboard → Your Project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 3. Enable Analytics (Optional)

Vercel provides free analytics:
1. Go to Project Settings
2. Click "Analytics"
3. Enable Analytics

### 4. Monitor Performance

- Check deployment logs in Vercel dashboard
- Monitor API response times
- Set up error tracking if needed

## Database Management

### View Data

```bash
# Pull production database URL
vercel env pull .env.local

# Open Prisma Studio
npm run db:studio
```

### Update Data

```bash
# Connect to production database
vercel env pull .env.local

# Run seed again (this will clear and re-seed)
npm run db:seed
```

### Backup Database

For Vercel Postgres:
- Automatic backups included
- Access via Vercel dashboard → Storage → Your Database

For other providers:
- Follow provider's backup documentation

## Environment Variables Summary

Required environment variable:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db?sslmode=require` |

## CI/CD

Vercel automatically:
- Deploys on every push to `main` branch (production)
- Creates preview deployments for pull requests
- Runs builds and checks

No additional CI/CD setup needed!

## Updating the Application

```bash
# Make changes to code
git add .
git commit -m "Update: description of changes"
git push

# Vercel automatically deploys
# Check status at https://vercel.com/dashboard
```

## Rolling Back

If deployment has issues:

1. Go to Vercel dashboard
2. Click "Deployments"
3. Find a previous working deployment
4. Click "..." → "Promote to Production"

## Production Checklist

- [ ] Code pushed to GitHub
- [ ] Database created and accessible
- [ ] DATABASE_URL environment variable set in Vercel
- [ ] Database schema pushed (`npm run db:push`)
- [ ] Database seeded (`npm run db:seed`)
- [ ] Application deployed successfully
- [ ] API endpoints tested and working
- [ ] All 47 companies visible via API
- [ ] Search functionality working
- [ ] Filtering working
- [ ] Error handling working (test 404s)

## Getting Your Vercel URL

After deployment, your API will be available at:
```
https://[your-project-name].vercel.app
```

Or with a custom domain:
```
https://api.yourdomain.com
```

## Frontend Integration

Share these details with your frontend developer (Antigravity):

**Production API Base URL:**
```
https://your-project.vercel.app
```

**Endpoints:**
- `GET /api/companies` - List with filters
- `GET /api/companies/[slug]` - Company detail

**Full documentation:** See README.md

## Support Resources

- Vercel Documentation: https://vercel.com/docs
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
- Prisma + Vercel: https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel
- Next.js Deployment: https://nextjs.org/docs/deployment
