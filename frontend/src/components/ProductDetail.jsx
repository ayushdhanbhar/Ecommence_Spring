import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { productService } from '../services/api'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const data = await productService.getProductById(id)
      
      if (data.id && data.id > 0) {
        setProduct(data)
        const url = await productService.getProductImage(data.id)
        setImageUrl(url)
      } else {
        setError('Product not found')
      }
    } catch (err) {
      setError('Failed to load product')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id)
        navigate('/')
      } catch (err) {
        alert('Failed to delete product')
        console.error(err)
      }
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <p>{error || 'Product not found'}</p>
        <Link to="/" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-GB')
    } catch {
      return dateString
    }
  }

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-link">
        ← Back to Products
      </Link>

      <div className="product-detail-content">
        <div className="product-detail-image">
          {imageUrl ? (
            <img src={imageUrl} alt={product.name} />
          ) : (
            <div className="image-placeholder">No Image Available</div>
          )}
        </div>

        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <div className="product-meta">
            <span className="brand-badge">{product.brand}</span>
            <span className="category-badge">{product.category}</span>
            {!product.productAvailable && (
              <span className="out-of-stock-badge">Out of Stock</span>
            )}
          </div>

          <div className="product-price-large">${product.price}</div>

          <div className="product-details-section">
            <h3>Description</h3>
            <p>{product.description || 'No description available'}</p>
          </div>

          <div className="product-specs">
            <div className="spec-item">
              <span className="spec-label">Stock Quantity:</span>
              <span className="spec-value">{product.stockQuantity} units</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Release Date:</span>
              <span className="spec-value">{formatDate(product.releaseDate)}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Availability:</span>
              <span className="spec-value">
                {product.productAvailable ? 'Available' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="product-actions">
            <Link
              to={`/product/edit/${product.id}`}
              className="btn btn-primary"
            >
              Edit Product
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

