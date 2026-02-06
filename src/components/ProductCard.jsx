import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import LoginPromptModal from './LoginPromptModal'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const success = addToCart(product, 1, () => {
      // This callback is called when user is not logged in
      setShowLoginModal(true)
    })
    
    if (success) {
      // Show notification only if item was added successfully
      const notification = document.createElement('div')
      notification.className = 'notification'
      notification.innerHTML = `
        <i class="fas fa-check-circle mr-2"></i>
        ${product.name} added to cart!
      `
      document.body.appendChild(notification)
      
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 3000)
    }
  }

  const getBadgeClass = (badge) => {
    switch (badge.toLowerCase()) {
      case 'organic': return 'badge-organic'
      case 'premium': return 'badge-premium'
      case 'fresh': return 'badge-fresh'
      case 'exotic': return 'badge-exotic'
      case 'luxury': return 'badge-luxury'
      case 'artisan': return 'badge-artisan'
      default: return 'badge-organic'
    }
  }

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <Link to={`/product/${product.id}`} className="block">
      <LoginPromptModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      
      <div className="product-card overflow-hidden group">
        <div className="relative">
          <img 
            src={product.img} 
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className={`badge ${getBadgeClass(product.badge)}`}>
              {product.badge}
            </span>
          </div>
          {discountPercentage > 0 && (
            <div className="absolute top-3 right-3">
              <span className="badge bg-red-500 text-white">
                {discountPercentage}% OFF
              </span>
            </div>
          )}
          <button 
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all transform hover:scale-110 opacity-0 group-hover:opacity-100"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        
        <div className="p-6">
          <h4 className="font-bold text-lg mb-2 dark:text-white line-clamp-1 heading-primary">
            {product.name}
          </h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 text-body">
            {product.description}
          </p>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <i 
                  key={i} 
                  className={`fas fa-star text-sm ${i < Math.floor(product.rating) ? '' : 'text-gray-300 dark:text-gray-600'}`}
                ></i>
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300 text-accent">
              {product.rating} ({product.reviews})
            </span>
          </div>
          
          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold price-primary">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <button 
              onClick={handleAddToCart}
              className="btn-info text-sm px-4 py-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard