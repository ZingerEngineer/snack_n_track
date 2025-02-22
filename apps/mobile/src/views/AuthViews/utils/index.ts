import { SocialLogin } from '@capgo/capacitor-social-login'
import type { Ref } from 'vue'

const handleGoogleLogin = async () => {
  try {
    const res = await SocialLogin.login({
      provider: 'google',
      options: {
        scopes: ['email', 'profile'],
      },
    })
    // handle the response. popoutStore is specific to my app
    console.log('Google login response:', res)
  } catch (error) {
    console.log(error)
    console.error('Google login failed:', error)
  }
}

const togglePasswordVisibility = (passwordVisibilityBoolean: Ref<boolean>) => {
  passwordVisibilityBoolean.value = !passwordVisibilityBoolean.value
}

export { handleGoogleLogin, togglePasswordVisibility }
