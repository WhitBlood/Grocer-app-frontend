import React from 'react'
import { CATEGORIES } from '../data/products'

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12 dark:text-white">
          Shop by Category
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-4 mb-8">
          {/* All Categories Button */}
          <button
            onClick={() => onCategoryChange('All')}
            className={`p-4 rounded-2xl text-center transition-all transform hover:scale-105 ${
              selectedCategory === 'All' 
                ? 'bg-gradient-to-r from-primary to-emerald-600 text-white shadow-lg' 
                : 'bg-white dark:bg-slate-800 hover:shadow-md'
            }`}
          >
            <div className="text-2xl mb-2">🛒</div>
            <p className="font-semibold text-sm dark:text-white">All</p>
          </button>
          
          {/* Category Buttons */}
          {CATEGORIES.map(category => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              className={`p-4 rounded-2xl text-center transition-all transform hover:scale-105 ${
                selectedCategory === category.name 
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg` 
                  : 'bg-white dark:bg-slate-800 hover:shadow-md'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <p className="font-semibold text-sm dark:text-white">{category.name}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryFilter