// Modern Inventory Dashboard Application
const API_URL = 'http://localhost:5000/api';

// State
let currentUser = {
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
    username: localStorage.getItem('username') || null
};

let currentPage = 'overview';
let items = [];
let suppliers = [];
let sales = [];

// Navigation Configuration
const navigationConfig = {
    admin: [
        { id: 'overview', icon: '📊', label: 'Dashboard', page: 'renderAdminOverview' },
        { id: 'users', icon: '👥', label: 'Manage Users', page: 'renderManageUsers' },
        { id: 'products', icon: '📦', label: 'Manage Products', page: 'renderManageProducts' },
        { id: 'reports', icon: '📈', label: 'Reports', page: 'renderReports' },
        { id: 'settings', icon: '⚙️', label: 'Settings', page: 'renderSettings' }
    ],
    manager: [
        { id: 'overview', icon: '📊', label: 'Dashboard', page: 'renderManagerOverview' },
        { id: 'inventory', icon: '📋', label: 'Inventory Summary', page: 'renderInventorySummary' },
        { id: 'suppliers', icon: '🏢', label: 'Supplier Management', page: 'renderSupplierManagement' },
        { id: 'reports', icon: '📈', label: 'Reports', page: 'renderManagerReports' }
    ],
    staff: [
        { id: 'overview', icon: '📊', label: 'Dashboard', page: 'renderStaffOverview' },
        { id: 'stock', icon: '➕', label: 'Add/Update Stock', page: 'renderStockManagement' },
        { id: 'sales', icon: '💰', label: 'Sales Entry', page: 'renderSalesEntry' },
        { id: 'search', icon: '🔍', label: 'Product Search', page: 'renderProductSearch' }
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    if (currentUser.token) {
        showDashboard();
    } else {
        showLogin();
    }
}

function showLogin() {
    document.getElementById('loginPage').classList.add('active');
    document.getElementById('dashboardPage').classList.remove('active');

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            currentUser = {
                token: data.token,
                role: data.role,
                username
            };

            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('username', username);

            showMessage('loginMessage', 'Login successful!', 'success');
            setTimeout(() => {
                showDashboard();
            }, 500);
        } else {
            showMessage('loginMessage', data.message || 'Invalid credentials', 'error');
        }
    } catch (error) {
        showMessage('loginMessage', 'Network error. Please try again.', 'error');
    }
}

function showDashboard() {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('dashboardPage').classList.add('active');

    initializeDashboard();
}

function initializeDashboard() {
    // Update user info
    document.getElementById('sidebarUserName').textContent = currentUser.username;
    document.getElementById('sidebarUserRole').textContent = capitalizeFirst(currentUser.role);

    // Build navigation
    buildNavigation();

    // Set up logout
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // Set up sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // Load initial page
    navigateToPage('overview');

    // Fetch initial data
    fetchAllData();
}

function buildNavigation() {
    const nav = document.getElementById('sidebarNav');
    const items = navigationConfig[currentUser.role] || [];

    nav.innerHTML = items.map(item => `
        <div class="nav-item" data-page="${item.id}">
            <span class="nav-icon">${item.icon}</span>
            <span class="nav-text">${item.label}</span>
        </div>
    `).join('');

    // Add click handlers
    nav.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const pageId = item.dataset.page;
            navigateToPage(pageId);
        });
    });
}

function navigateToPage(pageId) {
    currentPage = pageId;

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === pageId);
    });

    // Find page config
    const navItem = navigationConfig[currentUser.role].find(item => item.id === pageId);
    if (!navItem) return;

    // Update page title
    document.getElementById('pageTitle').textContent = navItem.label;

    // Render page content
    const renderFunction = window[navItem.page];
    if (typeof renderFunction === 'function') {
        renderFunction();
    }
}

// ===== ADMIN PAGES =====

