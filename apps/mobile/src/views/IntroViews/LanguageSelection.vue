<template>
  <div class="w-full flex flex-col justify-center items-center mb-12">
    <img src="../../assets/welcome_group.svg" alt="Background" class="w-40 h-auto sm:w-60" />
    <img src="../../assets/snackntracklogo.svg" alt="Background" class="w-40 h-auto sm:w-60" />
  </div>
  <div
    id="title"
    class="px-4 sm:px-5 w-full flex flex-col justify-center items-center max-w-[18rem] sm:max-w-full"
  >
    <h1 class="-rotate-3 text-left w-full text-3xl sm:text-5xl font-bold">Welcome!</h1>
    <h1 class="rotate-3 text-right w-full text-3xl sm:text-5xl font-bold">!اهلاً بيك</h1>
  </div>
  <div id="text" class="px-4 py-2 sm:px-10 w-full flex flex-col justify-center items-center">
    <p class="text-left font-semibold w-full mt-2 text-sm sm:text-lg">
      Which language do you prefer ?
    </p>
    <p class="text-right font-semibold w-full mt-2 text-sm sm:text-lg">
      ايه اللغة الي تحب تتكلم بيها ؟
    </p>
  </div>
  <div>
    <p class="text-gray-400 text-xs sm:text-sm text-center mt-2">
      Already have an account? <button @click="goToLogin" class="text-primary">Login</button>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}
</script>
