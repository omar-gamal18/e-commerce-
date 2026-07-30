# 🛒 E-Commerce RESTful Backend API

A complete, robust, and highly scalable e-commerce backend API built with **Node.js**, **Express.js**, and **MongoDB/Mongoose**. This API serves as the engine for a modern e-commerce platform, providing complete management of user accounts, catalogs (products, categories, subcategories, brands), cart and shopping operations, discount coupon systems, reviews, wishlists, address books, and secure payment processing via **Stripe**.

---

## 📋 Table of Contents
1. [Key Features](#-key-features)
2. [Tech Stack](#-tech-stack)
3. [Architecture & Folder Structure](#-architecture--folder-structure)
4. [API Features (Advanced Querying)](#-api-features-advanced-querying)
5. [Database Models](#-database-models)
6. [API Endpoints Reference](#-api-endpoints-reference)
7. [Installation & Setup](#-installation--setup)
8. [Environment Variables](#-environment-variables)
9. [Security & Optimization Measures](#-security--optimization-measures)
10. [Global Error Handling](#-global-error-handling)
11. [Code Style & Quality](#-code-style--quality)
12. [License](#-license)

---

## ✨ Key Features

*   **🔒 Secure Authentication & Authorization:**
    *   Stateless user authentication using JWT (JSON Web Tokens).
    *   Secure password hashing and verification using `bcryptjs`.
    *   Role-based access control (RBAC) supporting `user` and `admin` roles.
    *   Full password reset flow including automated email sending with a secure 6-digit OTP code.
*   **📦 Catalog Management:**
    *   Complete CRUD operations for **Products**, **Categories**, **Subcategories**, and **Brands**.
    *   Automated slug generation for SEO-friendly URLs.
    *   Nested route hierarchy: categories can have multiple subcategories; products contain reviews.
*   **🖼️ Image Processing Pipeline:**
    *   Multi-part file uploads (profile pictures, product cover images, and galleries) using `multer`.
    *   On-the-fly image resizing, cropping, and compression to JPEG/WebP formats using `sharp` to minimize storage consumption and load times.
*   **🛒 Cart & Ordering System:**
    *   Flexible shopping cart operations (add items, update quantities, delete items, and clear cart).
    *   Dynamic total price calculations with support for discount coupon applications.
    *   Cash-on-Delivery (COD) order placement.
    *   Stripe checkout session integration for secure credit/debit card processing.
    *   Real-time stock adjustment (reducing available quantity and incrementing sold count) upon successful order creation.
*   **❤️ Social & Account Personalization:**
    *   User-specific wishlist management (add/remove products).
    *   User address book supporting multiple shipping/billing addresses.
    *   User reviews and ratings (1 to 5 stars) with safety checks ensuring users can only edit or delete their own reviews.
*   **🛡️ Robust Middleware & Security:**
    *   Data sanitization against NoSQL injection (`express-mongo-sanitize`).
    *   Cross-Site Scripting (XSS) input filtering (`xss-clean`).
    *   HTTP Parameter Pollution (`hpp`) prevention with parameter whitelisting.
    *   API Rate Limiting to prevent brute-force attacks (`express-rate-limit`).
    *   Response compression for faster content delivery (`compression`).
    *   JSON schema validators for request payloads (`express-validator`).

---

## 🛠️ Tech Stack

*   **Backend Runtime:** [Node.js](https://nodejs.org/)
*   **Framework:** [Express.js](https://expressjs.com/) (version 5.2.1)
*   **Database:** [MongoDB](https://www.mongodb.com/) using [Mongoose ODM](https://mongoosejs.com/) (version 9.7.3)
*   **Security & Encryption:** `jsonwebtoken`, `bcryptjs`, `express-mongo-sanitize`, `xss-clean`, `hpp`, `express-rate-limit`
*   **Payment Processor:** [Stripe SDK](https://stripe.com/)
*   **Files & Images:** `multer` (multipart handler), `sharp` (high-performance image processing)
*   **Mail Engine:** `nodemailer` (SMTP transport)
*   **Utility Libraries:** `slugify`, `dotenv`, `morgan` (HTTP logging), `compression`
*   **Code Quality & Linting:** `eslint` (Airbnb Style Guide), `prettier`, `nodemon`

---

## 📁 Architecture & Folder Structure

```filepath
e-commerce/
├── server.js                   # Application server entry point (DB connection & Port listener)
├── app.js                      # Express application setup, security middlewares, and route mounting
├── package.json                # Dependencies, project metadata, and npm scripts
├── .env.example                # Blank template for environment variables configuration
├── .eslintrc.json              # ESLint formatting configuration rules
├── .gitignore                  # Excluded folders and secrets for Git version control
│
├── controllers/                # Request handlers & controllers containing core business logic
│   ├── authContoller.js        # Registration, login, JWT validation, and password recovery
│   ├── userController.js       # Admin operations and current user profile management
│   ├── productController.js    # Product operations and image uploads/resizing logic
│   ├── categoryController.js   # Category management
│   ├── subCategoryController.js# Subcategory management
│   ├── brandController.js      # Brand management
│   ├── cartController.js       # Shopping cart updates, coupon application, and pricing
│   ├── orderController.js      # Cash & card orders, Stripe checkout sessions, and webhook processing
│   ├── reviewController.js     # Ratings and review administration
│   ├── wishlistController.js   # Add/remove items to/from wishlist
│   ├── addressesControllers.js  # User shipping/billing address book controller
│   ├── couponsController.js    # Create/update discount coupons (Admin)
│   └── handlersFactory.js      # Generic factory containing reusable CRUD handler templates
│
├── routes/                     # Router layers mounting controllers to specific paths
│   ├── index.js                # Aggregator to mount all resource routes to `/api/v1`
│   ├── authRotes.js            # Auth endpoints
│   ├── userRoutes.js           # User/Admin endpoints
│   ├── productRoutes.js        # Product endpoints
│   ├── categoryRoutes.js       # Category endpoints
│   ├── subCategoryRoutes.js    # Subcategory endpoints
│   ├── brandRoutes.js          # Brand endpoints
│   ├── cartRoutes.js           # Shopping cart endpoints
│   ├── orderRoutes.js          # Order and payment endpoints
│   ├── reviewRoutes.js         # Reviews endpoints
│   ├── wishlistRoutes.js       # Wishlist endpoints
│   ├── addressRoutes.js        # User address book endpoints
│   └── couponRoutes.js         # Coupon management endpoints
│
├── models/                     # Mongoose schemas outlining database collections
│   ├── userModel.js            # User roles, profiles, passwords, and password reset variables
│   ├── productModel.js         # Products schema containing tags, categories, images, and prices
│   ├── categoryModel.js        # Category schema
│   ├── subCategoryModel.js     # Subcategory schema containing parent category reference
│   ├── brandModel.js           # Brand schema
│   ├── cartModel.js            # User shopping cart schema containing items, quantity, and applied coupon
│   ├── orderModel.js           # Order payment status, shipping details, and cart items snapshot
│   ├── reviewModel.js          # Review ratings (1-5) and user/product pointers
│   └── couponModel.js          # Discount codes, expiration dates, and discount percentages
│
├── middlewares/                # Custom Express Middlewares
│   ├── errorMiddleware.js      # Global error processing and JSON exception response handler
│   ├── uploadImageMiddleware.js# Multi-part upload handler utility using multer
│   └── validatorMiddleware.js  # Intercepts express-validator errors and returns validation messages
│
├── utils/                      # Helper libraries and external adapters
│   ├── apiError.js             # Customized operational API error builder class
│   ├── apiFeatures.js          # Mongoose query builder (pagination, sorting, search, filtering)
│   ├── email.js                # SMTP client utility module for emailing reset codes
│   ├── dummyData/              # Seed scripts and mock data for initial catalog loading
│   └── validators/             # Express-validator arrays matching request body structures
└── uploads/                    # Local storage folder where uploads/resized images are stored
```

---

## 🔍 API Features (Advanced Querying)

The application utilizes a shared `ApiFeatures` helper class to enable powerful filtering, sorting, selecting fields, keyword searching, and pagination on all major GET requests.

### 1. Pagination (`page`, `limit`)
Applies paging parameters. If unspecified, defaults to **50 items per page** on page **1**.
*   `GET /api/v1/products?page=2&limit=10`
*   Returns pagination metadata: `currentPage`, `limit`, `numberOfPages`, `next`, and `prev`.

### 2. Sorting (`sort`)
Sorts the database documents based on fields. Multiple sorting parameters are comma-separated. Prefix a field with `-` for descending order. Default sorting is by `-createAt`.
*   `GET /api/v1/products?sort=-sold,price` (sorts by popularity descending, then by price ascending)

### 3. Fields Limiting (`fields`)
Retrieves only requested fields, optimizing payload sizes (Data Projection). If not defined, system fields like `__v` are excluded.
*   `GET /api/v1/products?fields=title,price,ratingsAverage`

### 4. Advanced Filtering (`[gte]`, `[gt]`, `[lte]`, `[lt]`)
Runs range filters against database properties dynamically.
*   `GET /api/v1/products?price[gte]=100&price[lte]=500&quantity[lt]=10`

### 5. Keyword Search (`keyword`)
Performs a case-insensitive regular expression search across specific fields.
*   *Products:* Searches `title` and `description`.
*   *Other models:* Searches the `name` field.
*   `GET /api/v1/products?keyword=smartphone`

---

## 🗄️ Database Models

### Entity Relationships Outline
erDiagram
    USER ||--o{ ORDER : places
    USER ||--o{ REVIEW : writes
    USER ||--o[ CART : owns
    USER ||--o{ ADDRESS : has
    USER ||--o{ WISHLIST-ITEM : saves

    CATEGORY ||--o{ SUBCATEGORY : contains
    CATEGORY ||--o{ PRODUCT : categorizes
    SUBCATEGORY ||--o{ PRODUCT : categorizes
    BRAND ||--o{ PRODUCT : manufactures
    PRODUCT ||--o{ REVIEW : receives

    CART ||--o{ CART-ITEM : contains
    ORDER ||--o{ ORDER-ITEM : snapshot
```

---

## 🔌 API Endpoints Reference

### 🔐 Authentication Endpoints (`/api/v1/auth`)

| Method | Path | Description | Access / Roles | Request Payload Examples |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/signup` | Create a new user account | Public | `{ name, email, password, passwordConfirm }` |
| **POST** | `/login` | Authenticate user & return token | Public | `{ email, password }` |
| **POST** | `/forgotPassword` | Request password reset code via email | Public | `{ email }` |
| **POST** | `/verifyPassResetPassword` | Verify OTP code sent to email | Public | `{ resetCode }` |
| **PATCH** | `/resetPassword` | Change password using OTP verification | Public | `{ email, newPassword }` |

### 👤 User Profile Endpoints (`/api/v1/users`)

| Method | Path | Description | Access / Roles | Request Payload Examples |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/getMe` | Get logged-in user profile details | Authenticated | *None* |
| **PATCH** | `/updateMyPassword` | Update password for current user | Authenticated | `{ currentPassword, newPassword, passwordConfirm }` |
| **PATCH** | `/updateMe` | Update basic info (name, email, phone) | Authenticated | `{ name, email, phone }` |
| **DELETE** | `/deleteMe` | Deactivate/Soft-delete current account | Authenticated | *None* |
| **GET** | `/` | List all users with pagination | Admin | Query parameters |
| **POST** | `/` | Register new user manually | Admin | `{ name, email, password, role, image }` |
| **GET** | `/:id` | Get details of user by ID | Admin | *None* |
| **PATCH** | `/:id` | Update user roles/properties | Admin | `{ role, name, email }` |
| **DELETE** | `/:id` | Hard delete user from database | Admin | *None* |
| **PATCH** | `/changePassword/:id` | Set a new password for user | Admin | `{ password }` |

### 🏷️ Category Endpoints (`/api/v1/categories`)

| Method | Path | Description | Access / Roles | Query / Parameters |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Retrieve all product categories | Public | Supports filters/paging |
| **POST** | `/` | Create a new category | Admin | `{ name, image }` (FormData) |
| **GET** | `/:id` | Get category details by ID | Public | *None* |
| **PUT** | `/:id` | Update category details/image | Admin | `{ name, image }` |
| **DELETE** | `/:id` | Delete category | Admin | *None* |

### 📂 Subcategory Endpoints (`/api/v1/subcategories`)

| Method | Path | Description | Access / Roles | Request Payload Examples |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Get subcategories list | Public | Supports filters/paging |
| **POST** | `/` | Create subcategory | Admin | `{ name, category }` (Parent ID) |
| **GET** | `/:id` | Get subcategory by ID | Public | *None* |
| **PUT** | `/:id` | Update subcategory name or category | Admin | `{ name, category }` |
| **DELETE** | `/:id` | Delete subcategory | Admin | *None* |

### 👟 Brand Endpoints (`/api/v1/brands`)

| Method | Path | Description | Access / Roles | Request Payload / Files |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Get list of all brands | Public | Supports filters/paging |
| **POST** | `/` | Create brand | Admin | `{ name, image }` (FormData) |
| **GET** | `/:id` | Get brand by ID | Public | *None* |
| **PUT** | `/:id` | Update brand details | Admin | `{ name, image }` |
| **DELETE** | `/:id` | Remove brand | Admin | *None* |

### 🛍️ Product Endpoints (`/api/v1/products`)

| Method | Path | Description | Access / Roles | Request Payload / Files |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Search/Filter and list all products | Public | Supports query API |
| **POST** | `/` | Create product (supports image upload) | Admin | `{ title, description, price, category, subcategories, brand, imageCover, images }` |
| **GET** | `/:id` | Get individual product details | Public | *None* |
| **PUT** | `/:id` | Update product values | Admin | Partial edits allowed |
| **DELETE** | `/:id` | Remove product | Admin | *None* |

### ⭐ Review Endpoints (`/api/v1/reviews`)

| Method | Path | Description | Access / Roles | Request Payload / Rules |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Get all reviews | Public | Supports nested product queries |
| **POST** | `/` | Write a review for a product | User | `{ title, ratings, product }` |
| **GET** | `/:id` | Get review details by ID | Public | *None* |
| **PATCH** | `/:id` | Update ratings and text of a review | User (Owner) | `{ title, ratings }` |
| **DELETE** | `/:id` | Delete a product review | User (Owner) / Admin | *None* |

### ❤️ Wishlist Endpoints (`/api/v1/wishlists`)

| Method | Path | Description | Access / Roles | Request Payload / Parameters |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Fetch user's bookmarked products | User | *None* |
| **POST** | `/` | Save product to wishlist | User | `{ productId }` |
| **DELETE** | `/:id` | Remove product from wishlist | User | `:id` of target product |

### 📍 Address Endpoints (`/api/v1/address`)

| Method | Path | Description | Access / Roles | Request Payload Examples |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Retrieve user's shipping addresses | User | *None* |
| **POST** | `/` | Save an address to profile address book | User | `{ alias, details, phone, city, postalCode }` |
| **DELETE** | `/:addressId` | Remove address from list | User | `:addressId` of target address |

### 🎟️ Coupon Endpoints (`/api/v1/coupons`)

| Method | Path | Description | Access / Roles | Request Payload / Rules |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Retrieve active coupons list | Admin | *None* |
| **POST** | `/` | Generate a new discount coupon | Admin | `{ name, expire, discount }` (Discount %) |
| **GET** | `/:id` | Fetch specific coupon details | Admin | *None* |
| **PATCH** | `/:id` | Update coupon values | Admin | `{ name, expire, discount }` |
| **DELETE** | `/:id` | Delete coupon from usage | Admin | *None* |

### 🛒 Shopping Cart Endpoints (`/api/v1/cart`)

| Method | Path | Description | Access / Roles | Request Payload Examples |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Load user's shopping cart | User | *None* |
| **POST** | `/` | Append item/product to cart | User | `{ productId, color }` |
| **DELETE** | `/` | Remove all items (Clear cart) | User | *None* |
| **PATCH** | `/applyCoupon` | Apply discount coupon code | User | `{ coupon }` |
| **PATCH** | `/:itemId` | Adjust item quantity in cart | User | `{ quantity }` |
| **DELETE** | `/:itemId` | Remove specific item | User | `:itemId` of cart item |

### 💳 Order & Checkout Endpoints (`/api/v1/orders`)

| Method | Path | Description | Access / Roles | Request Payload / Parameter |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/:cartId` | Create cash order from cart | User | `{ shippingAddress: { details, phone, city, postalCode } }` |
| **POST** | `/checkout-session/:cartId` | Create Stripe session for card payment | User | `{ shippingAddress }` |
| **GET** | `/` | Fetch all orders | User / Admin | User receives self orders; Admin retrieves all |
| **GET** | `/:id` | Retrieve detailed order status | User / Admin | *None* |
| **PATCH** | `/:id/pay` | Mark order as paid | Admin | *None* |
| **PATCH** | `/:id/deliver` | Mark order as delivered | Admin | *None* |

### 📡 Stripe Webhooks

*   **URL:** `/webhook-checkout`
*   **Method:** `POST`
*   **Access:** Public (Strict validation occurs via Stripe signature verification payload)
*   **Description:** Stripe event webhook to intercept `checkout.session.completed` events. Reads client reference indices, initializes credit card orders securely, reduces catalog stock levels, and clears the user's shopping cart synchronously.

---

## 🚀 Installation & Setup

### Prerequisites
*   [Node.js](https://nodejs.org/en) (v16.0.0 or higher recommended)
*   [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or a MongoDB Atlas cloud service URI)
*   [Stripe Account](https://stripe.com) (for test API tokens and webhook setups)
*   An SMTP Mail Server credentials (e.g., Gmail App Password) for password reset emails

### Setup Steps

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/e-commerce.git
    cd e-commerce
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Duplicate the env example template and edit with your values:
    ```bash
    cp .env.example .env
    ```
    *(For variable details, see the [Environment Variables](#-environment-variables) section below).*

4.  **Run Development Server:**
    Runs local database connections and launches the app using `nodemon` for auto-restarting on changes.
    ```bash
    npm run dev
    ```
    The server will startup on port `8000` (or your defined `PORT`).

5.  **Run Production Server:**
    Configure `NODE_ENV=production` inside your `.env` and start:
    ```bash
    npm start
    ```

---

## 🔧 Environment Variables

Configure the following parameters in your `.env` file:

```ini
# Database Connection URL (Local or Atlas MongoDB)
DB=mongodb://localhost:27017/e-commerce

# Server configuration
PORT=8000
NODE_ENV=development
BASE_URL=http://localhost:8000

# JSON Web Tokens Settings
JWT_SECRET_KEY=your_highly_secured_random_jwt_hash
JWT_EXPIRESIN=7D

# Email configuration (Used for Reset Codes)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_specific_password

# Payment Gateways (Stripe Setup)
STRIPE_SECRET_KEY=sk_test_your_secret_stripe_api_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_signing_hash
```

---

## 🛡️ Security & Optimization Measures

To ensure enterprise-grade safety and efficiency, the backend implements the following security modules:

*   **API Rate Limiting:** Restricts users to a maximum of `100` API requests every `15 minutes` to mitigate DDoS and login brute-force attacks.
*   **NoSQL Query Injection Prevention:** Utilizes `express-mongo-sanitize` to recursively scrub incoming keys starting with `$` or `.` from req bodies/queries/params.
*   **XSS Sanitization:** Employs `xss-clean` middleware to sanitize user inputs from malicious script injections.
*   **Parameter Pollution Protection:** Uses `hpp` (HTTP Parameter Pollution) to prevent double query fields from breaking the database query. Whitelists parameters like `price`, `sold`, `quantity`, `ratingsAverage`, and `ratingsQuantity`.
*   **Payload Compression:** Incorporates Gzip `compression` to compress HTTP response payloads returned to clients, improving loading times.
*   **Stripe Raw Body Webhook Validation:** Restricts webhook execution to events bearing valid cryptographic validation signatures (`stripe-signature`) signed with the project webhook secret.

---

## 🐛 Global Error Handling

The application contains a global express error catching middleware (`errorMiddleware.js`) which formats all execution exceptions into a unified, predictable structure.

> [!NOTE]
> Response payloads adjust dynamically based on the active `NODE_ENV` environment settings.

*   **Development Mode Response (`NODE_ENV=development`):**
    ```json
    {
      "status": "error",
      "error": { "statusCode": 404, "status": "fail" },
      "message": "can't find this route",
      "stack": "Error: can't find this route\n    at app.all (C:\\Users\\...\\app.js:61:8)..."
    }
    ```
*   **Production Mode Response (`NODE_ENV=production`):**
    ```json
    {
      "status": "fail",
      "message": "can't find this route"
    }
    ```

---

## 📝 Code Style & Quality

The repository adopts Airbnb's JS formatting standards enforced via ESLint.

*   **Run Linter Check:**
    ```bash
    npx eslint .
    ```
*   **Format files automatically using Prettier:**
    ```bash
    npx prettier --write .
    ```

---

## 📄 License

This project is licensed under the **ISC License**. For more details, see the [package.json](file:///c:/Users/DELL/OneDrive/Desktop/Back-End/E-Commerce/package.json) file.

---

Built by Omar Gamal.
