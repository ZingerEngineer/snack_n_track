// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IUser, ILoginCredentials, IRegisterCredentials } from '../../../types/user/user.types'
import fetcher from '../../../utils/server/fetcher'
import ToastService from '../../../services/toast.service'
import { useRouter } from 'vue-router'
import { useLoadingStore } from '../../components/loading.store'
import type { ILoginResults } from '../../../schemas/user/user.auth'
import PreferencesService from '../../../apis/mobile/usePreferences'
import z from 'zod'
import { UserSchema } from '../../../schemas/user/user.zod'

const LoginResultsSchema: z.ZodType<ILoginResults> = z.object({
  user: z.object({
    name: z.string().nullable(),
    email: z.string().nullable(),
    avatar: z.string().nullable(),
    age: z.number().nullable(),
    gender: z.string().nullable(),
  }),
  accessToken: z.string(),
  refreshToken: z.string(),
})

const RegisterResultsSchema = z.object({
  status: z.string(),
})

const LogoutResultsSchema = z.object({
  status: z.string(),
})

export const useAuthStore = defineStore('auth', () => {
  const loadingStore = useLoadingStore()
  const router = useRouter()
  // State
  const user = ref<IUser | null>(null)
  const accessToken = ref<string>('')
  const refreshToken = ref<string>('')

  const isAuthenticated = computed(() => !!user.value)

  // Initialize: Check session if token exists but user data is missing
  const initializeAuth = async () => {
    if (accessToken.value && !user.value) {
      try {
        const data = await fetcher('auth/session', {
          method: 'GET',
          credentials: 'include',
          contentType: 'application/json',
        })

        user.value = data as IUser
        await PreferencesService.setItem('user', JSON.stringify(user.value))
      } catch (error) {
        console.error('Session expired or invalid:', error)
        logout()
      }
    }
  }

  // Login method
  const login = async (credentials: ILoginCredentials) => {
    try {
      loadingStore.startLoading()
      const data = await fetcher('auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        contentType: 'application/json',
      })
      const loginResults = LoginResultsSchema.parse(data)
      accessToken.value = loginResults.accessToken
      refreshToken.value = loginResults.refreshToken
      user.value = loginResults.user
      // Store in localStorage
      PreferencesService.setItem('accessToken', accessToken.value)
      PreferencesService.setItem('refreshToken', refreshToken.value)
      PreferencesService.setItem('user', JSON.stringify(user.value))
      ToastService.success('Logged in.')
    } catch (error) {
      console.log(error)
      ToastService.error('Login failure')
    } finally {
      loadingStore.stopLoading()
    }
  }

  // Register method
  const register = async (credentials: IRegisterCredentials) => {
    try {
      loadingStore.startLoading()
      const data = await fetcher('auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        contentType: 'application/json',
      })
      const registerResults = RegisterResultsSchema.parse(data)
      if (registerResults.status === 'success') {
        ToastService.success('Register success')
        router.push('/login')
      }
    } catch {
      ToastService.error('Register failure')
    } finally {
      loadingStore.stopLoading()
    }
  }

  // Logout method
  const logout = async () => {
    try {
      loadingStore.startLoading()
      const response = await fetcher('auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken.value}`,
        },
        credentials: 'include',
        contentType: 'application/json',
      })
      const logoutResults = LogoutResultsSchema.parse(response)
      if (logoutResults.status === 'success') {
        accessToken.value = ''
        user.value = null
        await PreferencesService.removeItem('accessToken')
        await PreferencesService.removeItem('refreshToken')
        await PreferencesService.removeItem('user')
        ToastService.success('Logged out.')
        router.push('/login')
      }
    } catch {
      ToastService.error('Logout failure')
    } finally {
      loadingStore.stopLoading()
    }
  }

  // Load user from localStorage if available
  const loadUserFromLocalStorage = async () => {
    try {
      const storedUser = await PreferencesService.getItem('user')
      if (!storedUser) return
      if (!storedUser.value) return
      const parsedUser = UserSchema.parse(JSON.parse(storedUser.value))
      user.value = parsedUser
    } catch {
      return
    }
  }

  const loadAccessTokenFromLocalStorage = async () => {
    try {
      const storedToken = await PreferencesService.getItem('accessToken')
      if (!storedToken) return
      if (!storedToken.value) return
      accessToken.value = storedToken.value
    } catch {
      return
    }
  }

  const loadRefreshTokenFromLocalStorage = async () => {
    try {
      const storedToken = await PreferencesService.getItem('refreshToken')
      if (!storedToken) return
      if (!storedToken.value) return
      refreshToken.value = storedToken.value
    } catch {
      return
    }
  }

  // Auto-load on store creation
  loadUserFromLocalStorage()
  loadAccessTokenFromLocalStorage()
  loadRefreshTokenFromLocalStorage()
  return {
    user,
    accessToken,
    isAuthenticated,
    login,
    register,
    logout,
    initializeAuth,
  }
})
