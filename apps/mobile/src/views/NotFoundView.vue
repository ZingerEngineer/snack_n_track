<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Page Not Found</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="not-found-container">
        <h1>404</h1>
        <p class="text-sm">The page you are looking for does not exist.</p>
        <ion-button @click="goHome">Go to Home</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue'

const router = useRouter()

const goHome = () => {
  router.push('/dashboard/home')
}
</script>

<style scoped>
.not-found-container {
  text-align: center;
  margin-top: 50px;
}

.not-found-container h1 {
  font-size: 6rem;
  margin-bottom: 20px;
}

.not-found-container p {
  font-size: 1.5rem;
  margin-bottom: 20px;
}
</style>
