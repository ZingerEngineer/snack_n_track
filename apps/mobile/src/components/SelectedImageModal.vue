<!-- components/MainModal.vue -->
<template>
  <div class="min-w-72 flex flex-col gap-4 p-4 bg-white rounded-lg">
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl">{{ title }}</h1>
      <div class="w-full border-b-2 border-medium-shade/50"></div>
      <p class="text-dark-tint" v-if="lowerText">{{ lowerText }}</p>
    </div>
    <div class="flex justify-center items-center">
      <img
        class="w-52 border-2 rounded-lg border-medium-shade/50"
        v-if="scanStore.isImagePathSet"
        :src="scanStore.imagePath ?? ''"
        alt="Selected image"
      />
    </div>
  </div>
  <div class="flex items-center gap-4 mt-4">
    <IonButton @click="close" class="text-white"> Close </IonButton>
    <IonButton @click="handleAnalyse" class="text-white"> Analyse food </IonButton>
    <IonButton color="danger" @click="handleDelete" class="text-white">
      <FontAwesomeIcon class="text-white" :icon="faTrash"></FontAwesomeIcon>
    </IonButton>
  </div>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue'
import { useModalStore } from '../stores/components/modal.store'
import { useScanStore } from '../stores/scan.store'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'
defineProps({
  title: { type: String, default: '' },
  lowerText: { type: String, default: '' },
})

const router = useRouter()
const scanStore = useScanStore()
const modalStore = useModalStore()

function handleAnalyse() {
  scanStore.anaylsePhotoHandler()
  close()
  router.push('/scan/upload-results')
}

function handleDelete() {
  scanStore.resetPhoto()
  close()
}
function close() {
  modalStore.closeModal()
}
</script>
