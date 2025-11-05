# E-Commerce Backend API Documentation

## Base URL
```
http://localhost:5000/api/shop
```

---

## 📦 Public Endpoints (No Authentication Required)

### 1. Get All Products
**Endpoint:** `GET /products`

**Description:** Fetch all products with optional filtering

**Query Parameters:**
- `category` (string, optional) - Filter by category (or 'all')
- `search` (string, optional) - Search in name, description, or category
- `minPrice` (number, optional) - Minimum price filter
- `maxPrice` (number, optional) - Maximum price filter
- `inStock` (boolean, optional) - Show only in-stock products (default: true)

**Example Request:**
```javascript
fetch('http://localhost:5000/api/shop/products?category=Electronics&inStock=true')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop",
    "description": "High-performance laptop",
    "category": "Electronics",
    "price": 45000,
    "quantity": 10,
    "sku": "LAP-001"
  }
]
```

---

### 2. Get Single Product
**Endpoint:** `GET /products/:id`

**Description:** Get detailed information about a specific product

**Example Request:**
```javascript
fetch('http://localhost:5000/api/shop/products/507f1f77bcf86cd799439011')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Laptop",
  "description": "High-performance laptop",
  "category": "Electronics",
  "price": 45000,
  "quantity": 10,
  "sku": "LAP-001"
}
```

**Error Response (404):**
```json
{
  "message": "Product not found"
}
```

---

### 3. Get Categories
**Endpoint:** `GET /categories`

**Description:** Get list of all product categories

**Example Request:**
```javascript
fetch('http://localhost:5000/api/shop/categories')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Response (200 OK):**
```json
[
  "Electronics",
  "Clothing",
  "Books",
  "Home & Kitchen"
]
```

---

### 4. Create Order (Checkout)
**Endpoint:** `POST /orders`

**Description:** Place a new order from the shopping cart

**Request Body:**
```json
{
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "quantity": 2
    }
  ],
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "contact": "9876543210",
    "address": "123 Main St, City, State - 12345"
  },
  "paymentMethod": "online",
  "totalAmount": 90000
}
```

**Example Request:**
```javascript
fetch('http://localhost:5000/api/shop/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(orderData)
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**Response (201 Created):**
```json
{
  "message": "Order placed successfully",
  "orderId": "507f1f77bcf86cd799439012",
  "sales": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "itemId": "507f1f77bcf86cd799439011",
      "quantity": 2,
      "unitPrice": 45000,
      "totalAmount": 90000,
      "customerName": "John Doe",
      "orderStatus": "pending"
    }
  ],
  "totalAmount": 90000
}
```

**Error Responses:**

*400 Bad Request - No items:*
```json
{
  "message": "No items in order"
}
```

*400 Bad Request - Insufficient stock:*
```json
{
  "message": "Insufficient stock for Laptop. Available: 5"
}
```

*404 Not Found - Product not found:*
```json
{
  "message": "Product not found"
}
```

**Business Logic:**
- ✅ Validates stock availability for all items
- ✅ Creates individual sale records for each item
- ✅ Automatically reduces inventory quantities
- ✅ Sets `lowStock` flag if quantity <= reorderLevel
- ✅ Sets initial order status to 'pending'

---

### 5. Track Order
**Endpoint:** `GET /orders/:orderId`

**Description:** Get order details and status by order ID

**Example Request:**
```javascript
fetch('http://localhost:5000/api/shop/orders/507f1f77bcf86cd799439012')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Response (200 OK):**
```json
{
  "orderId": "507f1f77bcf86cd799439012",
  "status": "processing",
  "items": [
    {
      "name": "Laptop",
      "category": "Electronics",
      "quantity": 2,
      "price": 45000,
      "total": 90000
    }
  ],
  "customerName": "John Doe",
  "customerContact": "9876543210",
  "customerEmail": "john@example.com",
  "shippingAddress": "123 Main St, City, State - 12345",
  "createdAt": "2025-11-03T10:30:00.000Z",
  "totalAmount": 90000
}
```

**Error Response (404):**
```json
{
  "message": "Order not found"
}
```

---

## 🔐 Merchant Endpoints (Authentication Required)

**Authentication:** All merchant endpoints require a valid JWT token

**Headers Required:**
```javascript
{
  'Authorization': 'Bearer <your-jwt-token>',
  'Content-Type': 'application/json'
}
```

**Allowed Roles:** `admin`, `manager`

---

### 6. Get All Orders (Merchant)
**Endpoint:** `GET /merchant/orders`

**Description:** Get all orders with optional filtering

**Query Parameters:**
- `status` (string, optional) - Filter by order status ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'all')
- `startDate` (ISO date, optional) - Filter orders from this date
- `endDate` (ISO date, optional) - Filter orders until this date

**Example Request:**
```javascript
fetch('http://localhost:5000/api/shop/merchant/orders?status=pending', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "itemId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Laptop",
      "category": "Electronics",
      "sku": "LAP-001"
    },
    "quantity": 2,
    "unitPrice": 45000,
    "totalAmount": 90000,
    "customerName": "John Doe",
    "customerContact": "9876543210",
    "customerEmail": "john@example.com",
    "shippingAddress": "123 Main St, City, State - 12345",
    "orderStatus": "pending",
    "paymentMethod": "online",
    "trackingNumber": null,
    "notes": null,
    "createdAt": "2025-11-03T10:30:00.000Z"
  }
]
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "No token provided"
}
```

**Error Response (403 Forbidden):**
```json
{
  "message": "Access denied"
}
```

---

### 7. Update Order Status (Merchant)
**Endpoint:** `PUT /merchant/orders/:orderId`

**Description:** Update order status, tracking number, or notes

**Request Body:**
```json
{
  "orderStatus": "shipped",
  "trackingNumber": "TRACK123456789",
  "notes": "Shipped via Express Delivery"
}
```

**Example Request:**
```javascript
fetch('http://localhost:5000/api/shop/merchant/orders/507f1f77bcf86cd799439012', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    orderStatus: 'shipped',
    trackingNumber: 'TRACK123456789'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**Response (200 OK):**
```json
{
  "message": "Order updated successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439012",
    "orderStatus": "shipped",
    "trackingNumber": "TRACK123456789",
    "notes": "Shipped via Express Delivery"
  }
}
```

**Order Status Flow:**
```
pending → processing → shipped → delivered
         ↓
     cancelled
```

---

### 8. Get Analytics (Merchant)
**Endpoint:** `GET /merchant/analytics`

**Description:** Get sales analytics and statistics

**Query Parameters:**
- `startDate` (ISO date, optional) - Analytics from this date
- `endDate` (ISO date, optional) - Analytics until this date

**Example Request:**
```javascript
fetch('http://localhost:5000/api/shop/merchant/analytics', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**Response (200 OK):**
```json
{
  "totalOrders": 45,
  "totalRevenue": 1250000,
  "averageOrderValue": 27777.78,
  "statusBreakdown": {
    "pending": 5,
    "processing": 8,
    "shipped": 12,
    "delivered": 18,
    "cancelled": 2
  }
}
```

---

## 🔧 Payment Methods

Supported payment methods:
- `cash` - Cash on Delivery
- `card` - Credit/Debit Card
- `upi` - UPI Payment
- `wallet` - Digital Wallet
- `online` - Online Banking

---

## 📊 Order Status Values

| Status | Description |
|--------|-------------|
| `pending` | Order placed, awaiting processing |
| `processing` | Order is being prepared |
| `shipped` | Order has been shipped |
| `delivered` | Order delivered to customer |
| `cancelled` | Order cancelled |

---

## 🔒 Authentication

### How to Get Token:

1. **Login to Inventory System:**
```javascript
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'admin',
    password: 'your-password'
  })
})
  .then(res => res.json())
  .then(data => {
    localStorage.setItem('token', data.token);
  });
