<template>
  <div id="title" class="px-10 w-full flex flex-col justify-center items-center">
    <h1 class="w-full text-3xl font-bold">Let's get started!</h1>
    <h1 class="w-full font-bold">Tell us more about yourself:</h1>
  </div>

  <div class="px-5 w-full flex-grow">
    <AgeSelectionView v-if="currentIndex === 3" />
    <WeightSelectionView v-if="currentIndex === 4" />
    <HeightSelectionView v-if="currentIndex === 5" />
    <HealthConditionsView v-if="currentIndex === 6" />
    <DietaryRestrictionsView v-if="currentIndex === 7" />
    <FoodPreferencesView v-if="currentIndex === 8" />
    <FoodAllergiesView v-if="currentIndex === 9" />
  </div>
</template>

<script lang="ts" setup>
import useSwiperStore from '../../../stores/swiper.store'

import WeightSelectionView from './WeightSelectionView.vue'
import HeightSelectionView from './HeightSelectionView.vue'
import HealthConditionsView from './HealthConditionsView.vue'
import DietaryRestrictionsView from './DietaryRestrictionsView.vue'
import FoodPreferencesView from './FoodPreferencesView.vue'
import FoodAllergiesView from './FoodAllergiesView.vue'
import AgeSelectionView from './AgeSelectionView.vue'
import { computed } from 'vue'

const swiperStore = useSwiperStore()
const currentIndex = computed(() => swiperStore.getCurrentIndex())
</script>
