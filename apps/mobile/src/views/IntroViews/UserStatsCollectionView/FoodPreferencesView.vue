<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <div
    class="px-2 py-2 w-full border-2 my-4 rounded-2xl shadow-lg flex flex-col justify-center items-center"
  >
    <div class="w-full flex flex-col justify-between items-center overflow-y-auto max-h-[50vh]">
      <IonLabel class="font-semibold w-full p-2 flex justify-center items-center"
        >Food preferences</IonLabel
      >
      <div class="w-full">
        <IonList lines="none">
          <IonItem
            class="flex items-center"
            :value="'none'"
            :checked="chosenFoodPreferences.includes('none')"
            @click="updatechosenFoodPreferences('none')"
          >
            <IonRadio
              class="w-full"
              alignment="center"
              value="none"
              slot="start"
              :checked="chosenFoodPreferences.includes('none')"
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
            v-for="(condition, index) in foodPreferences"
            :key="index"
            class="flex items-center"
            :value="condition.value"
            :checked="chosenFoodPreferences.includes(condition.value)"
            @click="updatechosenFoodPreferences(condition.value)"
          >
            <IonCheckbox
              class="w-full"
              alignment="center"
              :value="condition.value"
              slot="start"
              :checked="chosenFoodPreferences.includes(condition.value)"
            >
              <IonLabel
                si
                class="small-label p-2 text-ellipsis overflow-hidden whitespace-nowrap"
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
import { foodPreferences } from '../../../statics/user/userIntro/foodPreferences'

const userIntroStore = useUserIntroStore()

const alreadySelectedFoodPreferences = clone(userIntroStore.getFoodPreferences())

const chosenFoodPreferences = ref<string[]>(alreadySelectedFoodPreferences || [])

const updatechosenFoodPreferences = (condition: string) => {
  if (condition === 'none') {
    if (chosenFoodPreferences.value.includes('none')) {
      chosenFoodPreferences.value = ['none']
    } else {
      chosenFoodPreferences.value = ['none']
    }
  } else {
    const updatedConditions = new Set(chosenFoodPreferences.value)

    if (updatedConditions.has(condition)) {
      updatedConditions.delete(condition)
    } else {
      updatedConditions.add(condition)
    }

    // Remove 'none' if any other condition is selected
    updatedConditions.delete('none')

    chosenFoodPreferences.value = Array.from(updatedConditions)
  }
  console.log('Updated chosen health conditions:', chosenFoodPreferences.value)
}

const { debounced: debouncedFoodPreferencesUpdate } = useDebounce(
  (newHealthConditions: string[]) => {
    userIntroStore.setFoodPreferences(newHealthConditions)
  },
  { delay: 200, leading: false },
)

watch(chosenFoodPreferences, (newValue: string[]) => {
  console.log('New health conditions:', newValue)
  debouncedFoodPreferencesUpdate(newValue)
})
</script>

<style scoped lang="css">
.small-label {
  font-size: 0.85rem;
}
</style>
