# Deployment Guide - Contact Backend API

This guide provides multiple options to deploy your Node.js/Express contact management API so it's accessible from anywhere on the internet.

## Prerequisites

Before deploying, ensure you have:
- A MongoDB database (MongoDB Atlas recommended for cloud deployment)
- Environment variables configured
- Your application tested locally

## Deployment Options

### 1. Railway (Recommended - Free Tier Available)

Railway is a modern deployment platform with excellent Node.js support.

**Steps:**
1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Initialize your project:
   ```bash
   railway init
   ```

4. Set environment variables:
   ```bash
   railway variables set CONNECTION_STRING="your-mongodb-connection-string"
   railway variables set PORT=3000
   railway variables set ACCESS_TOKEN_SECRET="your-jwt-secret"
   ```

5. Deploy:
   ```bash
   railway up
   ```

**Pros:** Easy setup, automatic HTTPS, custom domains, great free tier
**Cons:** Limited free tier resources

### 2. Render (Free Tier Available)

**Steps:**
1. Push your code to GitHub
2. Go to [render.com](https://render.com) and sign up
3. Connect your GitHub repository
4. Choose "Web Service"
5. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables:
     - `CONNECTION_STRING`: Your MongoDB connection string
     - `ACCESS_TOKEN_SECRET`: Your JWT secret
     - `NODE_ENV`: production

**Pros:** Free tier, automatic deployments from Git, built-in SSL
**Cons:** Free tier has limitations (spins down after inactivity)

### 3. Heroku

**Steps:**
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set CONNECTION_STRING="your-mongodb-connection-string"
   heroku config:set ACCESS_TOKEN_SECRET="your-jwt-secret"
   ```
5. Deploy: `git push heroku main`

**Pros:** Mature platform, many add-ons available
**Cons:** No free tier anymore, can be expensive

### 4. DigitalOcean App Platform

**Steps:**
1. Push code to GitHub
2. Go to DigitalOcean and create an App
3. Connect your repository
4. Configure environment variables
5. Deploy

**Pros:** Good performance, reasonable pricing
**Cons:** No free tier

### 5. AWS EC2 (More Advanced)

For more control and potentially lower costs at scale:

1. Launch an EC2 instance
2. Install Node.js and npm
3. Clone your repository
4. Install PM2 for process management: `npm install -g pm2`
5. Set up environment variables
6. Start with PM2: `pm2 start server.js --name contact-api`
7. Configure security groups to allow HTTP/HTTPS traffic
8. Set up a reverse proxy with Nginx (optional but recommended)

### 6. Vercel (Serverless Functions)

Perfect for serverless deployment with automatic scaling:

1. Push your code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `CONNECTION_STRING`: MongoDB Atlas connection string
   - `ACCESS_TOKEN_SECRET`: JWT secret key
   - `NODE_ENV`: production
4. Deploy automatically

**Pros:** Automatic scaling, free tier, great performance, easy setup
**Cons:** Requires MongoDB Atlas, 10-second function timeout

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

### 7. Docker Deployment

See the Docker configuration files created in this project for containerized deployment to any cloud provider that supports Docker.

## Database Setup (MongoDB Atlas)

For production deployment, use MongoDB Atlas (cloud MongoDB):

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your deployment platform's IP addresses (or 0.0.0.0/0 for all IPs)
5. Get your connection string

## Environment Variables

Your deployment needs these environment variables:
- `CONNECTION_STRING`: MongoDB connection string
- `ACCESS_TOKEN_SECRET`: Secret key for JWT tokens
- `PORT`: Port number (usually set automatically by hosting platforms)
- `NODE_ENV`: Set to "production" for production deployments

## Security Considerations

1. **Never commit sensitive data** to your repository
2. **Use environment variables** for all secrets
3. **Enable CORS** appropriately for your frontend domain
4. **Use HTTPS** (most platforms provide this automatically)
5. **Validate and sanitize** all inputs
6. **Rate limiting** for API endpoints
7. **Database security** - restrict IP access, use strong passwords

## Monitoring and Maintenance

1. Set up logging and monitoring
2. Regular security updates
3. Database backups
4. Performance monitoring
5. Error tracking (consider services like Sentry)

## Quick Start (Railway - Easiest Option)

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Set environment variables in Railway dashboard
5. Deploy: `railway up`

Your API will be accessible at the provided Railway URL!

## Testing Your Deployment

Once deployed, test your endpoints:
- `GET /api/contacts` - Get all contacts
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

Use tools like Postman or curl to test your deployed API endpoints.