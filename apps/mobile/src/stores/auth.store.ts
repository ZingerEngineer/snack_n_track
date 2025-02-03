// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { type IUser, type ILoginCredentials } from '../types/user.types'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<IUser | null>(null)
  const token = ref<string>(localStorage.getItem('token') || '')
  const isAuthenticated = computed(() => !!user.value)

  // Initialize: Check session if token exists but user data is missing
  const initializeAuth = async () => {
    if (token.value && !user.value) {
      try {
        const response = await fetch('http://localhost:3000/v1/auth/session', {
          method: 'GET',
          credentials: 'include', // Ensure cookies are sent
        })

        if (!response.ok) {
          throw new Error('Session expired or invalid')
        }

        const data = await response.json()
        user.value = data.user
        localStorage.setItem('user', JSON.stringify(user.value))
      } catch (error) {
        console.error('Session expired or invalid:', error)
        logout()
      }
    }
  }

  // Login method
  const login = async (credentials: ILoginCredentials) => {
    try {
      const response = await fetch('http://localhost:3000/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      token.value = data.accessToken
      user.value = data.user
      // Store in localStorage
      localStorage.setItem('accessToken', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (error) {
      throw error
    }
  }

  // Logout method
  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3000/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        credentials: 'include',
      })
      if (response.ok) {
        user.value = null
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
      }
    } catch (error) {
      throw error
    }
  }

  // Load user from localStorage if available
  const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    } else {
      initializeAuth() // Call session API if user cleared localStorage manually
    }
  }

  // Auto-load on store creation
  loadUserFromLocalStorage()

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    initializeAuth,
  }
})
