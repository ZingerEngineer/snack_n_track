<!-- components/SelectedImageModal.vue -->
<template>
  <div class="min-w-72 flex flex-col gap-4 p-4 bg-white rounded-lg">
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl">{{ title }}</h1>
      <div class="w-full border-b-2 border-medium-shade/50"></div>
      <p class="text-dark-tint" v-if="lowerText">{{ lowerText }}</p>
    </div>

    <!-- Image Display Section -->
    <div class="flex justify-center items-center">
      <img
        class="w-52 border-2 rounded-lg border-medium-shade/50"
        v-if="hasImage"
        :src="imagePath ?? ''"
        alt="Selected image"
      />
      <div
        v-else
        class="w-52 h-32 border-2 rounded-lg border-medium-shade/50 flex items-center justify-center text-gray-400"
      >
        No image selected
      </div>
    </div>

    <!-- Compression Stats (if available) -->
    <div v-if="compressionStats" class="bg-gray-50 rounded-lg p-3">
      <h3 class="text-sm font-semibold text-gray-700 mb-2">Compression Info</h3>
      <div class="grid grid-cols-2 gap-2 text-xs text-gray-600">
        <div>Original: {{ compressionStats.originalSizeMB }} MB</div>
        <div>Compressed: {{ compressionStats.compressedSizeMB }} MB</div>
        <div>Saved: {{ compressionStats.savedMB }} MB</div>
        <div>Ratio: {{ compressionStats.compressionRatio.toFixed(1) }}%</div>
      </div>
    </div>

    <!-- Progress Indicator -->
    <div v-if="isProcessing" class="bg-blue-50 rounded-lg p-3">
      <div class="flex items-center gap-2 mb-2">
        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span class="text-sm font-medium text-blue-700">{{ currentProgress.message }}</span>
      </div>
      <div class="w-full bg-blue-200 rounded-full h-2">
        <div
          class="bg-blue-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${currentProgress.progress}%` }"
        ></div>
      </div>
      <div class="text-xs text-blue-600 mt-1">{{ currentProgress.progress }}%</div>
    </div>

    <!-- Error Display -->
    <div v-if="lastError" class="bg-red-50 border border-red-200 rounded-lg p-3">
      <div class="flex items-center gap-2 mb-1">
        <FontAwesomeIcon :icon="faExclamationTriangle" class="text-red-500" />
        <span class="text-sm font-medium text-red-700">Error</span>
      </div>
      <p class="text-sm text-red-600">{{ lastError.message }}</p>
      <IonButton size="small" fill="clear" color="danger" @click="clearError" class="mt-2">
        Clear Error
      </IonButton>
    </div>
  </div>

  <!-- Action Buttons -->
  <div class="flex items-center gap-4 mt-4">
    <IonButton @click="close" fill="outline" class="flex-1" :disabled="isProcessing">
      Close
    </IonButton>

    <IonButton
      @click="handleAnalyse"
      class="flex-1"
      :disabled="!canProceed || isProcessing"
      :loading="isProcessing && currentProgress.step === 'analyzing'"
    >
      <span v-if="!isProcessing">Analyse Food</span>
      <span v-else>{{ getAnalyzeButtonText() }}</span>
    </IonButton>

    <IonButton color="danger" @click="handleDelete" :disabled="isProcessing" size="default">
      <FontAwesomeIcon class="text-white" :icon="faTrash"></FontAwesomeIcon>
    </IonButton>
  </div>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue'
import { computed, watch } from 'vue'
import { useModalStore } from '../stores/components/modal.store'
import { useScanStore } from '../stores/scanStore/scan.store'
import { faTrash, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'

defineProps({
  title: { type: String, default: '' },
  lowerText: { type: String, default: '' },
})

const router = useRouter()
const scanStore = useScanStore()
const modalStore = useModalStore()

// Enhanced computed properties using new store features
const hasImage = computed(() => scanStore.hasImage)
const imagePath = computed(() => scanStore.imagePath)
const isProcessing = computed(() => scanStore.isProcessing)
const canProceed = computed(() => scanStore.canProceed)
const currentProgress = computed(() => scanStore.currentProgress)
const lastError = computed(() => scanStore.lastError)
const compressionStats = computed(() => scanStore.compressionStats)

// Enhanced handlers with better error handling
async function handleAnalyse() {
  try {
    const result = await scanStore.analyzePhotoHandler()

    if (result.success) {
      close()
      router.push('/scan/upload-results')
    } else {
      console.error('Analysis failed:', result.error)
      // Error is already handled by the store, just stay on modal
    }
  } catch (error) {
    console.error('Unexpected error during analysis:', error)
  }
}

function handleDelete() {
  scanStore.resetPhoto()
  close()
}

function close() {
  modalStore.closeModal()
}

function clearError() {
  scanStore.clearError()
}

function getAnalyzeButtonText(): string {
  const step = currentProgress.value.step
  switch (step) {
    case 'compressing':
      return 'Compressing...'
    case 'uploading':
      return 'Uploading...'
    case 'analyzing':
      return 'Analyzing...'
    case 'validating':
      return 'Validating...'
    default:
      return 'Processing...'
  }
}

// Watch for successful analysis to auto-close and navigate
watch(currentProgress, (progress) => {
  if (progress.step === 'complete' && scanStore.hasNutritionData) {
    // Small delay to show completion state
    setTimeout(() => {
      close()
      router.push('/scan/upload-results')
    }, 1000)
  }
})

// Watch for errors to provide user feedback
watch(lastError, (error) => {
  if (error) {
    console.error('Scan error in modal:', error)
    // You could add toast notifications here for specific error types
    // Example:
    // if (error.code === 'NETWORK_ERROR') {
    //   showToast('Network error. Please check your connection.')
    // }
  }
})
</script>
