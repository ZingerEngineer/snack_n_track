// src/composables/useSocialLogin.js
import { ref } from 'vue'
import { SocialLogin, type GoogleLoginResponse } from '@capgo/capacitor-social-login'

export function useSocialLogin() {
  const webClientId = import.meta.env.VITE_GOOGLE_WEB_CLIENT_ID_SECRET

  const user = ref<GoogleLoginResponse | null>(null)
  const error = ref<Error | null>(null)
  const isInitialized = ref(false)

  /**
   * Initialize the Social Login plugin.
   * For Google, pass in your webClientId (and optionally iOSClientId/iOSServerClientId for iOS).
   */
  async function initialize(options = { google: { webClientId } }) {
    try {
      await SocialLogin.initialize(options)
      isInitialized.value = true
    } catch (err) {
      console.log(err)
      console.error('SocialLogin initialization error:', err)
      error.value = err as Error
    }
  }

  /**
   * Login using Google provider.
   * Optionally accepts an array of scopes.
   */
  async function loginWithGoogle(scopes = ['email', 'profile']) {
    if (!isInitialized.value) {
      await initialize() // you can pass default options here or call initialize externally
    }
    try {
      // Note: If you require sensitive scopes, check your configuration as scopes may be omitted.
      const res = await SocialLogin.login({
        provider: 'google',
        options: {
          // Remove scopes if you encounter issues with them.
          scopes,
        },
      })
      // The result contains the access token, id token, and profile information.
      user.value = res.result
      console.log('SocialLogin login result:', res)
      return res
    } catch (err) {
      console.log(err)
      console.error('SocialLogin login error:', err)
      // error.value = err
      throw err
    }
  }

  /**
   * Logout from the specified provider.
   * Currently supports 'google', 'apple', or 'facebook'.
   */
  async function logout(provider: 'facebook' | 'google' | 'apple' = 'google') {
    try {
      await SocialLogin.logout({ provider })
      user.value = null
    } catch (err) {
      console.log(err)

      console.error('SocialLogin logout error:', err)
      // error.value = err
    }
  }

  return {
    user,
    error,
    initialize,
    loginWithGoogle,
    logout,
  }
}
