import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LoadingSpinner from '../components/LoadingSpinner'
import { getProductById } from '../data/products'
import { useCart } from '../context/CartContext'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const foundProduct = getProductById(id)
    if (foundProduct) {
      setProduct(foundProduct)
      document.title = `🛍️ ${foundProduct.name} | FreshMart`
    } else {
      document.title = '🔍 Product Not Found | FreshMart'
    }
    setIsLoading(false)
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      
      // Show notification
      const notification = document.createElement('div')
      notification.className = 'notification'
      notification.innerHTML = `
        <i class="fas fa-check-circle mr-2"></i>
        ${quantity} ${product.name} added to cart!
      `
      document.body.appendChild(notification)
      
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 3000)
    }
  }

  const getBadgeClass = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'organic': return 'badge-organic'
      case 'premium': return 'badge-premium'
      case 'fresh': return 'badge-fresh'
      case 'exotic': return 'badge-exotic'
      case 'luxury': return 'badge-luxury'
      case 'artisan': return 'badge-artisan'
      default: return 'badge-organic'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner size="large" text="Loading product..." />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-20">
          <i className="fas fa-exclamation-triangle text-6xl text-gray-300 mb-4"></i>
          <h2 className="text-3xl font-bold text-gray-600 dark:text-gray-300 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Product Details */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 mt-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src={product.images ? product.images[selectedImage] : product.img} 
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`badge ${getBadgeClass(product.badge)}`}>
                  {product.badge}
                </span>
              </div>
              {discountPercentage > 0 && (
                <div className="absolute top-4 right-4">
                  <span className="badge bg-red-500 text-white">
                    {discountPercentage}% OFF
                  </span>
                </div>
              )}
            </div>
            
            {/* Image Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-primary shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-black mb-4 dark:text-white">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? '' : 'text-gray-300'}`}></i>
                    ))}
                  </div>
                  <span className="font-semibold dark:text-white">{product.rating}</span>
                  <span className="text-gray-600 dark:text-gray-300">({product.reviews} reviews)</span>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.category}
                </span>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-primary">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="font-semibold dark:text-white">Quantity:</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="font-bold text-xl w-12 text-center dark:text-white">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-colors"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-primary to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <i className="fas fa-shopping-cart"></i>
                Add to Cart - ₹{product.price * quantity}
              </button>
              <button className="px-6 py-4 border-2 border-primary text-primary rounded-2xl font-bold hover:bg-primary hover:text-white transition-all">
                <i className="fas fa-heart"></i>
              </button>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold mb-2">
                <i className="fas fa-truck"></i>
                Free Delivery
              </div>
              <p className="text-sm text-green-600 dark:text-green-300">
                Free delivery on orders above ₹500. Delivered within 2-4 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="flex gap-8 border-b border-gray-200 dark:border-slate-700 mb-8">
            {['description', 'details', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-semibold capitalize transition-colors ${
                  activeTab === tab 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="card">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-2xl font-bold mb-4 dark:text-white">Product Description</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {product.description} This premium product is carefully selected for its quality and freshness. 
                  Perfect for various culinary applications and packed with essential nutrients for a healthy lifestyle.
                </p>
              </div>
            )}

            {activeTab === 'details' && product.details && (
              <div>
                <h3 className="text-2xl font-bold mb-6 dark:text-white">Product Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3 dark:text-white">Product Information</h4>
                    <div className="space-y-2">
                      {Object.entries(product.details).filter(([key]) => key !== 'nutrients').map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300 capitalize">
                            {key.replace('_', ' ')}:
                          </span>
                          <span className="font-semibold dark:text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {product.details.nutrients && (
                    <div>
                      <h4 className="font-bold mb-3 dark:text-white">Nutritional Benefits</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.details.nutrients.map(nutrient => (
                          <span key={nutrient} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {nutrient}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && product.reviews_data && (
              <div>
                <h3 className="text-2xl font-bold mb-6 dark:text-white">Customer Reviews</h3>
                <div className="space-y-6">
                  {product.reviews_data.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-slate-700 pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold dark:text-white">{review.name}</h4>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <i key={i} className={`fas fa-star text-sm ${i < review.rating ? '' : 'text-gray-300'}`}></i>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProductDetails