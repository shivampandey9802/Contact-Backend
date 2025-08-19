# Vercel Deployment Guide 🚀

This guide will help you deploy your Contact Management API to Vercel as serverless functions.

## 🏗️ Project Structure for Vercel

Your project has been configured with the following Vercel-specific files:

```
contact-backend/
├── api/
│   └── index.js              # Main serverless function entry point
├── vercel.json               # Vercel configuration
├── [other project files...]
```

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **MongoDB Atlas**: Set up a cloud MongoDB database (required for serverless)

## 🚀 Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add Vercel configuration"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Node.js project

3. **Configure Environment Variables**:
   In the Vercel dashboard, add these environment variables:
   ```
   CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/database_name
   ACCESS_TOKEN_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
   NODE_ENV=production
   ```

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your API
   - You'll get a URL like: `https://your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Set Environment Variables**:
   ```bash
   vercel env add CONNECTION_STRING
   vercel env add ACCESS_TOKEN_SECRET
   vercel env add NODE_ENV
   ```

5. **Redeploy with Environment Variables**:
   ```bash
   vercel --prod
   ```

## 🔧 Environment Variables Setup

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `CONNECTION_STRING` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `ACCESS_TOKEN_SECRET` | JWT secret key (long random string) | `your-super-secret-jwt-key-here` |
| `NODE_ENV` | Environment mode | `production` |

### Setting Environment Variables in Vercel Dashboard

1. Go to your project in Vercel dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Add each variable with its value
5. Select "Production", "Preview", and "Development" for each variable
6. Click "Save"

## 📊 API Endpoints After Deployment

Once deployed, your API will be available at:

```
Base URL: https://your-project-name.vercel.app

Endpoints:
- GET  /health                    # Health check
- POST /api/users/register        # Register user
- POST /api/users/login           # Login user
- GET  /api/users/current         # Get current user
- GET  /api/contacts              # Get all contacts
- POST /api/contacts              # Create contact
- GET  /api/contacts/:id          # Get single contact
- PUT  /api/contacts/:id          # Update contact
- DELETE /api/contacts/:id        # Delete contact
```

## 🧪 Testing Your Deployed API

### Health Check
```bash
curl https://your-project-name.vercel.app/health
```

### Register a User
```bash
curl -X POST https://your-project-name.vercel.app/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST https://your-project-name.vercel.app/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 📝 Important Notes for Vercel Deployment

### Database Requirements
- **Must use MongoDB Atlas** (cloud MongoDB) - local MongoDB won't work with serverless
- Connection string must be accessible from the internet
- Whitelist all IP addresses (0.0.0.0/0) in MongoDB Atlas network access

### Serverless Limitations
- **10-second timeout** for function execution
- **Cold starts** may cause initial requests to be slower
- **Stateless** - no persistent connections between requests

### File Structure
- Main API entry point is in `/api/index.js`
- All routes and middleware are imported relatively
- `vercel.json` configures routing and builds

## 🔍 Troubleshooting

### Common Issues and Solutions

1. **Database Connection Errors**:
   ```
   Error: Could not connect to MongoDB
   ```
   - Ensure MongoDB Atlas is used (not local MongoDB)
   - Check connection string format
   - Verify network access settings in MongoDB Atlas

2. **Environment Variables Not Found**:
   ```
   Error: ACCESS_TOKEN_SECRET is not defined
   ```
   - Add environment variables in Vercel dashboard
   - Redeploy after adding variables

3. **API Routes Not Working**:
   ```
   Error: 404 Not Found
   ```
   - Check `vercel.json` routing configuration
   - Ensure API endpoints start with `/api/`

4. **Cold Start Delays**:
   - First request after inactivity may be slow
   - This is normal for serverless functions
   - Consider using Vercel Pro for better performance

### Viewing Logs

1. Go to Vercel dashboard
2. Click on your project
3. Go to "Functions" tab
4. Click on any function to view logs
5. Check "Real-time Logs" for debugging

## 🔄 Automatic Deployments

Once connected to GitHub:
- **Automatic deploys** on every push to main branch
- **Preview deployments** for pull requests
- **Rollback capability** to previous deployments

## 💡 Performance Tips

1. **Database Connection Pooling**: Already configured in your app
2. **Environment Variables**: Use Vercel's built-in environment variable system
3. **Error Handling**: Comprehensive error handling is already implemented
4. **Response Caching**: Consider adding cache headers for GET requests

## 🌐 Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click "Settings" > "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## 📋 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas database created and configured
- [ ] Environment variables set in Vercel dashboard
- [ ] Project deployed successfully
- [ ] Health check endpoint working
- [ ] API endpoints tested
- [ ] Authentication flow verified

## 🆘 Support

If you encounter issues:

1. Check Vercel function logs in the dashboard
2. Verify environment variables are set correctly
3. Test MongoDB connection string separately
4. Review the [Vercel documentation](https://vercel.com/docs)

---

**Your Contact Management API is now live on Vercel! 🎉**

Access your API at: `https://your-project-name.vercel.app`