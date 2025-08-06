
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

connectDB();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.'
    }
});

app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Ayoub API v2 - Documentation</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
                h1 { color: #333; }
                h2 { color: #666; border-bottom: 2px solid #eee; padding-bottom: 10px; }
                .endpoint { background: #f4f4f4; padding: 10px; margin: 10px 0; border-radius: 5px; }
                .method { font-weight: bold; color: #fff; padding: 4px 8px; border-radius: 3px; }
                .get { background: #61affe; }
                .post { background: #49cc90; }
                .put { background: #fca130; }
                .delete { background: #f93e3e; }
                code { background: #f1f1f1; padding: 2px 4px; border-radius: 3px; }
            </style>
        </head>
        <body>
            <h1>🚀 Ayoub API v2 - Complete Documentation</h1>
            <p>Advanced Node.js API with Users and Products management, featuring CRUD operations, authentication, and advanced search capabilities.</p>

            <h2>👥 User Endpoints</h2>

            <div class="endpoint">
                <span class="method get">GET</span> <code>/api/v1/users</code>
                <p><strong>Description:</strong> Get all users with pagination</p>
                <p><strong>Query Parameters:</strong> limit, offset, sortBy, order</p>
            </div>

            <div class="endpoint">
                <span class="method get">GET</span> <code>/api/v1/users/search</code>
                <p><strong>Description:</strong> Search users by multiple fields</p>
                <p><strong>Query Parameters:</strong> q, firstName, lastName, email, limit, offset, sortBy, order</p>
            </div>

            <div class="endpoint">
                <span class="method get">GET</span> <code>/api/v1/users/:id</code>
                <p><strong>Description:</strong> Get user by ID</p>
            </div>

            <div class="endpoint">
                <span class="method post">POST</span> <code>/api/v1/users</code>
                <p><strong>Description:</strong> Create new user</p>
                <p><strong>Required Fields:</strong> firstName, lastName, email, password, phone, dateOfBirth</p>
            </div>

            <div class="endpoint">
                <span class="method put">PUT</span> <code>/api/v1/users/:id</code>
                <p><strong>Description:</strong> Update user by ID</p>
            </div>

            <div class="endpoint">
                <span class="method delete">DELETE</span> <code>/api/v1/users/:id</code>
                <p><strong>Description:</strong> Delete user by ID</p>
            </div>

            <h2>📦 Product Endpoints</h2>

            <div class="endpoint">
                <span class="method get">GET</span> <code>/api/v1/products</code>
                <p><strong>Description:</strong> Get all products with pagination</p>
                <p><strong>Query Parameters:</strong> limit, offset, sortBy, order</p>
            </div>

            <div class="endpoint">
                <span class="method get">GET</span> <code>/api/v1/products/search</code>
                <p><strong>Description:</strong> Search products by multiple fields</p>
                <p><strong>Query Parameters:</strong> q, name, category, brand, minPrice, maxPrice, limit, offset, sortBy, order</p>
            </div>

            <div class="endpoint">
                <span class="method get">GET</span> <code>/api/v1/products/category/:category</code>
                <p><strong>Description:</strong> Get products by category</p>
            </div>

            <div class="endpoint">
                <span class="method get">GET</span> <code>/api/v1/products/:id</code>
                <p><strong>Description:</strong> Get product by ID</p>
            </div>

            <div class="endpoint">
                <span class="method post">POST</span> <code>/api/v1/products</code>
                <p><strong>Description:</strong> Create new product</p>
                <p><strong>Required Fields:</strong> name, description, price, category, brand, stock, sku, weight, dimensions, releaseDate, createdBy</p>
            </div>

            <div class="endpoint">
                <span class="method put">PUT</span> <code>/api/v1/products/:id</code>
                <p><strong>Description:</strong> Update product by ID</p>
            </div>

            <div class="endpoint">
                <span class="method delete">DELETE</span> <code>/api/v1/products/:id</code>
                <p><strong>Description:</strong> Delete product by ID</p>
            </div>

            <h2>📋 Validation Rules</h2>
            <h3>User Validation:</h3>
            <ul>
                <li>First/Last name: Only letters and spaces, 2-50 characters</li>
                <li>Email: Valid email format</li>
                <li>Password: Min 8 chars, must contain uppercase, lowercase, and number</li>
                <li>Phone: Belgian format (+32 XXX XX XX XX)</li>
                <li>Age: Must be at least 13 years old</li>
            </ul>

            <h3>Product Validation:</h3>
            <ul>
                <li>Name: 2-100 characters</li>
                <li>Description: 10-1000 characters</li>
                <li>Price: Positive number with max 2 decimal places</li>
                <li>SKU: Format ABC1234 (3 letters + 4 numbers)</li>
                <li>Stock: Non-negative integer</li>
                <li>Weight: 0.01-1000 kg</li>
                <li>Categories: Electronics, Clothing, Books, Home & Garden, Sports, Toys, Food, Other</li>
            </ul>

            <h2>🔍 Search Features</h2>
            <ul>
                <li>Multi-field search with 'q' parameter</li>
                <li>Individual field filtering</li>
                <li>Price range filtering for products</li>
                <li>Sorting by any field (asc/desc)</li>
                <li>Pagination with limit/offset</li>
            </ul>

            <h2>📊 Response Format</h2>
            <p>All responses follow this structure:</p>
            <pre>{
  "success": true/false,
  "message": "Description",
  "data": {...},
  "pagination": {
    "total": 100,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}</pre>

            <p><strong>Base URL:</strong> http://localhost:3000</p>
            <p><strong>Version:</strong> 2.0.0</p>
            <p><strong>Author:</strong> Ayoub El Gazal</p>
        </body>
        </html>
    `);
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);

app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📖 Documentation available at http://localhost:${PORT}`);
});
