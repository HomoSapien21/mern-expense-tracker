# Deployment Guide - MERN Expense Tracker

Complete guide to deploy your MERN Expense Tracker to Railway.

## Prerequisites

- GitHub account (✅ Already done)
- Railway account (sign up at [railway.app](https://railway.app))
- MongoDB Atlas account (for cloud database)

---

## Step 1: Set Up MongoDB Atlas (Free Cloud Database)

1. **Go to** [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Sign up** or login
3. **Create a new cluster**:
   - Choose FREE tier (M0)
   - Select a cloud provider (AWS recommended)
   - Choose a region close to you
   - Click "Create Cluster"
4. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password (save these!)
   - Set role to "Read and write to any database"
   - Click "Add User"
5. **Whitelist IP Address**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
6. **Get Connection String**:
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/expense-tracker?retryWrites=true&w=majority`

---

## Step 2: Push Updated Code to GitHub

Run these commands in your project root:

```bash
# Stage all changes
git add .

# Commit changes
git commit -m "chore: Prepare for production deployment"

# Push to GitHub
git push
```

---

## Step 3: Deploy Backend to Railway

### 3.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Click "Login" → "Login with GitHub"
3. Authorize Railway

### 3.2 Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository: `mern-expense-tracker`
4. Railway will detect it's a Node.js project

### 3.3 Configure Backend Service
1. **Set Root Directory**:
   - Click on the service
   - Go to "Settings"
   - Under "Build", set **Root Directory** to: `backend`
   - **Build Command**: (leave empty, Railway auto-detects)
   - **Start Command**: `npm start`

2. **Add Environment Variables**:
   - Go to "Variables" tab
   - Click "New Variable" and add these:
   
   ```
   MONGO_URI = your_mongodb_atlas_connection_string
   JWT_SECRET = your_secret_key_here_make_it_long_and_random
   ```
   
   Example JWT_SECRET: `my-super-secret-jwt-key-2024-expense-tracker-xyz123`

3. **Deploy**:
   - Railway will automatically deploy
   - Wait for deployment to complete
   - You'll see "Success" when done

4. **Get Backend URL**:
   - Go to "Settings"
   - Under "Networking", click "Generate Domain"
   - Copy the URL (e.g., `https://your-backend.up.railway.app`)
   - **Save this URL!** You'll need it for frontend

---

## Step 4: Deploy Frontend to Railway

### 4.1 Create Another Service
1. In the same Railway project, click "New"
2. Select "GitHub Repo" again
3. Choose the same repository: `mern-expense-tracker`

### 4.2 Configure Frontend Service
1. **Set Root Directory**:
   - Click on the new service
   - Go to "Settings"
   - Under "Build", set **Root Directory** to: `frontend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run preview`

2. **Add Environment Variable**:
   - Go to "Variables" tab
   - Add:
   ```
   VITE_API_URL = https://your-backend.up.railway.app
   ```
   (Use the backend URL from Step 3.4)

3. **Deploy**:
   - Railway will build and deploy
   - Wait for completion

4. **Get Frontend URL**:
   - Go to "Settings"
   - Under "Networking", click "Generate Domain"
   - Copy the URL (e.g., `https://your-frontend.up.railway.app`)

---

## Step 5: Update Backend CORS

Now that you have the frontend URL, update the backend to allow it:

1. **Add Frontend URL to Backend**:
   - Go to your backend service in Railway
   - Go to "Variables"
   - Add new variable:
   ```
   FRONTEND_URL = https://your-frontend.up.railway.app
   ```
   (Use the frontend URL from Step 4.4)

2. **Redeploy Backend**:
   - Railway will automatically redeploy with new variable
   - Wait for completion

---

## Step 6: Test Your Deployed App

1. **Open Frontend URL** in browser
2. **Sign up** for a new account
3. **Login** with credentials
4. **Add an expense**
5. **Test filtering**
6. **Test edit and delete**

If everything works, congratulations! 🎉 Your app is live!

---

## Troubleshooting

### Backend Issues

**Problem**: 500 Internal Server Error
- **Solution**: Check Railway logs for backend service
- Verify MongoDB connection string is correct
- Ensure JWT_SECRET is set

**Problem**: CORS errors
- **Solution**: Verify FRONTEND_URL is set correctly
- Check that frontend URL matches exactly (no trailing slash)

### Frontend Issues

**Problem**: Can't connect to backend
- **Solution**: Check VITE_API_URL is set correctly
- Verify backend is deployed and running
- Check backend URL is accessible

**Problem**: Build fails
- **Solution**: Check Railway build logs
- Ensure all dependencies are in package.json
- Try building locally first: `npm run build`

### Database Issues

**Problem**: Can't connect to MongoDB
- **Solution**: Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
- Verify connection string has correct password
- Check database user has correct permissions

---

## Updating Your Deployed App

When you make changes to your code:

```bash
# 1. Make your changes locally
# 2. Test locally
# 3. Commit changes
git add .
git commit -m "Your commit message"

# 4. Push to GitHub
git push

# 5. Railway will automatically redeploy both services!
```

---

## Environment Variables Summary

### Backend (Railway)
```
MONGO_URI = mongodb+srv://...
JWT_SECRET = your-secret-key
FRONTEND_URL = https://your-frontend.up.railway.app
```

### Frontend (Railway)
```
VITE_API_URL = https://your-backend.up.railway.app
```

---

## Cost

- **Railway**: Free tier includes:
  - $5 credit per month
  - Enough for small projects
  - Auto-sleeps after inactivity
  
- **MongoDB Atlas**: Free tier (M0) includes:
  - 512 MB storage
  - Shared RAM
  - Perfect for development/small projects

---

## Alternative: Vercel (Frontend Only)

If you prefer Vercel for frontend:

1. **Deploy Backend to Railway** (Steps 1-3 above)
2. **Deploy Frontend to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Set Root Directory: `frontend`
   - Add Environment Variable: `VITE_API_URL`
   - Deploy

---

## Next Steps

- Add custom domain (optional)
- Set up monitoring
- Add analytics
- Implement email notifications
- Add more features!

---

## Support

If you encounter issues:
1. Check Railway logs (click on service → "Deployments" → click deployment → "View Logs")
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Ensure MongoDB Atlas is accessible

Good luck with your deployment! 🚀
