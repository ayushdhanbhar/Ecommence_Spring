import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useCart } from './context/CartContext'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import ProductForm from './components/ProductForm'
import Cart from './components/Cart'
import OrderForm from './components/OrderForm'
import OrderList from './components/OrderList'
import OrderConfirmation from './components/OrderConfirmation'
import './App.css'

function AppContent() {
  const { getCartItemCount } = useCart()

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <h1>🛍️ Spring E-Commerce</h1>
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Products</Link>
            <Link to="/product/add" className="nav-link">Add Product</Link>
            <Link to="/orders" className="nav-link">Orders</Link>
            <Link to="/cart" className="nav-link cart-link">
              🛒 Cart
              {getCartItemCount() > 0 && (
                <span className="cart-badge">{getCartItemCount()}</span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/add" element={<ProductForm />} />
          <Route path="/product/edit/:id" element={<ProductForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<OrderForm />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/order/confirmation/:orderId" element={<OrderConfirmation />} />
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

