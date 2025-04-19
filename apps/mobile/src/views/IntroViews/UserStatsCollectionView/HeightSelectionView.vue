<template>
  <div
    class="px-10 py-2 w-full border-2 my-4 rounded-2xl shadow-lg flex flex-col justify-center items-center"
  >
    <div class="w-full flex flex-col justify-between items-center">
      <IonLabel class="font-semibold w-full mt-2">Height:</IonLabel>
      <HeightSliderComponent />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IonLabel } from '@ionic/vue'
import HeightSliderComponent from '../../../components/HeightSliderComponent.vue'
</script>
