@echo off
echo ========================================
echo AI Orbit Companies - Vercel Deployment
echo ========================================
echo.

echo Step 1: Checking Vercel CLI...
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI not found. Installing...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install Vercel CLI
        echo Please run: npm install -g vercel
        pause
        exit /b 1
    )
)
echo Vercel CLI ready!
echo.

echo Step 2: Committing latest changes...
git add .
git commit -m "Deploy: AI Orbit Companies backend"
echo.

echo Step 3: Starting deployment...
echo.
echo You will be prompted to:
echo   1. Login to Vercel (if not already)
echo   2. Configure project settings
echo   3. Set environment variables
echo.
pause

vercel

echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Set up your DATABASE_URL environment variable:
echo    vercel env add DATABASE_URL
echo.
echo 2. Pull environment variables:
echo    vercel env pull
echo.
echo 3. Push database schema:
echo    npm run db:push
echo.
echo 4. Seed database:
echo    npm run db:seed
echo.
echo 5. Deploy to production:
echo    vercel --prod
echo.
echo See DEPLOYMENT.md for detailed instructions.
echo.
pause
