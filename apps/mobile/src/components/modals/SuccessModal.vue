<template>
  <div class="success-modal bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl">
    <!-- Close button -->
    <button
      v-if="showCloseButton"
      @click="handleClose"
      class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold w-6 h-6 flex items-center justify-center"
      aria-label="Close modal"
    >
      ×
    </button>

    <div class="flex flex-col items-center gap-4">
      <!-- Success Icon with animation -->
      <div class="success-icon-container">
        <FontAwesomeIcon :icon="faCheckCircle" class="text-4xl text-green-500 success-icon" />
      </div>

      <div class="text-center">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ title }}</h3>
        <p class="text-sm text-gray-600 leading-relaxed">{{ message }}</p>

        <!-- Progress bar for auto-close -->
        <div v-if="autoCloseDelay > 0" class="mt-4 w-full">
          <div class="w-full bg-gray-200 rounded-full h-1 mb-2">
            <div
              class="bg-green-500 h-1 rounded-full transition-all ease-linear"
              :style="{
                width: `${autoCloseProgress}%`,
                transitionDuration: `${autoCloseDelay}ms`,
              }"
            ></div>
          </div>
          <p class="text-xs text-gray-500">
            Auto-closing in {{ Math.ceil(remainingTime / 1000) }}s
          </p>
        </div>

        <!-- Action button -->
        <div v-if="showActionButton" class="mt-4">
          <IonButton @click="handleClose" class="w-full">
            {{ actionButtonText }}
          </IonButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { IonButton } from '@ionic/vue'

interface Props {
  modalId?: string
  title?: string
  message: string
  showCloseButton?: boolean
  showActionButton?: boolean
  actionButtonText?: string
  autoCloseDelay?: number
  onClose?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Success!',
  showCloseButton: true,
  showActionButton: false,
  actionButtonText: 'OK',
  autoCloseDelay: 0,
})

const emit = defineEmits<{
  close: []
}>()

const autoCloseProgress = ref(0)
const remainingTime = ref(props.autoCloseDelay)
let autoCloseTimer: ReturnType<typeof setTimeout> | null = null
let progressInterval: ReturnType<typeof setInterval> | null = null

const handleClose = () => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
  }
  if (progressInterval) {
    clearInterval(progressInterval)
  }

  if (props.onClose) {
    props.onClose()
  }
  emit('close')
}

onMounted(() => {
  if (props.autoCloseDelay > 0) {
    // Start auto-close timer
    autoCloseTimer = setTimeout(() => {
      handleClose()
    }, props.autoCloseDelay)

    // Update progress bar
    const startTime = Date.now()
    progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = (elapsed / props.autoCloseDelay) * 100
      autoCloseProgress.value = Math.min(progress, 100)
      remainingTime.value = Math.max(props.autoCloseDelay - elapsed, 0)

      if (progress >= 100) {
        if (progressInterval) {
          clearInterval(progressInterval)
        }
      }
    }, 50)
  }
})

onUnmounted(() => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
  }
  if (progressInterval) {
    clearInterval(progressInterval)
  }
})
</script>

<style scoped>
.success-modal {
  position: relative;
  animation: successModalSlideIn 0.3s ease-out;
}

.success-icon-container {
  padding: 0.5rem;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.1);
}

.success-icon {
  animation: successBounce 0.6s ease-out;
}

@keyframes successModalSlideIn {
  from {
    transform: scale(0.9) translateY(-10px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

@keyframes successBounce {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Close button hover effect */
.success-modal button:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

/* Progress bar styling */
.bg-green-500 {
  background-color: #22c55e;
}
</style>
