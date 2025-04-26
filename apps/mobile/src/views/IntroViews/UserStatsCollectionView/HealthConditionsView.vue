<!-- eslint-disable vue/no-deprecated-slot-attribute -->
// eslint-disable-next-line vue/no-deprecated-slot-attribute
<template>
  <div
    class="px-2 py-2 w-full border-2 my-4 rounded-2xl shadow-lg flex flex-col justify-center items-center"
  >
    <div class="w-full flex flex-col justify-between items-center overflow-y-auto max-h-[50vh]">
      <IonLabel class="font-semibold w-full p-2 flex justify-center items-center"
        >Health conditions</IonLabel
      >
      <div class="w-full">
        <IonList lines="none">
          <IonItem
            class="flex items-center"
            :value="'none'"
            :checked="chosenHealthConditions.includes('none')"
            @click="updateChosenHealthConditions('none')"
          >
            <IonRadio
              class="w-full"
              alignment="center"
              value="none"
              slot="start"
              :checked="chosenHealthConditions.includes('none')"
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
            v-for="(condition, index) in healthConditionsList"
            :key="index"
            class="flex items-center"
            :value="condition.value"
            :checked="chosenHealthConditions.includes(condition.value)"
            @click="updateChosenHealthConditions(condition.value)"
          >
            <IonCheckbox
              class="w-full"
              alignment="center"
              :value="condition.value"
              slot="start"
              :checked="chosenHealthConditions.includes(condition.value)"
            >
              <IonLabel
                class="small-label p-2 text-ellipsis overflow-hidden whitespace-nowrap max-w-56"
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
import { healthConditions as healthConditionsList } from '../../../statics/user/userIntro/healthConditions'

const userIntroStore = useUserIntroStore()

const alreadySelectedHealthConditions = clone(userIntroStore.getHealthConditions())

const chosenHealthConditions = ref<string[]>(alreadySelectedHealthConditions || [])

const updateChosenHealthConditions = (condition: string) => {
  if (condition === 'none') {
    if (chosenHealthConditions.value.includes('none')) {
      chosenHealthConditions.value = ['none']
    } else {
      chosenHealthConditions.value = ['none']
    }
  } else {
    const updatedConditions = new Set(chosenHealthConditions.value)

    if (updatedConditions.has(condition)) {
      updatedConditions.delete(condition)
    } else {
      updatedConditions.add(condition)
    }

    // Remove 'none' if any other condition is selected
    updatedConditions.delete('none')

    chosenHealthConditions.value = Array.from(updatedConditions)
  }
  console.log('Updated chosen health conditions:', chosenHealthConditions.value)
}

const { debounced: debouncedHealthConditionUpdate } = useDebounce(
  (newHealthConditions: string[]) => {
    userIntroStore.setHealthConditions(newHealthConditions)
  },
  { delay: 200, leading: false },
)

watch(chosenHealthConditions, (newValue: string[]) => {
  console.log('New health conditions:', newValue)
  debouncedHealthConditionUpdate(newValue)
})
</script>

<style scoped lang="css">
.small-label {
  font-size: 0.85rem;
}
</style>
