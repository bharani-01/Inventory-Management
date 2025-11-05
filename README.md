# 📦 Inventory Management System

A comprehensive, modern inventory management solution built with Node.js, Express, MongoDB, and vanilla JavaScript. Features role-based access control, real-time analytics, AI-powered chatbot assistance, and a professional, minimalist UI designed for Indian markets.

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- **Secure Login System** with JWT token-based authentication
- **Role-Based Access Control** (Admin, Manager, Staff)
- **Session Management** with localStorage persistence
- Password hashing with bcrypt

### 👥 User Management (Admin Only)
- Create, update, and delete user accounts
- Assign roles (Admin, Manager, Staff)
- View active staff and user activity
- Comprehensive user audit logs

### 📦 Product Management
- **Add/Edit/Delete Products** with detailed information
  - Name, SKU, Category, Price, Quantity
  - Supplier details and reorder levels
  - Expiry date tracking
- **Bulk Import/Export** via CSV
- **Product Search** with real-time filtering
- **Low Stock Alerts** with automatic tracking
- **Barcode Label Generation** with customizable sizes
- **QR Code Generation** for quick product access
- **Product Image Support** (via external URLs)

### 🏢 Supplier Management
- Add and manage supplier information
- Track supplier contact details and product lines
- View last delivery dates
- Link products to suppliers

### 💰 Sales Management
- **Point of Sale (POS)** interface for staff
- Record sales transactions with automatic inventory updates
- Track revenue and units sold
- View sales history and trends
- Sales performance analytics

### 📊 Advanced Analytics & Reports

#### Overview Dashboard
- Total products count
- Current inventory value (₹ INR)
- Low stock items counter
- Quick action tiles

#### Multiple Chart Types
- **Sales Trend Analysis** (Bar/Line charts)
  - Daily, Weekly, Monthly views
  - Revenue and units sold tracking
- **Inventory Distribution** (Pie/Doughnut charts)
- **Top Products** (Horizontal bar charts)
- **Category Analysis** (Pie, Doughnut, Polar Area, Radar)
- **Price vs Quantity** (Scatter/Bubble charts)
- **Stock Level Monitoring**

#### Custom Analytics Builder 🛠️
- **Ad-hoc Chart Generation** with custom parameters
- **Data Sources**: Inventory or Sales
- **Metrics**:
  - Inventory Value, Quantity, Reorder Gap
  - Price vs Quantity analysis
  - Sales Revenue, Units Sold
- **Grouping Options**: Category, Supplier, Stock Status
- **Chart Types**: Bar, Line, Pie, Doughnut, Polar Area, Radar, Scatter, Bubble
- **Time Periods**: Daily, Weekly, Monthly (for sales)
- Dynamic dataset generation and caching

#### Advanced Report Exports
- **Category Sales Report** with detailed breakdowns
- **Detailed Summary** with product performance
- **Product Performance Analysis**
- Export reports as CSV

### 🔄 Restock Management
- **Automatic Low Stock Detection**
- Restock planner with filterable product list
- One-click restock with adjustable quantities
- Real-time inventory updates
- Restock history tracking

### 🔔 Notification System
- **Low Stock Notifications** with customizable thresholds
- Real-time notification badge updates
- Notification preferences configuration
- In-app notification feed

### 📋 Audit Logs & Activity Tracking
- Comprehensive activity logging
- Track user actions (login, product changes, sales)
- Filter logs by user, action type, date range
- Export audit trails

### 🤖 AI-Powered Chatbot (InventoryBot)
- Natural language query support
- Product lookup and information retrieval
- Low stock alerts and recommendations
- Sales data insights
- Contextual help and guidance
- Powered by Azure OpenAI

### 🛍️ E-Commerce Integration
- Public product catalog API
- Customer-facing product pages
- QR code-based product access
- Shopping cart functionality
- Product availability checking

### 🎨 Modern UI/UX Design
- **Professional Minimal Theme** with blue-gray palette
- **Responsive Design** for desktop, tablet, and mobile
- **Dark Mode Support** (via CSS variables)
- **Smooth Animations** and transitions
- **Interactive Charts** with Chart.js v4
- **Toast Notifications** for user feedback
- **Modal Dialogs** for forms and confirmations
- **Custom Scrollbars** for better aesthetics

### 💱 Localization
- **Indian Rupee (₹) Currency** formatting throughout
- `en-IN` locale for number formatting
- Date formatting optimized for Indian users

### 🔍 Search & Filter
- Real-time product search
- Multi-field filtering (name, SKU, category, supplier)
- Advanced search in product catalog
- Filter audit logs by criteria

