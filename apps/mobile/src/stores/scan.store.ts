import { defineStore } from 'pinia'
import { ref } from 'vue'
import { pickPicture } from '../apis/mobile/pickPicture'
import type { INutritionData, IEstimatedNutritionData } from '../types/global.types'

export const useScanStore = defineStore('scan', () => {
  const imagePath = ref<string | null>(null)
  const nutritionData = ref<null | INutritionData | IEstimatedNutritionData>(null)

  const pickPhotoHandler = async () => {
    const imgBlobUrl = await pickPicture()
    if (!imgBlobUrl) return
    imagePath.value = imgBlobUrl
  }

  const resetPhoto = () => {
    if (imagePath.value) URL.revokeObjectURL(imagePath.value)
    imagePath.value = null
  }

  const anaylsePhotoHandler = async () => {
    if (!imagePath.value) return
    const imgBlob = await fetch(imagePath.value).then((res) => res.blob())
    const formData = new FormData()
    formData.append('file', imgBlob)
    const response = await fetch('http://localhost:3000/v1/private/scan', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    const data = await response.json()
    nutritionData.value = data.response
  }

  return {
    imagePath,
    nutritionData,
    pickPhotoHandler,
    resetPhoto,
    anaylsePhotoHandler,
  }
})
