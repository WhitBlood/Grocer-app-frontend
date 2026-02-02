import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h4 className="text-2xl font-bold mb-4 text-gradient">FreshMart</h4>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Premium groceries delivered fresh to your doorstep. Quality you can trust, convenience you'll love.
          </p>
          <div className="flex gap-4">
            <a 
              href="#" 
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-all transform hover:scale-110"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-all transform hover:scale-110"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-all transform hover:scale-110"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-all transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        
        {/* Quick Links */}
        <div>
          <h5 className="font-bold mb-4 text-lg">Quick Links</h5>
          <ul className="space-y-3 text-gray-300">
            <li>
              <Link to="/" className="hover:text-primary transition-colors flex items-center gap-2">
                <i className="fas fa-home text-sm"></i>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary transition-colors flex items-center gap-2">
                <i className="fas fa-info-circle text-sm"></i>
                About Us
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                <i className="fas fa-envelope text-sm"></i>
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                <i className="fas fa-question-circle text-sm"></i>
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                <i className="fas fa-headset text-sm"></i>
                Support
              </a>
            </li>
          </ul>
        </div>
        
        {/* Categories */}
        <div>
          <h5 className="font-bold mb-4 text-lg">Categories</h5>
          <ul className="space-y-3 text-gray-300">
            <li>
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                <i className="fas fa-apple-alt text-sm"></i>
                Fresh Produce
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                <i className="fas fa-cheese text-sm"></i>
                Dairy & Eggs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                <i className="fas fa-fish text-sm"></i>
                Meat & Seafood
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                <i className="fas fa-bread-slice text-sm"></i>
                Bakery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                <i className="fas fa-seedling text-sm"></i>
                Organic
              </a>
            </li>
          </ul>
        </div>
        
        {/* Contact Info */}
        <div>
          <h5 className="font-bold mb-4 text-lg">Contact Info</h5>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <i className="fas fa-phone text-primary text-sm"></i>
              </div>
              <div>
                <p className="text-sm text-gray-400">Call us</p>
                <p className="font-semibold">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <i className="fas fa-envelope text-primary text-sm"></i>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email us</p>
                <p className="font-semibold">hello@freshmart.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <i className="fas fa-map-marker-alt text-primary text-sm"></i>
              </div>
              <div>
                <p className="text-sm text-gray-400">Visit us</p>
                <p className="font-semibold">Mumbai, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-center md:text-left">
            &copy; 2024 FreshMart. All rights reserved. Made with ❤️ for fresh food lovers.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer