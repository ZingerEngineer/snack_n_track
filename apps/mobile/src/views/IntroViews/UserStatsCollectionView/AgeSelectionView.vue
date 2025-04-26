<template>
  <div
    class="px-10 py-2 w-full border-2 my-4 rounded-2xl shadow-lg flex flex-col justify-center items-center"
  >
    <div class="w-full flex flex-col justify-between items-center">
      <IonLabel class="font-semibold w-full mt-2">Age:</IonLabel>
      <div class="w-full">
        <IonRange
          aria-label="Range with ticks"
          :pin="true"
          :pin-formatter="pinFormatter"
          :ticks="true"
          :snaps="true"
          :min="10"
          :max="100"
          :value="age"
        ></IonRange>
      </div>
    </div>
  </div>
  <div class="w-full text-[7rem] flex justify-center items-center">{{ age }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { IonLabel, IonRange } from '@ionic/vue'
import { useUserIntroStore } from '../../../stores/user/user.intro.store'
import { useDebounce } from '../../../composables/useDebounce'

const { debounced: debouncedAgeUpdate } = useDebounce(
  (age: number) => {
    userIntroStore.setAge(age)
  },
  { delay: 100, leading: false },
)

const userIntroStore = useUserIntroStore()

const age = ref(userIntroStore.getAge() || 20)

const pinFormatter = (value: number) => {
  age.value = value
  debouncedAgeUpdate(value)
  return `${value}`
}
</script>
