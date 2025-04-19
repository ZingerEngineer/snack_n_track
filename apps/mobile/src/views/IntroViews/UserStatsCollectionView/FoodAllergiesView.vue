<template>
  <div
    class="px-10 py-2 w-full border-2 my-4 rounded-2xl shadow-lg flex flex-col justify-center items-center"
  >
    <div class="w-full flex flex-col justify-between items-center">
      <IonLabel class="font-semibold w-full mt-2">Food Allergies:</IonLabel>
      <div class="w-full">
        <IonList lines="none">
          <IonItem
            v-for="(allergy, index) in Object.keys(foodAllergies)"
            :key="index"
            class="flex items-center"
          >
            <IonCheckbox
              class="w-full"
              alignment="center"
              :value="allergy"
              v-model="foodAllergies[allergy]"
              slot="start"
              >{{ allergy.charAt(0).toUpperCase() + allergy.slice(1) }}</IonCheckbox
            >
          </IonItem>
        </IonList>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IonLabel, IonItem, IonList, IonCheckbox } from '@ionic/vue'
import { ref, type Ref } from 'vue'

type TFoodAllergies = {
  gluten: Ref<boolean>
  dairy: Ref<boolean>
  nuts: Ref<boolean>
  shellfish: Ref<boolean>
  soy: Ref<boolean>
  eggs: Ref<boolean>
  other: Ref<boolean>
}

const foodAllergies = ref<TFoodAllergies>({
  gluten: ref(false),
  dairy: ref(false),
  nuts: ref(false),
  shellfish: ref(false),
  soy: ref(false),
  eggs: ref(false),
  other: ref(false),
})
</script>
