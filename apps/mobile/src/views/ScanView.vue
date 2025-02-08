<script setup lang="ts">
import { cameraOutline, trash } from 'ionicons/icons'
import { IonPage, IonContent, IonIcon, IonButton } from '@ionic/vue'
import { ref } from 'vue'
import pickPicture from '../apis/mobile/pickPicture'
import { INutritionData, IEstimatedNutritionData } from '../types/global.types'

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
          <ion-card
            v-if="nutritionData"
            :class="{
              'border-2 border-green-500': 'name' in nutritionData,
              'border-2 border-yellow-500': 'estimated_name' in nutritionData,
            }"
          >
            <ion-card-header>
              <ion-card-title>Nutrition Facts</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-grid>
                <ion-row v-if="'name' in nutritionData">
                  <ion-col>Name</ion-col>
                  <ion-col>{{ nutritionData.name }}</ion-col>
                </ion-row>
                <ion-row v-if="'estimated_name' in nutritionData">
                  <ion-col>Estimated Name</ion-col>
                  <ion-col>{{ nutritionData.estimated_name }}</ion-col>
                </ion-row>
                <ion-row v-if="'type_of_food' in nutritionData">
                  <ion-col>Type of Food</ion-col>
                  <ion-col>{{ nutritionData.type_of_food }}</ion-col>
                </ion-row>
                <ion-row v-if="'estimated_typeOfFood' in nutritionData">
                  <ion-col>Estimated Type of Food</ion-col>
                  <ion-col>{{ nutritionData.estimated_typeOfFood }}</ion-col>
                </ion-row>
                <ion-row v-if="'proteins' in nutritionData">
                  <ion-col>Proteins</ion-col>
                  <ion-col>{{ nutritionData.proteins }} g</ion-col>
                </ion-row>
                <ion-row v-if="'carbs' in nutritionData">
                  <ion-col>Carbohydrates</ion-col>
                  <ion-col>{{ nutritionData.carbs }} g</ion-col>
                </ion-row>
                <ion-row v-if="'fats' in nutritionData">
                  <ion-col>Fats</ion-col>
                  <ion-col>{{ nutritionData.fats }} g</ion-col>
                </ion-row>
                <ion-row v-if="'vitamins' in nutritionData">
                  <ion-col>Vitamins</ion-col>
                  <ion-col>
                    <ul>
                      <li v-for="(vitamin, index) in nutritionData.vitamins" :key="index">
                        {{ vitamin.vitamin_name }}: {{ vitamin.vitamin_portion }}
                      </li>
                    </ul>
                  </ion-col>
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
