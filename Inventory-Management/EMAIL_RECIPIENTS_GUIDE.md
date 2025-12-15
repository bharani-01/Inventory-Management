# Email Recipients Management System - Complete Guide

## Overview
This system allows you to manage multiple email recipients who will receive automated alerts and reports from your inventory management system.

## Features Implemented

### 1. **Database Model** (`models/Recipient.js`)
- Stores recipient information
- Fields:
  - `name`: Recipient's full name
  - `email`: Email address (unique)
  - `types`: Array of alert types they want to receive
    - `low_stock`: Low stock alerts
    - `daily_report`: Daily inventory reports
  - `isActive`: Enable/disable recipient without deleting

### 2. **Backend API** (`routes/recipients.js`)
All endpoints require authentication:
- `GET /api/recipients` - List all recipients (Admin/Manager)
- `POST /api/recipients` - Add new recipient (Admin only)
- `PUT /api/recipients/:id` - Update recipient (Admin only)
- `DELETE /api/recipients/:id` - Delete recipient (Admin only)

### 3. **Alert Service Updates** (`services/alertService.js`)
- **Low Stock Alerts**: Sends to all active recipients with `low_stock` type
- **Daily Reports**: Sends to all active recipients with `daily_report` type
- **Fallback**: Uses admin email if no recipients are configured

### 4. **Frontend Dashboard**
New page: **Email Recipients** (Admin only)
- View all recipients in a table
- Add new recipients with modal form
- Edit existing recipients
- Delete recipients
- See alert type preferences with icons
- Active/Inactive status badges

### 5. **Reports Page Enhancement**
Added new section: **🔔 Alert Triggers**
- Button to manually trigger low stock alerts
- Button to manually trigger daily reports
- Sends to all configured recipients

## How to Use

### Step 1: Configure Email Settings
Edit `.env` file with your email credentials:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
```

**For Gmail:**
1. Enable 2-Factor Authentication
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password in `EMAIL_PASS`

### Step 2: Add Recipients
1. Login as **Admin**
2. Navigate to **📧 Email Recipients** in the sidebar
3. Click **➕ Add Recipient**
4. Fill in:
   - Name (e.g., "John Doe")
   - Email (e.g., "john@example.com")
   - Select alert types:
     - ⚠️ Low Stock Alerts
     - 📊 Daily Inventory Reports
5. Click **Add Recipient**

### Step 3: Test the System
Run the test script:
```bash
node test-alerts.js
```

This will:
- Connect to your database
- Check for low stock items and send alerts
- Generate a PDF report and send it
- Send to ALL active recipients

### Step 4: Manual Triggers (Optional)
1. Go to **📈 Reports** page
2. Find the **🔔 Alert Triggers** section
3. Click:
   - **Trigger Low Stock Alert** - Sends immediate low stock check
   - **Trigger Daily Report** - Sends immediate inventory report

## Scheduled Jobs

The system automatically runs:
- **Low Stock Check**: Every day at 9:00 AM
- **Daily Report**: Every day at 6:00 PM

These are configured in `services/alertService.js` using cron syntax.

## Managing Recipients

### Edit a Recipient
1. Go to **Email Recipients** page
2. Click **Edit** button next to the recipient
3. Modify name, email, alert types, or active status
4. Click **Save Changes**

### Deactivate (Don't Delete)
1. Click **Edit** on the recipient
2. Uncheck **Active (receives emails)**
3. Click **Save Changes**
- They stay in the database but won't receive emails

### Delete a Recipient
1. Click **Delete** button
2. Confirm the deletion
- Permanently removes them from the database

## Email Content

### Low Stock Alert Email
- **Subject**: "Low Stock Alert"
- **Content**: HTML list of items below reorder level
- Shows: Item name, current quantity, reorder level

### Daily Report Email
- **Subject**: "Daily Inventory Report"
- **Content**: PDF attachment
- **Filename**: `inventory-report-YYYY-MM-DD.pdf`
- Contains: Complete inventory list with quantities and values

## Troubleshooting

### Emails Not Sending
1. Check `.env` file has correct credentials
2. For Gmail, ensure you're using an App Password
3. Check server console for error messages
4. Verify recipients are marked as **Active**

### No Recipients Receiving Emails
1. Check if recipients exist: Go to **Email Recipients** page
2. Verify they have the correct alert types selected
3. Ensure they are marked as **Active**
4. Check their email addresses are correct

### Test Script Fails
1. Ensure MongoDB is running
2. Check `MONGO_URI` in `.env` is correct
3. Verify email credentials are valid
4. Check console output for specific errors

## Database Schema

```javascript
{
  name: String,           // "John Doe"
  email: String,          // "john@example.com" (unique)
  types: [String],        // ["low_stock", "daily_report"]
  isActive: Boolean,      // true/false
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

## API Examples

### Add Recipient
```javascript
POST /api/recipients
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "types": ["low_stock", "daily_report"]
}
```

### Update Recipient
```javascript
PUT /api/recipients/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "types": ["low_stock"],
  "isActive": false
}
```

### Delete Recipient
```javascript
DELETE /api/recipients/:id
Authorization: Bearer <admin-token>
```

## Security Notes

- Only **Admin** users can add, edit, or delete recipients
- **Admin** and **Manager** users can view recipients
- Email credentials are stored in `.env` (never commit to git)
- Add `.env` to `.gitignore` to prevent credential leaks

## Future Enhancements

Possible improvements:
1. Email templates with company branding
2. Custom email schedules per recipient
3. SMS alerts integration
4. Email delivery status tracking
5. Recipient groups/categories
6. Custom report filters per recipient
7. Email preview before sending
8. Bulk import recipients from CSV

## Support

If you encounter issues:
1. Check server console logs
2. Verify all dependencies are installed: `npm install`
3. Ensure MongoDB is running
4. Test email credentials separately
5. Check firewall/network settings for SMTP access
