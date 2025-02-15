import { defineStore } from 'pinia'
import { ref } from 'vue'
import { pickPicture } from '../apis/mobile/pickPicture'
import type { INutritionData, IEstimatedNutritionData } from '../types/global.types'
// import { NutritionDataSchema, EstimatedNutritionDataSchema } from '@/schemas/global.zod'
import { useLoadingStore } from './loading.store'
// import { z } from 'zod'
// import ToastService from '@/services/ToastService'

interface GPTCalculatorResponse {
  status: 'success' | 'failed'
  calculatorResponse: INutritionData | IEstimatedNutritionData | null
  attempts: number
}

// const GPTCalculatorResponseSchema = z.object({
//   status: z.enum(['success', 'failed']),
//   calculatorResponse: z.union([NutritionDataSchema, EstimatedNutritionDataSchema, z.null()]),
//   attempts: z.number(),
// })

const loadingStore = useLoadingStore()

export const useScanStore = defineStore('scan', () => {
  const imagePath = ref<string | null>(null)
  const nutritionData = ref<null | INutritionData | IEstimatedNutritionData>(null)
  const isUploading = ref<boolean>(false)
  const isImagePathSet = ref<boolean>(false)

  const pickPhotoHandler = async () => {
    loadingStore.resetLoading()
    loadingStore.startLoading()
    try {
      const imgBlobUrl = await pickPicture()
      if (!imgBlobUrl) {
        loadingStore.stopLoading()
        return
      }
      imagePath.value = imgBlobUrl
      isImagePathSet.value = true
    } catch (error) {
      console.error('Error picking photo:', error)
    } finally {
      loadingStore.stopLoading()
    }
  }

  const resetPhoto = () => {
    loadingStore.resetLoading()
    loadingStore.startLoading()
    try {
      if (imagePath.value) URL.revokeObjectURL(imagePath.value)
      imagePath.value = null
      isImagePathSet.value = false
    } catch (error) {
      console.error('Error resetting photo:', error)
    } finally {
      loadingStore.stopLoading()
    }
  }

  const anaylsePhotoHandler = async () => {
    loadingStore.resetLoading()
    loadingStore.startLoading()
    if (!imagePath.value) return
    isUploading.value = true
    try {
      const imgBlob = await fetch(imagePath.value).then((res) => res.blob())
      const formData = new FormData()
      formData.append('file', imgBlob)
      const response = await fetch('http://localhost:3000/v1/private/scan', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      const jsonResponse = await response.json()

      nutritionData.value = (jsonResponse.response as GPTCalculatorResponse).calculatorResponse as
        | INutritionData
        | IEstimatedNutritionData
    } catch (error) {
      console.error('Error uploading photo:', error)
    } finally {
      loadingStore.stopLoading()
      isUploading.value = false
    }
  }

  return {
    imagePath,
    nutritionData,
    isUploading,
    isImagePathSet,
    pickPhotoHandler,
    resetPhoto,
    anaylsePhotoHandler,
  }
})
