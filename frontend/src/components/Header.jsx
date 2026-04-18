import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import './Header.css'

function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const { getCartItemCount } = useCart()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-container">
          <div className="header-info">
            <span>📞 +1 (555) 123-4567</span>
            <span>📧 support@ecomm.com</span>
          </div>
          {isAuthenticated && (
            <div className="header-user">
              <span className="user-greeting">Welcome, {user?.name || user?.email}</span>
            </div>
          )}
        </div>
      </div>

      <nav className="navbar">
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-icon">🛍️</span>
            <span className="logo-text">ShopHub</span>
          </Link>

          {/* Hamburger Menu */}
          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Navigation Menu */}
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-item" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <div className="nav-dropdown">
              <button className="nav-item dropdown-toggle">
                Categories ▼
              </button>
              <div className="dropdown-menu">
                <Link to="/" className="dropdown-item">All Products</Link>
                <Link to="/" className="dropdown-item">Electronics</Link>
                <Link to="/" className="dropdown-item">Fashion</Link>
                <Link to="/" className="dropdown-item">Home & Garden</Link>
              </div>
            </div>
            {isAuthenticated && (
              <>
                <Link to="/product/add" className="nav-item" onClick={() => setIsMenuOpen(false)}>
                  Add Product
                </Link>
                <Link to="/orders" className="nav-item" onClick={() => setIsMenuOpen(false)}>
                  My Orders
                </Link>
              </>
            )}
            <Link to="/" className="nav-item">
              About Us
            </Link>
            <Link to="/" className="nav-item">
              Contact
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="nav-actions">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search products..."
                className="search-input"
              />
              <button className="search-btn">🔍</button>
            </div>

            <Link to="/cart" className="icon-btn cart-btn">
              🛒 Cart
              {getCartItemCount() > 0 && (
                <span className="badge">{getCartItemCount()}</span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="user-menu">
                <button className="icon-btn user-btn">👤</button>
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <strong>{user?.name || user?.email}</strong>
                  </div>
                  <Link to="/orders" className="user-dropdown-item">
                    My Orders
                  </Link>
                  <Link to="/" className="user-dropdown-item">
                    My Account
                  </Link>
                  <Link to="/" className="user-dropdown-item">
                    Wishlist
                  </Link>
                  <div className="user-dropdown-divider"></div>
                  <button onClick={handleLogout} className="user-dropdown-item logout">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="btn-text">Login</Link>
                <Link to="/register" className="btn-primary-small">Register</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
