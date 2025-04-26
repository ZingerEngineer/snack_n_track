<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <div
    class="px-2 py-2 w-full border-2 my-4 rounded-2xl shadow-lg flex flex-col justify-center items-center"
  >
    <div class="w-full flex flex-col justify-between items-center overflow-y-auto max-h-[50vh]">
      <IonLabel class="font-semibold w-full p-2 flex justify-center items-center"
        >Dietary Restrictions</IonLabel
      >
      <div class="w-full">
        <IonList lines="none">
          <IonRadioGroup class="flex flex-col justify-center" :value="chosenDietaryRestriction">
            <IonItem v-for="(condition, index) in dietaryRestrictions" :key="index">
              <IonRadio
                @click="debouncedDietaryRestrictionUpdate(condition.value)"
                class="w-full"
                alignment="center"
                :value="condition.value"
                slot="start"
                :checked="chosenDietaryRestriction === condition.value"
              >
                <IonLabel
                  si
                  class="small-label p-2 text-ellipsis overflow-hidden whitespace-nowrap max-w-40"
                  :value="condition.value"
                >
                  {{ condition.label }}
                </IonLabel>
              </IonRadio>
            </IonItem>
          </IonRadioGroup>
        </IonList>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IonItem, IonLabel, IonList, IonRadio, IonRadioGroup } from '@ionic/vue'
import { ref } from 'vue'
import { useUserIntroStore } from '../../../stores/user/user.intro.store'
import { useDebounce } from '../../../composables/useDebounce'
import { dietaryRestrictions } from '../../../statics/user/userIntro/dietaryRestrictions'

const userIntroStore = useUserIntroStore()

const chosenDietaryRestriction = ref<string>(userIntroStore.getDietaryRestrictions() || 'none')

const { debounced: debouncedDietaryRestrictionUpdate } = useDebounce(
  (newValue: string) => {
    userIntroStore.setDietaryRestrictions(newValue)
  },
  { delay: 150, leading: false },
)
</script>

<style scoped lang="css">
.small-label {
  font-size: 0.85rem;
}
</style>
