import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { orderService } from '../services/api'
import './OrderForm.css'

function OrderForm() {
  const navigate = useNavigate()
  const { cartItems, clearCart, getCartTotal } = useCart()
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (cartItems.length === 0) {
      setError('Your cart is empty. Please add items to your cart first.')
      setLoading(false)
      return
    }

    try {
      const orderRequest = {
        customerName: formData.customerName,
        email: formData.email,
        items: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      }

      const orderResponse = await orderService.placeOrder(orderRequest)
      
      // Clear cart after successful order
      clearCart()
      
      // Navigate to order confirmation
      navigate(`/order/confirmation/${orderResponse.orderId}`, {
        state: { order: orderResponse },
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="order-form-container">
      <h2>Checkout</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="checkout-content">
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.product.id} className="summary-item">
                <span className="summary-item-name">{item.product.name}</span>
                <span className="summary-item-quantity">x{item.quantity}</span>
                <span className="summary-item-price">
                  ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <strong>Total: ${getCartTotal().toFixed(2)}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label htmlFor="customerName">Full Name *</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="btn btn-secondary"
            >
              Back to Cart
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrderForm

