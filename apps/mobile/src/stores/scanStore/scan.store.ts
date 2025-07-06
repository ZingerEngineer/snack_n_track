import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IScanProgress, IScanError, IScanResult } from '../../types/stores/scan.types'
import type { IImageCompressionResult } from '../../utils/image'
import fetcher from '../../utils/server/fetcher'
import { useLoadingStore } from '../components/loading.store'
import {
  compressImage,
  getRecommendedCompressionOptions,
  isValidImageFile,
} from '../../utils/image'
import type { TMeal } from '../../types/meal.types'
import { isBrowser } from '../../apis/browser/pickPicture/utils/platformDetection'
import { isMobile } from '../../apis/mobile/pickPicture/utils/platformDetection'
import type { TPickPictureError, TPickPictureResult } from '../../types/apis/shared.apis.types'
import {
  checkCameraPermissions,
  requestCameraPermissions,
} from '../../apis/mobile/pickPicture/utils/permissionManagement'
import type { TPickPictureOptions } from '../../types/apis/mobile/pickPicture.types'
import { pickPicture } from '../../apis/shared/pickPicture'
import { PickPictureError } from '../../classes/PickPictureError'
import { selectFromGallery, takePhoto } from '../../apis/mobile/pickPicture/pickPictureMobile'
import type { TBrowserFileOptions } from '../../types/apis/browser/pickPicturebrowser.types'
import { pickFileWithElement } from '../../apis/browser/pickPicture/pickPictureBrowser'
import { backEndScanResponseSchema } from '../../zodSchemas/scanStore/scanStore.zod'

const loadingStore = useLoadingStore()

