<template>
  <div
    class="px-10 py-2 w-full border-2 my-4 rounded-2xl shadow-lg flex flex-col justify-center items-center"
  >
    <div class="w-full flex flex-col justify-between items-center">
      <IonLabel class="font-semibold w-full mt-2">Height:</IonLabel>
      <HeightSliderComponent
        :initial-height="height"
        :initial-unit="unit"
        @update:height="(event) => debouncedHeightUpdate(event.value, event.unit)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IonLabel } from '@ionic/vue'
import HeightSliderComponent from '../../../components/HeightSliderComponent.vue'
import { useUserIntroStore } from '../../../stores/user/user.intro.store'
import { useDebounce } from '../../../composables/useDebounce'
import { ref } from 'vue'

const userIntroStore = useUserIntroStore()

const height = ref(userIntroStore.getHeight().value || 170)
const unit = ref(userIntroStore.getHeight().unit || 'cm')

const { debounced: debouncedHeightUpdate } = useDebounce(
  (height: number, unit: string) => {
    userIntroStore.setHeight(height, unit)
  },
  { delay: 100, leading: false },
)
</script>
