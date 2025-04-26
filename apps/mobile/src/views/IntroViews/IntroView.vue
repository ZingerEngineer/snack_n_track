<template>
  <div class="w-full h-full flex flex-col items-center">
    <div class="h-full flex flex-col justify-center items-center max-w-[25rem] px-4 sm:px-8">
      <LanguageSelection v-if="currentIndex === 0" />
      <DescriptionView v-if="currentIndex === 1" />
      <OnTrackView v-if="currentIndex === 2" />
      <UserStatsCollectionView v-if="currentIndex >= 3 && currentIndex < 10" />
      <FinishIntroView v-if="currentIndex === 10" />
    </div>
    <div
      id="intro-buttons"
      class="flex justify-between items-center w-full px-4 max-w-96 mt-4 sm:mt-6"
    >
      <IonButton @click="backwardButtonFunctionallity" class="flex items-center">
        <img
          v-if="currentIndex === 0"
          src="../../assets/en_svg.svg"
          alt="English"
          class="w-6 h-6 sm:w-8 sm:h-8"
        />
        <IonLabel class="ml-2 text-sm sm:text-base">{{ backwardButtonLabel }}</IonLabel>
      </IonButton>
      <IonButton @click="forwardButtonFunctionallity" class="flex items-center">
        <img
          v-if="currentIndex === 0"
          src="../../assets/ar_svg.svg"
          alt="Arabic"
          class="w-6 h-6 sm:w-8 sm:h-8"
        />
        <IonLabel class="ml-2 text-sm sm:text-base">{{ forwardButtonLabel }}</IonLabel>
      </IonButton>
    </div>
    <div class="w-full flex justify-center items-center my-4 sm:my-6">
      <SwiperBulletsComponent
        :slides="slides"
        :goToSlide="goToSlide"
        :currentIndex="currentIndex"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import useSwiperStore from '../../stores/components/swiper.store'
import { IonButton, IonLabel } from '@ionic/vue'
import SwiperBulletsComponent from '../../components/SwiperBulletsComponent.vue'
import LanguageSelection from './LanguageSelection.vue'
import DescriptionView from './DescriptionView.vue'
import OnTrackView from './OnTrackView.vue'
import FinishIntroView from './FinishIntroView.vue'
import UserStatsCollectionView from './UserStatsCollectionView/UserStatsCollectionView.vue'
import { useRouter } from 'vue-router'
import { useUserIntroStore, type TUserIntro } from '../../stores/user/user.intro.store'

const userIntroStore = useUserIntroStore()
const backwardButtonLabel = ref<string>('English')
const forwardButtonLabel = ref<string>('Arabic')
const swiperStore = useSwiperStore()
const router = useRouter()
swiperStore.setSwiperLength(11)
swiperStore.setCurrentIndex(0)
const slides = computed(() => swiperStore.getSwiperLength())
const currentIndex = computed(() => swiperStore.getCurrentIndex())

const debuggingUserIntro = ref<TUserIntro>(userIntroStore.getUserIntro())
watch(
  () => userIntroStore.getUserIntro(),
  (newIntroData) => {
    console.log('Intro data updated:', newIntroData)
    debuggingUserIntro.value = newIntroData
  },
)

watch(
  () => swiperStore.getCurrentIndex(),
  (newValue) => {
    if (newValue === 0) {
      backwardButtonLabel.value = 'English'
      forwardButtonLabel.value = 'Arabic'
    }
    if (newValue === 10) {
      backwardButtonLabel.value = 'Back'
      forwardButtonLabel.value = 'Finish'
    }
    if (newValue > 0 && newValue < 10) {
      backwardButtonLabel.value = 'Back'
      forwardButtonLabel.value = 'Next'
    }
  },
)

const goToSlide = (index: number) => {
  swiperStore.setCurrentIndex(index)
}

const backwardButtonFunctionallity = () => {
  if (currentIndex.value === 0) {
    userIntroStore.setLanguage('en')
    swiperStore.setCurrentIndex(currentIndex.value + 1)
  } else if (currentIndex.value > 0) {
    swiperStore.setCurrentIndex(currentIndex.value - 1)
  }
  console.log('Current Index after backward:', currentIndex.value)
}
const forwardButtonFunctionallity = () => {
  if (currentIndex.value === 0) {
    userIntroStore.setLanguage('ar')
    swiperStore.setCurrentIndex(currentIndex.value + 1)
  } else if (currentIndex.value < 10) {
    swiperStore.setCurrentIndex(currentIndex.value + 1)
  } else if (currentIndex.value === 10) {
    // Call the intro API to register user info.
    router.push('/login')
  }
  console.log('Current Index after forward:', currentIndex.value)
}
</script>

<style scoped></style>
