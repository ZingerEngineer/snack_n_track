<template>
  <div
    class="px-10 py-2 w-full border-2 my-4 rounded-2xl shadow-lg flex flex-col justify-center items-center"
  >
    <div class="w-full flex flex-col justify-between items-center">
      <IonLabel class="font-semibold w-full mt-2">Weight:</IonLabel>
      <WeightSliderComponent
        :initial-unit="unit"
        :initial-weight="weight"
        :value="weight"
        :unit="unit"
        @update:weight="
          (event: WeightChangeEvent) => debouncedWeightUpdate(event.value, event.unit)
        "
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type WeightChangeEvent } from '../../../components/WeightSliderComponent.vue'
import { IonLabel } from '@ionic/vue'
import WeightSliderComponent from '../../../components/WeightSliderComponent.vue'
import { useUserIntroStore } from '../../../stores/user/user.intro.store'
import { useDebounce } from '../../../composables/useDebounce'
import { ref } from 'vue'

const userIntroStore = useUserIntroStore()

const weight = ref(userIntroStore.getWeight().value || 70)
const unit = ref(userIntroStore.getWeight().unit || 'kg')

const { debounced: debouncedWeightUpdate } = useDebounce(
  (weight: number, unit: string) => {
    userIntroStore.setWeight(weight, unit)
  },
  { delay: 100, leading: false },
)
</script>
