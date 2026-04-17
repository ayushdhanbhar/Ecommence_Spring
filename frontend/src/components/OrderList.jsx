import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { orderService } from '../services/api'
import './OrderList.css'

function OrderList() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await orderService.getAllOrders()
      setOrders(data)
    } catch (err) {
      setError('Failed to load orders')
      console.error(err)
    } finally {
      setLoading(false)
    }
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

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'status-pending'
      case 'confirmed':
        return 'status-confirmed'
      case 'shipped':
        return 'status-shipped'
      case 'delivered':
        return 'status-delivered'
      case 'cancelled':
        return 'status-cancelled'
      default:
        return 'status-default'
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading orders...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={loadOrders}>Retry</button>
      </div>
    )
  }

  return (
    <div className="order-list-container">
      <div className="order-list-header">
        <h2>All Orders</h2>
        <Link to="/" className="btn btn-secondary">
          Back to Products
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.orderId} className="order-card">
              <div className="order-header">
                <div className="order-id-section">
                  <h3>Order ID: {order.orderId}</h3>
                  <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="order-date">
                  <strong>Order Date:</strong> {formatDate(order.orderDate)}
                </div>
              </div>

              <div className="order-customer-info">
                <p>
                  <strong>Customer:</strong> {order.customerName}
                </p>
                <p>
                  <strong>Email:</strong> {order.email}
                </p>
              </div>

              <div className="order-items">
                <h4>Order Items:</h4>
                <table className="order-items-table">
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
                </table>
              </div>

              <div className="order-total">
                <strong>
                  Total: $
                  {order.items
                    ?.reduce((sum, item) => sum + (parseFloat(item.subTotal) || 0), 0)
                    .toFixed(2) || '0.00'}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderList

