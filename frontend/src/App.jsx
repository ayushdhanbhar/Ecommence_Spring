import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useCart } from './context/CartContext'
import { useAuth } from './context/AuthContext'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import ProductForm from './components/ProductForm'
import Cart from './components/Cart'
import OrderForm from './components/OrderForm'
import OrderList from './components/OrderList'
import OrderConfirmation from './components/OrderConfirmation'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function AppContent() {
  const { getCartItemCount } = useCart()
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <h1>🛍️ Spring E-Commerce</h1>
          </Link>
          <div className="nav-links">
            {isAuthenticated ? (
              <>
                <Link to="/" className="nav-link">Products</Link>
                <Link to="/product/add" className="nav-link">Add Product</Link>
                <Link to="/orders" className="nav-link">Orders</Link>
                <Link to="/cart" className="nav-link cart-link">
                  🛒 Cart
                  {getCartItemCount() > 0 && (
                    <span className="cart-badge">{getCartItemCount()}</span>
                  )}
                </Link>
                <div className="user-menu">
                  <span className="user-email">👤 {user?.email || user?.name}</span>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link register-link">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
          <Route path="/product/add" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
          <Route path="/product/edit/:id" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><OrderForm /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
          <Route path="/order/confirmation/:orderId" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Spring E-Commerce. All rights reserved.</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

