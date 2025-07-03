<script setup lang="ts">
import { IonPage, IonContent, IonInput, IonButton } from '@ionic/vue'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useAuthStore } from '../../stores/user/auth/auth.store'
import { useRouter } from 'vue-router'
import snackNTrackLogo from '../../assets/snackntracklogo.svg'
import { RegisterSchema } from '../../zodSchemas/user/user.zod'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'
import { togglePasswordVisibility } from './utils'

const router = useRouter()
const authStore = useAuthStore()
const showPassword = ref(false)
const validationSchema = toTypedSchema(RegisterSchema)

// Initialize Vee-Validate form
const { handleSubmit } = useForm({
  validationSchema,
})

const handleTogglePassword = () => {
  togglePasswordVisibility(showPassword)
}
// Fields with error messages
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    console.log(values)
    await authStore.register(values)
  } catch {
    return
  }
})
// Submit handler
</script>

<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div
        class="login-container min-h-full max-w-full flex flex-col justify-center items-center gap-4"
      >
        <img :src="snackNTrackLogo" alt="snack n track logo" />
        <p>
          Already using Snack n' track ?
          <span @click="router.push('/login')" class="text-primary">Login</span>
        </p>

        <form @submit.prevent="onSubmit" class="flex justify-center items-center gap-4 flex-col">
          <div class="flex flex-col justify-center w-full">
            <IonInput
              class="w-full"
              :helper-text="emailError ? '' : 'Enter your email.'"
              label-placement="floating"
              label="Email"
              inputmode="email"
              fill="outline"
              clearInput="true"
              name="email"
              v-model="email"
              type="email"
            ></IonInput>
            <div class="error-message">{{ emailError }}</div>
          </div>
          <!-- Password Input -->
          <div class="relative flex flex-col justify-center w-full">
            <IonInput
              :helper-text="passwordError ? '' : 'Enter your password.'"
              label-placement="floating"
              label="Password"
              inputmode="password"
              fill="outline"
              clearInput="true"
              name="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
            >
            </IonInput>
            <IonButton
              :class="[
                'w-8 h-8 absolute top-[0.7rem] z-50',
                password ? 'right-[3rem]' : 'right-[1rem]',
              ]"
              fill="clear"
              @click="handleTogglePassword"
            >
              <FontAwesomeIcon
                class="text-[1.1rem]"
                :icon="showPassword ? faEyeSlash : faEye"
              ></FontAwesomeIcon>
            </IonButton>
            <span class="error-message">{{ passwordError }}</span>
          </div>
          <IonButton class="login-button w-full" type="submit">Register</IonButton>
        </form>
      </div>
    </IonContent>
  </IonPage>
</template>

<style scoped>
h2 {
  margin-bottom: 1.5rem;
  color: #333;
}
IonInput {
  --border-radius: 0.5rem;
}
IonButton {
  --padding-top: 1rem;
  --padding-bottom: 1rem;
}

.error-message {
  color: var(--ion-color-danger);
  font-size: 0.8rem;
  margin-top: 0.25rem;
}
</style>