```

2. **Use Token in Requests:**
```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:5000/api/shop/merchant/orders', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
```

---

## 🧪 Testing with Postman/Thunder Client

### 1. Get Products
```
GET http://localhost:5000/api/shop/products
```

### 2. Create Order
```
POST http://localhost:5000/api/shop/orders
Content-Type: application/json

{
  "items": [{"productId": "YOUR_PRODUCT_ID", "quantity": 1}],
  "customerInfo": {
    "name": "Test User",
    "email": "test@test.com",
    "contact": "1234567890",
    "address": "Test Address"
  },
  "paymentMethod": "cash",
  "totalAmount": 100
}
```

### 3. Get Orders (Merchant)
```
GET http://localhost:5000/api/shop/merchant/orders
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## ⚠️ Error Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (no token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 🚀 Database Models

### Sale Model Schema:
```javascript
{
  itemId: ObjectId (ref: Item),
  quantity: Number,
  unitPrice: Number,
  totalAmount: Number,
  customerName: String,
  customerContact: String,
  customerEmail: String,
  shippingAddress: String,
  orderStatus: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
  paymentMethod: ['cash', 'card', 'upi', 'wallet', 'online'],
  trackingNumber: String,
  notes: String,
  createdAt: Date (auto)
}
```

---

## 📝 Notes

- ✅ All endpoints include proper error handling
- ✅ Stock levels automatically updated on order creation
- ✅ Low stock flags set automatically
- ✅ Order validation prevents overselling
- ✅ CORS enabled for frontend integration
- ✅ JWT authentication for merchant endpoints
- ✅ Role-based access control (admin/manager only)

---

**Backend Status:** ✅ **FULLY FUNCTIONAL**

Server running on: **http://localhost:5000**
