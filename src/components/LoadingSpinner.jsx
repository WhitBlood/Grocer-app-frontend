import React from 'react'

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  }

  const textSizes = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-2xl'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} border-4 border-primary border-t-transparent rounded-full animate-spin mb-4`}></div>
      <h2 className={`${textSizes[size]} font-bold text-gray-700 dark:text-gray-300`}>
        {text}
      </h2>
    </div>
  )
}

export default LoadingSpinner