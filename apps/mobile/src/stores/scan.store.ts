import { defineStore } from 'pinia'
import { ref } from 'vue'
import { pickPicture } from '../apis/mobile/pickPicture'
import type { INutritionData, IEstimatedNutritionData } from '../types/meal/meal.types'
import fetcher from '../utils/server/fetcher'
import { NutritionDataSchema } from '../schemas/global.zod'
import { useLoadingStore } from './components/loading.store'
import PreferencesService from '../apis/mobile/usePreferences'
// import { z } from 'zod'
// import ToastService from '@/services/ToastService'

// interface GPTCalculatorResponse {
//   response: {
//     status: 'success' | 'failed'
//     calculatorResponse: INutritionData | IEstimatedNutritionData | null
//     attempts: number
//   }
// }

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
      console.log('Blob:', imgBlob)
      const formData = new FormData()
      formData.append('file', imgBlob)
      const data = await fetcher('private/scan', {
        method: 'POST',
        body: formData,
        headers: {
          authorization: 'Bearer ' + (await PreferencesService.getItem('accessToken')).value,
          refresh: 'Refresher ' + (await PreferencesService.getItem('refreshToken')).value,
        },
      })
      const checkedData = NutritionDataSchema.safeParse(data)
      if (!checkedData.success) {
        console.error('Invalid data format:', checkedData.error)
        return
      }
      setNutritionData(checkedData.data)
      console.log('Nutrition Data:', checkedData.data)
    } catch (error) {
      console.error('Error uploading photo:', error)
    } finally {
      loadingStore.stopLoading()
      isUploading.value = false
    }
  }
  const setImagePath = (path: string | null) => {
    imagePath.value = path
    isImagePathSet.value = !!path
  }
  const setNutritionData = (data: INutritionData | IEstimatedNutritionData | null) => {
    nutritionData.value = data
  }

  const reset = () => {
    imagePath.value = null
    nutritionData.value = null
    isUploading.value = false
    isImagePathSet.value = false
  }

  return {
    imagePath,
    nutritionData,
    isUploading,
    isImagePathSet,
    pickPhotoHandler,
    resetPhoto,
    anaylsePhotoHandler,
    setNutritionData,
    setImagePath,
    reset,
  }
})
