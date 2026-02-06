import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return action.payload
    
    case 'ADD_TO_CART':
      const existingItem = state.find(item => item.id === action.payload.id)
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        )
      }
      return [...state, { ...action.payload, quantity: action.payload.quantity || 1, cartId: Date.now() }]
    
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.cartId === action.payload.cartId
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
    
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.cartId !== action.payload.cartId)
    
    case 'CLEAR_CART':
      return []
    
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [])

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('freshmart_cart')) || []
    dispatch({ type: 'LOAD_CART', payload: savedCart })
  }, [])

  useEffect(() => {
    localStorage.setItem('freshmart_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, quantity = 1, onAuthRequired) => {
    // Check if user is logged in
    const token = localStorage.getItem('freshmart_token')
    const user = localStorage.getItem('freshmart_user')
    
    if (!token || !user) {
      // User is not logged in, trigger auth required callback
      if (onAuthRequired) {
        onAuthRequired()
      }
      return false
    }
    
    // User is logged in, add to cart
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } })
    return true
  }

  const updateQuantity = (cartId, quantity) => {
    if (quantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: { cartId } })
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { cartId, quantity } })
    }
  }

  const removeFromCart = (cartId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { cartId } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}