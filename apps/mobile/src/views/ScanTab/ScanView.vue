<script setup lang="ts">
import {
  IonPage,
  IonBackButton,
  IonButtons,
  IonToolbar,
  IonRouterOutlet,
  IonBadge,
  IonList,
} from '@ionic/vue'
import { computed, watch } from 'vue'
import { home } from 'ionicons/icons'
import { useScanStore } from '../../stores/scan.store'
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useModalStore } from '../../stores/modal.store'
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

<template>
  <ion-page>
    <ion-toolbar class="border-b-4 border-primary">
      <ion-buttons slot="start">
        <ion-back-button :icon="home" defaultHref="/dashboard/home"></ion-back-button>
      </ion-buttons>
      <ion-list v-if="router.name === 'upload'" slot="end">
        <ion-badge
          v-if="isImageSelected"
          color="danger"
          class="rounded-r-none"
          @click="isImageSelected && scan.resetPhoto()"
        >
          <div class="flex flex-row items-center justify-center gap-2">
            <FontAwesomeIcon :icon="faTrash" class="text-xl text-white"></FontAwesomeIcon>
          </div>
        </ion-badge>
        <ion-badge
          :class="isImageSelected ? 'rounded-l-none' : ''"
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
            ><span>{{ isImageSelected ? '1 Selected' : '0 Selected' }} </span>
          </div>
        </ion-badge>
      </ion-list>
      <ion-title>Scan</ion-title>
    </ion-toolbar>
    <ion-router-outlet></ion-router-outlet>
  </ion-page>
</template>

<style scoped>
ion-list {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
}
ion-badge {
  padding: 0.5rem;
}
</style>