function renderAdminOverview() {
    const content = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Total Products</span>
                    <div class="stat-icon primary">📦</div>
                </div>
                <div class="stat-value" id="totalProducts">0</div>
                <div class="stat-trend">+12% from last month</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Active Suppliers</span>
                    <div class="stat-icon success">🏢</div>
                </div>
                <div class="stat-value" id="totalSuppliers">0</div>
                <div class="stat-trend">+5% from last month</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Registered Users</span>
                    <div class="stat-icon warning">👥</div>
                </div>
                <div class="stat-value">3</div>
                <div class="stat-trend">No change</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Low Stock Alerts</span>
                    <div class="stat-icon danger">⚠️</div>
                </div>
                <div class="stat-value" id="lowStockCount">0</div>
                <div class="stat-trend negative">Requires attention</div>
            </div>
        </div>
        
        <div class="data-table-wrapper" style="margin-top: 24px;">
            <div class="table-header">
                <h3 class="table-title">Recent Activity</h3>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>User</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody id="activityTable">
                    <tr><td colspan="3" style="text-align:center;">Loading...</td></tr>
                </tbody>
            </table>
        </div>
    `;

    renderContent(content);
    updateOverviewStats();
}

function renderManageUsers() {
    const content = `
        <div style="margin-bottom: 24px;">
            <button class="btn btn-primary" onclick="showAddUserModal()">
                ➕ Add User
            </button>
        </div>
        
        <div class="data-table-wrapper">
            <div class="table-header">
                <h3 class="table-title">System Users</h3>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>admin</td>
                        <td><span class="badge" style="background:#0078D7;color:white;padding:4px 8px;border-radius:4px;">Admin</span></td>
                        <td><span style="color:var(--success);">●</span> Active</td>
                        <td>
                            <button class="btn btn-sm btn-secondary">Edit</button>
                            <button class="btn btn-sm btn-danger">Deactivate</button>
                        </td>
                    </tr>
                    <tr>
                        <td>manager</td>
                        <td><span class="badge" style="background:#00A86B;color:white;padding:4px 8px;border-radius:4px;">Manager</span></td>
                        <td><span style="color:var(--success);">●</span> Active</td>
                        <td>
                            <button class="btn btn-sm btn-secondary">Edit</button>
                            <button class="btn btn-sm btn-danger">Deactivate</button>
                        </td>
                    </tr>
                    <tr>
                        <td>staff</td>
                        <td><span class="badge" style="background:#F39C12;color:white;padding:4px 8px;border-radius:4px;">Staff</span></td>
                        <td><span style="color:var(--success);">●</span> Active</td>
                        <td>
                            <button class="btn btn-sm btn-secondary">Edit</button>
                            <button class="btn btn-sm btn-danger">Deactivate</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    renderContent(content);
}

function renderManageProducts() {
    const content = `
        <div style="margin-bottom: 24px; display: flex; gap: 12px;">
            <button class="btn btn-primary" onclick="showAddProductModal()">
                ➕ Add Product
            </button>
            <button class="btn btn-secondary">
                📥 Import CSV
            </button>
            <button class="btn btn-secondary">
                📤 Export CSV
            </button>
        </div>
        
        <div class="data-table-wrapper">
            <div class="table-header">
                <h3 class="table-title">Product Inventory</h3>
                <input type="text" placeholder="Search products..." style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px;" onkeyup="filterProducts(this.value)">
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Reorder Level</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="productsTable">
                    <tr><td colspan="6" style="text-align:center;">Loading...</td></tr>
                </tbody>
            </table>
        </div>
    `;

    renderContent(content);
    loadProducts();
}

