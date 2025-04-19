<template>
  <div
    class="px-10 py-2 w-full border-2 my-4 rounded-2xl shadow-lg flex flex-col justify-center items-center"
  >
    <div class="w-full flex flex-col justify-between items-center">
      <IonLabel class="font-semibold w-full mt-2">Health conditions:</IonLabel>
      <div class="w-full">
        <IonList lines="none">
          <IonItem
            v-for="(condition, index) in Object.keys(healthConditions)"
            :key="index"
            class="flex items-center"
          >
            <IonCheckbox
              class="w-full"
              alignment="center"
              :value="condition"
              v-model="healthConditions[condition]"
              slot="start"
              >{{ condition.charAt(0).toUpperCase() + condition.slice(1) }}</IonCheckbox
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

type THealthConditions = {
  diabetes: Ref<boolean>
  hypertension: Ref<boolean>
  heartDisease: Ref<boolean>
  asthma: Ref<boolean>
  arthritis: Ref<boolean>
  cancer: Ref<boolean>
  other: Ref<boolean>
}

const healthConditions = ref<THealthConditions>({
  diabetes: ref(false),
  hypertension: ref(false),
  heartDisease: ref(false),
  asthma: ref(false),
  arthritis: ref(false),
  cancer: ref(false),
  other: ref(false),
})
</script>
