# Product Editing Guide

## Overview
The new **Product Edit Page** provides a comprehensive interface for managing all aspects of your products, including photos, descriptions, pricing, and e-commerce settings.

## How to Access

### From Dashboard
1. Log in to your dashboard at `http://your-ip:5000/dashboard.html`
2. Go to **Manage Products** section
3. Click the **✏️ Edit** button next to any product
4. You'll be redirected to the dedicated edit page

### Direct URL
You can also access directly: `http://your-ip:5000/edit-product.html?id=PRODUCT_ID`

## Features

### 📦 Basic Information
- **Product Name**: Clear, descriptive name
- **Barcode/SKU**: Unique identifier for tracking
- **Category**: Organize products (Groceries, Electronics, etc.)
- **Supplier**: Select from your supplier database

### 💰 Pricing & Stock
- **Price**: Selling price per unit (₹)
- **Quantity**: Current stock level
- **Reorder Level**: Get alerts when stock is low
- **Unit**: Measurement unit (pcs, kg, L, etc.)

### 🖼️ Product Images
**Upload Multiple Images:**
- Click the upload area or drag & drop images
- Supports: JPG, PNG, GIF (Max 5MB each)
- Upload multiple images at once

**Manage Images:**
- **Primary Image**: First image shown in listings
- **Reorder**: Click ★ to set any image as primary
- **Delete**: Click × to remove unwanted images
- Images are automatically saved with the product

### 📝 Description & Details
- **Product Description**: Detailed information for customers
- **Specifications**: Technical details, dimensions, materials
  - Use line breaks for better formatting
  - Example: `Size: 500ml\nWeight: 250g\nMaterial: Plastic`

### 🛒 E-commerce Settings
- **Enable for Online Store**: Make product available for purchase
- **Visibility Options**:
  - **Public**: Everyone can see (recommended for e-commerce)
  - **Limited**: Registered users only
  - **Internal**: Staff only (hidden from public)

### ⚙️ Additional Settings
- **Tags**: Keywords for search (organic, bestseller, new arrival)
- **Internal Notes**: Private notes visible only to staff

## Using the Edit Page

### 1. Loading Product
- Product details load automatically based on URL ID
- If product doesn't exist, you'll be redirected to dashboard

### 2. Editing Fields
- All fields are editable
- Required fields marked with *
- Real-time validation on form submission

### 3. Managing Images

**To Upload New Images:**
1. Click the upload area or drag images
2. Select one or multiple images
3. Images preview immediately
4. Click **Save Changes** to persist

**To Set Primary Image:**
1. Find the image you want as primary
2. Click the ★ button on that image
3. It moves to first position
4. Click **Save Changes**

**To Remove Images:**
1. Click the × button on any image
2. Confirm removal
3. Click **Save Changes**

### 4. Saving Changes
1. Click **Save Changes** button (top right)
2. Wait for success message
3. Option to return to dashboard or continue editing

### 5. Preview Product Page
- Click **📱 Preview Product Page** link (top of page)
- Opens public-facing product page in new tab
- See how customers will view this product

## Tips & Best Practices

### Image Guidelines
- **First image is primary**: Shows in search results and listings
- **Use high-quality images**: Clear, well-lit product photos
- **Multiple angles**: Show product from different perspectives
- **Lifestyle images**: Show product in use (optional)
- **Optimize size**: Keep images under 2MB for faster loading

### Description Writing
- **Be descriptive**: Include key features and benefits
- **Use bullet points**: Easy to scan (in specifications field)
- **Highlight unique features**: What makes this product special?
- **Include use cases**: How customers can use the product

### Pricing Strategy
- **Competitive pricing**: Research similar products
- **Reorder levels**: Set based on sales velocity
- **Stock accuracy**: Keep quantities updated

### E-commerce Optimization
- **Enable for store**: Turn on e-commerce for sellable products
- **Public visibility**: Use for products you want to sell online
- **Tags for SEO**: Use relevant keywords customers search for
- **Complete all fields**: More info = better conversions

### Category & Organization
- **Consistent categories**: Use standard naming
- **Supplier tracking**: Link products to suppliers for reordering
- **Tag strategically**: seasonal, sale, featured, new, etc.

## Keyboard Shortcuts

- **Ctrl/Cmd + S**: Save changes (when form is focused)
- **Esc**: Cancel/go back (browser default)

## Mobile Access

The edit page is **responsive** and works on mobile devices:
- Access from `http://your-ip:5000/edit-product.html?id=PRODUCT_ID`
- All features available on mobile
- Touch-friendly image upload (tap to upload)
- Optimized form layout for small screens

## Troubleshooting

### Can't Upload Images
- **Check file size**: Must be under 5MB
- **Check format**: Only JPG, PNG, GIF supported
- **Browser compatibility**: Use modern browser (Chrome, Firefox, Safari)
- **Clear cache**: Try hard refresh (Ctrl+Shift+R)

### Changes Not Saving
- **Check permissions**: Must be Admin or Manager role
- **Network connection**: Ensure server is running
- **Required fields**: Fill all fields marked with *
- **Console errors**: Press F12 and check Console tab

### Product Not Loading
- **Verify ID**: Check URL has correct product ID
- **Product exists**: Product might be deleted
- **Server running**: Ensure backend is online
- **Authentication**: Make sure you're logged in

### Images Not Displaying
- **Base64 encoding**: Images stored as base64 strings
- **Large images**: May take time to load
- **Browser cache**: Clear cache and reload

## API Reference

The edit page uses these endpoints:

### GET `/api/items/:id`
- Loads product details
- Requires authentication token

### PUT `/api/items/:id`
- Updates product information
- Requires authentication token
- Payload: Full product object with changes

### GET `/api/suppliers`
- Loads supplier dropdown
- Requires authentication token

## Security

- **Authentication required**: Must be logged in
- **Role-based access**: Only Admin/Manager can edit
- **Token validation**: JWT token checked on every request
- **Input sanitization**: All inputs validated on backend

## Future Enhancements

Potential features coming soon:
- [ ] Bulk image upload
- [ ] Image cropping/editing
- [ ] Drag-and-drop image reordering
- [ ] Duplicate product function
- [ ] Version history/undo changes
- [ ] Rich text editor for descriptions
- [ ] AI-generated descriptions
- [ ] Barcode scanner integration

## Support

For issues or questions:
1. Check server logs in terminal
2. Verify MongoDB is running
3. Check browser console (F12) for errors
4. Ensure you have Admin or Manager permissions

---

**Quick Access URLs:**
- Dashboard: `http://your-ip:5000/dashboard.html`
- Edit Product: `http://your-ip:5000/edit-product.html?id=PRODUCT_ID`
- Public Product: `http://your-ip:5000/product.html?id=PRODUCT_ID`
