<template>
  <div
    class="px-10 py-2 w-full border-2 my-4 rounded-2xl shadow-lg flex flex-col justify-center items-center"
  >
    <div class="w-full flex flex-col justify-between items-center">
      <IonLabel class="font-semibold w-full mt-2">Dietary Preferences:</IonLabel>
      <div class="w-full">
        <IonRadioGroup v-model="dietaryRestrictions" name="dietaryRestrictions">
          <div
            v-for="(option, index) in dietaryOptions"
            :key="index"
            class="flex items-center my-2"
          >
            <IonRadio fill="solid" :value="option.value" class="w-full p-2">
              {{ option.label }}</IonRadio
            >
          </div>
        </IonRadioGroup>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { IonLabel, IonRadio, IonRadioGroup } from '@ionic/vue'

const dietaryOptions = [
  { label: 'Natural', value: 0 },
  { label: 'Lactose Intelorant', value: 1 },
]
const dietaryRestrictions = ref<number>(0) // Default value set to 2
</script>
