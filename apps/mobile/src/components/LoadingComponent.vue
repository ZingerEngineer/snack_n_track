<template>
  <div v-if="isLoading" class="loading-overlay">
    <div
      class="flex flex-col items-center justify-center bg-medium p-6 rounded-lg min-w-64 min-h-48"
    >
      <div class="spinner">
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="var(--ion-color-secondary)"
            opacity="1"
            stroke-width="4"
            fill="none"
            stroke-dasharray="125.6"
            stroke-dashoffset="0"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="125.6"
              to="0"
              dur="2s"
              repeatCount="indefinite"
              keyTimes="0; 1"
              keySplines="0.42 0 0.58 1"
              calcMode="spline"
            />
          </circle>
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="var(--ion-color-primary)"
            opacity="0.5"
            stroke-width="4"
            fill="none"
          />
        </svg>
      </div>

      <!-- Progress Bar (if enabled) -->
      <div v-if="showProgress" class="w-full mt-4 mb-2">
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-primary h-2 rounded-full transition-all duration-300"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
        <p class="text-sm text-gray-600 mt-1 text-center">{{ progress }}% complete</p>
      </div>

      <!-- Message -->
      <div class="loading-message mt-4">{{ displayMessage }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useLoadingStore } from '../stores/components/loading.store'

const loadingStore = useLoadingStore()
const { isLoading, currentMessage, showProgress, progress } = storeToRefs(loadingStore)

const defaultMessages = ref(['Loading…', 'Please wait…', 'Almost there…'])
const currentDefaultMessageIndex = ref(0)
let intervalId: ReturnType<typeof setInterval>

// Display message - use custom message if available, otherwise cycle through default messages
const displayMessage = computed(() => {
  return currentMessage.value || defaultMessages.value[currentDefaultMessageIndex.value]
})

onMounted(() => {
  // Only cycle through default messages when no custom message is set
  intervalId = setInterval(() => {
    if (!currentMessage.value) {
      currentDefaultMessageIndex.value =
        (currentDefaultMessageIndex.value + 1) % defaultMessages.value.length
    }
  }, 4000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(71, 71, 71, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.spinner {
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading-message {
  font-size: 1rem;
  text-align: center;
  color: var(--ion-color-dark);
}
</style>
