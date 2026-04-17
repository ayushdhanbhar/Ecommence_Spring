import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Add some products to your cart to get started!</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button onClick={clearCart} className="btn btn-danger">
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.product.id} className="cart-item">
            <div className="cart-item-info">
              <h3>{item.product.name}</h3>
              <p className="cart-item-brand">{item.product.brand}</p>
              <p className="cart-item-price">${item.product.price} each</p>
            </div>

            <div className="cart-item-quantity">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="quantity-btn"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                  className="quantity-input"
                />
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="cart-item-total">
              <p className="item-total">
                ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.product.id)}
              className="btn btn-danger remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <h3>Total: ${getCartTotal().toFixed(2)}</h3>
        </div>
        <div className="cart-actions">
          <Link to="/" className="btn btn-secondary">
            Continue Shopping
          </Link>
          <Link to="/checkout" className="btn btn-primary">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart

