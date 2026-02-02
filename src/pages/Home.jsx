import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import CategoryFilter from '../components/CategoryFilter'
import LoadingSpinner from '../components/LoadingSpinner'
import Footer from '../components/Footer'

import { PRODUCTS, getProductsByCategory, searchProducts } from '../data/products'
import { useCart } from '../context/CartContext'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS)
  const [isLoading, setIsLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  useEffect(() => {
    let products = PRODUCTS
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      products = getProductsByCategory(selectedCategory)
    }
    
    // Apply search filter
    if (searchTerm) {
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    setFilteredProducts(products)
  }, [selectedCategory, searchTerm])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setSearchTerm('') // Clear search when changing category
  }

  const handleHeroShopNow = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading FreshMart..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar onSearch={handleSearch} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight heading-display">
                Fresh <span className="text-gradient">Premium</span><br/>
                Groceries <span className="text-gradient-green">Delivered</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-body">
                Experience the finest selection of organic produce, artisan goods, and premium ingredients delivered fresh to your doorstep with unmatched quality and care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleHeroShopNow}
                  className="btn-primary text-lg px-8 py-4"
                >
                  <i className="fas fa-shopping-bag mr-2"></i>
                  Shop Now
                </button>
                <button className="btn-secondary text-lg px-8 py-4">
                  <i className="fas fa-play mr-2"></i>
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format" 
                alt="Fresh Groceries"
                className="rounded-3xl shadow-2xl w-full"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-secondary to-yellow-500 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-glow">
                <i className="fas fa-star mr-1"></i>
                Premium Quality
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Products */}
      <section id="products" className="py-16 px-4 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h3 className="text-3xl font-bold dark:text-white mb-2">
                {selectedCategory === 'All' ? 'Featured Products' : selectedCategory}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {filteredProducts.length} products found
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
            
            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Sort by:
              </label>
              <select className="input-field py-2 px-3 text-sm">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or browse our categories
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="btn-primary"
              >
                View All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 dark:text-white">
            Why Choose <span className="text-primary">FreshMart</span>?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-truck text-white text-2xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-4 dark:text-white">Fast Delivery</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Get your groceries delivered within 2-4 hours. Free delivery on orders above ₹500.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-leaf text-white text-2xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-4 dark:text-white">Fresh & Organic</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Sourced directly from farms and trusted suppliers. 100% fresh guarantee or money back.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-shield-alt text-white text-2xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-4 dark:text-white">Quality Assured</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Rigorous quality checks and premium packaging ensure you get the best products.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home