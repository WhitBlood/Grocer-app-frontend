import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'

const Navbar = ({ onSearch }) => {
  const { getTotalItems } = useCart()
  const { isDark, toggleTheme } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // Check if user is logged in
  React.useEffect(() => {
    const userData = localStorage.getItem('freshmart_user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('freshmart_token')
    localStorage.removeItem('freshmart_user')
    setUser(null)
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchTerm)
    }
  }

  const totalItems = getTotalItems()

  return (
    <nav className="sticky top-0 z-50 glass-effect backdrop-blur-md border-b border-white/20 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-black text-gradient-green heading-display">
            <i className="fas fa-leaf mr-2"></i>FreshMart
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium">
            About
          </Link>
          <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium">
            Contact
          </a>
        </div>
        
        {/* Search Bar - Desktop */}
        {onSearch && (
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative flex-1">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 dark:border-slate-600 dark:text-white"
              />
            </form>
          </div>
        )}
        
        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          
          {/* Auth Buttons or User Menu */}
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/my-orders"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium"
              >
                <i className="fas fa-shopping-bag mr-1"></i>
                Orders
              </Link>
              <Link
                to="/my-addresses"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium"
              >
                <i className="fas fa-map-marker-alt mr-1"></i>
                Addresses
              </Link>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Hi, <span className="font-semibold">{user.username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="btn-secondary text-sm px-4 py-2"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className="btn-secondary text-sm px-4 py-2">
                <i className="fas fa-sign-in-alt mr-2"></i>
                Login
              </Link>
              <Link to="/register" className="btn-primary text-sm px-4 py-2">
                <i className="fas fa-user-plus mr-2"></i>
                Sign Up
              </Link>
            </div>
          )}
          
          {/* Cart Button */}
          <Link 
            to="/checkout" 
            className="btn-warning flex items-center gap-2"
          >
            <i className="fas fa-shopping-cart"></i>
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="bg-white text-orange-600 px-2 py-1 rounded-full text-xs font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-white/20">
          <div className="flex flex-col gap-4 mt-4">
            {/* Mobile Search */}
            {onSearch && (
              <form onSubmit={handleSearch} className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 dark:border-slate-600 dark:text-white"
                />
              </form>
            )}
            
            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-2">
              <Link 
                to="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              {user && (
                <>
                  <Link 
                    to="/my-orders" 
                    className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className="fas fa-shopping-bag mr-2"></i>
                    My Orders
                  </Link>
                  <Link 
                    to="/my-addresses" 
                    className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    My Addresses
                  </Link>
                </>
              )}
              <a 
                href="#" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar