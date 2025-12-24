# 🚀 FREE Deployment Guide - Skin Disease Detection App

Deploy your full-stack ML application for **FREE** using Render (backend) and Vercel (frontend).

## 📋 What We're Deploying

1. **Python ML Backend** → Render (Free tier)
2. **Node.js API Gateway** → Render (Free tier)
3. **Angular Frontend** → Vercel (Free tier)

---

## 🎯 Deployment Architecture

```
User Browser
    ↓
Vercel (Angular Frontend)
    ↓
Render (Node.js API Gateway)
    ↓
Render (Python ML Backend)
```

---

## PART 1: Deploy Python Backend to Render

### Step 1: Push Code to GitHub

```bash
cd C:\Users\aadit\Downloads\skin_cancer_detector
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/skin-cancer-detector.git
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to [render.com](https://render.com) and sign up (free)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `skin-cancer-ml-api`
   - **Region**: Choose closest to you
   - **Root Directory**: `backend`
   - **Environment**: `Docker`
   - **Plan**: **Free**

5. Click **"Create Web Service"**

6. Copy your Python API URL (e.g., `https://skin-cancer-ml-api.onrender.com`)

⚠️ **Important**: Free tier sleeps after 15 min of inactivity. First request takes ~30s.

---

## PART 2: Deploy Node.js Backend to Render

### Step 1: Deploy on Render

1. Click **"New +"** → **"Web Service"**
2. Select same GitHub repository
3. Configure:
   - **Name**: `skin-cancer-node-api`
   - **Region**: Same as Python backend
   - **Root Directory**: `node-backend`
   - **Environment**: `Docker`
   - **Plan**: **Free**

4. Add **Environment Variable**:
   - Key: `PYTHON_API_URL`
   - Value: `https://skin-cancer-ml-api.onrender.com` (your Python URL from Part 1)

5. Click **"Create Web Service"**

6. Copy your Node API URL (e.g., `https://skin-cancer-node-api.onrender.com`)

---

## PART 3: Deploy Angular Frontend to Vercel

### Step 1: Update Frontend Config

Edit `frontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://skin-cancer-node-api.onrender.com'  // Your Node API URL
};
```

Commit this change:

```bash
git add frontend/src/environments/environment.prod.ts
git commit -m "Update production API URL"
git push
```

### Step 2: Deploy on Vercel

#### Option A: Vercel CLI (Recommended)

```bash
npm install -g vercel
cd frontend
vercel login
vercel --prod
```

When prompted:
- **Project name**: skin-cancer-detector
- **Build command**: `ng build`
- **Output directory**: `dist/skin-frontend`

#### Option B: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Angular
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/skin-frontend`

5. Click **"Deploy"**

---

## ✅ Verify Deployment

### Test Each Service:

**1. Python Backend:**
```bash
curl https://skin-cancer-ml-api.onrender.com/
```
Expected: `{"status":"ML API is running"}`

**2. Node Backend:**
```bash
curl https://skin-cancer-node-api.onrender.com/
```
Expected: `{"status":"Node API is running",...}`

**3. Frontend:**
Open: `https://your-app.vercel.app`

---

## 🎯 Complete End-to-End Test

1. Go to your Vercel URL
2. Upload or capture an image
3. Click **Predict**
4. Wait 30-60 seconds on first request (free tier wakeup)
5. See prediction and confidence!

---

## 🐛 Troubleshooting

### Issue: "Prediction failed"

**Cause**: Backend services sleeping (free tier)

**Solution**: Wait 30-60 seconds and try again. First request wakes up the service.

### Issue: "CORS error"

**Cause**: Frontend URL not in backend CORS config

**Solution**: Update `backend/app.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-app.vercel.app"],  # Add your Vercel URL
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Issue: Build fails on Render

**Cause**: Large model file (`.pth`)

**Solution**: Ensure Git LFS is enabled:

```bash
git lfs install
git lfs track "*.pth"
git add .gitattributes
git commit -m "Track model with Git LFS"
git push
```

---

## 💰 Cost Breakdown

| Service | Platform | Cost |
|---------|----------|------|
| Python ML Backend | Render | **FREE** (750 hrs/month) |
| Node API Gateway | Render | **FREE** (750 hrs/month) |
| Angular Frontend | Vercel | **FREE** (Unlimited) |
| **TOTAL** | | **$0/month** 🎉 |

---

## ⚡ Free Tier Limitations

**Render Free Tier:**
- ✅ 750 hours/month (more than enough)
- ✅ Automatic HTTPS
- ⚠️ Sleeps after 15 min inactivity
- ⚠️ 512 MB RAM (sufficient for this app)

**Vercel Free Tier:**
- ✅ Unlimited bandwidth
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ No sleep time

---

## 🔥 Upgrade Options (Optional)

If your app gets popular:

**Render Starter ($7/month per service):**
- No sleep time
- 1 GB RAM
- Priority support

**Better Alternative for Production:**
- Use **Railway** ($5/month for both backends)
- Keep Vercel free for frontend

---

## 📝 Environment Variables Summary

**Node Backend (Render):**
```
PYTHON_API_URL=https://skin-cancer-ml-api.onrender.com
```

**Frontend (Vercel):**
Update `environment.prod.ts` before deploying.

---

## 🎉 You Did It!

Your ML app is now:
- ✅ Live on the internet
- ✅ Accessible from anywhere
- ✅ Running for FREE
- ✅ Ready for your portfolio/resume

**Next Steps:**
1. Share your live URL with friends
2. Add it to your resume/portfolio
3. Monitor usage on Render/Vercel dashboards

---

## 📌 Quick Links

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your App**: [Add your Vercel URL here after deployment]

---

## 🆘 Need Help?

Common issues:
1. **Slow first load**: Normal for free tier (30-60s)
2. **Build errors**: Check Node/Python versions match local
3. **API not responding**: Wait for service to wake up

---

**🚀 Happy Deploying!**
