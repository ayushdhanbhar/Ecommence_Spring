import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { productService } from '../services/api'
import './ProductForm.css'

function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = !!id

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    price: '',
    category: '',
    releaseDate: '',
    productAvailable: true,
    stockQuantity: 0,
  })

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isEditMode) {
      loadProduct()
    }
  }, [id])

  const loadProduct = async () => {
    try {
      const product = await productService.getProductById(id)
      if (product.id && product.id > 0) {
        setFormData({
          name: product.name || '',
          description: product.description || '',
          brand: product.brand || '',
          price: product.price || '',
          category: product.category || '',
          releaseDate: product.releaseDate 
            ? new Date(product.releaseDate).toISOString().split('T')[0]
            : '',
          productAvailable: product.productAvailable !== undefined 
            ? product.productAvailable 
            : true,
          stockQuantity: product.stockQuantity || 0,
        })
        
        // Load existing image
        const imageUrl = await productService.getProductImage(product.id)
        if (imageUrl) {
          setImagePreview(imageUrl)
        }
      }
    } catch (err) {
      setError('Failed to load product')
      console.error(err)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Convert date to DD-MM-YYYY format for backend
      const dateParts = formData.releaseDate.split('-')
      const formattedDate = dateParts.length === 3 
        ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
        : formData.releaseDate

      const productData = {
        ...formData,
        releaseDate: formattedDate,
        stockQuantity: parseInt(formData.stockQuantity) || 0,
      }

      if (isEditMode) {
        // For update, we need to include the id
        productData.id = parseInt(id)
        await productService.updateProduct(id, productData, imageFile || new Blob())
      } else {
        await productService.addProduct(productData, imageFile)
      }

      navigate('/')
    } catch (err) {
      setError(err.response?.data || 'Failed to save product')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="product-form-container">
      <Link to="/" className="back-link">
        ← Back to Products
      </Link>

      <div className="form-wrapper">
        <h2>{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter product name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="brand">Brand *</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                placeholder="Enter brand name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                placeholder="Enter category"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="Enter price"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter product description"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="releaseDate">Release Date</label>
              <input
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="stockQuantity">Stock Quantity *</label>
              <input
                type="number"
                id="stockQuantity"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                required
                min="0"
                placeholder="Enter stock quantity"
              />
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label htmlFor="productAvailable">
              <input
                type="checkbox"
                id="productAvailable"
                name="productAvailable"
                checked={formData.productAvailable}
                onChange={handleChange}
              />
              Product Available
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="imageFile">Product Image {isEditMode ? '(optional)' : '*'}</label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              accept="image/*"
              onChange={handleImageChange}
              required={!isEditMode}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : isEditMode ? 'Update Product' : 'Add Product'}
            </button>
            <Link to="/" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm

