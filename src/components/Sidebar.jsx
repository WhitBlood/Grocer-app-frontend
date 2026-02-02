import React from 'react'
import { CATEGORIES } from '../data/products'

const Sidebar = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="sidebar">
      <div 
        className={`sidebar-item ${selectedCategory === 'All' ? 'active' : ''}`}
        onClick={() => onCategoryChange('All')}
      >
        <div className="icon">🛒</div>
        <div className="label">All</div>
      </div>
      {CATEGORIES.slice(0, 6).map(category => (
        <div 
          key={category.name}
          className={`sidebar-item ${selectedCategory === category.name ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.name)}
        >
          <div className="icon">{category.icon}</div>
          <div className="label">{category.name}</div>
        </div>
      ))}
    </div>
  )
}

export default Sidebar