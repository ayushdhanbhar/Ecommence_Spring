import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
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
  return (
    <div className="app">
      <Header />

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

      <Footer />
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
