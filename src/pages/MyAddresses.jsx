import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LoadingSpinner from '../components/LoadingSpinner'
import API_BASE_URL from '../config/api'

const MyAddresses = () => {
  const navigate = useNavigate()
  const [addresses, setAddresses] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    label: 'Home',
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India',
    is_default: false,
    delivery_instructions: ''
  })

  useEffect(() => {
    document.title = '📍 My Addresses | FreshMart'
    
    // Check if user is logged in
    const token = localStorage.getItem('freshmart_token')
    if (!token) {
      navigate('/login')
      return
    }

    fetchAddresses()
  }, [navigate])

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('freshmart_token')
      const response = await fetch(`${API_BASE_URL}/addresses/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setAddresses(data)
      } else if (response.status === 401) {
        localStorage.removeItem('freshmart_token')
        localStorage.removeItem('freshmart_user')
        navigate('/login')
      } else {
        setError('Failed to load addresses')
      }
    } catch (err) {
      setError('Failed to connect to server')
      console.error('Error fetching addresses:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      const token = localStorage.getItem('freshmart_token')
      
      if (editingAddress !== null) {
        // Update existing address
        const response = await fetch(`${API_BASE_URL}/addresses/${editingAddress.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })

        if (response.ok) {
          await fetchAddresses()
        } else {
          setError('Failed to update address')
        }
      } else {
        // Create new address
        const response = await fetch(`${API_BASE_URL}/addresses/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })

        if (response.ok) {
          await fetchAddresses()
        } else {
          setError('Failed to save address')
        }
      }

      // Reset form
      setFormData({
        label: 'Home',
        street: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'India',
        is_default: false,
        delivery_instructions: ''
      })
      setShowAddForm(false)
      setEditingAddress(null)
    } catch (err) {
      setError('Failed to connect to server')
      console.error('Error saving address:', err)
    }
  }

  const handleEdit = (address) => {
    setEditingAddress(address)
    setFormData({
      label: address.label,
      street: address.street,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
      is_default: address.is_default,
      delivery_instructions: address.delivery_instructions || ''
    })
    setShowAddForm(true)
  }

  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        const token = localStorage.getItem('freshmart_token')
        const response = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok || response.status === 204) {
          await fetchAddresses()
        } else {
          setError('Failed to delete address')
        }
      } catch (err) {
        setError('Failed to connect to server')
        console.error('Error deleting address:', err)
      }
    }
  }

  const handleSetDefault = async (addressId) => {
    try {
      const token = localStorage.getItem('freshmart_token')
      const response = await fetch(`${API_BASE_URL}/addresses/${addressId}/set-default`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        await fetchAddresses()
      } else {
        setError('Failed to set default address')
      }
    } catch (err) {
      setError('Failed to connect to server')
      console.error('Error setting default address:', err)
    }
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setEditingAddress(null)
    setError('')
    setFormData({
      label: 'Home',
      street: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'India',
      is_default: false,
      delivery_instructions: ''
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner size="large" text="Loading addresses..." />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
              📍 My Addresses
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your delivery addresses
            </p>
          </div>
          
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary px-6 py-3"
            >
              <i className="fas fa-plus mr-2"></i>
              Add New Address
            </button>
          )}
        </div>

        {/* Add/Edit Address Form */}
        {showAddForm && (
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {editingAddress !== null ? 'Edit Address' : 'Add New Address'}
            </h2>
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl mb-6 flex items-center">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    <i className="fas fa-tag mr-2 text-primary"></i>
                    Address Label *
                  </label>
                  <select
                    name="label"
                    value={formData.label}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    <i className="fas fa-globe mr-2 text-primary"></i>
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="India"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  <i className="fas fa-map-marker-alt mr-2 text-primary"></i>
                  Street Address *
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="123 Main Street, Apartment 4B"
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    <i className="fas fa-city mr-2 text-primary"></i>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
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
                    value={formData.state}
                    onChange={handleChange}
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
                    value={formData.postal_code}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="400001"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  <i className="fas fa-sticky-note mr-2 text-primary"></i>
                  Delivery Instructions (Optional)
                </label>
                <textarea
                  name="delivery_instructions"
                  value={formData.delivery_instructions}
                  onChange={handleChange}
                  className="input-field"
                  rows="3"
                  placeholder="e.g., Ring the doorbell twice, Leave at the door"
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_default"
                  name="is_default"
                  checked={formData.is_default}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="is_default" className="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  Set as default delivery address
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 font-bold"
                >
                  <i className="fas fa-save mr-2"></i>
                  {editingAddress !== null ? 'Update Address' : 'Save Address'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 py-3 px-4 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Address List */}
        {addresses.length === 0 ? (
          <div className="text-center py-16">
            <i className="fas fa-map-marked-alt text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No addresses yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Add your first delivery address to get started
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border-2 transition-all ${
                  address.is_default
                    ? 'border-primary shadow-primary/20'
                    : 'border-white/20 hover:border-primary/50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-emerald-600 rounded-xl flex items-center justify-center">
                      <i className={`fas ${
                        address.label === 'Home' ? 'fa-home' :
                        address.label === 'Work' ? 'fa-briefcase' :
                        'fa-map-marker-alt'
                      } text-white text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {address.label}
                      </h3>
                      {address.is_default && (
                        <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(address)}
                      className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all"
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="w-8 h-8 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
                      title="Delete"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p className="flex items-start gap-2">
                    <i className="fas fa-map-marker-alt mt-1 text-primary"></i>
                    <span>{address.street}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-city text-primary"></i>
                    <span>{address.city}, {address.state} {address.postal_code}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-globe text-primary"></i>
                    <span>{address.country}</span>
                  </p>
                  {address.delivery_instructions && (
                    <p className="flex items-start gap-2 text-sm italic">
                      <i className="fas fa-sticky-note mt-1 text-primary"></i>
                      <span>{address.delivery_instructions}</span>
                    </p>
                  )}
                </div>

                {!address.is_default && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="mt-4 w-full py-2 text-sm border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default MyAddresses
