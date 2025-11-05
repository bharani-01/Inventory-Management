# Advanced Reports Documentation

## Overview
The inventory system now includes comprehensive category-wise sales reports and detailed summary reports with multiple viewing options.

## New Report Features

### 1. 📊 Category-wise Sales Report

**Endpoint**: `GET /api/reports/sales-by-category`

**Parameters**:
- `from` (optional): Start date (YYYY-MM-DD)
- `to` (optional): End date (YYYY-MM-DD)
- Default: Last 30 days if not specified

**Response Includes**:
- Total revenue by category
- Units sold per category
- Sales count per category
- Average order value
- Top 5 products in each category

**Dashboard Access**:
- Go to Reports section
- Click "📊 Category Sales Report" button
- View detailed breakdown by category
- Export to CSV with dedicated export button

### 2. 📈 Detailed Business Summary

**Endpoint**: `GET /api/reports/detailed-summary`

**Parameters**:
- `from` (optional): Start date
- `to` (optional): End date
- Default: Last 30 days

**Comprehensive Metrics**:
- **Sales Performance**:
  - Total revenue
  - Total sales count
  - Units sold
  - Average order value
  - Min/Max order values
  
- **Inventory Status**:
  - Total products
  - Stock value
  - Total units
  - Low stock items
  - Out of stock items
  
- **Top Products**:
  - Top 10 best sellers
  - Revenue by product
  - Current stock levels
  
- **Category Breakdown**:
  - Revenue by category
  - Sales count
  - Average values
  
- **Daily Trends**:
  - Last 30 days performance
  - Revenue trends
  - Sales patterns
  
- **Supplier Performance**:
  - Top 10 suppliers
  - Product counts
  - Stock values

**Dashboard Access**:
- Go to Reports section
- Click "📈 Detailed Summary" button
- View comprehensive business overview

### 3. 🏆 Product Performance Report

**Endpoint**: `GET /api/reports/product-performance`

**Parameters**:
- `from` (optional): Start date
- `to` (optional): End date
- `category` (optional): Filter by specific category
- Default: All categories, last 30 days

**Product Metrics**:
- Total quantity sold
- Total revenue per product
- Sales count
- Average sale value
- Current stock levels
- Stock value
- Low stock indicators

**Dashboard Access**:
- Go to Reports section
- Click "🏆 Product Performance" button
- Optionally filter by category
- View detailed product sales data

### 4. 💾 Category Sales Export

**Endpoint**: `GET /api/reports/sales-by-category/export`

**Parameters**: Same as category sales report

**Output**: CSV file with:
- Category name
- Total revenue
- Total quantity
- Sales count
- Average order value

**Dashboard Access**:
- Go to Reports section
- Click "💾 Export Category Sales" button
- Download CSV file

## How to Use - Dashboard Interface

### Accessing Advanced Reports

1. **Login to Dashboard**
   ```
   http://your-ip:5000/dashboard.html
   ```

2. **Navigate to Reports**
   - Click "📈 Reports" in sidebar
   - Scroll to "📊 Advanced Reports" section

3. **Choose Report Type**:
   - **Category Sales**: View sales breakdown by product category
   - **Detailed Summary**: Comprehensive business overview
   - **Product Performance**: Individual product analysis
   - **Export Category Sales**: Download CSV report

### Interactive Prompts

When you click any advanced report button, you'll be prompted for:
- **Start Date**: YYYY-MM-DD format (optional)
- **End Date**: YYYY-MM-DD format (optional)
- **Category**: For product performance only (optional)

Leave blank to use defaults (last 30 days).

### Viewing Reports

Reports open in modal windows with:
- **Color-coded metrics** for easy reading
- **Sortable data tables** for detailed analysis
- **Visual indicators** for status (low stock, out of stock)
- **Responsive design** for mobile viewing

## API Examples

### Category Sales Report
```javascript
// Last 30 days (default)
GET /api/reports/sales-by-category

// Custom date range
GET /api/reports/sales-by-category?from=2025-10-01&to=2025-10-31
```

### Detailed Summary
```javascript
// Last 30 days (default)
GET /api/reports/detailed-summary

// This month
GET /api/reports/detailed-summary?from=2025-11-01&to=2025-11-30
```

### Product Performance
```javascript
// All categories, last 30 days
GET /api/reports/product-performance

// Specific category
GET /api/reports/product-performance?category=Groceries

// With date range
GET /api/reports/product-performance?category=Electronics&from=2025-10-01&to=2025-10-31
```

### Export Category Sales
```javascript
// Download CSV
GET /api/reports/sales-by-category/export?from=2025-10-01&to=2025-10-31
```

## Sample Response - Category Sales

```json
{
  "dateRange": {
    "from": "2025-10-01T00:00:00.000Z",
    "to": "2025-10-31T23:59:59.999Z"
  },
  "categories": [
    {
      "category": "Groceries",
      "totalRevenue": 125000.50,
      "totalQuantity": 850,
      "salesCount": 145,
      "averageOrderValue": 862.07,
      "topProducts": [
        {
          "name": "Rice 5kg",
          "quantity": 120,
          "revenue": 18000.00
        },
        {
          "name": "Wheat Flour 10kg",
          "quantity": 95,
          "revenue": 14250.00
        }
      ]
    },
    {
      "category": "Electronics",
      "totalRevenue": 89500.00,
      "totalQuantity": 42,
      "salesCount": 38,
      "averageOrderValue": 2355.26,
      "topProducts": [...]
    }
  ],
  "totalCategories": 5
}
```

## Sample Response - Detailed Summary

```json
{
  "dateRange": {
    "from": "2025-10-01T00:00:00.000Z",
    "to": "2025-10-31T23:59:59.999Z",
    "days": 31
  },
  "salesMetrics": {
    "totalRevenue": 450000.00,
    "totalQuantity": 2500,
    "salesCount": 350,
    "averageOrderValue": 1285.71,
    "minOrderValue": 50.00,
    "maxOrderValue": 15000.00
  },
  "inventoryStatus": {
    "totalProducts": 150,
    "totalStockValue": 875000.00,
    "totalQuantity": 5000,
    "lowStockItems": 12,
    "outOfStockItems": 3
  },
  "topProducts": [...],
  "categoryBreakdown": [...],
  "dailyTrend": [...],
  "supplierPerformance": [...]
}
```

## Benefits

### For Business Owners
- **Category Performance**: Identify which categories generate most revenue
- **Product Analysis**: See which products are bestsellers
- **Inventory Health**: Monitor stock levels and values
- **Trend Analysis**: Track daily/monthly sales patterns

### For Managers
- **Data-Driven Decisions**: Make informed inventory decisions
- **Stock Optimization**: Identify slow-moving vs fast-moving items
- **Supplier Insights**: Evaluate supplier performance
- **Export Capabilities**: Share reports with stakeholders

### For Staff
- **Quick Overview**: Comprehensive dashboard at a glance
- **Easy Navigation**: Simple button-based interface
- **Visual Reports**: Color-coded status indicators
- **Mobile Access**: View reports on any device

## Best Practices

### Report Generation
1. **Regular Reviews**: Check reports weekly/monthly
2. **Date Ranges**: Use appropriate timeframes for analysis
3. **Category Filtering**: Focus on specific categories when needed
4. **Export Data**: Download CSV for external analysis

### Performance Optimization
- Use specific date ranges to reduce data processing
- Filter by category for faster product performance reports
- Schedule large report exports during off-peak hours

### Data Interpretation
- Compare periods (this month vs last month)
- Look for trends in daily sales data
- Monitor low stock items regularly
- Track top products for restocking priorities

## Troubleshooting

### No Data Showing
- **Check Date Range**: Ensure sales exist in selected period
- **Verify Sales**: Add sample sales if database is empty
- **Check Filters**: Remove category filter if too restrictive

### Slow Loading
- **Reduce Date Range**: Limit to shorter periods
- **Clear Cache**: Refresh browser
- **Check Connection**: Ensure server is running

### Export Issues
- **Browser Permissions**: Allow downloads
- **Pop-up Blockers**: Disable for this site
- **File Format**: CSV opens in Excel/Google Sheets

## Future Enhancements

Planned features:
- [ ] Graphical charts in reports
- [ ] Scheduled report emails
- [ ] Custom report builder
- [ ] Profit margin analysis
- [ ] Customer insights (when e-commerce active)
- [ ] Comparative period analysis
- [ ] Forecasting based on trends

## Support

For issues or questions:
- Check server logs: Terminal running `node server.js`
- Verify database: MongoDB should be running
- Test API: Use browser or Postman to test endpoints
- Check permissions: Ensure user has Admin or Manager role

---

**Quick Links:**
- Dashboard: `http://your-ip:5000/dashboard.html`
- Reports Section: Dashboard → Reports → Advanced Reports
- API Base: `http://your-ip:5000/api/reports/`
