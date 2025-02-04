<script setup lang="ts">
import { cameraOutline, trash } from 'ionicons/icons'
import { IonPage, IonContent, IonIcon, IonButton } from '@ionic/vue'
import { ref } from 'vue'
import pickPicture from '../apis/mobile/pickPicture'

const imagePath = ref<string | null>(null)
const nutritionData = ref<null | { calories: number; protein: number; carbs: number; fat: number }>(
  null,
)
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
  try {
    const imgBlob = await fetch(imagePath.value).then((res) => res.blob())
    const formData = new FormData()
    formData.append('file', imgBlob)
    const response = await fetch('http://localhost:3000/v1/private/scan', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
    const data = await response.json()
    nutritionData.value = {
      calories: data.calories ? data.calories : 0,
      protein: data.protein ? data.protein : 0,
      carbs: data.carbs ? data.carbs : 0,
      fat: data.fat ? data.fat : 0,
    }
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="content-wrapper flex flex-col items-center justify-center">
        <div class="p-4 flex flex-col justify-center items-center gap-4">
          <div class="flex flex-col justify-center items-center">
            <div class="relative">
              <button
                v-if="imagePath"
                class="absolute -bottom-4 -left-4 bg-red-600 rounded-full p-2 hover:bg-red-400 duration-150"
                @click="resetPhoto"
              >
                <ion-icon size="large" :icon="trash" class="text-4xl text-white" />
              </button>
              <div
                @click="pickPhotoHandler"
                class="flex justify-center items-center aspect-square overflow-hidden w-64 border-2 border-dashed border-gray-400 rounded-lg"
              >
                <img
                  v-if="imagePath"
                  :src="imagePath"
                  alt="Picked Image"
                  class="object-cover w-full h-full"
                />
                <div
                  v-else
                  class="flex flex-col justify-center items-center w-full h-full bg-gray-200"
                >
                  <ion-icon :icon="cameraOutline" class="text-4xl text-gray-400" />
                  <p class="text-gray-400 font-bold">Tap to add an image.</p>
                </div>
              </div>
            </div>
          </div>
          <ion-button v-if="imagePath" :onclick="anaylsePhotoHandler"> Analyse Food </ion-button>
        </div>
        <div v-if="nutritionData" class="mt-4 w-full px-8">
          <ion-card>
            <ion-card-header>
              <ion-card-title>Nutrition Facts</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-grid>
                <ion-row>
                  <ion-col>Calories</ion-col>
                  <ion-col>{{ nutritionData.calories }}</ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>Protein</ion-col>
                  <ion-col>{{ nutritionData.protein }} g</ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>Carbohydrates</ion-col>
                  <ion-col>{{ nutritionData.carbs }} g</ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>Fat</ion-col>
                  <ion-col>{{ nutritionData.fat }} g</ion-col>
                </ion-row>
              </ion-grid>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-page {
  color: black;
}
</style>
