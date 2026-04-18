import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const productService = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await api.get('/products')
      return response.data
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/product/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching product:', error)
      throw error
    }
  },

  // Get product image
  getProductImage: async (productId) => {
    try {
      const response = await api.get(`/product/${productId}/image`, {
        responseType: 'blob',
      })
      return URL.createObjectURL(response.data)
    } catch (error) {
      console.error('Error fetching product image:', error)
      return null
    }
  },

  // Add product
  addProduct: async (productData, imageFile) => {
    try {
      const formData = new FormData()
      formData.append('product', new Blob([JSON.stringify(productData)], {
        type: 'application/json'
      }))
      formData.append('imageFile', imageFile)

      const response = await api.post('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      console.error('Error adding product:', error)
      throw error
    }
  },

  // Update product
  updateProduct: async (id, productData, imageFile) => {
    try {
      const formData = new FormData()
      formData.append('product', new Blob([JSON.stringify(productData)], {
        type: 'application/json'
      }))
      formData.append('imageFile', imageFile)

      const response = await api.put(`/product/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/product/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  },

  // Search products
  searchProducts: async (keyword) => {
    try {
      const response = await api.get('/product/search', {
        params: { keyword },
      })
      return response.data
    } catch (error) {
      console.error('Error searching products:', error)
      throw error
    }
  },
}

export const orderService = {
  // Place order
  placeOrder: async (orderRequest) => {
    try {
      const response = await api.post('/orders/place', orderRequest)
      return response.data
    } catch (error) {
      console.error('Error placing order:', error)
      throw error
    }
  },

  // Get all orders
  getAllOrders: async () => {
    try {
      const response = await api.get('/orders')
      return response.data
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  },
}

export default api

