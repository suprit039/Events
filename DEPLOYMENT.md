# Deployment Guide for Render

## Prerequisites
1. Create a [Render account](https://render.com)
2. Have your code in a Git repository (GitHub, GitLab, or Bitbucket)

## Backend Deployment

### Step 1: Deploy Backend Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your Git repository
4. Select the repository containing your backend code
5. Configure the service:
   - **Name**: `event-manager-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `Backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 2: Configure Environment Variables
In the Render dashboard for your backend service, add these environment variables:

**Required:**
- `MONGO_URI`: Your MongoDB connection string
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
- `SESSION_SECRET`: A random secret string for sessions

**Optional:**
- `NODE_ENV`: `production`

### Step 3: Set up MongoDB
You can either:
- Use Render's PostgreSQL (requires code changes)
- Use MongoDB Atlas (recommended)
- Use Render's managed MongoDB (if available)

For MongoDB Atlas:
1. Create a cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Get the connection string
3. Add it as `MONGO_URI` environment variable

## Frontend Deployment

### Step 1: Update Backend URL
1. Note your backend service URL from Render (e.g., `https://your-backend-name.onrender.com`)
2. Update `frontend/.env.production`:
   ```
   VITE_API_BASE_URL=https://your-backend-name.onrender.com/api
   ```

### Step 2: Deploy Frontend Service
1. In Render Dashboard, click "New +" → "Static Site"
2. Connect your Git repository
3. Configure the service:
   - **Name**: `event-manager-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### Step 3: Configure Environment Variables
Add this environment variable:
- `VITE_API_BASE_URL`: `https://your-backend-name.onrender.com/api`

## Google OAuth Configuration

### Update OAuth Settings
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to APIs & Services → Credentials
3. Edit your OAuth 2.0 Client ID
4. Add authorized redirect URIs:
   - `https://your-backend-name.onrender.com/api/auth/google/callback`
5. Add authorized JavaScript origins:
   - `https://your-frontend-name.onrender.com`
   - `https://your-backend-name.onrender.com`

## Post-Deployment Steps

### 1. Seed the Database
After backend deployment, you can seed the database by:
1. Using Render's shell access to run: `npm run seed`
2. Or create a separate deploy hook

### 2. Test the Application
1. Visit your frontend URL
2. Test the main functionality:
   - Event listing
   - Search functionality
   - Admin login (Google OAuth)
   - Dashboard access

### 3. Monitor Logs
- Check Render logs for any deployment issues
- Monitor both frontend and backend services

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure backend CORS is configured for your frontend domain
2. **Environment Variables**: Double-check all required env vars are set
3. **Build Failures**: Check build logs for missing dependencies
4. **OAuth Issues**: Verify Google OAuth settings match your deployed URLs

### Useful Commands:
- View logs: Available in Render dashboard
- Restart service: Use "Manual Deploy" in Render dashboard
- Shell access: Available in Render dashboard for debugging

## Free Tier Limitations
- Services may sleep after 15 minutes of inactivity
- Limited build minutes per month
- Consider upgrading for production use

## Security Notes
- Never commit `.env` files to Git
- Use strong, unique values for `SESSION_SECRET`
- Regularly rotate OAuth secrets
- Monitor your application for security issues