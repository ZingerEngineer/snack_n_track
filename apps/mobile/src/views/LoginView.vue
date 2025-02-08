<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import ToastService from '../services/ToastService'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const { login } = useAuthStore()

const router = useRouter()
// Define Zod validation schemas
const emailSchema = zod
  .string()
  .min(1, { message: 'This is required' })
  .email({ message: 'Must be a valid email' })

const passwordSchema = zod.string().min(1, { message: 'This is required' })

// Combine schemas
const validationSchema = toTypedSchema(
  zod.object({
    email: emailSchema,
    password: passwordSchema,
  }),
)

// Initialize Vee-Validate form
const { handleSubmit } = useForm({
  validationSchema,
})

// Fields with error messages
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  try {
    await login(values)
    ToastService.success('Login successful')
    router.push('/dashboard/home')
  } catch (error) {
    console.error('Login failed:', error)
    ToastService.error('Login failed')
  }
})
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="w-full flex justify-center items-center">
        <h2>Login</h2>
      </div>
      <ion-button router-link="/register" class="text-white">Register</ion-button>
      <div class="login-container">
        <h2>Welcome back!</h2>
        <form @submit.prevent="onSubmit">
          <!-- Email Input -->
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input class="mt-2" name="email" v-model="email" type="email"></ion-input>
            <span class="error-message">{{ emailError }}</span>
          </ion-item>

          <!-- Password Input -->
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input class="mt-2" name="password" v-model="password" type="password"></ion-input>
            <span class="error-message">{{ passwordError }}</span>
          </ion-item>

          <!-- Submit Button -->
          <ion-button expand="block" class="login-btn" type="submit">Login</ion-button>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

ion-item {
  --padding-start: 0;
  --border-color: #ddd;
  margin-bottom: 1rem;
}

.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.login-btn {
  --background: #00ff9d;
  margin-top: 2rem;
}
</style>
