import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productService } from '../services/api'
import { useCart } from '../context/CartContext'
import './ProductList.css'

function ProductList() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageUrls, setImageUrls] = useState({})
  const { addToCart } = useCart()

  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sortBy, setSortBy] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique categories
  const categories = ['all', 'Electronics', 'Fashion', 'Home', 'Sports']

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await productService.getAllProducts()
      setProducts(data)
      applyFilters(data, searchTerm, selectedCategory, priceRange, sortBy)

      // Load images
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

  const applyFilters = (data, search, category, range, sort) => {
    let filtered = [...data]

    // Search filter
    if (search.trim()) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
      )
    }

    // Category filter
    if (category !== 'all') {
      filtered = filtered.filter((p) => (p.category || '').includes(category))
    }

    // Price filter
    filtered = filtered.filter((p) => p.price >= range[0] && p.price <= range[1])

    // Sorting
    switch (sort) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'popular':
      default:
        break
    }

    setFilteredProducts(filtered)
  }

  const handleSearch = (e) => {
    const search = e.target.value
    setSearchTerm(search)
    applyFilters(products, search, selectedCategory, priceRange, sortBy)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    applyFilters(products, searchTerm, category, priceRange, sortBy)
  }

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value)
    setPriceRange([0, value])
    applyFilters(products, searchTerm, selectedCategory, [0, value], sortBy)
  }

  const handleSortChange = (e) => {
    const sort = e.target.value
    setSortBy(sort)
    applyFilters(products, searchTerm, selectedCategory, priceRange, sort)
  }

  const handleAddToCart = (product, e) => {
    e.stopPropagation()
    addToCart(product)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading amazing products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={loadProducts} className="btn btn-primary">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover Amazing Products</h1>
          <p>Browse through thousands of quality items at unbeatable prices</p>
          <div className="hero-search">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleSearch}
              className="hero-search-input"
            />
            <button className="hero-search-btn">🔍 Search</button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="products-container">
        {/* Sidebar Filters */}
        <aside className={`filters-sidebar ${showFilters ? 'open' : ''}`}>
          <button
            className="close-filters"
            onClick={() => setShowFilters(false)}
          >
            ✕
          </button>

          <div className="filter-section">
            <h3 className="filter-title">🏷️ Categories</h3>
            <div className="filter-options">
              {categories.map((cat) => (
                <label key={cat} className="filter-checkbox">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  <span className="checkbox-label">
                    {cat === 'all' ? 'All Products' : cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">💰 Price Range</h3>
            <div className="price-filter">
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="price-slider"
              />
              <div className="price-display">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">⭐ Ratings</h3>
            <div className="filter-options">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="filter-checkbox">
                  <input type="checkbox" />
                  <span className="checkbox-label">
                    {'⭐'.repeat(rating)} {rating}.0+
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button className="btn btn-secondary" style={{ width: '100%' }}>
            Clear Filters
          </button>
        </aside>

        {/* Products Grid */}
        <main className="products-main">
          {/* Toolbar */}
          <div className="products-toolbar">
            <div className="toolbar-left">
              <button
                className="filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                ☰ Filters
              </button>
              <span className="results-count">
                Showing {filteredProducts.length} products
              </span>
            </div>

            <div className="toolbar-right">
              <label htmlFor="sort-select" className="sort-label">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={handleSortChange}
                className="sort-select"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <Link to={`/product/${product.id}`} className="product-image-link">
                    <div className="product-image">
                      {imageUrls[product.id] ? (
                        <img src={imageUrls[product.id]} alt={product.name} />
                      ) : (
                        <div className="image-placeholder">
                          📷 No Image
                        </div>
                      )}
                      {product.discount && (
                        <div className="discount-badge">
                          -{product.discount}%
                        </div>
                      )}
                      {product.productAvailable === false && (
                        <div className="stock-badge">Out of Stock</div>
                      )}
                    </div>
                  </Link>

                  <div className="product-info">
                    <div className="product-category">{product.category || 'Uncategorized'}</div>
                    <Link to={`/product/${product.id}`} className="product-name">
                      {product.name}
                    </Link>

                    <div className="product-rating">
                      <span className="stars">{'⭐'.repeat(4)}</span>
                      <span className="rating-count">(124 reviews)</span>
                    </div>

                    <div className="product-price">
                      <span className="current-price">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="btn btn-add-cart"
                      disabled={product.productAvailable === false}
                    >
                      {product.productAvailable === false ? '❌ Out of Stock' : '🛒 Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>😕 No products found</p>
              <p>Try adjusting your filters or search term</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setPriceRange([0, 10000])
                }}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default ProductList

