import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <div className="text-9xl font-black text-primary mb-4">404</div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been moved, 
            deleted, or you entered the wrong URL.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              <i className="fas fa-home mr-2"></i>
              Go Home
            </button>
            <button 
              onClick={() => navigate(-1)}
              className="btn-secondary"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Go Back
            </button>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="mt-12 opacity-20">
          <div className="flex gap-8 text-6xl">
            <i className="fas fa-shopping-cart"></i>
            <i className="fas fa-apple-alt"></i>
            <i className="fas fa-leaf"></i>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default NotFound