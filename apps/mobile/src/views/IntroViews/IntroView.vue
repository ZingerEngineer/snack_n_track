<template>
  <div class="w-full h-full flex flex-col items-center">
    <div class="w-full h-full flex flex-col justify-center items-center">
      <!-- //step content -->
      <LanguageSelection v-if="currentIndex === 0" />
      <DescriptionView v-if="currentIndex === 1" />
      <OnTrackView v-if="currentIndex === 2" />
      <UserStatsCollectionView v-if="currentIndex === 3" />
    </div>
    <div id="intro-buttons" class="flex justify-between items-center w-full px-4">
      <ion-button @click="backwardButtonFunctionallity">
        <img v-if="currentIndex === 0" src="../../assets/en_svg.svg" alt="English" />
        <ion-label>{{ backwardButtonLabel }}</ion-label>
      </ion-button>
      <ion-button @click="forwardButtonFunctionallity">
        <img v-if="currentIndex === 0" src="../../assets/ar_svg.svg" alt="Arabic" />
        <ion-label>{{ forwardButtonLabel }}</ion-label>
      </ion-button>
    </div>
    <div>
      <SwiperBulletsComponent
        :slides="slides"
        :goToSlide="goToSlide"
        :currentIndex="currentIndex"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import useSwiperStore from '../../stores/swiper.store'
import { IonButton, IonLabel } from '@ionic/vue'
import SwiperBulletsComponent from '../../components/SwiperBulletsComponent.vue'
import LanguageSelection from './LanguageSelection.vue'
import DescriptionView from './DescriptionView.vue'
import OnTrackView from './OnTrackView.vue'
import UserStatsCollectionView from './UserStatsCollectionView/UserStatsCollectionView.vue'
const backwardButtonLabel = ref<string>('English')
const forwardButtonLabel = ref<string>('Arabic')
const swiperStore = useSwiperStore()
swiperStore.setSwiperLength(4)
swiperStore.setCurrentIndex(0)
const slides = computed(() => swiperStore.getSwiperLength())
const currentIndex = computed(() => swiperStore.getCurrentIndex())

const goToSlide = (index: number) => {
  swiperStore.setCurrentIndex(index)
}

const backwardButtonFunctionallity = () => {
  if (currentIndex.value === 0) {
    backwardButtonLabel.value = 'Back'
    forwardButtonLabel.value = 'Next'
    swiperStore.goToIndex(currentIndex.value + 1)
  } else {
    if (currentIndex.value === 1) {
      backwardButtonLabel.value = 'English'
      forwardButtonLabel.value = 'Arabic'
    }
    swiperStore.setCurrentIndex(currentIndex.value - 1)
  }
  console.log(currentIndex.value)
}
const forwardButtonFunctionallity = () => {
  if (currentIndex.value === 0) {
    forwardButtonLabel.value = 'Next'
    backwardButtonLabel.value = 'Back'
    swiperStore.goToIndex(currentIndex.value + 1)
  } else {
    swiperStore.setCurrentIndex(currentIndex.value + 1)
  }
  console.log(currentIndex.value)
}
</script>

<style scoped></style>
