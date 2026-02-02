import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart()
  const [showSuccess, setShowSuccess] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('card')

  const subtotal = getTotalPrice()
  const deliveryFee = subtotal > 500 ? 0 : 49
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + deliveryFee + tax

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => {
      clearCart()
      navigate('/')
    }, 3000)
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