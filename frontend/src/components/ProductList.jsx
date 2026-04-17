import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { productService } from '../services/api'
import { useCart } from '../context/CartContext'
import SearchBar from './SearchBar'
import './ProductList.css'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageUrls, setImageUrls] = useState({})
  const navigate = useNavigate()
  const { addToCart } = useCart()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await productService.getAllProducts()
      setProducts(data)
      
      // Load images for all products
      const imagePromises = data.map(async (product) => {
        if (product.id) {
          const imageUrl = await productService.getProductImage(product.id)
          return { id: product.id, url: imageUrl }
        }
        return null
      })
      
      const imageResults = await Promise.all(imagePromises)
      const imageMap = {}
      imageResults.forEach((result) => {
        if (result && result.url) {
          imageMap[result.id] = result.url
        }
      })
      setImageUrls(imageMap)
    } catch (err) {
      setError('Failed to load products')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      loadProducts()
      return
    }

    try {
      setLoading(true)
      const data = await productService.searchProducts(keyword)
      setProducts(data)
      
      // Load images for search results
      const imagePromises = data.map(async (product) => {
        if (product.id) {
          const imageUrl = await productService.getProductImage(product.id)
          return { id: product.id, url: imageUrl }
        }
        return null
      })
      
      const imageResults = await Promise.all(imagePromises)
      const imageMap = {}
      imageResults.forEach((result) => {
        if (result && result.url) {
          imageMap[result.id] = result.url
        }
      })
      setImageUrls(imageMap)
    } catch (err) {
      setError('Failed to search products')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id)
        setProducts(products.filter((p) => p.id !== id))
      } catch (err) {
        alert('Failed to delete product')
        console.error(err)
      }
    }
  }

  const handleAddToCart = (product, e) => {
    e.stopPropagation()
    if (!product.productAvailable) {
      alert('This product is out of stock')
      return
    }
    addToCart(product, 1)
    alert(`${product.name} added to cart!`)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={loadProducts}>Retry</button>
      </div>
    )
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2>All Products</h2>
        <Link to="/product/add" className="btn btn-primary">
          + Add New Product
        </Link>
      </div>

      <SearchBar onSearch={handleSearch} />

      {products.length === 0 ? (
        <div className="empty-state">
          <p>No products found. Add your first product!</p>
          <Link to="/product/add" className="btn btn-primary">
            Add Product
          </Link>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                {imageUrls[product.id] ? (
                  <img
                    src={imageUrls[product.id]}
                    alt={product.name}
                    className="product-image"
                  />
                ) : (
                  <div className="product-image-placeholder">
                    No Image
                  </div>
                )}
                {!product.productAvailable && (
                  <div className="out-of-stock-badge">Out of Stock</div>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-brand">{product.brand}</p>
                <p className="product-category">{product.category}</p>
                <p className="product-price">${product.price}</p>
                <p className="product-stock">
                  Stock: {product.stockQuantity} units
                </p>
                <div className="product-actions">
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="btn btn-cart"
                    disabled={!product.productAvailable}
                  >
                    🛒 Add to Cart
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-secondary"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={(e) => handleDelete(product.id, e)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/product/edit/${product.id}`}
                    className="btn btn-edit"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList

