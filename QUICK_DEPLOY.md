# Quick Deployment Commands

## 1. Push to GitHub
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/skin-cancer-detector.git
git push -u origin main

## 2. Deploy Python Backend (Render)
# Go to render.com → New Web Service
# - Root Directory: backend
# - Environment: Docker
# - Plan: Free

## 3. Deploy Node Backend (Render)
# Go to render.com → New Web Service
# - Root Directory: node-backend
# - Environment: Docker
# - Add Environment Variable:
#   PYTHON_API_URL = [your Python backend URL]

## 4. Deploy Frontend (Vercel)
# Update frontend/src/environments/environment.prod.ts with your Node API URL
cd frontend
npm install -g vercel
vercel login
vercel --prod

## Alternative: Railway (Faster, Still Free)

# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy Python Backend
cd backend
railway init
railway up

# Deploy Node Backend
cd ../node-backend
railway init
railway link [your project]
railway up

# Set environment variable
railway variables set PYTHON_API_URL=[python backend url]
