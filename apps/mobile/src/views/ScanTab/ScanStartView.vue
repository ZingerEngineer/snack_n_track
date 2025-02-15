<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue'
import { faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'
const router = useRouter()

const handleRouteToUpload = () => {
  router.push('/scan/upload')
}
</script>

<template>
  <ion-page>
    <ion-content>
      <div
        class="content-wrapper h-full flex gap-5 flex-col items-center justify-center bg-tertiary"
      >
        <FontAwesomeIcon
          :icon="faMagicWandSparkles"
          class="absolute blur-md top-[15rem] opacity-50 text-8xl text-white"
        ></FontAwesomeIcon
        ><FontAwesomeIcon
          :icon="faMagicWandSparkles"
          class="absolute blur-sm opacity-10 text-[22rem] left-40 text-white"
        ></FontAwesomeIcon>
        <FontAwesomeIcon :icon="faMagicWandSparkles" class="text-8xl text-white"></FontAwesomeIcon>
        <p class="font-bold text-white">Pick a picture for your food and let us do the magic!</p>
        <ion-button @click="handleRouteToUpload">Scan Food</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped></style>
