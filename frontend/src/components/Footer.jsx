import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <div className="footer-logo">
            <span className="logo-icon">🛍️</span>
            <span className="logo-text">ShopHub</span>
          </div>
          <p className="footer-description">
            Your ultimate destination for quality products at unbeatable prices.
            Shop with confidence, delivered fast, and supported by our dedicated team.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon" title="Facebook">f</a>
            <a href="#" className="social-icon" title="Twitter">𝕏</a>
            <a href="#" className="social-icon" title="Instagram">📷</a>
            <a href="#" className="social-icon" title="LinkedIn">in</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Shop</Link></li>
            <li><Link to="/">New Arrivals</Link></li>
            <li><Link to="/">Best Sellers</Link></li>
            <li><Link to="/">Sale</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3 className="footer-title">Categories</h3>
          <ul className="footer-links">
            <li><Link to="/">Electronics</Link></li>
            <li><Link to="/">Fashion</Link></li>
            <li><Link to="/">Home & Garden</Link></li>
            <li><Link to="/">Sports</Link></li>
            <li><Link to="/">Books</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h3 className="footer-title">Customer Service</h3>
          <ul className="footer-links">
            <li><Link to="/">Contact Us</Link></li>
            <li><Link to="/">Shipping Info</Link></li>
            <li><Link to="/">Returns</Link></li>
            <li><Link to="/">FAQ</Link></li>
            <li><Link to="/">Track Order</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3 className="footer-title">Newsletter</h3>
          <p className="footer-description-small">
            Subscribe to get special offers and updates directly to your inbox.
          </p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button className="newsletter-btn">Subscribe</button>
          </div>
          <div className="payment-methods">
            <span className="payment-icon">💳</span>
            <span className="payment-icon">🏦</span>
            <span className="payment-icon">🔒</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="footer-bottom-left">
            <Link to="/">Privacy Policy</Link>
            <span className="divider">|</span>
            <Link to="/">Terms & Conditions</Link>
            <span className="divider">|</span>
            <Link to="/">Cookie Policy</Link>
          </div>
          <div className="footer-bottom-center">
            <p>&copy; 2024 ShopHub. All rights reserved.</p>
          </div>
          <div className="footer-bottom-right">
            <span>🌍 English</span>
            <span className="divider">|</span>
            <span>💵 USD</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
