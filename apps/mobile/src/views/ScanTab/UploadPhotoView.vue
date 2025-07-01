<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue'
import { useScanStore } from '../../stores/scanStore/scan.store'
import { useLoadingStore } from '../../stores/components/loading.store'
import { useModalStore } from '../../stores/components/modal.store'
import ErrorModal from '../../components/modals/ErrorModal.vue'
import SuccessModal from '../../components/modals/SuccessModal.vue'
import {
  faCameraAlt,
  faImages,
  faTrash,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const scan = useScanStore()
const loadingStore = useLoadingStore()
const modalStore = useModalStore()
const router = useRouter()

// Enhanced computed properties using new store features
const hasImage = computed(() => scan.hasImage)
const isProcessing = computed(() => scan.isProcessing)
const canProceed = computed(() => scan.canProceed)
const currentProgress = computed(() => scan.currentProgress)
const hasPermissions = computed(() => scan.hasPermissions)

// Platform detection
const isPlatformBrowser = computed(() => scan.isPlatformBrowser)

// File input ref for browser uploads
const fileInputRef = ref<HTMLInputElement | null>(null)

// Enhanced handlers with better error handling and modal integration
const handleTakePhoto = async () => {
  try {
    // Show loading with custom message
    loadingStore.startLoading('Taking photo...', true)

    // On browser, redirect to file upload since camera might not be available
    if (isPlatformBrowser.value) {
      loadingStore.stopLoading()
      triggerFileInput()
      return
    }

    const result = await scan.takePhotoHandler({
      quality: 85,
      maxWidth: 1920,
      maxHeight: 1920,
      allowEditing: true,
    })

    loadingStore.stopLoading()

    if (!result.success) {
      modalStore.openModal(
        ErrorModal,
        {
          title: 'Camera Error',
          message: result.error || 'Failed to take photo',
          showRetry: true,
          onRetry: handleTakePhoto,
        },
        {
          closeOnBackdrop: false,
          maxWidth: '400px',
        },
      )
    }
  } catch (error) {
    loadingStore.stopLoading()
    console.error('Error taking photo:', error)
    modalStore.openModal(
      ErrorModal,
      {
        title: 'Camera Error',
        message: 'An unexpected error occurred while taking the photo',
        details: error instanceof Error ? error.message : String(error),
        showRetry: true,
        onRetry: handleTakePhoto,
      },
      {
        closeOnBackdrop: false,
        maxWidth: '400px',
      },
    )
  }
}

const handleSelectFromGallery = async () => {
  try {
    // Show loading with custom message
    loadingStore.startLoading('Selecting from gallery...', true)

    // On browser, use file upload instead of gallery
    if (isPlatformBrowser.value) {
      loadingStore.stopLoading()
      triggerFileInput()
      return
    }

    const result = await scan.selectFromGalleryHandler({
      quality: 85,
      maxWidth: 1920,
      maxHeight: 1920,
      allowEditing: true,
    })

    loadingStore.stopLoading()

    if (!result.success) {
      modalStore.openModal(
        ErrorModal,
        {
          title: 'Gallery Error',
          message: result.error || 'Failed to select from gallery',
          showRetry: true,
          onRetry: handleSelectFromGallery,
        },
        {
          closeOnBackdrop: false,
          maxWidth: '400px',
        },
      )
    }
  } catch (error) {
    loadingStore.stopLoading()
    console.error('Error selecting from gallery:', error)
    modalStore.openModal(
      ErrorModal,
      {
        title: 'Gallery Error',
        message: 'An unexpected error occurred while selecting from gallery',
        details: error instanceof Error ? error.message : String(error),
        showRetry: true,
        onRetry: handleSelectFromGallery,
      },
      {
        closeOnBackdrop: false,
        maxWidth: '400px',
      },
    )
  }
}

const handleClearImage = () => {
  if (hasImage.value && !isProcessing.value) {
    scan.resetPhoto()
  }
}

const handleAnalyze = async () => {
  try {
    const result = await scan.analyzePhotoHandler()

    // Don't stop loading here either - scan store handles it

    if (result.success) {
      modalStore.openModal(
        SuccessModal,
        {
          title: 'Analysis Complete!',
          message: 'Redirecting to results...',
          autoCloseDelay: 2000,
          showActionButton: true,
          actionButtonText: 'View Results',
          onClose: () => {
            router.push('/scan/upload-results')
          },
        },
        {
          closeOnBackdrop: false,
          closeOnEscape: false,
          maxWidth: '400px',
        },
      )
    } else {
      modalStore.openModal(
        ErrorModal,
        {
          title: 'Analysis Failed',
          message: result.error || 'Failed to analyze photo',
          showRetry: true,
          onRetry: handleAnalyze,
        },
        {
          closeOnBackdrop: false,
          maxWidth: '400px',
        },
      )
    }
  } catch (error) {
    // Only stop loading if there's an unexpected error
    loadingStore.stopLoading()
    console.error('Error analyzing photo:', error)
    modalStore.openModal(
      ErrorModal,
      {
        title: 'Analysis Error',
        message: 'An unexpected error occurred during analysis',
        details: error instanceof Error ? error.message : String(error),
        showRetry: true,
        onRetry: handleAnalyze,
      },
      {
        closeOnBackdrop: false,
        maxWidth: '400px',
      },
    )
  }
}

const getProgressMessage = (): string => {
  const step = currentProgress.value.step
  switch (step) {
    case 'requesting_permission':
      return 'Requesting camera permission...'
    case 'picking':
      return 'Opening camera/gallery...'
    case 'validating':
      return 'Validating image...'
    case 'compressing':
      return 'Compressing image...'
    case 'uploading':
      return 'Uploading to server...'
    case 'analyzing':
      return 'Analyzing nutrition data...'
    case 'complete':
      return 'Analysis complete!'
    case 'error':
      return 'Error occurred'
    default:
      return 'Processing...'
  }
}

// Initialize store on mount
onMounted(async () => {
  await scan.initialize()
})

// Sync loading store with scan store progress
watch(
  [currentProgress, isProcessing],
  ([progress, processing]) => {
    if (processing) {
      // Update progress and message
      loadingStore.updateProgress(progress.progress || 0)
      loadingStore.updateMessage(getProgressMessage())
    }
  },
  { immediate: true },
)

// Browser file upload handler
const handleFileUpload = async () => {
  if (!fileInputRef.value) {
    console.error('File input ref not available')
    return
  }

  try {
    // Show loading with custom message
    loadingStore.startLoading('Uploading file...', true)
    const result = await scan.uploadFileHandler(fileInputRef.value, {
      acceptTypes: ['image/jpeg', 'image/png', 'image/webp'],
      multiple: false,
      maxSize: 10 * 1024 * 1024, // 10MB
    })

    loadingStore.stopLoading()

    if (!result.success) {
      modalStore.openModal(
        ErrorModal,
        {
          title: 'Upload Error',
          message: result.error || 'Failed to upload file',
          showRetry: true,
          onRetry: () => {
            fileInputRef.value!.click()
          },
        },
        {
          closeOnBackdrop: false,
          maxWidth: '400px',
        },
      )
    }
  } catch (error) {
    loadingStore.stopLoading()
    console.error('Error uploading file:', error)
    modalStore.openModal(
      ErrorModal,
      {
        title: 'Upload Error',
        message: 'An unexpected error occurred while uploading the file',
        details: error instanceof Error ? error.message : String(error),
        showRetry: true,
        onRetry: () => {
          fileInputRef.value!.click()
        },
      },
      {
        closeOnBackdrop: false,
        maxWidth: '400px',
      },
    )
  }
}

// Trigger file input (for desktop browser use)
const triggerFileInput = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}
</script>

