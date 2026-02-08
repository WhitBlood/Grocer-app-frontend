import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LoadingSpinner from '../components/LoadingSpinner'
import API_BASE_URL from '../config/api'

const MyOrders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = '📦 My Orders | FreshMart'
    
    // Check if user is logged in
    const token = localStorage.getItem('freshmart_token')
    if (!token) {
      navigate('/login')
      return
    }

    fetchOrders()
  }, [navigate])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('freshmart_token')
      console.log('🔍 Fetching orders...')
      console.log('📍 API URL:', API_BASE_URL)
      console.log('🔑 Token exists:', !!token)
      console.log('🔑 Token preview:', token ? token.substring(0, 50) + '...' : 'No token')
      
      const response = await fetch(`${API_BASE_URL}/orders/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      console.log('📊 Response status:', response.status)
      console.log('📊 Response ok:', response.ok)

      if (response.ok) {
        const data = await response.json()
        console.log('✅ Orders loaded:', data.length, 'orders')
        setOrders(data)
      } else if (response.status === 401) {
        console.error('❌ 401 Unauthorized - Token invalid or expired')
        const errorData = await response.json()
        console.error('Error details:', errorData)
        localStorage.removeItem('freshmart_token')
        localStorage.removeItem('freshmart_user')
        navigate('/login')
      } else {
        console.error('❌ Failed to load orders:', response.status)
        setError('Failed to load orders')
      }
    } catch (err) {
      console.error('❌ Network error:', err)
      setError('Failed to connect to server')
      console.error('Error fetching orders:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'processing':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner size="large" text="Loading your orders..." />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
            📦 My Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and track your order history
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl mb-6">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <i className="fas fa-shopping-bag text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No orders yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Start shopping to see your orders here
            </p>
            <button 
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              <i className="fas fa-shopping-cart mr-2"></i>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-4 border-b border-gray-200 dark:border-slate-700">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Order #{order.id}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <i className="fas fa-calendar mr-2"></i>
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-2xl font-black text-primary">
                      ₹{order.total ? parseFloat(order.total).toFixed(2) : '0.00'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {item.product_name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Quantity: {item.quantity} × ₹{parseFloat(item.product_price || item.price || 0).toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">
                          ₹{(item.quantity * parseFloat(item.product_price || item.price || 0)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                {(order.delivery_street || order.delivery_city) && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <i className="fas fa-map-marker-alt text-primary"></i>
                      Delivery Address
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {order.delivery_street}, {order.delivery_city}
                      <br />
                      {order.delivery_state} {order.delivery_postal_code}
                    </p>
                  </div>
                )}

                {/* Order Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/order/${order.id}`)}
                    className="flex-1 py-2 px-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/80 transition-all"
                  >
                    <i className="fas fa-eye mr-2"></i>
                    View Details
                  </button>
                  {order.status === 'pending' && (
                    <button
                      className="py-2 px-4 border-2 border-red-500 text-red-500 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition-all"
                    >
                      <i className="fas fa-times mr-2"></i>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default MyOrders
