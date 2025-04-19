<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import ModalComponent from './components/ModalComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'
import { isPlatform } from '@ionic/vue'

// Determine if the app is running in a native (hybrid or mobile) environment.
const isNative = isPlatform('hybrid') || isPlatform('mobile')
console.log('isNative:', isNative)
</script>

<template>
  <LoadingComponent />
  <IonApp :class="{ 'safe-area': isNative }">
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

    <IonRouterOutlet />
  </IonApp>
</template>
<style lang="css" scoped>
.safe-area {
  margin-top: var(--safe-area-inset-top, 20px);
}
</style>
