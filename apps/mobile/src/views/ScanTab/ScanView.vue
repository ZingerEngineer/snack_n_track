<template>
  <IonPage>
    <IonToolbar class="border-b-4 px-4 tool-bar-notch-gaurd border-primary">
      <IonButton slot="secondary" @click="handleRouteHome" fill="clear">
        <FontAwesomeIcon :icon="faHome" /> Home
      </IonButton>
      <IonTitle slot="start">Scan</IonTitle>
    </IonToolbar>
    <IonRouterOutlet></IonRouterOutlet>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonToolbar, IonRouterOutlet, IonTitle } from '@ionic/vue'
import { computed, watch, onMounted } from 'vue'
import { useScanStore } from '../../stores/scanStore/scan.store'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'

const scan = useScanStore()
const router = useRouter()

// Enhanced computed properties using the new store features
const currentProgress = computed(() => scan.currentProgress)
const lastError = computed(() => scan.lastError)

const handleRouteHome = () => {
  scan.reset()
  router.push('/dashboard/home')
}

// Watch for errors and handle them
watch(lastError, (error) => {
  if (error) {
    console.error('Scan error:', error)
    // Handle different error types here if needed
    // For example, show toast notifications for different error codes
  }
})

// Watch progress for debugging/logging
watch(currentProgress, (progress) => {
  console.log(`Scan progress: ${progress.step} - ${progress.message} (${progress.progress}%)`)
})

// Initialize the store when component mounts
onMounted(async () => {
  await scan.initialize()
})
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
