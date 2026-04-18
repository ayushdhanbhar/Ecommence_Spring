# JWT Authentication Implementation Guide

## Overview
I've implemented a complete JWT authentication system for your Spring E-Commerce application. Users can now register, login, and access protected routes.

## What's Been Implemented

### Frontend Changes

#### 1. **AuthContext** (`src/context/AuthContext.jsx`)
- Manages authentication state globally
- Stores token and user information in localStorage
- Provides methods: `register()`, `login()`, `logout()`
- Provides auth state: `user`, `token`, `isAuthenticated`, `loading`, `error`

#### 2. **Login Component** (`src/components/Login.jsx`)
- Email and password form
- Redirects to home after successful login
- Error handling
- Link to register page

#### 3. **Register Component** (`src/components/Register.jsx`)
- Name, email, password form
- Password confirmation validation
- Minimum 6 character password requirement
- Redirects to login after successful registration
- Error handling

#### 4. **ProtectedRoute Component** (`src/components/ProtectedRoute.jsx`)
- Wraps routes to prevent unauthorized access
- Redirects unauthenticated users to login
- Shows loading spinner while checking auth status

#### 5. **Updated App.jsx**
- Added AuthProvider wrapper in index.js
- All routes now wrapped with ProtectedRoute (except login/register)
- User menu in navbar with:
  - User email display
  - Logout button
  - Conditional rendering based on auth status
- Login/Register links shown when not authenticated

#### 6. **Updated API Service** (`src/services/api.js`)
- Added axios interceptor to attach JWT token to all requests
- Token automatically included in Authorization header: `Bearer {token}`

#### 7. **Styling** (`src/components/Login.css`, `src/components/Register.css`, `App.css`)
- Beautiful gradient backgrounds
- Responsive design for mobile devices
- User menu styling in navbar
- Form validation error messages

### Backend Changes

#### 1. **CorsConfig.java** (Updated)
- Added `exposedHeaders("Authorization")` to properly expose JWT tokens to frontend
- Allowed all necessary HTTP methods and headers

## How It Works

### Registration Flow
1. User fills registration form (name, email, password, confirm password)
2. Frontend sends POST request to `/api/auth/register`
3. Backend creates new user and encrypts password
4. Frontend stores user info in localStorage
5. User redirected to login page

### Login Flow
1. User enters email and password
2. Frontend sends POST request to `/api/auth/login`
3. Backend validates credentials and returns JWT token
4. Frontend stores token and user info in localStorage
5. User redirected to home page
6. All subsequent API requests include JWT token

### Protected Routes Flow
1. When accessing protected route, ProtectedRoute checks if user is authenticated
2. If no token, user redirected to login page
3. If authenticated, component renders normally

### Token Usage
- Token stored in localStorage with key: `token`
- Token automatically included in all API requests via interceptor
- Token expires after 24 hours (backend configuration)

## Testing the Implementation

### 1. **Start Backend**
```bash
cd SpringEcom
mvn clean install
mvn spring-boot:run
```
Backend will run on `http://localhost:8080`

### 2. **Start Frontend**
```bash
cd frontend
npm start
```
Frontend will run on `http://localhost:3000`

### 3. **Test Registration**
- Open `http://localhost:3000`
- You'll be redirected to login page
- Click "Register here"
- Fill in registration form with:
  - Name: `John Doe`
  - Email: `john@example.com`
  - Password: `password123`
  - Confirm Password: `password123`
- Click Register
- You'll be redirected to login page

### 4. **Test Login**
- Use credentials from registration:
  - Email: `john@example.com`
  - Password: `password123`
- Click Login
- You should see the home page with products
- User menu shows your email with logout button

### 5. **Test Protected Routes**
- After login, you can access all protected routes:
  - `/` - Product List
  - `/product/:id` - Product Details
  - `/product/add` - Add Product
  - `/cart` - Shopping Cart
  - `/checkout` - Order Form
  - `/orders` - Order List

### 6. **Test Logout**
- Click the Logout button in navbar
- You'll be redirected to login page
- Try accessing home page directly - you'll be redirected to login

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx (NEW)
│   │   ├── Login.css (NEW)
│   │   ├── Register.jsx (NEW)
│   │   ├── Register.css (NEW)
│   │   ├── ProtectedRoute.jsx (NEW)
│   │   └── ... (existing components)
│   ├── context/
│   │   ├── AuthContext.jsx (NEW)
│   │   └── CartContext.jsx (existing)
│   ├── services/
│   │   └── api.js (UPDATED - added interceptor)
│   ├── App.jsx (UPDATED - added auth routes & protection)
│   ├── App.css (UPDATED - added user menu styles)
│   └── index.js (UPDATED - added AuthProvider)
```

## Environment Configuration

### Frontend
- Base API URL: `http://localhost:8080/api`
- Token storage key: `token` (localStorage)
- User storage key: `user` (localStorage)

### Backend
- JWT Secret: `mysecretkeymysecretkeymysecretkey123` (in JwtUtil.java)
- Token Expiration: 24 hours (86400000 milliseconds)
- CORS Origin: `http://localhost:3000`

## Important Notes

### Security Considerations
1. In production, change the JWT secret key to a strong, random value
2. Use HTTPS instead of HTTP
3. Store sensitive data securely
4. Consider adding refresh tokens for better security
5. Add rate limiting on auth endpoints

### Future Enhancements
1. **Refresh Tokens** - Auto-refresh expired tokens
2. **Role-Based Access Control** - Admin/User roles
3. **Email Verification** - Verify email during registration
4. **Password Reset** - Forgot password functionality
5. **Social Login** - Google/GitHub authentication
6. **Two-Factor Authentication** - Additional security layer
7. **User Profile** - Edit user information
8. **Session Management** - Track user sessions

## Troubleshooting

### Issue: "Cannot POST /api/auth/register"
- Make sure backend is running on `http://localhost:8080`
- Check backend logs for errors

### Issue: "CORS error in console"
- Backend CORS config should allow `http://localhost:3000`
- Restart backend after making config changes

### Issue: "Token not sent to backend"
- Check browser DevTools > Network tab
- Should see `Authorization: Bearer {token}` header
- Check localStorage to ensure token is saved

### Issue: "Redirected to login after login"
- Check if backend is returning a valid JWT token
- Token should be a long string (not JSON)
- Check backend console for token generation issues

## Next Steps

1. ✅ Frontend authentication UI is ready
2. ✅ JWT token management implemented
3. ✅ Protected routes configured
4. Test the full flow from registration to browsing products
5. Implement any additional features needed
6. Deploy to production with proper security configurations
