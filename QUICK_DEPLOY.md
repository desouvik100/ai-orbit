# Quick Deploy to Vercel - Step by Step

Follow these exact steps to deploy your backend to Vercel.

## Prerequisites Check

- [x] Code is committed to git
- [ ] You have a Vercel account (sign up at https://vercel.com)
- [ ] You have a GitHub account

---

## 🚀 Deployment Steps

### Step 1: Push to GitHub

If you haven't already, create a GitHub repository and push your code:

```bash
# Go to https://github.com/new and create a new repository named "ai-orbit-companies"
# Then run:

git remote add origin https://github.com/YOUR_USERNAME/ai-orbit-companies.git
git branch -M main
git push -u origin main
```

**If you already have a remote:**
```bash
git push
```

---

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Easiest) ⭐

1. **Go to:** https://vercel.com/new

2. **Import Git Repository:**
   - Click "Import Git Repository"
   - Select your GitHub account
   - Find and select `ai-orbit-companies`
   - Click "Import"

3. **Configure Project:**
   - Project Name: `ai-orbit-companies` (or your preferred name)
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (auto-configured)
   - Output Directory: `.next` (auto-configured)

4. **Environment Variables:**
   - Click "Add Environment Variable"
   - Name: `DATABASE_URL`
   - Value: Leave empty for now (we'll add after setting up the database)
   - OR if you already have a database, paste the connection string here

5. **Click "Deploy"**

   ⚠️ **Note:** First deployment will fail if DATABASE_URL is not set. This is normal!

---

### Step 3: Set Up Database

You have three options. Choose one:

#### Option A: Vercel Postgres (Recommended) ⭐

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Storage" tab
   - Click "Create Database"
   - Select "Postgres"
   - Name: `ai-orbit-db`
   - Region: Same as your deployment (e.g., Washington, D.C.)
   - Click "Create"

2. **Connect Database:**
   - Vercel will automatically add `DATABASE_URL` to your project
   - Click "Connect" when prompted

#### Option B: Supabase (Free Tier Available)

1. Go to https://supabase.com and sign up
2. Create new project
3. Wait for database provisioning (~2 minutes)
4. Go to Settings → Database
5. Copy "Connection string" (use "Transaction" pooling mode)
6. Replace `[YOUR-PASSWORD]` with your database password
7. Go back to Vercel:
   - Project → Settings → Environment Variables
   - Add `DATABASE_URL` with your Supabase connection string
   - Make sure to select Production, Preview, and Development

#### Option C: Neon (Serverless PostgreSQL)

1. Go to https://neon.tech and sign up
2. Create new project
3. Copy the connection string provided
4. Go to Vercel:
   - Project → Settings → Environment Variables
   - Add `DATABASE_URL` with your Neon connection string

---

### Step 4: Initialize Database

Now you need to set up the database schema and seed data. Run these commands **from your local machine**:

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Pull environment variables (includes DATABASE_URL)
vercel env pull .env.local

# Push database schema
npm run db:push

# Seed with 47 AI companies
npm run db:seed
```

**Expected output from seed:**
```
🌱 Starting seed...
✓ Cleared existing data
✓ Created categories
✓ Created 47 companies
✓ Created X products
✓ Created X company-category links
✓ Created X company relations
✅ Seed completed successfully!
```

---

### Step 5: Redeploy

Now that the database is ready, trigger a new deployment:

**Option A: From Vercel Dashboard**
1. Go to your project on Vercel
2. Click "Deployments" tab
3. Find the latest deployment
4. Click "..." menu → "Redeploy"
5. Click "Redeploy" to confirm

**Option B: Push a new commit**
```bash
# Make any small change or just:
git commit --allow-empty -m "Trigger redeployment"
git push
```

---

### Step 6: Test Your Deployment

Your API is now live! Test it:

```bash
# Replace YOUR-PROJECT-NAME with your actual Vercel project name
curl https://YOUR-PROJECT-NAME.vercel.app/api/companies

# Test specific company
curl https://YOUR-PROJECT-NAME.vercel.app/api/companies/openai

# Test search
curl "https://YOUR-PROJECT-NAME.vercel.app/api/companies?search=AI"
```

**Or open in browser:**
- https://YOUR-PROJECT-NAME.vercel.app
- https://YOUR-PROJECT-NAME.vercel.app/api/companies
- https://YOUR-PROJECT-NAME.vercel.app/api/companies/openai

---

## ✅ Success Checklist

After deployment, verify:

- [ ] Visit `https://YOUR-PROJECT.vercel.app` - should show API info page
- [ ] Visit `https://YOUR-PROJECT.vercel.app/api/companies` - returns JSON with companies
- [ ] Response shows 47 total companies
- [ ] Company detail works: `/api/companies/openai`
- [ ] Search works: `/api/companies?search=AI`
- [ ] Filtering works: `/api/companies?companyType=STARTUP`
- [ ] No errors in Vercel deployment logs

---

## 🎯 Your Deployment URLs

After deployment, note these URLs for your frontend team:

**Production API Base URL:**
```
https://YOUR-PROJECT-NAME.vercel.app
```

**API Endpoints:**
```
GET https://YOUR-PROJECT-NAME.vercel.app/api/companies
GET https://YOUR-PROJECT-NAME.vercel.app/api/companies/[slug]
```

**Dashboard:**
```
https://vercel.com/YOUR-USERNAME/YOUR-PROJECT-NAME
```

---

## 🔧 Troubleshooting

### "Build failed" error

**Check:**
1. Environment variable `DATABASE_URL` is set
2. Run `vercel env ls` to verify

**Fix:**
```bash
vercel env add DATABASE_URL
# Paste your database connection string
# Select: Production, Preview, Development
```

### "Internal Server Error" on API calls

**Check deployment logs:**
1. Go to Vercel Dashboard
2. Click your project → Deployments
3. Click latest deployment
4. View "Function Logs"

**Common cause:** Database not seeded

**Fix:**
```bash
vercel env pull .env.local
npm run db:push
npm run db:seed
```

### Connection string format issues

Make sure your `DATABASE_URL` includes `?sslmode=require` for production databases:

```
postgresql://user:password@host:5432/database?sslmode=require
```

---

## 📝 Next Steps

1. **Share API URL with frontend team** (Antigravity)
2. **Set up custom domain** (optional)
   - Vercel Dashboard → Settings → Domains
3. **Enable Vercel Analytics** (optional)
   - Vercel Dashboard → Analytics
4. **Monitor deployment logs**
   - Check for any errors or warnings

---

## 🆘 Need Help?

- **Vercel Documentation:** https://vercel.com/docs
- **Deployment logs:** Vercel Dashboard → Your Project → Deployments → View Function Logs
- **Check this file for detailed guide:** DEPLOYMENT.md

---

## 🎉 You're Done!

Your AI Orbit Companies backend is now live and ready for the frontend team to integrate!

Share these details with Antigravity:
- Production API URL
- README.md (API documentation)
- Full list of endpoints and query parameters
