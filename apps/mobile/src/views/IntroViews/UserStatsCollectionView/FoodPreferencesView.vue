<template>
  <div
    class="px-10 py-2 w-full border-2 my-4 rounded-2xl shadow-lg flex flex-col justify-center items-center"
  >
    <div class="w-full flex flex-col justify-between items-center">
      <ion-label class="font-semibold w-full mt-2">Food Preferences:</ion-label>
      <div class="w-full">
        <IonList lines="none">
          <IonItem
            v-for="(preference, index) in Object.keys(foodPreferences)"
            :key="index"
            class="flex items-center"
          >
            <IonCheckbox
              class="w-full"
              alignment="center"
              :value="preference"
              v-model="foodPreferences[preference]"
              slot="start"
              >{{ preference.charAt(0).toUpperCase() + preference.slice(1) }}</IonCheckbox
            >
          </IonItem>
        </IonList>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { IonLabel, IonCheckbox, IonItem, IonList } from '@ionic/vue'

type TFoodPreferences = {
  vegan: Ref<boolean>
  glutenFree: Ref<boolean>
  dairyFree: Ref<boolean>
  other: Ref<boolean>
}

const foodPreferences = ref<TFoodPreferences>({
  vegan: ref(false),
  glutenFree: ref(false),
  dairyFree: ref(false),
  other: ref(false),
})
</script>
