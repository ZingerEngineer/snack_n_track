<template>
  <IonPage>
    <IonContent>
      <div
        class="content-wrapper h-full flex gap-5 flex-col items-center justify-center from-tertiary via-primary to-white bg-gradient-to-t"
      >
        <FontAwesomeIcon
          :icon="faMagicWandSparkles"
          class="absolute blur-md top-[9rem] opacity-50 text-8xl text-white"
        ></FontAwesomeIcon
        ><FontAwesomeIcon
          :icon="faMagicWandSparkles"
          class="absolute blur-sm opacity-10 text-[22rem] left-40 text-white"
        ></FontAwesomeIcon>
        <FontAwesomeIcon :icon="faMagicWandSparkles" class="text-8xl text-white"></FontAwesomeIcon>
        <p class="font-bold text-white px-10">
          Pick a picture for your food and let us do the magic!
        </p>
        <IonButton @click="handleRouteToUpload">Scan Food</IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton } from '@ionic/vue'
import { faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'
const router = useRouter()

const handleRouteToUpload = () => {
  router.push('/scan/upload')
}
</script>