<template>
  <IonPage>
    <IonContent>
      <div
        class="content-wrapper tool-bar-safe-margin h-full flex flex-col items-center justify-center bg-secondary"
      >
        <div v-if="hasImage" class="w-full flex flex-col items-center justify-center">
          <div class="w-4/5 flex flex-col items-center justify-center">
            <p class="w-full text-white font-bold text-2xl mb-2">Selected image:</p>
            <img
              v-if="hasImage && scan.imagePath"
              :src="scan.imagePath"
              alt="Uploaded Food Image"
              class="aspect-square w-full border-primary border-2 object-cover rounded-lg shadow-lg"
            />
            <div class="w-full flex flex-row items-center justify-center gap-2 mt-4">
              <IonButton
                @click="handleAnalyze"
                class="font-semibold p-4 w-full rounded-lg flex justify-center items-center text-white transition-all duration-300 shadow-lg bg-primary hover:bg-primary-dark cursor-pointer hover:shadow-xl"
                :style="{ pointerEvents: !canProceed || isProcessing ? 'none' : 'auto' }"
              >
                <span v-if="!isProcessing" class="text-lg font-semibold">Analyse</span>
                <span v-else class="text-lg">{{ getProgressMessage() }}</span>
                <FontAwesomeIcon :icon="faWandMagicSparkles" class="text-2xl ml-3 transition-all" />
              </IonButton>
              <IonButton
                @click="handleClearImage"
                class="font-semibold p-4 w-full rounded-lg flex justify-center items-center text-white transition-all duration-300 shadow-lg bg-danger hover:bg-primary-dark cursor-pointer hover:shadow-xl"
                :style="{ pointerEvents: !canProceed || isProcessing ? 'none' : 'auto' }"
              >
                <span v-if="!isProcessing" class="text-lg font-semibold">Delete</span>
                <span v-else class="text-lg">{{ getProgressMessage() }}</span>
                <FontAwesomeIcon :icon="faTrash" class="text-2xl ml-3 transition-all" />
              </IonButton>
            </div>
          </div>
        </div>
        <!-- Main Content -->
        <div v-else class="w-full h-full flex flex-col justify-center items-center gap-4">
          <!-- Hidden file input for browser uploads -->
          <input
            ref="fileInputRef"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            @change="handleFileUpload"
            class="hidden"
            :style="{ display: 'none' }"
          />

          <!-- Content wrapper -->
          <div
            class="flex flex-col w-full h-full justify-center items-center min-h-[400px] bg-secondary"
          >
            <!-- Desktop/Browser UI: Single File Upload Section -->
            <div v-if="isPlatformBrowser" class="w-full h-full p-4">
              <!-- File Upload Section (Desktop Only) -->
              <div
                @click="triggerFileInput"
                class="relative w-full h-full min-h-[300px] flex justify-center items-center z-[1] transition-all duration-300 bg-gradient-to-br from-primary to-primary-dark hover:from-primary-dark hover:to-primary cursor-pointer border-2 border-dashed border-white/30 rounded-lg"
                :style="{ pointerEvents: isProcessing ? 'none' : 'auto' }"
              >
                <!-- Main Content -->
                <div class="flex flex-col items-center justify-center gap-6 z-[2] p-8 text-center">
                  <!-- Upload Icon -->
                  <div class="bg-white/10 rounded-full p-6 backdrop-blur-sm">
                    <FontAwesomeIcon :icon="faImages" class="text-6xl text-white" />
                  </div>

                  <!-- Text Content -->
                  <div class="space-y-3">
                    <h2 class="text-white font-bold text-2xl">
                      {{ isProcessing ? 'Processing...' : 'Upload Food Image' }}
                    </h2>
                    <p class="text-white/90 text-lg font-medium">
                      Click here to select an image file
                    </p>
                  </div>

                  <!-- File Info -->
                  <div class="bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
                    <p class="text-white/80 text-xs">Max size: 10MB</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile UI: Divided Camera/Gallery Sections -->
            <div v-else class="flex justify-center items-center flex-col w-full h-full">
              <!-- Camera Section -->
              <div
                @click="handleTakePhoto"
                class="relative w-full h-full flex justify-center items-center transition-all duration-300 bg-secondary-shade hover:to-secondary-shade hover:from-emerald-300 hover:bg-gradient-to-t"
                :style="{ pointerEvents: isProcessing ? 'none' : 'auto' }"
              >
                <div class="flex flex-col items-center justify-center gap-2">
                  <FontAwesomeIcon :icon="faCameraAlt" class="text-3xl text-white" />
                  <p class="text-white font-bold text-sm">
                    {{ isProcessing ? 'Processing...' : 'Take an instant photo.' }}
                  </p>
                  <p v-if="!hasPermissions" class="text-white/80 text-xs">
                    Camera permission required
                  </p>
                </div>
              </div>

              <!-- Gallery Section -->
              <div
                @click="handleSelectFromGallery"
                class="relative w-full h-full flex justify-center items-center transition-all duration-300 bg-tertiary-shade hover:from-tertiary-shade hover:to-secondary hover:bg-gradient-to-t"
                :style="{ pointerEvents: isProcessing ? 'none' : 'auto' }"
              >
                <div class="flex flex-col items-center justify-center gap-2">
                  <FontAwesomeIcon :icon="faImages" class="text-3xl text-white" />
                  <p class="text-white font-bold text-sm">
                    {{ isProcessing ? 'Processing...' : 'Grab a photo from the gallery.' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<style scoped>
IonPage {
  color: black;
}

.content-wrapper {
  position: relative;
}

/* Loading spinner animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease-in-out;
}

/* Backdrop blur support */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Desktop file upload hover effects */
.cursor-pointer:hover {
  transform: translateY(-2px);
}

/* Dashed border animation for desktop upload */
@keyframes dashMove {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 20px 20px;
  }
}

/* Enhanced upload zone styling for desktop */
.border-dashed {
  background-image: linear-gradient(
    45deg,
    transparent 40%,
    rgba(255, 255, 255, 0.1) 40%,
    rgba(255, 255, 255, 0.1) 60%,
    transparent 60%
  );
  background-size: 20px 20px;
  animation: dashMove 1s linear infinite;
}

.border-dashed:hover {
  animation-duration: 0.5s;
  background-image: linear-gradient(
    45deg,
    transparent 40%,
    rgba(255, 255, 255, 0.2) 40%,
    rgba(255, 255, 255, 0.2) 60%,
    transparent 60%
  );
}
</style>
