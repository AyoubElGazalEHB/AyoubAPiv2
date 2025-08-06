# Ayoub API v2 - Advanced Node.js API

A comprehensive Node.js API featuring complete CRUD operations for Users and Products, JWT authentication, advanced validation, search functionality, and professional documentation. Built with Express.js and MongoDB.

## Features

- **Complete CRUD Operations** for Users and Products
- **JWT Authentication** with login/register/profile management
- **Advanced Validation** with custom business rules
- **Multi-field Search** with pagination and sorting
- **Professional HTML Documentation** at root URL
- **Security Features** (Rate limiting, CORS, Helmet)
- **Database Relationships** (Users can create Products)
- **Error Handling** with detailed error messages

## Technologies Used

- **Node.js** (v20+) - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Validator.js** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - Rate limiting middleware

## Getting Started

### Prerequisites

- Node.js (version 20 or later)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AyoubElGazalEHB/AyoubAPiv2.git
   cd AyoubAPiv2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration:
   ```
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/ayoub_api_v2
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   ```

4. **Start MongoDB:**
   - For local MongoDB: `mongod`
   - Or use MongoDB Atlas cloud database

5. **Run the application:**
   ```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
   ```

6. **Access the API:**
   - API Base URL: `http://localhost:3000`
   - Documentation: `http://localhost:3000` (HTML documentation)

## 📚 API Documentation

Complete API documentation is available at the root URL when the server is running: `http://localhost:3000`

### Quick API Overview

#### Authentication Endpoints
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/profile` - Get user profile (protected)
- `PUT /api/v1/auth/profile` - Update profile (protected)
- `PUT /api/v1/auth/change-password` - Change password (protected)

#### User Endpoints
- `GET /api/v1/users` - Get all users (with pagination)
- `GET /api/v1/users/search` - Search users
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

#### Product Endpoints
- `GET /api/v1/products` - Get all products (with pagination)
- `GET /api/v1/products/search` - Search products
- `GET /api/v1/products/category/:category` - Get products by category
- `GET /api/v1/products/:id` - Get product by ID
- `POST /api/v1/products` - Create product (protected)
- `PUT /api/v1/products/:id` - Update product (protected)
- `DELETE /api/v1/products/:id` - Delete product (protected)

## Sources and References

- **Express.js Documentation:** https://expressjs.com/
- **MongoDB Documentation:** https://docs.mongodb.com/
- **Mongoose Documentation:** https://mongoosejs.com/
- **JWT Documentation:** https://jwt.io/
- **bcryptjs Documentation:** https://www.npmjs.com/package/bcryptjs
- **Validator.js Documentation:** https://github.com/validatorjs/validator.js
- **Node.js Best Practices:** https://github.com/goldbergyoni/nodebestpractices
- **ChatGPT:** Used for code structure guidance, and implementation assistance

## Acknowledgments
**Instructor’s Approval:** This project builds upon my previous year’s work, with explicit permission from my instructor to improve and submit it again for this academic year.



## GitHub Repository

Find the project on GitHub: [AyoubAPI Repository](https://github.com/AyoubElGazalEHB/AyoubAPiv2.git)

---

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header.

## Key Features Implemented

### Minimum Requirements 
-  Two CRUD interfaces (Users & Products)
-  Complete CRUD operations for both entities
-  Basic validation (empty fields, data types, format validation)
-  Pagination with limit and offset
-  Search functionality on multiple fields
-  HTML documentation page at root URL

### Extra Features 
-  Advanced validation (password strength, phone format, business rules)
-  Multi-field search capabilities
-  Result sorting (ascending/descending)
-  JWT Authentication for protected routes
-  Password hashing with bcrypt
-  Security middleware (Helmet, CORS, Rate limiting)
-  Database relationships (Users can create Products)
-  Professional error handling

**Note:** This comprehensive implementation goes well beyond the minimum requirements and includes all suggested extra features for maximum points.
