import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import API_BASE_URL from '../config/api'

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart()
  const [showSuccess, setShowSuccess] = useState(false)
  const [savedAddresses, setSavedAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const [useNewAddress, setUseNewAddress] = useState(false)
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India'
  })
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('card')

  useEffect(() => {
    document.title = '🛒 Checkout | FreshMart - Premium Grocery Experience'
    
    // Load saved addresses from backend API
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    const token = localStorage.getItem('freshmart_token')
    console.log('🔍 Fetching addresses...')
    console.log('🔑 Token exists:', !!token)
    
    if (!token) {
      console.log('❌ No token, showing new address form')
      setUseNewAddress(true)
      return
    }

    try {
      console.log('📍 API URL:', API_BASE_URL)
      const response = await fetch(`${API_BASE_URL}/addresses/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      console.log('📊 Response status:', response.status)

      if (response.ok) {
        const addresses = await response.json()
        console.log('✅ Addresses loaded:', addresses.length, 'addresses')
        console.log('📦 Addresses data:', addresses)
        setSavedAddresses(addresses)
        
        // If no addresses, enable new address form
        if (addresses.length === 0) {
          console.log('ℹ️ No addresses found, showing new address form')
          setUseNewAddress(true)
        } else {
          console.log('✅ Addresses found, selecting default')
          // Auto-select default address
          const defaultAddress = addresses.find(addr => addr.is_default)
          if (defaultAddress) {
            console.log('✅ Default address selected:', defaultAddress.id)
            setSelectedAddressId(defaultAddress.id)
          } else {
            // Select first address if no default
            console.log('✅ First address selected:', addresses[0].id)
            setSelectedAddressId(addresses[0].id)
          }
        }
      } else {
        console.error('❌ Failed to load addresses, status:', response.status)
        setUseNewAddress(true)
      }
    } catch (error) {
      console.error('❌ Error fetching addresses:', error)
      setUseNewAddress(true)
    }
  }

  const subtotal = getTotalPrice()
  const deliveryFee = subtotal > 500 ? 0 : 49
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + deliveryFee + tax

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check if user is logged in
    const token = localStorage.getItem('freshmart_token')
    if (!token) {
      alert('Please login to place an order')
      navigate('/login')
      return
    }
    
    // Validate address selection or new address entry
    if (!useNewAddress && !selectedAddressId) {
      alert('Please select a delivery address')
      return
    }
    
    if (useNewAddress && (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.postal_code)) {
      alert('Please fill in all address fields')
      return
    }
    
    try {
      // Get the address to use
      let addressToUse
      
      if (useNewAddress) {
        addressToUse = newAddress
      } else {
        // Find the selected address from saved addresses
        addressToUse = savedAddresses.find(addr => addr.id === selectedAddressId)
        if (!addressToUse) {
          alert('Please select a valid address')
          return
        }
      }

      // Create order with address fields
      const orderItems = cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }))

      const orderResponse = await fetch(`${API_BASE_URL}/orders/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: orderItems,
          delivery_street: addressToUse.street,
          delivery_city: addressToUse.city,
          delivery_state: addressToUse.state,
          delivery_postal_code: addressToUse.postal_code,
          delivery_country: addressToUse.country || 'India',
          delivery_instructions: addressToUse.delivery_instructions || null,
          payment_method: paymentMethod
        })
      })

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json()
        throw new Error(errorData.detail || 'Failed to create order')
      }

      const order = await orderResponse.json()
      console.log('✅ Order created:', order)

      // Show success and redirect
      setShowSuccess(true)
      setTimeout(() => {
        clearCart()
        navigate('/my-orders')
      }, 2000)
    } catch (error) {
      console.error('❌ Order error:', error)
      alert(`Failed to place order: ${error.message}`)
    }
  }

  const handleNewAddressChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value
    })
  }

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    })
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-check text-white text-4xl"></i>
            </div>
            <h2 className="text-4xl font-bold text-green-600 mb-4">Order Confirmed!</h2>
            <p className="text-xl text-gray-600 mb-6">Thank you for your purchase. Your order will be delivered soon.</p>
            <div className="loading-spinner mx-auto"></div>
            <p className="text-sm text-gray-500 mt-4">Redirecting to home...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-6xl mx-auto p-4 mt-8">
        {cart.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="card max-w-md mx-auto text-center">
              <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-6"></i>
              <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-4">Your cart is empty!</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
              <button 
                onClick={() => navigate('/')}
                className="btn-primary"
              >
                <i className="fas fa-shopping-bag mr-2"></i>
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card">
                <h3 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
                  <i className="fas fa-shopping-bag text-primary"></i>
                  Your Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                </h3>
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.cartId} className="flex items-center gap-4 p-4 border border-gray-100 dark:border-slate-700 rounded-2xl hover:shadow-md transition-all">
                      <img src={item.img} className="w-20 h-20 rounded-xl object-cover" alt={item.name} />
                      <div className="flex-1">
                        <h4 className="font-bold text-lg dark:text-white">{item.name}</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                        <p className="text-primary font-bold text-lg">₹{item.price}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                        >
                          <i className="fas fa-minus text-sm"></i>
                        </button>
                        <span className="font-bold text-lg w-8 text-center dark:text-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-colors"
                        >
                          <i className="fas fa-plus text-sm"></i>
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-red-500 hover:text-red-700 p-2 transition-colors"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address Selection */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-primary"></i>
                    Delivery Address
                  </h3>
                  {savedAddresses.length > 0 && (
                    <button
                      onClick={() => navigate('/my-addresses')}
                      className="text-sm text-primary hover:text-primary/80 font-semibold"
                    >
                      <i className="fas fa-cog mr-1"></i>
                      Manage Addresses
                    </button>
                  )}
                </div>

                {savedAddresses.length === 0 ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-xl flex items-start gap-3">
                      <i className="fas fa-info-circle mt-0.5"></i>
                      <div>
                        <p className="font-semibold mb-1">No saved addresses</p>
                        <p className="text-sm">Enter your delivery address below or save it for future orders.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate('/my-addresses')}
                        className="flex-1 py-3 px-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all"
                      >
                        <i className="fas fa-plus mr-2"></i>
                        Save Address for Future
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Saved Addresses */}
                    <div className="space-y-3">
                      {savedAddresses.map((address) => (
                        <div
                          key={address.id}
                          onClick={() => {
                            setSelectedAddressId(address.id)
                            setUseNewAddress(false)
                          }}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            !useNewAddress && selectedAddressId === address.id
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 dark:border-slate-600 hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="address"
                              checked={!useNewAddress && selectedAddressId === address.id}
                              onChange={() => {
                                setSelectedAddressId(address.id)
                                setUseNewAddress(false)
                              }}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold text-gray-900 dark:text-white">
                                  {address.label}
                                </span>
                                {address.is_default && (
                                  <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {address.street}, {address.city}, {address.state} {address.postal_code}
                              </p>
                              {address.delivery_instructions && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">
                                  Note: {address.delivery_instructions}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Use Different Address Option */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-slate-600"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400">
                          Or
                        </span>
                      </div>
                    </div>

                    <div
                      onClick={() => setUseNewAddress(true)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        useNewAddress
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 dark:border-slate-600 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="address"
                          checked={useNewAddress}
                          onChange={() => setUseNewAddress(true)}
                        />
                        <div>
                          <span className="font-bold text-gray-900 dark:text-white">
                            <i className="fas fa-plus-circle mr-2 text-primary"></i>
                            Use a different address
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* New Address Form */}
                {useNewAddress && (
                  <div className="mt-6 p-6 bg-gray-50 dark:bg-slate-700/50 rounded-xl space-y-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                      Enter Delivery Address
                    </h4>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        <i className="fas fa-map-marker-alt mr-2 text-primary"></i>
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={newAddress.street}
                        onChange={handleNewAddressChange}
                        className="input-field"
                        placeholder="123 Main Street, Apartment 4B"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          <i className="fas fa-city mr-2 text-primary"></i>
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={newAddress.city}
                          onChange={handleNewAddressChange}
                          className="input-field"
                          placeholder="Mumbai"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          <i className="fas fa-map mr-2 text-primary"></i>
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={newAddress.state}
                          onChange={handleNewAddressChange}
                          className="input-field"
                          placeholder="Maharashtra"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          <i className="fas fa-mail-bulk mr-2 text-primary"></i>
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          name="postal_code"
                          value={newAddress.postal_code}
                          onChange={handleNewAddressChange}
                          className="input-field"
                          placeholder="400001"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        <i className="fas fa-globe mr-2 text-primary"></i>
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={newAddress.country}
                        onChange={handleNewAddressChange}
                        className="input-field"
                        placeholder="India"
                        required
                      />
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-xl text-sm">
                      <i className="fas fa-lightbulb mr-2"></i>
                      <strong>Tip:</strong> Save this address to your account for faster checkout next time!
                    </div>
                  </div>
                )}
              </div>

              {/* Customer Information */}
              <div className="card">
                <h3 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
                  <i className="fas fa-user text-primary"></i>
                  Delivery Information
                </h3>
                <form className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">City</label>
                    <input 
                      type="text" 
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Address</label>
                    <textarea 
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      className="input-field"
                      rows="3"
                      placeholder="Enter your complete address"
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="card sticky top-24">
                <h3 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
                  <i className="fas fa-receipt text-primary"></i>
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? 'text-green-500 font-semibold' : ''}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Tax (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  {subtotal < 500 && (
                    <div className="text-sm text-blue-600 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <i className="fas fa-info-circle mr-2"></i>
                      Add ₹{500 - subtotal} more for free delivery!
                    </div>
                  )}
                  <div className="border-t border-gray-200 dark:border-slate-600 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold dark:text-white">Total</span>
                      <span className="text-2xl font-black text-primary">₹{total}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <h4 className="font-bold mb-4 dark:text-white">Payment Method</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-slate-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-primary"
                      />
                      <i className="fas fa-credit-card text-primary"></i>
                      <span className="dark:text-white">Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-slate-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-primary"
                      />
                      <i className="fas fa-mobile-alt text-primary"></i>
                      <span className="dark:text-white">UPI Payment</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-slate-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-primary"
                      />
                      <i className="fas fa-money-bill-wave text-primary"></i>
                      <span className="dark:text-white">Cash on Delivery</span>
                    </label>
                  </div>
                </div>

                <button 
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-primary to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <i className="fas fa-lock"></i>
                  Place Order - ₹{total}
                </button>
                
                <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
                  <i className="fas fa-shield-alt text-green-500"></i>
                  <span>Secure & encrypted payment</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Checkout