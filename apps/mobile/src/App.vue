<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import ModalComponent from './components/ModalComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'
</script>

<template>
  <ion-app>
    <LoadingComponent />
    <ModalComponent modalId="modal">
      <template #header>
        <h1 class="text-2xl font-bold">Modal Header</h1>
      </template>
      <template #body>
        <p class="text-lg">Modal Body</p>
      </template>
      <template #footer>
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg">Close</button>
      </template>
    </ModalComponent>
    <ion-router-outlet />
  </ion-app>
</template>
<style scoped>
ion-app {
  background-color: #343434;
}
</style>
