# Inventory Management System - Deployment Guide

## 🚀 Quick Start for Hosting

### Prerequisites
- Node.js 14+ installed
- MongoDB database (MongoDB Atlas recommended for cloud hosting)
- Git installed

---

## 📋 Deployment Steps

### 1️⃣ **Remove Exposed .env from GitHub (CRITICAL!)**

Your `.env` file with sensitive data is currently on GitHub. Fix this immediately:

```bash
# Remove .env from Git tracking
git rm --cached .env

# Commit the change
git add .gitignore
git commit -m "Remove .env from repository and add .gitignore"

# Force push to update GitHub (this will rewrite history)
git push -f origin main
```

⚠️ **IMPORTANT:** After doing this, you MUST change:
- MongoDB password
- Email password  
- JWT secret

Because the old credentials are now publicly exposed in your Git history.

---

### 2️⃣ **Environment Variables Setup**

Create a new `.env` file (never commit this):

```bash
cp .env.example .env
```

Edit `.env` with your actual values:
```env
PORT=5000
MONGO_URI=your_new_mongodb_connection_string
JWT_SECRET=your_new_secret_key_here
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_new_app_password
EMAIL_FROM=your_email@gmail.com
NODE_ENV=production
```

---

### 3️⃣ **Platform-Specific Deployment**

#### **Option A: Heroku**

```bash
# Install Heroku CLI, then:
heroku login
heroku create your-app-name
heroku config:set MONGO_URI="your_connection_string"
heroku config:set JWT_SECRET="your_secret"
heroku config:set EMAIL_USER="your_email"
heroku config:set EMAIL_PASS="your_password"
heroku config:set EMAIL_FROM="your_email"
heroku config:set NODE_ENV="production"
git push heroku main
```

#### **Option B: Render**

1. Go to [render.com](https://render.com)
2. Create New Web Service
3. Connect your GitHub repository
4. Set Build Command: `npm install`
5. Set Start Command: `npm start`
6. Add Environment Variables in dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `EMAIL_FROM`
   - `NODE_ENV=production`

#### **Option C: Railway**

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repository
4. Add environment variables in Variables tab
5. Deploy automatically happens

#### **Option D: DigitalOcean App Platform**

1. Go to DigitalOcean Apps
2. Create App from GitHub
3. Configure environment variables
4. Deploy

---

### 4️⃣ **Verify Deployment**

After deployment, test these endpoints:

```bash
# Health check (if you add one)
curl https://your-app.com/api/health

# Login test
curl -X POST https://your-app.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

---

## 🔧 What Was Fixed

### ✅ Fixed Issues:
1. **Hardcoded ports** - Frontend now auto-detects correct API URL
2. **Added .gitignore** - Prevents committing sensitive files
3. **Environment template** - `.env.example` for reference
4. **CORS configuration** - Production-ready CORS setup
5. **Security improvements** - Better environment variable handling

### ✅ Routes That Work:
- ✔️ `/api/auth` - Authentication (login/register)
- ✔️ `/api/items` - Inventory management
- ✔️ `/api/suppliers` - Supplier management
- ✔️ `/api/sales` - Sales tracking
- ✔️ `/api/reports` - Report generation
- ✔️ `/api/users` - User management
- ✔️ `/api/logs` - Activity logs
- ✔️ `/api/analytics` - Analytics dashboard
- ✔️ `/api/shop` - Shop API
- ✔️ `/api/ecommerce` - E-commerce portal
- ✔️ `/api/recipients` - Email recipients

All routes use environment variables correctly and will work on any hosting platform.

---

## 📝 Important Notes

### Database Connection
- Use MongoDB Atlas for cloud hosting (free tier available)
- Whitelist IP: `0.0.0.0/0` for access from any IP

### Email Service
- Gmail requires "App Password" (not regular password)
- Enable 2FA and generate app-specific password
- Or use SendGrid/Mailgun for production

### Default Admin Credentials
```
Username: admin
Password: admin123
```
⚠️ **Change these immediately in production!**

---

## 🛡️ Security Checklist

- [ ] Changed MongoDB password
- [ ] Changed JWT secret
- [ ] Changed email password
- [ ] Changed default admin password
- [ ] Removed .env from GitHub
- [ ] Added .gitignore
- [ ] Set NODE_ENV=production
- [ ] Configured CORS for your domain
- [ ] Use HTTPS in production
- [ ] Regular security updates

---

## 🐛 Troubleshooting

### Problem: API calls fail in production
**Solution:** Check browser console for CORS errors. Ensure backend is running and accessible.

### Problem: Can't connect to MongoDB
**Solution:** Check connection string, whitelist IPs in MongoDB Atlas.

### Problem: Email alerts not working
**Solution:** Verify email credentials, use app-specific password for Gmail.

### Problem: 404 on page refresh
**Solution:** Configure your hosting to serve index.html for all routes (SPA mode).

---

## 📞 Support

For issues:
1. Check logs in your hosting platform
2. Verify all environment variables are set
3. Test API endpoints individually
4. Check MongoDB connection

---

## 📄 License

MIT License - feel free to modify and use commercially.
