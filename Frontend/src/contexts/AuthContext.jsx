import React, { createContext, useState, useEffect } from 'react'
import * as authService from '../services/authService'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')
    const tokenExpiry = localStorage.getItem('tokenExpiry')

    if (token && userStr) {
      // Check if token is expired
      if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
        // Token expired, clear storage and logout
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('tokenExpiry')
        setUser(null)
      } else {
        // Token still valid, restore user
        try {
          setUser(JSON.parse(userStr))
        } catch (e) {
          setUser(null)
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          localStorage.removeItem('tokenExpiry')
        }
      }
    }
    setLoading(false)
    setIsInitialized(true)
  }, [])

  const login = async (identifire, password) => {
    setLoading(true)
    try {
      const res = await authService.login({ identifire, password })
      if (res && res.success) {
        // Store token with 7-day expiry
        const expiryTime = Date.now() + 7 * 24 * 60 * 60 * 1000
        localStorage.setItem('token', '1')
        localStorage.setItem('user', JSON.stringify(res.user))
        localStorage.setItem('tokenExpiry', expiryTime.toString())
        setUser(res.user)
      }
      setLoading(false)
      return res
    } catch (err) {
      setLoading(false)
      throw err
    }
  }

  const signup = async (payload) => {
    setLoading(true)
    try {
      const res = await authService.signup(payload)
      if (res && res.success) {
        // Store token with 7-day expiry
        const expiryTime = Date.now() + 7 * 24 * 60 * 60 * 1000
        localStorage.setItem('token', '1')
        localStorage.setItem('user', JSON.stringify(res.user))
        localStorage.setItem('tokenExpiry', expiryTime.toString())
        setUser(res.user)
      }
      setLoading(false)
      return res
    } catch (err) {
      setLoading(false)
      throw err
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (e) {
      /* ignore */
    }
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('tokenExpiry')
    setUser(null)
  }

  // Register logout callback with authService for 401 handling
  useEffect(() => {
    if (isInitialized) {
      authService.setLogoutCallback(logout)
    }
  }, [isInitialized])

  // Check token expiry periodically (every minute)
  useEffect(() => {
    if (!isInitialized) return

    const interval = setInterval(() => {
      const tokenExpiry = localStorage.getItem('tokenExpiry')
      if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
        logout()
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [isInitialized])

  const value = {
    user,
    loading: loading && !isInitialized,
    isInitialized,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
