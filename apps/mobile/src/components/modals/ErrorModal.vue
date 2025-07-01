<template>
  <div class="error-modal bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl">
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
      <!-- Error Icon with animation -->
      <div class="error-icon-container">
        <FontAwesomeIcon
          :icon="faExclamationTriangle"
          class="text-4xl text-red-500 animate-pulse"
        />
      </div>

      <div class="text-center">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ title }}</h3>
        <p class="text-sm text-gray-600 mb-4 leading-relaxed">{{ message }}</p>

        <!-- Additional error details if provided -->
        <div v-if="details" class="bg-gray-50 rounded p-3 mb-4 text-xs text-gray-500">
          <details>
            <summary class="cursor-pointer font-medium">Error Details</summary>
            <pre class="mt-2 whitespace-pre-wrap">{{ details }}</pre>
          </details>
        </div>

        <!-- Action buttons -->
        <div class="flex gap-2">
          <IonButton
            fill="outline"
            @click="handleRetry"
            class="flex-1"
            v-if="showRetry"
            :disabled="retryDisabled"
          >
            <span v-if="!retryLoading">Retry</span>
            <IonSpinner v-else name="crescent" class="w-4 h-4"></IonSpinner>
          </IonButton>

          <IonButton color="danger" @click="handleReset" class="flex-1" v-if="showReset">
            Reset
          </IonButton>

          <IonButton @click="handleClose" class="flex-1" v-if="!showRetry && !showReset">
            Close
          </IonButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { IonButton, IonSpinner } from '@ionic/vue'

interface Props {
  modalId?: string
  title?: string
  message: string
  details?: string
  showRetry?: boolean
  showReset?: boolean
  showCloseButton?: boolean
  retryDisabled?: boolean
  onRetry?: () => void | Promise<void>
  onReset?: () => void | Promise<void>
  onClose?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Error',
  showRetry: false,
  showReset: false,
  showCloseButton: true,
  retryDisabled: false,
})

const emit = defineEmits<{
  close: []
  'update-props': [props: Record<string, unknown>]
}>()

const retryLoading = ref(false)

const handleClose = () => {
  if (props.onClose) {
    props.onClose()
  }
  emit('close')
}

const handleRetry = async () => {
  if (props.onRetry) {
    retryLoading.value = true
    try {
      await props.onRetry()
    } finally {
      retryLoading.value = false
    }
  }
  emit('close')
}

const handleReset = async () => {
  if (props.onReset) {
    await props.onReset()
  }
  emit('close')
}
</script>

<style scoped>
.error-modal {
  position: relative;
  animation: errorModalSlideIn 0.3s ease-out;
}

.error-icon-container {
  padding: 0.5rem;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.1);
}

@keyframes errorModalSlideIn {
  from {
    transform: scale(0.9) translateY(-10px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

/* Animate pulse for error icon */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}

/* Close button hover effect */
.error-modal button:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

/* Error details styling */
details summary {
  list-style: none;
}

details summary::-webkit-details-marker {
  display: none;
}

details[open] summary::after {
  content: ' ▲';
}

details summary::after {
  content: ' ▼';
}
</style>
