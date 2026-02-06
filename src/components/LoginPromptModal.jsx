import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPromptModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleLogin = () => {
    onClose()
    navigate('/login')
  }

  const handleRegister = () => {
    onClose()
    navigate('/register')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all">
        <div className="text-center mb-6">
          <div className="inline-block p-4 bg-gradient-to-r from-primary to-emerald-600 rounded-2xl mb-4">
            <i className="fas fa-lock text-4xl text-white"></i>
          </div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
            Login Required
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Please login or create an account to add items to your cart
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleLogin}
            className="w-full btn-primary py-3 text-lg font-bold"
          >
            <i className="fas fa-sign-in-alt mr-2"></i>
            Login to Continue
          </button>
          
          <button
            onClick={handleRegister}
            className="w-full py-3 px-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-200"
          >
            <i className="fas fa-user-plus mr-2"></i>
            Create New Account
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPromptModal
