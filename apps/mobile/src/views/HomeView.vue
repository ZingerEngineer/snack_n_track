<template>
  <IonPage>
    <IonContent>
      <div class="p-6 w-full h-full flex items-center flex-col gap-6 notch-safe-area">
        <IonCard
          class="flex justify-center items-center p-2 w-full border-2 to-primary from-primary/50 bg-gradient-to-l border-primary rounded-2xl shadow-lg min-h-[8rem]"
        >
          <IonCardContent>
            <div class="w-full h-full flex flex-row justify-between items-center gap-4">
              <div class="flex flex-row items-center justify-center">
                <img
                  class="w-16 bg-cover bg-center rounded-full"
                  src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid"
                  alt="user avatar"
                />
                <div class="text-white flex flex-col ml-2">
                  <h1>Welcome, {{ user?.name ? user.name : 'Guest' }}</h1>
                  <p class="text-sm">{{ user?.email }}</p>
                </div>
              </div>
              <FontAwesomeIcon
                @click="routeToUserSettings"
                :icon="faCog"
                class="text-white text-4xl"
              />
            </div>
          </IonCardContent>
        </IonCard>
        <IonCard
          class="flex justify-center flex-col p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg w-full min-h-[11rem]"
        >
          <IonCardHeader>
            <IonCardTitle class="text-xl"> Meals </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div class="w-full h-full flex flex-col justify-between items-center gap-2">
              <div class="w-full h-full flex flex-row justify-between items-center gap-4 flex-wrap">
                <div class="flex flex-col items-center justify-center">
                  <h2>0 kCals</h2>
                  <div class="flex flex-row items-center justify-center gap-2">
                    <p class="text-sm">Breakfast</p>
                    <FontAwesomeIcon :icon="faPlateWheat" />
                  </div>
                </div>
                <div class="flex flex-col items-center justify-center">
                  <h2>0 kCals</h2>
                  <div class="flex flex-row items-center justify-center gap-2">
                    <p class="text-sm">Lunch</p>
                    <FontAwesomeIcon :icon="faUtensils" />
                  </div>
                </div>
                <div class="flex flex-col items-center justify-center">
                  <h2>0 kCals</h2>
                  <div class="flex flex-row items-center justify-center gap-2">
                    <p class="text-sm">Dinner</p>
                    <FontAwesomeIcon :icon="faBowlRice" />
                  </div>
                </div>
              </div>
              <IonButton @click="handleScanRouting" class="w-full text-white">Scan meal</IonButton>
            </div>
          </IonCardContent>
        </IonCard>
        <div class="w-full flex flex-row justify-between items-center gap-6">
          <IonCard
            class="p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg h-full w-3/5"
          >
            <IonCardHeader>
              <IonCardTitle class="text-xl">
                Calories <FontAwesomeIcon class="w-4" :icon="faMedal"
              /></IonCardTitle>
            </IonCardHeader>
            <IonCardContent class="flex items-center justify-center">
              <svg class="w- h-36 mb-2" viewBox="0 0 64 64">
                <circle
                  class="text-medium-shade"
                  stroke-width="4"
                  stroke-dasharray="188"
                  stroke-dashoffset="0"
                  stroke-linecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="32"
                  cy="32"
                />
                <circle
                  class="calories-complete-circle text-primary"
                  stroke-width="4"
                  stroke-dasharray="188"
                  :stroke-dashoffset="188 - (188 * 30) / 100"
                  transform="rotate(-90 32 32)"
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="32"
                  cy="32"
                />
                <text
                  class="text-xl calories-complete-percent"
                  x="50%"
                  y="50%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                >
                  N/A
                </text>
              </svg>
            </IonCardContent>
          </IonCard>
          <IonCard
            class="flex flex-col p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg h-full w-2/5"
          >
            <IonCardHeader>
              <IonCardTitle class="text-xl"> Steps </IonCardTitle>
            </IonCardHeader>
            <IonCardContent class="flex flex-grow">
              <div class="w-full h-full flex flex-col justify-center items-center gap-4">
                <div class="flex flex-col items-center justify-center">
                  <h1 class="text-4xl">N/A</h1>
                  <div class="flex flex-row items-center justify-center gap-2">
                    <p class="text-sm">Today</p>
                    <FontAwesomeIcon :icon="faShoePrints" />
                  </div>
                </div>
                <div class="flex flex-col items-center justify-center">
                  <h1 class="text-4xl">N/A</h1>
                  <div class="flex flex-row items-center justify-center gap-2">
                    <p class="text-sm">Average</p>
                    <FontAwesomeIcon :icon="faMedal" />
                  </div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonCardHeader, IonCardTitle } from '@ionic/vue'
import { useAuthStore } from '../stores/user/auth/auth.store'
import { useRouter } from 'vue-router'

import {
  faBowlRice,
  faPlateWheat,
  faUtensils,
  faMedal,
  faShoePrints,
  faCog,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const router = useRouter()
const { user } = useAuthStore()

const handleScanRouting = () => {
  router.push('/dashboard/scan')
}
const routeToUserSettings = () => {
  router.push('/user/settings')
}
</script>

<style scoped>
.calories-complete-circle {
  transition: all 1s;
}
.calories-complete-percent {
  transition: all 1s;
  fill: var(--ion-color-medium-shade);
}
</style>
