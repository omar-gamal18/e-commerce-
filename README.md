E-Commerce Backend API
A robust and scalable e-commerce backend API built with Node.js, Express, and MongoDB. This project provides comprehensive APIs for managing products, categories, brands, users, and authentication.

📋 Table of Contents
Features
Tech Stack
Project Structure
Installation
Environment Variables
Usage
API Endpoints
Project Structure Details
License
✨ Features
User Authentication: JWT-based authentication with secure password hashing using bcryptjs
Product Management: Full CRUD operations for products with image handling and compression
Category Management: Organize products into categories and subcategories
Brand Management: Manage product brands
User Management: User profile and account management
Image Processing: Automatic image optimization using Sharp
Input Validation: Express-validator for robust request validation
Error Handling: Global error handling middleware
Development Tools: ESLint and Prettier for code quality
Request Logging: Morgan for HTTP request logging
File Upload: Multer for handling file uploads
🛠 Tech Stack
Backend Framework:

Node.js
Express.js 5.2.1
Database:

MongoDB with Mongoose 9.7.3
Authentication & Security:

JWT (jsonwebtoken 9.0.3)
bcryptjs 3.0.3
File & Image Handling:

Multer 2.2.0
Sharp 0.35.3 (Image optimization)
Utilities:

dotenv 17.4.2 (Environment variables)
morgan 1.11.0 (HTTP logging)
slugify 1.6.9 (URL-friendly strings)
express-validator 7.3.2 (Input validation)
Development Tools:

ESLint
Prettier
Nodemon
📁 Project Structure
e-commerce/
├── app.js                 # Express app configuration
├── server.js              # Server entry point
├── package.json           # Dependencies and scripts
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore rules
│
├── routes/                # API route definitions
│   ├── authRotes.js
│   ├── categoryRoutes.js
│   ├── subCategoryRoutes.js
│   ├── brandRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
│
├── controllers/           # Request handlers and business logic
│   ├── authContoller.js
│   ├── categoryController.js
│   ├── subCategoryController.js
│   ├── brandController.js
│   ├── productController.js
│   ├── userController.js
│   └── handlersFactory.js
│
├── models/                # MongoDB schemas
│   ├── userModel.js
│   ├── productModel.js
│   ├── categoryModel.js
│   ├── subCategoryModel.js
│   └── brandModel.js
│
├── middlewares/           # Custom middleware
│   └── errorMiddleware.js
│
├── utils/                 # Utility functions
│   ├── apiError.js
│   └── dummyData/
│       └── products.json
│
└── uploads/               # Uploaded files directory
🚀 Installation
Prerequisites
Node.js (v14 or higher)
npm or yarn
MongoDB (local or cloud instance like MongoDB Atlas)
Setup Steps
Clone the repository

git clone <repository-url>
cd e-commerce
Install dependencies

npm install
Create environment variables file

cp .env.example .env
Configure environment variables (see Environment Variables)

Start the server

npm test
The server will start on the configured PORT (default: 5000)

🔧 Environment Variables
Create a .env file in the root directory with the following variables:

# Server
PORT=5000
NODE_ENV=development

# Database
DB=mongodb://localhost:27017/ecommerce
# Or use MongoDB Atlas
# DB=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Other configurations as needed
Environment Variables Explanation
Variable	Description	Example
PORT	Server port number	5000
NODE_ENV	Environment mode	development or production
DB	MongoDB connection string	mongodb://localhost:27017/ecommerce
JWT_SECRET	Secret key for JWT signing	Your secure secret key
📚 Usage
Development Mode
npm test
This runs the server with nodemon, which automatically restarts on file changes.

Production Mode
Set NODE_ENV=production in your .env file, then:

npm start
(Note: Ensure you have a npm start script configured in package.json)

🔌 API Endpoints
Authentication Routes (/api/v1/auth)
POST /api/v1/auth/login - User login
POST /api/v1/auth/register - User registration
POST /api/v1/auth/logout - User logout
Categories (/api/v1/categories)
GET /api/v1/categories - Get all categories
POST /api/v1/categories - Create category
GET /api/v1/categories/:id - Get category by ID
PUT /api/v1/categories/:id - Update category
DELETE /api/v1/categories/:id - Delete category
Subcategories (/api/v1/subcategories)
GET /api/v1/subcategories - Get all subcategories
POST /api/v1/subcategories - Create subcategory
GET /api/v1/subcategories/:id - Get subcategory by ID
PUT /api/v1/subcategories/:id - Update subcategory
DELETE /api/v1/subcategories/:id - Delete subcategory
Brands (/api/v1/brands)
GET /api/v1/brands - Get all brands
POST /api/v1/brands - Create brand
GET /api/v1/brands/:id - Get brand by ID
PUT /api/v1/brands/:id - Update brand
DELETE /api/v1/brands/:id - Delete brand
Products (/api/v1/products)
GET /api/v1/products - Get all products
POST /api/v1/products - Create product
GET /api/v1/products/:id - Get product by ID
PUT /api/v1/products/:id - Update product
DELETE /api/v1/products/:id - Delete product
Users (/api/v1/users)
GET /api/v1/users - Get all users
GET /api/v1/users/:id - Get user by ID
PUT /api/v1/users/:id - Update user profile
DELETE /api/v1/users/:id - Delete user
📦 Project Structure Details
Controllers
authContoller.js - Handles authentication logic (login, registration, password reset)
categoryController.js - Handles category operations
subCategoryController.js - Handles subcategory operations
brandController.js - Handles brand operations
productController.js - Handles product operations with image processing
userController.js - Handles user profile and account management
handlersFactory.js - Reusable CRUD operation handlers
Models
userModel.js - User schema and validation
productModel.js - Product schema with references to categories and brands
categoryModel.js - Category schema
subCategoryModel.js - Subcategory schema
brandModel.js - Brand schema
Middleware
errorMiddleware.js - Global error handling for all routes
🔒 Security Features
Password hashing with bcryptjs
JWT-based authentication
Input validation with express-validator
Global error handling
Environment variable protection
🐛 Error Handling
The application includes a global error handling middleware that catches and formats all errors into a consistent JSON response format.

📝 Code Style
ESLint with Airbnb configuration for code quality
Prettier for code formatting
Run linting: npm run lint (if configured)
Run formatting: npm run format (if configured)
🤝 Contributing
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
📄 License
This project is licensed under the ISC License - see the package.json file for details.

📧 Support
For support, please open an issue in the repository or contact the development team.

Built with ❤️ by the E-Commerce Development Team