function renderReports() {
    const content = `
        <div class="stats-grid">
            <div class="stat-card">
                <h3 style="margin-bottom: 16px;">📊 Sales Reports</h3>
                <select class="form-control" style="width: 100%; padding: 10px; margin-bottom: 12px; border: 1px solid var(--border); border-radius: 6px;">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                </select>
                <button class="btn btn-primary btn-block">Generate Report</button>
            </div>
            
            <div class="stat-card">
                <h3 style="margin-bottom: 16px;">📦 Inventory Reports</h3>
                <select class="form-control" style="width: 100%; padding: 10px; margin-bottom: 12px; border: 1px solid var(--border); border-radius: 6px;">
                    <option>Low Stock</option>
                    <option>Expired Items</option>
                    <option>Stock Valuation</option>
                </select>
                <button class="btn btn-primary btn-block">Generate Report</button>
            </div>
            
            <div class="stat-card">
                <h3 style="margin-bottom: 16px;">🏢 Supplier Reports</h3>
                <select class="form-control" style="width: 100%; padding: 10px; margin-bottom: 12px; border: 1px solid var(--border); border-radius: 6px;">
                    <option>Deliveries</option>
                    <option>Pending Orders</option>
                    <option>Performance</option>
                </select>
                <button class="btn btn-primary btn-block">Generate Report</button>
            </div>
        </div>
        
        <div style="margin-top: 32px;">
            <h3 style="margin-bottom: 16px;">Recent Reports</h3>
            <div class="data-table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Report Name</th>
                            <th>Type</th>
                            <th>Generated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Monthly Sales - October 2025</td>
                            <td>Sales</td>
                            <td>Nov 1, 2025</td>
                            <td>
                                <button class="btn btn-sm btn-primary">📥 Download PDF</button>
                                <button class="btn btn-sm btn-secondary">📊 Download CSV</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    renderContent(content);
}

function renderSettings() {
    const content = `
        <div class="data-table-wrapper">
            <div class="table-header">
                <h3 class="table-title">⚙️ System Settings</h3>
            </div>
            <div style="padding: 24px;">
                <div class="form-group">
                    <label>Change Password</label>
                    <input type="password" placeholder="Current Password">
                </div>
                <div class="form-group">
                    <input type="password" placeholder="New Password">
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Confirm New Password">
                </div>
                <button class="btn btn-primary">Update Password</button>
                
                <hr style="margin: 32px 0; border: none; border-top: 1px solid var(--border);">
                
                <h3 style="margin-bottom: 16px;">🔔 Notification Settings</h3>
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <input type="checkbox" id="lowStockNotif" checked>
                    <label for="lowStockNotif">Low Stock Alerts</label>
                </div>
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <input type="checkbox" id="salesNotif" checked>
                    <label for="salesNotif">Sales Notifications</label>
                </div>
                
                <hr style="margin: 32px 0; border: none; border-top: 1px solid var(--border);">
                
                <h3 style="margin-bottom: 16px;">💾 Backup Data</h3>
                <button class="btn btn-success">Download Backup</button>
            </div>
        </div>
    `;

    renderContent(content);
}

// ===== MANAGER PAGES =====

function renderManagerOverview() {
    renderAdminOverview(); // Similar to admin overview
}

function renderInventorySummary() {
    renderManageProducts(); // Similar to products page
}

function renderSupplierManagement() {
    const content = `
        <div style="margin-bottom: 24px;">
            <button class="btn btn-primary" onclick="showAddSupplierModal()">
                ➕ Add Supplier
            </button>
        </div>
        
        <div class="data-table-wrapper">
            <div class="table-header">
                <h3 class="table-title">Supplier Directory</h3>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Products Supplied</th>
                        <th>Last Delivery</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="suppliersTable">
                    <tr><td colspan="6" style="text-align:center;">Loading...</td></tr>
                </tbody>
            </table>
        </div>
    `;

    renderContent(content);
    loadSuppliers();
}

function renderManagerReports() {
    renderReports(); // Same as admin reports
}

// ===== STAFF PAGES =====

function renderStaffOverview() {
    const content = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Today's Sales</span>
                    <div class="stat-icon success">💰</div>
                </div>
                <div class="stat-value">$0</div>
                <div class="stat-trend">0 transactions</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Items Updated</span>
                    <div class="stat-icon primary">📦</div>
                </div>
                <div class="stat-value">0</div>
                <div class="stat-trend">Today</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Pending Orders</span>
                    <div class="stat-icon warning">📋</div>
                </div>
                <div class="stat-value">0</div>
                <div class="stat-trend">To process</div>
            </div>
        </div>
        
        <div style="margin-top: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
            <div class="stat-card" onclick="navigateToPage('stock')" style="cursor: pointer;">
                <div style="text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 12px;">➕</div>
                    <h3>Add Stock</h3>
                </div>
            </div>
            <div class="stat-card" onclick="navigateToPage('sales')" style="cursor: pointer;">
                <div style="text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 12px;">💰</div>
                    <h3>Record Sale</h3>
                </div>
            </div>
            <div class="stat-card" onclick="navigateToPage('search')" style="cursor: pointer;">
                <div style="text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 12px;">🔍</div>
                    <h3>Search Product</h3>
                </div>
            </div>
        </div>
    `;

    renderContent(content);
}

function renderStockManagement() {
    const content = `
        <div class="data-table-wrapper">
            <div class="table-header">
                <h3 class="table-title">➕ Add / Update Stock</h3>
            </div>
            <div style="padding: 24px;">
                <form id="stockForm" style="max-width: 600px;">
                    <div class="form-group">
                        <label>Product Name</label>
                        <input type="text" id="stockProductName" placeholder="Enter product name" required>
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <input type="text" id="stockCategory" placeholder="Enter category" required>
                    </div>
                    <div class="form-group">
                        <label>Quantity</label>
                        <input type="number" id="stockQuantity" min="0" placeholder="Enter quantity" required>
                    </div>
                    <div class="form-group">
                        <label>Supplier</label>
                        <select id="stockSupplier">
                            <option value="">Select supplier</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Unit Price</label>
                        <input type="number" id="stockPrice" min="0" step="0.01" placeholder="Enter price" required>
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <button type="submit" class="btn btn-primary">✅ Submit</button>
                        <button type="reset" class="btn btn-secondary">🗑️ Clear</button>
                    </div>
                </form>
                <div id="stockMessage" class="message" style="margin-top: 16px;"></div>
            </div>
        </div>
    `;

    renderContent(content);
}

