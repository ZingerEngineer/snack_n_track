<template>
  <IonPage>
    <IonToolbar class="border-b-4 px-4 tool-bar-notch-gaurd border-primary">
      <IonButtons slot="start">
        <IonBackButton :icon="home" defaultHref="/dashboard/home"></IonBackButton>
      </IonButtons>
      <IonList v-if="router.name === 'upload'" slot="end" class="flex flex-row items-center">
        <IonBadge
          v-if="isImageSelected"
          color="danger"
          class="rounded-r-none p-2"
          @click="isImageSelected && scan.resetPhoto()"
        >
          <div class="flex flex-row items-center justify-center gap-2">
            <FontAwesomeIcon :icon="faTrash" class="text-xl text-white"></FontAwesomeIcon>
          </div>
        </IonBadge>
        <IonBadge
          :class="isImageSelected ? 'rounded-l-none p-2' : 'p-2'"
          @click="
            isImageSelected &&
            modal.openModal(SelectedImageModal, {
              title: 'Selected image',
              lowerText: 'Is this your right food?',
            })
          "
        >
          <div class="flex text-white flex-row items-center justify-center gap-2">
            <FontAwesomeIcon :icon="faImage" class="text-xl"></FontAwesomeIcon><span>:</span
            ><span>{{ isImageSelected ? '1' : '0' }} </span>
          </div>
        </IonBadge>
      </IonList>
      <IonTitle>Scan</IonTitle>
    </IonToolbar>
    <IonRouterOutlet></IonRouterOutlet>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonBackButton,
  IonButtons,
  IonToolbar,
  IonRouterOutlet,
  IonBadge,
  IonList,
  IonTitle,
} from '@ionic/vue'
import { computed, watch } from 'vue'
import { home } from 'ionicons/icons'
import { useScanStore } from '../../stores/scan.store'
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useModalStore } from '../../stores/components/modal.store'
import SelectedImageModal from '../../components/SelectedImageModal.vue'
import { useRoute } from 'vue-router'
const scan = useScanStore()
const modal = useModalStore()
const isImageSelected = computed(() => scan.isImagePathSet)
const imagePath = computed(() => scan.imagePath)
watch([imagePath, isImageSelected], ([newImagePath, newIsImageSelected]) => {
  if (newImagePath && newIsImageSelected) {
    modal.openModal(SelectedImageModal, {
      title: 'Selected image',
      lowerText: 'Is this your right food?',
    })
  }
})
const router = useRoute()
</script>

<style scoped>
IonList {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
}
IonBadge {
  padding: 0.5rem;
}
</style>
