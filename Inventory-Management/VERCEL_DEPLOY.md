# Vercel Deployment Guide

## Environment Variables Required

Go to your Vercel project settings → Environment Variables and add:

```
MONGO_URI=mongodb+srv://bharanisri73_db_user:YOUR_PASSWORD@inventorymanagement.2suutmk.mongodb.net/inventoryDB?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com
NODE_ENV=production
```

⚠️ **IMPORTANT:** Change the passwords to new secure ones!

## MongoDB Atlas Configuration

1. Go to MongoDB Atlas → Network Access
2. Add IP: `0.0.0.0/0` (Allow from anywhere for Vercel)
3. Wait 2 minutes for changes to apply

## Deploy Steps

1. Push code to GitHub:
```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

2. In Vercel dashboard:
   - Import your GitHub repository
   - Add all environment variables
   - Deploy

## Troubleshooting

### 500 Error
- Check environment variables are set in Vercel
- Check MongoDB Atlas allows connections from 0.0.0.0/0
- Check Vercel function logs for detailed error

### Database Connection Failed
- Verify MONGO_URI is correct in Vercel env vars
- Ensure MongoDB Atlas whitelist includes 0.0.0.0/0

### Functions Timeout
- Cold starts may take 10-15 seconds
- Consider upgrading Vercel plan for better performance
