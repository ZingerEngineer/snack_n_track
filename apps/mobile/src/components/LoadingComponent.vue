<template>
  <div v-if="isLoading" class="loading-overlay">
    <div
      class="flex flex-col items-center justify-center bg-medium p-2 rounded-lg min-w-52 min-h-40"
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
      <div class="loading-message">{{ currentMessage }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useLoadingStore } from '../stores/components/loading.store'

const loadingStore = useLoadingStore()
const { isLoading } = storeToRefs(loadingStore)

const messages = ref(['Loading…', 'Please wait…', 'Almost there…'])
const currentMessage = ref(messages.value[0])
let messageIndex = 0
let intervalId: ReturnType<typeof setInterval>

onMounted(() => {
  intervalId = setInterval(() => {
    messageIndex = (messageIndex + 1) % messages.value.length
    currentMessage.value = messages.value[messageIndex]
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
  margin-top: 1rem;
  font-size: 1rem;
}
</style>
