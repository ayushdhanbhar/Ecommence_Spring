import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import './OrderConfirmation.css'

function OrderConfirmation() {
  const location = useLocation()
  const navigate = useNavigate()
  const order = location.state?.order

  if (!order) {
    return (
      <div className="order-confirmation-container">
        <div className="confirmation-error">
          <h2>Order information not found</h2>
          <Link to="/" className="btn btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  const total = order.items?.reduce(
    (sum, item) => sum + (parseFloat(item.subTotal) || 0),
    0
  ) || 0

  return (
    <div className="order-confirmation-container">
      <div className="confirmation-content">
        <div className="confirmation-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p className="confirmation-message">
          Thank you for your order. We've received your order and will begin processing it right away.
        </p>

        <div className="order-details-card">
          <h2>Order Details</h2>
          <div className="order-info">
            <div className="info-row">
              <span className="info-label">Order ID:</span>
              <span className="info-value">{order.orderId}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Customer Name:</span>
              <span className="info-value">{order.customerName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{order.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Order Date:</span>
              <span className="info-value">{formatDate(order.orderDate)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Status:</span>
              <span className={`status-badge status-${order.status?.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
          </div>

          <div className="order-items-summary">
            <h3>Order Items</h3>
            <table className="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>${item.subTotal?.toFixed(2) || '0.00'}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">
                    <strong>Total:</strong>
                  </td>
                  <td>
                    <strong>${total.toFixed(2)}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/orders" className="btn btn-primary">
            View All Orders
          </Link>
          <Link to="/" className="btn btn-secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation

