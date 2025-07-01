<template>
  <div class="bg-white rounded-lg p-6 m-4 max-w-sm w-full relative">
    <!-- Close button (optional, only shown if allowClose is true) -->
    <button
      v-if="allowClose"
      @click="$emit('close')"
      class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      aria-label="Close"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>

    <div class="flex flex-col items-center gap-4">
      <IonSpinner name="crescent" class="w-12 h-12 text-primary"></IonSpinner>
      <div class="text-center">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ title }}</h3>
        <div class="w-full bg-gray-200 rounded-full h-2 mb-2" v-if="showProgress">
          <div
            class="bg-primary h-2 rounded-full transition-all duration-300"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
        <p class="text-sm text-gray-600">
          {{ message }}
          <span v-if="showProgress && progress !== undefined">
            - {{ Math.round(progress) }}% complete</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonSpinner } from '@ionic/vue'

interface Props {
  title: string
  message: string
  progress?: number
  showProgress?: boolean
  allowClose?: boolean
  modalId?: string
}

// Define emits
defineEmits<{
  close: []
}>()

withDefaults(defineProps<Props>(), {
  progress: 0,
  showProgress: false,
  allowClose: false,
})
</script>
