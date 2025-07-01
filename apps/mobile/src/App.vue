<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import ModalComponent from './components/ModalComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'
import { isPlatform } from '@ionic/vue'
import { onMounted } from 'vue'
import { useLanguageStore } from './stores/useLocaleLaguage'
const languageStore = useLanguageStore()
// Determine if the app is running in a native (hybrid or mobile) environment.
const isNative = isPlatform('hybrid') || isPlatform('mobile')
onMounted(() => {
  languageStore.initializeLanguage()
})
</script>

<template>
  <LoadingComponent />
  <ModalComponent />
  <IonApp :class="{ 'safe-area': isNative }">
    <IonRouterOutlet />
  </IonApp>
</template>
