<template>
  <IonPage>
    <IonHeader>
      <IonToolbar class="tool-bar-notch-gaurd">
        <IonTitle>Page Not Found</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="tool-bar-safe-margin">
      <div class="text-center mt-[50px]">
        <h1 class="text-8xl mb-5">404</h1>
        <p class="text-sm mb-5">The page you are looking for does not exist.</p>
        <IonButton @click="goHome">Go to Home</IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue'

const router = useRouter()

const goHome = () => {
  router.push('/dashboard/home')
}
</script>
