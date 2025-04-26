<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <div
    class="px-2 py-2 w-full border-2 my-4 rounded-2xl shadow-lg flex flex-col justify-center items-center"
  >
    <div class="w-full flex flex-col justify-between items-center overflow-y-auto max-h-[50vh]">
      <IonLabel class="font-semibold w-full p-2 flex justify-center items-center"
        >Food allergies</IonLabel
      >
      <div class="w-full">
        <IonList lines="none">
          <IonItem
            class="flex items-center"
            :value="'none'"
            :checked="chosenFoodAllergies.includes('none')"
            @click="updateChosenFoodAllergies('none')"
          >
            <IonRadio
              class="w-full"
              alignment="center"
              value="none"
              slot="start"
              :checked="chosenFoodAllergies.includes('none')"
            >
              <IonLabel
                class="small-label p-2 text-ellipsis overflow-hidden whitespace-nowrap w-full"
                value="none"
              >
                None
              </IonLabel>
            </IonRadio>
          </IonItem>
          <IonItem
            v-for="(condition, index) in foodAllergies"
            :key="index"
            class="flex items-center"
            :value="condition.value"
            :checked="chosenFoodAllergies.includes(condition.value)"
            @click="updateChosenFoodAllergies(condition.value)"
          >
            <IonCheckbox
              class="w-full"
              alignment="center"
              :value="condition.value"
              slot="start"
              :checked="chosenFoodAllergies.includes(condition.value)"
            >
              <IonLabel
                si
                class="small-label p-2 text-ellipsis overflow-hidden whitespace-nowrap max-w-40"
                :value="condition.value"
              >
                {{ condition.label }}
              </IonLabel>
            </IonCheckbox>
          </IonItem>
        </IonList>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { clone } from 'lodash'
import { IonLabel, IonItem, IonList, IonCheckbox, IonRadio } from '@ionic/vue'
import { ref, watch } from 'vue'
import { useUserIntroStore } from '../../../stores/user/user.intro.store'
import { useDebounce } from '../../../composables/useDebounce'
import { foodAllergies } from '../../../statics/user/userIntro/foodAllergies'

const userIntroStore = useUserIntroStore()

const alreadySelectedFoodAllergies = clone(userIntroStore.getFoodAllergies())

const chosenFoodAllergies = ref<string[]>(alreadySelectedFoodAllergies || [])

const updateChosenFoodAllergies = (condition: string) => {
  if (condition === 'none') {
    if (chosenFoodAllergies.value.includes('none')) {
      chosenFoodAllergies.value = ['none']
    } else {
      chosenFoodAllergies.value = ['none']
    }
  } else {
    const updatedConditions = new Set(chosenFoodAllergies.value)

    if (updatedConditions.has(condition)) {
      updatedConditions.delete(condition)
    } else {
      updatedConditions.add(condition)
    }

    // Remove 'none' if any other condition is selected
    updatedConditions.delete('none')

    chosenFoodAllergies.value = Array.from(updatedConditions)
  }
  console.log('Updated chosen health conditions:', chosenFoodAllergies.value)
}

const { debounced: debouncedFoodAllergiesUpdate } = useDebounce(
  (newHealthConditions: string[]) => {
    userIntroStore.setFoodAllergies(newHealthConditions)
  },
  { delay: 200, leading: false },
)

watch(chosenFoodAllergies, (newValue: string[]) => {
  console.log('New health conditions:', newValue)
  debouncedFoodAllergiesUpdate(newValue)
})
</script>

<style scoped lang="css">
.small-label {
  font-size: 0.85rem;
}
</style>
