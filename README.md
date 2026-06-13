# 🛒 Spring Boot E-Commerce Platform

A full-stack e-commerce application built with **Spring Boot 3.5.9** backend and **React 18** frontend, featuring user authentication, product management, shopping cart, and order processing.

---

## 📋 Table of Contents
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Endpoints](#-api-endpoints)
- [Frontend Components](#-frontend-components)
- [Security Implementation](#-security-implementation)
- [How to Run](#-how-to-run)
- [Database Schema](#-database-schema)

---

## ✨ Features

### 🔐 Authentication & Authorization
- **User Registration** - New user account creation with validation
- **User Login** - Secure login with JWT token generation
- **Protected Routes** - Role-based access control on frontend
- **Token-Based Security** - JWT (JSON Web Token) implementation for stateless authentication

### 📦 Product Management
- **View Products** - Browse all products with details and images
- **Product Details** - View detailed information including price, description, brand, and stock
- **Add Products** - Admin functionality to add new products with images
- **Product Images** - Binary image storage and retrieval in database
- **Product Search** - Display and filter products by category and availability

### 🛍️ Shopping Cart
- **Add to Cart** - Add products with quantity selection
- **View Cart** - Display all cart items with calculations
- **Update Quantities** - Modify product quantities in cart
- **Remove Items** - Delete products from shopping cart
- **Calculate Totals** - Automatic price and tax calculations

### 📝 Order Management
- **Place Orders** - Create orders from cart items
- **Order Confirmation** - Receive order confirmation with details
- **Order History** - View all previous orders and their status
- **Order Details** - View individual order items and amounts

---

## 🛠️ Technology Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 21 | Programming Language |
| **Spring Boot** | 3.5.9 | Backend Framework |
| **Spring Security** | Latest | Authentication & Authorization |
| **Spring Data JPA** | Latest | Database ORM |
| **JWT (jjwt)** | Latest | Token Generation & Validation |
| **MySQL** | 8.0+ | Relational Database |
| **Lombok** | Latest | Code Generation & Boilerplate Reduction |
| **Maven** | 3.6+ | Dependency Management |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI Library |
| **React Router DOM** | 6.20.0 | Client-Side Routing |
| **Axios** | 1.6.2 | HTTP Client |
| **CSS3** | Latest | Styling |
| **HTTP Proxy Middleware** | 2.0.6 | API Proxy Setup |

### Tools & Infrastructure
- **IDE**: IntelliJ IDEA / VS Code
- **Database Tool**: MySQL Workbench / DBeaver
- **API Testing**: Postman / Thunder Client
- **Version Control**: Git

---

## 🏗️ Project Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                       React Frontend (Port 3000)                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Header | ProductList | ProductDetail | Cart | Orders      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                    │
│                    Axios HTTP Requests/Responses                  │
│                              │                                    │
└──────────────────────────────┼────────────────────────────────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
       ┌──────▼───────┐              ┌─────────▼────────┐
       │   API Layer  │              │  JWT Validation  │
       │  (REST APIs) │              │   (JwtFilter)    │
       └──────┬───────┘              └─────────┬────────┘
              │                               │
┌─────────────▼──────────────────────────────┼──────────────────────┐
│           Spring Boot Backend (Port 8080)  │                      │
│  ┌────────────────────────────────────────▼───────────────────┐  │
│  │ Controllers                                                 │  │
│  │ ├─ ProductController   (Product CRUD Operations)           │  │
│  │ ├─ OrderController     (Order Management)                  │  │
│  │ └─ UserController      (Auth: Register, Login)             │  │
│  └────────────────────────────────────────────────────────────┘  │
│                              │                                    │
│  ┌────────────────────────────▼────────────────────────────────┐ │
│  │ Services (Business Logic)                                   │ │
│  │ ├─ ProductService   (Product Operations)                    │ │
│  │ ├─ OrderService     (Order Processing)                      │ │
│  │ ├─ UserService      (User Management)                       │ │
│  │ └─ CustomUserDetailsService (Spring Security Integration)  │ │
│  └────────────────────────────────────────────────────────────┘  │
│                              │                                    │
│  ┌────────────────────────────▼────────────────────────────────┐ │
│  │ Repositories (Data Access)                                  │ │
│  │ ├─ ProductRepository                                        │ │
│  │ ├─ OrderRepository                                          │ │
│  │ └─ UserRepository                                           │ │
│  └────────────────────────────────────────────────────────────┘  │
│                              │                                    │
│  ┌────────────────────────────▼────────────────────────────────┐ │
│  │ Security Configuration                                      │ │
│  │ ├─ SecurityConfig      (Spring Security Setup)              │ │
│  │ ├─ JwtUtil             (Token Generation & Validation)      │ │
│  │ └─ JwtFilter           (Request Interceptor)                │ │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────┬────────────────────────────────────┘
                               │
                    JDBC Connection with JPA
                               │
              ┌────────────────┴────────────────┐
              │                                 │
         ┌────▼────────────────────────────────▼─────┐
         │   MySQL Database (Port 3306)              │
         │  ┌──────────────────────────────────────┐ │
         │  │ Tables:                              │ │
         │  │ ├─ users                             │ │
         │  │ ├─ product                           │ │
         │  │ ├─ orders                            │ │
         │  │ └─ order_items                       │ │
         │  └──────────────────────────────────────┘ │
         └─────────────────────────────────────────────┘
```

### Data Flow

**User Registration/Login:**
```
React Form → API Request → UserController → UserService → UserRepository → MySQL → JWT Token → React State
```

**Product Browsing:**
```
React Component → API Request → ProductController → ProductService → ProductRepository → MySQL → React UI
```

**Order Placement:**
```
React Cart → API Request → OrderController → OrderService → OrderRepository → MySQL → Order Confirmation
```

---

## 📁 Project Structure

```
Ecommence_Spring/
│
├── frontend/                          # React Frontend Application
│   ├── public/
│   │   └── index.html                # HTML Entry Point
│   │
│   ├── src/
│   │   ├── components/               # React Components
│   │   │   ├── Header.jsx            # Navigation Header
│   │   │   ├── Footer.jsx            # Footer Component
│   │   │   ├── ProductList.jsx       # Products Display
│   │   │   ├── ProductDetail.jsx     # Individual Product View
│   │   │   ├── ProductForm.jsx       # Add/Edit Product Form
│   │   │   ├── Cart.jsx              # Shopping Cart
│   │   │   ├── OrderForm.jsx         # Checkout Form
│   │   │   ├── OrderList.jsx         # Orders History
│   │   │   ├── OrderConfirmation.jsx # Order Confirmation
│   │   │   ├── Login.jsx             # Login Page
│   │   │   ├── Register.jsx          # Registration Page
│   │   │   ├── ProtectedRoute.jsx    # Route Protection
│   │   │   ├── Header.css            # Component Styles
│   │   │   ├── Cart.css
│   │   │   ├── ProductList.css
│   │   │   └── ... (other component styles)
│   │   │
│   │   ├── context/                  # React Context API
│   │   │   ├── AuthContext.jsx       # Authentication State
│   │   │   └── CartContext.jsx       # Shopping Cart State
│   │   │
│   │   ├── services/
│   │   │   └── api.js                # Axios API Client
│   │   │
│   │   ├── App.jsx                   # Main App Component
│   │   ├── App.css                   # Global Styles
│   │   ├── index.js                  # React Entry Point
│   │   ├── index.css                 # Global CSS
│   │   └── setupProxy.js             # API Proxy Configuration
│   │
│   ├── package.json                  # Dependencies & Scripts
│   └── README.md                      # Frontend Documentation
│
│
└── SpringEcom/                        # Spring Boot Backend Application
    │
    ├── src/main/java/com/teluskp/SpringEcom/
    │   │
    │   ├── SpringEcomApplication.java # Main Application Class
    │   │
    │   ├── controller/                # REST API Controllers
    │   │   ├── ProductController.java # Product Endpoints
    │   │   ├── OrderController.java   # Order Endpoints
    │   │   └── UserController.java    # Authentication Endpoints
    │   │
    │   ├── service/                   # Business Logic Layer
    │   │   ├── ProductService.java    # Product Operations
    │   │   ├── OrderService.java      # Order Processing
    │   │   ├── UserService.java       # User Management
    │   │   └── CustomUserDetailsService.java  # Spring Security
    │   │
    │   ├── repo/                      # Data Access Layer (Repositories)
    │   │   ├── ProductRepository.java # Product DB Operations
    │   │   ├── OrderRepository.java   # Order DB Operations
    │   │   └── UserRepository.java    # User DB Operations
    │   │
    │   ├── model/                     # Entity Classes (JPA)
    │   │   ├── Product.java           # Product Entity
    │   │   ├── User.java              # User Entity
    │   │   ├── Order.java             # Order Entity
    │   │   ├── OrderItem.java         # Order Items Entity
    │   │   │
    │   │   └── dto/                   # Data Transfer Objects
    │   │       ├── LoginRequest.java
    │   │       ├── RegisterRequest.java
    │   │       ├── OrderRequest.java
    │   │       ├── OrderResponse.java
    │   │       ├── OrderItemRequest.java
    │   │       └── OrderitemResponse.java
    │   │
    │   └── config/                    # Configuration Classes
    │       ├── SecurityConfig.java    # Spring Security Configuration
    │       ├── CorsConfig.java        # CORS Configuration
    │       ├── JwtUtil.java           # JWT Token Utility
    │       └── JwtFilter.java         # JWT Filter Interceptor
    │
    ├── src/main/resources/
    │   └── application.properties     # Database & App Configuration
    │
    ├── src/test/java/
    │   └── SpringEcomApplicationTests.java
    │
    ├── pom.xml                        # Maven Dependencies
    ├── mvnw                           # Maven Wrapper (Linux/Mac)
    ├── mvnw.cmd                       # Maven Wrapper (Windows)
    └── target/                        # Compiled Files
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Java 21** or higher
- **Node.js 16+** and **npm**
- **MySQL 8.0+**
- **Git**
- **Maven 3.6+** (optional, uses Maven Wrapper)

### Backend Setup (Spring Boot)

#### 1. Clone the Repository
```bash
cd d:\Spring_Project\Ecommerce\Ecommence_Spring\SpringEcom
```

#### 2. Create MySQL Database
```sql
CREATE DATABASE productdb;
USE productdb;
```

#### 3. Configure Database Connection
Edit `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/productdb
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

#### 4. Build the Project
```bash
# Windows
mvnw.cmd clean install

# Linux/Mac
./mvnw clean install
```

#### 5. Run the Application
```bash
# Windows
mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

Backend will run on: `http://localhost:8080`

---

### Frontend Setup (React)

#### 1. Navigate to Frontend Directory
```bash
cd d:\Spring_Project\Ecommerce\Ecommence_Spring\frontend
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure API Proxy
The `setupProxy.js` file automatically proxies API calls to the backend:
```javascript
Target: http://localhost:8080/api
```

#### 4. Start Development Server
```bash
npm start
```

Frontend will run on: `http://localhost:3000`

---

## 🔌 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/api/auth/register` | User Registration | `{ "name": "string", "email": "string", "password": "string" }` |
| `POST` | `/api/auth/login` | User Login | `{ "email": "string", "password": "string" }` |

**Register Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER"
}
```

**Login Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0IjoxNjk0MjM2MDAwfQ..."
}
```

---

### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| `GET` | `/api/products` | Get All Products | ✅ Yes |
| `GET` | `/api/product/{id}` | Get Product by ID | ✅ Yes |
| `GET` | `/api/product/{productId}/image` | Get Product Image | ✅ Yes |
| `POST` | `/api/product` | Add New Product | ✅ Yes |
| `PUT` | `/api/product/{id}` | Update Product | ✅ Yes |
| `DELETE` | `/api/product/{id}` | Delete Product | ✅ Yes |

**Get Products Response:**
```json
[
  {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop",
    "brand": "Dell",
    "price": 999.99,
    "category": "Electronics",
    "releaseDate": "2024-01-15",
    "productAvailable": true,
    "stockQuantity": 50,
    "imageName": "laptop.jpg",
    "imageType": "image/jpeg"
  }
]
```

---

### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| `POST` | `/api/orders/place` | Place New Order | ✅ Yes |
| `GET` | `/api/orders` | Get All Orders | ✅ Yes |

**Place Order Request:**
```json
{
  "userId": 1,
  "totalAmount": 1299.98,
  "orderItems": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 649.99
    }
  ]
}
```

**Order Response:**
```json
{
  "orderId": 101,
  "userId": 1,
  "orderDate": "2024-06-13",
  "totalAmount": 1299.98,
  "status": "CONFIRMED",
  "orderItems": [
    {
      "itemId": 1,
      "productId": 1,
      "productName": "Laptop",
      "quantity": 2,
      "price": 649.99
    }
  ]
}
```

---

## ⚛️ Frontend Components

### Component Hierarchy

```
App
├── Header (Navigation)
├── Main Routes
│   ├── Login / Register (Public Routes)
│   ├── ProductList (Protected)
│   ├── ProductDetail (Protected)
│   ├── ProductForm (Protected - Add/Edit)
│   ├── Cart (Protected)
│   ├── OrderForm (Protected - Checkout)
│   ├── OrderList (Protected - History)
│   └── OrderConfirmation (Protected)
└── Footer
```

### Context API State Management

#### AuthContext
```javascript
{
  user: { id, name, email, role },
  token: "jwt_token",
  isAuthenticated: boolean,
  login: (email, password) => Promise,
  register: (data) => Promise,
  logout: () => void
}
```

#### CartContext
```javascript
{
  cartItems: [{ id, name, price, quantity, image }],
  addToCart: (product, quantity) => void,
  removeFromCart: (productId) => void,
  updateQuantity: (productId, quantity) => void,
  getTotalPrice: () => number,
  clearCart: () => void
}
```

---

## 🔒 Security Implementation

### 1. JWT Token-Based Authentication
- Tokens generated on login
- Tokens included in Authorization headers: `Authorization: Bearer {token}`
- Token validation on every protected request

### 2. Spring Security Configuration
- Password encoding with BCryptPasswordEncoder
- Custom UserDetailsService for user lookup
- JwtFilter for request interception and validation

### 3. CORS Configuration
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`
- Credentials allowed: `true`

### 4. Protected Routes (Frontend)
- ProtectedRoute component checks authentication
- Redirects unauthenticated users to login
- All protected routes require valid JWT token

### 5. Database Security
- Passwords stored as encrypted hashes
- Email column has UNIQUE constraint
- Role-based access control (RBAC)

---

## ▶️ How to Run

### Complete Setup (First Time)

#### Terminal 1 - Start MySQL
```bash
# Ensure MySQL service is running
# Windows: Services.msc or MySQL Workbench
# Linux: sudo service mysql start
# Mac: brew services start mysql
```

#### Terminal 2 - Start Backend
```bash
cd d:\Spring_Project\Ecommerce\Ecommence_Spring\SpringEcom
mvnw.cmd spring-boot:run
# Runs on http://localhost:8080
```

#### Terminal 3 - Start Frontend
```bash
cd d:\Spring_Project\Ecommerce\Ecommence_Spring\frontend
npm start
# Runs on http://localhost:3000
# Automatically opens in browser
```

### Database Commands

Create Database:
```sql
CREATE DATABASE productdb;
```

Check Tables:
```sql
USE productdb;
SHOW TABLES;
DESC users;
DESC product;
DESC orders;
DESC order_items;
```

Sample Data Query:
```sql
SELECT * FROM users;
SELECT * FROM product;
SELECT * FROM orders;
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'USER'
);
```

### Product Table
```sql
CREATE TABLE product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  brand VARCHAR(50),
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50),
  release_date DATE,
  product_available BOOLEAN DEFAULT true,
  stock_quantity INT DEFAULT 0,
  image_name VARCHAR(255),
  image_type VARCHAR(50),
  image_data LONGBLOB
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(12, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'CONFIRMED',
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);
```

---

## 📊 Key Features Summary

| Feature | Frontend | Backend | Database |
|---------|----------|---------|----------|
| **User Registration** | React Form | UserController + UserService | users table |
| **User Login** | Login Component | JwtUtil + SecurityConfig | users table |
| **Product Listing** | ProductList Component | ProductController + Service | product table |
| **Product Details** | ProductDetail Component | ProductController | product table + image data |
| **Add to Cart** | CartContext | N/A (Frontend State) | N/A |
| **Place Order** | OrderForm Component | OrderController + OrderService | orders + order_items tables |
| **View Orders** | OrderList Component | OrderController + OrderService | orders table |

---

## 🎯 Learning Outcomes & Skills Demonstrated

### Backend Development
- ✅ Spring Boot application architecture
- ✅ RESTful API design principles
- ✅ Spring Security with JWT authentication
- ✅ JPA/Hibernate ORM mapping
- ✅ Layered architecture (Controller → Service → Repository)
- ✅ Database design and relationships
- ✅ CORS configuration
- ✅ Request/Response DTO pattern

### Frontend Development
- ✅ React Hooks (useState, useContext, useEffect)
- ✅ React Router for navigation
- ✅ Context API for state management
- ✅ Axios for API communication
- ✅ Component composition and reusability
- ✅ Form handling and validation
- ✅ CSS styling and responsive design
- ✅ Protected routes and authentication flow

### Full-Stack Development
- ✅ Client-server communication
- ✅ Authentication and authorization
- ✅ Database design and relationships
- ✅ API endpoint design
- ✅ End-to-end feature implementation
- ✅ Proxy configuration
- ✅ Security best practices

---

## 🚀 Future Enhancements

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email notifications for orders
- [ ] Product reviews and ratings
- [ ] Admin dashboard
- [ ] Advanced search and filtering
- [ ] Wishlist functionality
- [ ] Order tracking
- [ ] Inventory management
- [ ] User profile management
- [ ] Two-factor authentication
- [ ] Docker containerization
- [ ] Unit and Integration tests

---

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Your Name / Developer**
- 📧 Email: your.email@example.com
- 🔗 LinkedIn: [Your Profile]
- 🐙 GitHub: [Your Profile]

---

## 📞 Support & Contact

For any questions or support, feel free to reach out or open an issue in the repository.

---

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [JWT.io](https://jwt.io)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [RESTful API Best Practices](https://restfulapi.net)

---

**Last Updated**: June 13, 2026
**Project Status**: Active Development ✅
