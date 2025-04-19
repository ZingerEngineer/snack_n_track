<script setup lang="ts">
import { IonPage, IonContent, IonButton } from '@ionic/vue'
import { useScanStore } from '../../stores/scan.store'
import { faCameraAlt, faImages } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const scan = useScanStore()
const isImageSelected = computed(() => scan.isImagePathSet)
const router = useRouter()

const handleScan = () => {
  scan.anaylsePhotoHandler()
  router.push('/scan/upload-results')
}
</script>

<template>
  <IonPage>
    <IonContent>
      <div
        class="content-wrapper h-full flex flex-col items-center justify-center mt-[var(--ion-top-bar-margin)]"
      >
        <div class="w-full h-full flex flex-col justify-center items-center gap-4">
          <div class="flex flex-col w-full h-full justify-center items-center">
            <div
              @click="scan.pickPhotoHandler"
              class="bg-secondary-shade hover:to-secondary-shade hover:from-emerald-300 hover:bg-gradient-to-t relative w-full h-full flex justify-center items-center z-[1]"
            >
              <FontAwesomeIcon
                :icon="faCameraAlt"
                class="text-[15rem] absolute z-[1] text-white/30 left-1 rotate-12"
              ></FontAwesomeIcon>
              <div class="flex flex-col items-center justify-center gap-2 z-[2]">
                <FontAwesomeIcon :icon="faCameraAlt" class="text-5xl text-white"></FontAwesomeIcon>
                <p class="text-white font-bold text-sm">Take an instant photo.</p>
              </div>
            </div>
            <div
              @click="scan.pickPhotoHandler"
              class="bg-tertiary-shade hover:from-tertiary-shade hover:to-secondary hover:bg-gradient-to-t relative w-full h-full flex justify-center items-center z[1]"
            >
              <FontAwesomeIcon
                :icon="faImages"
                class="text-[15rem] absolute z-[1] text-white/30 right-1 -rotate-12"
              ></FontAwesomeIcon>
              <div class="flex flex-col items-center justify-center gap-2 z-[2]">
                <FontAwesomeIcon :icon="faImages" class="text-5xl text-white"></FontAwesomeIcon>
                <p class="text-white font-bold text-sm">Grab a photo from the gallery.</p>
              </div>
            </div>
          </div>
          <IonButton
            class="absolute bottom-4 right-10 transition-all duration-300 ease-in-out text-white z-50"
            v-if="isImageSelected"
            @click="handleScan"
          >
            Analyse Food
          </IonButton>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<style scoped>
IonPage {
  color: black;
}
</style>