export const useScanStore = defineStore('scan', () => {
  // === State ===
  const imagePath = ref<string | null>(null)
  const mealScan = ref<TMeal[] | null>(null)
  const isUploading = ref<boolean>(false)
  const isImagePathSet = ref<boolean>(false)
  const isCompressing = ref<boolean>(false)
  const compressionProgress = ref<number>(0)
  const compressionInfo = ref<IImageCompressionResult | null>(null)
  const originalImageFile = ref<File | null>(null)
  const currentProgress = ref<IScanProgress>({
    step: 'picking',
    message: 'Ready to scan',
    progress: 0,
  })
  const lastError = ref<IScanError | null>(null)
  const hasPermissions = ref<boolean>(false)

  // === Computed ===
  const isProcessing = computed(
    () =>
      isUploading.value ||
      isCompressing.value ||
      currentProgress.value.step === 'requesting_permission',
  )

  const canProceed = computed(
    () => imagePath.value && !isProcessing.value && currentProgress.value.step !== 'error',
  )

  const hasImage = computed(() => !!imagePath.value)

  const hasMeal = computed(() => !!mealScan.value && mealScan.value.length > 0)

  // Platform detection
  const isPlatformBrowser = computed(() => isBrowser())
  const isPlatformMobile = computed(() => isMobile())

  // Enhanced computed with platform-specific logic
  const supportsCameraDirectly = computed(() => !isBrowser() && hasPermissions.value)
  const supportsFileUpload = computed(() => isBrowser() || !hasPermissions.value)

  // === Error Handling ===
  const setError = (error: IScanError) => {
    console.log('[ScanStore] setError:', error)
    lastError.value = error
    currentProgress.value = {
      step: 'error',
      message: error.message,
      progress: 0,
    }
    console.error(`Scan Error [${error.code}]:`, error.message, error.details)
  }

  const clearError = () => {
    console.log('[ScanStore] clearError')
    lastError.value = null
    if (currentProgress.value.step === 'error') {
      currentProgress.value = {
        step: 'picking',
        message: 'Ready to scan',
        progress: 0,
      }
    }
  }

  const mapPickPictureError = (error: TPickPictureError): IScanError['code'] => {
    console.log('[ScanStore] mapPickPictureError:', error)
    switch (error) {
      case 'USER_CANCELLED':
        return 'USER_CANCELLED'
      case 'PERMISSION_DENIED':
        return 'PERMISSION_DENIED'
      case 'CAMERA_UNAVAILABLE':
        return 'CAMERA_UNAVAILABLE'
      case 'FILE_TOO_LARGE':
        return 'FILE_TOO_LARGE'
      case 'INVALID_FILE_TYPE':
        return 'INVALID_FILE_TYPE'
      default:
        return 'CAMERA_ERROR'
    }
  }

  // === Permission Management ===
  const checkPermissions = async (): Promise<boolean> => {
    console.log('[ScanStore] checkPermissions')
    try {
      if (isBrowser()) {
        hasPermissions.value = true
        clearError()
        console.log('[ScanStore] Browser detected, permissions granted')
        return true
      }

      currentProgress.value = {
        step: 'requesting_permission',
        message: 'Checking camera permissions...',
        progress: 0,
      }

      const granted = await checkCameraPermissions()
      hasPermissions.value = granted

      if (!granted) {
        setError({
          code: 'PERMISSION_DENIED',
          message: 'Camera permission is required to scan food items',
          details: { action: 'check_permissions' },
        })
        return false
      }

      clearError()
      console.log('[ScanStore] Permissions granted')
      return true
    } catch (error) {
      setError({
        code: 'CAMERA_ERROR',
        message: 'Failed to check camera permissions',
        details: { error },
      })
      return false
    }
  }

  const requestPermissions = async (): Promise<boolean> => {
    console.log('[ScanStore] requestPermissions')
    try {
      if (isBrowser()) {
        hasPermissions.value = true
        clearError()
        currentProgress.value = {
          step: 'picking',
          message: 'Ready to scan',
          progress: 0,
        }
        console.log('[ScanStore] Browser detected, permissions granted')
        return true
      }

      currentProgress.value = {
        step: 'requesting_permission',
        message: 'Requesting camera permissions...',
        progress: 50,
      }

      const granted = await requestCameraPermissions()
      hasPermissions.value = granted

      if (!granted) {
        setError({
          code: 'PERMISSION_DENIED',
          message: 'Camera permission denied. Please enable camera access in your device settings.',
          details: { action: 'request_permissions' },
        })
        return false
      }

      clearError()
      currentProgress.value = {
        step: 'picking',
        message: 'Ready to scan',
        progress: 0,
      }
      console.log('[ScanStore] Permissions granted')
      return true
    } catch (error) {
      setError({
        code: 'CAMERA_ERROR',
        message: 'Failed to request camera permissions',
        details: { error },
      })
      return false
    }
  }

  // === Image Picking ===
  const pickPhotoHandler = async (options?: TPickPictureOptions): Promise<IScanResult> => {
    console.log('[ScanStore] pickPhotoHandler', options)
    try {
      clearError()
      loadingStore.startLoading()

      if (!hasPermissions.value && !isBrowser()) {
        const hasPerms = await checkPermissions()
        if (!hasPerms) {
          console.log('[ScanStore] No permissions for pickPhotoHandler')
          return { success: false, error: 'Permission denied' }
        }
      } else if (isBrowser()) {
        hasPermissions.value = true
      }

      currentProgress.value = {
        step: 'picking',
        message: 'Opening camera/gallery...',
        progress: 10,
      }

      const result: TPickPictureResult = await pickPicture(options)

      if (!result.webPath) {
        setError({
          code: 'CAMERA_ERROR',
          message: 'Failed to get image from camera/gallery',
          details: { result },
        })
        return { success: false, error: 'Failed to get image' }
      }

      imagePath.value = result.webPath
      isImagePathSet.value = true

      currentProgress.value = {
        step: 'complete',
        message: 'Image selected successfully',
        progress: 100,
      }

      console.log('[ScanStore] Image picked successfully:', {
        webPath: result.webPath,
        format: result.format,
        saved: result.saved,
      })

      // Reset to ready state after a brief moment
      setTimeout(() => {
        if (currentProgress.value.step === 'complete') {
          currentProgress.value = {
            step: 'picking',
            message: 'Ready to analyze',
            progress: 0,
          }
        }
      }, 1000)

      return { success: true, data: mealScan.value || undefined }
    } catch (error) {
      console.error('[ScanStore] Error picking photo:', error)

      if (error instanceof PickPictureError) {
        setError({
          code: mapPickPictureError(error.type),
          message: error.message,
          details: { originalError: error.originalError },
        })
        return { success: false, error: error.message }
      }

      setError({
        code: 'CAMERA_ERROR',
        message: 'Unexpected error while picking image',
        details: { error },
      })
      return { success: false, error: 'Unexpected error' }
    } finally {
      loadingStore.stopLoading()
    }
  }

  const takePhotoHandler = async (
    options?: Omit<TPickPictureOptions, 'allowGallery'>,
  ): Promise<IScanResult> => {
    console.log('[ScanStore] takePhotoHandler', options)
    try {
      clearError()
      loadingStore.startLoading()

      if (!hasPermissions.value && !isBrowser()) {
        const hasPerms = await requestPermissions()
        if (!hasPerms) {
          console.log('[ScanStore] No permissions for takePhotoHandler')
          return { success: false, error: 'Camera permission required' }
        }
      } else if (isBrowser()) {
        hasPermissions.value = true
      }

      currentProgress.value = {
        step: 'picking',
        message: 'Taking photo...',
        progress: 10,
      }

      const result: TPickPictureResult = await takePhoto(options)

      if (!result.webPath) {
        setError({
          code: 'CAMERA_ERROR',
          message: 'Failed to capture photo',
          details: { result },
        })
        return { success: false, error: 'Failed to capture photo' }
      }

      imagePath.value = result.webPath
      isImagePathSet.value = true

      currentProgress.value = {
        step: 'complete',
        message: 'Photo captured successfully',
        progress: 100,
      }

      console.log('[ScanStore] Photo taken successfully:', {
        webPath: result.webPath,
        format: result.format,
        saved: result.saved,
      })

      // Reset to ready state after a brief moment
      setTimeout(() => {
        if (currentProgress.value.step === 'complete') {
          currentProgress.value = {
            step: 'picking',
            message: 'Ready to analyze',
            progress: 0,
          }
        }
      }, 1000)

      return { success: true, data: mealScan.value || undefined }
    } catch (error) {
      console.error('[ScanStore] Error taking photo:', error)

      if (error instanceof PickPictureError) {
        setError({
          code: mapPickPictureError(error.type),
          message: error.message,
          details: { originalError: error.originalError },
        })
        return { success: false, error: error.message }
      }

      setError({
        code: 'CAMERA_ERROR',
        message: 'Failed to take photo',
        details: { error },
      })
      return { success: false, error: 'Failed to take photo' }
    } finally {
      loadingStore.stopLoading()
    }
  }

  const selectFromGalleryHandler = async (
    options?: Omit<TPickPictureOptions, 'allowCamera'>,
  ): Promise<IScanResult> => {
    console.log('[ScanStore] selectFromGalleryHandler', options)
    try {
      clearError()
      loadingStore.startLoading()

      currentProgress.value = {
        step: 'picking',
        message: 'Opening gallery...',
        progress: 10,
      }

      const result: TPickPictureResult = await selectFromGallery(options)

      if (!result.webPath) {
        setError({
          code: 'CAMERA_ERROR',
          message: 'Failed to select image from gallery',
          details: { result },
        })
        return { success: false, error: 'Failed to select image' }
      }

      imagePath.value = result.webPath
      isImagePathSet.value = true

      currentProgress.value = {
        step: 'complete',
        message: 'Image selected from gallery',
        progress: 100,
      }

      console.log('[ScanStore] Image selected from gallery:', {
        webPath: result.webPath,
        format: result.format,
        saved: result.saved,
      })

      // Reset to ready state after a brief moment
      setTimeout(() => {
        if (currentProgress.value.step === 'complete') {
          currentProgress.value = {
            step: 'picking',
            message: 'Ready to analyze',
            progress: 0,
          }
        }
      }, 1000)

      return { success: true, data: mealScan.value || undefined }
    } catch (error) {
      console.error('[ScanStore] Error selecting from gallery:', error)

      if (error instanceof PickPictureError) {
        setError({
          code: mapPickPictureError(error.type),
          message: error.message,
          details: { originalError: error.originalError },
        })
        return { success: false, error: error.message }
      }

      setError({
        code: 'CAMERA_ERROR',
        message: 'Failed to select from gallery',
        details: { error },
      })
      return { success: false, error: 'Failed to select from gallery' }
    } finally {
      loadingStore.stopLoading()
    }
  }

  // === Browser File Upload ===
  const uploadFileHandler = async (
    inputElement: HTMLInputElement,
    options?: TBrowserFileOptions,
  ): Promise<IScanResult> => {
    console.log('[ScanStore] uploadFileHandler', inputElement, options)
    try {
      clearError()
      loadingStore.startLoading()

      currentProgress.value = {
        step: 'picking',
        message: 'Selecting file...',
        progress: 10,
      }

      const result: TPickPictureResult = await pickFileWithElement(inputElement, {
        acceptTypes: ['image/jpeg', 'image/png', 'image/webp'],
        multiple: false,
        maxSize: 10 * 1024 * 1024, // 10MB
        ...options,
      })

      if (!result.webPath || !result.file) {
        setError({
          code: 'INVALID_FILE',
          message: 'Failed to process selected file',
          details: { result },
        })
        return { success: false, error: 'Failed to process file' }
      }

      imagePath.value = result.webPath
      isImagePathSet.value = true
      console.log('[ScanStore] File selected:', {
        webPath: result.webPath,
        format: result.format,
        fileSize: result.file?.size,
        fileName: result.file?.name,
      })

      if (result.file) {
        originalImageFile.value = result.file
      }

      currentProgress.value = {
        step: 'complete',
        message: 'File selected successfully',
        progress: 100,
      }

      // Reset to ready state after a brief moment
      setTimeout(() => {
        if (currentProgress.value.step === 'complete') {
          currentProgress.value = {
            step: 'picking',
            message: 'Ready to analyze',
            progress: 0,
          }
        }
      }, 1000)
      return { success: true, data: mealScan.value || undefined }
    } catch (error) {
      console.error('[ScanStore] Error uploading file:', error)

      if (error instanceof PickPictureError) {
        setError({
          code: mapPickPictureError(error.type),
          message: error.message,
          details: { originalError: error.originalError },
        })
        return { success: false, error: error.message }
      }

      setError({
        code: 'INVALID_FILE',
        message: 'Failed to upload file',
        details: { error },
      })
      return { success: false, error: 'Failed to upload file' }
    } finally {
      loadingStore.stopLoading()
    }
  }

  // === Image Compression ===
  const compressImageHandler = async (file: File): Promise<File> => {
    console.log('[ScanStore] compressImageHandler', file)
    try {
      isCompressing.value = true
      compressionProgress.value = 0

      currentProgress.value = {
        step: 'validating',
        message: 'Validating image file...',
        progress: 10,
      }

      const isValid = await isValidImageFile(file)
      if (!isValid) {
        throw new Error(
          'Invalid or potentially unsafe image file. Please select a valid JPEG, PNG, or WebP image under 50MB.',
        )
      }

      originalImageFile.value = file

      currentProgress.value = {
        step: 'compressing',
        message: 'Compressing image...',
        progress: 20,
      }

      const options = getRecommendedCompressionOptions(file)

      console.log('[ScanStore] Starting image compression...', {
        originalSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        fileName: file.name,
        fileType: file.type,
      })

      const result = await compressImage(file, options, (progress: number) => {
        compressionProgress.value = progress
        const overallProgress = 20 + progress * 0.3 // 20% to 50%
        currentProgress.value = {
          step: 'compressing',
          message: `Compressing image... ${progress}%`,
          progress: overallProgress,
        }

        if (loadingStore.isLoading) {
          loadingStore.updateProgress(overallProgress)
          loadingStore.updateMessage(`Compressing image... ${progress}%`)
        }
      })

      compressionInfo.value = result

      currentProgress.value = {
        step: 'compressing',
        message: 'Image compressed successfully',
        progress: 50,
      }

      console.log('[ScanStore] Image compression successful:', {
        originalSize: `${(result.originalSize / 1024 / 1024).toFixed(2)} MB`,
        compressedSize: `${(result.compressedSize / 1024 / 1024).toFixed(2)} MB`,
        compressionRatio: `${result.compressionRatio.toFixed(1)}%`,
      })

      return result.compressedFile
    } catch (error) {
      console.error('[ScanStore] Image compression failed:', error)

      setError({
        code: 'COMPRESSION_FAILED',
        message: `Image compression failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: { error, fileSize: file.size, fileName: file.name },
      })

      throw error
    } finally {
      isCompressing.value = false
      compressionProgress.value = 100
    }
  }

  // === Analysis ===
  const analyzePhotoHandler = async (): Promise<IScanResult> => {
    console.log('[ScanStore] analyzePhotoHandler')
    if (!imagePath.value) {
      setError({
        code: 'INVALID_FILE',
        message: 'No image selected for analysis',
        details: {},
      })
      return { success: false, error: 'No image selected' }
    }

    try {
      clearError()
      loadingStore.startLoading('Preparing image for analysis...', true)
      isUploading.value = true

      currentProgress.value = {
        step: 'uploading',
        message: 'Preparing image for analysis...',
        progress: 10,
      }

      loadingStore.updateProgress(10)

      const imgBlob = await fetch(imagePath.value).then((res) => res.blob())
      console.log('[ScanStore] Image blob fetched:', {
        size: `${(imgBlob.size / 1024 / 1024).toFixed(2)} MB`,
        type: imgBlob.type,
      })

      const imageFile = new File([imgBlob], 'captured-image.jpg', {
        type: imgBlob.type || 'image/jpeg',
      })

      console.log('[ScanStore] Original image blob:', {
        size: `${(imgBlob.size / 1024 / 1024).toFixed(2)} MB`,
        type: imgBlob.type,
      })

      currentProgress.value = {
        step: 'compressing',
        message: 'Compressing image...',
        progress: 20,
      }

      loadingStore.updateMessage('Compressing image...')
      loadingStore.updateProgress(20)

      const compressedFile = await compressImageHandler(imageFile)

      currentProgress.value = {
        step: 'uploading',
        message: 'Uploading to server...',
        progress: 50,
      }

      loadingStore.updateMessage('Uploading to server...')
      loadingStore.updateProgress(50)

      const formData = new FormData()
      formData.append('file', compressedFile)

      const data = await fetcher('private/meals/scan', {
        method: 'POST',
        body: formData,
      })

      currentProgress.value = {
        step: 'analyzing',
        message: 'Analyzing nutrition data...',
        progress: 80,
      }

      loadingStore.updateMessage('Analyzing nutrition data...')
      loadingStore.updateProgress(80)

      const checkedData = backEndScanResponseSchema.safeParse(data)
      if (!checkedData.success) {
        console.error('[ScanStore] Invalid data format:', checkedData.error)
        setError({
          code: 'ANALYSIS_FAILED',
          message: 'Invalid response format from server',
          details: { validationError: checkedData.error, receivedData: data },
        })
        return { success: false, error: 'Invalid server response' }
      }

      currentProgress.value = {
        step: 'complete',
        message: 'Analysis complete!',
        progress: 100,
      }

      loadingStore.updateMessage('Analysis complete!')
      loadingStore.updateProgress(100)

      console.log('[ScanStore] Nutrition analysis successful:', checkedData.data)
      if (!checkedData.data.data || checkedData.data.data.length === 0) {
        throw new Error('No nutrition data found in the response')
      }
      setMealScan(checkedData.data.data || null)
      return { success: true, data: checkedData.data.data }
    } catch (error) {
      console.error('[ScanStore] Error analyzing photo:', error)

      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

      if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        setError({
          code: 'NETWORK_ERROR',
          message: 'Network error during upload. Please check your connection and try again.',
          details: { error },
        })
      } else if (errorMessage.includes('compression')) {
        // Error already set in compressImageHandler
      } else {
        setError({
          code: 'UPLOAD_FAILED',
          message: `Upload failed: ${errorMessage}`,
          details: { error },
        })
      }

      return { success: false, error: errorMessage }
    } finally {
      loadingStore.stopLoading()
      isUploading.value = false
    }
  }

  // === Utility Methods ===
  const resetPhoto = () => {
    console.log('[ScanStore] resetPhoto')
    try {
      if (imagePath.value) {
        URL.revokeObjectURL(imagePath.value)
      }
      imagePath.value = null
      isImagePathSet.value = false
      compressionInfo.value = null
      originalImageFile.value = null
      compressionProgress.value = 0
      clearError()

      currentProgress.value = {
        step: 'picking',
        message: 'Ready to scan',
        progress: 0,
      }
    } catch (error) {
      console.error('[ScanStore] Error resetting photo:', error)
    }
  }

  const setImagePath = (path: string | null) => {
    console.log('[ScanStore] setImagePath', path)
    imagePath.value = path
    isImagePathSet.value = !!path
  }

  const setMealScan = (data: TMeal[] | null) => {
    console.log('[ScanStore] setMealScan', data)
    mealScan.value = data
  }

  const reset = () => {
    console.log('[ScanStore] reset')
    resetPhoto()
    mealScan.value = null
    isUploading.value = false
    isCompressing.value = false
    lastError.value = null
    hasPermissions.value = false

    currentProgress.value = {
      step: 'picking',
      message: 'Ready to scan',
      progress: 0,
    }
  }

  // === Initialize ===
  const initialize = async () => {
    console.log('[ScanStore] initialize')
    if (isBrowser()) {
      hasPermissions.value = true
      currentProgress.value = {
        step: 'picking',
        message: 'Ready to scan',
        progress: 0,
      }
      console.log('[ScanStore] Initialized for browser')
    } else {
      await checkPermissions()
      console.log('[ScanStore] Initialized for mobile')
    }
  }

  return {
    // === State ===
    imagePath,
    mealScan,
    isUploading,
    isImagePathSet,
    isCompressing,
    compressionProgress,
    compressionInfo,
    originalImageFile,
    currentProgress,
    lastError,
    hasPermissions,

    // === Computed ===
    isProcessing,
    canProceed,
    hasImage,
    hasMeal,
    isPlatformBrowser,
    isPlatformMobile,
    supportsCameraDirectly,
    supportsFileUpload,

    // === Actions ===
    // Permission management
    checkPermissions,
    requestPermissions,

    // Image picking
    pickPhotoHandler,
    takePhotoHandler,
    selectFromGalleryHandler,
    uploadFileHandler, // Expose the file upload handler

    // Processing
    compressImageHandler,
    analyzePhotoHandler,

    // Utility
    resetPhoto,
    setImagePath,
    setMealScan,
    reset,
    clearError,
    initialize,
  }
})
