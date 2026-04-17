import React, { useState } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(keyword)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setKeyword(value)
    if (!value.trim()) {
      onSearch('')
    }
  }

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search products by name, brand, category, or description..."
          value={keyword}
          onChange={handleChange}
        />
        <button type="submit" className="search-button">
          🔍 Search
        </button>
      </form>
    </div>
  )
}

export default SearchBar