function renderSalesEntry() {
    const content = `
        <div class="data-table-wrapper">
            <div class="table-header">
                <h3 class="table-title">💰 Sales Entry</h3>
            </div>
            <div style="padding: 24px;">
                <form id="salesForm" style="max-width: 600px;">
                    <div class="form-group">
                        <label>Product</label>
                        <select id="saleProduct" required>
                            <option value="">Select product</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Quantity Sold</label>
                        <input type="number" id="saleQuantity" min="1" placeholder="Enter quantity" required>
                    </div>
                    <div class="form-group">
                        <label>Date</label>
                        <input type="date" id="saleDate" required>
                    </div>
                    <div class="form-group">
                        <label>Notes (Optional)</label>
                        <textarea id="saleNotes" rows="3" placeholder="Add any notes..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">✅ Record Sale</button>
                </form>
                <div id="saleMessage" class="message" style="margin-top: 16px;"></div>
            </div>
        </div>
    `;

    renderContent(content);

    // Set today's date
    document.getElementById('saleDate').valueAsDate = new Date();
}

function renderProductSearch() {
    const content = `
        <div class="data-table-wrapper">
            <div class="table-header">
                <h3 class="table-title">🔍 Product Search</h3>
                <input type="text" id="productSearchInput" placeholder="Search by name, category, supplier..." style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; width: 300px;" onkeyup="searchProducts(this.value)">
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Supplier</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="searchResultsTable">
                    <tr><td colspan="6" style="text-align:center;">Enter search term...</td></tr>
                </tbody>
            </table>
        </div>
    `;

    renderContent(content);
}

// ===== HELPER FUNCTIONS =====

function renderContent(html) {
    document.getElementById('contentWrapper').innerHTML = html;
}

function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.className = `message ${type}`;
        element.style.display = 'block';
        setTimeout(() => {
            element.style.display = 'none';
        }, 3000);
    }
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function handleLogout() {
    currentUser = { token: null, role: null, username: null };
    localStorage.clear();
    showLogin();
}

async function fetchAllData() {
    try {
        const headers = { 'Authorization': `Bearer ${currentUser.token}` };

        const [itemsRes, suppliersRes] = await Promise.all([
            fetch(`${API_URL}/items`, { headers }),
            fetch(`${API_URL}/suppliers`, { headers })
        ]);

        if (itemsRes.ok) items = await itemsRes.json();
        if (suppliersRes.ok) suppliers = await suppliersRes.json();

        updateOverviewStats();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updateOverviewStats() {
    const totalProductsEl = document.getElementById('totalProducts');
    const totalSuppliersEl = document.getElementById('totalSuppliers');
    const lowStockEl = document.getElementById('lowStockCount');

    if (totalProductsEl) totalProductsEl.textContent = items.length;
    if (totalSuppliersEl) totalSuppliersEl.textContent = suppliers.length;
    if (lowStockEl) {
        const lowStockItems = items.filter(item => item.lowStock);
        lowStockEl.textContent = lowStockItems.length;
    }
}

function loadProducts() {
    const tbody = document.getElementById('productsTable');
    if (!tbody) return;

    if (items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No products found</td></tr>';
        return;
    }

    tbody.innerHTML = items.map(item => `
        <tr>
            <td>${item.name || '—'}</td>
            <td>${item.category || '—'}</td>
            <td><span style="font-weight: 600; color: ${item.lowStock ? 'var(--danger)' : 'var(--success)'};">${item.quantity || 0}</span></td>
            <td>${item.reorderLevel || 0}</td>
            <td>$${(item.price || 0).toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-secondary">✏️ Edit</button>
                <button class="btn btn-sm btn-danger">🗑️ Delete</button>
            </td>
        </tr>
    `).join('');
}

function loadSuppliers() {
    const tbody = document.getElementById('suppliersTable');
    if (!tbody) return;

    if (suppliers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No suppliers found</td></tr>';
        return;
    }

    tbody.innerHTML = suppliers.map(supplier => `
        <tr>
            <td>${supplier.name || '—'}</td>
            <td>${supplier.contact || '—'}</td>
            <td>${supplier.email || '—'}</td>
            <td>${(supplier.products || []).join(', ') || '—'}</td>
            <td>—</td>
            <td>
                <button class="btn btn-sm btn-secondary">✏️ Edit</button>
                <button class="btn btn-sm btn-danger">🗑️ Delete</button>
            </td>
        </tr>
    `).join('');
}

function searchProducts(query) {
    const tbody = document.getElementById('searchResultsTable');
    if (!tbody) return;

    if (!query) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Enter search term...</td></tr>';
        return;
    }

    const filtered = items.filter(item =>
        (item.name || '').toLowerCase().includes(query.toLowerCase()) ||
        (item.category || '').toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No results found</td></tr>';
        return;
    }

    tbody.innerHTML = filtered.map(item => `
        <tr>
            <td>${item.name || '—'}</td>
            <td>${item.category || '—'}</td>
            <td>${item.quantity || 0}</td>
            <td>${item.supplierId?.name || '—'}</td>
            <td>$${(item.price || 0).toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-primary">👁️ View Details</button>
            </td>
        </tr>
    `).join('');
}
