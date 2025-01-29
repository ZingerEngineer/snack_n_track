<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import { ref } from 'vue'
import pickPicture from '../apis/mobile/pickPicture'

const imagePath = ref<string | null>(null)
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
    const response = await fetch('http://localhost:3000/v1/api/upload', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Snack n' Track v0</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="p-4 flex flex-col justify-center items-center gap-4">
        <p class="text-2xl font-semibold">Main page</p>
        <div class="flex flex-col justify-center items-center">
          <p>
            Image path: <span>{{ imagePath }}</span>
          </p>
          <div class="flex justify-center items-center aspect-square overflow-hidden w-64">
            <div
              v-if="imagePath"
              :style="{ backgroundImage: imagePath ? `url(${imagePath})` : 'none' }"
              class="w-64 h-64 bg-cover bg-center rounded-md border-2 border-gray-400 shadow-xl"
            ></div>
            <div
              v-else
              class="w-64 h-64 bg-cover bg-center rounded-md border-2 from-gray-300 to-gray-400 bg-gradient-to-l border-gray-400 shadow-xl"
            ></div>
          </div>
        </div>
        <div id="buttons-wrapper" class="flex flex-col gap-2">
          <div class="flex flex-row justify-center items-center">
            <button
              :onclick="pickPhotoHandler"
              :class="[
                'px-6 py-4 font-semibold bg-black text-white mt-4',
                imagePath ? 'rounded-md rounded-r-none' : 'rounded-md',
              ]"
            >
              {{ imagePath ? 'Change' : 'Pick' }} Photo
            </button>
            <button
              v-if="imagePath"
              :onclick="resetPhoto"
              class="px-4 py-4 font-semibold bg-red-500 text-white rounded-md rounded-l-none mt-4"
            >
              X
            </button>
          </div>

          <button
            :onclick="anaylsePhotoHandler"
            class="px-6 py-4 font-semibold bg-black text-white rounded-md mt-4"
          >
            Analyse Food
          </button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-page {
  color: white;
}
</style>