### 📱 Accessibility
- Keyboard navigation support
- ARIA labels for screen readers
- Semantic HTML structure
- High contrast ratios for readability

---

## 🏗️ Technical Architecture

### Frontend
- **Vanilla JavaScript** (ES6+)
- **Chart.js v4** for data visualization
- **CSS3** with CSS Custom Properties (variables)
- **HTML5** semantic markup
- Modular component architecture

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **multer** for file uploads
- **csv-parser** for CSV import
- RESTful API design

### AI Integration
- **Azure OpenAI** for chatbot functionality
- Custom prompt engineering for inventory domain
- Context-aware conversation handling

### Security
- Token-based authentication
- Password encryption
- Role-based route protection
- Input validation and sanitization
- CORS configuration
- Environment variable management

---

## 📁 Project Structure

```
inventory-system/
├── config/
│   ├── db.js                    # MongoDB connection
│   └── inventoryBot.js          # AI chatbot configuration
├── middleware/
│   └── auth.js                  # JWT authentication middleware
├── models/
│   ├── ActivityLog.js           # Activity tracking schema
│   ├── Item.js                  # Product/inventory schema
│   ├── Sale.js                  # Sales transaction schema
│   ├── Supplier.js              # Supplier schema
│   └── User.js                  # User schema
├── routes/
│   ├── analytics.js             # Analytics endpoints
│   ├── auth.js                  # Authentication routes
│   ├── chatbot.js               # AI chatbot routes
│   ├── ecommerce-portal.js      # E-commerce API
│   ├── items.js                 # Product CRUD routes
│   ├── logs.js                  # Activity log routes
│   ├── reports.js               # Report generation routes
│   ├── sales.js                 # Sales routes
│   ├── shop-api.js              # Public shop API
│   ├── suppliers.js             # Supplier routes
│   └── users.js                 # User management routes
├── services/
│   └── inventoryBotService.js   # Chatbot business logic
├── public/
│   ├── app.js                   # Legacy app script
│   ├── billing.html             # Billing interface
│   ├── billing.js               # Billing logic
│   ├── dashboard.html           # Main dashboard
│   ├── dashboard-app.js         # Dashboard application logic
│   ├── dashboard-styles.css     # Dashboard styling
│   ├── common-theme.css         # Global theme variables
│   ├── edit-product.html        # Product editor
│   ├── edit-product.js          # Product edit logic
│   ├── product.html             # Public product page
│   ├── product-page.js          # Product page logic
│   └── styles.css               # Global styles
├── scripts/
│   ├── enableEcommerce.js       # E-commerce setup script
│   ├── findProduct.js           # Product search utility
│   ├── listProducts.js          # Product listing utility
│   ├── runChatRequest.js        # Chatbot test script
│   ├── seedUsers.js             # User seeding script
│   └── testInventoryBotPlan.js  # Chatbot testing
├── docs/
│   ├── ADVANCED-REPORTS.md      # Advanced reporting guide
│   ├── BACKEND-IMPLEMENTATION.md # Backend architecture docs
│   ├── BACKEND-TESTING.md       # Testing documentation
│   ├── E-COMMERCE-API.md        # E-commerce API guide
│   ├── PRODUCT-EDITING-GUIDE.md # Product editing guide
│   └── inventorybot-system-prompt.md # Chatbot prompt
├── server.js                    # Express server entry point
├── package.json                 # Dependencies & scripts
└── .env                         # Environment variables (not in repo)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas cluster)
- **Azure OpenAI API Key** (for chatbot features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bharani-01/Inventory-Management.git
   cd inventory-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/inventory-system
   JWT_SECRET=your-secret-key-here
   AZURE_OPENAI_API_KEY=your-azure-openai-key
   AZURE_OPENAI_ENDPOINT=your-azure-endpoint
   AZURE_OPENAI_DEPLOYMENT=your-deployment-name
   ```

4. **Seed initial admin user** (optional)
   ```bash
   node scripts/seedUsers.js
   ```
   Default credentials: `admin` / `admin123`

5. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

6. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:5000/dashboard.html
   ```

---

## 👤 User Roles & Permissions

### Admin
- Full system access
- User management (create, edit, delete users)
- Product management (CRUD operations)
- Supplier management
- Sales viewing and analytics
- Advanced reports and exports
- Audit log access
- System settings configuration

### Manager
- Product inventory viewing
- Supplier management
- Restock operations
- Staff activity reports
- Analytics and charts
- Limited user viewing
- Notification management

### Staff
- Product search and lookup
- Add/update stock levels
- Record sales transactions
- View basic inventory status
- Access to POS interface

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user (admin only)

### Products/Items
- `GET /api/items` - List all products
- `GET /api/items/:id` - Get single product
- `POST /api/items` - Create product
- `PUT /api/items/:id` - Update product
- `DELETE /api/items/:id` - Delete product
- `PATCH /api/items/:id/adjust-stock` - Adjust stock quantity
- `POST /api/items/import/csv` - Import products from CSV
- `GET /api/items/export/csv` - Export products to CSV

### Sales
- `GET /api/sales` - List sales transactions
- `POST /api/sales` - Record new sale
- `GET /api/sales/summary` - Sales summary statistics

### Suppliers
- `GET /api/suppliers` - List suppliers
- `POST /api/suppliers` - Create supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

### Users
- `GET /api/users` - List users (admin only)
- `POST /api/users` - Create user (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### Reports
- `GET /api/reports/sales-summary` - Sales trends
- `GET /api/reports/inventory-breakdown` - Inventory distribution
- `GET /api/reports/top-products` - Top performing products
- `GET /api/reports/category-sales` - Category-wise sales
- `GET /api/reports/detailed-summary` - Comprehensive report

### Analytics
- `GET /api/analytics/dashboard` - Dashboard metrics
- `GET /api/analytics/trends` - Trend analysis

### Chatbot
- `POST /api/chatbot/chat` - Send message to AI chatbot

### Activity Logs
- `GET /api/logs` - Retrieve activity logs
- `POST /api/logs` - Create log entry

### E-Commerce (Public)
- `GET /api/shop/products` - Public product catalog
- `GET /api/shop/products/:id` - Public product details
- `GET /api/ecommerce/public/products` - Alternative public API

---

## 🎨 Customization

### Theme Variables
Edit `public/common-theme.css` to customize colors, spacing, and typography:

```css
:root {
    --primary: #4f46e5;
    --primary-hover: #4338ca;
    --surface: #ffffff;
    --card-bg: #ffffff;
    --text-primary: #1e293b;
    --text-muted: #64748b;
    /* ... more variables */
}
```

### Chart Customization
Modify chart configurations in `public/dashboard-app.js`:
- Colors and gradients
- Animation settings
- Tooltip formats
- Axis labels

### Notification Thresholds
Adjust low stock thresholds in the notification settings UI or modify defaults in `dashboard-app.js`.

---

## 🧪 Testing

### Manual Testing
- Use the provided test scripts in `scripts/` directory
- Test chatbot: `node scripts/runChatRequest.js`
- List products: `node scripts/listProducts.js`
- Find product: `node scripts/findProduct.js`

### API Testing
Use tools like Postman or curl to test API endpoints. Example:

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Get products (with token)
curl http://localhost:5000/api/items \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 5000) | No |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `AZURE_OPENAI_API_KEY` | Azure OpenAI API key | For chatbot |
| `AZURE_OPENAI_ENDPOINT` | Azure OpenAI endpoint URL | For chatbot |
| `AZURE_OPENAI_DEPLOYMENT` | Deployment/model name | For chatbot |

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running locally or connection string is correct
- Check firewall settings for Atlas connections

**Charts Not Rendering**
- Clear browser cache and reload
- Check console for JavaScript errors
- Verify Chart.js is loaded properly

**Authentication Failed**
- Clear localStorage and login again
- Verify JWT_SECRET is consistent
- Check token expiration settings

**Chatbot Not Responding**
- Verify Azure OpenAI credentials in `.env`
- Check API quota and billing
- Review chatbot logs in console

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Bharani**
- GitHub: [@bharani-01](https://github.com/bharani-01)
- Repository: [Inventory-Management](https://github.com/bharani-01/Inventory-Management)

---

## 🙏 Acknowledgments

- **Chart.js** for powerful data visualization
- **Azure OpenAI** for AI chatbot capabilities
- **MongoDB** for flexible data storage
- **Express.js** for robust backend framework
- The open-source community for inspiration and tools

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact via repository discussions
- Check documentation in the `docs/` folder

---

## 🗺️ Roadmap

### Planned Features
- [ ] Multi-warehouse support
- [ ] Batch/lot tracking
- [ ] Advanced forecasting with ML
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] PDF invoice generation
- [ ] Integration with accounting software
- [ ] Barcode scanning via camera
- [ ] Offline mode with sync
- [ ] Multi-language support

---

**Built with ❤️ for efficient inventory management**
